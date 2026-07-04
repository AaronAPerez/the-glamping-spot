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
      image:"/images/deck.png",
      title: 'Luxury Glamping in a Geodesic Dome',
      subtitle: 'A one-of-a-kind glamping getaway near Houston, Texas'
    },
    {
      image: '/images/exterior-3.avif',
      title: 'Unforgettable Glamping Adventures',
      subtitle: 'Premium dome glamping with all the comforts of home'
    },
    {
      image: '/images/backyard.avif',
      title: 'Where Glamping Meets Texas Wilderness',
      subtitle: 'Experience luxury dome glamping in the Big Thicket'
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
    <section className="hero-section relative min-h-[60vh] sm:min-h-[75vh] md:min-h-[min(90vh,900px)] [@media(max-height:500px)]:min-h-0 [@media(max-height:500px)]:h-screen">
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
              alt={slide.title}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 70%' }}
              priority
              sizes="100vw"
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center min-h-[60vh] sm:min-h-[75vh] md:min-h-[min(90vh,900px)] [@media(max-height:500px)]:min-h-0 [@media(max-height:500px)]:h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 md:py-32 [@media(max-height:500px)]:py-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl [@media(max-height:500px)]:text-2xl [@media(max-height:500px)]:mb-2">
              {heroSlides[currentSlide].title}
            </h1>

            <p className="text-xl sm:text-2xl lg:text-3xl text-white/95 mb-10 font-light drop-shadow-lg max-w-2xl [@media(max-height:500px)]:text-base [@media(max-height:500px)]:mb-4">
              {heroSlides[currentSlide].subtitle}
            </p>

            {/* Airbnb Booking CTAs */}
              <div className="mt-6 flex flex-col sm:flex-row items-start gap-4 [@media(max-height:500px)]:mt-2 [@media(max-height:500px)]:gap-2">
                <a
                  href="https://www.airbnb.com/rooms/1461278647776104058"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 [@media(max-height:500px)]:px-4 [@media(max-height:500px)]:py-2 [@media(max-height:500px)]:text-sm bg-[#FF385C] hover:bg-[#e0314f] text-white font-bold text-lg rounded-xl shadow-xl transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="Book The Glamping Spot on Airbnb — opens in a new tab"
                >
                  {/* Airbnb Bélo icon */}
                  <svg className="w-6 h-6" viewBox="0 0 1000 1000" fill="currentColor" aria-hidden="true">
                    <path d="M499.3 736.7c-51-64-81-120.1-91-168.1-10-39-6-70 11-93 18-27 45-40 80-40s62 13 80 40c17 23 21 54 11 93-10 48-40 104.1-91 168.1zm362.2 43c-7 47-39 86-83 105-85 37-169.1-22-241.1-102 119.1-149.1 141.1-265.1 90-340.2-30-43-73-64-128.1-64-111 0-172.1 94-148.1 203.1 14 59 51 124.1 107 192.1-37 41-77.1 72-116.1 93-41 19-81 23-117 8-49-18-81-61-83-111-3-50 21-102 68-140.1l16-12s24-18 72.1-44c16-8 33-17 51-26-9-12-18-24-27-35-46-59-76-117.1-88-171.1C92 270.1 176 176 279 176c55 0 97 20 138.1 63l10 11 10-11c41-43 83-63 138.1-63 103 0 187.1 94.1 160.1 228.1-12 54-41 112.1-88 171.1-9 11-18 23-27 35 18 9 35 18 51 26 48.1 26 72.1 44 72.1 44l16 12c47 38.1 71 90.1 68 140.1z" />
                  </svg>
                  Book on Airbnb
                </a>
                <a
                  href="#featured-properties"
                  className="inline-flex items-center gap-2 px-8 py-4 [@media(max-height:500px)]:px-4 [@media(max-height:500px)]:py-2 [@media(max-height:500px)]:text-sm border-2 border-white/60 hover:border-white text-white font-semibold text-lg rounded-xl transition-all duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="View our geodesic dome accommodations"
                >
                  View Our Domes
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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