import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CategorySection = () => {
  return (
    <div>
         {/* Experience Categories Section */}
      <section className="py-16 bg-gray-50" aria-labelledby="categories-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="categories-heading" className="text-3xl font-bold text-gray-900">Extraordinary Stays</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              A one-of-a-kind geodesic dome retreat in the heart of East Texas
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <article className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 relative">
              <div className="relative h-80">
                <Image
                  src="/images/glamping-dome.jpg"
                  alt="Geodesic dome glamping accommodation"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 672px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition-all duration-300"></div>
              </div>
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Geodesic Dome</h3>
                <p className="text-sm mb-4 opacity-90">Sleep under the stars in our transparent dome overlooking a private pond</p>
                <Link href="/properties" className="text-emerald-300 hover:text-emerald-200 font-medium flex items-center">
                  Explore the dome <span className="ml-2" aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CategorySection
