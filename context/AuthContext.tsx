"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useAuthStore } from "@/stores/authStore";
import { useQueryClient } from "@tanstack/react-query";

// Create an empty context
export const AuthContext = createContext<null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, setUser, fetchUserData } = useAuthStore();
  const queryClient = useQueryClient();
  
  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        setUser(firebaseUser);
        await fetchUserData();
      } else {
        // User is signed out
        setUser(null);
        // Clear any user-specific queries from cache
        queryClient.invalidateQueries();
      }
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [setUser, fetchUserData, queryClient]);
  
  return (
    <AuthContext.Provider value={null}>
      {children}
    </AuthContext.Provider>
  );
}

// This context is now just a wrapper to initialize the auth listener
// Components should use useAuthStore() instead of this context
export const useAuth = () => useContext(AuthContext);