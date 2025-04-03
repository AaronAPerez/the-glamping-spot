"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import { 
  AlertCircle, 
  Calendar, 
  CheckCircle, 
  Clock, 
  File, 
  MapPin, 
  User, 
  XCircle, 
  ChevronLeft,
  Printer,
  Send
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

// Define the Booking type to avoid "any" type errors
interface BookingType {
  id: string;
  propertyId: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'canceled' | 'completed' | 'rejected';
  dates: {
    checkIn: Timestamp;
    checkOut: Timestamp;
  };
  guests: {
    adults: number;
    children: number;
    infants: number;
    pets: number;
  };
  contactInformation: {
    fullName: string;
    email: string;
    phone: string;
    emergencyContact?: {
      name: string;
      phone: string;
      relationship: string;
    };
  };
  specialRequests?: string;
  pricing: {
    nightlyRate: number;
    nights: number;
    subtotal: number;
    cleaningFee: number;
    serviceFee: number;
    taxes: number;
    total: number;
    discountCode?: string;
    discountAmount?: number;
  };
  payment: {
    status: 'pending' | 'paid' | 'refunded' | 'partially_refunded' | 'failed';
    method?: string;
    transactionId?: string;
    refundAmount?: number;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  propertyDetails?: {
    name: string;
    location: {
      city: string;
      state: string;
    };
    imageUrl: string;
  };
}

interface PropertyType {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
  };
  images: Array<{
    url: string;
    alt?: string;
  }>;
}

/**
 * Booking details page for admin dashboard
 * Displays complete information about a booking and allows status changes
 */
