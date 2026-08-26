"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PhotoLightbox from "@/components/properties/PhotoLightbox";
import LocationMap from "../properties/LocationMap";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FeaturedPropertyData {
  _id: string;
  name: string;
  /** Verbatim listing description, one entry per paragraph. */
  description: string[];
  location: string;
  price: number | null;
  images: { src: string; alt: string }[];
  capacity: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: { icon: React.ReactNode; label: string }[];
  /** Airbnb lists 39 in total; the array above is the subset shown on the card. */
  amenityCount: number;
  highlights: { title: string; body: string }[];
  /** Verbatim spec lines from the top of the listing description. */
  specs: string[];
  bedLayout: { room: string; detail: string; features: string[] }[];
  /** Outdoor spaces, from the listing's room-by-room photo tour. */
  outdoorSpaces: { name: string; features: string[] }[];
  host: {
    name: string;
    tenure: string;
    responseRate: string;
    responseTime: string;
  };
  reviewCount: number;
  checkIn: string;
  checkOut: string;
  petsAllowed: boolean;
  /** "Other things to note" — the rules that carry fines or fixed hours. */
  houseRules: string[];
  /** Verbatim liability reminder from the listing's "The space" section. */
  liabilityNotice: string;
  airbnbUrl: string;
}

interface FeaturedPropertiesProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const listing = {
  name: "The Glamping Spot",
  type: "Dome",
  location: "Kountze, Texas, United States",
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function AirbnbIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1000 1000"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M499.3 736.7c-51-64-81-120.1-91-168.1-10-39-6-70 11-93 18-27 45-40 80-40s62 13 80 40c17 23 21 54 11 93-10 48-40 104.1-91 168.1zm362.2 43c-7 47-39 86-83 105-85 37-169.1-22-241.1-102 119.1-149.1 141.1-265.1 90-340.2-30-43-73-64-128.1-64-111 0-172.1 94-148.1 203.1 14 59 51 124.1 107 192.1-37 41-77.1 72-116.1 93-41 19-81 23-117 8-49-18-81-61-83-111-3-50 21-102 68-140.1l16-12s24-18 72.1-44c16-8 33-17 51-26-9-12-18-24-27-35-46-59-76-117.1-88-171.1C92 270.1 176 176 279 176c55 0 97 20 138.1 63l10 11 10-11c41-43 83-63 138.1-63 103 0 187.1 94.1 160.1 228.1-12 54-41 112.1-88 171.1-9 11-18 23-27 35 18 9 35 18 51 26 48.1 26 72.1 44 72.1 44l16 12c47 38.1 71 90.1 68 140.1z" />
    </svg>
  );
}

// ─── Real listing data (Airbnb ID 1461278647776104058) ────────────────────────

