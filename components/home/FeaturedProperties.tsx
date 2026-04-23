'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FeaturedPropertyData {
  _id: string;
  name: string;
  description: string;
  location: string;
  price: number | null;
  imageUrls: string[];
  capacity: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: { icon: React.ReactNode; label: string }[];
  checkIn: string;
  checkOut: string;
  airbnbUrl: string;
}

interface FeaturedPropertiesProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function AirbnbIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1000 1000" fill="currentColor" aria-hidden="true">
      <path d="M499.3 736.7c-51-64-81-120.1-91-168.1-10-39-6-70 11-93 18-27 45-40 80-40s62 13 80 40c17 23 21 54 11 93-10 48-40 104.1-91 168.1zm362.2 43c-7 47-39 86-83 105-85 37-169.1-22-241.1-102 119.1-149.1 141.1-265.1 90-340.2-30-43-73-64-128.1-64-111 0-172.1 94-148.1 203.1 14 59 51 124.1 107 192.1-37 41-77.1 72-116.1 93-41 19-81 23-117 8-49-18-81-61-83-111-3-50 21-102 68-140.1l16-12s24-18 72.1-44c16-8 33-17 51-26-9-12-18-24-27-35-46-59-76-117.1-88-171.1C92 270.1 176 176 279 176c55 0 97 20 138.1 63l10 11 10-11c41-43 83-63 138.1-63 103 0 187.1 94.1 160.1 228.1-12 54-41 112.1-88 171.1-9 11-18 23-27 35 18 9 35 18 51 26 48.1 26 72.1 44 72.1 44l16 12c47 38.1 71 90.1 68 140.1z" />
    </svg>
  );
}

// ─── Real listing data (Airbnb ID 1461278647776104058) ────────────────────────

