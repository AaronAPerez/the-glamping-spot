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
 * CTA Section with dynamic lighting effects from Aceternity UI
 */
export default function CTASection() {
  // Words for the typewriter effect
  const words = [
    {
      text: "Ready",
    },
    {
      text: "for",
    },
    {
      text: "Your",
    },
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
    <section className="relative py-24 overflow-hidden" aria-labelledby="cta-heading">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/nature.jpg"
          alt="Scenic nature background"
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      {/* Background beams effect */}
      <BackgroundBeams 
        className="absolute inset-0" 
        opacity={0.3}
        background="transparent"
      />
      
      {/* Spotlight effect */}
      <Spotlight
        className="absolute inset-0 md:hidden"
        size={300}
        spotlightColour="white"
        opacity={0.1}
      />
      
      {/* Content container */}
      <div className="relative z-10">
        <LampContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <div className="mx-auto mb-8">
              <TypewriterEffect words={words} className="text-4xl md:text-5xl font-bold" />
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto mb-12"
            >
              Book your extraordinary stay today and create memories that will last a lifetime.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/properties" 
                className="inline-flex items-center justify-center px-8 py-3 border border-white rounded-md text-base font-medium text-white hover:bg-white hover:text-emerald-700 transition-colors md:py-4 md:text-lg"
                aria-label="Browse all available properties"
              >
                Browse Properties
              </Link>
              
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center px-8 py-3 bg-emerald-600 rounded-md text-base font-medium text-white hover:bg-emerald-500 transition-colors md:py-4 md:text-lg"
                aria-label="Learn more about The Glamping Spot experience"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </LampContainer>
      </div>
    </section>
  );
}