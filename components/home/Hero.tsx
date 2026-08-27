'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';

// Hero Section Component
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample hero backgrounds
  const heroSlides = [
    {
      image: '/images/dome/geodesic-dome-glamping-kountze-texas-night.avif',
      alt: 'Geodesic glamping dome glowing at twilight with string lights along the wooden deck in Kountze, Texas',
      // 4:3 source. Portrait phones crop hard left/right, so bias the focal point
      // up to keep the dome clear of the text block at the bottom.
      position: 'object-[center_35%] sm:object-center',
      title: 'Luxury Glamping in a Geodesic Dome',
      subtitle: 'A one-of-a-kind glamping getaway near Houston, Texas'
    },
    {
      // Was the drone frame-grab of the pond — a soft, low-bitrate source that
      // visibly upscaled across the full-bleed hero. This one is a true photo
      // at roughly twice the bits per pixel, so it holds up at full width.
      image: '/images/dome/deck-table-wooden-deck-pine-forest-view.webp',
      alt: 'The dome’s wooden deck looking out over the East Texas pine forest under a clear sky',
      // 1:1 source. Wide viewports crop it vertically; centre lands the treeline
      // over the deck, which is the pairing the headline is about.
      position: 'object-[center_75%] md:object-[center_50%]',
      title: 'Where Glamping Meets Texas Wilderness',
      subtitle: 'Experience luxury dome glamping in the Big Thicket'
    },
    {
      image: '/images/dome/dome-interior-loft-view-living-area.avif',
      alt: 'Inside the geodesic dome, seen from the loft: leather sofa, dining table and kitchen counter beneath the dome canopy',
      // Portrait 3:4 source. On phones the frame is cropped only slightly, so
      // bias toward the bottom to lift the dome frame and table clear of the
      // headline; wide viewports crop vertically and want the living area.
      position: 'object-[center_75%] md:object-[center_50%]',
      title: 'A Full Home Under the Dome',
      subtitle: 'Sleeps five — full kitchen, two bedrooms and a loft under the canopy'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <>
    <section className="hero-section relative flex flex-col min-h-[100svh] sm:min-h-[75vh] md:min-h-[min(90vh,900px)] [@media(max-height:500px)]:min-h-0 [@media(max-height:500px)]:h-screen">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className={`object-cover w-full h-full ${slide.position}`}
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              sizes="100vw"
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20 sm:bg-gradient-to-r sm:from-black/85 sm:via-black/55 sm:to-black/15"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-18 md:py-24 [@media(max-height:500px)]:py-6">
          <div className="max-w-4xl">
            {/* Eyebrow — puts the location above the fold for local search */}
            <p className="flex items-center gap-3 mb-4 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gold-200 drop-shadow-lg [@media(max-height:500px)]:mb-2">
              <span className="h-px w-6 bg-gold-400" aria-hidden="true" />
              Kountze, Texas &middot; Big Thicket
            </p>

            <h1 className="text-[2rem] sm:text-4xl md:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-5 leading-[1.1] tracking-tight text-shadow-md drop-shadow-2xl [@media(max-height:500px)]:text-2xl [@media(max-height:500px)]:mb-2">
              {heroSlides[currentSlide].title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-7 sm:mb-9 font-light leading-relaxed drop-shadow-lg max-w-md sm:max-w-xl [@media(max-height:500px)]:text-sm [@media(max-height:500px)]:mb-3">
              {heroSlides[currentSlide].subtitle}
            </p>

            {/* Airbnb Booking CTAs */}
              <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-3 max-w-xs sm:max-w-none [@media(max-height:500px)]:mt-2 [@media(max-height:500px)]:gap-2">
                <a
                  href="https://www.airbnb.com/rooms/1461278647776104058"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 px-6 py-3.5 sm:px-5 sm:py-2.5 [@media(max-height:500px)]:px-4 [@media(max-height:500px)]:py-2 [@media(max-height:500px)]:text-sm bg-[#FF385C] hover:bg-[#e0314f] text-white font-semibold text-base sm:text-sm rounded-lg shadow-lg transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2 focus:ring-offset-black/60"
                  aria-label="Book The Glamping Spot on Airbnb — opens in a new tab"
                >
                  {/* Airbnb Bélo icon */}
                  <svg className="w-5 h-5 sm:w-4 sm:h-4" viewBox="0 0 1000 1000" fill="currentColor" aria-hidden="true">
                    <path d="M499.3 736.7c-51-64-81-120.1-91-168.1-10-39-6-70 11-93 18-27 45-40 80-40s62 13 80 40c17 23 21 54 11 93-10 48-40 104.1-91 168.1zm362.2 43c-7 47-39 86-83 105-85 37-169.1-22-241.1-102 119.1-149.1 141.1-265.1 90-340.2-30-43-73-64-128.1-64-111 0-172.1 94-148.1 203.1 14 59 51 124.1 107 192.1-37 41-77.1 72-116.1 93-41 19-81 23-117 8-49-18-81-61-83-111-3-50 21-102 68-140.1l16-12s24-18 72.1-44c16-8 33-17 51-26-9-12-18-24-27-35-46-59-76-117.1-88-171.1C92 270.1 176 176 279 176c55 0 97 20 138.1 63l10 11 10-11c41-43 83-63 138.1-63 103 0 187.1 94.1 160.1 228.1-12 54-41 112.1-88 171.1-9 11-18 23-27 35 18 9 35 18 51 26 48.1 26 72.1 44 72.1 44l16 12c47 38.1 71 90.1 68 140.1z" />
                  </svg>
                  Book on Airbnb
                </a>
                <a
                  href="#featured-properties"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3.5 sm:px-5 sm:py-2.5 [@media(max-height:500px)]:px-4 [@media(max-height:500px)]:py-2 [@media(max-height:500px)]:text-sm border border-brand-300/60 hover:border-brand-300 bg-brand-900/30 hover:bg-brand-400/15 backdrop-blur-sm text-white font-semibold text-base sm:text-sm rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2 focus:ring-offset-black/60"
                  aria-label="View our geodesic dome accommodations"
                >
                  View Our Dome
                  <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
    </section>
    </>
  );
};

export default Hero;