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
    },
    {
      src: "/images/treehouse1.jpg",
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
      className="py-20 sm:py-24 bg-gradient-to-b from-emerald-800 via-emerald-900 to-slate-900"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading and Intro (Mobile: Shows First) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 mb-12 lg:hidden"
        >
          <h2
            id="about-heading"
            className="text-4xl font-bold mb-8 text-white"
          >
            <TextGenerateEffect
              words="Immerse Yourself in Nature's Luxury"
              className="text-white"
            />
          </h2>

          <div className="space-y-6 text-emerald-50">
            <p className="text-xl leading-relaxed font-light">
              Our geodesic dome glamping experiences offer the perfect balance of adventure and comfort.
              Wake up to stunning East Texas sunrises, fall asleep under star-filled skies, and connect
              with nature without sacrificing modern luxuries.
            </p>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Enhanced Text Content (Desktop Only - Full Content) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 order-2 lg:order-1"
          >
            {/* Desktop: Full heading and intro */}
            <div className="hidden lg:block">
              <h2
                id="about-heading-desktop"
                className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 text-white"
              >
                <TextGenerateEffect
                  words="Immerse Yourself in Nature's Luxury"
                  className="text-white"
                />
              </h2>

              <div className="space-y-6 text-emerald-50">
                <p className="text-xl lg:text-2xl leading-relaxed font-light">
                  Our geodesic dome glamping experiences offer the perfect balance of adventure and comfort.
                  Wake up to stunning East Texas sunrises, fall asleep under star-filled skies, and connect
                  with nature without sacrificing modern luxuries.
                </p>

                <p className="text-lg lg:text-xl leading-relaxed opacity-90 font-light">
                  Located in the heart of the Big Thicket region near Kountze, Texas, our luxury domes
                  provide an unparalleled glamping experience just minutes from Houston.
                </p>
              </div>
            </div>

            {/* Mobile: Second paragraph only (shows after images) */}
            <div className="lg:hidden space-y-6 text-emerald-50 mb-8">
              <p className="text-lg leading-relaxed opacity-90 font-light">
                Located in the heart of the Big Thicket region near Kountze, Texas, our luxury domes
                provide an unparalleled glamping experience just minutes from Houston.
              </p>
            </div>

            {/* Enhanced Features Card */}
            <div className="mt-10 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-emerald-600/30">
              <h3 className="font-bold text-2xl mb-8 text-white">
                Experience Luxury Glamping With:
              </h3>

              <ul className="space-y-5" role="list">
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
                      className="text-emerald-300 mr-4 mt-1 text-xl transition-transform group-hover:scale-110"
                      aria-hidden="true"
                      role="img"
                    >
                      {feature.icon}
                    </span>
                    <span className="text-emerald-50 text-lg leading-relaxed">
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Call to Action - Opening Soon */}
            {/* <div className="mt-10">
              <span
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-lg rounded-xl shadow-xl cursor-default"
                aria-label="The Glamping Spot is opening soon"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Opening Soon - Stay Tuned!
              </span>
            </div> */}
          </motion.div>

          {/* Optimized Image Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4 order-1 lg:order-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {showcaseImages.map((image, index) => (
              <motion.div
                key={image.src}
                className={`relative group ${index === 0 ? 'col-span-2' : ''}`}
              >
                <div className={`relative ${index === 0 ? 'h-64 lg:h-80' : 'h-48 lg:h-64'} rounded-2xl overflow-hidden shadow-xl`}>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-all duration-300" />

                  {/* Image caption overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium drop-shadow-lg">
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
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
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
              className="text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-emerald-600/30 hover:bg-white/15 hover:border-emerald-500/50 transition-all duration-300 group"
            >
              <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300" role="img" aria-label={feature.title}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-emerald-50 text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}