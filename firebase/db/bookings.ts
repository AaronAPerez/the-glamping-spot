/**
 * Database operations for bookings 
 * Handles creating, retrieving, updating, and managing booking data
 */
import { 
    collection, 
    doc, 
    addDoc, 
    getDoc, 
    getDocs, 
    updateDoc, 
    query, 
    where, 
    orderBy, 
    limit, 
    Timestamp, 
    serverTimestamp,
    runTransaction, 
    startAfter,
    QueryDocumentSnapshot,
    DocumentReference 
  } from 'firebase/firestore';
  import { db } from '../config';
  import { markDatesAsBooked, markDatesAsAvailable, checkDateRangeAvailability } from './availability';
  import { getUserData } from '../auth';
  import { getPropertyById } from './properties';
import { Booking, Property } from '@/types/database';
import { User } from '@firebase/auth';
  
  /**
   * Create a new booking
   * @param bookingData - The booking data
   * @returns Promise resolving to the created booking ID
   */
  export const createBooking = async (
    bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> => {
    try {
      // Run in a transaction to ensure all operations succeed or fail together
      return await runTransaction(db, async (transaction) => {
        // 1. Check if the property exists
        const propertyRef = doc(db, 'properties', bookingData.propertyId);
        const propertyDoc = await transaction.get(propertyRef);
        
        if (!propertyDoc.exists()) {
          throw new Error('Property not found');
        }
        
        const property = propertyDoc.data() as Property;
        
        // 2. Check if the dates are available
        const checkInStr = bookingData.dates.checkIn instanceof Timestamp ? 
          bookingData.dates.checkIn.toDate().toISOString().split('T')[0] : 
          new Date(bookingData.dates.checkIn).toISOString().split('T')[0];
        
        const checkOutStr = bookingData.dates.checkOut instanceof Timestamp ? 
          bookingData.dates.checkOut.toDate().toISOString().split('T')[0] : 
          new Date(bookingData.dates.checkOut).toISOString().split('T')[0];
        
        const isAvailable = await checkDateRangeAvailability(
          bookingData.propertyId,
          checkInStr,
          checkOutStr
        );
        
        if (!isAvailable) {
          throw new Error('The selected dates are not available');
        }
        
        // 3. Check if the number of guests is valid
        if (bookingData.guests.adults + bookingData.guests.children > property.maxGuests) {
          throw new Error(`This property can only accommodate up to ${property.maxGuests} guests`);
        }
        
        // 4. Create the booking document
        const bookingRef = doc(collection(db, 'bookings'));
        const bookingId = bookingRef.id;
        
        // Prepare booking data with timestamps
        const newBooking: Omit<Booking, 'id'> = {
          ...bookingData,
          status: 'pending',
          createdAt: serverTimestamp() as Timestamp,
          updatedAt: serverTimestamp() as Timestamp
        };
        
        transaction.set(bookingRef, newBooking);
        
        // 5. Update the property's availability
        await markDatesAsBooked(
          bookingData.propertyId,
          checkInStr,
          checkOutStr
        );
        
        // 6. Update user's booking history
        const userRef = doc(db, 'users', bookingData.userId);
        const userDoc = await transaction.get(userRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          const bookingHistory = userData.bookingHistory || [];
          
          transaction.update(userRef, {
            bookingHistory: [...bookingHistory, bookingId]
          });
        }
        
        return bookingId;
      });
    } catch (error: any) {
      console.error('Error creating booking:', error);
      throw new Error(error.message || 'Failed to create booking. Please try again.');
    }
  };
  
  /**
   * Process payment for a booking
   * @param bookingId - The booking ID
   * @param paymentDetails - The payment details
   * @returns Promise resolving to the payment ID
   */
  export const processBookingPayment = async (
    bookingId: string,
    paymentDetails: {
      amount: number;
      currency: string;
      method: string;
      billingDetails: {
        name: string;
        address: {
          line1: string;
          line2?: string;
          city: string;
          state: string;
          postalCode: string;
          country: string;
        };
      };
    }
  ): Promise<string> => {
    try {
      // Get the booking
      const bookingDoc = await getDoc(doc(db, 'bookings', bookingId));
      
      if (!bookingDoc.exists()) {
        throw new Error('Booking not found');
      }
      
      const booking = { id: bookingDoc.id, ...bookingDoc.data() } as Booking;
      
      // Create payment
      const paymentId = await createPayment({
        bookingId: booking.id,
        userId: booking.userId,
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        status: 'completed', // In a real implementation, this would depend on the payment processor
        paymentMethod: {
          type: paymentDetails.method,
          // Additional payment method details would go here
        },
        billingDetails: paymentDetails.billingDetails,
        transactionId: `tr_${Date.now()}`, // In a real implementation, this would come from the payment processor
        metadata: {},
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      
      // Update booking status and payment info
      await updateDoc(doc(db, 'bookings', bookingId), {
        status: 'confirmed',
        payment: {
          status: 'paid',
          method: paymentDetails.method,
          transactionId: paymentId
        },
        updatedAt: serverTimestamp()
      });
      
      return paymentId;
    } catch (error: any) {
      console.error('Error processing booking payment:', error);
      throw new Error(error.message || 'Payment processing failed. Please try again.');
    }
  };
  
  /**
   * Get a booking by ID
   * @param bookingId - The booking ID
   * @returns Promise resolving to the booking data
   */
  export const getBookingById = async (bookingId: string): Promise<Booking | null> => {
    try {
      const bookingDoc = await getDoc(doc(db, 'bookings', bookingId));
      
      if (!bookingDoc.exists()) {
        return null;
      }
      
      return { id: bookingDoc.id, ...bookingDoc.data() } as Booking;
    } catch (error) {
      console.error('Error getting booking:', error);
      throw new Error('Failed to load booking details. Please try again.');
    }
  };
  
  /**
   * Get bookings for a user
   * @param userId - The user ID
   * @param status - Optional status filter
   * @param pageSize - Number of bookings to fetch
   * @param lastBooking - Last booking from previous page (for pagination)
   * @returns Promise resolving to the bookings and last document for pagination
   */
  export const getUserBookings = async (
    userId: string,
    status?: Booking['status'] | Booking['status'][],
    pageSize = 10,
    lastBooking?: QueryDocumentSnapshot<Booking>
  ): Promise<{ bookings: Booking[]; lastDoc: QueryDocumentSnapshot<Booking> | null }> => {
    try {
      let bookingsQuery = query(
        collection(db, 'bookings'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      );
      
      // Add status filter if provided
      if (status) {
        if (Array.isArray(status)) {
          // Multiple status values using compound query
          bookingsQuery = query(
            collection(db, 'bookings'),
            where('userId', '==', userId),
            where('status', 'in', status),
            orderBy('createdAt', 'desc'),
            limit(pageSize)
          );
        } else {
          // Single status value
          bookingsQuery = query(
            collection(db, 'bookings'),
            where('userId', '==', userId),
            where('status', '==', status),
            orderBy('createdAt', 'desc'),
            limit(pageSize)
          );
        }
      }
      
      // Add pagination if lastBooking is provided
      if (lastBooking) {
        bookingsQuery = query(bookingsQuery, startAfter(lastBooking));
      }
      
      const querySnapshot = await getDocs(bookingsQuery);
      const bookings: Booking[] = [];
      let lastDoc: QueryDocumentSnapshot<Booking> | null = null;
      
      querySnapshot.forEach((doc) => {
        bookings.push({ id: doc.id, ...doc.data() } as Booking);
        lastDoc = doc as QueryDocumentSnapshot<Booking>;
      });
      
      return { bookings, lastDoc };
    } catch (error) {
      console.error('Error getting user bookings:', error);
      throw new Error('Failed to load your bookings. Please try again.');
    }
  };
  
  /**
   * Get bookings for a property
   * @param propertyId - The property ID
   * @param status - Optional status filter
   * @param pageSize - Number of bookings to fetch
   * @param lastBooking - Last booking from previous page (for pagination)
   * @returns Promise resolving to the bookings and last document for pagination
   */
  export const getPropertyBookings = async (
    propertyId: string,
    status?: Booking['status'] | Booking['status'][],
    pageSize = 10,
    lastBooking?: QueryDocumentSnapshot<Booking>
  ): Promise<{ bookings: Booking[]; lastDoc: QueryDocumentSnapshot<Booking> | null }> => {
    try {
      let bookingsQuery = query(
        collection(db, 'bookings'),
        where('propertyId', '==', propertyId),
        orderBy('dates.checkIn', 'desc'),
        limit(pageSize)
      );
      
      // Add status filter if provided
      if (status) {
        if (Array.isArray(status)) {
          // Multiple status values using compound query
          bookingsQuery = query(
            collection(db, 'bookings'),
            where('propertyId', '==', propertyId),
            where('status', 'in', status),
            orderBy('dates.checkIn', 'desc'),
            limit(pageSize)
          );
        } else {
          // Single status value
          bookingsQuery = query(
            collection(db, 'bookings'),
            where('propertyId', '==', propertyId),
            where('status', '==', status),
            orderBy('dates.checkIn', 'desc'),
            limit(pageSize)
          );
        }
      }
      
      // Add pagination if lastBooking is provided
      if (lastBooking) {
        bookingsQuery = query(bookingsQuery, startAfter(lastBooking));
      }
      
      const querySnapshot = await getDocs(bookingsQuery);
      const bookings: Booking[] = [];
      let lastDoc: QueryDocumentSnapshot<Booking> | null = null;
      
      querySnapshot.forEach((doc) => {
        bookings.push({ id: doc.id, ...doc.data() } as Booking);
        lastDoc = doc as QueryDocumentSnapshot<Booking>;
      });
      
      return { bookings, lastDoc };
    } catch (error) {
      console.error('Error getting property bookings:', error);
      throw new Error('Failed to load property bookings. Please try again.');
    }
  };
  
  /**
   * Get pending bookings that need approval
   * @param pageSize - Number of bookings to fetch
   * @param lastBooking - Last booking from previous page (for pagination)
   * @returns Promise resolving to the bookings and last document for pagination
   */
  export const getPendingBookings = async (
    pageSize = 20,
    lastBooking?: QueryDocumentSnapshot<Booking>
  ): Promise<{ bookings: Booking[]; lastDoc: QueryDocumentSnapshot<Booking> | null }> => {
    try {
      let bookingsQuery = query(
        collection(db, 'bookings'),
        where('status', '==', 'pending'),
        orderBy('createdAt', 'asc'), // Oldest first
        limit(pageSize)
      );
      
      // Add pagination if lastBooking is provided
      if (lastBooking) {
        bookingsQuery = query(bookingsQuery, startAfter(lastBooking));
      }
      
      const querySnapshot = await getDocs(bookingsQuery);
      const bookings: Booking[] = [];
      let lastDoc: QueryDocumentSnapshot<Booking> | null = null;
      
      querySnapshot.forEach((doc) => {
        bookings.push({ id: doc.id, ...doc.data() } as Booking);
        lastDoc = doc as QueryDocumentSnapshot<Booking>;
      });
      
      return { bookings, lastDoc };
    } catch (error) {
      console.error('Error getting pending bookings:', error);
      throw new Error('Failed to load pending bookings. Please try again.');
    }
  };
  
  /**
   * Confirm a booking (admin or host action)
   * @param bookingId - The booking ID
   * @returns Promise resolving when the booking is confirmed
   */
  export const confirmBooking = async (bookingId: string): Promise<void> => {
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      const bookingDoc = await getDoc(bookingRef);
      
      if (!bookingDoc.exists()) {
        throw new Error('Booking not found');
      }
      
      const booking = bookingDoc.data() as Booking;
      
      if (booking.status !== 'pending') {
        throw new Error(`Cannot confirm booking with status: ${booking.status}`);
      }
      
      await updateDoc(bookingRef, {
        status: 'confirmed',
        updatedAt: serverTimestamp()
      });
    } catch (error: any) {
      console.error('Error confirming booking:', error);
      throw new Error(error.message || 'Failed to confirm booking. Please try again.');
    }
  };
  
  /**
   * Cancel a booking
   * @param bookingId - The booking ID
   * @param reason - Reason for cancellation
   * @param canceledBy - ID of user who canceled (user or admin)
   * @param refundAmount - Amount to refund (if any)
   * @returns Promise resolving when the booking is canceled
   */
  export const cancelBooking = async (
    bookingId: string,
    reason: string,
    canceledBy: string,
    refundAmount = 0
  ): Promise<void> => {
    try {
      // Run in a transaction to ensure all operations succeed or fail together
      await runTransaction(db, async (transaction) => {
        const bookingRef = doc(db, 'bookings', bookingId);
        const bookingDoc = await transaction.get(bookingRef);
        
        if (!bookingDoc.exists()) {
          throw new Error('Booking not found');
        }
        
        const booking = bookingDoc.data() as Booking;
        
        if (booking.status === 'canceled') {
          throw new Error('Booking is already canceled');
        }
        
        if (booking.status === 'completed') {
          throw new Error('Cannot cancel a completed booking');
        }
        
        // Update booking status and add cancellation details
        transaction.update(bookingRef, {
          status: 'canceled',
          cancellation: {
            date: Timestamp.now(),
            reason,
            canceledBy,
            refundAmount
          },
          payment: {
            ...booking.payment,
            status: refundAmount > 0 ? 'refunded' : booking.payment?.status,
            refundAmount
          },
          updatedAt: serverTimestamp()
        });
        
        // Make dates available again
        const checkInStr = booking.dates.checkIn instanceof Timestamp ? 
          booking.dates.checkIn.toDate().toISOString().split('T')[0] : 
          new Date(booking.dates.checkIn).toISOString().split('T')[0];
        
        const checkOutStr = booking.dates.checkOut instanceof Timestamp ? 
          booking.dates.checkOut.toDate().toISOString().split('T')[0] : 
          new Date(booking.dates.checkOut).toISOString().split('T')[0];
        
        await markDatesAsAvailable(
          booking.propertyId,
          checkInStr,
          checkOutStr
        );
        
        // Process refund if needed (in a real app, this would integrate with a payment provider)
        if (refundAmount > 0 && booking.payment?.transactionId) {
          // Create refund record in the payments collection
          const refundData = {
            amount: refundAmount,
            date: Timestamp.now(),
            reason: reason,
            transactionId: `refund_${Date.now()}` // In a real implementation, this would come from the payment processor
          };
          
          // Add refund to the payment record
          const paymentRef = doc(db, 'payments', booking.payment.transactionId);
          const paymentDoc = await transaction.get(paymentRef);
          
          if (paymentDoc.exists()) {
            const payment = paymentDoc.data();
            const refunds = payment.refunds || [];
            
            transaction.update(paymentRef, {
              status: 'refunded',
              refunds: [...refunds, refundData],
              updatedAt: serverTimestamp()
            });
          }
        }
      });
    } catch (error: any) {
      console.error('Error canceling booking:', error);
      throw new Error(error.message || 'Failed to cancel booking. Please try again.');
    }
  };
  
  /**
   * Mark a booking as completed
   * @param bookingId - The booking ID
   * @returns Promise resolving when the booking is marked as completed
   */
  export const completeBooking = async (bookingId: string): Promise<void> => {
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      const bookingDoc = await getDoc(bookingRef);
      
      if (!bookingDoc.exists()) {
        throw new Error('Booking not found');
      }
      
      const booking = bookingDoc.data() as Booking;
      
      if (booking.status !== 'confirmed') {
        throw new Error(`Cannot complete booking with status: ${booking.status}`);
      }
      
      // Check if checkout date has passed
      const checkoutDate = booking.dates.checkOut instanceof Timestamp ? 
        booking.dates.checkOut.toDate() : 
        new Date(booking.dates.checkOut);
      
      const now = new Date();
      
      if (now < checkoutDate) {
        throw new Error('Cannot complete a booking before the checkout date');
      }
      
      await updateDoc(bookingRef, {
        status: 'completed',
        updatedAt: serverTimestamp()
      });
    } catch (error: any) {
      console.error('Error completing booking:', error);
      throw new Error(error.message || 'Failed to complete booking. Please try again.');
    }
  };
  
  /**
   * Add special requests to a booking
   * @param bookingId - The booking ID
   * @param specialRequests - Special requests text
   * @returns Promise resolving when the special requests are added
   */
  export const addSpecialRequests = async (
    bookingId: string,
    specialRequests: string
  ): Promise<void> => {
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      const bookingDoc = await getDoc(bookingRef);
      
      if (!bookingDoc.exists()) {
        throw new Error('Booking not found');
      }
      
      await updateDoc(bookingRef, {
        specialRequests,
        updatedAt: serverTimestamp()
      });
    } catch (error: any) {
      console.error('Error adding special requests:', error);
      throw new Error(error.message || 'Failed to add special requests. Please try again.');
    }
  };
  
  /**
   * Add notes to a booking (internal use)
   * @param bookingId - The booking ID
   * @param notes - Notes object with public and/or private notes
   * @returns Promise resolving when the notes are added
   */
  export const addBookingNotes = async (
    bookingId: string,
    notes: {
      public?: string;
      private?: string;
    }
  ): Promise<void> => {
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      const bookingDoc = await getDoc(bookingRef);
      
      if (!bookingDoc.exists()) {
        throw new Error('Booking not found');
      }
      
      const updateData: Record<string, any> = {
        updatedAt: serverTimestamp()
      };
      
      // Only update the provided note fields
      if (notes.public !== undefined) {
        updateData['notes.public'] = notes.public;
      }
      
      if (notes.private !== undefined) {
        updateData['notes.private'] = notes.private;
      }
      
      await updateDoc(bookingRef, updateData);
    } catch (error: any) {
      console.error('Error adding booking notes:', error);
      throw new Error(error.message || 'Failed to add booking notes. Please try again.');
    }
  };
  
  /**
   * Get upcoming bookings for a user
   * @param userId - The user ID
   * @param maxLimit - Maximum number of bookings to return
   * @returns Promise resolving to upcoming bookings
   */
  export const getUpcomingBookings = async (
    userId: string,
    maxLimit = 5
  ): Promise<Booking[]> => {
    try {
      const now = new Date();
      
      const bookingsQuery = query(
        collection(db, 'bookings'),
        where('userId', '==', userId),
        where('status', '==', 'confirmed'),
        where('dates.checkIn', '>=', now),
        orderBy('dates.checkIn', 'asc'),
        limit(maxLimit)
      );
      
      const querySnapshot = await getDocs(bookingsQuery);
      const bookings: Booking[] = [];
      
      querySnapshot.forEach((doc) => {
        bookings.push({ id: doc.id, ...doc.data() } as Booking);
      });
      
      return bookings;
    } catch (error) {
      console.error('Error getting upcoming bookings:', error);
      throw new Error('Failed to load upcoming bookings. Please try again.');
    }
  };
  
  /**
   * Get a booking with expanded property and user details
   * @param bookingId - The booking ID
   * @returns Promise resolving to the booking with expanded details
   */
  export const getBookingWithDetails = async (
    bookingId: string
  ): Promise<{
    booking: Booking;
    property: Property | null;
    user: User | null;
  }> => {
    try {
      const booking = await getBookingById(bookingId);
      
      if (!booking) {
        throw new Error('Booking not found');
      }
      
      // Get property details
      const property = await getPropertyById(booking.propertyId);
      
      // Get user details
      const user = booking.userId ? await getUserData(booking.userId) : null;
      
      return {
        booking,
        property,
        user
      };
    } catch (error: any) {
      console.error('Error getting booking details:', error);
      throw new Error(error.message || 'Failed to load booking details. Please try again.');
    }
  };
  
  /**
   * Update a booking's guest information
   * @param bookingId - The booking ID
   * @param guestInfo - Updated guest information
   * @returns Promise resolving when the guest info is updated
   */
  export const updateGuestInformation = async (
    bookingId: string,
    guestInfo: {
      adults?: number;
      children?: number;
      infants?: number;
      pets?: number;
      contactInformation?: {
        fullName?: string;
        email?: string;
        phone?: string;
        emergencyContact?: {
          name?: string;
          phone?: string;
          relationship?: string;
        };
      };
    }
  ): Promise<void> => {
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      const bookingDoc = await getDoc(bookingRef);
      
      if (!bookingDoc.exists()) {
        throw new Error('Booking not found');
      }
      
      const booking = bookingDoc.data() as Booking;
      
      // Only allow updates to pending bookings
      if (booking.status !== 'pending') {
        throw new Error(`Cannot update guest information for a ${booking.status} booking`);
      }
      
      const updateData: Record<string, any> = {
        updatedAt: serverTimestamp()
      };
      
      // Update guest counts if provided
      if (guestInfo.adults !== undefined) updateData['guests.adults'] = guestInfo.adults;
      if (guestInfo.children !== undefined) updateData['guests.children'] = guestInfo.children;
      if (guestInfo.infants !== undefined) updateData['guests.infants'] = guestInfo.infants;
      if (guestInfo.pets !== undefined) updateData['guests.pets'] = guestInfo.pets;
      
      // Update contact information if provided
      if (guestInfo.contactInformation) {
        if (guestInfo.contactInformation.fullName !== undefined) {
          updateData['contactInformation.fullName'] = guestInfo.contactInformation.fullName;
        }
        
        if (guestInfo.contactInformation.email !== undefined) {
          updateData['contactInformation.email'] = guestInfo.contactInformation.email;
        }
        
        if (guestInfo.contactInformation.phone !== undefined) {
          updateData['contactInformation.phone'] = guestInfo.contactInformation.phone;
        }
        
        // Update emergency contact if provided
        if (guestInfo.contactInformation.emergencyContact) {
          if (guestInfo.contactInformation.emergencyContact.name !== undefined) {
            updateData['contactInformation.emergencyContact.name'] = 
              guestInfo.contactInformation.emergencyContact.name;
          }
          
          if (guestInfo.contactInformation.emergencyContact.phone !== undefined) {
            updateData['contactInformation.emergencyContact.phone'] = 
              guestInfo.contactInformation.emergencyContact.phone;
          }
          
          if (guestInfo.contactInformation.emergencyContact.relationship !== undefined) {
            updateData['contactInformation.emergencyContact.relationship'] = 
              guestInfo.contactInformation.emergencyContact.relationship;
          }
        }
      }
      
      await updateDoc(bookingRef, updateData);
    } catch (error: any) {
      console.error('Error updating guest information:', error);
      throw new Error(error.message || 'Failed to update guest information. Please try again.');
    }
  };
  
  /**
   * Add experiences/add-ons to a booking
   * @param bookingId - The booking ID
   * @param addOns - Array of add-ons to add to the booking
   * @returns Promise resolving when the add-ons are added
   */
  export const addBookingAddOns = async (
    bookingId: string,
    addOns: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
    }>
  ): Promise<void> => {
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      const bookingDoc = await getDoc(bookingRef);
      
      if (!bookingDoc.exists()) {
        throw new Error('Booking not found');
      }
      
      const booking = bookingDoc.data() as Booking;
      
      // Calculate additional cost
      const additionalCost = addOns.reduce((total, addon) => total + (addon.price * addon.quantity), 0);
      
      // Update booking with add-ons and adjust pricing
      await updateDoc(bookingRef, {
        addOns,
        'pricing.total': booking.pricing.total + additionalCost,
        updatedAt: serverTimestamp()
      });
    } catch (error: any) {
      console.error('Error adding booking add-ons:', error);
      throw new Error(error.message || 'Failed to add experiences to booking. Please try again.');
    }
  };
  
  /**
   * Get all bookings for admin dashboard with pagination
   * @param pageSize - Number of bookings to fetch
   * @param lastBooking - Last booking from previous page (for pagination)
   * @param status - Optional status filter
   * @returns Promise resolving to the bookings and last document for pagination
   */
  export const getAllBookings = async (
    pageSize = 20,
    lastBooking?: QueryDocumentSnapshot<Booking>,
    status?: Booking['status'] | Booking['status'][]
  ): Promise<{ bookings: Booking[]; lastDoc: QueryDocumentSnapshot<Booking> | null }> => {
    try {
      let bookingsQuery = query(
        collection(db, 'bookings'),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      );
      
      // Add status filter if provided
      if (status) {
        if (Array.isArray(status)) {
          bookingsQuery = query(
            collection(db, 'bookings'),
            where('status', 'in', status),
            orderBy('createdAt', 'desc'),
            limit(pageSize)
          );
        } else {
          bookingsQuery = query(
            collection(db, 'bookings'),
            where('status', '==', status),
            orderBy('createdAt', 'desc'),
            limit(pageSize)
          );
        }
      }
      
      // Add pagination if lastBooking is provided
      if (lastBooking) {
        bookingsQuery = query(bookingsQuery, startAfter(lastBooking));
      }
      
      const querySnapshot = await getDocs(bookingsQuery);
      const bookings: Booking[] = [];
      let lastDoc: QueryDocumentSnapshot<Booking> | null = null;
      
      querySnapshot.forEach((doc) => {
        bookings.push({ id: doc.id, ...doc.data() } as Booking);
        lastDoc = doc as QueryDocumentSnapshot<Booking>;
      });
      
      return { bookings, lastDoc };
    } catch (error) {
      console.error('Error getting all bookings:', error);
      throw new Error('Failed to load bookings. Please try again.');
    }
  };
  
  // Export additional functions as needed
  export default {
    createBooking,
    processBookingPayment,
    getBookingById,
    getUserBookings,
    getPropertyBookings,
    getPendingBookings,
    confirmBooking,
    cancelBooking,
    completeBooking,
    addSpecialRequests,
    addBookingNotes,
    getUpcomingBookings,
    getBookingWithDetails,
    updateGuestInformation,
    addBookingAddOns,
    getAllBookings
  };