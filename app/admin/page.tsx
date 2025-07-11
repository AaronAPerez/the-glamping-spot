import ProtectedRoute from '@/components/auth/ProtectedRoute';
;

export default function AdminPage() {
  return (
    <ProtectedRoute adminOnly>
      <AdminDashboard />
    </ProtectedRoute>
  );
}
// 'use client';

// import { useState, useEffect } from 'react';
// import { collection, getDocs, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';
// import { db } from '@/firebase/config';
// import { 
//   BarChart2, 
//   Users, 
//   Calendar, 
//   DollarSign, 
//   TrendingUp, 
//   AlertCircle,
//   RefreshCw
// } from 'lucide-react';
// import Link from 'next/link';

// /**
//  * Admin Dashboard Home Page
//  * Displays key metrics and summary information
//  */
// export default function AdminDashboard() {
//   // State for dashboard data
//   const [stats, setStats] = useState({
//     totalBookings: 0,
//     pendingBookings: 0,
//     totalRevenue: 0,
//     totalCustomers: 0,
//     occupancyRate: 0,
//     recentBookings: [] as any[],
//     loading: true,
//     error: null as string | null
//   });
  
//   // Fetch dashboard data
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         // Get bookings
//         const bookingsRef = collection(db, 'bookings');
//         const bookingsSnapshot = await getDocs(bookingsRef);
//         const bookings = bookingsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
        
//         // Calculate booking metrics
//         const totalBookings = bookings.length;
//         const pendingBookings = bookings.filter(booking => 
//           booking.status === 'pending'
//         ).length;
        
//         // Calculate revenue
//         let totalRevenue = 0;
//         bookings.forEach(booking => {
//           if (booking.pricing && booking.pricing.total) {
//             totalRevenue += booking.pricing.total;
//           }
//         });
        
//         // Get customers
//         const usersRef = collection(db, 'users');
//         const usersSnapshot = await getDocs(query(usersRef, where('role', '==', 'guest')));
//         const totalCustomers = usersSnapshot.docs.length;
        
//         // Calculate occupancy rate (simplified)
//         // In a real app, you'd want to calculate this based on available days vs. booked days
//         const occupancyRate = bookings.length > 0 ? 
//           (bookings.filter(b => b.status === 'confirmed' || b.status === 'completed').length / totalBookings) * 100 : 0;
        
//         // Get recent bookings
//         const recentBookingsQuery = query(
//           bookingsRef,
//           orderBy('createdAt', 'desc'),
//           limit(5)
//         );
//         const recentBookingsSnapshot = await getDocs(recentBookingsQuery);
//         const recentBookings = recentBookingsSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
        
//         // Update state with all metrics
//         setStats({
//           totalBookings,
//           pendingBookings,
//           totalRevenue,
//           totalCustomers,
//           occupancyRate,
//           recentBookings,
//           loading: false,
//           error: null
//         });
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//         setStats(prev => ({
//           ...prev,
//           loading: false,
//           error: 'Failed to load dashboard data. Please try again.'
//         }));
//       }
//     };
    
//     fetchDashboardData();
//   }, []);
  
//   // Format currency
//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0
//     }).format(amount);
//   };
  
//   // Format date
//   const formatDate = (timestamp: any) => {
//     if (!timestamp) return 'N/A';
//     const date = timestamp instanceof Timestamp ? 
//       timestamp.toDate() : 
//       new Date(timestamp);
//     return new Intl.DateTimeFormat('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     }).format(date);
//   };
  
//   // Handle refresh
//   const handleRefresh = () => {
//     setStats(prev => ({ ...prev, loading: true }));
//     // Re-fetch data by forcing a re-render
//     // In a real app, you'd call the fetchDashboardData function directly
//     window.location.reload();
//   };
  
//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
//         <button 
//           onClick={handleRefresh} 
//           className="flex items-center space-x-2 bg-white p-2 rounded-md shadow text-gray-600 hover:bg-gray-50"
//           disabled={stats.loading}
//         >
//           <RefreshCw size={16} className={stats.loading ? "animate-spin" : ""} />
//           <span>Refresh</span>
//         </button>
//       </div>
      
//       {stats.error && (
//         <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
//           <div className="flex items-center">
//             <AlertCircle className="text-red-500 mr-3" />
//             <p className="text-red-700">{stats.error}</p>
//           </div>
//         </div>
//       )}
      
