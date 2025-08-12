// import { create } from 'zustand';
// import { immer } from 'zustand/middleware/immer';
// import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
// import { db } from '@/firebase/config';
// import { BaseState } from './types';
// import { queryClient } from '@/lib/react-query';

// interface BookingFormData {
//   propertyId: string;
//   checkInDate: Date;
//   checkOutDate: Date;
//   guests: {
//     adults: number;
//     children: number;
//     infants: number;
//     pets: number;
//   };
//   specialRequests?: string;
//   contactInformation: {
//     fullName: string;
//     email: string;
//     phone: string;
//   };
//   totalPrice: number;
// }

// interface BookingState extends BaseState {
//   currentStep: number;
//   bookingData: Partial<BookingFormData>;
  
//   // Actions
//   setBookingData: (data: Partial<BookingFormData>) => void;
//   nextStep: () => void;
//   prevStep: () => void;
//   goToStep: (step: number) => void;
//   resetBooking: () => void;
//   submitBooking: () => Promise<string>; // Returns booking ID
// }

// export const useBookingStore = create<BookingState>()(
//   immer((set, get) => ({
//     // Initial state
//     status: 'idle',
//     error: null,
//     currentStep: 0,
//     bookingData: {},
    
//     // Actions
//     setBookingData: (data) => {
//       set(state => {
//         state.bookingData = { ...state.bookingData, ...data };
//       });
//     },
    
//     nextStep: () => {
//       set(state => {
//         state.currentStep += 1;
//       });
//     },
    
//     prevStep: () => {
//       set(state => {
//         if (state.currentStep > 0) {
//           state.currentStep -= 1;
//         }
//       });
//     },
    
//     goToStep: (step) => {
//       set(state => {
//         state.currentStep = step;
//       });
//     },
    
//     resetBooking: () => {
//       set(state => {
//         state.currentStep = 0;
//         state.bookingData = {};
//         state.status = 'idle';
//         state.error = null;
//       });
//     },
    
//     submitBooking: async () => {
//       try {
//         set(state => {
//           state.status = 'loading';
//           state.error = null;
//         });
        
//         const { bookingData } = get();
        
//         // Check if we have all required data
//         if (!bookingData.propertyId || !bookingData.checkInDate || !bookingData.checkOutDate || 
//             !bookingData.guests || !bookingData.contactInformation || !bookingData.totalPrice) {
//           throw new Error('Missing required booking information');
//         }
        
//         // Create booking in Firestore
//         const docRef = await addDoc(collection(db, 'bookings'), {
//           ...bookingData,
//           status: 'pending',
//           createdAt: serverTimestamp(),
//           updatedAt: serverTimestamp(),
//         });
        
//         // Invalidate any relevant queries
//         queryClient.invalidateQueries({ queryKey: ['bookings'] });
        
//         set(state => {
//           state.status = 'success';
//         });
        
//         return docRef.id;
//       } catch (error: any) {
//         set(state => {
//           state.status = 'error';
//           state.error = error.message;
//         });
//         throw error;
//       }
//     }
//   }))
// );