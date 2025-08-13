import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { LocationMap } from '@/components/contact/LocationMap';
import { FAQSection } from '@/components/contact/FAQSection';

/**
 * Enhanced SEO metadata for contact page with comprehensive optimization
 */
export const metadata: Metadata = {
  title: 'Contact The Glamping Spot | Luxury Geodesic Dome Reservations & Information',
  description: 'Contact The Glamping Spot for luxury geodesic dome reservations, questions, and information. Located in Kountze, Texas near Houston. Call (123) 456-7890 or email us for immediate assistance.',
  keywords: [
    'contact glamping spot',
    'glamping reservations texas',
    'geodesic dome booking',
    'luxury camping contact',
    'glamping questions texas',
    'kountze texas glamping',
    'glamping customer service',
    'dome rental inquiries'
  ].join(', '),
  authors: [{ name: 'The Glamping Spot' }],
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
    url: 'https://theglampingspot.com/contact',
    siteName: 'The Glamping Spot',
    title: 'Contact The Glamping Spot | Luxury Geodesic Dome Reservations',
    description: 'Get in touch with The Glamping Spot for luxury geodesic dome reservations and information in East Texas.',
    images: [
      {
        url: '/images/contact-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact The Glamping Spot for luxury geodesic dome experiences in East Texas'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@theglampingspot',
    creator: '@theglampingspot',
    title: 'Contact The Glamping Spot | Luxury Geodesic Dome Reservations',
    description: 'Get in touch for luxury geodesic dome reservations and information in East Texas.',
    images: ['/images/contact-hero.jpg']
  },
  alternates: {
    canonical: 'https://theglampingspot.com/contact'
  },
  other: {
    "geo.region": "US-TX",
    "geo.placename": "Kountze, Texas",
    "geo.position": "30.3727;-94.3099",
    "ICBM": "30.3727, -94.3099"
  }
};

/**
 * Contact page with enhanced accessibility, SEO, and user experience
 * Implements all Lighthouse performance, accessibility, best practices, and SEO recommendations
 */
export default function ContactPage() {
  // Structured data for local business
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "The Glamping Spot",
    "description": "Luxury geodesic dome glamping experiences in East Texas",
    "url": "https://theglampingspot.com",
    "telephone": "+1-123-456-7890",
    "email": "info@theglampingspot.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Glamping Way",
      "addressLocality": "Kountze",
      "addressRegion": "TX",
      "postalCode": "77625",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.3727",
      "longitude": "-94.3099"
    },
    "openingHours": [
      "Mo-Su 08:00-20:00"
    ],
    "priceRange": "$249-$399",
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Hot Tub"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Stargazing"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Wi-Fi"
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-123-456-7890",
      "contactType": "reservations",
      "availableLanguage": "English"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Skip to main content for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb navigation with enhanced accessibility */}
        <nav 
          className="pt-28 pb-4"
          aria-label="Breadcrumb navigation"
        >
          <ol className="flex items-center space-x-2 text-sm" role="list">
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
              Contact
            </li>
          </ol>
        </nav>

        {/* Enhanced header section */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact The Glamping Spot
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Ready to book your luxury geodesic dome experience? Have questions about our accommodations? 
            We're here to help make your East Texas glamping adventure unforgettable.
          </p>
        </header>

        {/* Main content with enhanced semantics */}
        <main id="main-content">
          {/* Contact methods overview */}
          <section className="mb-16 bg-white rounded-2xl shadow-lg p-8" aria-labelledby="contact-methods-heading">
            <h2 id="contact-methods-heading" className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Get In Touch
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Phone Contact */}
              <div className="text-center p-6 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg 
                    className="w-8 h-8 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Speak directly with our reservations team</p>
                <a 
                  href="tel:+1234567890"
                  className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  aria-label="Call The Glamping Spot at 123-456-7890"
                >
                  (123) 456-7890
                </a>
                <p className="text-sm text-gray-500 mt-2">Daily 8 AM - 8 PM CST</p>
              </div>

              {/* Email Contact */}
              <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg 
                    className="w-8 h-8 text-white" 
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
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">Send us your questions anytime</p>
                <a 
                  href="mailto:info@theglampingspot.com"
                  className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Email The Glamping Spot at info@theglampingspot.com"
                >
                  info@theglampingspot.com
                </a>
                <p className="text-sm text-gray-500 mt-2">Response within 24 hours</p>
              </div>

              {/* Visit Us */}
              <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-200">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg 
                    className="w-8 h-8 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-gray-600 mb-4">Located in beautiful East Texas</p>
                <address className="not-italic text-sm text-gray-700 mb-2">
                  123 Glamping Way<br />
                  Kountze, TX 77625
                </address>
                <p className="text-sm text-gray-500">
                  1 hour from Houston<br />
                  5 minutes from Big Thicket
                </p>
              </div>
            </div>
          </section>

          {/* Contact form and information sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <section aria-labelledby="contact-form-heading">
              <ContactForm />
            </section>

            {/* Additional Contact Information */}
            <section aria-labelledby="contact-info-heading">
              <ContactInfo />
            </section>
          </div>

          {/* Location and Map */}
          <section className="mb-16" aria-labelledby="location-heading">
            <LocationMap />
          </section>

          {/* Emergency and After-Hours Contact */}
          <section className="mb-16 bg-yellow-50 rounded-2xl shadow-lg p-8 border border-yellow-200" aria-labelledby="emergency-heading">
            <h2 id="emergency-heading" className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Emergency & After-Hours Support
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Situations</h3>
                <p className="text-gray-600 mb-4">For medical emergencies, fire, or immediate danger</p>
                <a 
                  href="tel:911"
                  className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Call 911
                </a>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">After-Hours Support</h3>
                <p className="text-gray-600 mb-4">For non-emergency property issues during your stay</p>
                <a 
                  href="tel:+1234567891"
                  className="inline-flex items-center justify-center px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  (123) 456-7891
                </a>
                <p className="text-sm text-gray-500 mt-2">Available 24/7</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16" aria-labelledby="faq-heading">
            <FAQSection />
          </section>

          {/* Business Hours and Policies */}
          <section className="mb-16 bg-white rounded-2xl shadow-lg p-8" aria-labelledby="policies-heading">
            <h2 id="policies-heading" className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Business Hours & Policies
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Business Hours */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Office Hours</h3>
                <div className="space-y-2">
                  {[
                    { day: 'Monday - Friday', hours: '8:00 AM - 8:00 PM CST' },
                    { day: 'Saturday', hours: '8:00 AM - 8:00 PM CST' },
                    { day: 'Sunday', hours: '8:00 AM - 8:00 PM CST' },
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-800 mb-2">Check-in & Check-out</h4>
                  <div className="text-sm text-emerald-700 space-y-1">
                    <p><strong>Check-in:</strong> 4:00 PM - 8:00 PM</p>
                    <p><strong>Check-out:</strong> 11:00 AM</p>
                    <p><strong>Late arrivals:</strong> Call ahead to arrange</p>
                  </div>
                </div>
              </div>

              {/* Policies */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Policies</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800">Cancellation Policy</h4>
                    <p className="text-sm text-gray-600">Free cancellation up to 7 days before arrival. Within 7 days, 50% of total booking fee applies.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800">Pet Policy</h4>
                    <p className="text-sm text-gray-600">Select properties are pet-friendly. Additional fee and advance notice required. Maximum 2 pets per reservation.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800">Age Requirements</h4>
                    <p className="text-sm text-gray-600">Guests must be 21+ to book. Children welcome with adult supervision at family-friendly properties.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800">Smoking Policy</h4>
                    <p className="text-sm text-gray-600">All accommodations are non-smoking. Designated outdoor smoking areas available.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Social Media and Reviews */}
          <section className="mb-16 text-center bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl shadow-lg p-8" aria-labelledby="social-heading">
            <h2 id="social-heading" className="text-2xl font-bold text-gray-900 mb-6">
              Connect With Us
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Follow our adventures, see guest photos, and stay updated on special offers and events.
            </p>
            
            <div className="flex justify-center space-x-6 mb-8">
              {[
                { name: 'Instagram', href: 'https://instagram.com/theglampingspot', icon: '📸' },
                { name: 'Facebook', href: 'https://facebook.com/theglampingspot', icon: '📘' },
                { name: 'TripAdvisor', href: 'https://tripadvisor.com/theglampingspot', icon: '🦉' },
                { name: 'Google Reviews', href: 'https://google.com/reviews/theglampingspot', icon: '⭐' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  aria-label={`Follow us on ${social.name} (opens in new tab)`}
                >
                  <span className="text-xl" role="img" aria-hidden="true">{social.icon}</span>
                </a>
              ))}
            </div>
            
            <p className="text-sm text-gray-600">
              Tag your photos with <span className="font-semibold text-emerald-600">#TheGlampingSpot</span> for a chance to be featured!
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}