const LISTING: FeaturedPropertyData = {
  _id: 'the-glamping-spot-dome',
  name: 'The Glamping Spot',
  description:
    'Wake up to the sounds of nature, explore scenic trails right outside your door, or simply relax on the spacious wooden deck overlooking a serene private pond. In the evenings, unwind under the stars with soft ambient lighting and the warm glow of the dome. Perfect for couples, solo travelers, or anyone looking to disconnect and recharge, this secluded getaway blends luxury comfort with the beauty of the East Texas wilderness.',
  location: 'Kountze, Texas, United States',
  price: null,
  imageUrls: [
    '/images/deck.avif',
    '/images/bedroom.avif',
    '/images/living-room.avif',
    '/images/glamping-dome.jpg',
    '/images/deck-2.avif',
    '/images/backyard.avif',
    '/images/backyard-view.avif',
    '/images/backyard-top-view.avif',
  ],
  capacity: 6,
  bedrooms: 2,
  beds: 2,
  bathrooms: 1,
  amenities: [
    {
      label: 'Lake Access',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15c1.5 0 3-1 4.5-1s3 1 4.5 1 3-1 4.5-1 3 1 4.5 1M3 19c1.5 0 3-1 4.5-1s3 1 4.5 1 3-1 4.5-1 3 1 4.5 1M12 3v8" />
        </svg>
      ),
    },
    {
      label: 'Kitchen',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      label: 'Wifi',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      ),
    },
    {
      label: 'Free Parking – 4 Spaces',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3m0 0h3l3 3v4h-3m-3 0H9M7 17a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
      ),
    },
    {
      label: 'TV with Premium Cable',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'Wooden Deck',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      label: 'Private Pond',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3s-5 5-5 9a5 5 0 0010 0c0-4-5-9-5-9z" />
        </svg>
      ),
    },
    {
      label: 'Scenic Trails',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
    },
    {
      label: 'Carbon Monoxide Alarm',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      label: 'Smoke Alarm',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
  ],
  checkIn: '2:00 PM',
  checkOut: '12:00 PM',
  airbnbUrl: 'https://www.airbnb.com/rooms/1461278647776104058',
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function FeaturedProperties({
  title = 'Our Luxury Geodesic Dome',
  subtitle = 'A secluded dome retreat in Kountze, Texas — overlooking a private pond, surrounded by nature, now booking on Airbnb.',
  className = '',
}: FeaturedPropertiesProps) {
  const [activeImg, setActiveImg] = useState(0);
  const property = LISTING;

  return (
    <section
      className={`py-20 sm:py-24 bg-gradient-to-b from-slate-50 to-white ${className}`}
      aria-labelledby="featured-properties-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-medium px-4 py-1.5 rounded-full mb-5 border border-emerald-200">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Kountze, Texas — East Texas
          </div>
          <h2
            id="featured-properties-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* ── Showcase card ── */}
        <motion.div
          className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">

            {/* ── Left — Photo gallery ── */}
            <div className="lg:col-span-3 flex flex-col">

              {/* Main image */}
              <div className="relative h-72 sm:h-96 lg:h-[420px] overflow-hidden">
                <Image
                  key={activeImg}
                  src={property.imageUrls[activeImg]}
                  alt={`${property.name} — photo ${activeImg + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  quality={85}
                  priority={activeImg === 0}
                  className="transition-opacity duration-300"
                />
                {/* Airbnb badge overlay */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[#FF385C] text-xs font-bold px-3 py-1.5 rounded-full shadow">
                    <AirbnbIcon className="w-3.5 h-3.5" />
                    Now on Airbnb
                  </span>
                </div>
                {/* Photo count */}
                <a
                  href={property.airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-3 py-2 rounded-lg border border-white/60 shadow hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
                  aria-label="View all photos on Airbnb"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Show all photos
                </a>
              </div>

              {/* Thumbnail strip */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-gray-50">
                {property.imageUrls.map((url, i) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    className={`relative h-20 sm:h-24 overflow-hidden rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-1 ${
                      activeImg === i
                        ? 'ring-2 ring-[#FF385C] ring-offset-1'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    aria-label={`View photo ${i + 1}`}
                    aria-pressed={activeImg === i ? 'true' : 'false'}
                  >
                    <Image
                      src={url}
                      alt={`${property.name} thumbnail ${i + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="25vw"
                      quality={60}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* ── Right — Details + Booking ── */}
            <div className="lg:col-span-2 flex flex-col p-6 sm:p-8 gap-6 overflow-y-auto">

              {/* Title + location */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                    {property.name}
                  </h3>
                  <span className="shrink-0 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 font-semibold px-2.5 py-1 rounded-full">
                    New
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-2">Dome · {property.location}</p>
                <p className="text-gray-700 text-sm font-medium">
                  {property.capacity} guests &nbsp;·&nbsp; {property.bedrooms} bedrooms &nbsp;·&nbsp; {property.beds} beds &nbsp;·&nbsp; {property.bathrooms} bath
                </p>
              </div>

              <hr className="border-gray-100" />

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                {property.description}
              </p>

              <hr className="border-gray-100" />

              {/* Amenities — 2-col grid */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">What this place offers</h4>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                  {property.amenities.map(({ icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-gray-600 text-xs">
                      <span className="text-gray-400 shrink-0">{icon}</span>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Booking card */}
              <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <p className="text-xs text-gray-500">Add your travel dates for exact pricing</p>
                </div>

                {/* Date + guest fields (visual only — action on Airbnb) */}
                <div className="divide-y divide-gray-100">
                  <div className="grid grid-cols-2 divide-x divide-gray-100">
                    <div className="px-4 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-0.5">Check-in</p>
                      <p className="text-sm text-gray-400">Add date</p>
                    </div>
                    <div className="px-4 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-0.5">Checkout</p>
                      <p className="text-sm text-gray-400">Add date</p>
                    </div>
                  </div>
                  <div className="px-4 py-3 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-0.5">Guests</p>
                      <p className="text-sm text-gray-600">Up to {property.capacity} guests</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Book CTA */}
              <div className="flex flex-col gap-3">
                <a
                  href={property.airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-[#FF385C] hover:bg-[#e0314f] text-white font-bold rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[#FF385C]/30 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2"
                  aria-label="Book The Glamping Spot on Airbnb — opens in a new tab"
                >
                  <AirbnbIcon className="w-5 h-5" />
                  Book on Airbnb
                </a>
                <p className="text-center text-xs text-gray-400">You won&apos;t be charged yet</p>
              </div>

              {/* AirCover badge */}
              <div className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                <svg className="w-5 h-5 text-[#FF385C] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <p className="text-xs font-bold text-gray-800">AirCover included</p>
                  <p className="text-xs text-gray-500">Every stay includes top-to-bottom protection, only on Airbnb.</p>
                </div>
              </div>

              {/* House rules */}
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-500 pb-2">
                <span><span className="font-semibold text-gray-700">Check-in:</span> After {property.checkIn}</span>
                <span><span className="font-semibold text-gray-700">Checkout:</span> Before {property.checkOut}</span>
                <span><span className="font-semibold text-gray-700">Max guests:</span> {property.capacity}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
