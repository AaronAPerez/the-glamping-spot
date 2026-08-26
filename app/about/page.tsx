import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';


// Lazy load non-critical components for better performance
const MotionDiv = dynamic(() => import('@/components/ui/MotionDiv'), {
  loading: () => <div className="opacity-0" />
});

// Enhanced SEO Metadata with comprehensive optimization
export const metadata: Metadata = {
  title: 'About The Glamping Spot | Our Story & Sustainable Luxury Mission',
  description: 'Learn about The Glamping Spot\'s passion for providing unique, luxurious geodesic dome glamping experiences that connect you with nature while promoting sustainable tourism in East Texas.',
  keywords: [
    'glamping texas',
    'about glamping spot',
    'glamping company story',
    'sustainable luxury camping',
    'geodesic dome creators',
    'eco-friendly glamping texas',
    'luxury outdoor experiences',
    'nature retreat philosophy',
    'responsible tourism texas',
    'team behind glamping spot',
    'sustainable accommodation texas',
    'east texas glamping story',
    'kountze texas glamping'
  ].join(', '),
  authors: [{ name: 'The Glamping Spot Team' }],
  creator: 'The Glamping Spot',
  publisher: 'The Glamping Spot',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/about',
    siteName: 'The Glamping Spot',
    title: 'About The Glamping Spot | Our Story & Sustainable Luxury Mission',
    description: 'Discover the story behind The Glamping Spot and our mission to provide sustainable luxury glamping experiences in East Texas.',
    images: [
      {
        url: '/images/about/team-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'The Glamping Spot team with geodesic domes in East Texas'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@theglampingspot',
    creator: '@theglampingspot',
    title: 'About The Glamping Spot | Our Story & Mission',
    description: 'Learn about our passion for sustainable luxury glamping in East Texas.',
    images: ['/images/about/team-hero.jpg']
  },
  alternates: {
    canonical: '/about'
  }
};

/**
 * Loading skeleton component for better perceived performance
 */
const ImageSkeleton = () => (
  <div className="animate-pulse bg-gray-200 rounded-xl h-full" role="status" aria-label="Loading image">
    <span className="sr-only">Loading...</span>
  </div>
);


/**
 * Main About page component with performance and accessibility optimizations
 */
export default function AboutPage() {

  // Optimized gallery images with proper alt text
  const galleryImages = [
    {
      src: '/images/dome/deck-table-wooden-deck-pine-forest-view.webp',
      alt: 'The dome deck in daylight, looking out over the East Texas pines',
      title: 'Morning Moments'
    },
    {
      src: '/images/dome/glamping-dome-aerial-view-clearing.avif',
      alt: 'Stunning night sky view through transparent geodesic dome ceiling perfect for stargazing',
      title: 'Stargazing Experience'
    },
    {
      src: '/images/dome/dome-interior-living-dining-kitchenette.avif',
      alt: 'Elegant living space inside luxury geodesic dome with modern amenities and natural lighting',
      title: 'Luxury Amenities'
    },
    {
      src: '/images/dome/dome-bathroom-rustic-vanity-sink.avif',
      alt: 'Guests connecting with nature while enjoying premium comfort at The Glamping Spot',
      title: 'Nature Connection'
    }
  ];

  return (
    <div className="bg-white">
      {/* Skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-600 focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>

      {/* Optimized Hero Section with proper heading hierarchy */}
      <header className="relative bg-brand-800 text-white py-24 pt-[calc(var(--header-height)+1rem)] pb-28">
        <div className="absolute inset-0">
          <Image
            src="/images/experiences/group-birds.jpg"
            alt="The Glamping Spot team and geodesic domes in beautiful East Texas landscape"
            fill
            style={{ objectFit: 'cover' }}
            quality={85}
            priority
            sizes="100vw"
            className="opacity-60"
          />
          <div className="absolute inset-0 bg-brand-800/70" aria-hidden="true"></div>
        </div>
        
        <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Founded with a vision to reconnect people with nature through luxurious, 
            thoughtfully designed outdoor experiences that honor and preserve the natural beauty of East Texas.
          </p>
        </div>
      </header>

      {/* Main content with enhanced semantics */}
      <main id="main-content">
        {/* Mission Section with improved accessibility */}
        <section className="max-w-8xl mx-auto py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="mission-heading">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="mission-heading" className="text-3xl font-bold mb-6 text-gray-900">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                At The Glamping Spot, we believe that extraordinary experiences happen when luxury meets nature. 
                Our mission is to provide unique, sustainable glamping experiences that allow guests to connect 
                deeply with the natural world without sacrificing comfort or convenience.
              </p>
              
              {/* Enhanced list with better accessibility */}
              <ul className="space-y-4 text-gray-700 mb-8" role="list">
                {[
                  {
                    text: 'Sustainable and eco-friendly accommodations that minimize environmental impact',
                    icon: '🌱'
                  },
                  {
                    text: 'Unique geodesic dome properties in breathtaking East Texas locations',
                    icon: '🏠'
                  },
                  {
                    text: 'Premium amenities and exceptional guest experiences that exceed expectations',
                    icon: '⭐'
                  },
                  {
                    text: 'A genuine appreciation for the Big Thicket ecosystem and the wildlife around us',
                    icon: '📚'
                  },
                  {
                    text: 'Support for local communities and responsible tourism practices',
                    icon: '🤝'
                  }
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span 
                      className="text-2xl mr-4 mt-1 flex-shrink-0" 
                      role="img" 
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                    <span className="leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>

              {/* Sustainability commitment */}
              <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
                <h3 className="text-lg font-semibold text-brand-800 mb-3">
                  Our Sustainability Commitment
                </h3>
                <p className="text-brand-700 leading-relaxed">
                  We're mindful of our environmental footprint and built our dome to sit lightly on the
                  land, preserving the Big Thicket ecosystem that makes this place special.
                </p>
              </div>
            </div>

            {/* Optimized image gallery with lazy loading */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {galleryImages.map((image, index) => (
                  <Suspense key={image.src} fallback={<ImageSkeleton />}>
                    <div className={`relative h-48 lg:h-64 rounded-xl overflow-hidden shadow-lg ${index % 2 === 1 ? 'mt-8' : ''}`}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                        className="transition-transform duration-300 hover:scale-105"
                        quality={80}
                        loading={index < 2 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                        <div className="absolute bottom-3 left-3">
                          <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
                            {image.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Suspense>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section with accessibility improvements */}
        <section className="bg-gradient-to-r from-brand-700 to-brand-800 text-white py-16 mt-12" aria-labelledby="cta-heading">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 id="cta-heading" className="text-3xl font-bold mb-6">
                  Ready to Experience Nature Differently?
                </h2>
                <p className="text-xl mb-6 text-brand-100 leading-relaxed">
                  Join us in our mission to create meaningful, sustainable outdoor experiences that connect you 
                  with the natural beauty of East Texas while supporting local conservation efforts.
                </p>
              </div>

              <div className="text-center lg:text-right">
                <div className="flex flex-col sm:flex-row lg:flex-col gap-4 justify-center lg:justify-end">
                  <Link 
                    href="/properties" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-700 hover:bg-brand-50 font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2 focus:ring-offset-brand-700"
                    aria-label="Explore our geodesic dome properties"
                  >
                    <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    View Properties
                  </Link>
                  
                  <a
                    href="https://www.airbnb.com/rooms/1461278647776104058"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-brand-700 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2 focus:ring-offset-brand-700"
                    aria-label="Message us on Airbnb — opens in a new tab"
                  >
                    <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Message Us on Airbnb
                  </a>
                </div>

                {/* Contact information */}
                <div className="mt-8 pt-6 border-t border-brand-600">
                  <p className="text-brand-200">
                    Questions about our story or sustainability practices? Message us directly through Airbnb.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section for About page */}
        <section className="py-16 bg-gray-50" aria-labelledby="about-faq-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="about-faq-heading" className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions About Us
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  question: "What inspired the founding of The Glamping Spot?",
                  answer: "The Glamping Spot was founded from a passion for the outdoors and a desire to make nature accessible to everyone without sacrificing comfort. We wanted to create a sustainable way for people to disconnect from daily stress and reconnect with the natural beauty of East Texas."
                },
                {
                  question: "How do you ensure sustainability in your operations?",
                  answer: "We're mindful of our environmental footprint and designed the property to minimize impact on the surrounding Big Thicket ecosystem, one of the most biodiverse regions in the country."
                },
                {
                  question: "What makes your geodesic domes unique?",
                  answer: "Our geodesic domes are architecturally designed for optimal views and minimal environmental impact. They feature transparent ceilings for stargazing, premium amenities, and are positioned to maximize privacy while showcasing the natural beauty of our East Texas location."
                },
                {
                  question: "How do you support the local community?",
                  answer: "We're proud to be part of the Kountze and East Texas community, and we point guests toward local businesses, restaurants, and attractions throughout their stay."
                }
              ].map((faq, index) => (
                <details key={index} className="group bg-white rounded-lg shadow-sm border border-gray-200">
                  <summary className="flex justify-between items-center cursor-pointer py-4 px-6 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-inset">
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}