import React from 'react'

const TestimonialSection = () => {
  return (
    <div>
          {/* Guest Testimonials Section */}
      <section className="py-16 bg-gray-50" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="testimonials-heading" className="text-3xl font-bold text-gray-900">What Our Guests Say</h2>
            <p className="mt-4 text-xl text-gray-600">
              Unforgettable experiences shared by our happy glampers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <article className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xl" aria-hidden="true">
                  J
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">Jessica R.</h3>
                  <div className="flex text-yellow-400" aria-label="5 out of 5 stars">
                    <span aria-hidden="true">★</span><span aria-hidden="true">★</span><span aria-hidden="true">★</span><span aria-hidden="true">★</span><span aria-hidden="true">★</span>
                  </div>
                </div>
              </div>
              <blockquote className="text-gray-700 italic">
                &quot;Our stay in the geodesic dome was magical! Waking up to mountain views through the transparent ceiling and falling asleep while stargazing was an experience we&apos;ll never forget.&quot;
              </blockquote>
            </article>
            
            {/* Testimonial 2 */}
            <article className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xl" aria-hidden="true">
                  M
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">Michael T.</h3>
                  <div className="flex text-yellow-400" aria-label="5 out of 5 stars">
                    <span aria-hidden="true">★</span><span aria-hidden="true">★</span><span aria-hidden="true">★</span><span aria-hidden="true">★</span><span aria-hidden="true">★</span>
                  </div>
                </div>
              </div>
              <blockquote className="text-gray-700 italic">
                &quot;Perfect combination of wilderness and comfort. The treehouse had all the amenities we could ask for while being surrounded by nature. The outdoor shower was incredible!&quot;
              </blockquote>
            </article>
            
            {/* Testimonial 3 */}
            <article className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xl" aria-hidden="true">
                  A
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold">Aisha K.</h3>
                  <div className="flex text-yellow-400" aria-label="5 out of 5 stars">
                    <span aria-hidden="true">★</span><span aria-hidden="true">★</span><span aria-hidden="true">★</span><span aria-hidden="true">★</span><span aria-hidden="true">★</span>
                  </div>
                </div>
              </div>
              <blockquote className="text-gray-700 italic">
                &quot;The attention to detail was impressive. From the luxurious bedding to the curated selection of local products, everything made our glamping experience special and memorable.&quot;
              </blockquote>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TestimonialSection;