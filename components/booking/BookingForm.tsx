'use client';

import React from 'react';
import { format } from 'date-fns';
import { useBookingLogic } from '@/hooks/useBookingLogic';
import DateRangePicker from './DatePicker';


/**
 * Booking form component for property reservations
 * Uses the extracted useBookingLogic hook for state and logic
 */
type BookingFormProps = {
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
};

export default function BookingForm({
  propertyId,
  propertyName,
  pricePerNight,
  maxGuests,
  minNights = 1,
  maxNights = 14,
  bookedDates = [],
}: BookingFormProps) {
  // Use the extracted hook for booking logic
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
  
  const [startDate, endDate] = dateRange;
  const { nights, totalPrice, cleaningFee, serviceFee, grandTotal } = pricing;

  // Generate unique IDs for accessibility
  const formId = React.useId();
  const pricingSummaryId = `pricing-summary-${formId}`;
  const datePickerDescriptionId = `date-picker-description-${formId}`;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
      <h3 className="text-xl font-bold mb-1">${pricePerNight} <span className="text-sm font-normal text-gray-600">night</span></h3>
      
      <form onSubmit={handleSubmit} aria-labelledby={`booking-form-title-${formId}`}>
        <div className="sr-only" id={`booking-form-title-${formId}`}>Book {propertyName}</div>
        
        <div className="mb-6">
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-gray-300">
              <div className="p-3">
                <p className="text-xs uppercase font-semibold text-gray-600">CHECK-IN</p>
                <p className="text-sm">{startDate ? format(startDate, 'MMM d, yyyy') : 'Select date'}</p>
              </div>
              <div className="p-3">
                <p className="text-xs uppercase font-semibold text-gray-600">CHECKOUT</p>
                <p className="text-sm">{endDate ? format(endDate, 'MMM d, yyyy') : 'Select date'}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-300 p-3">
              <label htmlFor={`guests-select-${formId}`} className="text-xs uppercase font-semibold text-gray-600 mb-1">
                GUESTS
              </label>
              <select 
                id={`guests-select-${formId}`}
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="block w-full text-sm appearance-none bg-transparent border-none focus:ring-0 pr-8"
                aria-label={`Select number of guests (maximum ${maxGuests})`}
              >
                {Array.from({ length: maxGuests }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'guest' : 'guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <p id={datePickerDescriptionId} className="sr-only">
            Please select your check-in and check-out dates. Stay minimum: {minNights} nights. Stay maximum: {maxNights} nights.
          </p>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={setDateRange}
            minNights={minNights}
            maxNights={maxNights}
            disabledDates={disabledDates}
            ariaDescribedBy={datePickerDescriptionId}
          />
        </div>
        
        <button
          type="submit"
          disabled={!startDate || !endDate || isLoading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-md font-medium transition duration-150 disabled:bg-gray-300 disabled:cursor-not-allowed"
          aria-busy={isLoading}
        >
          {isLoading ? 'Processing...' : 'Reserve'}
        </button>
        
        <p className="text-center text-sm text-gray-500 mt-2">You won&apos;t be charged yet</p>
        
        {nights > 0 && (
          <div className="mt-6" id={pricingSummaryId} aria-live="polite">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">${pricePerNight} x {nights} nights</span>
              <span className="text-gray-700">${totalPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Cleaning fee</span>
              <span className="text-gray-700">${cleaningFee}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Service fee</span>
              <span className="text-gray-700">${serviceFee}</span>
            </div>
            <div className="flex justify-between pt-4 mt-4 border-t border-gray-200 font-bold">
              <span>Total</span>
              <span>${grandTotal}</span>
            </div>
          </div>
        )}
        
        {error && (
          <div 
            className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm" 
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
