// import { PropertyData } from './index';

// /**
//  * Extended property data with additional details for the property details page
//  */
// export interface PropertyDetailsData extends PropertyData {
//   /**
//    * Detailed description for the property
//    */
//   detailedDescription?: string;
  
//   /**
//    * House rules for the property
//    */
//   houseRules?: string[];
  
//   /**
//    * Cancellation policy for bookings
//    */
//   cancellationPolicy?: string;
  
//   /**
//    * Check-in instructions and details
//    */
//   checkInInstructions?: string;
  
//   /**
//    * Available dates for booking (unavailable dates will be blocked in calendar)
//    */
//   availableDates?: {
//     startDate: string;
//     endDate: string;
//   }[];
  
//   /**
//    * Host information
//    */
//   host?: {
//     id: string;
//     name: string;
//     avatar?: string;
//     joinedDate?: string;
//     responseRate?: number;
//   };
  
//   /**
//    * Reviews for the property
//    */
//   reviews?: {
//     id: string;
//     authorName: string;
//     authorAvatar?: string;
//     rating: number;
//     date: string;
//     comment: string;
//   }[];
  
//   /**
//    * Average review rating
//    */
//   averageRating?: number;
  
//   /**
//    * Number of reviews
//    */
//   reviewCount?: number;
  
//   /**
//    * URL for 360° panorama image
//    */
//   panoramaUrl?: string;
  
//   /**
//    * Exact coordinates for the property location
//    */
//   coordinates?: {
//     latitude: number;
//     longitude: number;
//   };
  
//   /**
//    * Nearby attractions and points of interest
//    */
//   nearbyAttractions?: {
//     name: string;
//     type: string;
//     distance: string;
//     description?: string;
//     imageUrl?: string;
//   }[];
// }