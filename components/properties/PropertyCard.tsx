'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Interface for PropertyCard props with enhanced type safety
 */
interface PropertyCardProps {
  id: string;
  name: string;
  location: string;
  price: number;
  imageUrl: string;
  description?: string;
  capacity?: number;
  amenities?: string[];
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
  availability?: string[];
  className?: string;
}

/**
 * Optimized PropertyCard component addressing all Lighthouse performance,
 * accessibility, and best practices recommendations
 */
export default function PropertyCard({
  id,
  name,
  location,
  price,
  imageUrl,
  description,
  capacity = 2,
  amenities = [],
  rating,
  reviewCount,
  featured = false,
  availability = [],
  className = ''
}: PropertyCardProps) {
  
  // Generate optimized alt text for images
  const imageAlt = `${name} - luxury geodesic dome at The Glamping Spot featuring ${amenities.slice(0, 2).join(' and ')} with capacity for ${capacity} guests`;

  // Animation variants for performance optimization
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.article
      className={`property-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-emerald-500 ${className}`}
      // variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      role="article"
      aria-labelledby={`property-${id}-title`}
    >
      <Link 
        href={`/properties/${id}`}
        className="block h-full focus:outline-none"
        aria-label={`View details and book ${name} - ${description?.substring(0, 100)}...`}
      >
        {/* Optimized property image with proper dimensions and loading */}
        <div className="relative h-64 sm:h-72 md:h-64">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="transition-transform duration-500 group-hover:scale-105"
            quality={80}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          
          {/* Enhanced badges with better contrast */}
          <div className="absolute top-4 left-4 flex gap-2">
            {featured && (
              <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md border border-emerald-700">
                Featured
              </span>
            )}
            {rating && rating >= 4.8 && (
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md border border-yellow-600">
                Top Rated
              </span>
            )}
          </div>

          {/* Capacity indicator with improved visibility */}
          <div className="absolute bottom-4 left-4">
            <span className="bg-black/80 text-white px-3 py-1 rounded-full text-xs flex items-center shadow-md">
              <svg 
                className="w-3 h-3 mr-1" 
                fill="currentColor" 
                viewBox="0 0 20 20" 
                aria-hidden="true"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              {capacity} guest{capacity !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Rating indicator */}
          {rating && (
            <div className="absolute bottom-4 right-4">
              <span className="bg-white/90 text-gray-900 px-2 py-1 rounded-full text-xs font-medium flex items-center shadow-md">
                <span className="text-yellow-400 mr-1" aria-hidden="true">⭐</span>
                {rating}
                <span className="sr-only">out of 5 stars</span>
              </span>
            </div>
          )}
        </div>

        {/* Enhanced property details with improved typography and spacing */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 min-w-0">
              <h3 
                id={`property-${id}-title`}
                className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight"
              >
                {name}
              </h3>
              <p className="text-gray-600 text-sm mb-2 flex items-start">
                <svg 
                  className="w-4 h-4 mr-1 mt-0.5 text-emerald-600 flex-shrink-0" 
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
                <span className="leading-tight">{location}</span>
              </p>
            </div>
            <div className="text-right ml-4 flex-shrink-0">
              <p className="text-emerald-600 font-bold text-xl leading-none">
                ${price}
              </p>
              <span className="text-sm text-gray-500 leading-none">per night</span>
            </div>
          </div>

          {/* Property description with proper line clamping */}
          {description && (
            <p className="text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed">
              {description}
            </p>
          )}

          {/* Rating and reviews with enhanced accessibility */}
          {rating && reviewCount && (
            <div className="flex items-center mb-4">
              <div className="flex items-center" role="img" aria-label={`Rated ${rating} out of 5 stars`}>
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`h-4 w-4 ${
                      index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                <span className="font-medium">{rating}</span> 
                <span className="mx-1">•</span>
                <span>{reviewCount} review{reviewCount !== 1 ? 's' : ''}</span>
              </span>
            </div>
          )}
          
          {/* Enhanced amenities display with better accessibility */}
          {amenities.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Featured Amenities:</h4>
              <div className="flex flex-wrap gap-2">
                {amenities.slice(0, 4).map((amenity, index) => (
                  <span 
                    key={`${id}-amenity-${index}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200"
                  >
                    {amenity}
                  </span>
                ))}
                {amenities.length > 4 && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                    +{amenities.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Availability information with improved styling */}
          {availability.length > 0 && (
            <div className="mb-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-xs text-emerald-700 mb-1">
                <span className="font-medium">Availability:</span>
              </p>
              <p className="text-sm font-medium text-emerald-800">
                {availability[0]}
              </p>
            </div>
          )}
          
          {/* Enhanced CTA with better accessibility and visual hierarchy */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-emerald-600 font-semibold text-base">
              View Details & Book
            </span>
            <svg 
              className="w-5 h-5 text-emerald-600 transition-transform group-hover:translate-x-1" 
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
  );
}