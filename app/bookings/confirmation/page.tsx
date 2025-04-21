'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  CreditCard, 
  Share2, 
  Download, 
  CheckCircle, 
  Home,
  MailOpen
} from 'lucide-react';
import { Booking, Property } from '@/types/database';

import AnimatedNavigationMenu from '@/components/header/AnimatedNavigationMenu';
import { useAuth } from '@/hooks/useAuth';

export default function BookingConfirmationPage() {
  // Router and query parameters
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  
  // State
  const [booking, setBooking] = useState<Booking | null>(null);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Authentication
  const { user, loading: authLoading } = useAuth();
  
  // Fetch booking and property data
  useEffect(() => {
    const fetchBookingData = async () => {
      if (!bookingId) {
        setError('No booking reference found.');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Fetch booking data
        const bookingDoc = await getDoc(doc(db, 'bookings', bookingId));
        
        if (!bookingDoc.exists()) {
          setError('Booking not found. Please check your booking reference.');
          setLoading(false);
          return;
        }
        
        const bookingData = {
          id: bookingDoc.id,
          ...bookingDoc.data()
        } as Booking;
        
        // Verify booking belongs to current user
        if (user && bookingData.userId !== user.uid) {
          setError('You do not have permission to view this booking.');
          setLoading(false);
          return;
        }
        
        setBooking(bookingData);
        
        // Fetch property data
        const propertyDoc = await getDoc(doc(db, 'properties', bookingData.propertyId));
        
        if (!propertyDoc.exists()) {
          setError('Property details not found.');
          setLoading(false);
          return;
        }
        
        const propertyData = {
          id: propertyDoc.id,
          ...propertyDoc.data()
        } as Property;
        
        setProperty(propertyData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching booking:', err);
        setError('Failed to load booking details. Please try again later.');
        setLoading(false);
      }
    };
    
    if (!authLoading && user) {
      fetchBookingData();
    }
  }, [bookingId, user, authLoading]);
  
  // Format date
  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Handle share booking
  const handleShareBooking = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Glamping Booking',
          text: `I booked a stay at ${property?.name} from ${formatDate(booking?.dates.checkIn)} to ${formatDate(booking?.dates.checkOut)}!`,
          url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support sharing
      navigator.clipboard.writeText(window.location.href);
      alert('Booking link copied to clipboard!');
    }
  };
  
  // Handle download receipt/itinerary (placeholder function)
  const handleDownload = () => {
    alert('Your booking details will be downloaded as a PDF. This feature is coming soon!');
  };
  
  // Redirect to login if needed
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=' + encodeURIComponent('/booking/confirmation?bookingId=' + bookingId));
    }
  }, [authLoading, user, router, bookingId]);
  
  // Loading state
  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AnimatedNavigationMenu 
          user={user}
          isAdmin={false}
          onLogout={async () => {}}
          logo={{
            light: '/images/TheGlampingSpot_W.png',
            dark: '/images/TheGlampingSpot.png'
          }}
        />
        <div className="pt-24 pb-10 max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="text-center">
              <div className="loader">
                <div>
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <span>Loading your booking confirmation...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AnimatedNavigationMenu 
          user={user}
          isAdmin={false}
          onLogout={async () => {}}
          logo={{
            light: '/images/TheGlampingSpot_W.png',
            dark: '/images/TheGlampingSpot.png'
          }}
        />
        <div className="pt-24 pb-10 max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h1>
            <p className="text-gray-700 mb-6">{error}</p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/account/bookings" 
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                View My Bookings
              </Link>
              <Link 
                href="/properties" 
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                <Home className="mr-2 h-5 w-5" aria-hidden="true" />
                Browse Properties
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // If no booking or property found
  if (!booking || !property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AnimatedNavigationMenu 
          user={user}
          isAdmin={false}
          onLogout={async () => {}}
          logo={{
            light: '/images/TheGlampingSpot_W.png',
            dark: '/images/TheGlampingSpot.png'
          }}
        />
        <div className="pt-24 pb-10 max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Information Not Available</h1>
            <p className="text-gray-700 mb-6">The booking details could not be found. Please check your booking reference.</p>
            <Link 
              href="/account/bookings" 
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
              View My Bookings
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <AnimatedNavigationMenu 
        user={user}
        isAdmin={false}
        onLogout={async () => {}}
        logo={{
          light: '/images/TheGlampingSpot_W.png',
          dark: '/images/TheGlampingSpot.png'
        }}
      />
      
      <div className="pt-24 pb-10 max-w-7xl mx-auto px-4">
        {/* Success banner */}
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-8 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-emerald-500" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-emerald-800">Booking Confirmed!</h3>
              <p className="mt-1 text-emerald-700">
                Your reservation has been successfully confirmed. Check your email for booking details.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Booking details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmation</h1>
              <p className="text-gray-600 mb-4">
                Booking reference: <span className="font-mono font-medium">{booking.id}</span>
              </p>
              
              {/* Property info */}
              <div className="flex mb-6 pb-6 border-b border-gray-200">
                <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={property.images[0].url}
                    alt={property.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h2 className="text-xl font-bold">{property.name}</h2>
                  <p className="text-gray-600 flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" aria-hidden="true" />
                    {property.location.address}, {property.location.city}, {property.location.state}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      {property.propertyType}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <Users className="h-3 w-3 mr-1" aria-hidden="true" />
                      {booking.guests.adults + booking.guests.children} guests
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Stay details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-200">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Your Stay</h3>
                  
                  <div className="flex">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-medium">Dates</p>
                      <p>
                        {formatDate(booking.dates.checkIn)} to {formatDate(booking.dates.checkOut)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {booking.pricing.nights} {booking.pricing.nights === 1 ? 'night' : 'nights'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <Clock className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-medium">Check-in / Check-out times</p>
                      <p>Check-in: {property.checkInTime}</p>
                      <p>Check-out: {property.checkOutTime}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Guest Details</h3>
                  
                  <div className="flex">
                    <Users className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-medium">Guest Information</p>
                      <p>{booking.contactInformation.fullName}</p>
                      <p className="text-gray-500">{booking.contactInformation.email}</p>
                      <p className="text-gray-500">{booking.contactInformation.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <Users className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-medium">Number of Guests</p>
                      <p>{booking.guests.adults} Adults</p>
                      {booking.guests.children > 0 && (
                        <p>{booking.guests.children} Children</p>
                      )}
                      {booking.guests.infants > 0 && (
                        <p>{booking.guests.infants} Infants</p>
                      )}
                      {booking.guests.pets > 0 && (
                        <p>{booking.guests.pets} Pets</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment details */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="text-lg font-medium mb-3">Payment Details</h3>
                
                <div className="bg-gray-50 rounded-md p-4">
                  <div className="flex items-center mb-3">
                    <CreditCard className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
                    <span className="font-medium">
                      {booking.payment.method === 'credit_card' 
                        ? 'Credit Card' 
                        : booking.payment.method === 'paypal' 
                          ? 'PayPal' 
                          : booking.payment.method}
                    </span>
                    <span className="ml-auto text-green-600 font-medium">
                      {booking.payment.status === 'paid' ? 'Paid' : booking.payment.status}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        ${booking.pricing.nightlyRate} x {booking.pricing.nights} nights
                      </span>
                      <span>${booking.pricing.subtotal}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cleaning fee</span>
                      <span>${booking.pricing.cleaningFee}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service fee</span>
                      <span>${booking.pricing.serviceFee}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes</span>
                      <span>${booking.pricing.taxes}</span>
                    </div>
                    
                    {booking.pricing.discountAmount && booking.pricing.discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount ({booking.pricing.discountCode})</span>
                        <span>-${booking.pricing.discountAmount}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between font-medium pt-2 border-t border-gray-200 mt-2">
                      <span>Total</span>
                      <span>${booking.pricing.total}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Add-ons */}
              {booking.addOns && booking.addOns.length > 0 && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium mb-3">Add-on Experiences</h3>
                  
                  <div className="space-y-3">
                    {booking.addOns.map((addon, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{addon.name}</p>
                          <p className="text-sm text-gray-500">Quantity: {addon.quantity}</p>
                        </div>
                        <div className="font-medium">${addon.price * addon.quantity}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Special requests */}
              {booking.specialRequests && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Special Requests</h3>
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="text-gray-700 whitespace-pre-line">{booking.specialRequests}</p>
                  </div>
                </div>
              )}
              
              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={handleShareBooking}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  aria-label="Share booking details"
                >
                  <Share2 className="mr-2 h-5 w-5" aria-hidden="true" />
                  Share Booking
                </button>
                
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  aria-label="Download booking details"
                >
                  <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                  Download Details
                </button>
                
                <Link 
                  href={`/account/bookings/${booking.id}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                  View Booking Details
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right column - What's next */}
          <div className="lg:col-span-1">
            {/* Next steps */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">What's Next</h2>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-emerald-800 font-medium">1</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Check your email</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      We've sent a confirmation email to {booking.contactInformation.email} with all your booking details.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-emerald-800 font-medium">2</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Review arrival instructions</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Detailed check-in instructions will be emailed to you 48 hours before your arrival.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-emerald-800 font-medium">3</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Prepare for your trip</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Check the weather forecast and pack accordingly. Don't forget essentials for your glamping adventure!
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Add to calendar button */}
              <button
                onClick={() => alert('Calendar feature coming soon!')}
                className="w-full mt-6 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                Add to Calendar
              </button>
            </div>
            
            {/* Contact information */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Need Help?</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Contact The Glamping Spot</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    If you have any questions about your booking, feel free to contact us.
                  </p>
                </div>
                
                <div className="flex items-center">
                  <MailOpen className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
                  <a href="mailto:support@theglampingspot.com" className="text-emerald-600 hover:underline">
                    support@theglampingspot.com
                  </a>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    href="/contact"
                    className="text-emerald-600 hover:text-emerald-500 font-medium"
                  >
                    Visit our Contact Page →
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Suggested activities */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Things to Do Nearby</h2>
              
              <p className="text-gray-600 mb-4">
                Explore activities and attractions near {property.location.city}.
              </p>
              
              <Link
                href={`/experiences?location=${encodeURIComponent(property.location.city)}`}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                Browse Experiences
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}