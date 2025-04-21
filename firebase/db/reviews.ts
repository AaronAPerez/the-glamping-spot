/**
 * Database operations for property reviews
 * Handles creating, retrieving, updating, and managing review data
 */
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit as firestoreLimit, 
  Timestamp, 
  serverTimestamp, 
  increment, 
  startAfter,
  QueryDocumentSnapshot, 
  runTransaction, 
  limit
} from 'firebase/firestore';
import { db } from '../config';
import { Review, Booking, Property } from '../../types/database';
import { getUserById } from './users';
import { getBookingById } from './bookings';

/**
 * Create a new property review
 * @param reviewData - Review data without ID or timestamps
 * @returns Promise resolving to the created review ID
 */
export const createReview = async (
  reviewData: Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'helpfulVotes' | 'flags'>
): Promise<string> => {
  try {
    // Validate the review requirements
    
    // 1. Verify that the booking exists and is completed
    const booking = await getBookingById(reviewData.bookingId);
    
    if (!booking) {
      throw new Error('Booking not found');
    }
    
    if (booking.status !== 'completed') {
      throw new Error('Cannot review a booking that has not been completed');
    }
    
    // 2. Verify that the user is the one who made the booking
    if (booking.userId !== reviewData.userId) {
      throw new Error('You can only review bookings you have made');
    }
    
    // 3. Verify that a review hasn't already been submitted for this booking
    const existingReviewQuery = query(
      collection(db, 'reviews'),
      where('bookingId', '==', reviewData.bookingId),
      where('userId', '==', reviewData.userId)
    );
    
    const existingReviewSnapshot = await getDocs(existingReviewQuery);
    
    if (!existingReviewSnapshot.empty) {
      throw new Error('You have already submitted a review for this booking');
    }
    
    // Add user details to the review
    const user = await getUserById(reviewData.userId);
    let reviewDataWithUser = reviewData as Review & { userName?: string; userProfilePic?: string };
    
    if (user) {
      reviewDataWithUser = {
        ...reviewDataWithUser,
        userName: `${user.firstName} ${user.lastName}`,
        userProfilePic: user.profilePicture
      };
    }
    
    // Create the review
    const newReview = {
      ...reviewDataWithUser,
      helpfulVotes: 0,
      flags: { count: 0, reasons: [] },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const reviewRef = await addDoc(collection(db, 'reviews'), newReview);
    
    // Update the booking to link it to this review
    await updateDoc(doc(db, 'bookings', reviewData.bookingId), {
      'reviews.guestReview': reviewRef.id,
      updatedAt: serverTimestamp()
    });
    
    // Update the property rating statistics
    await updatePropertyRatingStats(reviewData.propertyId);
    
    return reviewRef.id;
  } catch (error: any) {
    console.error('Error creating review:', error);
    throw new Error(error.message || 'Failed to submit review. Please try again.');
  }
};

/**
 * Get a review by ID
 * @param reviewId - The review ID
 * @returns Promise resolving to the review data or null if not found
 */
export const getReviewById = async (reviewId: string): Promise<Review | null> => {
  try {
    const reviewDoc = await getDoc(doc(db, 'reviews', reviewId));
    
    if (!reviewDoc.exists()) {
      return null;
    }
    
    return { id: reviewDoc.id, ...reviewDoc.data() } as Review;
  } catch (error) {
    console.error('Error getting review:', error);
    throw new Error('Failed to load review. Please try again.');
  }
};

/**
 * Get reviews for a property
 * @param propertyId - The property ID
 * @param onlyPublic - Whether to only return public reviews
 * @param pageSize - Number of reviews to fetch
 * @param lastReview - Last review from previous page (for pagination)
 * @returns Promise resolving to the reviews and last document for pagination
 */
export const getPropertyReviews = async (
  propertyId: string,
  onlyPublic = true,
  pageSize = 10,
  lastReview?: QueryDocumentSnapshot<Review>
): Promise<{ reviews: Review[]; lastDoc: QueryDocumentSnapshot<Review> | null }> => {
  try {
    let reviewsQuery = query(
      collection(db, 'reviews'),
      where('propertyId', '==', propertyId),
      orderBy('createdAt', 'desc'),
      firestoreLimit(pageSize)
    );
    
    // Add public filter if requested
    if (onlyPublic) {
      reviewsQuery = query(
        collection(db, 'reviews'),
        where('propertyId', '==', propertyId),
        where('isPublic', '==', true),
        orderBy('createdAt', 'desc'),
        firestoreLimit(pageSize)
      );
    }
    
    // Add pagination if lastReview is provided
    if (lastReview) {
      reviewsQuery = query(reviewsQuery, startAfter(lastReview));
    }
    
    const querySnapshot = await getDocs(reviewsQuery);
    const reviews: Review[] = [];
    let lastDoc: QueryDocumentSnapshot<Review> | null = null;
    
    querySnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() } as Review);
      lastDoc = doc as QueryDocumentSnapshot<Review>;
    });
    
    return { reviews, lastDoc };
  } catch (error) {
    console.error('Error getting property reviews:', error);
    throw new Error('Failed to load reviews. Please try again.');
  }
};

