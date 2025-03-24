import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import WeatherHighlightsClient from "@/components/home/WeatherHighlightsClient";
import MemoriesPreview from "@/components/home/MemoriesPreview";
import UniqueExperiences from "@/components/home/UniqueExperiences";
import TestimonialSection from "@/components/home/TestimonialSection";
import CTASection from "@/components/home/CTASection";
// import { FloatingNav } from "@/components/layout/FloatingNav";
import { Suspense } from "react";
import BookingPromotionSection from "@/components/booking/BookingPromotionSection";
import MidpageBookingCTA from "@/components/booking/MidpageBookingCTA";
import InstagramFeed from "@/components/social/InstagramFeed";
import NewsletterSignup from "@/components/marketing/NewsletterSignup";
// import SpecialOffers from "@/components/booking/SpecialOffers";
// import UpcomingEventsBanner from "@/components/marketing/UpcomingEventsBanner";
import { Metadata } from "next";
import ImmersiveExperience from "@/components/home/ImmersiveExperience";

/**
 * SEO metadata for the homepage
 */
export const metadata: Metadata = {
  title: "The Glamping Spot - Luxury Outdoor Experiences in Texas",
  description: "Experience luxury glamping in geodesic domes near Houston, TX with premium amenities, stunning views, and exciting activities.",
  keywords: "glamping, texas, houston, geo domes, luxury camping, outdoor getaway, stargazing",
  openGraph: {
    images: [
      {
        url: "/images/GlampingHero.jpg",
        width: 1200,
        height: 630,
        alt: "The Glamping Spot - Luxury Outdoor Experiences"
      }
    ]
  }
};

/**
 * Navigation items for floating nav to enhance user experience
 * and drive conversions with prominent "Book Now" button
 */
const navItems = [
  {
    name: "Book Now",
    link: "/booking",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
    ),
  },
  {
    name: "Domes",
    link: "#featured-properties",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
  },
  {
    name: "Activities",
    link: "#unique-experiences",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
        <path d="M2 12h20"></path>
      </svg>
    ),
  },
  {
    name: "Gallery",
    link: "#memories",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
        <circle cx="12" cy="13" r="3"></circle>
      </svg>
    ),
  },
  {
    name: "Contact",
    link: "/contact",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
  },
];

/**
 * Enhanced homepage with improved layout and revenue-generating features
 * - Includes time-limited promotions
 * - Multiple CTAs to encourage bookings
 * - Social proof elements
 * - Newsletter signup for lead generation
 * - Instagram feed to enhance social engagement
 */
export default function Home() {
  return (
    <div>
      {/* Floating Navigation for quick access to key sections */}
      {/* <FloatingNav navItems={navItems} /> */}

      {/* Limited Time Offer Banner - can be conditional based on promotions */}
      {/* <UpcomingEventsBanner 
        title="Memorial Day Weekend Special" 
        description="20% off all bookings May 24-27. Use code MEMORIAL2024" 
        endDate="2024-05-20"
        ctaText="Book Now"
        ctaLink="/booking"
      /> */}
      
      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* About Section highlighting value proposition */}
      <section id="about" aria-labelledby="about">
        <AboutSection />
      </section>
      
      {/* Special Offers with direct booking incentives */}
      {/* <section id="special-offers" aria-labelledby="special-offers-heading">
        <SpecialOffers
          title="Exclusive Offers"
          subtitle="Book directly for the best rates and special packages"
          offers={[
            {
              id: "weekday-special",
              title: "Weekday Escape",
              description: "Save 15% on Monday-Thursday stays",
              code: "WEEKDAY15",
              expires: "Ongoing",
              imageUrl: "/images/weekday-special.jpg"
            },
            {
              id: "stay-longer",
              title: "Extended Stay",
              description: "Stay 3+ nights and save 20%",
              code: "LONGER20",
              expires: "Ongoing",
              imageUrl: "/images/extended-stay.jpg"
            },
            {
              id: "celebration",
              title: "Celebration Package",
              description: "Champagne, flowers & chocolate",
              price: "$99",
              imageUrl: "/images/celebration.jpg"
            }
          ]}
        />
      </section> */}
      
      {/* Featured Geo Domes - Updated to focus on specific property types */}
      <section id="featured-properties" aria-labelledby="featured-properties">
        <FeaturedProperties 
          title="Our Luxury Dome Offerings"
          subtitle="Experience our premium geo domes with upscale amenities in the heart of Texas"
        />
      </section>
      
      {/* Mid-page Booking CTA to capture interest */}
      <section id="mid-page-cta" aria-labelledby="mid-page-cta-heading">
        <MidpageBookingCTA 
          heading="Reserve Your Texas Glamping Experience"
          description="Our luxury geo domes book quickly. Secure your preferred dates today!"
          backgroundImage="/images/projector.jpg"
          ctaText="Check Availability"
          ctaLink="/booking"
        />
      </section>
      

      
      {/* Location and Accommodation Categories */}
      <section id="categories" aria-labelledby="categories-heading">
        <CategorySection />
      </section>
      
      {/* Unique Experiences Section for activity upsells */}
      <section id="unique-experiences" aria-labelledby="unique-experiences">
        <UniqueExperiences />
      </section>
      
      {/* Weather-based activity recommendations */}
      <Suspense fallback={<div className="py-16 text-center">Loading weather data...</div>}>
        <WeatherHighlightsClient />
      </Suspense>
      
      {/* Memories/Gallery Section showcasing guest experiences */}
      <section id="memories" aria-labelledby="memories">
        <MemoriesPreview />
      </section>
      
      {/* Instagram Feed for social proof and engagement */}
      <section id="instagram" aria-labelledby="instagram-heading">
        <InstagramFeed 
          username="theglampingspot"
          title="Follow Our Adventures"
          subtitle="Tag your photos with #TheGlampingSpot for a chance to be featured"
        />
      </section>

            
      {/* Booking Promotion Section with time-sensitive offers */}
      <section id="booking-promotion" aria-labelledby="booking-promotion-heading">
        <BookingPromotionSection
          heading="Limited Time Offer"
          description="Book your stay in the next 48 hours and receive a complimentary bottle of champagne and late checkout!"
          expiryDate={new Date(Date.now() + 48 * 60 * 60 * 1000)}
          couponCode="WELCOME48"
          discount="Free extras"
          ctaText="Book with this offer"
          ctaLink="/booking?promo=WELCOME48"
        />
      </section>
      
      {/* Testimonial Section building trust */}
      <section id="testimonial" aria-labelledby="testimonial">
        <TestimonialSection />
      </section>
      
      {/* Newsletter Signup for lead generation */}
      <section id="newsletter" aria-labelledby="newsletter-heading">
        <NewsletterSignup 
          title="Join Our Community"
          description="Subscribe to receive exclusive offers, updates on availability, and seasonal specials."
          incentive="Get 10% off your first booking when you subscribe!"
        />
      </section>
      
      {/* Final CTA Section */}
      <section id="cta" aria-labelledby="cta-heading">
        <CTASection />
      </section>
    </div>
  );
}