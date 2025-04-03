'use client';

import React, { useState, useRef, useEffect } from 'react';

import GuestSelector from '@/components/booking/GuestSelector';
import FlexibleBooking from '@/components/booking/FlexibleBooking';
import PriceSummary from '@/components/booking/PriceSummary';
import { useBookingLogic } from '@/hooks/useBookingLogic';
import { format } from 'date-fns';
import SmartDateRangePicker from './SmartDatePicker';

interface SteppedBookingFormProps {
  propertyId: string;
  propertyName: string;
  pricePerNight: number;
  maxGuests: number;
  minNights?: number;
  maxNights?: number;
  bookedDates?: {
    checkIn: string;
    checkOut: string;
  }[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export default function SteppedBookingForm({
  propertyId,
  propertyName,
  pricePerNight,
  maxGuests,
  minNights = 1,
  maxNights = 14,
  bookedDates = [],
  coordinates
}: SteppedBookingFormProps) {
  // Steps in the booking process
  const STEPS = ['Dates', 'Guests', 'Options', 'Contact'];
  const [currentStep, setCurrentStep] = useState(0);
  
  // Refs for step sections (for a11y focus management)
  const stepRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null)
  ];
  
  // Focus management for accessibility
  useEffect(() => {
    // Set focus to the heading of the current step
    if (stepRefs[currentStep]?.current) {
      stepRefs[currentStep].current?.focus();
    }
    
    // Announce step change to screen readers
    const announcement = `Step ${currentStep + 1} of ${STEPS.length}: ${STEPS[currentStep]}`;
    const ariaLive = document.getElementById('booking-step-announcer');
    if (ariaLive) {
      ariaLive.textContent = announcement;
    }
  }, [currentStep, STEPS.length]);
  
  // Use the custom booking hook
  const {
    dateRange,
    setDateRange,
    guests,
    setGuests,
    isLoading,
    error,
    disabledDates,
    pricing,
    handleSubmit
  } = useBookingLogic({
    propertyId,
    pricePerNight,
    maxGuests,
    minNights,
    maxNights,
    bookedDates
  });
  
  // Step navigation handlers
  const goToNextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // State for additional form data
  const [policyId, setPolicyId] = useState('flex-standard');
  const [policyModifier, setPolicyModifier] = useState(0);
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  
  // Handle policy change
  const handlePolicyChange = (policy: any) => {
    setPolicyId(policy.id);
    setPolicyModifier(policy.priceModifier);
  };
  
