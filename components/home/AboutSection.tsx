'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TextGenerateEffect } from '../ui/TextGenerateEffect';



export default function AboutSection() {
  return (
    <section className="py-24 bg-emerald-800" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 id="immersive-experience-heading" className="text-4xl font-bold mb-6">
              <TextGenerateEffect words="Immerse Yourself in Nature" />
            </h2>


            <p className="text-lg mb-8 text-emerald-100">
              Our glamping experiences offer the perfect balance of adventure and comfort.
              Wake up to stunning sunrises, fall asleep under star-filled skies, and connect
              with nature without sacrificing modern luxuries.
            </p>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
              <p className="font-medium mb-4">Enjoy your experience with:</p>
              <ul className="space-y-4" aria-label="The Glamping Spot features">
                <li className="flex items-start">

                  <span className="text-emerald-300 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span>Breathtaking locations away from crowds</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-300 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span>Luxury amenities including premium bedding and climate control</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-300 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span>Thoughtfully designed spaces that connect with the environment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-300 mr-3 mt-1" aria-hidden="true">✓</span>
                  <span>Sustainable practices that minimize environmental impact</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              "/images/MorningCoffee.jpg",

              "/images/stars1.jpg",
              "/images/dining.jpg",
              '/images/bathroom.jpg',

            ].map((src, index) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="relative h-48 lg:h-64 rounded-xl overflow-hidden">
                  <Image
                    src={src}
                    alt="Project showcase"
                    fill
                    className="object-cover transition-transform duration-300 
                              group-hover:scale-110"
                  />
                  <div className="absolute inset-0 transition-opacity 
                                 duration-300 group-hover:opacity-0" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}