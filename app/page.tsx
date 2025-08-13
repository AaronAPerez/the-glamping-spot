import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import WeatherHighlightsClient from "@/components/home/WeatherHighlightsClient";

import UniqueExperiences from "@/components/home/UniqueExperiences";
import TestimonialSection from "@/components/home/TestimonialSection";
import CTASection from "@/components/home/CTASection";
import MidpageBookingCTA from "@/components/booking/MidpageBookingCTA";
import InstagramFeed from "@/components/social/InstagramFeed";
import NewsletterSignup from "@/components/marketing/NewsletterSignup";
import ActivitiesNearby from "@/location/ActivitiesNearby";
import { Suspense } from "react";
import { Metadata } from "next";
import ExperiencesPreview from "@/components/home/ExperiencesPreview";

/**
 * Enhanced SEO metadata for the homepage with comprehensive keywords and social sharing
 */
export const metadata: Metadata = {
  title: "The Glamping Spot - Luxury Geodesic Dome Glamping Near Houston, Texas",
  description: "Experience luxury glamping in geodesic domes near Houston, TX with premium amenities, stunning views, stargazing, hot tubs, and exciting outdoor activities. Book your Texas glamping adventure today.",
  keywords: [
    "glamping texas",
    "houston glamping", 
    "geodesic domes texas",
    "luxury camping houston",
    "texas outdoor getaway",
    "stargazing accommodation",
    "big thicket glamping",
    "kountze texas lodging",
    "dome camping texas",
    "luxury outdoor experience"
  ].join(", "),
  authors: [{ name: "The Glamping Spot" }],
  creator: "The Glamping Spot",
  publisher: "The Glamping Spot",
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
    type: "website",
    locale: "en_US",
    url: "https://theglampingspot.com",
    siteName: "The Glamping Spot",
    title: "The Glamping Spot - Luxury Geodesic Dome Glamping Near Houston, Texas",
    description: "Experience luxury glamping in geodesic domes near Houston, TX with premium amenities, stunning views, and exciting activities.",
    images: [
      {
        url: "/images/GlampingHero.jpg",
        width: 1200,
        height: 630,
        alt: "Luxury geodesic dome glamping experience at The Glamping Spot near Houston, Texas"
      },
      {
        url: "/images/geo-dome.jpg",
        width: 800,
        height: 600,
        alt: "Interior view of stargazing geodesic dome with transparent ceiling"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@theglampingspot",
    creator: "@theglampingspot",
    title: "The Glamping Spot - Luxury Geodesic Dome Glamping Near Houston, Texas",
    description: "Experience luxury glamping in geodesic domes near Houston, TX with premium amenities, stunning views, and exciting activities.",
    images: ["/images/GlampingHero.jpg"]
  },
  alternates: {
    canonical: "https://theglampingspot.com"
  },
  other: {
    "geo.region": "US-TX",
    "geo.placename": "Kountze, Texas",
    "geo.position": "30.3727;-94.3099",
    "ICBM": "30.3727, -94.3099"
  }
};

/**
 * Navigation items with descriptive aria-labels for accessibility
 */
const navItems = [
  {
    name: "Book Your Glamping Experience",
    link: "/booking",
    icon: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
    ),
  },
  {
    name: "Geodesic Domes",
    link: "#featured-properties",
    icon: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
  },
  {
    name: "Activities and Adventures",
    link: "#unique-experiences",
    icon: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="h-4 w-4"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
        <path d="M2 12h20"></path>
      </svg>
    ),
  },
  {
    name: "Photo Gallery",
    link: "#experiences",
    icon: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
        <circle cx="12" cy="13" r="3"></circle>
      </svg>
    ),
  },
  {
    name: "Contact The Glamping Spot",
    link: "/contact",
    icon: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
  },
];

/**
 * Loading fallback component with proper accessibility
 */
const SectionLoadingFallback = ({ ariaLabel }: { ariaLabel: string }) => (
  <div className="py-16 text-center" role="status" aria-label={ariaLabel}>
    <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
    <span className="sr-only">{ariaLabel}</span>
    <p className="text-gray-600">Loading content...</p>
  </div>
);

/**
 * Enhanced homepage with comprehensive SEO optimization, accessibility improvements,
 * and performance optimizations for all Lighthouse metrics
 */
export default function Home() {
  return (
    <div>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      {/* Main content landmark */}
      <main id="main-content" className="pt-16">
        {/* Hero Section with priority loading */}
        <section id="hero" aria-labelledby="hero-heading">
          <Hero />
        </section>

        {/* About Section highlighting value proposition */}
        <section id="about" aria-labelledby="about-heading">
          <AboutSection />
        </section>
        
        {/* Featured Geo Domes - Updated to focus on specific property types */}
        <section id="featured-properties" aria-labelledby="featured-properties-heading">
          <FeaturedProperties 
            title="Our Luxury Geodesic Dome Accommodations"
            subtitle="Experience our premium geo domes with upscale amenities in the heart of East Texas near the Big Thicket National Preserve"
          />
        </section>
        
        {/* Unique Experiences Section for activity upsells */}
        <section id="unique-experiences" aria-labelledby="unique-experiences-heading">
          <UniqueExperiences />
        </section>

      
        
        {/* Experiences/Gallery Section showcasing guest experiences */}
        <section id="experiences" aria-labelledby="memories-heading">
          <ExperiencesPreview />
        </section>
        
        {/* Instagram Feed for social proof and engagement */}
        <section id="instagram" aria-labelledby="instagram-heading">
          <InstagramFeed 
            username="the.glamping.spot"
            title="Follow Our Glamping Adventures"
            subtitle="Tag your photos with #TheGlampingSpot for a chance to be featured on our feed and win a free night stay!"
          />
        </section>

          {/* Mid-page Booking CTA to capture interest */}
        <section id="mid-page-cta" aria-labelledby="mid-page-cta-heading">
          <MidpageBookingCTA 
            heading="Reserve Your Texas Geodesic Dome Glamping Experience"
            description="Our luxury geo domes book quickly, especially during peak seasons. Secure your preferred dates for an unforgettable glamping adventure in East Texas!"
            backgroundImage="/images/projector.jpg"
            ctaText="Check Availability and Book Now"
            ctaLink="/booking"
          />
        </section>

          {/* Weather-based activity recommendations with proper loading states */}
        <section id="weather-highlights" aria-labelledby="weather-highlights-heading">
          <Suspense fallback={<SectionLoadingFallback ariaLabel="Loading weather-based activity recommendations" />}>
            <WeatherHighlightsClient />
          </Suspense>
        </section>

       

         {/* Activities near Kountze, Texas */}
        <section id="activities-nearby" aria-labelledby="activities-nearby-heading">
          <Suspense fallback={<SectionLoadingFallback ariaLabel="Loading nearby activities and attractions" />}>
            <ActivitiesNearby />
          </Suspense>
        </section>
        
        {/* Testimonial Section building trust */}
        {/* <section id="testimonial" aria-labelledby="testimonial-heading">
          <TestimonialSection />
        </section> */}
        
        {/* Newsletter Signup for lead generation */}
        <section id="newsletter" aria-labelledby="newsletter-heading">
          <NewsletterSignup 
            title="Join The Glamping Spot Community"
            description="Subscribe to receive exclusive offers, availability updates, seasonal specials, and insider tips for your Texas glamping adventure."
            incentive="Get 10% off your first booking when you subscribe to our newsletter!"
          />
        </section>
        
        {/* Final CTA Section */}
        <section id="cta" aria-labelledby="cta-heading">
          <CTASection />
        </section>
      </main>
    </div>
  );
}