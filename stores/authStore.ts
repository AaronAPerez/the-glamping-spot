import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  User 
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import { BaseState } from './types';

interface UserData {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'guest' | 'host' | 'admin';
  [key: string]: any;
}

interface AuthState extends BaseState {
  user: User | null;
  userData: UserData | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userData: Partial<UserData>) => Promise<void>;
  logout: () => Promise<void>;
  fetchUserData: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    immer((set, get) => ({
      // Initial state
      user: null,
      userData: null,
      isAuthenticated: false,
      isAdmin: false,
      status: 'idle',
      error: null,
      
      // Actions
      login: async (email, password) => {
        try {
          set(state => {
            state.status = 'loading';
            state.error = null;
          });
          
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          
          set(state => {
            state.user = user;
            state.isAuthenticated = true;
            state.status = 'success';
          });
          
          // Fetch the user data
          await get().fetchUserData();
        } catch (error: any) {
          set(state => {
            state.status = 'error';
            state.error = error.message;
          });
          throw error;
        }
      },
      
      register: async (email, password, userData) => {
        try {
          set(state => {
            state.status = 'loading';
            state.error = null;
          });
          
          // Create user in Firebase Auth
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          
          // Create user document in Firestore
          await setDoc(doc(db, 'users', user.uid), {
            email,
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            phoneNumber: userData.phoneNumber || '',
            role: 'guest', // Default role
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
          
          set(state => {
            state.user = user;
            state.isAuthenticated = true;
            state.status = 'success';
          });
          
          // Fetch the user data
          await get().fetchUserData();
        } catch (error: any) {
          set(state => {
            state.status = 'error';
            state.error = error.message;
          });
          throw error;
        }
      },
      
      logout: async () => {
        try {
          set(state => {
            state.status = 'loading';
            state.error = null;
          });
          
          await signOut(auth);
          
          set(state => {
            state.user = null;
            state.userData = null;
            state.isAuthenticated = false;
            state.isAdmin = false;
            state.status = 'success';
          });
        } catch (error: any) {
          set(state => {
            state.status = 'error';
            state.error = error.message;
          });
          throw error;
        }
      },
      
      fetchUserData: async () => {
        const currentUser = get().user;
        if (!currentUser) return;
        
        try {
          set(state => {
            state.status = 'loading';
          });
          
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data() as UserData;
            
            set(state => {
              state.userData = { ...userData, uid: currentUser.uid };
              state.isAdmin = userData.role === 'admin';
              state.status = 'success';
            });
          } else {
            set(state => {
              state.status = 'error';
              state.error = 'User data not found';
            });
          }
        } catch (error: any) {
          set(state => {
            state.status = 'error';
            state.error = error.message;
          });
        }
      }
    })),
    {
      name: 'auth-storage', // name of the item in localStorage
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        // Don't persist sensitive data or status/error states
      }),
    }
  )
);