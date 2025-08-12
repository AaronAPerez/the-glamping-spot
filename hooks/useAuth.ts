// 'use client';

// import { useContext, useEffect, useState } from 'react';
// import { 
//   User, 
//   onAuthStateChanged, 
//   signOut 
// } from 'firebase/auth';
// import { auth } from '../firebase/config';

// export function useAuth() {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
  



//   // Listen for auth state changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });

//     // Clean up subscription
//     return () => unsubscribe();
//   }, []);

//   // Logout function
//   const logout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

  

//   return { user, loading, logout };
// }