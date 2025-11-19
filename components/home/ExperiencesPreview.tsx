'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import { BackgroundGradient } from '../ui/BackgroundGradient';

export default function ExperiencesPreview() {
  return (
    <>
      {/* Experiences Preview Section - Cinematic Film Strip Design */}
      <section className="relative py-20 sm:py-24 overflow-hidden bg-gradient-to-b from-slate-900 to-black" aria-labelledby="memories-heading">
        {/* Backdrop blur overlay effect */}
        <div className="absolute inset-0 bg-[url('/images/projector.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 backdrop-blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Film strip header */}
          <div className="text-center mb-16">
            <div className="inline-block relative">
              <h2 id="memories-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
                Adventure Memories
              </h2>
              <div className="absolute -top-2 -left-4 w-3 h-3 bg-amber-500 rounded-full opacity-70"></div>
              <div className="absolute -top-2 -right-4 w-3 h-3 bg-amber-500 rounded-full opacity-70"></div>
            </div>
            <p className="mt-6 text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              Real moments from real guests enjoying extraordinary experiences
            </p>
          </div>

          {/* Film strip container with perforations */}
          <div className="relative">
            {/* Film strip perforations - left side */}
            <div className="absolute left-0 top-0 bottom-0 w-8 hidden md:flex flex-col justify-around items-center py-8">
              {[...Array(8)].map((_, i) => (
                <div key={`left-${i}`} className="w-4 h-4 border-2 border-amber-500/40 rounded-sm"></div>
              ))}
            </div>

            {/* Film strip perforations - right side */}
            <div className="absolute right-0 top-0 bottom-0 w-8 hidden md:flex flex-col justify-around items-center py-8">
              {[...Array(8)].map((_, i) => (
                <div key={`right-${i}`} className="w-4 h-4 border-2 border-amber-500/40 rounded-sm"></div>
              ))}
            </div>

            {/* Main film strip content */}
            <div className="md:mx-12 bg-gradient-to-b from-slate-800/40 to-slate-900/40 backdrop-blur-md border-y-4 border-amber-500/30 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8">
                {/* Film frame cards */}
                <CardContainer className="w-full">
                  <CardBody className="bg-black/60 backdrop-blur-sm border-2 border-amber-500/20 rounded-lg overflow-hidden shadow-2xl hover:shadow-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
                    {/* Film frame top markers */}
                    <div className="flex gap-2 p-2 bg-amber-500/10">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-amber-500/30 rounded-full"></div>
                      ))}
                    </div>

                    <div className="relative aspect-[4/3] border-y-2 border-amber-500/20">
                      <Image
                        src="/images/experiences/group-birds.jpg"
                        alt="Group of visitors with colorful birds"
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                        className="opacity-90 hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    </div>

                    <CardItem translateZ="30" className="p-5 bg-gradient-to-b from-slate-900/80 to-black/80">
                      <h3 className="font-bold text-lg text-amber-400 mb-1">Tropical Bird Sanctuary</h3>
                      <p className="text-sm text-gray-300">Costa Rica</p>
                    </CardItem>

                    {/* Film frame bottom markers */}
                    <div className="flex gap-2 p-2 bg-amber-500/10">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-amber-500/30 rounded-full"></div>
                      ))}
                    </div>
                  </CardBody>
                </CardContainer>

                <CardContainer className="w-full">
                  <CardBody className="bg-black/60 backdrop-blur-sm border-2 border-amber-500/20 rounded-lg overflow-hidden shadow-2xl hover:shadow-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
                    {/* Film frame top markers */}
                    <div className="flex gap-2 p-2 bg-amber-500/10">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-amber-500/30 rounded-full"></div>
                      ))}
                    </div>

                    <div className="relative aspect-[4/3] border-y-2 border-amber-500/20">
                      <Image
                        src="/images/experiences/atv-jungle.jpg"
                        alt="Person riding ATV through jungle trail"
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                        className="opacity-90 hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    </div>

                    <CardItem translateZ="30" className="p-5 bg-gradient-to-b from-slate-900/80 to-black/80">
                      <h3 className="font-bold text-lg text-amber-400 mb-1">Jungle ATV Adventure</h3>
                      <p className="text-sm text-gray-300">Riviera Maya, Mexico</p>
                    </CardItem>

                    {/* Film frame bottom markers */}
                    <div className="flex gap-2 p-2 bg-amber-500/10">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-amber-500/30 rounded-full"></div>
                      ))}
                    </div>
                  </CardBody>
                </CardContainer>

                <CardContainer className="w-full">
                  <CardBody className="bg-black/60 backdrop-blur-sm border-2 border-amber-500/20 rounded-lg overflow-hidden shadow-2xl hover:shadow-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
                    {/* Film frame top markers */}
                    <div className="flex gap-2 p-2 bg-amber-500/10">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-amber-500/30 rounded-full"></div>
                      ))}
                    </div>

                    <div className="relative aspect-[4/3] border-y-2 border-amber-500/20">
                      <Image
                        src="/images/experiences/video-thumbnail.jpg"
                        alt="Video thumbnail"
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                        className="opacity-90 hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-amber-500/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-xl">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-white ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <CardItem translateZ="30" className="p-5 bg-gradient-to-b from-slate-900/80 to-black/80">
                      <h3 className="font-bold text-lg text-amber-400 mb-1">Glamping Experiences</h3>
                      <p className="text-sm text-gray-300">Guest Video Highlights</p>
                    </CardItem>

                    {/* Film frame bottom markers */}
                    <div className="flex gap-2 p-2 bg-amber-500/10">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-amber-500/30 rounded-full"></div>
                      ))}
                    </div>
                  </CardBody>
                </CardContainer>
              </div>
            </div>
          </div>


          {/* Film reel CTA */}
          <div className="text-center mt-16">
            <Link
              href="/experiences"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-lg rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-500/50 transform hover:-translate-y-1"
            >
              <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              View All Experiences
              <svg className="ml-3 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      </>
  );
}