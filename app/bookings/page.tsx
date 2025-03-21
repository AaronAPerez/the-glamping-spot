'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BookingForm from '@/components/booking/BookingForm';
import DatePicker from '@/components/booking/DatePicker';
import GuestSelector from '@/components/booking/GuestSelector';
import PriceSummary from '@/components/booking/PriceSummary';
import FlexibleBooking from '@/components/booking/FlexibleBooking';

export default function BookingPageClient() {
  // State for form inputs
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [guests, setGuests] = useState(2);
  const [policyId, setPolicyId] = useState('flex-standard');
  const [policyModifier, setPolicyModifier] = useState(0);
  
  // Calculate prices based on selections
  const basePrice = 19900; // $199.00 in cents
  const nights = dateRange[0] && dateRange[1] 
    ? Math.max(1, Math.floor((dateRange[1].getTime() - dateRange[0].getTime()) / (1000 * 60 * 60 * 24))) 
    : 2;
  const nightlyRate = basePrice * (1 + policyModifier);
  const totalNightlyPrice = nightlyRate * nights;
  const cleaningFee = 5000; // $50.00
  const serviceFee = Math.round(totalNightlyPrice * 0.12); // 12% service fee
  
  // Handle policy change
  const handlePolicyChange = (policy: any) => {
    setPolicyId(policy.id);
    setPolicyModifier(policy.priceModifier);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your booking logic here
    console.log('Booking submitted', {
      dateRange,
      guests,
      policyId,
      totalPrice: totalNightlyPrice + cleaningFee + serviceFee
    });
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-emerald-600 hover:text-emerald-800"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Complete Your Booking</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main booking form area */}
        <div className="lg:col-span-2">
          <div className="rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
            
            {/* Date Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Select Dates</h3>
              <p className="mb-4">Choose your check-in and check-out dates</p>
              
              {/* This is just for display - actual functionality would use state */}
              <div className="max-w-lg">
                <DatePicker 
                  startDate={null}
                  endDate={null}
                  onChange={() => {}}
                  minNights={2}
                  maxNights={14}
                />
              </div>
            </div>
            
            {/* Guest Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Guests</h3>
              <p className="mb-4">Select the number of guests for your stay</p>
              
              <div className="max-w-xs">
                <GuestSelector 
                  value={2}
                  maxGuests={6}
                  onChange={() => {}}
                  helpText="This property can accommodate up to 6 guests"
                />
              </div>
            </div>
            
            {/* Booking Flexibility */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Booking Options</h3>
              <p className="0 mb-4">Choose your cancellation policy</p>
              
              <FlexibleBooking 
                basePrice={300}
                onPolicyChange={() => {}}
              />
            </div>
          </div>
          
          <div className="rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium  mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium  mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your last name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium  mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="you@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium  mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label htmlFor="specialRequests" className="block text-sm font-medium  mb-1">
                  Special Requests (Optional)
                </label>
                <textarea
                  id="specialRequests"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Any special requests or considerations..."
                ></textarea>
              </div>
            </form>
          </div>
        </div>
        
        {/* Sidebar with pricing */}
        <div className="lg:col-span-1">
          <div className="rounded-lg shadow-md p-6 sticky top-0">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="font-medium">Luxury Geo Dome</h3>
              <p className="text-gray-600">Monterey, California</p>
              <p className="text-sm text-gray-500 mt-2">2 nights · 2 guests</p>
            </div>
            
            <PriceSummary 
              lineItems={[
                { label: "2 nights x $199", amount: 39800, helpText: "Base rate" },
                { label: "Cleaning fee", amount: 5000 },
                { label: "Service fee", amount: 4776 }
              ]}
              title="Pricing Details"
              note="You won't be charged yet"
            />
            
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 font-medium py-3 px-4 rounded-md mt-6 transition duration-150">
              Confirm and Pay
            </button>
            
            <p className="text-xs text-center mt-4">
              By selecting the button above, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}