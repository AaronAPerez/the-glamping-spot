// import { useAuthStore } from '@/stores/authStore';
// import { useUIStore } from '@/stores/uiStore';
// import Link from 'next/link';
// import { LogOut, User, Settings } from 'lucide-react';

// export default function UserMenu() {
//   const { user, userData, isAuthenticated, isAdmin, logout } = useAuthStore();
//   const { isUserMenuOpen, toggleUserMenu } = useUIStore();
  
//   const handleLogout = async () => {
//     try {
//       await logout();
//       toggleUserMenu(); // Close the menu after logout
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };
  
//   if (!isAuthenticated) {
//     return (
//       <div className="flex items-center space-x-4">
//         <Link 
//           href="/login" 
//           className="text-sm font-medium text-gray-700 hover:text-emerald-600"
//         >
//           Log in
//         </Link>
//         <Link
//           href="/register"
//           className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
//         >
//           Sign up
//         </Link>
//       </div>
//     );
//   }
  
//   return (
//     <div className="relative">
//       <button 
//         onClick={toggleUserMenu}
//         className="flex items-center space-x-2 focus:outline-none"
//         aria-expanded={isUserMenuOpen}
//         aria-haspopup="true"
//       >
//         <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
//           {userData?.profilePicture ? (
//             <img
//               src={userData.profilePicture}
//               alt=""
//               className="w-8 h-8 rounded-full"
//             />
//           ) : (
//             <span className="text-emerald-800 font-medium">
//               {userData?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
//             </span>
//           )}
//         </div>
//         <span className="hidden md:block text-sm font-medium">
//           {userData?.firstName || 'Account'}
//         </span>
//       </button>
      
//       {isUserMenuOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
//           {/* User info */}
//           <div className="px-4 py-2 border-b border-gray-100">
//             <p className="text-sm font-medium">{userData?.firstName} {userData?.lastName}</p>
//             <p className="text-xs text-gray-500 truncate">{user?.email}</p>
//           </div>
          
//           {/* Menu items */}
//           <Link 
//             href="/account" 
//             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//             onClick={toggleUserMenu}
//           >
//             <User className="inline-block w-4 h-4 mr-2" />
//             Your Account
//           </Link>
          
//           {isAdmin && (
//             <Link 
//               href="/admin" 
//               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               onClick={toggleUserMenu}
//             >
//               <Settings className="inline-block w-4 h-4 mr-2" />
//               Admin Dashboard
//             </Link>
//           )}
          
//           <button
//             onClick={handleLogout}
//             className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//           >
//             <LogOut className="inline-block w-4 h-4 mr-2" />
//             Sign out
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }