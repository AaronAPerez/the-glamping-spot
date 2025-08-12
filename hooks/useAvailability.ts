// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../firebase/config';
// import { eachDayOfInterval, format, isSameDay } from 'date-fns';

// interface AvailabilityData {
//   isLoading: boolean;
//   error: string | null;
//   unavailableDates: Date[];
//   checkAvailability: (propertyId: string, startDate: Date, endDate: Date) => Promise<boolean>;
//   refreshAvailability: (propertyId: string) => Promise<void>;
//   seasonalPricing: Record<string, number>;
// }

// /**
//  * Custom hook for managing property availability
//  * 
//  * Fetches and calculates available/unavailable dates from Firebase
//  * Handles availability checking for date ranges
//  * Manages seasonal pricing information
//  * 
//  * @param propertyId - ID of the property to check availability for
//  * @returns AvailabilityData object with availability information and functions
//  */
// export default function useAvailability(propertyId?: string): AvailabilityData {
//   // State for loading status
//   const [isLoading, setIsLoading] = useState(true);
//   // State for error message
//   const [error, setError] = useState<string | null>(null);
//   // State for unavailable dates
//   const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
//   // State for seasonal pricing
//   const [seasonalPricing, setSeasonalPricing] = useState<Record<string, number>>({});

//   /**
//    * Fetch unavailable dates for a property
//    * Combines dates from property availability settings and existing bookings
//    */
//   const fetchUnavailableDates = useCallback(async (propertyId: string) => {
//     if (!propertyId) return;
    
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       // Get availability document for the property
//       const availabilityDoc = await getDoc(doc(db, 'availability', propertyId));
      
//       if (!availabilityDoc.exists()) {
//         console.warn('Availability data not found for this property');
//         setUnavailableDates([]);
//         setIsLoading(false);
//         return;
//       }
      
//       const availabilityData = availabilityDoc.data();
//       const blockedDates: Date[] = [];
//       const pricing: Record<string, number> = {};
      
//       // Process dates object to find unavailable dates and seasonal pricing
//       if (availabilityData.dates) {
//         Object.entries(availabilityData.dates).forEach(([dateString, info]: [string, any]) => {
//           if (!info.isAvailable) {
//             blockedDates.push(new Date(dateString));
//           }
          
//           // Store seasonal pricing if available
//           if (info.price) {
//             pricing[dateString] = info.price;
//           }
//         });
//       }
      
//       // Process blocked ranges
//       if (availabilityData.blockedRanges && availabilityData.blockedRanges.length > 0) {
//         availabilityData.blockedRanges.forEach((range: any) => {
//           const startDate = range.startDate.toDate();
//           const endDate = range.endDate.toDate();
          
//           // Get all dates in the range
//           const datesInRange = eachDayOfInterval({ start: startDate, end: endDate });
//           blockedDates.push(...datesInRange);
//         });
//       }
      
//       // Get existing bookings
//       const bookingsQuery = query(
//         collection(db, 'bookings'),
//         where('propertyId', '==', propertyId),
//         where('status', 'in', ['pending', 'confirmed'])
//       );
      
//       const bookingsSnapshot = await getDocs(bookingsQuery);
      
//       // Process booked dates from bookings
//       bookingsSnapshot.docs.forEach(bookingDoc => {
//         const booking = bookingDoc.data();
//         const checkIn = booking.dates.checkIn.toDate();
//         const checkOut = booking.dates.checkOut.toDate();
        
//         // Get all dates in the booking
//         const bookedDates = eachDayOfInterval({ start: checkIn, end: checkOut });
//         blockedDates.push(...bookedDates);
//       });
      
//       // Remove duplicates and sort dates
//       const uniqueDatesMap = new Map();
      
//       blockedDates.forEach(date => {
//         const dateStr = format(date, 'yyyy-MM-dd');
//         uniqueDatesMap.set(dateStr, new Date(dateStr));
//       });
      
//       const uniqueDates = Array.from(uniqueDatesMap.values())
//         .sort((a, b) => a.getTime() - b.getTime());
      
//       setUnavailableDates(uniqueDates);
//       setSeasonalPricing(pricing);
//       setError(null);
//     } catch (err) {
//       console.error('Error fetching availability:', err);
//       setError('Failed to load availability data. Please try again later.');
//       setUnavailableDates([]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   /**
//    * Check if a date range is available for booking
//    * 
//    * @param propertyId - Property ID to check
//    * @param startDate - Check-in date
//    * @param endDate - Check-out date
//    * @returns Boolean indicating if the entire range is available
//    */
//   const checkAvailability = async (
//     propertyId: string, 
//     startDate: Date, 
//     endDate: Date
//   ): Promise<boolean> => {
//     if (!propertyId) return false;
    
//     try {
//       // Generate all dates in the range to check (excluding check-out date)
//       // This follows the common pattern where check-out date can be the same as another booking's check-in
//       const checkoutDate = new Date(endDate);
//       checkoutDate.setDate(checkoutDate.getDate() - 1); // Adjust to exclude actual checkout date
      
//       const datesToCheck = eachDayOfInterval({ 
//         start: new Date(startDate), 
//         end: checkoutDate 
//       });
      
//       // Check if any date in the range is unavailable
//       for (const dateToCheck of datesToCheck) {
//         const isUnavailable = unavailableDates.some(unavailableDate => 
//           isSameDay(dateToCheck, unavailableDate)
//         );
        
//         if (isUnavailable) {
//           return false; // Found an unavailable date
//         }
//       }
      
//       return true; // All dates are available
//     } catch (err) {
//       console.error('Error checking availability:', err);
//       return false;
//     }
//   };

//   // Initial load of unavailable dates
//   useEffect(() => {
//     if (propertyId) {
//       fetchUnavailableDates(propertyId);
//     }
//   }, [propertyId, fetchUnavailableDates]);

//   return {
//     isLoading,
//     error,
//     unavailableDates,
//     checkAvailability,
//     refreshAvailability: fetchUnavailableDates,
//     seasonalPricing
//   };
// }