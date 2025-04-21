/**
 * Authentication utilities for Firebase 
 * Handles user authentication flows and user profile management
 */
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendEmailVerification,
  User as FirebaseUser,
  onAuthStateChanged,
  UserCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';
import { User } from '../types/database';

// Get Firebase auth instance
const auth = getAuth();

/**
 * Sign in a user with email and password
 * @param email User's email address
 * @param password User's password
 * @returns Promise resolving to UserCredential
 */
export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    // Map Firebase auth errors to more user-friendly messages
    const errorCode = error.code;
    let errorMessage = 'Failed to sign in. Please try again.';
    
    if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
      errorMessage = 'Invalid email or password. Please try again.';
    } else if (errorCode === 'auth/too-many-requests') {
      errorMessage = 'Too many failed login attempts. Please try again later or reset your password.';
    } else if (errorCode === 'auth/user-disabled') {
      errorMessage = 'This account has been disabled. Please contact support.';
    }
    
    throw new Error(errorMessage);
  }
};

/**
 * Create a new user account and corresponding profile document
 * @param email User's email address
 * @param password User's password
 * @param userData Additional user data (first name, last name, etc.)
 * @returns Promise resolving to UserCredential
 */
export const signUp = async (
  email: string, 
  password: string, 
  userData: { 
    firstName: string; 
    lastName: string; 
    phoneNumber?: string;
  }
): Promise<UserCredential> => {
  try {
    // Create the user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    
    // Set display name in Firebase Auth profile
    await updateProfile(user, {
      displayName: `${userData.firstName} ${userData.lastName}`
    });
    
    // Send email verification
    await sendEmailVerification(user);
    
    // Create user document in Firestore
    const userDoc: Omit<User, 'uid'> = {
      email: email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber || '',
      role: 'guest', // Default role
      notifications: {
        email: true,
        sms: true,
        marketing: false
      },
      verified: false, // Will be updated when email is verified
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    };
    
    // Create user document in Firestore with the same UID as Auth
    await setDoc(doc(db, 'users', user.uid), userDoc);
    
    return userCredential;
  } catch (error: any) {
    // Map Firebase auth errors to more user-friendly messages
    const errorCode = error.code;
    let errorMessage = 'Failed to create account. Please try again.';
    
    if (errorCode === 'auth/email-already-in-use') {
      errorMessage = 'This email is already in use. Please try signing in or use a different email.';
    } else if (errorCode === 'auth/invalid-email') {
      errorMessage = 'The email address is not valid. Please check and try again.';
    } else if (errorCode === 'auth/weak-password') {
      errorMessage = 'The password is too weak. Please use a stronger password.';
    }
    
    throw new Error(errorMessage);
  }
};

/**
 * Sign out the current user
 */
export const signOut = async (): Promise<void> => {
  try {
    return await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Send a password reset email
 * @param email User's email address
 */
export const resetPassword = async (email: string): Promise<void> => {
  try {
    return await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    const errorCode = error.code;
    let errorMessage = 'Failed to send password reset email. Please try again.';
    
    if (errorCode === 'auth/user-not-found') {
      errorMessage = 'No account found with this email address.';
    } else if (errorCode === 'auth/invalid-email') {
      errorMessage = 'The email address is not valid. Please check and try again.';
    }
    
    throw new Error(errorMessage);
  }
};

/**
 * Update user profile information in both Auth and Firestore
 * @param user Current Firebase user
 * @param profileData Updated profile data
 */
export const updateUserProfile = async (
  user: FirebaseUser,
  profileData: {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    profilePicture?: string;
  }
): Promise<void> => {
  try {
    // Update display name in Firebase Auth
    await updateProfile(user, {
      displayName: `${profileData.firstName} ${profileData.lastName}`,
      photoURL: profileData.profilePicture || user.photoURL
    });
    
    // Update user document in Firestore
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      phoneNumber: profileData.phoneNumber || '',
      profilePicture: profileData.profilePicture || null,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile. Please try again.');
  }
};

/**
 * Update user email address (requires recent authentication)
 * @param user Current Firebase user
 * @param newEmail New email address
 * @param password Current password for verification
 */
export const updateUserEmail = async (
  user: FirebaseUser,
  newEmail: string,
  password: string
): Promise<void> => {
  try {
    // Re-authenticate user before changing email
    const credential = EmailAuthProvider.credential(user.email!, password);
    await reauthenticateWithCredential(user, credential);
    
    // Update email in Firebase Auth
    await updateEmail(user, newEmail);
    
    // Update email in Firestore
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      email: newEmail,
      updatedAt: serverTimestamp()
    });
    
    // Send verification email to new address
    await sendEmailVerification(user);
  } catch (error: any) {
    const errorCode = error.code;
    let errorMessage = 'Failed to update email. Please try again.';
    
    if (errorCode === 'auth/requires-recent-login') {
      errorMessage = 'For security reasons, please sign in again before changing your email.';
    } else if (errorCode === 'auth/invalid-email') {
      errorMessage = 'The new email address is not valid. Please check and try again.';
    } else if (errorCode === 'auth/email-already-in-use') {
      errorMessage = 'This email is already in use by another account.';
    } else if (errorCode === 'auth/wrong-password') {
      errorMessage = 'Incorrect password. Please try again.';
    }
    
    throw new Error(errorMessage);
  }
};

/**
 * Update user password (requires recent authentication)
 * @param user Current Firebase user
 * @param currentPassword Current password
 * @param newPassword New password
 */
export const updateUserPassword = async (
  user: FirebaseUser,
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  try {
    // Re-authenticate user before changing password
    const credential = EmailAuthProvider.credential(user.email!, currentPassword);
    await reauthenticateWithCredential(user, credential);
    
    // Update password in Firebase Auth
    await updatePassword(user, newPassword);
  } catch (error: any) {
    const errorCode = error.code;
    let errorMessage = 'Failed to update password. Please try again.';
    
    if (errorCode === 'auth/requires-recent-login') {
      errorMessage = 'For security reasons, please sign in again before changing your password.';
    } else if (errorCode === 'auth/weak-password') {
      errorMessage = 'The new password is too weak. Please use a stronger password.';
    } else if (errorCode === 'auth/wrong-password') {
      errorMessage = 'Current password is incorrect. Please try again.';
    }
    
    throw new Error(errorMessage);
  }
};

/**
 * Get user data from Firestore
 * @param uid User ID
 * @returns Promise resolving to user data or null
 */
export const getUserData = async (uid: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    
    if (userDoc.exists()) {
      return { uid, ...userDoc.data() } as User;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data. Please try again.');
  }
};

/**
 * Check if user is an admin
 * @param uid User ID
 * @returns Promise resolving to boolean
 */
export const isUserAdmin = async (uid: string): Promise<boolean> => {
  try {
    const userData = await getUserData(uid);
    return userData?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

/**
 * Update user's last login timestamp
 * @param uid User ID
 */
export const updateLastLogin = async (uid: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      lastLogin: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating last login:', error);
    // Non-critical error, don't throw
  }
};

/**
 * Set up an observer on the Auth object to handle auth state changes
 * @param callback Function to call when auth state changes
 * @returns Unsubscribe function
 */
export const onAuthStateChange = (
  callback: (user: FirebaseUser | null) => void
): (() => void) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Update last login time when user signs in
      await updateLastLogin(user.uid);
    }
    callback(user);
  });
};

// Export auth instance for direct access if needed
export { auth };