const LISTING: FeaturedPropertyData = {
  _id: "the-glamping-spot-dome",
  name: "Nice Dreams @ The Glamping Spot",
  description: [
    "Explore scenic trails right outside your door, or simply relax on the spacious wooden deck overlooking a serene private pond. Unwind under the stars.",
    "Perfect for couples, solo travelers, or anyone looking to disconnect and recharge, this secluded getaway blends rustic charm with a one-of-a-kind stay you won’t forget.",
  ],
  location: "Kountze, Texas, United States",
  price: null,
  images: [
    {
      src: "/images/dome/geodesic-dome-glamping-kountze-texas-night.avif",
      alt: "Geodesic glamping dome glowing at twilight with string lights along the deck in Kountze, Texas",
    },
    {
      src: "/images/dome/dome-interior-living-dining-kitchenette.avif",
      alt: "Dome interior with dining table, leather sofa, kitchenette and spiral staircase to the loft",
    },
    {
      src: "/images/dome/dome-master-bedroom-king-bed.avif",
      alt: "Bedroom 1 in the dome with a queen bed and crisp white linens",
    },
    {
      src: "/images/dome/deck-table-wooden-deck-pine-forest-view.webp",
      alt: "Spacious wooden deck looking out over the East Texas pine forest",
    },
    {
      src: "/images/dome/dome-living-room-smart-tv-spiral-staircase.avif",
      alt: "Dome living room at night with wall-mounted smart TV and sliding barn door",
    },
    {
      src: "/images/dome/dome-bathroom-rustic-vanity-sink.avif",
      alt: "Full bathroom with rustic reclaimed-wood wall and matte black fixtures",
    },
    {
      src: "/images/dome/glamping-property-aerial-private-pond.avif",
      alt: "Aerial view of the property, the private pond and the surrounding East Texas pine forest",
    },
    {
      src: "/images/dome/geodesic-dome-lit-pine-forest-night.avif",
      alt: "Illuminated geodesic dome surrounded by East Texas pine forest at night",
    },
  ],
  capacity: 5,
  bedrooms: 2,
  beds: 2,
  bathrooms: 1,
  amenities: [
    {
      label: "Lake Access",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 15c1.5 0 3-1 4.5-1s3 1 4.5 1 3-1 4.5-1 3 1 4.5 1M3 19c1.5 0 3-1 4.5-1s3 1 4.5 1 3-1 4.5-1 3 1 4.5 1M12 3v8"
          />
        </svg>
      ),
    },
    {
      label: "Kitchen",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      label: "Wifi",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
          />
        </svg>
      ),
    },
    {
      label: "Free residential garage on premises – 4 spaces",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3m0 0h3l3 3v4h-3m-3 0H9M7 17a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z"
          />
        </svg>
      ),
    },
    {
      label: "TV with Premium Cable",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      label: "Central air conditioning",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 3v18m0-18l-3 3m3-3l3 3m-3 15l-3-3m3 3l3-3M3.5 7.5l15 9m-15-9l1.1 4.1M3.5 7.5l4.1-1.1m10.9 10.1l-4.1 1.1m4.1-1.1l-1.1-4.1M20.5 7.5l-15 9m15-9l-4.1-1.1m4.1 1.1l-1.1 4.1M5.5 16.5l4.1 1.1m-4.1-1.1l1.1-4.1"
          />
        </svg>
      ),
    },
    {
      label: "Fire pit",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 22c-3.3 0-6-2.2-6-5.5 0-2.6 1.9-4.6 3-6.5.9 1 1.6 1.5 2.3 1.5.9 0 1.2-.9 1-2.5C15 11 18 13.4 18 16.5c0 3.3-2.7 5.5-6 5.5z"
          />
        </svg>
      ),
    },
    {
      label: "Private patio or balcony",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      label: "Private backyard",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 3s-5 5-5 9a5 5 0 0010 0c0-4-5-9-5-9z"
          />
        </svg>
      ),
    },
    {
      label: "Exterior security cameras on property",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 10l4.55-2.28A1 1 0 0121 8.62v6.76a1 1 0 01-1.45.9L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      label: "Carbon Monoxide Alarm",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      label: "Smoke Alarm",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      ),
    },
  ],
  amenityCount: 39,
  highlights: [
    {
      title: "In rural Texas, surrounded by nature",
      body: "A secluded dome on private land with lake access, trails, and a serene pond just outside",
    },
    {
      title: "Private deck with grill and fire pit",
      body: "A spacious wooden deck overlooking a private pond, with a propane grill and fire pit for evenings",
    },
    {
      title: "A one-of-a-kind dome retreat",
      body: "A dome stay with lake access, a hammock, and trails from the door for a true nature escape",
    },
  ],
  specs: [
    'Starlink Wifi & 50" TV',
    "Central AC Unit & Heater",
    "Private deck — Propane Grill & Flat Griddle",
  ],
  bedLayout: [
    {
      room: "Bedroom 1",
      detail: "1 queen bed",
      features: [
        "Air conditioning",
        "Heating",
        "Bed linens",
        "Extra pillows and blankets",
      ],
    },
    {
      room: "Bedroom 2",
      detail: "1 double bed, 2 air mattresses",
      features: [
        "Air conditioning",
        "Heating",
        "Bed linens",
        "Extra pillows and blankets",
      ],
    },
  ],
  outdoorSpaces: [
    {
      name: "Backyard",
      features: [
        "BBQ grill",
        "Fire pit",
        "Hammock",
        "Outdoor dining area",
        "Outdoor kitchen",
        "Outdoor furniture",
      ],
    },
    { name: "Deck", features: ["Hammock", "Outdoor kitchen"] },
  ],
  host: {
    name: "Ivan",
    tenure: "4 months hosting",
    responseRate: "100%",
    responseTime: "within an hour",
  },
  reviewCount: 0,
  petsAllowed: false,
  houseRules: [
    "No events or parties",
    "No pets ($200 fine)",
    "No smoking ($200 fine)",
    "No fireworks or firearms",
    "Quiet hours 10:00 PM – 7:00 AM",
  ],
  liabilityNotice:
    "Guests participate in all activities—including swimming, hiking, and kayaking—at their own risk. By booking this property, guests agree to the terms of the liability waiver provided.",
  checkIn: "3:00 PM",
  checkOut: "12:00 PM",
  airbnbUrl: "https://www.airbnb.com/rooms/1461278647776104058",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function FeaturedProperties({
  title = "Our Luxury Geodesic Dome",
  subtitle = "A secluded dome retreat in Kountze, Texas — overlooking a private pond, surrounded by nature, now booking on Airbnb.",
  className = "",
}: FeaturedPropertiesProps) {
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const property = LISTING;

  return (
    <section
      className={`py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white ${className}`}
      aria-labelledby="featured-properties-heading"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-5 border border-brand-200">
            <svg
              className="w-4 h-4"
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
            Kountze, Texas — East Texas
          </div>
          <h2
            id="featured-properties-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 text-balance"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg lg:text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* ── Showcase card ── */}
        <motion.div
          className="max-w-7xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-[auto_1fr]">
            {/* ── Listing detail — left column on desktop, 2nd on mobile ── */}
            <div className="order-2 lg:order-1 lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-2 flex flex-col">
           
              {/*
                The listing detail is far taller than the booking rail, so it
                continues HERE — under the gallery, inside the same column —
                rather than stacking beside it and leaving a tall blank gap
                below the thumbnails.
              */}
              <div className="flex flex-col gap-5 sm:gap-6 p-5 sm:p-6 lg:p-8">
                {/* Title + location */}
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2 mb-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                      {property.name}
                    </h3>
                    {property.reviewCount > 0 && (
                      <span className="shrink-0 text-xs text-brand-700 bg-brand-50 border border-brand-200 font-semibold px-2.5 py-1 rounded-full">
                        {property.reviewCount} reviews
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm mb-2">
                    Dome · {property.location}
                  </p>
                  <p className="text-gray-700 text-sm font-medium">
                    {property.capacity} guests · {property.bedrooms} bedrooms ·{" "}
                    {property.beds} beds · {property.bathrooms} bath
                  </p>
                </div>

                <hr className="border-gray-100" />

                {/* Spec lines — verbatim from the top of the Airbnb description */}
                <ul className="flex flex-wrap gap-2">
                  {property.specs.map((spec) => (
                    <li
                      key={spec}
                      className="rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-xs font-medium text-brand-700"
                    >
                      {spec}
                    </li>
                  ))}
                </ul>

                {/* Description */}
                <div className="flex flex-col gap-3">
                  {property.description.map((para) => (
                    <p
                      key={para.slice(0, 32)}
                      className="text-gray-600 text-sm leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                <hr className="border-gray-100" />

                {/* Listing highlights */}
                <ul className="flex flex-col gap-3">
                  {property.highlights.map(({ title, body }) => (
                    <li key={title} className="flex items-start gap-3">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
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
                      <div>
                        <p className="text-xs font-semibold text-gray-900">
                          {title}
                        </p>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <hr className="border-gray-100" />

                {/* Where you'll sleep */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Where you&apos;ll sleep
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                    {property.bedLayout.map(({ room, detail, features }) => (
                      <div
                        key={room}
                        className="rounded-xl border border-gray-200 px-3 py-2.5"
                      >
                        <p className="text-xs font-semibold text-gray-800">
                          {room}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">{detail}</p>
                        <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                          {features.join(" · ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Outdoor spaces */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    The outdoor space
                  </h4>
                  <div className="flex flex-col gap-2">
                    {property.outdoorSpaces.map(({ name, features }) => (
                      <div key={name} className="flex items-baseline gap-2">
                        <span className="text-xs font-semibold text-gray-800 shrink-0">
                          {name}
                        </span>
                        <span className="text-xs text-gray-500 leading-relaxed">
                          {features.join(" · ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Amenities — 2-col grid */}
                <div>
                  <div className="flex items-baseline justify-between gap-3 mb-3">
                    <h4 className="text-sm font-semibold text-gray-900">
                      What this place offers
                    </h4>
                    <a
                      href={property.airbnbUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-gray-500 underline underline-offset-2 hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF385C] rounded-sm"
                    >
                      All {property.amenityCount} on Airbnb
                    </a>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-y-3 gap-x-4">
                    {property.amenities.map(({ icon, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2 text-gray-600 text-xs"
                      >
                        <span className="text-gray-400 shrink-0">{icon}</span>
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-100" />
              </div>
            </div>

            {lightboxIndex !== null && (
              <PhotoLightbox
                images={property.images}
                index={lightboxIndex}
                onIndexChange={setLightboxIndex}
                onClose={() => {
                  setActiveImg(lightboxIndex);
                  setLightboxIndex(null);
                }}
                airbnbUrl={property.airbnbUrl}
              />
            )}

            {/* ── Photo gallery — top-right on desktop, 1st on mobile ── */}

            <div className="order-1 lg:order-2 lg:col-start-3 lg:col-span-3 lg:row-start-1 lg:self-start border-b lg:border-b-0 border-gray-100 lg:border-l">
              {/* Main image */}
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[480px] xl:h-[560px] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(activeImg)}
                  className="absolute inset-0 w-full h-full group focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-inset"
                  aria-label={`Open photo gallery — ${property.images[activeImg].alt}`}
                >
                  <Image
                    key={activeImg}
                    src={property.images[activeImg].src}
                    alt={property.images[activeImg].alt}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 1024px) 100vw, (max-width: 1440px) 58vw, 780px"
                    quality={85}
                    priority={activeImg === 0}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
                {/* Airbnb badge overlay */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[#FF385C] text-xs font-bold px-3 py-1.5 rounded-full shadow">
                    <AirbnbIcon className="w-3.5 h-3.5" />
                    Now on Airbnb
                  </span>
                </div>
                {/* Photo count */}
                <button
                  type="button"
                  onClick={() => setLightboxIndex(activeImg)}
                  className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-3 py-2 rounded-lg border border-white/60 shadow hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF385C]"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  Show all {property.images.length} photos
                </button>
              </div>

              {/* Thumbnail strip */}
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-1 p-1 bg-gray-50">
                {property.images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    className={`relative h-16 sm:h-20 md:h-24 overflow-hidden rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-1 ${
                      activeImg === i
                        ? "ring-2 ring-[#FF385C] ring-offset-1"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`View photo ${i + 1}: ${img.alt}`}
                    aria-pressed={activeImg === i ? "true" : "false"}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 1024px) 25vw, 200px"
                      quality={60}
                    />
                  </button>
                ))}
              </div>

            </div>

            {/* ── Booking rail — under the gallery on desktop, last on mobile ── */}
            <div className="lg:order-3 lg:col-start-3 lg:col-span-3 lg:row-start-2 border-t lg:border-t-0 border-gray-100 lg:border-l">
              <div className="flex flex-col gap-4 sm:gap-5 p-5 sm:p-6 lg:p-8 lg:sticky lg:top-[calc(var(--header-height)+1rem)]">
   
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
                  <p className="text-center text-xs text-gray-400">
                    You won&apos;t be charged yet
                  </p>
                </div>

                {/* AirCover badge */}
                <div className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                  <svg
                    className="w-5 h-5 text-[#FF385C] shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <div>
                    <p className="text-xs font-bold text-gray-800">
                      AirCover included
                    </p>
                    <p className="text-xs text-gray-500">
                      Every stay includes top-to-bottom protection, only on
                      Airbnb.
                    </p>
                  </div>
                </div>

                {/* House rules */}
                <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-1 text-xs text-gray-500">
                  <span>
                    <span className="font-semibold text-gray-700">
                      Check-in:
                    </span>{" "}
                    After {property.checkIn}
                  </span>
                  <span>
                    <span className="font-semibold text-gray-700">
                      Checkout:
                    </span>{" "}
                    Before {property.checkOut}
                  </span>
                  <span>
                    <span className="font-semibold text-gray-700">
                      Max guests:
                    </span>{" "}
                    {property.capacity}
                  </span>
                </div>

                {/* Other things to note — several of these carry a fine, so they
                  belong in front of the guest before they book, not after. */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 mb-2">
                    Other things to note
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                    {property.houseRules.map((rule) => (
                      <li
                        key={rule}
                        className="flex items-start gap-2 text-xs text-gray-500"
                      >
                        <span
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300"
                          aria-hidden="true"
                        />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Liability reminder — verbatim from the listing, linked to the
                  waiver guests actually sign. */}
                <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-xs font-bold text-amber-900 mb-0.5">
                      Liability reminder
                    </p>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      {property.liabilityNotice}
                    </p>
                    <Link
                      href="/waiver"
                      className="mt-1.5 inline-block text-xs font-semibold text-amber-900 underline underline-offset-2 hover:text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-sm"
                    >
                      Read the liability waiver
                    </Link>
                  </div>
                </div>
                     {/* Where you'll be */}
                            <div>
                              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Where you&apos;ll be
                              </h2>
                              <p className="text-gray-600 text-sm mb-4">{listing.location}</p>
                              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                Located in the heart of the Big Thicket region — one of the most
                                biodiverse areas in the United States, home to rare orchids,
                                carnivorous plants, and abundant wildlife. The nearest city is
                                Kountze, TX, with Houston just over an hour away.
                              </p>
                
                              <LocationMap location={listing.location} />
                            </div>
              </div>
            </div>
          </div>


        </motion.div>
      </div>
    </section>
  );
}
