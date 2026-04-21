'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AIRBNB_LISTING_URL = 'https://www.airbnb.com/rooms/1461278647776104058';

// Airbnb Bélo logo SVG
function AirbnbLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1000 1000"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M499.3 736.7c-51-64-81-120.1-91-168.1-10-39-6-70 11-93 18-27 45-40 80-40s62 13 80 40c17 23 21 54 11 93-10 48-40 104.1-91 168.1zm362.2 43c-7 47-39 86-83 105-85 37-169.1-22-241.1-102 119.1-149.1 141.1-265.1 90-340.2-30-43-73-64-128.1-64-111 0-172.1 94-148.1 203.1 14 59 51 124.1 107 192.1-37 41-77.1 72-116.1 93-41 19-81 23-117 8-49-18-81-61-83-111-3-50 21-102 68-140.1l16-12s24-18 72.1-44c16-8 33-17 51-26-9-12-18-24-27-35-46-59-76-117.1-88-171.1C92 270.1 176 176 279 176c55 0 97 20 138.1 63l10 11 10-11c41-43 83-63 138.1-63 103 0 187.1 94.1 160.1 228.1-12 54-41 112.1-88 171.1-9 11-18 23-27 35 18 9 35 18 51 26 48.1 26 72.1 44 72.1 44l16 12c47 38.1 71 90.1 68 140.1z" />
    </svg>
  );
}

interface AirbnbBookingCTAProps {
  className?: string;
}

export default function AirbnbBookingCTA({ className = '' }: AirbnbBookingCTAProps) {
  return (
    <section
      className={`relative py-24 overflow-hidden bg-slate-900 ${className}`}
      aria-labelledby="airbnb-cta-heading"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/stars1.jpg"
          alt="Starry night sky over geodesic dome at The Glamping Spot"
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
          quality={80}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Airbnb badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full">
            <AirbnbLogo className="w-4 h-4 text-[#FF385C]" />
            Now available on Airbnb
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          id="airbnb-cta-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          Ready to Book Your
          <span className="block text-[#FF385C]">Glamping Getaway?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Our luxury geodesic dome is now live on Airbnb. Check real-time availability,
          read guest reviews, and secure your dates — all through Airbnb's trusted platform.
        </motion.p>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm text-white/70"
        >
          {[
            { icon: '★', label: 'Airbnb Verified Listing' },
            { icon: '🔒', label: 'Secure Payment via Airbnb' },
            { icon: '🛡️', label: 'AirCover Guest Protection' },
            { icon: '💬', label: 'Real Guest Reviews' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span aria-hidden="true">{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={AIRBNB_LISTING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#FF385C] hover:bg-[#e0314f] text-white font-bold text-lg rounded-xl shadow-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-[#FF385C]/30 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2 focus:ring-offset-slate-900 min-w-[220px]"
            aria-label="Book The Glamping Spot on Airbnb — opens in a new tab"
          >
            <AirbnbLogo className="w-6 h-6" />
            Book on Airbnb
          </a>

          <a
            href={AIRBNB_LISTING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-white/40 hover:border-white text-white font-semibold text-lg rounded-xl transition-all duration-200 hover:-translate-y-1 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 min-w-[220px]"
            aria-label="View our Airbnb listing — opens in a new tab"
          >
            View Listing & Reviews
          </a>
        </motion.div>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-xs text-white/40"
        >
          You will be redirected to Airbnb.com to complete your booking.
        </motion.p>
      </div>
    </section>
  );
}