  // Handle contact info changes
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Determine if current step is complete and next button can be enabled
  const canProceed = () => {
    switch (currentStep) {
      case 0: // Dates step
        return dateRange[0] !== null && dateRange[1] !== null;
      case 1: // Guests step
        return guests > 0 && guests <= maxGuests;
      case 2: // Options step
        return true; // Always can proceed from options
      case 3: // Contact step
        return (
          contactInfo.firstName.trim() !== '' &&
          contactInfo.lastName.trim() !== '' &&
          contactInfo.email.trim() !== '' &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email) && // Basic email validation
          contactInfo.phone.trim() !== ''
        );
      default:
        return false;
    }
  };
  
  // Form submission wrapper
  const submitBooking = (e: React.FormEvent) => {
    // Include all collected info in the submission
    e.preventDefault();
    handleSubmit(e);
  };
  
  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      {/* Booking title and property info */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">${pricePerNight} <span className="text-sm font-normal text-gray-600">night</span></h2>
        <div className="text-gray-600 text-sm">{propertyName}</div>
      </div>
      
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {STEPS.map((step, idx) => (
            <React.Fragment key={step}>
              <div 
                className={`relative flex flex-col items-center ${idx <= currentStep ? 'text-emerald-600' : 'text-gray-400'}`}
                aria-current={idx === currentStep ? 'step' : undefined}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    idx < currentStep 
                      ? 'bg-emerald-600 border-emerald-600 text-white' 
                      : idx === currentStep 
                        ? 'border-emerald-600 text-emerald-600' 
                        : 'border-gray-300'
                  }`}
                >
                  {idx < currentStep ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>
                <span className="text-xs mt-1">{step}</span>
              </div>
              
              {/* Connector line between steps */}
              {idx < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 ${idx < currentStep ? 'bg-emerald-600' : 'bg-gray-300'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Screen reader announcements */}
      <div id="booking-step-announcer" className="sr-only" aria-live="polite"></div>
      
      {/* Form steps */}
      <form onSubmit={submitBooking}>
        {/* Step 1: Dates */}
        <div 
          ref={stepRefs[0]} 
          className={`${currentStep === 0 ? 'block' : 'hidden'}`}
          tabIndex={-1}
          aria-labelledby="step-heading-dates"
        >
          <h3 id="step-heading-dates" className="text-lg font-semibold mb-4">Select your dates</h3>
          <SmartDateRangePicker
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            onChange={setDateRange}
            minNights={minNights}
            maxNights={maxNights}
            disabledDates={disabledDates}
            locationCoordinates={coordinates}
            ariaDescribedBy="dates-description"
          />
          <p id="dates-description" className="text-sm text-gray-500 mt-2">
            {minNights > 1 ? `Minimum stay: ${minNights} nights.` : ''}
            {maxNights < 14 ? ` Maximum stay: ${maxNights} nights.` : ''}
          </p>
        </div>
        
        {/* Step 2: Guests */}
        <div 
          ref={stepRefs[1]} 
          className={`${currentStep === 1 ? 'block' : 'hidden'}`}
          tabIndex={-1}
          aria-labelledby="step-heading-guests"
        >
          <h3 id="step-heading-guests" className="text-lg font-semibold mb-4">How many guests?</h3>
          <GuestSelector
            value={guests}
            maxGuests={maxGuests}
            onChange={setGuests}
            helpText={`This property can accommodate up to ${maxGuests} guests`}
          />
          
          {/* Date summary */}
          {dateRange[0] && dateRange[1] && (
            <div className="mt-6 p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-1">Your stay</h4>
              <div className="flex justify-between text-sm">
                <div>
                  <div className="text-gray-600">Check-in</div>
                  <div>{format(dateRange[0], 'EEE, MMM d, yyyy')}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-600">Duration</div>
                  <div>{pricing.nights} nights</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-600">Check-out</div>
                  <div>{format(dateRange[1], 'EEE, MMM d, yyyy')}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Step 3: Options */}
        <div 
          ref={stepRefs[2]} 
          className={`${currentStep === 2 ? 'block' : 'hidden'}`}
          tabIndex={-1}
          aria-labelledby="step-heading-options"
        >
          <h3 id="step-heading-options" className="text-lg font-semibold mb-4">Booking options</h3>
          <FlexibleBooking 
            basePrice={pricePerNight}
            onPolicyChange={handlePolicyChange}
            defaultPolicyId={policyId}
          />
          
          {/* Add more options here - like add-ons, experiences, etc. */}
        </div>
        
        {/* Step 4: Contact information */}
        <div 
          ref={stepRefs[3]} 
          className={`${currentStep === 3 ? 'block' : 'hidden'}`}
          tabIndex={-1}
          aria-labelledby="step-heading-contact"
        >
          <h3 id="step-heading-contact" className="text-lg font-semibold mb-4">Your information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={contactInfo.firstName}
                onChange={handleContactChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter your first name"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={contactInfo.lastName}
                onChange={handleContactChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter your last name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={contactInfo.email}
                onChange={handleContactChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={contactInfo.phone}
                onChange={handleContactChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="(123) 456-7890"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
              Special Requests (Optional)
            </label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              rows={4}
              value={contactInfo.specialRequests}
              onChange={handleContactChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Any special requests or considerations..."
            ></textarea>
          </div>
          
          {/* Price summary for final review */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Reservation Summary</h4>
            <PriceSummary 
              lineItems={[
                { label: `${pricing.nights} nights x $${pricePerNight}`, amount: pricing.totalPrice, helpText: "Base rate" },
                { label: "Cleaning fee", amount: pricing.cleaningFee },
                { label: "Service fee", amount: pricing.serviceFee }
              ]}
              title=""
              note="You won't be charged yet"
            />
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={goToPreviousStep}
            className={`px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
              currentStep === 0 ? 'invisible' : ''
            }`}
          >
            Back
          </button>
          
          {currentStep < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={goToNextStep}
              disabled={!canProceed()}
              className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading || !canProceed()}
              className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Confirm and Pay'}
            </button>
          )}
        </div>
        
        {/* Error message */}
        {error && (
          <div 
            className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm" 
            role="alert"
          >
            {error}
          </div>
        )}
      </form>
    </div>
  );
}