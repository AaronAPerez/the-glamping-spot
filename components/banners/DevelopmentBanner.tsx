"use client";

import { useState, useEffect } from 'react';

/**
 * Development Banner Component
 * Displays a prominent notice that the site is in development and not yet accepting bookings
 */
export default function DevelopmentBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if banner was previously dismissed (session-based)
    const dismissed = sessionStorage.getItem('devBannerDismissed') === 'true';
    setIsDismissed(dismissed);
    setIsVisible(!dismissed);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('devBannerDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-16 left-3/10 right-0 rounded-l-xl md:top-2 md:left-auto md:right-2 md:w-auto z-[100] bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-white shadow-lg backdrop-blur-2xl text-center md:rounded-xl"
      role="alert"
      aria-live="polite"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4  md:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-3 gap-2 sm:gap-4">
          {/* Icon and Message */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            {/* Construction Icon */}
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-black/20 rounded-full flex items-center justify-center animate-pulse">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white"
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
            </div>

            {/* Message Text */}
            <div className="flex-1 min-w-0 text-left md:text-center">
              <p className="text-xs sm:text-sm md:text-base font-semibold truncate sm:whitespace-normal">
                🚧 Website Under Development
              </p>
              <p className="hidden sm:block text-xs md:text-sm text-white/90 mt-0.5">
                The Glamping Spot is not yet open. We're working hard to bring you an amazing experience. Check back soon!
              </p>
            </div>
          </div>

          {/* Dismiss Button */}
          <button
            type="button"
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 sm:p-1.5 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-500"
            aria-label="Dismiss development notice"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}