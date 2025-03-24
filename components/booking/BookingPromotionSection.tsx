'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BackgroundGradient } from '../ui/BackgroundGradient';

interface BookingPromotionSectionProps {
  /**
   * Main heading for the promotion
   */
  heading: string;
  
  /**
   * Description text explaining the promotion
   */
  description: string;
  
  /**
   * Date when the promotion expires
   */
  expiryDate: Date;
  
  /**
   * Coupon code for the promotion
   */
  couponCode: string;
  
  /**
   * Discount amount or percentage
   */
  discount: string;
  
  /**
   * Text for the call-to-action button
   */
  ctaText: string;
  
  /**
   * Link for the call-to-action button
   */
  ctaLink: string;
  
  /**
   * Optional background image URL
   */
  backgroundImage?: string;
  
  /**
   * Optional CSS class for additional styling
   */
  className?: string;
}

/**
 * A time-sensitive booking promotion section to create urgency
 * and encourage immediate bookings
 */
export default function BookingPromotionSection({
  heading,
  description,
  expiryDate,
  couponCode,
  discount,
  ctaText,
  ctaLink,
  backgroundImage,
  className = ''
}: BookingPromotionSectionProps) {
  // State for countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // State to track if the promotion is expired
  const [isExpired, setIsExpired] = useState(false);
  
  // State for coupon code copying
  const [isCopied, setIsCopied] = useState(false);
  
  // Calculate time remaining until expiry
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = expiryDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsExpired(true);
        return {
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
      
      return {
        hours: Math.floor((difference / (1000 * 60 * 60))),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Cleanup timer on unmount
    return () => clearInterval(timer);
  }, [expiryDate]);
  
  // Handle coupon code copy
  const handleCopyCode = () => {
    navigator.clipboard.writeText(couponCode);
    setIsCopied(true);
    
    // Reset copy state after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  // If promotion is expired, don't show anything
  if (isExpired) {
    return null;
  }
  
  return (
    <section 
      className={`py-16 relative overflow-hidden ${className}`}
      aria-labelledby="booking-promotion-heading"
    >
      {/* Background image or gradient if provided */}
      {backgroundImage ? (
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20" aria-hidden="true" />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <BackgroundGradient className="p-8 rounded-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Promotion details */}
            <div className="px24 mb-8 md:mb-0 md:mr-8 md:max-w-xl">
              <h2 
                id="booking-promotion-heading"
                className="text-2xl md:text-3xl font-bold mb-4"
              >
                {heading}
              </h2>
              <p className="text-lg mb-6">{description}</p>
              
              {/* Discount highlight */}
              <div className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-lg mb-6">
                {discount}
              </div>
              
              {/* Coupon code section */}
              <div className="flex items-center mb-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-l-lg px-4 py-2 font-mono font-medium">
                  {couponCode}
                </div>
                <button
                  onClick={handleCopyCode}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-r-lg transition-colors"
                  aria-label={isCopied ? "Code copied" : "Copy promotion code"}
                >
                  {isCopied ? (
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied
                    </span>
                  ) : (
                    <span>Copy Code</span>
                  )}
                </button>
              </div>
              
              {/* CTA button */}
              <Link
                href={ctaLink}
                className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                {ctaText}
              </Link>
            </div>
            
            {/* Countdown timer */}
            <div className="text-center">
              <p className="text-lg font-medium mb-3">Offer Expires In:</p>
              <div className="flex items-center justify-center space-x-4">
                <div className="flex flex-col items-center">
                  <motion.div
                    key={timeLeft.hours}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 shadow-lg rounded-lg w-16 h-16 flex items-center justify-center text-3xl font-bold"
                  >
                    {String(timeLeft.hours).padStart(2, '0')}
                  </motion.div>
                  <span className="text-xs mt-1">Hours</span>
                </div>
                
                <span className="text-2xl font-bold">:</span>
                
                <div className="flex flex-col items-center">
                  <motion.div
                    key={timeLeft.minutes}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 shadow-lg rounded-lg w-16 h-16 flex items-center justify-center text-3xl font-bold"
                  >
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </motion.div>
                  <span className="text-xs mt-1">Minutes</span>
                </div>
                
                <span className="text-2xl font-bold">:</span>
                
                <div className="flex flex-col items-center">
                  <motion.div
                    key={timeLeft.seconds}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 shadow-lg rounded-lg w-16 h-16 flex items-center justify-center text-3xl font-bold"
                  >
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </motion.div>
                  <span className="text-xs mt-1">Seconds</span>
                </div>
              </div>
            </div>
          </div>
        </BackgroundGradient>
      </div>
    </section>
  );
}