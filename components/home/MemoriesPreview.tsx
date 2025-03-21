'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
import { BackgroundGradient } from '../ui/background-gradient';

export default function MemoriesPreview() {
  return (
    <>
 {/* Memories Preview Section */}
        <section className="py-16 bg-black text-white" aria-labelledby="memories-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <BackgroundGradient className="inline-block p-[4px] mb-4 rounded-xl">
              <div className="bg-white dark:bg-gray-950 rounded-lg px-4 py-2">
                <h2 className="text-3xl font-bold text-gray-900">Adventure Memories</h2>
              </div>
            </BackgroundGradient>
            <p className="mt-4 text-xl text-gray-200">
              Real moments from real guests enjoying extraordinary experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Memory cards with 3D effect */}
            <CardContainer className="w-full">
              <CardBody className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="relative aspect-square">
                  <Image
                    src="/images/memories/group-birds.jpg"
                    alt="Group of visitors with colorful birds"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  />
                </div>
                <CardItem translateZ="30" className="p-4">
                <h3 className="font-lg text-emerald-600">Tropical Bird Sanctuary</h3>
                  <p className="text-sm text-gray-200">Costa Rica</p>
                </CardItem>
              </CardBody>
            </CardContainer>
            
            <CardContainer className="w-full">
              <CardBody className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="relative aspect-square">
                  <Image
                    src="/images/memories/atv-jungle.jpg"
                    alt="Person riding ATV through jungle trail"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  />
                </div>
                <CardItem translateZ="30" className="p-4">
                <h3 className="font-lg text-emerald-600">Jungle ATV Adventure</h3>
                  <p className="text-sm text-gray-200">Riviera Maya, Mexico</p>
                </CardItem>
              </CardBody>
            </CardContainer>
            
            <CardContainer className="w-full">
              <CardBody className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="relative aspect-square">
                  <Image
                    src="/images/memories/video-thumbnail.jpg"
                    alt="Video thumbnail"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white bg-opacity-75 rounded-full flex items-center justify-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-8 w-8 text-emerald-600" 
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
                <CardItem translateZ="30" className="p-4">
                  <h3 className="font-lg text-emerald-600">Glamping Experiences</h3>
                  <p className="text-sm text-gray-200">Guest Video Highlights</p>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
          
          <div className="text-center">
            <Link 
              href="/memories" 
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
            >
              View All Memories
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      </>
  );
}