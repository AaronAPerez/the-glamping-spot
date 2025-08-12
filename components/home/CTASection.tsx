'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Spotlight } from '../ui/Spotlight';
import { BackgroundBeams } from '../ui/BackgroundBeams';
import { LampContainer } from '../ui/LampContainer';
import { TypewriterEffect } from '../ui/TypewriterEffect';
import { motion } from 'framer-motion';

/**
 * Enhanced CTA Section with accessibility improvements and performance optimizations
 */
export default function CTASection() {
  // Words for the typewriter effect with enhanced accessibility
  const words = [
    { text: "Ready" },
    { text: "for" },
    { text: "Your" },
    {
      text: "Glamping",
      className: "text-emerald-500 dark:text-emerald-400",
    },
    {
      text: "Adventure?",
      className: "text-emerald-500 dark:text-emerald-400",
    },
  ];

  return (
    <section 
      className="relative py-24 overflow-hidden bg-slate-900" 
      aria-labelledby="cta-heading"
    >
      {/* Optimized background image with proper loading */}
      <div className="absolute inset-0">
        <Image
          src="/images/stars1.jpg"
          alt="Starry night sky over geodesic dome glamping site"
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
          quality={85}
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>
      </div>
      
      {/* Background effects with reduced complexity for performance */}
      <BackgroundBeams 
        className="absolute inset-0" 
        opacity={0.3}
        background="transparent"
      />
      
      {/* Spotlight effect - hidden on mobile for performance */}
      <Spotlight
        className="absolute inset-0 hidden md:block"
        size={300}
        spotlightColour="rgba(16, 185, 129, 0.3)"
        opacity={0.4}
      />
      
      {/* Content container with enhanced accessibility */}
      <div className="relative z-10">
        <LampContainer>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Enhanced heading with proper hierarchy */}
            <div className="mx-auto mb-8">
              <h2 
                id="cta-heading"
                className="sr-only"
              >
                Book Your Glamping Adventure
              </h2>
              <TypewriterEffect 
                words={words} 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
                cursorClassName="bg-emerald-500"
              />
            </div>
            
            {/* Enhanced description with better contrast */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-6 text-lg md:text-xl text-gray-100 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Book your extraordinary geodesic dome glamping experience today and create memories 
              that will last a lifetime in the heart of East Texas.
            </motion.p>
            
            {/* Enhanced CTA buttons with better accessibility */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            >
              <Link 
                href="/properties" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white rounded-xl text-base md:text-lg font-semibold text-white hover:bg-white hover:text-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900 min-w-[200px]"
                aria-label="Browse all available geodesic dome properties"
              >
                <svg 
                  className="mr-2 h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                  />
                </svg>
                Browse Our Domes
              </Link>
              
              <Link 
                href="/booking" 
                className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 rounded-xl text-base md:text-lg font-semibold text-white hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900 min-w-[200px]"
                aria-label="Start booking your glamping experience now"
              >
                <svg 
                  className="mr-2 h-5 w-5" 
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
                Book Now
              </Link>
            </motion.div>

            {/* Additional trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-300"
            >
              <div className="flex items-center">
                <svg 
                  className="h-5 w-5 text-emerald-400 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
                <span className="text-sm font-medium">Free Cancellation</span>
              </div>
              
              <div className="flex items-center">
                <svg 
                  className="h-5 w-5 text-emerald-400 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                  />
                </svg>
                <span className="text-sm font-medium">Secure Booking</span>
              </div>
              
              <div className="flex items-center">
                <svg 
                  className="h-5 w-5 text-emerald-400 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
                <span className="text-sm font-medium">Best Rate Guarantee</span>
              </div>
            </motion.div>

            {/* Contact information for direct bookings */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-8 text-center"
            >
              <p className="text-gray-400 text-sm mb-2">
                Questions? Call us directly at
              </p>
              <a 
                href="tel:+1234567890"
                className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded"
                aria-label="Call The Glamping Spot at 123-456-7890"
              >
                (123) 456-7890
              </a>
            </motion.div>
          </div>
        </LampContainer>
      </div>
    </section>
  );
}