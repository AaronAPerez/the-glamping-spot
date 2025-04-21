/**
 * Database operations for property availability
 * Handles checking, updating, and managing availability dates for properties
 */
import { 
    doc, 
    getDoc, 
    updateDoc, 
    arrayUnion, 
    arrayRemove, 
    setDoc, 
    collection, 
    query, 
    where, 
    getDocs,
    serverTimestamp,
    Timestamp,
    runTransaction,
    FieldValue
  } from 'firebase/firestore';
  import { db } from '../config';
  import { Availability } from '../../types/database';
  
  /**
   * Fetches availability data for a specific property
   * @param propertyId - The ID of the property
   * @returns Promise resolving to availability data or null if not found
   */
  export const getAvailability = async (propertyId: string): Promise<Availability | null> => {
    try {
      const availabilityDoc = await getDoc(doc(db, 'availability', propertyId));
      
      if (availabilityDoc.exists()) {
        return { 
          propertyId,
          ...availabilityDoc.data() 
        } as Availability;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching availability:', error);
      throw new Error('Failed to load availability data. Please try again.');
    }
  };
  
  /**
   * Checks if a date range is available for booking
   * @param propertyId - The ID of the property
   * @param checkIn - Check-in date string (YYYY-MM-DD)
   * @param checkOut - Check-out date string (YYYY-MM-DD)
   * @returns Promise resolving to boolean indicating availability
   */
  export const checkDateRangeAvailability = async (
    propertyId: string, 
    checkIn: string, 
    checkOut: string
  ): Promise<boolean> => {
    try {
      const availability = await getAvailability(propertyId);
      
      if (!availability) {
        throw new Error('Availability data not found');
      }
      
      // Generate array of dates between checkIn and checkOut (exclusive of checkOut)
      const dateRange = getDatesInRange(checkIn, checkOut);
      
      // Check if all dates in the range are available
      const allDatesAvailable = dateRange.every(date => {
        return availability.dates[date] && availability.dates[date].isAvailable;
      });
      
      // Check if there are any blocked ranges that overlap with the requested dates
      if (allDatesAvailable && availability.blockedRanges) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        
        const hasOverlappingBlockedRange = availability.blockedRanges.some((range: { startDate: { toDate: () => any; }; endDate: { toDate: () => any; }; }) => {
          const blockStart = range.startDate.toDate();
          const blockEnd = range.endDate.toDate();
          
          // Check if the ranges overlap
          return (
            (checkInDate >= blockStart && checkInDate < blockEnd) || // Check-in during blocked period
            (checkOutDate > blockStart && checkOutDate <= blockEnd) || // Check-out during blocked period
            (checkInDate <= blockStart && checkOutDate >= blockEnd) // Booking encompasses blocked period
          );
        });
        
        return !hasOverlappingBlockedRange && allDatesAvailable;
      }
      
      return allDatesAvailable;
    } catch (error) {
      console.error('Error checking availability:', error);
      throw new Error('Failed to check availability. Please try again.');
    }
  };
  
  /**
   * Updates availability for a specific date
   * @param propertyId - The ID of the property
   * @param date - The date to update (YYYY-MM-DD)
   * @param isAvailable - Whether the date is available
   * @param price - Optional custom price for the date
   * @param minimumStay - Optional minimum stay requirement for the date
   */
  export const updateDateAvailability = async (
    propertyId: string,
    date: string,
    isAvailable: boolean,
    price?: number,
    minimumStay?: number
  ): Promise<void> => {
    try {
      const availabilityRef = doc(db, 'availability', propertyId);
      const availabilityDoc = await getDoc(availabilityRef);
      
      if (!availabilityDoc.exists()) {
        // Create new availability document if it doesn't exist
        await createInitialAvailability(propertyId);
      }
      
      // Update the specific date
      await updateDoc(availabilityRef, {
        [`dates.${date}`]: {
          isAvailable,
          ...(price !== undefined ? { price } : {}),
          ...(minimumStay !== undefined ? { minimumStay } : {}),
        },
        lastUpdated: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating date availability:', error);
      throw new Error('Failed to update availability. Please try again.');
    }
  };
  
  /**
   * Updates multiple dates availability at once
   * @param propertyId - The ID of the property
   * @param updates - Object with dates as keys and availability data as values
   */
  export const updateMultipleDatesAvailability = async (
    propertyId: string,
    updates: Record<string, { isAvailable: boolean; price?: number; minimumStay?: number; notes?: string }>
  ): Promise<void> => {
    try {
      const availabilityRef = doc(db, 'availability', propertyId);
      const availabilityDoc = await getDoc(availabilityRef);
      
      if (!availabilityDoc.exists()) {
        // Create new availability document if it doesn't exist
        await createInitialAvailability(propertyId);
      }
      
      // Create an object with all the field updates
      const updateData: Record<string, any> = {
        lastUpdated: serverTimestamp()
      };
      
      // Add each date update to the update object
      Object.entries(updates).forEach(([date, data]) => {
        updateData[`dates.${date}`] = data;
      });
      
      // Perform the update
      await updateDoc(availabilityRef, updateData);
    } catch (error) {
      console.error('Error updating multiple dates:', error);
      throw new Error('Failed to update availability. Please try again.');
    }
  };
  
  /**
   * Adds a blocked date range (e.g., for maintenance or owner use)
   * @param propertyId - The ID of the property
   * @param startDate - Start date of the blocked range
   * @param endDate - End date of the blocked range
   * @param reason - Optional reason for blocking the dates
   */
  export const addBlockedDateRange = async (
    propertyId: string,
    startDate: Date,
    endDate: Date,
    reason?: string
  ): Promise<void> => {
    try {
      const availabilityRef = doc(db, 'availability', propertyId);
      const availabilityDoc = await getDoc(availabilityRef);
      
      if (!availabilityDoc.exists()) {
        // Create new availability document if it doesn't exist
        await createInitialAvailability(propertyId);
      }
      
      // Add blocked range
      await updateDoc(availabilityRef, {
        blockedRanges: arrayUnion({
          startDate: Timestamp.fromDate(startDate),
          endDate: Timestamp.fromDate(endDate),
          reason: reason || 'Unavailable',
        }),
        lastUpdated: serverTimestamp()
      });
      
      // Also update individual dates in the range to be unavailable
      const dateRange = getDatesInRange(
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0]
      );
      
      const updates: Record<string, any> = {};
      dateRange.forEach(date => {
        updates[`dates.${date}`] = {
          isAvailable: false,
          notes: reason || 'Blocked date range'
        };
      });
      
      await updateDoc(availabilityRef, updates);
    } catch (error) {
      console.error('Error adding blocked date range:', error);
      throw new Error('Failed to block date range. Please try again.');
    }
  };
  
  /**
   * Removes a blocked date range
   * @param propertyId - The ID of the property
   * @param blockToRemove - The blocked range object to remove
   */
  export const removeBlockedDateRange = async (
    propertyId: string,
    blockToRemove: {
      startDate: Timestamp;
      endDate: Timestamp;
      reason?: string;
    }
  ): Promise<void> => {
    try {
      const availabilityRef = doc(db, 'availability', propertyId);
      
      // Remove the blocked range
      await updateDoc(availabilityRef, {
        blockedRanges: arrayRemove(blockToRemove),
        lastUpdated: serverTimestamp()
      });
      
      // Restore availability for the dates in the range if they're not booked
      // This requires checking bookings to ensure we don't make booked dates available
      const startDateStr = blockToRemove.startDate.toDate().toISOString().split('T')[0];
      const endDateStr = blockToRemove.endDate.toDate().toISOString().split('T')[0];
      const dateRange = getDatesInRange(startDateStr, endDateStr);
      
      // This would require a transaction to properly check booking status for each date
      // and only update dates that aren't booked
      await runTransaction(db, async (transaction) => {
        const availabilityDoc = await transaction.get(availabilityRef);
        if (!availabilityDoc.exists()) {
          throw new Error('Availability document not found');
        }
        
        const availabilityData = availabilityDoc.data() as Omit<Availability, 'propertyId'>;
        const updates: Record<string, any> = {};
        
        // Check each date and update if it's not part of another blocked range
        for (const date of dateRange) {
          const isPartOfAnotherBlockedRange = availabilityData.blockedRanges.some((range: { startDate: { isEqual: (arg0: Timestamp) => any; toDate: () => any; }; endDate: { isEqual: (arg0: Timestamp) => any; toDate: () => any; }; }) => {
            // Skip the range we're removing
            if (range.startDate.isEqual(blockToRemove.startDate) && 
                range.endDate.isEqual(blockToRemove.endDate)) {
              return false;
            }
            
            // Check if date is within this other range
            const rangeStart = range.startDate.toDate();
            const rangeEnd = range.endDate.toDate();
            const currentDate = new Date(date);
            return currentDate >= rangeStart && currentDate <= rangeEnd;
          });
          
          if (!isPartOfAnotherBlockedRange) {
            updates[`dates.${date}`] = {
              isAvailable: true
            };
          }
        }
        
        updates.lastUpdated = serverTimestamp();
        transaction.update(availabilityRef, updates);
      });
    } catch (error) {
      console.error('Error removing blocked date range:', error);
      throw new Error('Failed to remove blocked date range. Please try again.');
    }
  };
  
  /**
   * Creates the initial availability document for a property
   * @param propertyId - The ID of the property
   */
  export const createInitialAvailability = async (propertyId: string): Promise<void> => {
    try {
      const availabilityRef = doc(db, 'availability', propertyId);
      
      // Create a basic availability document with all dates available
      // Generate dates for the next year
      const dates: Record<string, { isAvailable: boolean }> = {};
      const today = new Date();
      
      // Add dates for the next 365 days
      for (let i = 0; i < 365; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateString = date.toISOString().split('T')[0];
        dates[dateString] = { isAvailable: true };
      }
      
      await setDoc(availabilityRef, {
        propertyId,
        dates,
        blockedRanges: [],
        lastUpdated: serverTimestamp()
      });
    } catch (error) {
      console.error('Error creating initial availability:', error);
      throw new Error('Failed to create availability calendar. Please try again.');
    }
  };
  
  /**
   * Updates availability after a booking is confirmed
   * @param propertyId - The ID of the property
   * @param checkIn - Check-in date string (YYYY-MM-DD)
   * @param checkOut - Check-out date string (YYYY-MM-DD)
   */
  export const markDatesAsBooked = async (
    propertyId: string,
    checkIn: string,
    checkOut: string
  ): Promise<void> => {
    try {
      // Get dates in the range
      const dateRange = getDatesInRange(checkIn, checkOut);
      
      // Update each date to be unavailable
      const availabilityRef = doc(db, 'availability', propertyId);
      const updates: Record<string, any> = {};
      
      dateRange.forEach(date => {
        updates[`dates.${date}`] = {
          isAvailable: false,
          notes: 'Booked'
        };
      });
      
      updates.lastUpdated = serverTimestamp();
      
      await updateDoc(availabilityRef, updates);
    } catch (error) {
      console.error('Error marking dates as booked:', error);
      throw new Error('Failed to update availability after booking. Please try again.');
    }
  };
  
  /**
   * Updates availability after a booking is canceled
   * @param propertyId - The ID of the property
   * @param checkIn - Check-in date string (YYYY-MM-DD)
   * @param checkOut - Check-out date string (YYYY-MM-DD)
   */
  export const markDatesAsAvailable = async (
    propertyId: string,
    checkIn: string,
    checkOut: string
  ): Promise<void> => {
    try {
      // Get dates in the range
      const dateRange = getDatesInRange(checkIn, checkOut);
      
      // Update each date to be available
      const availabilityRef = doc(db, 'availability', propertyId);
      const updates: Record<string, any> = {};
      
      dateRange.forEach(date => {
        updates[`dates.${date}`] = {
          isAvailable: true
        };
      });
      
      updates.lastUpdated = serverTimestamp();
      
      await updateDoc(availabilityRef, updates);
    } catch (error) {
      console.error('Error marking dates as available:', error);
      throw new Error('Failed to update availability after cancellation. Please try again.');
    }
  };
  
  /**
   * Updates seasonal pricing for a date range
   * @param propertyId - The ID of the property
   * @param startDate - Start date string (YYYY-MM-DD)
   * @param endDate - End date string (YYYY-MM-DD)
   * @param price - The price to set for the date range
   */
  export const updateSeasonalPricing = async (
    propertyId: string,
    startDate: string,
    endDate: string,
    price: number
  ): Promise<void> => {
    try {
      // Get dates in the range
      const dateRange = getDatesInRange(startDate, endDate);
      
      // Update each date with the new price
      const availabilityRef = doc(db, 'availability', propertyId);
      const availabilityDoc = await getDoc(availabilityRef);
      
      if (!availabilityDoc.exists()) {
        await createInitialAvailability(propertyId);
      }
      
      const updates: Record<string, any> = {};
      
      dateRange.forEach(date => {
        // Preserve existing availability status
        const currentData = availabilityDoc.exists() ? 
          availabilityDoc.data().dates[date] || { isAvailable: true } : 
          { isAvailable: true };
        
        updates[`dates.${date}`] = {
          ...currentData,
          price
        };
      });
      
      updates.lastUpdated = serverTimestamp();
      
      await updateDoc(availabilityRef, updates);
    } catch (error) {
      console.error('Error updating seasonal pricing:', error);
      throw new Error('Failed to update seasonal pricing. Please try again.');
    }
  };
  
  /**
   * Gets all unavailable dates for a property
   * @param propertyId - The ID of the property
   * @returns Promise resolving to array of unavailable date strings
   */
  export const getUnavailableDates = async (propertyId: string): Promise<string[]> => {
    try {
      const availability = await getAvailability(propertyId);
      
      if (!availability) {
        return [];
      }
      
      // Collect all unavailable dates
      const unavailableDates: string[] = [];
      
      // Add dates marked as unavailable
      Object.entries(availability.dates).forEach(([date, data]) => {
        if (typeof data === 'object' && data !== null && 'isAvailable' in data && !(data as { isAvailable: boolean }).isAvailable) {
          unavailableDates.push(date);
        }
      });
      
      // Add dates from blocked ranges
      if (availability.blockedRanges) {
        availability.blockedRanges.forEach((range: { startDate: { toDate: () => any; }; endDate: { toDate: () => any; }; }) => {
          const start = range.startDate.toDate();
          const end = range.endDate.toDate();
          
          // Add each date in the range
          const current = new Date(start);
          while (current <= end) {
            unavailableDates.push(current.toISOString().split('T')[0]);
            current.setDate(current.getDate() + 1);
          }
        });
      }
      
      // Remove duplicates
      return [...new Set(unavailableDates)];
    } catch (error) {
      console.error('Error getting unavailable dates:', error);
      throw new Error('Failed to get unavailable dates. Please try again.');
    }
  };
  
  /**
   * Gets the custom price for a specific date if available
   * @param propertyId - The ID of the property
   * @param date - The date string (YYYY-MM-DD)
   * @param basePrice - The default base price to return if no custom price is set
   * @returns Promise resolving to the price for the date
   */
  export const getDatePrice = async (
    propertyId: string,
    date: string,
    basePrice: number
  ): Promise<number> => {
    try {
      const availability = await getAvailability(propertyId);
      
      if (!availability || !availability.dates[date] || !availability.dates[date].price) {
        return basePrice;
      }
      
      return availability.dates[date].price || basePrice;
    } catch (error) {
      console.error('Error getting date price:', error);
      // Return base price on error
      return basePrice;
    }
  };
  
  // Utility function to generate all dates between two dates (inclusive of startDate, exclusive of endDate)
  export const getDatesInRange = (startDate: string, endDate: string): string[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const datesArray: string[] = [];
    
    let currentDate = new Date(start);
    
    while (currentDate < end) {
      datesArray.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return datesArray;
  };
  
  // Export additional utilities if needed
  export default {
    getAvailability,
    checkDateRangeAvailability,
    updateDateAvailability,
    updateMultipleDatesAvailability,
    addBlockedDateRange,
    removeBlockedDateRange,
    createInitialAvailability,
    markDatesAsBooked,
    markDatesAsAvailable,
    updateSeasonalPricing,
    getUnavailableDates,
    getDatePrice,
    getDatesInRange
  };