'use client';

import React from 'react';
import { BackgroundGradient } from '../ui/BackgroundGradient';
import Link from 'next/link';
import { TextGenerateEffect } from '../ui/TextGenerateEffect';
import { SparklesCore } from '../ui/SparklesCore';
import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * Hero component with responsive design
 */
const Hero = () => {
  return (
    <section className="relative h-[100vh] overflow-hidden" aria-labelledby="hero-heading">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/GlampingHero.jpg" 
          alt="Glamping dome in a scenic mountain setting"
          fill
          style={{ objectFit: 'cover' }}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Sparkles effect overlay */}
      <div className="absolute inset-0 w-full h-full z-10">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.5}
          particleDensity={15}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      
      {/* Hero content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-start">
        <div className="text-white max-w-3xl">
          {/* Animated title with text generation effect */}
          <h1 
            id="hero-heading" 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6"
          >
            <TextGenerateEffect words="Experience Nature in Luxury" />
          </h1>
          
          {/* Animated subtitle - Fixed the nesting issue by not using <p> here */}
          <div className="text-xl sm:text-2xl mb-8 md:mb-14 opacity-90">
            <TextGenerateEffect 
              words="Discover unique glamping experiences in breathtaking locations."
              speed={30}
            />
          </div>
          
          {/* Enhanced CTA button with emerald gradient matching logo */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <BackgroundGradient 
              className="inline-block rounded-xl p-[1px]"
              gradientColor="from-emerald-400 via-teal-500 to-emerald-600"
            >
              <Link 
                href="/bookings" 
                className="bg-black/80 hover:bg-black text-white py-3 px-8 rounded-xl text-lg font-medium transition duration-150 w-full sm:w-auto text-center"
                aria-label="Browse properties and book your adventure"
              >
                Book Your Adventure
              </Link>
            </BackgroundGradient>
            
            {/* Mobile friendly secondary navigation options */}
            <div className="hidden sm:flex mt-4 sm:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <Link 
                  href="/properties" 
                  className="ml-4 text-white hover:text-emerald-300 transition-colors"
                  aria-label="Browse all properties"
                >
                  Explore Properties
                </Link>
              </motion.div>
            </div>
          </div>
          
          {/* Mobile quick navigation links */}
          <div className="w-full mt-12 flex justify-center sm:hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="flex gap-6 bg-black/40 backdrop-blur-sm rounded-full px-6 py-3"
            >
              <Link 
                href="/properties" 
                className="text-white hover:text-emerald-300"
                aria-label="Browse properties"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 mx-auto mb-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                  />
                </svg>
                <span className="text-xs block">Properties</span>
              </Link>
              
              <Link 
                href="/memories" 
                className="text-white hover:text-emerald-300"
                aria-label="View memories"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 mx-auto mb-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
                <span className="text-xs block">Memories</span>
              </Link>
              
              <Link 
                href="/about" 
                className="text-white hover:text-emerald-300"
                aria-label="About us"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 mx-auto mb-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <span className="text-xs block">About</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 2,
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
      >
        <svg 
          className="h-8 w-8 text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;