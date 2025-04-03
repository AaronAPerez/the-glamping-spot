'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { 
  Home, 
  Calendar, 
  DollarSign, 
  Users, 
  Settings, 
  BarChart2, 
  LogOut, 
  Menu, 
  X,
  MessageCircle
} from 'lucide-react';

/**
 * Admin Layout Component
 * Provides a consistent layout for all admin pages with navigation
 * Also handles authentication to ensure only admin users can access
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  
  // Check if user is authenticated and has admin role
  useEffect(() => {
    const checkAdminStatus = async () => {
      setLoading(true);
      
      // Listen for auth state changes
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (!user) {
          // No user logged in, redirect to login
          router.push('/login?redirect=/admin');
          return;
        }
        
        try {
          // Check if user has admin role
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();
          
          if (!userData || userData.role !== 'admin') {
            // User is not an admin, redirect to home
            router.push('/');
            return;
          }
          
          // User is authenticated and has admin role
          setLoading(false);
        } catch (error) {
          console.error('Error checking admin status:', error);
          router.push('/login?redirect=/admin');
        }
      });
      
      return () => unsubscribe();
    };
    
    checkAdminStatus();
  }, [router]);
  
  // Handle logging out
  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

   
  // Navigation items for the sidebar
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <Home /> },
    { path: '/admin/bookings', label: 'Bookings', icon: <Calendar /> },
    { path: '/admin/revenue', label: 'Revenue', icon: <DollarSign /> },
    { path: '/admin/customers', label: 'Customers', icon: <Users /> },
    { path: '/admin/analytics', label: 'Analytics', icon: <BarChart2 /> },
    { path: '/admin/messages', label: 'Messages', icon: <MessageCircle /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings /> },
  ];
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button 
        className="fixed top-4 left-4 md:hidden z-50 bg-white p-2 rounded-full shadow-md"
        onClick={() => setNavOpen(!navOpen)}
      >
        {navOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Sidebar navigation */}
      <aside 
        className={`
          fixed inset-y-0 left-0 bg-emerald-800 text-white w-64 transform transition-transform duration-300 ease-in-out z-40
          ${navOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-4 border-b border-emerald-700">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/images/TheGlampingSpot_W.png" 
              alt="The Glamping Spot" 
              width={150} 
              height={40}
              className="object-contain"
            />
          </Link>
          <div className="mt-2 text-sm text-emerald-200">Admin Dashboard</div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  href={item.path}
                  className={`
                    flex items-center space-x-3 p-3 rounded-lg transition-colors
                    ${pathname === item.path 
                      ? 'bg-emerald-700 text-white' 
                      : 'text-emerald-100 hover:bg-emerald-700 hover:text-white'
                    }
                  `}
                  onClick={() => setNavOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 p-3 w-full rounded-lg text-emerald-100 hover:bg-emerald-700 hover:text-white transition-colors"
            >
              <LogOut />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 md:ml-64 p-6">
        {children}
      </main>
    </div>
  );
}