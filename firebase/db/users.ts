/**
 * Database operations for user management 
 * Handles user profile data, preferences, and related operations
 */
import { 
  doc, 
  getDoc, 
  getDocs, 
  collection, 
  query, 
  where, 
  updateDoc, 
  setDoc, 
  deleteDoc, 
  limit, 
  startAfter, 
  orderBy, 
  Timestamp, 
  serverTimestamp, 
  runTransaction,
  QueryDocumentSnapshot 
} from 'firebase/firestore';
import { db } from '../config';
import { User, Booking } from '../../types/database';
import { getBookingById } from './bookings';

/**
 * Get a user by their UID
 * @param uid - Firebase Auth user ID
 * @returns Promise resolving to user data or null if not found
 */
export const getUserById = async (uid: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    
    if (!userDoc.exists()) {
      return null;
    }
    
    return { uid, ...userDoc.data() } as User;
  } catch (error) {
    console.error('Error getting user:', error);
    throw new Error('Failed to load user data. Please try again.');
  }
};

/**
 * Create a new user profile document
 * @param uid - Firebase Auth user ID
 * @param userData - User profile data
 * @returns Promise resolving when the user is created
 */
export const createUser = async (
  uid: string, 
  userData: Omit<User, 'uid' | 'createdAt' | 'lastLogin'>
): Promise<void> => {
  try {
    // Check if user already exists
    const existingUser = await getUserById(uid);
    
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Create user document with timestamps
    await setDoc(doc(db, 'users', uid), {
      ...userData,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    });
  } catch (error: any) {
    console.error('Error creating user:', error);
    throw new Error(error.message || 'Failed to create user. Please try again.');
  }
};

/**
 * Update a user's profile information
 * @param uid - Firebase Auth user ID
 * @param userData - Updated user data
 * @returns Promise resolving when the user is updated
 */
export const updateUser = async (
  uid: string, 
  userData: Partial<Omit<User, 'uid' | 'createdAt' | 'lastLogin'>>
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    
    // Don't allow updating createdAt or lastLogin through this function
    const { createdAt, lastLogin, ...validUpdates } = userData as any;
    
    await updateDoc(userRef, validUpdates);
  } catch (error: any) {
    console.error('Error updating user:', error);
    throw new Error(error.message || 'Failed to update user. Please try again.');
  }
};

/**
 * Update a user's notification preferences
 * @param uid - Firebase Auth user ID
 * @param preferences - Updated notification preferences
 * @returns Promise resolving when preferences are updated
 */
export const updateNotificationPreferences = async (
  uid: string, 
  preferences: {
    email?: boolean;
    sms?: boolean;
    marketing?: boolean;
  }
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    
    const updates: Record<string, any> = {};
    
    // Only update provided preferences
    if (preferences.email !== undefined) {
      updates['notifications.email'] = preferences.email;
    }
    if (preferences.sms !== undefined) {
      updates['notifications.sms'] = preferences.sms;
    }
    if (preferences.marketing !== undefined) {
      updates['notifications.marketing'] = preferences.marketing;
    }
    
    await updateDoc(userRef, updates);
  } catch (error: any) {
    console.error('Error updating notification preferences:', error);
    throw new Error(error.message || 'Failed to update notification preferences. Please try again.');
  }
};

/**
 * Update a user's address information
 * @param uid - Firebase Auth user ID
 * @param address - Updated address
 * @returns Promise resolving when address is updated
 */
export const updateUserAddress = async (
  uid: string, 
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    
    await updateDoc(userRef, { address });
  } catch (error: any) {
    console.error('Error updating user address:', error);
    throw new Error(error.message || 'Failed to update address. Please try again.');
  }
};

/**
 * Update a user's profile picture
 * @param uid - Firebase Auth user ID
 * @param profilePictureUrl - URL to the profile picture
 * @returns Promise resolving when profile picture is updated
 */
export const updateProfilePicture = async (
  uid: string, 
  profilePictureUrl: string
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    
    await updateDoc(userRef, { profilePicture: profilePictureUrl });
  } catch (error: any) {
    console.error('Error updating profile picture:', error);
    throw new Error(error.message || 'Failed to update profile picture. Please try again.');
  }
};

/**
 * Add or remove a property from a user's wishlist
 * @param uid - Firebase Auth user ID
 * @param propertyId - Property ID to add/remove
 * @param add - Whether to add (true) or remove (false) the property
 * @returns Promise resolving when wishlist is updated
 */
