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
              Choose your perfect glamping experience from our diverse collection of unique accommodations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category 1 */}
            <article className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 relative">
              <div className="relative h-64">
                <Image 
                  src="/images/geo-dome.jpg" 
                  alt="Geodesic dome glamping accommodation" 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition-all duration-300"></div>
              </div>
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Geodesic Domes</h3>
                <p className="text-sm mb-4 opacity-90">Sleep under the stars in our transparent domes</p>
                <Link href="/properties?category=domes" className="text-emerald-300 hover:text-emerald-200 font-medium flex items-center">
                  Explore domes <span className="ml-2" aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
            
            {/* Category 2 */}
            <article className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 relative">
              <div className="relative h-64">
                <Image 
                  src="/images/treehouse1.jpg" 
                  alt="Treehouse glamping accommodation" 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition-all duration-300"></div>
              </div>
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Treehouses</h3>
                <p className="text-sm mb-4 opacity-90">Elevated luxury nestled in the forest canopy</p>
                <Link href="/properties?category=treehouses" className="text-emerald-300 hover:text-emerald-200 font-medium flex items-center">
                  Explore treehouses <span className="ml-2" aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
            
            {/* Category 3 */}
            <article className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 relative">
              <div className="relative h-64">
                <Image
                  src="/images/deck.jpg" 
                  alt="Luxury yurt with outdoor deck" 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition-all duration-300"></div>
              </div>
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Luxury Yurts</h3>
                <p className="text-sm mb-4 opacity-90">Traditional comfort with modern amenities</p>
                <Link href="/properties?category=yurts" className="text-emerald-300 hover:text-emerald-200 font-medium flex items-center">
                  Explore yurts <span className="ml-2" aria-hidden="true">→</span>
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