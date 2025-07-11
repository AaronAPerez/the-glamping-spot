'use client';

import { useEffect } from 'react';
import NotificationSettings from '@/components/admin/NotificationSettings';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import AdminLayout from '../layout';

export default function NotificationSettingsPage() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  
  // Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/login?redirect=/admin/notification-settings');
    }
  }, [user, isAdmin, loading, router]);
  
  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </AdminLayout>
    );
  }
  
  if (!isAdmin) {
    return null; // Will redirect
  }
  
  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Notification Settings</h1>
            <p className="mt-2 text-sm text-gray-600">
              Configure when and how you receive notifications about bookings, contacts, and other events.
            </p>
          </div>
          
          <NotificationSettings />
        </div>
      </div>
    </AdminLayout>
  );
}