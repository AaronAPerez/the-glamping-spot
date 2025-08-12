'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TextGenerateEffect } from '../ui/TextGenerateEffect';

/**
 * AboutSection component with enhanced accessibility and performance optimizations
 */
export default function AboutSection() {
  // Optimized image data with proper alt text and loading priorities
  const showcaseImages = [
    {
      src: "/images/MorningCoffee.jpg",
      alt: "Guest enjoying morning coffee with scenic East Texas landscape view from geodesic dome deck",
      priority: false
    },
    {
      src: "/images/stars1.jpg", 
      alt: "Stunning night sky view through transparent geodesic dome ceiling, perfect for stargazing",
      priority: false
    },
    {
      src: "/images/dining.jpg",
      alt: "Elegant dining setup inside luxury geodesic dome with modern amenities",
      priority: false
    },
    {
      src: "/images/bathroom.jpg",
      alt: "Luxury bathroom with modern fixtures and premium amenities in geodesic dome",
      priority: false
    }
  ];

  // Optimized animation variants for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      className="py-24 bg-gradient-to-b from-emerald-800 to-emerald-900" 
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Enhanced Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10"
          >
            <h2 
              id="about-heading" 
              className="text-4xl lg:text-5xl font-bold mb-6 text-white"
            >
              <TextGenerateEffect 
                words="Immerse Yourself in Nature's Luxury" 
                className="text-white"
              />
            </h2>

            <div className="space-y-6 text-emerald-100">
              <p className="text-lg leading-relaxed">
                Our geodesic dome glamping experiences offer the perfect balance of adventure and comfort. 
                Wake up to stunning East Texas sunrises, fall asleep under star-filled skies, and connect 
                with nature without sacrificing modern luxuries.
              </p>
              
              <p className="text-base leading-relaxed opacity-90">
                Located in the heart of the Big Thicket region near Kountze, Texas, our luxury domes 
                provide an unparalleled glamping experience just minutes from Houston.
              </p>
            </div>

            {/* Enhanced Features Card */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-emerald-700/50">
              <h3 className="font-bold text-xl mb-6 text-white">
                Experience Luxury Glamping With:
              </h3>
              
              <ul className="space-y-4" role="list">
                {[
                  {
                    text: "Breathtaking locations away from crowds in pristine East Texas wilderness",
                    icon: "🌲"
                  },
                  {
                    text: "Luxury amenities including premium bedding, climate control, and private hot tubs",
                    icon: "🛁"
                  },
                  {
                    text: "Thoughtfully designed geodesic domes that connect you with the environment",
                    icon: "🏠"
                  },
                  {
                    text: "Sustainable practices that minimize environmental impact",
                    icon: "♻️"
                  },
                  {
                    text: "Stargazing through transparent dome ceilings",
                    icon: "⭐"
                  },
                  {
                    text: "On-site activities including ATV trails and outdoor recreation",
                    icon: "🏍️"
                  }
                ].map((feature, index) => (
                  <li key={index} className="flex items-start group">
                    <span 
                      className="text-emerald-300 mr-3 mt-1 text-lg transition-transform group-hover:scale-110" 
                      aria-hidden="true"
                      role="img"
                    >
                      {feature.icon}
                    </span>
                    <span className="text-emerald-100 leading-relaxed">
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Action */}
            <div className="mt-8">
              <a
                href="/booking"
                className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-emerald-800"
                aria-label="Book your geodesic dome glamping experience"
              >
                Book Your Experience
                <svg 
                  className="ml-2 h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Optimized Image Grid */}
          <motion.div 
            className="grid grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {showcaseImages.map((image, index) => (
              <motion.div
                key={image.src}
                variants={itemVariants}
                className="relative group"
              >
                <div className="relative h-48 lg:h-64 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                    quality={80}
                    loading={image.priority ? "eager" : "lazy"}
                  />
                  
                  {/* Enhanced overlay with better accessibility */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                  
                  {/* Image caption overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium">
                      {image.alt.split(',')[0]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Additional Value Propositions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Prime Location",
              description: "Just 5 minutes from Big Thicket National Preserve and 1 hour from Houston",
              icon: "📍"
            },
            {
              title: "Year-Round Comfort", 
              description: "Climate-controlled domes with heating and cooling for any season",
              icon: "🌡️"
            },
            {
              title: "Unique Architecture",
              description: "Geodesic dome design offers 360-degree views and stargazing opportunities",
              icon: "🔆"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-emerald-700/50"
            >
              <div className="text-4xl mb-4" role="img" aria-label={feature.title}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-emerald-100">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}