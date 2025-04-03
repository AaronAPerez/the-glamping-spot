'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Home, 
  DollarSign, 
  AlertTriangle, 
  Check, 
  X, 
  Mail, 
  Phone, 
  MessageSquare 
} from 'lucide-react';

export default function BookingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.id as string;
  
  // State for booking data
  const [booking, setBooking] = useState<any>(null);
  const [property, setProperty] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Admin notes state
  const [adminNotes, setAdminNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  
  // Fetch booking details
  useEffect(() => {
    const fetchBookingDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get booking document
        const bookingDoc = await getDoc(doc(db, 'bookings', bookingId));
        
        if (!bookingDoc.exists()) {
          throw new Error('Booking not found');
        }
        
        const bookingData = bookingDoc.data();
        setBooking(bookingData);
        
        // Set admin notes if available
        if (bookingData.notes && bookingData.notes.private) {
          setAdminNotes(bookingData.notes.private);
        }
        
        // Get property details
        if (bookingData.propertyId) {
          const propertyDoc = await getDoc(doc(db, 'properties', bookingData.propertyId));
          
          if (propertyDoc.exists()) {
            setProperty(propertyDoc.data());
          }
        }
        
        // Get user details
        if (bookingData.userId) {
          const userDoc = await getDoc(doc(db, 'users', bookingData.userId));
          
          if (userDoc.exists()) {
            setUser(userDoc.data());
          }
        }
      } catch (error) {
        console.error('Error fetching booking details:', error);
        setError('Failed to load booking details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);
  
  // Handle booking status update
  const updateBookingStatus = async (status: string) => {
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      
      await updateDoc(bookingRef, {
        status,
        updatedAt: Timestamp.now()
      });
      
      // Update local state
      setBooking(prev => ({
        ...prev,
        status
      }));
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Failed to update booking status. Please try again.');
    }
  };
  
  // Handle saving admin notes
  const saveAdminNotes = async () => {
    setSavingNotes(true);
    
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      
      await updateDoc(bookingRef, {
        'notes.private': adminNotes,
        updatedAt: Timestamp.now()
      });
      
      alert('Notes saved successfully');
    } catch (error) {
      console.error('Error saving notes:', error);
      alert('Failed to save notes. Please try again.');
    } finally {
      setSavingNotes(false);
    }
  };
  
  // Format date
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp instanceof Timestamp ? 
      timestamp.toDate() : 
      new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  // Format time
  const formatTime = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp instanceof Timestamp ? 
      timestamp.toDate() : 
      new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
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
  
  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
        <span className="ml-3 text-gray-600">Loading booking details...</span>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
            <div className="mt-4">
              <Link
                href="/admin/bookings"
                className="text-sm font-medium text-red-700 hover:text-red-600"
              >
                &larr; Back to Bookings
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center">
          <Link 
            href="/admin/bookings" 
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            Booking #{bookingId.substring(0, 8)}
          </h1>
        </div>
        
        <div className="mt-4 sm:mt-0 flex space-x-3">
          {booking?.status === 'pending' && (
            <>
              <button
                onClick={() => updateBookingStatus('confirmed')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                <Check className="mr-2 h-4 w-4" />
                Confirm
              </button>
              <button
                onClick={() => updateBookingStatus('canceled')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </button>
            </>
          )}
          
          {booking?.status === 'confirmed' && (
            <button
              onClick={() => updateBookingStatus('completed')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Check className="mr-2 h-4 w-4" />
              Mark as Completed
            </button>
          )}
        </div>
      </div>
      
      {/* Booking status */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Booking Status</h2>
            <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full 
              ${booking?.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                booking?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                booking?.status === 'canceled' ? 'bg-red-100 text-red-800' :
                booking?.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                'bg-gray-100 text-gray-800'}`}
            >
              {booking?.status.charAt(0).toUpperCase() + booking?.status.slice(1)}
            </span>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <div>
              <span className="text-gray-500">Created:</span>
              <span className="ml-1 text-gray-900">
                {booking?.createdAt ? formatDate(booking.createdAt) : 'N/A'}
              </span>
            </div>
            
            <div>
              <span className="text-gray-500">Last Updated:</span>
              <span className="ml-1 text-gray-900">
                {booking?.updatedAt ? formatDate(booking.updatedAt) : 'N/A'}
              </span>
            </div>
            
            <div>
              <span className="text-gray-500">Booking ID:</span>
              <span className="ml-1 text-gray-900">{bookingId}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main booking information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stay details */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-3" />
            <h3 className="text-lg font-medium text-gray-900">Stay Details</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Check-in</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {booking?.dates?.checkIn ? formatDate(booking.dates.checkIn) : 'N/A'}
                  <span className="ml-2 text-gray-500">
                    ({property?.checkInTime || 'N/A'})
                  </span>
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Check-out</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {booking?.dates?.checkOut ? formatDate(booking.dates.checkOut) : 'N/A'}
                  <span className="ml-2 text-gray-500">
                    ({property?.checkOutTime || 'N/A'})
                  </span>
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Number of Nights</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {booking?.pricing?.nights || 'N/A'}
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Guests</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {booking?.guests ? (
                    <span>
                      {booking.guests.adults} Adults
                      {booking.guests.children > 0 && `, ${booking.guests.children} Children`}
                      {booking.guests.infants > 0 && `, ${booking.guests.infants} Infants`}
                      {booking.guests.pets > 0 && `, ${booking.guests.pets} Pets`}
                    </span>
                  ) : 'N/A'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        
        {/* Guest information */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex items-center">
            <User className="h-5 w-5 text-gray-400 mr-3" />
            <h3 className="text-lg font-medium text-gray-900">Guest Information</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {booking?.contactInformation?.fullName || 'N/A'}
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 flex items-center">
                  {booking?.contactInformation?.email || 'N/A'}
                  {booking?.contactInformation?.email && (
                    <a 
                      href={`mailto:${booking.contactInformation.email}`}
                      className="ml-2 text-emerald-600 hover:text-emerald-800"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900 flex items-center">
                  {booking?.contactInformation?.phone || 'N/A'}
                  {booking?.contactInformation?.phone && (
                    <a 
                      href={`tel:${booking.contactInformation.phone}`}
                      className="ml-2 text-emerald-600 hover:text-emerald-800"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  )}
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Special Requests</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {booking?.specialRequests || 'None'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        
        {/* Property and payment */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex items-center">
            <Home className="h-5 w-5 text-gray-400 mr-3" />
            <h3 className="text-lg font-medium text-gray-900">Property & Payment</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Property</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {property?.name || 'N/A'}
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Nightly Rate</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {booking?.pricing?.nightlyRate 
                    ? formatCurrency(booking.pricing.nightlyRate) 
                    : 'N/A'}
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                <dd className="mt-1 text-sm font-bold text-gray-900">
                  {booking?.pricing?.total 
                    ? formatCurrency(booking.pricing.total) 
                    : 'N/A'}
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Payment Status</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {booking?.payment?.status 
                    ? booking.payment.status.charAt(0).toUpperCase() + booking.payment.status.slice(1) 
                    : 'N/A'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      
      {/* Admin notes */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <MessageSquare className="h-5 w-5 text-gray-400 mr-3" />
            <h3 className="text-lg font-medium text-gray-900">Admin Notes</h3>
          </div>
          <button
            onClick={saveAdminNotes}
            disabled={savingNotes}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:border-emerald-700 focus:shadow-outline-emerald"
          >
            {savingNotes ? 'Saving...' : 'Save Notes'}
          </button>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <textarea
            rows={5}
            className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            placeholder="Add private notes about this booking..."
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
          ></textarea>
          <p className="mt-2 text-xs text-gray-500">
            These notes are only visible to admin users and not to the guest.
          </p>
        </div>
      </div>
    </div>
  );
}