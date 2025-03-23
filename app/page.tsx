import BookingPromotionSection from "@/components/booking/BookingPromotionSection";
import MidpageBookingCTA from "@/components/booking/MidpageBookingCTA";
import AboutSection from "@/components/home/AboutSection";
import CategorySection from "@/components/home/CategorySection";
import CTASection from "@/components/home/CTASection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Hero from "@/components/home/Hero";
import MemoriesPreview from "@/components/home/MemoriesPreview";
import TestimonialSection from "@/components/home/TestimonialSection";
import WeatherHighlightsClient from "@/components/home/WeatherHighlightsClient";
import NewsletterSignup from "@/components/marketing/NewsletterSignup";
import { Suspense } from "react";


export default function Home() {
  return (
    <div>
    
      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* Experience Section */}
      <section id="experience" aria-labelledby="experience">
        <AboutSection />
      </section>


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
      
      
      {/* Unique Experiences Section for activity upsells */}
      {/* <section id="unique-experiences" aria-labelledby="unique-experiences">
        <UniqueExperiences />
      </section> */}
      
      {/* Weather-based activity recommendations */}
      <Suspense fallback={<div className="py-16 text-center">Loading weather data...</div>}>
        <WeatherHighlightsClient />
      </Suspense>
      
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
      
      {/* Memories/Gallery Section showcasing guest experiences */}
      <section id="memories" aria-labelledby="memories">
        <MemoriesPreview />
      </section>

            {/* Location and Accommodation Categories */}
      <section id="categories" aria-labelledby="categories-heading">
        <CategorySection />
      </section>
      
      {/* Instagram Feed for social proof and engagement */}
      {/* <section id="instagram" aria-labelledby="instagram-heading">
        <InstagramFeed 
          username="theglampingspot"
          title="Follow Our Adventures"
          subtitle="Tag your photos with #TheGlampingSpot for a chance to be featured"
        />
      </section> */}
      
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