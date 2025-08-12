import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { PropertyData } from '@/types';
import PropertyCard from '@/components/properties/PropertyCard';

/**
 * Enhanced SEO metadata for properties page with comprehensive optimization
 * Addresses Lighthouse SEO recommendations
 */
export const metadata: Metadata = {
  title: 'Luxury Geodesic Dome Properties | The Glamping Spot Texas',
  description: 'Browse our unique geodesic dome glamping accommodations near Houston, Texas. Luxury camping with premium amenities, stargazing ceilings, hot tubs, and breathtaking East Texas views. Book your luxury outdoor experience today.',
  keywords: [
    'geodesic dome properties texas',
    'luxury glamping houston',
    'dome accommodations texas',
    'stargazing domes',
    'glamping properties east texas',
    'luxury camping near houston',
    'big thicket accommodations',
    'dome rentals texas'
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
    url: 'https://theglampingspot.com/properties',
    siteName: 'The Glamping Spot',
    title: 'Luxury Geodesic Dome Properties | The Glamping Spot Texas',
    description: 'Discover our unique geodesic dome glamping accommodations with premium amenities and stunning Texas views.',
    images: [
      {
        url: '/images/geo-dome.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury geodesic dome accommodation at The Glamping Spot'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@theglampingspot',
    creator: '@theglampingspot',
    title: 'Luxury Geodesic Dome Properties | The Glamping Spot Texas',
    description: 'Discover our unique geodesic dome glamping accommodations with premium amenities and stunning Texas views.',
    images: ['/images/geo-dome.jpg']
  },
  alternates: {
    canonical: 'https://theglampingspot.com/properties'
  },
  other: {
    "geo.region": "US-TX",
    "geo.placename": "Kountze, Texas",
    "geo.position": "30.3727;-94.3099",
    "ICBM": "30.3727, -94.3099"
  }
};

// Enhanced property data with better descriptions and accessibility
const getProperties = async (): Promise<PropertyData[]> => {
  // In a real application, this would fetch from an API
  const sampleProperties: PropertyData[] = [
    {
      _id: 'stargazer-dome',
      name: 'Stargazer Geodesic Dome',
      description: 'Premium geodesic dome featuring a transparent ceiling perfect for stargazing, luxury amenities, and panoramic East Texas views. Experience the ultimate connection with nature without sacrificing comfort.',
      location: 'The Glamping Spot, Kountze, East Texas',
      price: 249,
      imageUrls: ['/images/geo-dome.jpg'],
      capacity: 2,
      amenities: ['Stargazing Ceiling', 'Private Hot Tub', 'Wi-Fi', 'Climate Control', 'Luxury Bathroom', 'Fire Pit'],
      category: 'geodesic-dome',
      featured: true,
      // availability: ['Available year-round'],
      rating: 4.9,
      reviewCount: 127
    },
    {
      _id: 'sunset-view-dome',
      name: 'Sunset View Dome',
      description: 'Geodesic dome positioned for optimal sunset viewing with premium amenities and private outdoor space. Watch spectacular Texas sunsets from your private hot tub.',
      location: 'The Glamping Spot, Kountze, East Texas',
      price: 279,
      imageUrls: ['/images/geo-dome-sunset2.jpg'],
      capacity: 2,
      amenities: ['Sunset Views', 'Private Hot Tub', 'Outdoor Shower', 'Wi-Fi', 'Kitchenette', 'BBQ Grill'],
      category: 'geodesic-dome',
      featured: true,
      // availability: ['Available weekends'],
      rating: 4.8,
      reviewCount: 93
    },
    {
      _id: 'family-adventure-dome',
      name: 'Family Adventure Dome',
      description: 'Spacious geodesic dome designed for families with additional sleeping space and enhanced amenities. Perfect for creating lasting memories with your loved ones.',
      location: 'The Glamping Spot, Kountze, East Texas',
      price: 319,
      imageUrls: ['/images/family-dome.jpg'],
      capacity: 4,
      amenities: ['Queen Bed + Bunks', 'Large Hot Tub', 'Full Kitchen', 'Wi-Fi', 'Fire Pit', 'Game Area'],
      category: 'geodesic-dome',
      featured: true,
      // availability: ['Family-friendly scheduling'],
      rating: 4.7,
      reviewCount: 156
    },
    // {
    //   _id: 'romantic-escape-dome',
    //   name: 'Romantic Escape Dome',
    //   description: 'Intimate geodesic dome perfect for couples with luxury touches and secluded location. Includes complimentary champagne service and premium amenities.',
    //   location: 'The Glamping Spot, Kountze, East Texas',
    //   price: 299,
    //   imageUrls: ['/images/geo-dome.jpg'],
    //   capacity: 2,
    //   amenities: ['King Bed', 'Private Hot Tub', 'Champagne Service', 'Wi-Fi', 'Premium Linens', 'Rose Petals'],
    //   category: 'geodesic-dome',
    //   featured: true,
    //   availability: ['Romantic packages available'],
    //   rating: 5.0,
    //   reviewCount: 84
    // },
    // {
    //   _id: 'nature-explorer-dome',
    //   name: 'Nature Explorer Dome',
    //   description: 'Adventure-focused geodesic dome with enhanced outdoor access and nature exploration amenities. Includes guided nature walks and wildlife viewing equipment.',
    //   location: 'The Glamping Spot, Kountze, East Texas',
    //   price: 259,
    //   imageUrls: ['/images/geo-dome.jpg'],
    //   capacity: 3,
    //   amenities: ['Nature Equipment', 'Hot Tub', 'Hiking Gear', 'Wi-Fi', 'Outdoor Shower', 'Binoculars'],
    //   category: 'geodesic-dome',
    //   featured: false,
    //   availability: ['Seasonal availability'],
    //   rating: 4.6,
    //   reviewCount: 72
    // },
    // {
    //   _id: 'luxury-retreat-dome',
    //   name: 'Luxury Retreat Dome',
    //   description: 'Our most premium geodesic dome experience featuring top-tier amenities, concierge service, and exclusive access to private trails and facilities.',
    //   location: 'The Glamping Spot, Kountze, East Texas',
    //   price: 399,
    //   imageUrls: ['/images/geo-dome-sunset2.jpg'],
    //   capacity: 2,
    //   amenities: ['Concierge Service', 'Premium Hot Tub', 'Butler Service', 'Wi-Fi', 'Private Chef Option', 'Spa Services'],
    //   category: 'geodesic-dome',
    //   featured: true,
    //   availability: ['By reservation only'],
    //   rating: 5.0,
    //   reviewCount: 45
    // }
  ];

  return sampleProperties;
};

/**
 * Enhanced filter options for better user experience
 */
const filterOptions = [
  { value: 'all', label: 'All Properties', icon: '🏠' },
  { value: 'featured', label: 'Featured', icon: '⭐' },
  { value: 'couples', label: 'For Couples', icon: '💕' },
  { value: 'families', label: 'Family-Friendly', icon: '👨‍👩‍👧‍👦' },
  { value: 'luxury', label: 'Luxury', icon: '💎' }
] as const;

/**
 * Sort options for property listings
 */
const sortOptions = [
  { value: 'featured', label: 'Featured First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'capacity', label: 'Guest Capacity' }
] as const;

/**
 * Properties page with enhanced accessibility, SEO, and user experience
 * Implements all Lighthouse performance, accessibility, best practices, and SEO recommendations
 */
export default async function PropertiesPage() {
  const properties = await getProperties();

  // JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Luxury Geodesic Dome Properties",
    "description": "Premium glamping accommodations in geodesic domes near Houston, Texas",
    "url": "https://theglampingspot.com/properties",
    "numberOfItems": properties.length,
    "itemListElement": properties.map((property, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "LodgingBusiness",
        "@id": `https://theglampingspot.com/properties/${property._id}`,
        "name": property.name,
        "description": property.description,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kountze",
          "addressRegion": "TX",
          "addressCountry": "US"
        },
        "priceRange": `$${property.price}`,
        "amenityFeature": property.amenities.map(amenity => ({
          "@type": "LocationFeatureSpecification",
          "name": amenity
        })),
        "aggregateRating": property.rating ? {
          "@type": "AggregateRating",
          "ratingValue": property.rating,
          "reviewCount": property.reviewCount
        } : undefined
      }
    }))
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb navigation with enhanced accessibility */}
        <nav 
          className="pt-16 pb-4"
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
              Properties
            </li>
          </ol>
        </nav>

        {/* Enhanced header section with proper heading hierarchy */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Luxury Geodesic Dome Properties
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl leading-relaxed">
            Discover our curated collection of unique geodesic dome glamping experiences in the heart of East Texas. 
            Each dome offers luxury amenities, stunning natural settings, and unforgettable stargazing opportunities 
            just minutes from Houston.
          </p>
        </header>

        {/* Main content with enhanced semantics */}
        <main id="main-content">
          {/* Property features highlight with improved accessibility */}
          <section className="mb-12 bg-white rounded-2xl shadow-lg p-8" aria-labelledby="features-heading">
            <h2 id="features-heading" className="text-2xl font-bold text-gray-900 mb-6">
              What Makes Our Domes Special
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg 
                    className="w-8 h-8 text-emerald-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Stargazing Ceilings</h3>
                <p className="text-gray-600">Transparent dome ceilings for unparalleled night sky viewing</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg 
                    className="w-8 h-8 text-emerald-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Luxury Amenities</h3>
                <p className="text-gray-600">Private hot tubs, premium bedding, and modern conveniences</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg 
                    className="w-8 h-8 text-emerald-600" 
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
                <h3 className="font-semibold text-gray-900 mb-2">Prime Location</h3>
                <p className="text-gray-600">Minutes from Big Thicket National Preserve and Houston</p>
              </div>
            </div>
          </section>

          {/* Filter and Sort Controls */}
          <section className="mb-8 bg-white rounded-xl shadow-md p-6" aria-labelledby="filters-heading">
            <h2 id="filters-heading" className="sr-only">Filter and sort properties</h2>
            
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Filter Options */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 mr-2 py-2">Filter:</span>
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                    aria-label={`Filter properties: ${option.label}`}
                  >
                    <span className="mr-2" aria-hidden="true">{option.icon}</span>
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort-select" className="text-sm font-medium text-gray-700">
                  Sort by:
                </label>
                <select
                  id="sort-select"
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  aria-label="Sort properties by"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>
          
          {/* Properties grid with enhanced accessibility and performance */}
          <section aria-labelledby="properties-heading">
            <h2 id="properties-heading" className="text-3xl font-bold text-gray-900 mb-8">
              Available Geodesic Domes ({properties.length} properties)
            </h2>
            
            {properties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {properties.map((property) => (
                    <PropertyCard
                      key={property._id}
                      id={property._id}
                      name={property.name}
                      location={property.location}
                      price={property.price}
                      imageUrl={property.imageUrls[0]}
                      description={property.description}
                      capacity={property.capacity}
                      amenities={property.amenities}
                      rating={property.rating}
                      reviewCount={property.reviewCount}
                      featured={property.featured}
                    />
                  ))}
                </div>

                {/* Load More / Pagination would go here */}
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">
                    Showing all {properties.length} properties
                  </p>
                  <Link
                    href="/booking"
                    className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    aria-label="Start booking process for any property"
                  >
                    Book Your Stay
                    <svg 
                      className="ml-2 h-5 w-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-16" role="status">
                <svg 
                  className="h-16 w-16 text-gray-400 mx-auto mb-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any properties matching your criteria.
                </p>
                <button
                  className="text-emerald-600 hover:text-emerald-700 font-medium focus:outline-none focus:underline"
                  onClick={() => window.location.reload()}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>

          {/* Enhanced booking information section */}
          <section className="mt-16 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl shadow-inner p-8" aria-labelledby="booking-info-heading">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 id="booking-info-heading" className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Book Your Texas Geodesic Dome Experience?
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Our luxury geodesic domes book quickly, especially during weekends and holidays. 
                  Reserve your stay now to secure your preferred dates and experience 
                  the ultimate glamping adventure in East Texas near the Big Thicket National Preserve.
                </p>
                <ul className="space-y-3 text-gray-700" role="list">
                  {[
                    'Free cancellation up to 7 days before check-in',
                    'Special weekday rates available',
                    'Exclusive activities included with every booking',
                    'Direct booking best rate guarantee',
                    '24/7 concierge support during your stay'
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg 
                        className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center lg:text-right">
                <p className="text-lg font-semibold text-emerald-800 mb-4">
                  Book Direct for Exclusive Benefits
                </p>
                <Link 
                  href="/booking" 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  aria-label="Check availability and book your geodesic dome experience"
                >
                  Check Availability
                  <svg 
                    className="ml-2 h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                  </svg>
                </Link>
                <p className="mt-4 text-sm text-gray-600">
                  Questions? Call us at{' '}
                  <a 
                    href="tel:+1234567890" 
                    className="text-emerald-700 font-semibold hover:underline focus:outline-none focus:underline"
                    aria-label="Call The Glamping Spot at 123-456-7890"
                  >
                    (123) 456-7890
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Property comparison section */}
          <section className="mt-16 bg-white rounded-xl shadow-lg p-8" aria-labelledby="comparison-heading">
            <h2 id="comparison-heading" className="text-2xl font-bold text-gray-900 mb-6">
              Compare Our Properties
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto" role="table">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900" scope="col">Property</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900" scope="col">Capacity</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900" scope="col">Price/Night</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900" scope="col">Rating</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900" scope="col">Key Features</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.slice(0, 4).map((property) => (
                    <tr key={property._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">{property.name}</div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {property.capacity} guests
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-emerald-600">${property.price}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">⭐</span>
                          <span className="font-medium">{property.rating}</span>
                          <span className="text-gray-500 text-sm ml-1">({property.reviewCount})</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          {property.amenities.slice(0, 3).map((amenity, index) => (
                            <span key={index} className="inline-block text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full mr-1">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mt-16 bg-gray-50 rounded-xl p-8" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer py-4 px-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900">What's included in each geodesic dome stay?</h3>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 px-6 pb-4 text-gray-700">
                  <p>Each geodesic dome includes luxury bedding, private bathroom facilities, climate control, Wi-Fi, and access to shared amenities like fire pits and recreational areas. Specific amenities vary by dome type - see individual property listings for details.</p>
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer py-4 px-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900">What is your cancellation policy?</h3>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 px-6 pb-4 text-gray-700">
                  <p>We offer free cancellation up to 7 days before your check-in date. Cancellations within 7 days are subject to a 50% charge. No-shows or same-day cancellations forfeit the full payment.</p>
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer py-4 px-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900">Are pets allowed in the geodesic domes?</h3>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 px-6 pb-4 text-gray-700">
                  <p>Select properties are pet-friendly with advance notice and a small additional fee. Please contact us during booking to arrange pet accommodations and review our pet policy.</p>
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer py-4 px-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900">What activities are available nearby?</h3>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 px-6 pb-4 text-gray-700">
                  <p>Guests can enjoy hiking in Big Thicket National Preserve, ATV trail riding, bird watching, fishing, stargazing, and guided nature walks. We also offer on-site activities like fire pit gatherings and outdoor games.</p>
                </div>
              </details>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="mt-16 bg-white rounded-xl shadow-lg p-8" aria-labelledby="testimonials-heading">
            <h2 id="testimonials-heading" className="text-2xl font-bold text-gray-900 mb-8 text-center">
              What Our Guests Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah & Mike Johnson",
                  rating: 5,
                  review: "Absolutely magical experience! The stargazing dome was perfect for our anniversary. The hot tub under the stars was unforgettable.",
                  property: "Romantic Escape Dome"
                },
                {
                  name: "The Rodriguez Family",
                  rating: 5,
                  review: "Our kids loved the family dome! Plenty of space and the location was perfect for exploring Big Thicket. Will definitely return!",
                  property: "Family Adventure Dome"
                },
                {
                  name: "Jennifer Chen",
                  rating: 5,
                  review: "The luxury retreat exceeded all expectations. The concierge service was outstanding and the dome was absolutely pristine.",
                  property: "Luxury Retreat Dome"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} aria-hidden="true">⭐</span>
                      ))}
                    </div>
                    <span className="sr-only">{testimonial.rating} out of 5 stars</span>
                  </div>
                  <blockquote className="text-gray-700 mb-4">
                    "{testimonial.review}"
                  </blockquote>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.property}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer CTA */}
        <aside className="mt-16 text-center bg-emerald-600 rounded-2xl p-8 text-white" aria-labelledby="footer-cta-heading">
          <h2 id="footer-cta-heading" className="text-2xl font-bold mb-4">
            Ready to Experience Luxury Glamping?
          </h2>
          <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
            Don't wait - our unique geodesic domes book quickly. Secure your perfect Texas glamping getaway today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/booking"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-emerald-600"
              aria-label="Start booking your geodesic dome experience"
            >
              Book Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-emerald-600"
              aria-label="Contact us with questions about our properties"
            >
              Contact Us
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}