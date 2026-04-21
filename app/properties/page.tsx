import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import PropertyGallery from '@/components/properties/PropertyGallery';

const AIRBNB_URL = 'https://www.airbnb.com/rooms/1461278647776104058';

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Our Geodesic Dome | The Glamping Spot — Kountze, Texas',
  description:
    'Stay in a luxury geodesic dome in Kountze, Texas. Sleeps up to 6 guests, 2 bedrooms, private pond, wooden deck, lake access, kitchen, Wifi, and more. Now booking on Airbnb.',
  keywords: [
    'geodesic dome kountze texas',
    'glamping dome east texas',
    'airbnb dome texas',
    'luxury dome rental houston',
    'big thicket glamping',
    'dome house rental texas',
    'private pond glamping',
    'east texas nature retreat',
  ].join(', '),
  authors: [{ name: 'The Glamping Spot' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theglampingspot.com/properties',
    siteName: 'The Glamping Spot',
    title: 'Our Geodesic Dome | The Glamping Spot — Kountze, Texas',
    description:
      'Luxury geodesic dome in Kountze, TX. Sleeps 6, private pond, wooden deck, lake access. Now booking on Airbnb.',
    images: [{ url: '/images/glamping-dome.jpg', width: 1200, height: 630, alt: 'The Glamping Spot geodesic dome at night' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@theglampingspot',
    title: 'Our Geodesic Dome | The Glamping Spot — Kountze, Texas',
    description: 'Luxury geodesic dome in Kountze, TX. Sleeps 6, private pond, wooden deck, lake access. Now booking on Airbnb.',
    images: ['/images/glamping-dome.jpg'],
  },
  alternates: { canonical: 'https://theglampingspot.com/properties' },
  other: {
    'geo.region': 'US-TX',
    'geo.placename': 'Kountze, Texas',
    'geo.position': '30.3727;-94.3099',
    ICBM: '30.3727, -94.3099',
  },
};

// ─── Listing data (Airbnb ID 1461278647776104058) ──────────────────────────────

const listing = {
  name: 'The Glamping Spot',
  type: 'Dome',
  location: 'Kountze, Texas, United States',
  capacity: 6,
  bedrooms: 2,
  beds: 2,
  bathrooms: 1,
  description:
    'Wake up to the sounds of nature, explore scenic trails right outside your door, or simply relax on the spacious wooden deck overlooking a serene private pond. In the evenings, unwind under the stars with soft ambient lighting and the warm glow of the dome. Perfect for couples, solo travelers, or anyone looking to disconnect and recharge, this secluded getaway blends luxury comfort with the beauty of the East Texas wilderness.',
  images: [
    { src: '/images/glamping-dome.jpg', alt: 'The Glamping Spot geodesic dome exterior at night with ambient lighting' },
    { src: '/images/lakeside.jpg', alt: 'Geodesic dome overlooking the serene private pond' },
    { src: '/images/deck.jpg', alt: 'Spacious wooden deck at The Glamping Spot' },
    { src: '/images/dining.jpg', alt: 'Interior dining area inside the geodesic dome' },
    { src: '/images/bathroom.jpg', alt: 'Bathroom inside The Glamping Spot dome' },
  ],
  amenities: [
    { icon: 'lake', label: 'Lake access' },
    { icon: 'kitchen', label: 'Kitchen' },
    { icon: 'wifi', label: 'Wifi' },
    { icon: 'parking', label: 'Free parking on premises – 4 spaces' },
    { icon: 'tv', label: 'TV with premium cable' },
    { icon: 'deck', label: 'Spacious wooden deck' },
    { icon: 'pond', label: 'Private pond' },
    { icon: 'trails', label: 'Scenic trails' },
    { icon: 'co', label: 'Carbon monoxide alarm' },
    { icon: 'smoke', label: 'Smoke alarm' },
    { icon: 'camera', label: 'Exterior security cameras on property' },
  ],
  host: 'Ivan',
  checkIn: '2:00 PM',
  checkOut: '12:00 PM',
  maxGuests: 6,
};

// ─── Amenity icon map ──────────────────────────────────────────────────────────

function AmenityIcon({ type }: { type: string }) {
  const cls = 'w-5 h-5 text-gray-500';
  const paths: Record<string, React.ReactNode> = {
    lake: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15c1.5 0 3-1 4.5-1s3 1 4.5 1 3-1 4.5-1 3 1 4.5 1M3 19c1.5 0 3-1 4.5-1s3 1 4.5 1 3-1 4.5-1 3 1 4.5 1M12 3v8" />,
    kitchen: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />,
    wifi: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />,
    parking: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3m0 0h3l3 3v4h-3m-3 0H9M7 17a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />,
    tv: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    deck: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    pond: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3s-5 5-5 9a5 5 0 0010 0c0-4-5-9-5-9z" />,
    trails: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />,
    co: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
    smoke: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />,
    camera: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 00-2 2v4a2 2 0 002 2h9a2 2 0 002-2V10a2 2 0 00-2-2H3z" />,
  };
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      {paths[type] ?? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />}
    </svg>
  );
}

// ─── Airbnb logo ───────────────────────────────────────────────────────────────

function AirbnbIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1000 1000" fill="currentColor" aria-hidden="true">
      <path d="M499.3 736.7c-51-64-81-120.1-91-168.1-10-39-6-70 11-93 18-27 45-40 80-40s62 13 80 40c17 23 21 54 11 93-10 48-40 104.1-91 168.1zm362.2 43c-7 47-39 86-83 105-85 37-169.1-22-241.1-102 119.1-149.1 141.1-265.1 90-340.2-30-43-73-64-128.1-64-111 0-172.1 94-148.1 203.1 14 59 51 124.1 107 192.1-37 41-77.1 72-116.1 93-41 19-81 23-117 8-49-18-81-61-83-111-3-50 21-102 68-140.1l16-12s24-18 72.1-44c16-8 33-17 51-26-9-12-18-24-27-35-46-59-76-117.1-88-171.1C92 270.1 176 176 279 176c55 0 97 20 138.1 63l10 11 10-11c41-43 83-63 138.1-63 103 0 187.1 94.1 160.1 228.1-12 54-41 112.1-88 171.1-9 11-18 23-27 35 18 9 35 18 51 26 48.1 26 72.1 44 72.1 44l16 12c47 38.1 71 90.1 68 140.1z" />
    </svg>
  );
}

// ─── JSON-LD ───────────────────────────────────────────────────────────────────

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'The Glamping Spot',
  description: listing.description,
  url: 'https://theglampingspot.com/properties',
  image: listing.images.map((i) => i.src),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kountze',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 30.3727, longitude: -94.3099 },
  amenityFeature: listing.amenities.map((a) => ({
    '@type': 'LocationFeatureSpecification',
    name: a.label,
    value: true,
  })),
  checkinTime: listing.checkIn,
  checkoutTime: listing.checkOut,
  numberOfRooms: listing.bedrooms,
  petsAllowed: false,
};

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>

      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-emerald-600 transition-colors focus:outline-none focus:underline">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-900 font-medium" aria-current="page">Our Dome</li>
          </ol>
        </nav>

        {/* Property header */}
        <header className="mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">{listing.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium text-xs">
                  ★ New listing
                </span>
                <span>{listing.type} · {listing.location}</span>
              </div>
            </div>
            <a
              href={AIRBNB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#FF385C] transition-colors focus:outline-none focus:underline"
              aria-label="View this listing on Airbnb"
            >
              <AirbnbIcon className="w-4 h-4 text-[#FF385C]" />
              View on Airbnb
            </a>
          </div>
        </header>

        {/* Photo gallery */}
        <PropertyGallery images={listing.images} airbnbUrl={AIRBNB_URL} />

        {/* Main content — details left, booking card right */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Left: Property details ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Host + summary */}
            <div className="pb-8 border-b border-gray-100">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    {listing.type} hosted by {listing.host}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {listing.capacity} guests &nbsp;·&nbsp; {listing.bedrooms} bedrooms &nbsp;·&nbsp; {listing.beds} beds &nbsp;·&nbsp; {listing.bathrooms} bath
                  </p>
                </div>
                <div className="shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg">
                  {listing.host[0]}
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="pb-8 border-b border-gray-100 space-y-4">
              {[
                { icon: 'deck', title: 'Scenic private pond views', desc: 'Relax on the spacious wooden deck overlooking a serene private pond.' },
                { icon: 'trails', title: 'Nature at your doorstep', desc: 'Explore scenic trails and the beauty of the East Texas wilderness.' },
                { icon: 'co', title: 'Safety first', desc: 'Exterior security cameras, carbon monoxide alarm, and smoke alarm on property.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="shrink-0 mt-0.5 text-gray-500">
                    <AmenityIcon type={icon} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{title}</p>
                    <p className="text-gray-500 text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="pb-8 border-b border-gray-100">
              <p className="text-gray-700 leading-relaxed">{listing.description}</p>
            </div>

            {/* Amenities */}
            <div className="pb-8 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">What this place offers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {listing.amenities.map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-3 text-gray-700 text-sm">
                    <AmenityIcon type={icon} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <a
                href={AIRBNB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-800 border border-gray-800 rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800"
                aria-label="Show all 33 amenities on Airbnb"
              >
                Show all 33 amenities
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* House rules */}
            <div className="pb-8 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Things to know</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">House rules</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>Check-in after {listing.checkIn}</li>
                    <li>Checkout before {listing.checkOut}</li>
                    <li>{listing.maxGuests} guests maximum</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Safety &amp; property</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>Exterior security cameras</li>
                    <li>Carbon monoxide alarm</li>
                    <li>Smoke alarm</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Cancellation policy</h3>
                  <p className="text-sm text-gray-600">
                    Add your trip dates to get the cancellation details for this stay.
                  </p>
                  <a
                    href={AIRBNB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-gray-800 underline hover:text-[#FF385C] transition-colors mt-1 inline-block focus:outline-none"
                  >
                    Add dates on Airbnb
                  </a>
                </div>
              </div>
            </div>

            {/* Where you'll be */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Where you&apos;ll be</h2>
              <p className="text-gray-600 text-sm mb-4">{listing.location}</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Located in the heart of the Big Thicket region — one of the most biodiverse areas in the
                United States, home to rare orchids, carnivorous plants, and abundant wildlife. The nearest
                city is Kountze, TX, with Houston just over an hour away.
              </p>
            </div>
          </div>

          {/* ── Right: Booking card ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-gray-200 rounded-2xl shadow-xl overflow-hidden">

              {/* Card header */}
              <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                <p className="text-sm text-gray-500 font-medium">Add dates for pricing</p>
                <p className="text-xs text-gray-400 mt-0.5">Exact price shown on Airbnb after selecting dates</p>
              </div>

              {/* Date + guest fields */}
              <div className="divide-y divide-gray-100">
                <div className="grid grid-cols-2 divide-x divide-gray-100">
                  <div className="px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Check-in</p>
                    <p className="text-sm text-gray-400">Add date</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Checkout</p>
                    <p className="text-sm text-gray-400">Add date</p>
                  </div>
                </div>
                <div className="px-5 py-4 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Guests</p>
                    <p className="text-sm text-gray-600">Up to {listing.capacity} guests</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Book CTA */}
              <div className="px-6 py-5 space-y-3 bg-gray-50">
                <a
                  href={AIRBNB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-[#FF385C] hover:bg-[#e0314f] text-white font-bold rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2"
                  aria-label="Book The Glamping Spot on Airbnb — opens in a new tab"
                >
                  <AirbnbIcon className="w-5 h-5" />
                  Book on Airbnb
                </a>
                <p className="text-center text-xs text-gray-400">You won&apos;t be charged yet</p>

                {/* AirCover */}
                <div className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100 mt-2">
                  <svg className="w-5 h-5 text-[#FF385C] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="text-xs font-bold text-gray-800">AirCover included</p>
                    <p className="text-xs text-gray-500">Top-to-bottom protection, only on Airbnb.</p>
                  </div>
                </div>
              </div>

              {/* House rules summary */}
              <div className="px-6 py-4 border-t border-gray-100 space-y-1 text-xs text-gray-500">
                <div className="flex justify-between"><span>Check-in</span><span className="font-medium text-gray-700">After {listing.checkIn}</span></div>
                <div className="flex justify-between"><span>Checkout</span><span className="font-medium text-gray-700">Before {listing.checkOut}</span></div>
                <div className="flex justify-between"><span>Max guests</span><span className="font-medium text-gray-700">{listing.maxGuests}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-20 bg-gray-50 rounded-2xl p-8" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-8">Frequently asked questions</h2>
          <div className="space-y-4 max-w-3xl">
            {[
              {
                q: "What's included in the dome stay?",
                a: "The dome includes lake access, a full kitchen, Wifi, TV with premium cable, free parking for 4 vehicles, and a spacious wooden deck overlooking a private pond. Carbon monoxide and smoke alarms are also on the property for your safety.",
              },
              {
                q: 'How many guests can stay?',
                a: `The dome sleeps up to ${listing.capacity} guests across ${listing.bedrooms} bedrooms with ${listing.beds} beds and ${listing.bathrooms} bathroom.`,
              },
              {
                q: 'What are the check-in and checkout times?',
                a: `Check-in is after ${listing.checkIn} and checkout is before ${listing.checkOut}.`,
              },
              {
                q: 'What activities are available nearby?',
                a: 'Guests can explore scenic trails directly from the property, fish in the private pond, and visit the Big Thicket National Preserve — one of the most biodiverse areas in the US — just minutes away. Kountze and other East Texas towns are also nearby.',
              },
              {
                q: 'How do I book?',
                a: 'All bookings are handled securely through Airbnb. Click "Book on Airbnb" to select your dates, see pricing, and complete your reservation with AirCover guest protection included.',
              },
              {
                q: 'What is the cancellation policy?',
                a: 'Cancellation terms depend on your selected dates. Add your travel dates on Airbnb to see the exact cancellation policy for your stay.',
              },
            ].map(({ q, a }) => (
              <details key={q} className="group bg-white rounded-xl shadow-sm border border-gray-100">
                <summary className="flex justify-between items-center cursor-pointer py-4 px-6 list-none">
                  <h3 className="font-semibold text-gray-900 text-sm pr-4">{q}</h3>
                  <svg className="w-4 h-4 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">{a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <aside className="mt-16 bg-[#FF385C] rounded-2xl p-8 text-white text-center" aria-labelledby="footer-cta-heading">
          <AirbnbIcon className="w-10 h-10 mx-auto mb-4 opacity-80" />
          <h2 id="footer-cta-heading" className="text-2xl font-bold mb-3">Ready to book your stay?</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto text-sm leading-relaxed">
            Check availability, select your dates, and book securely through Airbnb. AirCover guest protection included with every stay.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={AIRBNB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-[#FF385C] font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#FF385C]"
              aria-label="Book on Airbnb — opens in a new tab"
            >
              <AirbnbIcon className="w-5 h-5" />
              Book on Airbnb
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white/60 text-white font-semibold rounded-xl hover:border-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#FF385C]"
            >
              Contact Us
            </Link>
          </div>
        </aside>
      </main>
    </div>
  );
}