//       {/* Key metrics */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {/* Total bookings card */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500 font-medium">Total Bookings</p>
//               <p className="text-3xl font-bold text-gray-800">{stats.loading ? '...' : stats.totalBookings}</p>
//             </div>
//             <div className="bg-blue-100 p-3 rounded-full">
//               <Calendar className="text-blue-600" />
//             </div>
//           </div>
//           <div className="mt-4">
//             <Link href="/admin/bookings" className="text-blue-600 text-sm hover:underline">
//               View all bookings →
//             </Link>
//           </div>
//         </div>
        
//         {/* Revenue card */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
//               <p className="text-3xl font-bold text-gray-800">
//                 {stats.loading ? '...' : formatCurrency(stats.totalRevenue)}
//               </p>
//             </div>
//             <div className="bg-green-100 p-3 rounded-full">
//               <DollarSign className="text-green-600" />
//             </div>
//           </div>
//           <div className="mt-4">
//             <Link href="/admin/revenue" className="text-green-600 text-sm hover:underline">
//               View revenue details →
//             </Link>
//           </div>
//         </div>
        
//         {/* Customers card */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500 font-medium">Total Customers</p>
//               <p className="text-3xl font-bold text-gray-800">{stats.loading ? '...' : stats.totalCustomers}</p>
//             </div>
//             <div className="bg-purple-100 p-3 rounded-full">
//               <Users className="text-purple-600" />
//             </div>
//           </div>
//           <div className="mt-4">
//             <Link href="/admin/customers" className="text-purple-600 text-sm hover:underline">
//               View customer details →
//             </Link>
//           </div>
//         </div>
        
//         {/* Occupancy rate card */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500 font-medium">Occupancy Rate</p>
//               <p className="text-3xl font-bold text-gray-800">
//                 {stats.loading ? '...' : `${Math.round(stats.occupancyRate)}%`}
//               </p>
//             </div>
//             <div className="bg-amber-100 p-3 rounded-full">
//               <BarChart2 className="text-amber-600" />
//             </div>
//           </div>
//           <div className="mt-4">
//             <Link href="/admin/analytics" className="text-amber-600 text-sm hover:underline">
//               View analytics →
//             </Link>
//           </div>
//         </div>
//       </div>
      
//       {/* Quick actions */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <Link 
//             href="/admin/bookings/new" 
//             className="flex items-center p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
//           >
//             <Calendar className="text-blue-600 mr-2" size={18} />
//             <span>Create Booking</span>
//           </Link>
          
//           <Link 
//             href="/admin/revenue/projections" 
//             className="flex items-center p-3 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
//           >
//             <TrendingUp className="text-green-600 mr-2" size={18} />
//             <span>Revenue Projections</span>
//           </Link>
          
//           <Link 
//             href="/admin/bookings/pending" 
//             className="flex items-center p-3 bg-amber-50 rounded-md hover:bg-amber-100 transition-colors"
//           >
//             <AlertCircle className="text-amber-600 mr-2" size={18} />
//             <span>Pending Approvals ({stats.pendingBookings})</span>
//           </Link>
          
//           <Link 
//             href="/admin/settings/offers" 
//             className="flex items-center p-3 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors"
//           >
//             <DollarSign className="text-purple-600 mr-2" size={18} />
//             <span>Manage Offers</span>
//           </Link>
//         </div>
//       </div>
      
//       {/* Recent bookings */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
//         </div>
        
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Booking ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Customer
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Check-in
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {stats.loading ? (
//                 <tr>
//                   <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
//                     Loading recent bookings...
//                   </td>
//                 </tr>
//               ) : stats.recentBookings.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
//                     No bookings found
//                   </td>
//                 </tr>
//               ) : (
//                 stats.recentBookings.map((booking) => (
//                   <tr key={booking.id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {booking.id.substring(0, 8)}...
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {booking.contactInformation?.fullName || 'N/A'}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {formatDate(booking.dates?.checkIn)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {booking.pricing?.total ? formatCurrency(booking.pricing.total) : 'N/A'}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
//                         ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
//                           booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
//                           booking.status === 'canceled' ? 'bg-red-100 text-red-800' : 
//                           'bg-gray-100 text-gray-800'}`}>
//                         {booking.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       <Link 
//                         href={`/admin/bookings/${booking.id}`} 
//                         className="text-indigo-600 hover:text-indigo-900"
//                       >
//                         View
//                       </Link>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
        
//         <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
//           <Link 
//             href="/admin/bookings" 
//             className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
//           >
//             View all bookings →
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }