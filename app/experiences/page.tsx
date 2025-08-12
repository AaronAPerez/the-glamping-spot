import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import ExperiencesSection from '@/components/home/ExperiencesSection';


/**
 * Enhanced SEO metadata for experiences page
 */
export const metadata: Metadata = {
  title: 'Guest Experiences & Adventures | The Glamping Spot',
  description: 'Discover unforgettable experiences shared by guests during their geodesic dome glamping stays. See real adventures, activities, and memories from The Glamping Spot near Houston, Texas.',
  keywords: [
    'glamping experiences',
    'texas outdoor adventures',
    'geodesic dome experiences',
    'glamping activities texas',
    'houston area adventures',
    'big thicket experiences',
    'luxury camping memories',
    'texas nature activities'
  ].join(', '),
  openGraph: {
    title: 'Guest Experiences & Adventures | The Glamping Spot',
    description: 'See real adventures and memories from guests at our luxury geodesic dome glamping site near Houston, Texas.',
    images: [
      {
        url: '/images/experiences/group-birds.jpg',
        width: 1200,
        height: 630,
        alt: 'Guests enjoying bird sanctuary visit during glamping experience'
      }
    ]
  },
  alternates: {
    canonical: '/experiences'
  }
};

/**
 * Dedicated page for showcasing guest experiences with enhanced accessibility and SEO
 */
export default function ExperiencesPage() {
  // Enhanced experiences data with better accessibility descriptions
  const experiencesData = [
    {
      id: 'experience-1',
      type: 'image' as const,
      src: '/images/experiences/group-birds.jpg',
      alt: 'Group of visitors interacting with colorful tropical birds at local sanctuary during glamping excursion',
      title: 'Tropical Bird Sanctuary Adventure',
      description: 'Our guests enjoyed an unforgettable day at the local bird sanctuary, where they got up close with beautiful tropical birds and learned about wildlife conservation efforts in the region.',
      location: 'Local Wildlife Sanctuary, East Texas',
      date: 'Spring 2024'
    },
    {
      id: 'experience-2',
      type: 'image' as const,
      src: '/images/experiences/atv-jungle.jpg',
      alt: 'Guest riding ATV through scenic forest trail near The Glamping Spot',
      title: 'Thrilling ATV Forest Adventure',
      description: 'Exploring the rugged forest trails via ATV is one of the most popular activities among our adventurous guests, offering an exciting way to experience East Texas wilderness.',
      location: 'Big Thicket Region, Texas',
      date: 'Summer 2024'
    },
    {
      id: 'experience-3',
      type: 'image' as const,
      src: '/images/experiences/atv-action.jpg',
      alt: 'ATV adventure through challenging forest terrain with scenic natural backdrop',
      title: 'Off-Road Excitement & Natural Beauty',
      description: 'Taking on challenging terrain while experiencing the thrill of off-road driving through beautiful natural landscapes surrounding our geodesic dome glamping site.',
      location: 'East Texas Trail System',
      date: 'Summer 2024'
    },
    {
      id: 'experience-4',
      type: 'video' as const,
      src: '/videos/glamping-adventure.mp4',
      thumbnail: '/images/experiences/video-thumbnail.jpg',
      alt: 'Video showcase of complete glamping experience at The Glamping Spot geodesic domes',
      title: 'A Day in Geodesic Dome Paradise',
      description: 'Experience the perfect blend of luxury and nature in this comprehensive video tour of our premium geodesic dome accommodations and surrounding activities.',
      location: 'The Glamping Spot, Kountze, Texas',
      date: 'Seasonal Highlights 2024'
    },
    {
      id: 'experience-5',
      type: 'image' as const,
      src: '/images/MorningCoffee.jpg',
      alt: 'Guest enjoying morning coffee with panoramic East Texas landscape view from geodesic dome deck',
      title: 'Morning Coffee with Breathtaking Views',
      description: 'There\'s nothing like waking up to breathtaking East Texas sunrise views with a hot cup of locally-sourced coffee from the comfort of your geodesic dome.',
      location: 'The Glamping Spot, East Texas',
      date: 'Year-Round Experience'
    },
    {
      id: 'experience-6',
      type: 'image' as const,
      src: '/images/treehouse.jpg',
      alt: 'Unique treehouse accommodation nestled among towering trees',
      title: 'Elevated Life Among the Trees',
      description: 'Our treehouse accommodations offer a unique elevated perspective and deeper connection with nature, providing an alternative luxury glamping experience.',
      location: 'Forest Canopy Location',
      date: 'Seasonal Availability'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Skip to main content for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>

      {/* Breadcrumb navigation */}
      <nav 
        className="pt-28 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link 
              href="/" 
              className="text-emerald-600 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
              aria-label="Return to homepage"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-gray-400">/</li>
          <li className="text-gray-600 font-medium" aria-current="page">
            Guest Experiences
          </li>
        </ol>
      </nav>

      {/* Enhanced hero section */}
      <header className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Guest Adventures & Experiences
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Explore unforgettable experiences shared by our guests during their stays at 
            The Glamping Spot's luxury geodesic dome accommodations in East Texas
          </p>
        </div>
      </header>

      {/* Main content */}
      <main id="main-content">
        {/* Experiences gallery with enhanced accessibility */}
        <ExperiencesSection 
          experiences={experiencesData}
          title="Real Guest Adventures"
          subtitle="Authentic moments captured by real guests enjoying nature, adventure, and relaxation at our geodesic dome glamping site"
        />
        
        {/* Enhanced share your experience CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="share-cta-heading">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <h2 id="share-cta-heading" className="text-3xl font-bold text-gray-900 mb-6">
              Share Your Glamping Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Had an amazing time at our geodesic dome glamping site? We&apos;d love to see your photos, 
              videos, and hear about your adventures! Share your experiences with us and you might be 
              featured on our website and social media.
            </p>
            
            {/* Multiple sharing options */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:experiences@theglampingspot.com?subject=My%20Glamping%20Experience%20at%20The%20Glamping%20Spot" 
                className="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                aria-label="Email us your glamping experience photos and stories"
              >
                <svg 
                  className="mr-3 h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
                Email Your Experience
              </a>
              
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                aria-label="Contact us about sharing your experience"
              >
                Contact Us
              </Link>
            </div>

            {/* Social media sharing encouragement */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-4">
                Tag us on social media for a chance to be featured:
              </p>
              <div className="flex justify-center items-center space-x-6">
                <span className="text-emerald-600 font-semibold">#TheGlampingSpot</span>
                <span className="text-emerald-600 font-semibold">#GeodesicDomeGlamping</span>
                <span className="text-emerald-600 font-semibold">#EastTexasAdventure</span>
              </div>
            </div>
          </div>
        </section>

        {/* Additional CTA for booking */}
        <section className="bg-emerald-50 py-16" aria-labelledby="booking-cta-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="booking-cta-heading" className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Create Your Own Adventure?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Book your geodesic dome glamping experience and start creating memories that will last a lifetime.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Book your geodesic dome glamping experience now"
            >
              <svg 
                className="mr-3 h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              Book Your Stay
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}