export const updateWishlist = async (
  uid: string, 
  propertyId: string, 
  add: boolean
): Promise<void> => {
  try {
    const wishlistRef = doc(db, 'wishlist', uid);
    const wishlistDoc = await getDoc(wishlistRef);
    
    if (wishlistDoc.exists()) {
      const wishlist = wishlistDoc.data().properties || [];
      
      if (add && !wishlist.includes(propertyId)) {
        // Add property to wishlist
        await updateDoc(wishlistRef, {
          properties: [...wishlist, propertyId],
          updatedAt: serverTimestamp()
        });
      } else if (!add && wishlist.includes(propertyId)) {
        // Remove property from wishlist
        await updateDoc(wishlistRef, {
          properties: wishlist.filter((id: string) => id !== propertyId),
          updatedAt: serverTimestamp()
        });
      }
    } else if (add) {
      // Create new wishlist document
      await setDoc(wishlistRef, {
        properties: [propertyId],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
  } catch (error: any) {
    console.error('Error updating wishlist:', error);
    throw new Error(error.message || 'Failed to update wishlist. Please try again.');
  }
};

/**
 * Get a user's wishlist
 * @param uid - Firebase Auth user ID
 * @returns Promise resolving to array of property IDs
 */
export const getUserWishlist = async (uid: string): Promise<string[]> => {
  try {
    const wishlistRef = doc(db, 'wishlist', uid);
    const wishlistDoc = await getDoc(wishlistRef);
    
    if (!wishlistDoc.exists()) {
      return [];
    }
    
    return wishlistDoc.data().properties || [];
  } catch (error) {
    console.error('Error getting wishlist:', error);
    throw new Error('Failed to load wishlist. Please try again.');
  }
};

/**
 * Check if a property is in a user's wishlist
 * @param uid - Firebase Auth user ID
 * @param propertyId - Property ID to check
 * @returns Promise resolving to boolean
 */
export const isPropertyWishlisted = async (
  uid: string, 
  propertyId: string
): Promise<boolean> => {
  try {
    const wishlist = await getUserWishlist(uid);
    return wishlist.includes(propertyId);
  } catch (error) {
    console.error('Error checking wishlist:', error);
    return false;
  }
};

/**
 * Mark a user's email as verified
 * @param uid - Firebase Auth user ID
 * @returns Promise resolving when the email is marked as verified
 */
export const markEmailVerified = async (uid: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    
    await updateDoc(userRef, { verified: true });
  } catch (error: any) {
    console.error('Error marking email as verified:', error);
    throw new Error(error.message || 'Failed to update verification status. Please try again.');
  }
};

/**
 * Update a user's language preference
 * @param uid - Firebase Auth user ID
 * @param language - Language code (e.g., 'en', 'es')
 * @returns Promise resolving when language preference is updated
 */
export const updateLanguagePreference = async (
  uid: string, 
  language: string
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    
    await updateDoc(userRef, { languagePreference: language });
  } catch (error: any) {
    console.error('Error updating language preference:', error);
    throw new Error(error.message || 'Failed to update language preference. Please try again.');
  }
};

/**
 * Update a user's currency preference
 * @param uid - Firebase Auth user ID
 * @param currency - Currency code (e.g., 'USD', 'EUR')
 * @returns Promise resolving when currency preference is updated
 */
export const updateCurrencyPreference = async (
  uid: string, 
  currency: string
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    
    await updateDoc(userRef, { preferredCurrency: currency });
  } catch (error: any) {
    console.error('Error updating currency preference:', error);
    throw new Error(error.message || 'Failed to update currency preference. Please try again.');
  }
};
  
  /**
   * Get users for admin dashboard with pagination
   * @param pageSize - Number of users to fetch
   * @param lastUser - Last user from previous page (for pagination)
   * @param role - Optional role filter
   * @returns Promise resolving to users and last document for pagination
   */
  export const getUsers = async (
    pageSize = 20,
    lastUser?: QueryDocumentSnapshot<User>,
    role?: User['role']
  ): Promise<{ users: User[]; lastDoc: QueryDocumentSnapshot<User> | null }> => {
    try {
      let usersQuery = query(
        collection(db, 'users'),
        orderBy('lastName'),
        limit(pageSize)
      );
      
      // Add role filter if provided
      if (role) {
        usersQuery = query(
          collection(db, 'users'),
          where('role', '==', role),
          orderBy('lastName'),
          limit(pageSize)
        );
      }
      
      // Add pagination if lastUser is provided
      if (lastUser) {
        usersQuery = query(usersQuery, startAfter(lastUser));
      }
      
      const querySnapshot = await getDocs(usersQuery);
      const users: User[] = [];
      let lastDoc: QueryDocumentSnapshot<User> | null = null;
      
      querySnapshot.forEach((doc) => {
        users.push({ uid: doc.id, ...doc.data() } as User);
        lastDoc = doc as QueryDocumentSnapshot<User>;
      });
      
      return { users, lastDoc };
    } catch (error) {
      console.error('Error getting users:', error);
      throw new Error('Failed to load users. Please try again.');
    }
  };
  
  /**
   * Search for users by name or email
   * @param searchTerm - Term to search for
   * @param limit - Maximum number of results to return
   * @returns Promise resolving to array of matching users
   */
  export const searchUsers = async (
    searchTerm: string, 
    limit = 10
  ): Promise<User[]> => {
    try {
      // Convert search term to lowercase for case-insensitive matching
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      
      // Search by email (exact match)
      const emailQuery = query(
        collection(db, 'users'),
        where('email', '==', lowercaseSearchTerm),
        limit(limit)
      );
      
      // Search by first name (startsWith match)
      const firstNameQuery = query(
        collection(db, 'users'),
        where('firstName', '>=', lowercaseSearchTerm),
        where('firstName', '<=', lowercaseSearchTerm + '\uf8ff'),
        limit(limit)
      );
      
      // Search by last name (startsWith match)
      const lastNameQuery = query(
        collection(db, 'users'),
        where('lastName', '>=', lowercaseSearchTerm),
        where('lastName', '<=', lowercaseSearchTerm + '\uf8ff'),
        limit(limit)
      );
      
      // Execute all queries
      const [emailResults, firstNameResults, lastNameResults] = await Promise.all([
        getDocs(emailQuery),
        getDocs(firstNameQuery),
        getDocs(lastNameQuery)
      ]);
      
      // Combine results and remove duplicates
      const resultsMap = new Map<string, User>();
      
      // Add results from all queries, overwriting duplicates
      const addResults = (snapshot: any) => {
        snapshot.forEach((doc: any) => {
          resultsMap.set(doc.id, { uid: doc.id, ...doc.data() } as User);
        });
      };
      
      addResults(emailResults);
      addResults(firstNameResults);
      addResults(lastNameResults);
      
      // Convert map to array
      return Array.from(resultsMap.values());
    } catch (error) {
      console.error('Error searching users:', error);
      throw new Error('Failed to search users. Please try again.');
    }
  };
  
  /**
   * Update a user's role (admin only)
   * @param uid - Firebase Auth user ID
   * @param role - New role to assign ('guest', 'host', or 'admin')
   * @returns Promise resolving when role is updated
   */
  export const updateUserRole = async (
    uid: string, 
    role: User['role']
  ): Promise<void> => {
    try {
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      
      // Validate role
      if (!['guest', 'host', 'admin'].includes(role)) {
        throw new Error('Invalid role');
      }
      
      await updateDoc(userRef, { role });
    } catch (error: any) {
      console.error('Error updating user role:', error);
      throw new Error(error.message || 'Failed to update user role. Please try again.');
    }
  };
  
  /**
   * Deactivate a user account (admin only)
   * This doesn't delete the auth account, just marks the user as inactive
   * @param uid - Firebase Auth user ID
   * @param deactivationReason - Reason for deactivation
   * @returns Promise resolving when user is deactivated
   */
  export const deactivateUser = async (
    uid: string, 
    deactivationReason: string
  ): Promise<void> => {
    try {
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      
      // Create deactivated user document
      await setDoc(doc(db, 'deactivatedUsers', uid), {
        ...userDoc.data(),
        deactivationReason,
        deactivatedAt: serverTimestamp()
      });
      
      // Do not delete the original user document - just mark it as inactive
      // This preserves references in other collections (e.g., bookings)
      await updateDoc(userRef, {
        isActive: false,
        deactivatedAt: serverTimestamp(),
        deactivationReason
      });
    } catch (error: any) {
      console.error('Error deactivating user:', error);
      throw new Error(error.message || 'Failed to deactivate user. Please try again.');
    }
  };
  
  /**
   * Reactivate a user account (admin only)
   * @param uid - Firebase Auth user ID
   * @returns Promise resolving when user is reactivated
   */
  export const reactivateUser = async (uid: string): Promise<void> => {
    try {
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      
      // Update user document to mark as active
      await updateDoc(userRef, {
        isActive: true,
        deactivatedAt: null,
        deactivationReason: null
      });
      
      // Remove from deactivated users collection
      await deleteDoc(doc(db, 'deactivatedUsers', uid));
    } catch (error: any) {
      console.error('Error reactivating user:', error);
      throw new Error(error.message || 'Failed to reactivate user. Please try again.');
    }
  };
  
  /**
   * Get a user's booking history with details
   * @param uid - Firebase Auth user ID
   * @returns Promise resolving to booking history with details
   */
  export const getUserBookingHistory = async (uid: string): Promise<any[]> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      
      const userData = userDoc.data() as User;
      const bookingHistory = userData.bookingHistory || [];
      
      // If no bookings, return empty array
      if (bookingHistory.length === 0) {
        return [];
      }
      
      // Get details for each booking
      const bookingsWithDetails = await Promise.all(
        bookingHistory.map(async (bookingId) => {
          try {
            const booking = await getBookingById(bookingId);
            
            if (!booking) {
              return null; // Skip if booking not found
            }
            
            // Get property details (simplified version)
            const propertyDoc = await getDoc(doc(db, 'properties', booking.propertyId));
            const property = propertyDoc.exists() ? {
              id: propertyDoc.id,
              name: propertyDoc.data().name,
              propertyType: propertyDoc.data().propertyType,
              images: propertyDoc.data().images,
              location: propertyDoc.data().location
            } : null;
            
            return {
              booking,
              property
            };
          } catch (error) {
            console.error(`Error getting details for booking ${bookingId}:`, error);
            return null;
          }
        })
      );
      
      // Filter out null results (bookings that couldn't be found)
      return bookingsWithDetails.filter(Boolean);
    } catch (error: any) {
      console.error('Error getting user booking history:', error);
      throw new Error(error.message || 'Failed to load booking history. Please try again.');
    }
  };
  
  /**
   * Get user account statistics (admin only)
   * @returns Promise resolving to user statistics
   */
  export const getUserStats = async (): Promise<{
    totalUsers: number;
    activeUsers: number;
    usersByRole: Record<string, number>;
    recentSignups: User[];
  }> => {
    try {
      // Get total users count
      const totalUsersQuery = query(collection(db, 'users'));
      const totalUsersSnapshot = await getDocs(totalUsersQuery);
      const totalUsers = totalUsersSnapshot.size;
      
      // Get active users count (users who have logged in within the last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const activeUsersQuery = query(
        collection(db, 'users'),
        where('lastLogin', '>=', Timestamp.fromDate(thirtyDaysAgo))
      );
      const activeUsersSnapshot = await getDocs(activeUsersQuery);
      const activeUsers = activeUsersSnapshot.size;
      
      // Get users by role
      const usersByRole: Record<string, number> = {
        guest: 0,
        host: 0,
        admin: 0
      };
      
      totalUsersSnapshot.forEach((doc) => {
        const userData = doc.data();
        const role = userData.role || 'guest';
        usersByRole[role] = (usersByRole[role] || 0) + 1;
      });
      
      // Get recent signups (last 10)
      const recentSignupsQuery = query(
        collection(db, 'users'),
        orderBy('createdAt', 'desc'),
        limit(10)
      );
      const recentSignupsSnapshot = await getDocs(recentSignupsQuery);
      const recentSignups: User[] = [];
      
      recentSignupsSnapshot.forEach((doc) => {
        recentSignups.push({ uid: doc.id, ...doc.data() } as User);
      });
      
      return {
        totalUsers,
        activeUsers,
        usersByRole,
        recentSignups
      };
    } catch (error) {
      console.error('Error getting user stats:', error);
      throw new Error('Failed to load user statistics. Please try again.');
    }
  };
  
  // Export additional functions as needed
  export default {
    getUserById,
    createUser,
    updateUser,
    updateNotificationPreferences,
    updateUserAddress,
    updateProfilePicture,
    updateWishlist,
    getUserWishlist,
    isPropertyWishlisted,
    markEmailVerified,
    updateLanguagePreference,
    updateCurrencyPreference,
    getUsers,
    searchUsers,
    updateUserRole,
    deactivateUser,
    reactivateUser,
    getUserBookingHistory,
    getUserStats
  };