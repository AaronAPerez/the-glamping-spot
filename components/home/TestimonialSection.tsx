'use client';

import React from 'react';
import { AnimatedTooltip } from '../ui/AnimatedTooltip';
import { BackgroundGradient } from '../ui/BackgroundGradient';
import { InfiniteMovingCards } from '../ui/InfiniteMovingCards';





/**
 * Interface for testimonial data
 */
interface Testimonial {
  /**
   * Author's initial or full name
   */
  name: string;
  
  /**
   * Initials for avatar display (if no image)
   */
  initials: string;
  
  /**
   * Rating (out of 5)
   */
  rating: number;
  
  /**
   * Testimonial text content
   */
  testimonial: string;
  
  /**
   * Optional avatar image URL
   */
  avatarUrl?: string;
  
  /**
   * Location or date information (optional)
   */
  meta?: string;
}

/**
 * Employee/staff data for the animated tooltip component
 */
interface Person {
  id: number;
  name: string;
  designation: string;
  image: string;
}

/**
 * Enhanced TestimonialSection with animation effects from Aceternity UI
 */
export default function TestimonialSection() {
  // Sample testimonial data
  const testimonials = [
    {
      name: "Jessica R.",
      initials: "J",
      rating: 5,
      testimonial: "Our stay in the geodesic dome was magical! Waking up to mountain views through the transparent ceiling and falling asleep while stargazing was an experience we'll never forget.",
      meta: "Stayed in Geo Dome, July 2023"
    },
    {
      name: "Michael T.",
      initials: "M",
      rating: 5,
      testimonial: "Perfect combination of wilderness and comfort. The treehouse had all the amenities we could ask for while being surrounded by nature. The outdoor shower was incredible!",
      meta: "Stayed in Treehouse, August 2023"
    },
    {
      name: "Aisha K.",
      initials: "A",
      rating: 5,
      testimonial: "The attention to detail was impressive. From the luxurious bedding to the curated selection of local products, everything made our glamping experience special and memorable.",
      meta: "Stayed in Luxury Yurt, September 2023"
    },
    {
      name: "David L.",
      initials: "D",
      rating: 5,
      testimonial: "We loved how each morning started with homemade breakfast on our private deck. Watching the sunrise over the mountains while sipping fresh coffee was pure bliss.",
      meta: "Stayed in Mountain View Cabin, June 2023"
    },
    {
      name: "Sophia M.",
      initials: "S",
      rating: 5,
      testimonial: "The stargazing experience arranged by the staff was the highlight of our trip. The guide was knowledgeable and we saw galaxies and planets through the telescope!",
      meta: "Stayed in Geo Dome, October 2023"
    }
  ];
  
  // Sample team/staff data for animated tooltip
  const people: Person[] = [
    {
      id: 1,
      name: "Emma Wilson",
      designation: "Guest Experience Manager",
      image: "/images/Profile1.jpg"
    },
    {
      id: 2,
      name: "James Chen",
      designation: "Property Curator",
      image: "/images/Profile2.jpg"
    },
    {
      id: 3,
      name: "Olivia Taylor",
      designation: "Adventure Guide",
      image: "/images/Profile3.jpg"
    },
    {
      id: 4,
      name: "Marcus Johnson",
      designation: "Sustainability Director",
      image: "/images/Profile4.jpg"
    }
  ];

  return (
    <section className="py-16" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <BackgroundGradient className="inline-block p-[4px] mb-4 rounded-xl">
            <div className="rounded-lg px-4 py-2">
              <h2 id="testimonials-heading" className="text-3xl font-bold ">
                What Our Guests Say
              </h2>
            </div>
          </BackgroundGradient>
          <p className="mt-4 text-xl ">
            Unforgettable experiences shared by our happy glampers
          </p>
        </div>
        
        {/* Horizontally scrolling testimonials using InfiniteMovingCards */}
        <div className="mb-16">
          <InfiniteMovingCards
            items={testimonials.map(testimonial => ({
              content: (
                <div className="p-4 relative">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xl" aria-hidden="true">
                      {testimonial.initials}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <div className="flex text-yellow-400" aria-label={`${testimonial.rating} out of 5 stars`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} aria-hidden="true">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <blockquote className=" italic">
                    &quot;{testimonial.testimonial}&quot;
                  </blockquote>
                  {testimonial.meta && (
                    <p className="mt-2 text-sm ">{testimonial.meta}</p>
                  )}
                </div>
              )
            }))}
            direction="right"
            speed="slow"
          />
        </div>
        
        {/* Our Team section with animated tooltips */}
        {/* <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">Meet Our Team</h3>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
            Our dedicated staff works tirelessly to ensure your glamping experience exceeds expectations
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <AnimatedTooltip items={people} />
          </div>
        </div> */}
      </div>
    </section>
  );
}