import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    addDoc, 
    updateDoc, 
    query, 
    where, 
    orderBy, 
    limit, 
    serverTimestamp,
    Timestamp,
    runTransaction
  } from 'firebase/firestore';
  import { db } from '../config';
  import { Booking } from '@/types/database';
  
  // Collection reference
  const bookingsCollection = collection(db, 'bookings');
  
  /**
   * Create a new booking
   */
  export const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    try {
      // Check property availability first
      const propertyAvailable = await checkPropertyAvailability(
        bookingData.propertyId,
        bookingData.dates.checkIn,
        bookingData.dates.checkOut
      );
      
      if (!propertyAvailable) {
        throw new Error('Property is not available for the selected dates');
      }
      
      // Create booking document
      const docRef = await addDoc(bookingsCollection, {
        ...bookingData,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      // Mark the property as booked for these dates
      // This would be implemented in a separate service
      
      return docRef.id;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  };
  
  /**
   * Get bookings for a user
   */
  export const getUserBookings = async (userId: string): Promise<Booking[]> => {
    try {
      const bookingsQuery = query(
        bookingsCollection,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(bookingsQuery);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Booking[];
    } catch (error) {
      console.error('Error getting user bookings:', error);
      throw error;
    }
  };
  
  /**
   * Check if a property is available for the given dates
   * Simplified version -  check against 
   * an availability collection
   */
  const checkPropertyAvailability = async (
    propertyId: string,
    checkIn: Timestamp,
    checkOut: Timestamp
  ): Promise<boolean> => {
    try {
      // Check for any overlapping bookings
      const bookingsQuery = query(
        bookingsCollection,
        where('propertyId', '==', propertyId),
        where('status', 'in', ['pending', 'confirmed']),
        //TODO
        // Simplified query use more complex
        // date range checking
      );
      
      const snapshot = await getDocs(bookingsQuery);
      
      // Check for overlapping date ranges
      for (const doc of snapshot.docs) {
        const booking = doc.data() as Booking;
        
        // Convert to JavaScript Date for comparison
        const bookingCheckIn = booking.dates.checkIn.toDate();
        const bookingCheckOut = booking.dates.checkOut.toDate();
        const newCheckIn = checkIn.toDate();
        const newCheckOut = checkOut.toDate();
        
        // Check for overlap
        if (
          (newCheckIn >= bookingCheckIn && newCheckIn < bookingCheckOut) ||
          (newCheckOut > bookingCheckIn && newCheckOut <= bookingCheckOut) ||
          (newCheckIn <= bookingCheckIn && newCheckOut >= bookingCheckOut)
        ) {
          return false; // Dates overlap, property not available
        }
      }
      
      return true; // No overlapping bookings found
    } catch (error) {
      console.error('Error checking property availability:', error);
      throw error;
    }
  };
  
