/* Property data as returned from API and used in components */
export interface PropertyData {
    _id: string;
    name: string;
    description: string;
    location: string;
    price: number;
    imageUrls: string[];
    capacity: number;
    amenities: string[];
    category: string;
    featured: boolean;
    createdAt?: string;
    updatedAt?: string;
  }
  
  /**
   * Booking data as returned from API and used in components
   */
  export interface BookingData {
    _id: string;
    user: string;
    property: string | PropertyData;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt?: string;
    updatedAt?: string;
  }
  
  /**
   * User data as returned from API and used in components
   */
  export interface UserData {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
  }
  
  /**
   * Session data extended with user role
   */
  export interface ExtendedSession {
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
    expires: string;
  }
  
  /**
   * Props for the PropertyCard component
   */
  export interface PropertyCardProps {
    id: string;
    name: string;
    location: string;
    price: number;
    imageUrl: string;
  }
  
  /**
   * Props for the BookingForm component
   */
  export interface BookingFormProps {
    propertyId: string;
    propertyName: string;
    pricePerNight: number;
  }
  
  /**
   * Props for the DatePicker component
   */
  export interface DatePickerProps {
    startDate: Date | null;
    endDate: Date | null;
    onChange: (dates: [Date | null, Date | null]) => void;
  }
  
  /**
   * Props for the GlampingLogo component
   */
  export interface GlampingLogoProps {
    className?: string;
    size?: number;
    alt?: string;
  }

  // ACCOMMODATIONS COLLECTION
interface Accommodation {
  id: string;
  name: string;
  description: string;
  images: string[];  // URLs to images
  maxGuests: number;
  pricePerNight: number;
  amenities: string[];
  location: {
    latitude: number;
    longitude: number;
  };
  availabilityCalendarId: string;  // Reference to availability calendar
}

// AVAILABILITY COLLECTION
interface Availability {
  accommodationId: string;
  dates: {
    [date: string]: {  // Format: YYYY-MM-DD
      isAvailable: boolean;
      priceModifier?: number;  // For seasonal pricing adjustments
    }
  };
}

// BOOKINGS COLLECTION
interface Booking {
  id: string;
  accommodationId: string;
  userId: string;
  checkInDate: string;  // Format: YYYY-MM-DD
  checkOutDate: string;  // Format: YYYY-MM-DD
  numberOfGuests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentId: string;
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

// USERS COLLECTION
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  bookingHistory: string[];  // Array of booking IDs
}

// PAYMENTS COLLECTION
interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processed' | 'refunded' | 'failed';
  method: 'credit_card' | 'paypal' | 'other';
  transactionId: string;  // External payment processor ID
  createdAt: Date;
}