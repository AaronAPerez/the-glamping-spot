import { useState } from 'react';
import { useBookingStore } from '@/stores/bookingStore';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { useProperty } from '@/features/properties/hooks/useProperty';
import { useRouter } from 'next/navigation';

interface BookingFormProps {
  propertyId: string;
}

export default function BookingForm({ propertyId }: BookingFormProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { addNotification } = useUIStore();
  const { bookingData, setBookingData, submitBooking, status, error } = useBookingStore();
  const { data: property, isLoading: propertyLoading } = useProperty(propertyId);
  
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      addNotification('info', 'Please log in to make a booking');
      router.push(`/login?redirect=/properties/${propertyId}`);
      return;
    }
    
    // Set data in booking store
    setBookingData({
      propertyId,
      checkInDate: checkInDate!,
      checkOutDate: checkOutDate!,
      guests,
      contactInformation: {
        fullName: `${user?.displayName || 'Guest'}`,
        email: user?.email || '',
        phone: '',
      },
      // Calculate total price (simplified)
      totalPrice: calculateTotalPrice(),
    });
    
    try {
      // Submit booking
      const bookingId = await submitBooking();
      
      // Show success notification
      addNotification('success', 'Booking submitted successfully!');
      
      // Redirect to booking confirmation page
      router.push(`/bookings/confirmation?id=${bookingId}`);
    } catch (err: any) {
      addNotification('error', err.message || 'Failed to submit booking');
    }
  };
  
  const calculateTotalPrice = () => {
    if (!property || !checkInDate || !checkOutDate) return 0;
    
    const nights = Math.max(1, Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)));
    const basePrice = property.basePrice * nights;
    const cleaningFee = property.cleaningFee || 0;
    const serviceFee = Math.round(basePrice * (property.serviceFee / 100)) || 0;
    
    return basePrice + cleaningFee + serviceFee;
  };
  
  if (propertyLoading) {
    return <div>Loading property details...</div>;
  }
  
  if (!property) {
    return <div>Property not found</div>;
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      {/* Form implementation */}
      {/* ... */}
      
      <button
        type="submit"
        disabled={status === 'loading' || !checkInDate || !checkOutDate}
        className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Submitting...' : 'Book Now'}
      </button>
      
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </form>
  );
}