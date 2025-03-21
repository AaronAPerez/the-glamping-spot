import React from 'react';
import MemoriesSection from '@/components/home/MemoriesSection';
import Link from 'next/link';
import HeroVideo from '@/components/layout/HeaderVideo';

/**
 * Dedicated page for showcasing guest memories and experiences
 */
export default function MemoriesPage() {
  // Example memories data - in a real app, this would come from a database or API
  const memoriesData = [
    {
      id: 'memory-1',
      type: 'image' as const,
      src: '/images/memories/group-birds.jpg',
      alt: 'Group of visitors with colorful birds',
      title: 'Tropical Bird Sanctuary Visit',
      description: 'Our guests enjoyed a day at the local bird sanctuary, where they got up close with beautiful tropical birds.',
      location: 'Costa Rica',
      date: 'March 2023'
    },
    {
      id: 'memory-2',
      type: 'image' as const,
      src: '/images/memories/atv-jungle.jpg',
      alt: 'Person riding ATV through jungle trail',
      title: 'Jungle ATV Adventure',
      description: 'Exploring the jungle trails via ATV is one of the most popular activities among our adventurous guests.',
      location: 'Riviera Maya, Mexico',
      date: 'July 2023'
    },
    {
      id: 'memory-3',
      type: 'image' as const,
      src: '/images/memories/atv-action.jpg',
      alt: 'ATV adventure through forest path',
      title: 'Off-Road Excitement',
      description: 'Taking on challenging terrain and experiencing the thrill of off-road driving through beautiful natural landscapes.',
      location: 'Riviera Maya, Mexico',
      date: 'July 2023'
    },
    {
        id: 'memory-4',
        type: 'video' as const,
        src: '/videos/glamping-adventure.mp4',
        thumbnail: '/images/memories/video-thumbnail.jpg',
      alt: 'Video of glamping experience',
      title: 'A Day in Glamping Paradise',
      description: 'Experience the perfect blend of luxury and nature in this video tour of our premium glamping accommodations.',
      location: 'Multiple Locations',
      date: 'Seasonal Highlights'
    },
    {
      id: 'memory-5',
      type: 'image' as const,
      src: '/images/MorningCoffee.jpg',
      alt: 'Enjoying morning coffee with a view',
      title: 'Morning Coffee with a View',
      description: 'There\'s nothing like waking up to breathtaking views with a hot cup of locally-sourced coffee.',
      location: 'Colorado Mountains',
      date: 'September 2023'
    },
    {
      id: 'memory-6',
      type: 'image' as const,
      src: '/images/treehouse.jpg',
      alt: 'Treehouse accommodation',
      title: 'Life Among the Trees',
      description: 'Our treehouse accommodations offer a unique perspective and connection with nature.',
      location: 'Pacific Northwest',
      date: 'August 2023'
    }
  ];

  return (
    <div className=" min-h-screen pt-10">
      {/* Navigation link */}
      <div className="pt-8 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center text-emerald-600 hover:text-emerald-800"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Hero Section with Video Background */}
      <div className="bg-black pb-8">
      <HeroVideo
        height="h-[60vh]"
        title="Adventure Memories"
        subtitle="Explore unforgettable experiences shared by our guests during their stays at The Glamping Spot"
      />
      </div>

      {/* Memories Gallery */}
      <MemoriesSection 
        memories={memoriesData}
        title="Guest Adventures"
        subtitle="Real moments from real guests enjoying nature, adventure, and relaxation"
      />
      
      {/* Share Your Memory CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Share Your Memories</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Had an amazing time at one of our locations? We&apos;d love to see your photos and videos!
          Share your memories with us and you might be featured on our website.
        </p>
        <a 
          href="mailto:memories@theglampingspot.com?subject=My%20Glamping%20Memory" 
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-8 rounded-md text-lg font-medium transition duration-150"
        >
          Submit Your Memory
        </a>
      </div>
    </div>
  );
}