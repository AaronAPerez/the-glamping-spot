import dynamic from 'next/dynamic';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';

// Critical components - load immediately
import Hero from '@/components/home/Hero';
import AboutSection from '@/components/home/AboutSection';
import ComingSoonNotice from '@/components/notices/ComingSoonNotice';
import { Metadata } from 'next';
// import MidpageBookingCTA from '@/components/booking/MidpageBookingCTA'; // DISABLED DURING DEVELOPMENT
// import CTASection from '@/components/home/CTASection'; // DISABLED DURING DEVELOPMENT (Booking CTA)
import ExperiencesPreview from '@/components/home/ExperiencesPreview';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import WeatherHighlightsClient from '@/components/home/WeatherHighlightsClient';
import NewsletterSignup from '@/components/marketing/NewsletterSignup';
import { Suspense } from 'react';

// Non-critical components - load dynamically
const InstagramFeed = dynamic(() => import('@/components/social/InstagramFeed'), {
  loading: () => <LoadingSkeleton lines={3} height="h-64" />,
});

const ActivitiesNearby = dynamic(() => import('@/location/ActivitiesNearby'), {
  loading: () => <LoadingSkeleton lines={5} height="h-48" />
});

const TestimonialSection = dynamic(() => import('@/components/home/TestimonialSection'), {
  loading: () => <LoadingSkeleton lines={4} height="h-32" />
});

const UniqueExperiences = dynamic(() => import('@/components/home/UniqueExperiences'), {
  loading: () => <LoadingSkeleton lines={6} height="h-40" />
});

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
      <main id="main-content" className="pt-16" suppressHydrationWarning>
        {/* Hero Section with priority loading */}
        <section id="hero" aria-labelledby="hero-heading">
          <Hero />
        </section>

        {/* Coming Soon Notice - Prominent display that site is not yet open */}
        <section id="coming-soon" aria-labelledby="coming-soon-heading">
          <ComingSoonNotice />
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

          {/* Mid-page Booking CTA - DISABLED DURING DEVELOPMENT */}
        {/* <section id="mid-page-cta" aria-labelledby="mid-page-cta-heading">
          <MidpageBookingCTA
            heading="Reserve Your Texas Geodesic Dome Glamping Experience"
            description="Our luxury geo domes book quickly, especially during peak seasons. Secure your preferred dates for an unforgettable glamping adventure in East Texas!"
            backgroundImage="/images/projector.jpg"
            ctaText="Check Availability and Book Now"
            ctaLink="/booking"
          />
        </section> */}

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
            incentive="Be the first to know when we launch and get exclusive early access to booking!"
          />
        </section>

        {/* Final CTA Section - DISABLED DURING DEVELOPMENT (Booking CTA) */}
        {/* <section id="cta" aria-labelledby="cta-heading">
          <CTASection />
        </section> */}
      </main>
    </div>
  );
}