'use client';

import { useState, useEffect } from 'react';
import AdminNotificationCenter from '@/components/admin/NotificationCenter';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import AdminLayout from '../layout';

export default function AdminDashboard () {
  const { user, userData, loading, isAdmin } = useAuth();
  const router = useRouter();
  const [todaysBookings, setTodaysBookings] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [occupancyRate, setOccupancyRate] = useState(0);
  
  // Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/login?redirect=/admin/dashboard');
    }
  }, [user, isAdmin, loading, router]);
  
  // Fetch dashboard data
  useEffect(() => {
    if (isAdmin) {
      // Fetch dashboard metrics
      // This would typically be an API call
      setTodaysBookings(3);
      setPendingBookings(2);
      setMonthlyRevenue(4500);
      setOccupancyRate(78);
    }
  }, [isAdmin]);
  
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          
          {/* Admin notification center positioned at the top right */}
          <AdminNotificationCenter />
        </div>
        
        {/* Dashboard metrics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-emerald-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Today's Bookings
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {todaysBookings}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a href="/admin/bookings" className="font-medium text-emerald-600 hover:text-emerald-500">
                  View all
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pending Bookings
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {pendingBookings}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a href="/admin/bookings?status=pending" className="font-medium text-emerald-600 hover:text-emerald-500">
                  View all
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Monthly Revenue
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        ${monthlyRevenue.toLocaleString()}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a href="/admin/reports" className="font-medium text-emerald-600 hover:text-emerald-500">
                  View report
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Occupancy Rate
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {occupancyRate}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a href="/admin/properties" className="font-medium text-emerald-600 hover:text-emerald-500">
                  View properties
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent activity and bookings */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <BookingSummary />
          <RecentActivityPanel />
        </div>
      </div>
    </AdminLayout>
  );
}