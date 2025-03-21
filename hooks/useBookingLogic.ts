'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { format, differenceInDays } from 'date-fns';

/**
 * Type for booking date ranges
 */
type DateRange = [Date | null, Date | null];

/**
 * Interface for booked dates coming from API
 */
interface BookedDate {
  checkIn: string;
  checkOut: string;
}

/**
 * Interface for booking form state
 */
interface BookingFormState {
  dateRange: DateRange;
  guests: number;
  isLoading: boolean;
  error: string;
  disabledDates: Date[];
}

/**
 * Interface for pricing calculation
 */
interface PricingDetails {
  nights: number;
  totalPrice: number;
  cleaningFee: number;
  serviceFee: number;
  grandTotal: number;
}

/**
 * Props for the useBookingLogic hook
 */
interface UseBookingLogicProps {
  propertyId: string;
  pricePerNight: number;
  maxGuests: number;
  minNights?: number;
  maxNights?: number;
  bookedDates?: BookedDate[];
  serviceFeePercentage?: number;
  cleaningFee?: number;
}

/**
 * Return type for useBookingLogic hook
 */
interface UseBookingLogicReturn {
  // Form state
  dateRange: DateRange;
  setDateRange: (dates: DateRange) => void;
  guests: number;
  setGuests: (guests: number) => void;
  isLoading: boolean;
  error: string;
  disabledDates: Date[];
  
  // Pricing details
  pricing: PricingDetails;
  
  // Actions
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

/**
 * Custom hook to manage booking logic
 * Extracts and centralizes booking form state and actions
 */
export function useBookingLogic({
  propertyId,
  pricePerNight,
  maxGuests,
  minNights = 1,
  bookedDates = [],
  serviceFeePercentage = 0.12, // 12% service fee
  cleaningFee = 50
}: UseBookingLogicProps): UseBookingLogicReturn {
  // Access router and session
  const router = useRouter();
  const { data: session } = useSession();
  
  // Form state
  const [dateRange, setDateRange] = useState<DateRange>([null, null]);
  const [guests, setGuests] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);
  
  // Destructure date range for convenience
  const [startDate, endDate] = dateRange;
  
  // Calculate pricing details
  const nights = startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const totalPrice = nights * pricePerNight;
  const calculatedServiceFee = Math.round(totalPrice * serviceFeePercentage);
  const grandTotal = totalPrice + cleaningFee + calculatedServiceFee;
  
  const pricing: PricingDetails = {
    nights,
    totalPrice,
    cleaningFee,
    serviceFee: calculatedServiceFee,
    grandTotal
  };
  
  // Process booked dates to create disabled dates array
  useEffect(() => {
    if (!bookedDates.length) return;
    
    const allDisabledDates: Date[] = [];
    
    bookedDates.forEach(booking => {
      const start = new Date(booking.checkIn);
      const end = new Date(booking.checkOut);
      
      // Add all dates between check-in and check-out
      const currentDate = new Date(start);
      while (currentDate <= end) {
        allDisabledDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    
    setDisabledDates(allDisabledDates);
  }, [bookedDates]);
  
  // Reset form to initial state
  const resetForm = useCallback(() => {
    setDateRange([null, null]);
    setGuests(1);
    setError('');
  }, []);
  
  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      router.push(`/login?callbackUrl=${encodeURIComponent(window.location.href)}`);
      return;
    }
    
    if (!startDate || !endDate) {
      setError('Please select check-in and check-out dates');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          property: propertyId,
          checkIn: format(startDate, 'yyyy-MM-dd'),
          checkOut: format(endDate, 'yyyy-MM-dd'),
          guests,
          totalPrice: grandTotal,
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create booking');
      }
      
      const booking = await response.json();
      router.push(`/bookings/${booking._id}/confirmation`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [propertyId, startDate, endDate, guests, grandTotal, session, router]);
  
  return {
    // Form state
    dateRange,
    setDateRange,
    guests,
    setGuests,
    isLoading,
    error,
    disabledDates,
    
    // Pricing details
    pricing,
    
    // Actions
    handleSubmit,
    resetForm
  };
}
