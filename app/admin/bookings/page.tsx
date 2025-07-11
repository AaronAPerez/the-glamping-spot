'use client';

import { useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  startAfter, 
  limit, 
  Timestamp, 
  doc, 
  updateDoc, 
  getDoc
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { 
  Calendar,
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  X, 
  AlertCircle 
} from 'lucide-react';
import Link from 'next/link';

export default function BookingsPage() {
  // State for bookings data
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [firstVisible, setFirstVisible] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Filter state
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'upcoming',
    searchTerm: '',
    propertyId: 'all'
  });
  
  // Properties for filtering
  const [properties, setProperties] = useState<any[]>([]);
  
  // Fetch properties for filter dropdown
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertiesRef = collection(db, 'properties');
        const propertiesSnapshot = await getDocs(propertiesRef);
        
        const propertiesList = propertiesSnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name
        }));
        
        setProperties(propertiesList);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    
    fetchProperties();
  }, []);
  
  // Fetch bookings with filters and pagination
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const bookingsRef = collection(db, 'bookings');
        let bookingsQuery = query(bookingsRef);
        
        // Apply status filter
        if (filters.status !== 'all') {
          bookingsQuery = query(bookingsQuery, where('status', '==', filters.status));
        }
        
        // Apply property filter
        if (filters.propertyId !== 'all') {
          bookingsQuery = query(bookingsQuery, where('propertyId', '==', filters.propertyId));
        }
        
        // Apply date range filter
        if (filters.dateRange === 'upcoming') {
          const today = new Date();
          bookingsQuery = query(
            bookingsQuery, 
            where('dates.checkIn', '>=', Timestamp.fromDate(today))
          );
        } else if (filters.dateRange === 'past') {
          const today = new Date();
          bookingsQuery = query(
            bookingsQuery, 
            where('dates.checkOut', '<', Timestamp.fromDate(today))
          );
        } else if (filters.dateRange === 'current') {
          const today = new Date();
          bookingsQuery = query(
            bookingsQuery, 
            where('dates.checkIn', '<=', Timestamp.fromDate(today)),
            where('dates.checkOut', '>=', Timestamp.fromDate(today))
          );
        }
        
        // Apply ordering
        bookingsQuery = query(bookingsQuery, orderBy('createdAt', 'desc'));
        
        // Apply pagination
        if (page > 1 && lastVisible) {
          bookingsQuery = query(bookingsQuery, startAfter(lastVisible), limit(10));
        } else {
          bookingsQuery = query(bookingsQuery, limit(10));
        }
        
        const bookingsSnapshot = await getDocs(bookingsQuery);
        
        // Check if there are more results
        setHasMore(bookingsSnapshot.docs.length === 10);
        
        // Get bookings
        const bookingsList = await Promise.all(bookingsSnapshot.docs.map(async (bookingDoc) => {
          const bookingData = bookingDoc.data();
          
          // Get property name
          let propertyName = 'Unknown Property';
          if (bookingData.propertyId) {
            try {
              const propertyDoc = await doc(db, 'properties', bookingData.propertyId);
              const propertySnapshot = await getDoc(propertyDoc);
              if (propertySnapshot.exists()) {
                propertyName = propertySnapshot.data().name;
              }
            } catch (err) {
              console.error('Error fetching property:', err);
            }
          }
          
          return {
            id: bookingDoc.id,
            ...bookingData,
            propertyName
          };
        }));
        
        // Update pagination cursors
        if (bookingsSnapshot.docs.length > 0) {
          setLastVisible(bookingsSnapshot.docs[bookingsSnapshot.docs.length - 1]);
          setFirstVisible(bookingsSnapshot.docs[0]);
        }
        
        setBookings(bookingsList);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load bookings. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [filters, page, lastVisible]);
  
  // Handle filter changes
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setPage(1);
    setLastVisible(null);
  };
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Reset pagination when searching
    setPage(1);
    setLastVisible(null);
  };
  
  // Handle pagination
  const handleNextPage = () => {
    if (hasMore) {
      setPage(prev => prev + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
      setLastVisible(firstVisible);
    }
  };
  
  // Handle booking status update
  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      
      await updateDoc(bookingRef, {
        status: newStatus,
        updatedAt: Timestamp.now()
      });
      
      // Update local state
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: newStatus } 
          : booking
      ));
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Failed to update booking status. Please try again.');
    }
  };
  
  // Format date
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp instanceof Timestamp ? 
      timestamp.toDate() : 
      new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Booking Management</h1>
        <Link href="/admin/bookings/new" className="mt-2 sm:mt-0 inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
          <Calendar className="w-4 h-4 mr-2" />
          Create New Booking
        </Link>
      </div>
      
      {/* Filters and search */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          {/* Status filter */}
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status-filter"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="canceled">Canceled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          {/* Date range filter */}
          <div>
            <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700">Date Range</label>
            <select
              id="date-filter"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            >
              <option value="upcoming">Upcoming</option>
              <option value="current">Current</option>
              <option value="past">Past</option>
              <option value="all">All Time</option>
            </select>
          </div>
          
          {/* Property filter */}
          <div>
            <label htmlFor="property-filter" className="block text-sm font-medium text-gray-700">Property</label>
            <select
              id="property-filter"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              value={filters.propertyId}
              onChange={(e) => handleFilterChange('propertyId', e.target.value)}
            >
              <option value="all">All Properties</option>
              {properties.map(property => (
                <option key={property.id} value={property.id}>
                  {property.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Search */}
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
            <form onSubmit={handleSearch} className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                id="search"
                className="focus:ring-emerald-500 focus:border-emerald-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                placeholder="Search by customer name or booking ID"
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              />
              <button
                type="submit"
                className="ml-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Bookings table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex items-center">
              <AlertCircle className="text-red-500 mr-3" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
                    </div>
                    <p className="mt-2">Loading bookings...</p>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No bookings found matching your filters
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.contactInformation?.fullName || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.propertyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(booking.dates?.checkIn)} - {formatDate(booking.dates?.checkOut)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.pricing?.total ? formatCurrency(booking.pricing.total) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          booking.status === 'canceled' ? 'bg-red-100 text-red-800' : 
                          booking.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Link 
                          href={`/admin/bookings/${booking.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View
                        </Link>
                        
                        {booking.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Confirm
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(booking.id, 'canceled')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={!hasMore}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                !hasMore ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{bookings.length}</span> results
                {bookings.length > 0 && <span> (Page <span className="font-medium">{page}</span>)</span>}
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                    page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={!hasMore}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                    !hasMore ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}