/**
 * Get reviews by a specific user
 * @param userId - The user ID
 * @param pageSize - Number of reviews to fetch
 * @param lastReview - Last review from previous page (for pagination)
 * @returns Promise resolving to the reviews and last document for pagination
 */
export const getUserReviews = async (
  userId: string,
  pageSize = 10,
  lastReview?: QueryDocumentSnapshot<Review>
): Promise<{ reviews: Review[]; lastDoc: QueryDocumentSnapshot<Review> | null }> => {
  try {
    let reviewsQuery = query(
      collection(db, 'reviews'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      firestoreLimit(pageSize)
    );
    
    // Add pagination if lastReview is provided
    if (lastReview) {
      reviewsQuery = query(reviewsQuery, startAfter(lastReview));
    }
    
    const querySnapshot = await getDocs(reviewsQuery);
    const reviews: Review[] = [];
    let lastDoc: QueryDocumentSnapshot<Review> | null = null;
    
    querySnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() } as Review);
      lastDoc = doc as QueryDocumentSnapshot<Review>;
    });
    
    return { reviews, lastDoc };
  } catch (error) {
    console.error('Error getting user reviews:', error);
    throw new Error('Failed to load reviews. Please try again.');
  }
};

/**
 * Update an existing review
 * @param reviewId - The review ID
 * @param reviewData - Updated review data
 * @returns Promise resolving when the review is updated
 */
export const updateReview = async (
  reviewId: string,
  reviewData: Partial<Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'userId' | 'propertyId' | 'bookingId'>>
): Promise<void> => {
  try {
    const reviewRef = doc(db, 'reviews', reviewId);
    const reviewDoc = await getDoc(reviewRef);
    
    if (!reviewDoc.exists()) {
      throw new Error('Review not found');
    }
    
    const review = reviewDoc.data() as Review;
    
    // Don't allow updating these fields
    const { userId, propertyId, bookingId, createdAt, ...validUpdates } = reviewData as any;
    
    // Add updatedAt timestamp
    await updateDoc(reviewRef, {
      ...validUpdates,
      updatedAt: serverTimestamp()
    });
    
    // If rating was updated, update property rating statistics
    if (validUpdates.rating !== undefined || 
        validUpdates.categories !== undefined) {
      await updatePropertyRatingStats(review.propertyId);
    }
  } catch (error: any) {
    console.error('Error updating review:', error);
    throw new Error(error.message || 'Failed to update review. Please try again.');
  }
};

/**
 * Delete a review (admin or original author only)
 * @param reviewId - The review ID
 * @param userId - ID of user requesting the deletion
 * @param isAdmin - Whether the requesting user is an admin
 * @returns Promise resolving when the review is deleted
 */
export const deleteReview = async (
  reviewId: string,
  userId: string,
  isAdmin = false
): Promise<void> => {
  try {
    const reviewRef = doc(db, 'reviews', reviewId);
    const reviewDoc = await getDoc(reviewRef);
    
    if (!reviewDoc.exists()) {
      throw new Error('Review not found');
    }
    
    const review = reviewDoc.data() as Review;
    
    // Verify permissions - only the original author or an admin can delete
    if (review.userId !== userId && !isAdmin) {
      throw new Error('You do not have permission to delete this review');
    }
    
    // Delete the review
    await deleteDoc(reviewRef);
    
    // Update the booking to remove reference to this review
    await updateDoc(doc(db, 'bookings', review.bookingId), {
      'reviews.guestReview': null,
      updatedAt: serverTimestamp()
    });
    
    // Update the property rating statistics
    await updatePropertyRatingStats(review.propertyId);
  } catch (error: any) {
    console.error('Error deleting review:', error);
    throw new Error(error.message || 'Failed to delete review. Please try again.');
  }
};

/**
 * Add a host response to a review
 * @param reviewId - The review ID
 * @param response - Host response content
 * @returns Promise resolving when the response is added
 */
export const addHostResponse = async (
  reviewId: string,
  response: string
): Promise<void> => {
  try {
    const reviewRef = doc(db, 'reviews', reviewId);
    const reviewDoc = await getDoc(reviewRef);
    
    if (!reviewDoc.exists()) {
      throw new Error('Review not found');
    }
    
    await updateDoc(reviewRef, {
      hostResponse: {
        content: response,
        createdAt: serverTimestamp()
      },
      updatedAt: serverTimestamp()
    });
  } catch (error: any) {
    console.error('Error adding host response:', error);
    throw new Error(error.message || 'Failed to add response. Please try again.');
  }
};

/**
 * Mark a review as helpful
 * @param reviewId - The review ID
 * @returns Promise resolving when the helpful vote is recorded
 */
export const markReviewAsHelpful = async (reviewId: string): Promise<void> => {
  try {
    const reviewRef = doc(db, 'reviews', reviewId);
    const reviewDoc = await getDoc(reviewRef);
    
    if (!reviewDoc.exists()) {
      throw new Error('Review not found');
    }
    
    // Increment helpful votes counter
    await updateDoc(reviewRef, {
      helpfulVotes: increment(1),
      updatedAt: serverTimestamp()
    });
  } catch (error: any) {
    console.error('Error marking review as helpful:', error);
    throw new Error(error.message || 'Failed to mark review as helpful. Please try again.');
  }
};

/**
 * Flag a review as inappropriate
 * @param reviewId - The review ID
 * @param reason - Reason for flagging
 * @returns Promise resolving when the flag is recorded
 */
export const flagReview = async (
  reviewId: string,
  reason: string
): Promise<void> => {
  try {
    const reviewRef = doc(db, 'reviews', reviewId);
    const reviewDoc = await getDoc(reviewRef);
    
    if (!reviewDoc.exists()) {
      throw new Error('Review not found');
    }
    
    const review = reviewDoc.data() as Review;
    
    // Get current flags or initialize if not exist
    const flags = review.flags || { count: 0, reasons: [] };
    
    // Update flags
    await updateDoc(reviewRef, {
      flags: {
        count: flags.count + 1,
        reasons: [...flags.reasons, reason]
      },
      updatedAt: serverTimestamp()
    });
    
    // If there are 3 or more flags, mark the review as not public
    if (flags.count + 1 >= 3) {
      await updateDoc(reviewRef, {
        isPublic: false
      });
    }
  } catch (error: any) {
    console.error('Error flagging review:', error);
    throw new Error(error.message || 'Failed to flag review. Please try again.');
  }
};

