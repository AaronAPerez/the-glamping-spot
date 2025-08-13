import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Lazy load non-critical components for better performance
const MotionDiv = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.div })), {
  loading: () => <div className="opacity-0" />
});

// Enhanced SEO Metadata with comprehensive optimization
export const metadata: Metadata = {
  title: 'About The Glamping Spot | Our Story & Sustainable Luxury Mission',
  description: 'Learn about The Glamping Spot\'s passion for providing unique, luxurious geodesic dome glamping experiences that connect you with nature while promoting sustainable tourism in East Texas.',
  keywords: [
    'about glamping spot',
    'glamping company story',
    'sustainable luxury camping',
    'geodesic dome creators',
    'eco-friendly glamping texas',
    'luxury outdoor experiences',
    'nature retreat philosophy',
    'responsible tourism texas',
    'team behind glamping spot',
    'sustainable accommodation texas'
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
        url: '/images/about/team-hero.webp',
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
    images: ['/images/about/team-hero.webp']
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
 * Optimized team member component with accessibility improvements
 */
interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks?: {
    linkedin?: string;
    email?: string;
  };
}

const TeamMemberCard: React.FC<{ member: TeamMember; index: number }> = ({ member, index }) => (
  <article 
    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus-within:ring-2 focus-within:ring-emerald-500"
    aria-labelledby={`team-member-${member.id}`}
  >
    <div className="relative h-64">
      <Image
        src={member.image}
        alt={`${member.name}, ${member.role} at The Glamping Spot`}
        fill
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="transition-transform duration-300 hover:scale-105"
        quality={80}
        loading={index < 3 ? "eager" : "lazy"}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
    </div>
    <div className="p-6">
      <h3 id={`team-member-${member.id}`} className="text-xl font-semibold text-gray-900 mb-1">
        {member.name}
      </h3>
      <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
      <p className="text-gray-700 leading-relaxed">{member.bio}</p>
      
      {member.socialLinks && (
        <div className="mt-4 flex gap-3">
          {member.socialLinks.linkedin && (
            <a
              href={member.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
              aria-label={`View ${member.name}'s LinkedIn profile`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
              </svg>
            </a>
          )}
          {member.socialLinks.email && (
            <a
              href={`mailto:${member.socialLinks.email}`}
              className="text-gray-400 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
              aria-label={`Send email to ${member.name}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          )}
        </div>
      )}
    </div>
  </article>
);

/**
 * Main About page component with performance and accessibility optimizations
 */
export default function AboutPage() {
  // Enhanced team members data with proper accessibility descriptions
  const teamMembers: TeamMember[] = [
    {
      id: 'ivann-rocha',
      name: 'Ivann G Rocha',
      role: 'Founder & CEO',
      bio: 'Passionate adventurer and nature enthusiast who founded The Glamping Spot to redefine outdoor experiences through sustainable luxury accommodations. With over 15 years in hospitality, Ivann brings a vision of connecting people with nature.',
      image: '/images/TheGlampingSpot_W.png',
      // image: '/images/team/ivann-rocha.webp',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/ivann-rocha',
        email: 'ivann@theglampingspot.com'
      }
    },
    {
      id: 'andrew-perez',
      name: 'Andrew Perez',
      role: 'Head of Guest Experience',
      bio: 'Dedicated to ensuring every guest has an unforgettable and comfortable stay. Andrew oversees all aspects of guest services, from arrival to departure, ensuring exceptional experiences that exceed expectations.',
      image: '/images/TheGlampingSpot_W.png',
      // image: '/images/team/andrew-perez.webp',
      socialLinks: {
        email: 'andrew@theglampingspot.com'
      }
    },
    {
      id: 'aaron-perez',
      name: 'Aaron Perez',
      role: 'Sustainability Director',
      bio: 'Leading our efforts to minimize environmental impact and promote responsible tourism. Aaron ensures all operations align with our commitment to preserving the natural beauty of East Texas for future generations.',
      image: '/images/TheGlampingSpot_W.png',
      // image: '/images/team/aaron-perez.webp',
      socialLinks: {
        email: 'aaron@theglampingspot.com'
      }
    }
  ];

  // Optimized gallery images with proper alt text
  const galleryImages = [
    {
      src: '/images/MorningCoffee.jpg',
      // src: '/images/about/morning-coffee-optimized.webp',
      alt: 'Guest enjoying morning coffee with panoramic East Texas landscape view from geodesic dome deck',
      title: 'Morning Moments'
    },
    {
      src: '/images/stars1.jpg',
      // src: '/images/about/stargazing-dome-optimized.webp',
      alt: 'Stunning night sky view through transparent geodesic dome ceiling perfect for stargazing',
      title: 'Stargazing Experience'
    },
    {
      src: '/images/dining.jpg',
      // src: '/images/about/luxury-dining-optimized.webp',
      alt: 'Elegant dining setup inside luxury geodesic dome with modern amenities and natural lighting',
      title: 'Luxury Amenities'
    },
    {
      src: '/images/bathroom.jpg',
      // src: '/images/about/nature-connection-optimized.webp',
      alt: 'Guests connecting with nature while enjoying premium comfort at The Glamping Spot',
      title: 'Nature Connection'
    }
  ];

  return (
    <div className="bg-white">
      {/* Skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>

      {/* Optimized Hero Section with proper heading hierarchy */}
      <header className="relative bg-emerald-800 text-white py-24 pt-28 pb-28">
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
          <div className="absolute inset-0 bg-emerald-800/70" aria-hidden="true"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
        <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="mission-heading">
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
                    text: 'Educational programs about local ecosystems and conservation efforts',
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
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <h3 className="text-lg font-semibold text-emerald-800 mb-3">
                  Our Sustainability Commitment
                </h3>
                <p className="text-emerald-700 leading-relaxed">
                  We are committed to carbon-neutral operations by 2025, using renewable energy sources, 
                  implementing waste reduction programs, and partnering with local conservation organizations 
                  to protect the Big Thicket ecosystem.
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

        {/* Enhanced Team Section */}
        <section className="bg-gray-50 py-16" aria-labelledby="team-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="team-heading" className="text-3xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Meet the passionate individuals behind The Glamping Spot, dedicated to creating 
                unforgettable outdoor experiences while preserving the natural beauty of East Texas.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <TeamMemberCard 
                  key={member.id} 
                  member={member} 
                  index={index}
                />
              ))}
            </div>

            {/* Company values */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Sustainability First',
                  description: 'Every decision we make considers environmental impact and long-term sustainability.',
                  icon: '🌍'
                },
                {
                  title: 'Guest Excellence',
                  description: 'We strive to exceed expectations through personalized service and attention to detail.',
                  icon: '✨'
                },
                {
                  title: 'Community Partnership',
                  description: 'We actively support local communities and conservation efforts in East Texas.',
                  icon: '🤝'
                }
              ].map((value, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md">
                  <div className="text-4xl mb-4" role="img" aria-label={value.title}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards and Recognition Section */}
        {/* <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="awards-heading">
          <div className="text-center mb-12">
            <h2 id="awards-heading" className="text-3xl font-bold text-gray-900 mb-4">
              Awards & Recognition
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're honored to be recognized for our commitment to sustainable luxury and exceptional guest experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                award: 'Best Sustainable Accommodation',
                organization: 'Texas Tourism Board',
                year: '2024',
                description: 'Recognized for innovative eco-friendly practices'
              },
              {
                award: 'Excellence in Hospitality',
                organization: 'East Texas Chamber',
                year: '2024',
                description: 'Outstanding guest service and community impact'
              },
              {
                award: 'Green Business Certification',
                organization: 'Environmental Alliance',
                year: '2023',
                description: 'Carbon-neutral operations and conservation efforts'
              },
              {
                award: 'Top Glamping Destination',
                organization: 'Travel & Leisure',
                year: '2023',
                description: 'Featured as premier luxury camping experience'
              }
            ].map((recognition, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{recognition.award}</h3>
                <p className="text-emerald-600 font-medium mb-1">{recognition.organization}</p>
                <p className="text-gray-500 text-sm mb-3">{recognition.year}</p>
                <p className="text-gray-600 text-sm">{recognition.description}</p>
              </div>
            ))}
          </div>
        </section> */}

        {/* Enhanced CTA Section with accessibility improvements */}
        <section className="bg-gradient-to-r from-emerald-700 to-emerald-800 text-white py-16" aria-labelledby="cta-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 id="cta-heading" className="text-3xl font-bold mb-6">
                  Ready to Experience Nature Differently?
                </h2>
                <p className="text-xl mb-6 text-emerald-100 leading-relaxed">
                  Join us in our mission to create meaningful, sustainable outdoor experiences that connect you 
                  with the natural beauty of East Texas while supporting local conservation efforts.
                </p>
                
                {/* Key statistics */}
                {/* <div className="grid grid-cols-2 gap-6 mb-8">
                  {[
                    { number: '500+', label: 'Happy Guests' },
                    { number: '50+', label: 'Local Partnerships' },
                    { number: '95%', label: 'Satisfaction Rate' },
                    { number: '3', label: 'Awards Won' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-white">{stat.number}</div>
                      <div className="text-emerald-200 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div> */}
              </div>

              <div className="text-center lg:text-right">
                <div className="flex flex-col sm:flex-row lg:flex-col gap-4 justify-center lg:justify-end">
                  <Link 
                    href="/properties" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-700 hover:bg-emerald-50 font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-emerald-700"
                    aria-label="Explore our geodesic dome properties"
                  >
                    <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    View Properties
                  </Link>
                  
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-emerald-700 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-emerald-700"
                    aria-label="Contact us to learn more about The Glamping Spot"
                  >
                    <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Us
                  </Link>
                </div>

                {/* Contact information */}
                <div className="mt-8 pt-6 border-t border-emerald-600">
                  <p className="text-emerald-200 mb-4">
                    Questions about our story or sustainability practices?
                  </p>
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2 justify-center lg:justify-end text-sm">
                    <a 
                      href="tel:+1234567890"
                      className="text-white hover:text-emerald-200 transition-colors focus:outline-none focus:underline"
                      aria-label="Call us at 123-456-7890"
                    >
                      📞 (123) 456-7890
                    </a>
                    <a 
                      href="mailto:info@theglampingspot.com"
                      className="text-white hover:text-emerald-200 transition-colors focus:outline-none focus:underline"
                      aria-label="Email us at info@theglampingspot.com"
                    >
                      ✉️ info@theglampingspot.com
                    </a>
                  </div>
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
                  answer: "We implement comprehensive sustainability practices including solar power systems, water conservation measures, waste reduction programs, and partnerships with local conservation organizations. We're committed to achieving carbon-neutral operations by 2025."
                },
                {
                  question: "What makes your geodesic domes unique?",
                  answer: "Our geodesic domes are architecturally designed for optimal views and minimal environmental impact. They feature transparent ceilings for stargazing, premium amenities, and are positioned to maximize privacy while showcasing the natural beauty of our East Texas location."
                },
                {
                  question: "How do you support the local community?",
                  answer: "We partner with local businesses for supplies and services, employ local staff, support conservation efforts in the Big Thicket region, and donate a portion of our profits to local environmental and community organizations."
                }
              ].map((faq, index) => (
                <details key={index} className="group bg-white rounded-lg shadow-sm border border-gray-200">
                  <summary className="flex justify-between items-center cursor-pointer py-4 px-6 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset">
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

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "The Glamping Spot",
            "description": "Sustainable luxury glamping experiences in geodesic domes in East Texas",
            "url": "https://theglampingspot.com/about",
            "logo": "https://theglampingspot.com/images/TheGlampingSpot_W.png",
            "foundingDate": "2022",
            "founders": [
              {
                "@type": "Person",
                "name": "Ivann G Rocha",
                "jobTitle": "Founder & CEO"
              }
            ],
            "employee": teamMembers.map(member => ({
              "@type": "Person",
              "name": member.name,
              "jobTitle": member.role
            })),
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kountze",
              "addressRegion": "TX",
              "addressCountry": "US"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-123-456-7890",
              "contactType": "customer service"
            },
            "sameAs": [
              "https://www.facebook.com/theglampingspot",
              "https://www.instagram.com/theglampingspot"
            ],
            "award": [
              "Best Sustainable Accommodation - Texas Tourism Board 2024",
              "Excellence in Hospitality - East Texas Chamber 2024",
              "Green Business Certification - Environmental Alliance 2023",
              "Top Glamping Destination - Travel & Leisure 2023"
            ]
          })
        }}
      />
    </div>
  );
}