"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  adminOnly = false 
}: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin, user, status } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    // Don't redirect while we're checking auth status
    if (status === 'loading') return;
    
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    
    // If admin only and user is not admin, redirect to home
    if (adminOnly && !isAdmin) {
      router.push('/');
    }
  }, [isAuthenticated, isAdmin, router, pathname, status, adminOnly]);
  
  // Show loading state while checking auth
  if (status === 'loading' || !user) {
    return <LoadingSpinner />;
  }
  
  // If admin only and user is not admin, don't render children
  if (adminOnly && !isAdmin) {
    return null;
  }
  
  // If authenticated, render children
  return <>{children}</>;
}