/**
 * Calculate average rating for a property and update property document
 * @param propertyId - The property ID
 * @returns Promise resolving when the statistics are updated
 */
export const updatePropertyRatingStats = async (propertyId: string): Promise<void> => {
  try {
    // Get all public reviews for the property
    const reviewsQuery = query(
      collection(db, 'reviews'),
      where('propertyId', '==', propertyId),
      where('isPublic', '==', true)
    );
    
    const reviewsSnapshot = await getDocs(reviewsQuery);
    
    // If no reviews, reset rating to 0
    if (reviewsSnapshot.empty) {
      await updateDoc(doc(db, 'properties', propertyId), {
        averageRating: 0,
        reviewCount: 0,
        ratingBreakdown: {
          cleanliness: 0,
          communication: 0,
          checkIn: 0,
          accuracy: 0,
          location: 0,
          value: 0
        }
      });
      return;
    }
    
    // Calculate average ratings
    let totalOverall = 0;
    let totalCleanliness = 0;
    let totalCommunication = 0;
    let totalCheckIn = 0;
    let totalAccuracy = 0;
    let totalLocation = 0;
    let totalValue = 0;
    
    reviewsSnapshot.forEach((doc) => {
      const review = doc.data() as Review;
      totalOverall += review.rating;
      totalCleanliness += review.categories.cleanliness;
      totalCommunication += review.categories.communication;
      totalCheckIn += review.categories.checkIn;
      totalAccuracy += review.categories.accuracy;
      totalLocation += review.categories.location;
      totalValue += review.categories.value;
    });
    
    const reviewCount = reviewsSnapshot.size;
    
    // Calculate averages
    const averageRating = parseFloat((totalOverall / reviewCount).toFixed(1));
    const ratingBreakdown = {
      cleanliness: parseFloat((totalCleanliness / reviewCount).toFixed(1)),
      communication: parseFloat((totalCommunication / reviewCount).toFixed(1)),
      checkIn: parseFloat((totalCheckIn / reviewCount).toFixed(1)),
      accuracy: parseFloat((totalAccuracy / reviewCount).toFixed(1)),
      location: parseFloat((totalLocation / reviewCount).toFixed(1)),
      value: parseFloat((totalValue / reviewCount).toFixed(1))
    };
    
    // Update property document with new ratings
    await updateDoc(doc(db, 'properties', propertyId), {
      averageRating,
      reviewCount,
      ratingBreakdown
    });
  } catch (error: any) {
    console.error('Error updating property rating stats:', error);
    throw new Error(error.message || 'Failed to update property ratings. Please try again.');
  }
};

/**
 * Get properties with the highest ratings
 * @param limit - Maximum number of properties to return
 * @param minReviews - Minimum number of reviews required
 * @returns Promise resolving to top-rated properties
 */
export const getTopRatedProperties = async (
  limit = 5,
  minReviews = 3
): Promise<any[]> => {
  try {
    // First get properties with minimum review count
    const propertiesQuery = query(
      collection(db, 'properties'),
      where('reviewCount', '>=', minReviews),
      where('isActive', '==', true),
      orderBy('reviewCount', 'desc'),
      firestoreLimit(50) // Get a larger sample to sort by rating
    );
    
    const propertiesSnapshot = await getDocs(propertiesQuery);
    
    // Convert to array and sort by rating
    const properties = propertiesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Sort by average rating (descending)
    const sortedProperties = properties.sort((a, b) => b.averageRating - a.averageRating);
    
    // Return top properties
    return sortedProperties.slice(0, limit);
  } catch (error) {
    console.error('Error getting top rated properties:', error);
    throw new Error('Failed to load top rated properties. Please try again.');
  }
};

/**
 * Get reviews that need moderation (flagged reviews)
 * @param pageSize - Number of reviews to fetch
 * @returns Promise resolving to flagged reviews
 */
