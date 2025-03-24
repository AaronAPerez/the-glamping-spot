'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BackgroundGradient } from '@/components/ui/BackgroundGradient';

// Define interface for property data
interface FeaturedPropertyData {
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
  availability?: string[]; // Add upcoming availability dates
  discountCode?: string; // Optional discount code
}

interface FeaturedPropertiesProps {
  /**
   * Number of properties to display
   * @default 3
   */
  limit?: number;
  
  /**
   * Title for the section
   * @default "Featured Properties"
   */
  title?: string;
  
  /**
   * Subtitle for the section
   */
  subtitle?: string;
  
  /**
   * Custom className for the component
   */
  className?: string;
  
  /**
   * Additional properties data (if available)
   */
  customProperties?: FeaturedPropertyData[];
}

/**
 * FeaturedProperties component displays highlighted glamping properties
 * with images, location, price, and a link to property details
 */
export default function FeaturedProperties({
  limit = 3,
  title = "Our Luxury Dome Offerings",
  subtitle = "Experience our premium geo domes with upscale amenities in the heart of Texas",
  className = "",
  customProperties
}: FeaturedPropertiesProps) {
  // State for featured properties data
  const [properties, setProperties] = useState<FeaturedPropertyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch featured properties data
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      // If custom properties were provided, use those
      if (customProperties) {
        setProperties(customProperties.slice(0, limit));
        setIsLoading(false);
        return;
      }

      // Otherwise use sample data specific to The Glamping Spot
      try {
        setIsLoading(true);
        
        // For demo purposes, using sample data specific to The Glamping Spot
        const sampleProperties: FeaturedPropertyData[] = [
          {
            _id: 'dome1',
            name: 'Stargazer Geo Dome',
            description: 'Our premium geo dome with transparent ceiling for stargazing, featuring a king bed and luxury amenities',
            location: 'The Glamping Spot, Near Houston, TX',
            price: 219,
            imageUrls: ['/images/geo-dome.jpg'],
            capacity: 2,
            amenities: ['Jacuzzi', 'Wi-Fi', 'Air conditioning', 'Luxury bathroom', 'Fire pit'],
            category: 'geo-dome',
            featured: true,
            availability: ['May 15-20', 'June 3-10', 'June 18-24'],
          },
          {
            _id: 'dome2',
            name: 'Sunset Dome Retreat',
            description: 'Perfect for couples with premium views of Texas sunsets and a private deck with jacuzzi',
            location: 'The Glamping Spot, Near Houston, TX',
            price: 249,
            imageUrls: ['/images/geo-dome-sunset2.jpg'], // Update with actual image
            capacity: 2,
            amenities: ['Jacuzzi', 'Wi-Fi', 'Outdoor shower', 'Kitchenette', 'BBQ grill'],
            category: 'geo-dome',
            featured: true,
            availability: ['May 10-17', 'May 28-31', 'June 15-22'],
            discountCode: 'SUNSET10'
          },
          {
            _id: 'dome3',
            name: 'Family Adventure Dome',
            description: 'Larger dome with extra sleeping accommodations, perfect for small families wanting to experience glamping',
            location: 'The Glamping Spot, Near Houston, TX',
            price: 289,
            imageUrls: ['/images/family-dome.jpg'], // Update with actual image
            capacity: 4,
            amenities: ['Queen bed + bunks', 'Large jacuzzi', 'Full bathroom', 'Kitchenette', 'Fire pit'],
            category: 'geo-dome',
            featured: true,
            availability: ['May 22-29', 'June 5-12', 'June 25-30'],
          },
        ];
        
        setTimeout(() => {
          // Limit to requested number of properties
          setProperties(sampleProperties.slice(0, limit));
          setIsLoading(false);
        }, 800); // Simulate network delay
      } catch (err) {
        console.error('Error fetching featured properties:', err);
        setError('Unable to load featured properties. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, [limit, customProperties]);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section 
      className={`py-16 ${className}`} 
      aria-labelledby="featured-properties-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <BackgroundGradient className="inline-block p-[3px] mb-4 rounded-xl">
            <div className="rounded-lg px-4 py-2">
              <h2 
                id="featured-properties-heading" 
                className="text-3xl font-bold"
              >
                {title}
              </h2>
            </div>
          </BackgroundGradient>
          {subtitle && (
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div 
            className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center max-w-lg mx-auto"
            role="alert"
          >
            <svg 
              className="h-6 w-6 text-red-600 mx-auto mb-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
            <p>{error}</p>
          </div>
        )}

        {/* Properties grid */}
        {!isLoading && !error && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {properties.map((property) => (
              <motion.div
                key={property._id}
                className="property-card"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <Link 
                  href={`/properties/${property._id}`}
                  className="block h-full rounded-lg overflow-hidden shadow-md bg-white hover:shadow-xl transition-shadow duration-300"
                  aria-labelledby={`property-${property._id}-title`}
                >
                  <div className="relative h-80 xs:h-80 sm:h-100 md:h-70">
                    <Image
                      src={property.imageUrls[0] || '/images/placeholder.jpg'}
                      alt={`${property.name} at The Glamping Spot near Houston, Texas`}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Featured badge */}
                    <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                    {/* Discount badge if available */}
                    {property.discountCode && (
                      <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Discount Available
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 
                          id={`property-${property._id}-title`} 
                          className="text-xl font-semibold mb-1 text-gray-900"
                        >
                          {property.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 flex items-center">
                          <svg 
                            className="w-4 h-4 mr-1" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                            />
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                            />
                          </svg>
                          {property.location}
                        </p>
                      </div>
                      <p className="text-emerald-600 font-bold">
                        ${property.price}
                        <span className="text-sm font-normal text-gray-500"> /night</span>
                      </p>
                    </div>
                    
                    {/* Key amenities */}
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700">Top Amenities:</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {property.amenities.slice(0, 3).map((amenity, index) => (
                          <span key={index} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">
                            {amenity}
                          </span>
                        ))}
                        {property.amenities.length > 3 && (
                          <span className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-full">
                            +{property.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Upcoming availability */}
                    {property.availability && (
                      <div className="mt-3 text-xs text-gray-600">
                        <span className="font-medium">Next available:</span>{' '}
                        {property.availability[0]}
                      </div>
                    )}
                    
                    {/* View button with arrow icon */}
                    <div className="mt-5 flex items-center text-emerald-600 font-medium">
                      <span>View Details & Book</span>
                      <svg 
                        className="ml-2 w-5 h-5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M14 5l7 7m0 0l-7 7m7-7H3" 
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Booking info section */}
        <div className="mt-16 p-8 bg-emerald-50 rounded-lg shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Book Your Texas Glamping Experience?</h3>
              <p className="text-gray-700 mb-4">
                Our geo domes book quickly, especially during weekends and holidays. 
                Reserve your stay now to secure your preferred dates and experience 
                luxury glamping in the heart of Texas.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free cancellation up to 7 days before check-in</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Special weekday rates available</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Exclusive activities included with every booking</span>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-emerald-800 mb-3">Book direct for the best rates</p>
              <Link 
                href="/booking" 
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                aria-label="Book your glamping experience now"
              >
                Check Availability
                <svg 
                  className="ml-2 h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
              </Link>
              <p className="mt-3 text-sm text-gray-600">
                Or call us at <a href="tel:+1234567890" className="text-emerald-700 font-medium">123-456-7890</a>
              </p>
            </div>
          </div>
        </div>
        
        {/* View All Properties Button - When you expand to more properties */}
        {!isLoading && !error && properties.length > 0 && (
          <div className="text-center mt-12">
            <Link 
              href="/properties" 
              className="inline-flex items-center justify-center px-6 py-3 border border-emerald-600 text-base font-medium rounded-md text-emerald-600 hover:bg-emerald-50 transition-colors"
              aria-label="View all available domes and properties"
            >
              View All Accommodations
              <svg 
                className="ml-2 h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}