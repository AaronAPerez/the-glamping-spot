'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface MidpageBookingCTAProps {
  /**
   * Main heading text for the CTA
   */
  heading: string;
  
  /**
   * Description text explaining the CTA
   */
  description: string;
  
  /**
   * Background image URL for the section
   */
  backgroundImage: string;
  
  /**
   * Text for the call-to-action button
   */
  ctaText: string;
  
  /**
   * Link for the call-to-action button
   */
  ctaLink: string;
  
  /**
   * Optional overlay color (with transparency)
   */
  overlayColor?: string;
  
  /**
   * Optional additional features to highlight
   */
  features?: string[];
  
  /**
   * Optional CSS class for additional styling
   */
  className?: string;
}

/**
 * Mid-page booking CTA component that appears mid-scroll
 * to capture interest from visitors who are actively engaged with content
 */
export default function MidpageBookingCTA({
  heading,
  description,
  backgroundImage,
  ctaText,
  ctaLink,
  overlayColor = 'rgba(0, 0, 0, 0.5)',
  features,
  className = ''
}: MidpageBookingCTAProps) {
  // Use scroll-triggered animation for better visibility
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  
  return (
    <section 
      className={`relative py-24 overflow-hidden ${className}`}
      aria-labelledby="mid-page-cta-heading"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
          priority={false}
          quality={80}
          aria-hidden="true"
        />
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: overlayColor }}
          aria-hidden="true"
        />
      </div>
      
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white"
        style={{ opacity }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 
            id="mid-page-cta-heading"
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            {heading}
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/80">
            {description}
          </p>
          
          {/* Optional features list */}
          {features && features.length > 0 && (
            <div className="mb-8">
              <div className="inline-block bg-black/30 backdrop-blur-sm rounded-lg py-4 px-6">
                <ul className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center justify-center">
                      <svg className="h-5 w-5 text-emerald-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* CTA button with animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={ctaLink}
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg"
              aria-label={ctaText}
            >
              {ctaText}
            </Link>
          </motion.div>
          
          {/* Trust indicators */}
          <div className="mt-8 text-sm text-white/70 flex flex-wrap justify-center gap-6">
            <p className="flex items-center">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure Booking
            </p>
            <p className="flex items-center">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              24/7 Support
            </p>
            <p className="flex items-center">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Best Price Guarantee
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}