export const getFlaggedReviews = async (pageSize = 20): Promise<Review[]> => {
  try {
    // Get reviews with at least one flag
    const reviewsQuery = query(
      collection(db, 'reviews'),
      where('flags.count', '>=', 1),
      orderBy('flags.count', 'desc'),
      limit(pageSize)
    );
    
    const reviewsSnapshot = await getDocs(reviewsQuery);
    const reviews: Review[] = [];
    
    reviewsSnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() } as Review);
    });
    
    return reviews;
  } catch (error) {
    console.error('Error getting flagged reviews:', error);
    throw new Error('Failed to load flagged reviews. Please try again.');
  }
};

/**
 * Check if a user can review a property (has completed stay)
 * @param userId - User ID
 * @param propertyId - Property ID
 * @returns Promise resolving to boolean and bookingId if available
 */
export const canUserReviewProperty = async (
  userId: string,
  propertyId: string
): Promise<{ canReview: boolean; bookingId?: string }> => {
  try {
    // Check if user has a completed booking for this property
    const bookingsQuery = query(
      collection(db, 'bookings'),
      where('userId', '==', userId),
      where('propertyId', '==', propertyId),
      where('status', '==', 'completed')
    );
    
    const bookingsSnapshot = await getDocs(bookingsQuery);
    
    if (bookingsSnapshot.empty) {
      return { canReview: false };
    }
    
    // Get the most recent completed booking
    let mostRecentBooking: Booking | null = null;
    bookingsSnapshot.forEach((doc) => {
      const booking = { id: doc.id, ...doc.data() } as Booking;
      
      if (!mostRecentBooking || 
          (booking.dates.checkOut > mostRecentBooking.dates.checkOut)) {
        mostRecentBooking = booking;
      }
    });
    
    if (!mostRecentBooking) {
      return { canReview: false };
    }
    
    // Check if user has already submitted a review for this booking
    const reviewsQuery = query(
      collection(db, 'reviews'),
      where('bookingId', '==', mostRecentBooking.id),
      where('userId', '==', userId)
    );
    
    const reviewsSnapshot = await getDocs(reviewsQuery);
    
    if (!reviewsSnapshot.empty) {
      return { canReview: false };
    }
    
    // Check if the stay was within the last 30 days (review window)
    const checkOutDate = mostRecentBooking.dates.checkOut instanceof Timestamp ? 
      mostRecentBooking.dates.checkOut.toDate() : 
      new Date(mostRecentBooking.dates.checkOut);
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    if (checkOutDate < thirtyDaysAgo) {
      return { canReview: false };
    }
    
    return { 
      canReview: true,
      bookingId: mostRecentBooking.id
    };
  } catch (error) {
    console.error('Error checking if user can review property:', error);
    return { canReview: false };
  }
};

/**
 * Get recent reviews for a property
 * @param propertyId - The property ID
 * @param limit - Maximum number of reviews to return
 * @returns Promise resolving to recent reviews
 */
export const getRecentPropertyReviews = async (
  propertyId: string,
  limit = 3
): Promise<Review[]> => {
  try {
    const reviewsQuery = query(
      collection(db, 'reviews'),
      where('propertyId', '==', propertyId),
      where('isPublic', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limit)
    );
    
    const reviewsSnapshot = await getDocs(reviewsQuery);
    const reviews: Review[] = [];
    
    reviewsSnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() } as Review);
    });
    
    return reviews;
  } catch (error) {
    console.error('Error getting recent property reviews:', error);
    throw new Error('Failed to load recent reviews. Please try again.');
  }
};

// Export additional functions as needed
export default {
  createReview,
  getReviewById,
  getPropertyReviews,
  getUserReviews,
  updateReview,
  deleteReview,
  addHostResponse,
  markReviewAsHelpful,
  flagReview,
  updatePropertyRatingStats,
  getTopRatedProperties,
  getFlaggedReviews,
  canUserReviewProperty,
  getRecentPropertyReviews
};