export default function BookingDetailsPage({ params }: { params: { id: string } }) {
  const [booking, setBooking] = useState<BookingType | null>(null);
  const [property, setProperty] = useState<PropertyType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState({
    loading: false,
    success: false,
    error: null as string | null,
  });
  const router = useRouter();
  
  // Fetch booking data
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        setLoading(true);
        
        const bookingDoc = await getDoc(doc(db, "bookings", params.id));
        
        if (!bookingDoc.exists()) {
          setError("Booking not found");
          setLoading(false);
          return;
        }
        
        const bookingData = {
          id: bookingDoc.id,
          ...bookingDoc.data()
        } as BookingType;
        
        setBooking(bookingData);
        
        // Fetch property details
        if (bookingData.propertyId) {
          const propertyDoc = await getDoc(doc(db, "properties", bookingData.propertyId));
          
          if (propertyDoc.exists()) {
            const propertyData = {
              id: propertyDoc.id,
              ...propertyDoc.data()
            } as PropertyType;
            
            setProperty(propertyData);
            
            // Add property details to booking for easier access
            setBooking(prev => {
              if (!prev) return null;
              return {
                ...prev,
                propertyDetails: {
                  name: propertyData.name,
                  location: propertyData.location,
                  imageUrl: propertyData.images[0]?.url || ''
                }
              };
            });
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching booking:", err);
        setError("Failed to load booking details. Please try again.");
        setLoading(false);
      }
    };
    
    fetchBookingData();
  }, [params.id]);
  
  // Update booking status
  const handleStatusChange = async (newStatus: BookingType['status']) => {
    if (!booking) return;
    
    try {
      setUpdateStatus({ loading: true, success: false, error: null });
      
      await updateDoc(doc(db, "bookings", booking.id), {
        status: newStatus,
        updatedAt: Timestamp.now()
      });
      
      // Update local state
      setBooking(prev => {
        if (!prev) return null;
        return { ...prev, status: newStatus };
      });
      
      setUpdateStatus({
        loading: false,
        success: true,
        error: null
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setUpdateStatus(prev => ({ ...prev, success: false }));
      }, 3000);
    } catch (err) {
      console.error("Error updating booking status:", err);
      setUpdateStatus({
        loading: false,
        success: false,
        error: "Failed to update booking status. Please try again."
      });
    }
  };
  
  // Format date
  const formatDate = (timestamp: Timestamp | undefined) => {
    if (!timestamp) return "N/A";
    return format(timestamp.toDate(), "MMMM d, yyyy");
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  // Get status badge color
  const getStatusColor = (status: BookingType['status']) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Render loading state
  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <ChevronLeft className="mr-2" />
          <Link href="/admin/bookings" className="text-emerald-600 hover:text-emerald-700">
            Back to Bookings
          </Link>
        </div>
        
        <div className="flex flex-col space-y-4 items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }
  
  // Render error state
  if (error || !booking) {
    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <ChevronLeft className="mr-2" />
          <Link href="/admin/bookings" className="text-emerald-600 hover:text-emerald-700">
            Back to Bookings
          </Link>
        </div>
        
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <div className="flex">
            <AlertCircle className="text-red-500 mr-3" />
            <p className="text-red-700">{error || "Booking data is missing"}</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <div className="flex items-center mb-2">
            <ChevronLeft className="mr-2" />
            <Link href="/admin/bookings" className="text-emerald-600 hover:text-emerald-700">
              Back to Bookings
            </Link>
          </div>
          <h1 className="text-2xl font-bold">
            Booking #{booking.id.substring(0, 8)}
          </h1>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </button>
          
          <button
            onClick={() => {
              const emailSubject = `Booking #${booking.id.substring(0, 8)} - ${booking.propertyDetails?.name || "Booking"} Details`;
              const emailBody = `Hello ${booking.contactInformation.fullName},\n\nHere are your booking details...\n\nThank you for choosing The Glamping Spot!`;
              window.location.href = `mailto:${booking.contactInformation.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            }}
            className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Send className="h-4 w-4" />
            <span>Email Guest</span>
          </button>
        </div>
      </div>
      
      {/* Status update messages */}
      {updateStatus.success && (
        <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
          <div className="flex">
            <CheckCircle className="text-green-500 mr-3" />
            <p className="text-green-700">Booking status updated successfully</p>
          </div>
        </div>
      )}
      
      {updateStatus.error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <div className="flex">
            <AlertCircle className="text-red-500 mr-3" />
            <p className="text-red-700">{updateStatus.error}</p>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booking overview */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold mb-4">Booking Overview</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Check-in</p>
                    <p className="font-medium">{formatDate(booking.dates.checkIn)}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Check-out</p>
                    <p className="font-medium">{formatDate(booking.dates.checkOut)}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Length of stay</p>
                    <p className="font-medium">{booking.pricing.nights} nights</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <User className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Guests</p>
                    <p className="font-medium">
                      {booking.guests.adults} adults
                      {booking.guests.children > 0 && `, ${booking.guests.children} children`}
                      {booking.guests.infants > 0 && `, ${booking.guests.infants} infants`}
                      {booking.guests.pets > 0 && `, ${booking.guests.pets} pets`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <File className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Booking ID</p>
                    <p className="font-medium">{booking.id}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Property</p>
                    <p className="font-medium">
                      {booking.propertyDetails?.name || "N/A"}
                      {booking.propertyDetails?.location && ` - ${booking.propertyDetails.location.city}, ${booking.propertyDetails.location.state}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Status management */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Update Booking Status</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleStatusChange('confirmed')}
                  disabled={booking.status === 'confirmed' || updateStatus.loading}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-800 cursor-default'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  Confirm
                </button>
                
                <button
                  onClick={() => handleStatusChange('completed')}
                  disabled={booking.status === 'completed' || updateStatus.loading}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    booking.status === 'completed'
                      ? 'bg-blue-100 text-blue-800 cursor-default'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Mark as Completed
                </button>
                
                <button
                  onClick={() => handleStatusChange('canceled')}
                  disabled={booking.status === 'canceled' || updateStatus.loading}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    booking.status === 'canceled'
                      ? 'bg-red-100 text-red-800 cursor-default'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  Cancel
                </button>
                
                <button
                  onClick={() => handleStatusChange('pending')}
                  disabled={booking.status === 'pending' || updateStatus.loading}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    booking.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800 cursor-default'
                      : 'bg-yellow-600 text-white hover:bg-yellow-700'
                  }`}
                >
                  Set to Pending
                </button>
              </div>
            </div>
          </div>
          
          {/* Guest information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Guest Information</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Full Name</p>
                <p className="font-medium">{booking.contactInformation.fullName}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="font-medium">
                  <a href={`mailto:${booking.contactInformation.email}`} className="text-emerald-600 hover:text-emerald-700">
                    {booking.contactInformation.email}
                  </a>
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Phone</p>
                <p className="font-medium">
                  <a href={`tel:${booking.contactInformation.phone}`} className="text-emerald-600 hover:text-emerald-700">
                    {booking.contactInformation.phone}
                  </a>
                </p>
              </div>
              
              {booking.contactInformation.emergencyContact && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Emergency Contact</p>
                  <p className="font-medium">
                    {booking.contactInformation.emergencyContact.name} ({booking.contactInformation.emergencyContact.relationship})
                  </p>
                  <p className="text-sm">
                    <a href={`tel:${booking.contactInformation.emergencyContact.phone}`} className="text-emerald-600 hover:text-emerald-700">
                      {booking.contactInformation.emergencyContact.phone}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Special requests */}
          {booking.specialRequests && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Special Requests</h2>
              <p className="text-gray-700 whitespace-pre-line">{booking.specialRequests}</p>
            </div>
          )}
          
          {/* Booking timeline */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Booking Timeline</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="relative">
                  <div className="h-4 w-4 rounded-full bg-emerald-500 mt-1"></div>
                  <div className="absolute top-5 bottom-0 left-2 w-px bg-gray-200"></div>
                </div>
                <div className="ml-4">
                  <p className="font-medium">Booking Created</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(booking.createdAt)} at {booking.createdAt?.toDate().toLocaleTimeString()}
                  </p>
                </div>
              </div>
              
              {booking.status !== 'pending' && (
                <div className="flex items-start">
                  <div className="relative">
                    <div className={`h-4 w-4 rounded-full mt-1 ${
                      booking.status === 'confirmed' || booking.status === 'completed' 
                        ? 'bg-green-500' 
                        : booking.status === 'canceled' 
                          ? 'bg-red-500' 
                          : 'bg-gray-500'
                    }`}></div>
                    <div className="absolute top-5 bottom-0 left-2 w-px bg-gray-200"></div>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">
                      Booking {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(booking.updatedAt)} at {booking.updatedAt?.toDate().toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              )}
              
              {booking.payment.status === 'paid' && (
                <div className="flex items-start">
                  <div className="h-4 w-4 rounded-full bg-blue-500 mt-1"></div>
                  <div className="ml-4">
                    <p className="font-medium">Payment Received</p>
                    <p className="text-sm text-gray-500">
                      {formatCurrency(booking.pricing.total)} via {booking.payment.method || 'Credit Card'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right column */}
        <div className="space-y-6">
          {/* Payment summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {formatCurrency(booking.pricing.nightlyRate)} x {booking.pricing.nights} nights
                </span>
                <span>{formatCurrency(booking.pricing.subtotal)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Cleaning fee</span>
                <span>{formatCurrency(booking.pricing.cleaningFee)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Service fee</span>
                <span>{formatCurrency(booking.pricing.serviceFee)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes</span>
                <span>{formatCurrency(booking.pricing.taxes)}</span>
              </div>
              
              {booking.pricing.discountAmount && booking.pricing.discountCode && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({booking.pricing.discountCode})</span>
                  <span>-{formatCurrency(booking.pricing.discountAmount)}</span>
                </div>
              )}
              
              <div className="flex justify-between font-bold pt-2 border-t border-gray-200 mt-2">
                <span>Total</span>
                <span>{formatCurrency(booking.pricing.total)}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Payment Status</p>
                  <p className={`text-sm ${
                    booking.payment.status === 'paid' 
                      ? 'text-green-600' 
                      : booking.payment.status === 'pending'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                  }`}>
                    {booking.payment.status.charAt(0).toUpperCase() + booking.payment.status.slice(1)}
                  </p>
                </div>
                
                {booking.payment.status === 'paid' && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                    Paid in Full
                  </span>
                )}
              </div>
              
              {booking.payment.transactionId && (
                <p className="text-sm text-gray-500 mt-2">
                  Transaction ID: {booking.payment.transactionId}
                </p>
              )}
            </div>
          </div>
          
          {/* Property card */}
          {property && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 w-full">
                {property.images[0] && (
                  <img
                    src={property.images[0].url}
                    alt={property.images[0].alt || property.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg">{property.name}</h3>
                <p className="text-gray-600 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location.city}, {property.location.state}
                </p>
                
                <Link
                  href={`/admin/properties/${property.id}`}
                  className="mt-4 block w-full text-center py-2 border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-50 transition-colors"
                >
                  View Property Details
                </Link>
              </div>
            </div>
          )}
          
          {/* Admin actions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Administrative Actions</h2>
            
            <div className="space-y-3">
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to refund this booking? This action cannot be undone.")) {
                    // Implement refund logic here
                    alert("Refund functionality would be implemented here.");
                  }
                }}
                className="w-full py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                disabled={booking.payment.status !== 'paid' || booking.status === 'refunded'}
              >
                Process Refund
              </button>
              
              <button
                onClick={() => router.push(`/admin/bookings/${booking.id}/edit`)}
                className="w-full py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Edit Booking Details
              </button>
              
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this booking? This action cannot be undone.")) {
                    // Implement delete logic here
                    alert("Delete functionality would be implemented here.");
                  }
                }}
                className="w-full py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors"
              >
                Delete Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}