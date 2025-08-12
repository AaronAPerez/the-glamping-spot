/**
 * Common type definitions for the Glamping Spot application
 */

/**
 * Property data as returned from API and used in components
 */
export interface PropertyData {
    rating: number | undefined;
    reviewCount: number | undefined;
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