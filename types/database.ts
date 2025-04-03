/**
 * DATABASE SCHEMA FOR THE GLAMPING SPOT
 *
 * This file defines the TypeScript interfaces for the Firestore database collections.
 * These interfaces should be used throughout the application to ensure type safety.
 */

import firebase from 'firebase/app';
import 'firebase/firestore';

// src/types/database.ts

/**
 * Property/Accommodation Type
 * Represents a glamping property that can be booked
 */
export interface Property {
    id: string;                      // Unique identifier
    name: string;                    // Property name (e.g., "Lakeside Dome")
    slug: string;                    // URL-friendly name
    description: string;             // Full description
    shortDescription: string;        // Summary for cards
    propertyType: string;            // E.g., "Dome", "Treehouse", "Cabin"
    images: {
      url: string;                   // Image URL
      alt: string;                   // Alt text for accessibility
      featured?: boolean;            // Is this the main image?
      order?: number;                // Display order
    }[];
    panoramaUrl?: string;            // 360° view URL if available
    maxGuests: number;               // Maximum number of guests
    bedrooms: number;                // Number of bedrooms
    beds: number;                    // Number of beds
    bathrooms: number;               // Number of bathrooms
    minNights: number;               // Minimum stay duration
    basePrice: number;               // Base price per night
    cleaningFee: number;             // One-time fee
    serviceFee: number;              // Service fee percentage
    taxRate: number;                 // Tax percentage
    location: {
      address: string;               // Full address
      city: string;                  // City
      state: string;                 // State/Province
      zipCode: string;               // Postal/ZIP code
      country: string;               // Country
      coordinates: {
        latitude: number;            // Latitude
        longitude: number;           // Longitude
      };
      accessInstructions?: string;   // How to access the property
    };
    amenities: {
      id: string;                    // Amenity identifier
      name: string;                  // Amenity name
      icon: string;                  // Icon name or path
      category: string;              // Category (e.g., "Kitchen", "Outdoor")
      description?: string;          // Additional details
    }[];
    houseRules: {
      title: string;                 // Rule title
      description: string;           // Rule description
      icon?: string;                 // Icon for rule visualization
    }[];
    checkInTime: string;             // e.g., "15:00"
    checkOutTime: string;            // e.g., "11:00"
    isActive: boolean;               // Is property available for booking?
    featuredIndex?: number;          // Position in featured listings (if featured)
    createdAt: firebase.firestore.Timestamp;
    updatedAt: firebase.firestore.Timestamp;
  }
  
  /**
   * Availability Type
   * Tracks the availability calendar for each property
   */
  export interface Availability {
    propertyId: string;              // Reference to property
    dates: {
      [dateString: string]: {        // Format: "YYYY-MM-DD"
        isAvailable: boolean;        // Whether the date is available
        price?: number;              // Override price for this date (seasonal pricing)
        minimumStay?: number;        // Override minimum stay
        notes?: string;              // Admin notes
      }
    };
    blockedRanges: {                 // Ranges blocked by owner
      startDate: firebase.firestore.Timestamp;
      endDate: firebase.firestore.Timestamp;
      reason?: string;               // Reason for blocking
    }[];
    lastUpdated: firebase.firestore.Timestamp;
  }
  
  /**
   * User Type
   * Represents a user account
   */
  export interface User {
    uid: string;                     // Firebase Auth UID
    email: string;                   // Email address
    firstName: string;               // First name
    lastName: string;                // Last name
    phoneNumber?: string;            // Phone number
    profilePicture?: string;         // Profile image URL
    address?: {
      street: string;                // Street address
      city: string;                  // City
      state: string;                 // State/Province
      zipCode: string;               // Postal/ZIP code
      country: string;               // Country
    };
    preferredCurrency?: string;      // Currency preference
    languagePreference?: string;     // Language preference
    notifications: {
      email: boolean;                // Email notifications enabled
      sms: boolean;                  // SMS notifications enabled
      marketing: boolean;            // Marketing communications opt-in
    };
    role: 'guest' | 'host' | 'admin';// User role
    verified: boolean;               // Email verified status
    createdAt: firebase.firestore.Timestamp;
    lastLogin: firebase.firestore.Timestamp;
  }
  
  /**
   * Booking Type
   * Represents a property reservation
   */
  export interface Booking {
    id: string;                      // Booking reference number
    propertyId: string;              // Reference to property
    userId: string;                  // Reference to user
    status: 'pending' | 'confirmed' | 'canceled' | 'completed' | 'rejected';
    dates: {
      checkIn: firebase.firestore.Timestamp;
      checkOut: firebase.firestore.Timestamp;
    };
    guests: {
      adults: number;                // Number of adults
      children: number;              // Number of children
      infants: number;               // Number of infants
      pets: number;                  // Number of pets
    };
    contactInformation: {
      fullName: string;              // Guest name
      email: string;                 // Contact email
      phone: string;                 // Contact phone
      emergencyContact?: {
        name: string;                // Emergency contact name
        phone: string;               // Emergency contact phone
        relationship: string;        // Relationship to guest
      };
    };
    specialRequests?: string;        // Special requests notes
    pricing: {
      nightlyRate: number;           // Rate per night
      nights: number;                // Number of nights
      subtotal: number;              // Base price × nights
      cleaningFee: number;           // Cleaning fee
      serviceFee: number;            // Service fee
      taxes: number;                 // Taxes
      total: number;                 // Total amount
      discountCode?: string;         // Applied discount code
      discountAmount?: number;       // Discount amount
    };
    payment: {
      status: 'pending' | 'paid' | 'refunded' | 'partially_refunded' | 'failed';
      method?: string;               // Payment method used
      transactionId?: string;        // External payment reference
      refundAmount?: number;         // Amount refunded (if any)
    };
    cancellation?: {
      date: firebase.firestore.Timestamp;
      reason: string;                // Reason for cancellation
      canceledBy: string;            // UID of who canceled
      refundAmount: number;          // Amount refunded
    };
    addOns?: {                       // Optional experience packages
      id: string;                    // Add-on identifier
      name: string;                  // Add-on name
      price: number;                 // Add-on price
      quantity: number;              // Quantity selected
    }[];
    reviews?: {
      guestReview?: string;          // Guest's review ID
      hostReview?: string;           // Host's review ID
    };
    notes?: {                        // Internal notes
      public: string;                // Visible to guest and host
      private: string;               // Admin/host-only notes
    };
    createdAt: firebase.firestore.Timestamp;
    updatedAt: firebase.firestore.Timestamp;
  }
  
  /**
   * Payment Type
   * Detailed payment information
   */
  export interface Payment {
    id: string;                      // Payment identifier
    bookingId: string;               // Reference to booking
    userId: string;                  // Reference to user
    amount: number;                  // Amount paid
    currency: string;                // Currency code (e.g., "USD")
    status: 'pending' | 'completed' | 'failed' | 'refunded' | 'partially_refunded';
    paymentMethod: {
      type: string;                  // e.g., "credit_card", "paypal"
      cardType?: string;             // e.g., "visa", "mastercard"
      lastFour?: string;             // Last 4 digits if card
    };
    billingDetails: {
      name: string;                  // Name on payment
      address: {
        line1: string;               // Address line 1
        line2?: string;              // Address line 2
        city: string;                // City
        state: string;               // State/Province
        postalCode: string;          // Postal/ZIP code
        country: string;             // Country
      };
    };
    transactionId: string;           // Payment processor ID
    receiptUrl?: string;             // Link to receipt
    refunds?: {
      amount: number;                // Refund amount
      date: firebase.firestore.Timestamp;
      reason: string;                // Reason for refund
      transactionId: string;         // Refund transaction ID
    }[];
    metadata?: Record<string, any>;  // Additional payment data
    createdAt: firebase.firestore.Timestamp;
    updatedAt: firebase.firestore.Timestamp;
  }
  
  /**
   * Review Type
   * Guest reviews for properties
   */
  export interface Review {
    id: string;                      // Review identifier
    propertyId: string;              // Reference to property
    bookingId: string;               // Reference to booking
    userId: string;                  // Reference to reviewer
    rating: number;                  // Overall rating (1-5)
    title?: string;                  // Review title
    content: string;                 // Review text
    categories: {                    // Category ratings
      cleanliness: number;           // Rating for cleanliness
      communication: number;         // Rating for communication
      checkIn: number;               // Rating for check-in
      accuracy: number;              // Rating for accuracy
      location: number;              // Rating for location
      value: number;                 // Rating for value
    };
    photos?: string[];               // Photo URLs
    hostResponse?: {                 // Host's response
      content: string;               // Response text
      createdAt: firebase.firestore.Timestamp;
    };
    isPublic: boolean;               // Is review public
    helpfulVotes: number;            // Number of helpful votes
    flags?: {                        // Flags for inappropriate content
      count: number;                 // Number of flags
      reasons: string[];             // Reasons for flagging
    };
    createdAt: firebase.firestore.Timestamp;
    updatedAt: firebase.firestore.Timestamp;
  }
  
  /**
   * Experience Type
   * Add-on experiences that can be booked
   */
  export interface Experience {
    id: string;                      // Experience identifier
    name: string;                    // Experience name
    description: string;             // Description
    images: {
      url: string;                   // Image URL
      alt: string;                   // Alt text for accessibility
    }[];
    duration: number;                // Duration in minutes
    price: number;                   // Price per person
    minimumPeople: number;           // Minimum number of participants
    maximumPeople: number;           // Maximum number of participants
    location: string;                // Where experience takes place
    availableDays: string[];         // Available days of week
    timeSlots: string[];             // Available time slots
    categories: string[];            // Experience categories
    includedItems: string[];         // What's included
    restrictions?: string[];         // Any restrictions
    isActive: boolean;               // Is experience available
    createdAt: firebase.firestore.Timestamp;
    updatedAt: firebase.firestore.Timestamp;
  }
  
  /**
   * Special Offer Type
   * Promotional offers and discounts
   */
  export interface SpecialOffer {
    id: string;                      // Offer identifier
    code: string;                    // Offer code
    title: string;                   // Offer title
    description: string;             // Offer description
    discountType: 'percentage' | 'fixed' | 'free_night';
    discountValue: number;           // Discount amount
    minimumNights?: number;          // Minimum stay requirement
    maximumDiscount?: number;        // Maximum discount amount
    applicableProperties: string[] | 'all'; // Property IDs or 'all'
    validFrom: firebase.firestore.Timestamp;
    validTo: firebase.firestore.Timestamp;
    usageLimit?: number;             // Maximum number of uses
    usageCount: number;              // Current use count
    isActive: boolean;               // Is offer active
    userRestriction?: string[];      // Limited to specific users
    createdAt: firebase.firestore.Timestamp;
    updatedAt: firebase.firestore.Timestamp;
  }
  
  /**
   * Notification Type
   * System notifications for users
   */
  export interface Notification {
    id: string;                      // Notification identifier
    userId: string;                  // User receiving notification
    type: 'booking_confirmation' | 'booking_reminder' | 'booking_canceled' | 'payment_confirmation' | 'system_message' | 'special_offer';
    title: string;                   // Notification title
    message: string;                 // Notification message
    read: boolean;                   // Has notification been read
    relatedId?: string;              // Related entity ID (booking, etc.)
    actionUrl?: string;              // URL for click action
    createdAt: firebase.firestore.Timestamp;
  }
  
  /**
   * Weather Data Type
   * Cached weather information for properties
   */
  export interface WeatherData {
    propertyId: string;              // Reference to property
    forecasts: {
      date: firebase.firestore.Timestamp;
      temperature: {
        min: number;                 // Minimum temperature
        max: number;                 // Maximum temperature
        unit: 'celsius' | 'fahrenheit';
      };
      conditions: string;            // Weather description
      icon: string;                  // Weather icon code
      precipitation: number;         // Precipitation percentage
      windSpeed: number;             // Wind speed
    }[];
    lastUpdated: firebase.firestore.Timestamp;
  }
  
  /**
   * Memory/Post Type
   * User-shared memories/posts about their stay
   */
  export interface Memory {
    id: string;                      // Memory identifier
    userId: string;                  // User who created memory
    propertyId: string;              // Reference to property
    bookingId?: string;              // Reference to booking
    title: string;                   // Memory title
    description: string;             // Memory description
    media: {
      type: 'image' | 'video';       // Media type
      url: string;                   // Media URL
      thumbnail?: string;            // Thumbnail URL for videos
    }[];
    tags: string[];                  // Associated tags
    isPublic: boolean;               // Is visible publicly
    featured: boolean;               // Is featured on site
    likes: number;                   // Number of likes
    location?: {                     // Where memory was captured
      name: string;                  // Location name
      coordinates?: {
        latitude: number;
        longitude: number;
      };
    };
    createdAt: firebase.firestore.Timestamp;
    updatedAt: firebase.firestore.Timestamp;
  }
  
  /**
   * Digital Guidebook Entry Type
   * Content for property guidebooks
   */
  export interface GuidebookEntry {
    id: string;                      // Entry identifier
    propertyId: string;              // Reference to property
    title: string;                   // Entry title
    category: 'welcome' | 'check_in' | 'amenities' | 'local_area' | 'activities' | 'food_drink' | 'emergency' | 'checkout';
    content: string;                 // Entry content (markdown)
    order: number;                   // Display order
    images?: {
      url: string;                   // Image URL
      caption?: string;              // Image caption
    }[];
    icon?: string;                   // Category icon
    isActive: boolean;               // Is entry visible
    createdAt: firebase.firestore.Timestamp;
    updatedAt: firebase.firestore.Timestamp;
  }
  
  /**
   * Newsletter Subscriber Type
   * Users subscribed to marketing emails
   */
  export interface NewsletterSubscriber {
    id: string;                      // Subscriber identifier
    email: string;                   // Email address
    firstName?: string;              // First name (optional)
    lastName?: string;               // Last name (optional)
    interests?: string[];            // Areas of interest
    subscriptionDate: firebase.firestore.Timestamp;
    isActive: boolean;               // Is subscription active
    unsubscribeDate?: firebase.firestore.Timestamp;
    source?: string;                 // How they subscribed
  }
  
  /**
   * Admin Analytics Type
   * Business analytics data
   */
  export interface Analytics {
    id: string;                      // Record identifier
    date: firebase.firestore.Timestamp; // Date of record
    metrics: {
      totalBookings: number;         // Total bookings
      revenue: number;               // Total revenue
      occupancyRate: number;         // Occupancy percentage
      averageStayLength: number;     // Average stay duration
      websiteVisitors?: number;      // Site visitors
      conversionRate?: number;       // Visitor to booking rate
      topReferrers?: {
        source: string;              // Referral source
        count: number;               // Number of referrals
      }[];
      popularProperties?: {
        propertyId: string;          // Property ID
        bookings: number;            // Number of bookings
      }[];
    };
    periodType: 'daily' | 'weekly' | 'monthly' | 'yearly';
    notes?: string;                  // Admin notes
  }