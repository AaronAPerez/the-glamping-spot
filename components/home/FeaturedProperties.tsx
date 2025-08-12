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
  availability?: string[];
  discountCode?: string;
}

interface FeaturedPropertiesProps {
  limit?: number;
  title?: string;
  subtitle?: string;
  className?: string;
  customProperties?: FeaturedPropertyData[];
}

/**
 * FeaturedProperties component with optimized images and enhanced accessibility
 */
export default function FeaturedProperties({
  limit = 3,
  title = "Our Luxury Geodesic Dome Accommodations",
  subtitle = "Experience our premium geo domes with upscale amenities in the heart of East Texas near the Big Thicket National Preserve",
  className = "",
  customProperties
}: FeaturedPropertiesProps) {
  const [properties, setProperties] = useState<FeaturedPropertyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch featured properties data
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      if (customProperties) {
        setProperties(customProperties.slice(0, limit));
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        
        // Optimized sample data for The Glamping Spot
        const sampleProperties: FeaturedPropertyData[] = [
          {
            _id: 'stargazer-dome',
            name: 'Stargazer Geodesic Dome',
            description: 'Our premium geodesic dome with transparent ceiling for stargazing, featuring a king bed, luxury bathroom, and private hot tub',
            location: 'The Glamping Spot, Kountze, East Texas',
            price: 219,
            imageUrls: ['/images/geo-dome.jpg'],
            capacity: 2,
            amenities: ['Private Hot Tub', 'Stargazing Ceiling', 'King Bed', 'Luxury Bathroom', 'Fire Pit'],
            category: 'geo-dome',
            featured: true,
            availability: ['May 15-20', 'June 3-10', 'June 18-24'],
          },
          {
            _id: 'sunset-dome-retreat',
            name: 'Sunset Dome Retreat',
            description: 'Perfect for couples with premium views of Texas sunsets, private deck with hot tub, and outdoor shower experience',
            location: 'The Glamping Spot, Kountze, East Texas',
            price: 249,
            imageUrls: ['/images/geo-dome-sunset2.jpg'],
            capacity: 2,
            amenities: ['Private Hot Tub', 'Outdoor Shower', 'Sunset Views', 'Kitchenette', 'BBQ Grill'],
            category: 'geo-dome',
            featured: true,
            availability: ['May 10-17', 'May 28-31', 'June 15-22'],
            discountCode: 'SUNSET10'
          },
          {
            _id: 'family-adventure-dome',
            name: 'Family Adventure Dome',
            description: 'Spacious geodesic dome with extra sleeping accommodations, perfect for small families wanting to experience luxury glamping',
            location: 'The Glamping Spot, Kountze, East Texas',
            price: 289,
            imageUrls: ['/images/family-dome.jpg'],
            capacity: 4,
            amenities: ['Queen Bed + Bunks', 'Large Hot Tub', 'Full Bathroom', 'Kitchenette', 'Fire Pit'],
            category: 'geo-dome',
            featured: true,
            availability: ['May 22-29', 'June 5-12', 'June 25-30'],
          },
        ];
        
        // Simulate API delay for better UX
        await new Promise(resolve => setTimeout(resolve, 600));
        setProperties(sampleProperties.slice(0, limit));
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching featured properties:', err);
        setError('Unable to load featured properties. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, [limit, customProperties]);

  // Animation variants for performance optimization
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Reduced for better performance
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      className={`py-16 bg-gradient-to-b from-gray-50 to-white ${className}`} 
      aria-labelledby="featured-properties-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced section header */}
        <div className="text-center mb-12">
          <BackgroundGradient className="inline-block p-[3px] mb-4 rounded-xl">
            <div className="rounded-lg px-4 py-2 bg-white">
              <h2 
                id="featured-properties-heading" 
                className="text-3xl font-bold text-gray-900"
              >
                {title}
              </h2>
            </div>
          </BackgroundGradient>
          {subtitle && (
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Optimized loading state */}
        {isLoading && (
          <div className="flex justify-center items-center h-64" role="status" aria-label="Loading featured properties">
            <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="sr-only">Loading featured geodesic domes...</span>
          </div>
        )}

        {/* Enhanced error state */}
        {error && (
          <div 
            className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg text-center max-w-lg mx-auto"
            role="alert"
          >
            <svg 
              className="h-8 w-8 text-red-600 mx-auto mb-3" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
            <p className="font-medium">{error}</p>
            <p className="mt-2 text-sm">Please refresh the page or contact us directly at <a href="tel:+1234567890" className="underline">123-456-7890</a></p>
          </div>
        )}

        {/* Optimized properties grid */}
        {!isLoading && !error && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {properties.map((property) => (
              <motion.article
                key={property._id}
                className="property-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Link 
                  href={`/properties/${property._id}`}
                  className="block h-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  aria-label={`View details and book ${property.name}`}
                >
                  {/* Optimized property image */}
                  <div className="relative h-64 sm:h-72 md:h-64">
                    <Image
                      src={property.imageUrls[0] || '/images/placeholder-dome.jpg'}
                      alt={`${property.name} - luxury geodesic dome at The Glamping Spot featuring ${property.amenities.slice(0, 2).join(' and ')}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="transition-transform duration-500 group-hover:scale-105"
                      quality={80}
                      loading="lazy"
                    />
                    
                    {/* Enhanced badges */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
                        Featured
                      </span>
                    </div>
                    
                    {property.discountCode && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
                          Special Offer
                        </span>
                      </div>
                    )}

                    {/* Capacity indicator */}
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        {property.capacity} guests
                      </span>
                    </div>
                  </div>

                  {/* Enhanced property details */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">
                          {property.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 flex items-center">
                          <svg 
                            className="w-4 h-4 mr-1 text-emerald-600" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            aria-hidden="true"
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
                      <div className="text-right">
                        <p className="text-emerald-600 font-bold text-lg">
                          ${property.price}
                        </p>
                        <span className="text-sm font-normal text-gray-500">per night</span>
                      </div>
                    </div>

                    {/* Property description */}
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {property.description}
                    </p>
                    
                    {/* Enhanced amenities display */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Featured Amenities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {property.amenities.slice(0, 3).map((amenity, index) => (
                          <span 
                            key={`${property._id}-amenity-${index}`}
                            className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full border border-emerald-200"
                          >
                            {amenity}
                          </span>
                        ))}
                        {property.amenities.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            +{property.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Availability information */}
                    {property.availability && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">
                          <span className="font-medium text-gray-800">Next Available:</span>
                        </p>
                        <p className="text-sm font-medium text-emerald-700">
                          {property.availability[0]}
                        </p>
                      </div>
                    )}
                    
                    {/* Enhanced CTA */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-emerald-600 font-semibold">
                        View Details & Book
                      </span>
                      <svg 
                        className="w-5 h-5 text-emerald-600" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M17 8l4 4m0 0l-4 4m4-4H3" 
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        )}
        
        {/* Enhanced booking information section */}
        <div className="mt-16 p-8 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl shadow-inner">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Book Your Texas Geodesic Dome Experience?
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our luxury geodesic domes book quickly, especially during weekends and holidays. 
                Reserve your stay now to secure your preferred dates and experience 
                the ultimate glamping adventure in East Texas near the Big Thicket National Preserve.
              </p>
              <ul className="space-y-3 text-gray-700">
                {[
                  'Free cancellation up to 7 days before check-in',
                  'Special weekday rates available',
                  'Exclusive activities included with every booking',
                  'Direct booking best rate guarantee'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center lg:text-right">
              <p className="text-lg font-semibold text-emerald-800 mb-4">
                Book Direct for Exclusive Benefits
              </p>
              <Link 
                href="/booking" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                aria-label="Check availability and book your geodesic dome experience"
              >
                Check Availability
                <svg 
                  className="ml-2 h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
              </Link>
              <p className="mt-4 text-sm text-gray-600">
                Questions? Call us at{' '}
                <a 
                  href="tel:+1234567890" 
                  className="text-emerald-700 font-semibold hover:underline focus:outline-none focus:underline"
                >
                  (123) 456-7890
                </a>
              </p>
            </div>
          </div>
        </div>
        
        {/* View all properties CTA */}
        {!isLoading && !error && properties.length > 0 && (
          <div className="text-center mt-12">
            <Link 
              href="/properties" 
              className="inline-flex items-center justify-center px-6 py-3 border border-emerald-600 text-base font-medium rounded-md text-emerald-600 hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="View all available geodesic domes and accommodations"
            >
              View All Accommodations
              <svg 
                className="ml-2 h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
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