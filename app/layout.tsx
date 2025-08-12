import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true, // Optimize font loading
});

/**
 * Enhanced metadata for better SEO and social sharing
 */
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://theglampingspot.com'),
  title: {
    default: 'The Glamping Spot - Luxury Geodesic Dome Glamping Near Houston, Texas',
    template: '%s | The Glamping Spot'
  },
  description: 'Experience luxury glamping in geodesic domes near Houston, TX with premium amenities, stunning views, stargazing, hot tubs, and exciting outdoor activities.',
  keywords: [
    'glamping texas',
    'houston glamping', 
    'geodesic domes texas',
    'luxury camping houston',
    'texas outdoor getaway',
    'stargazing accommodation',
    'big thicket glamping',
    'kountze texas lodging'
  ].join(', '),
  authors: [{ name: 'The Glamping Spot' }],
  creator: 'The Glamping Spot',
  publisher: 'The Glamping Spot',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'The Glamping Spot',
    title: 'The Glamping Spot - Luxury Geodesic Dome Glamping Near Houston, Texas',
    description: 'Experience luxury glamping in geodesic domes near Houston, TX with premium amenities, stunning views, and exciting activities.',
    images: [
      {
        url: '/images/GlampingHero.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury geodesic dome glamping experience at The Glamping Spot near Houston, Texas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@theglampingspot',
    creator: '@theglampingspot',
    title: 'The Glamping Spot - Luxury Geodesic Dome Glamping Near Houston, Texas',
    description: 'Experience luxury glamping in geodesic domes near Houston, TX with premium amenities, stunning views, and exciting activities.',
    images: ['/images/GlampingHero.jpg'],
  },
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: '/images/TheGlampingSpot_W.png', sizes: 'any' },
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/images/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'geo.region': 'US-TX',
    'geo.placename': 'Kountze, Texas',
    'geo.position': '30.3727;-94.3099',
    'ICBM': '30.3727, -94.3099',
  },
}

/**
 * Root layout component with enhanced accessibility, performance, and SEO optimizations
 */
export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <html 
      lang="en" 
      className={`${inter.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for faster connections */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#059669" />
        <meta name="msapplication-TileColor" content="#059669" />
        
        {/* Viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* Security headers via meta tags */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        
        {/* Performance hints */}
        <link rel="preload" href="/images/GlampingHero.jpg" as="image" />
        
        {/* Structured data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristAttraction",
              "name": "The Glamping Spot",
              "description": "Luxury geodesic dome glamping experience near Houston, Texas",
              "url": "https://theglampingspot.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kountze",
                "addressRegion": "TX",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "30.3727",
                "longitude": "-94.3099"
              },
              "amenityFeature": [
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Hot Tub"
                },
                {
                  "@type": "LocationFeatureSpecification", 
                  "name": "WiFi"
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Air Conditioning"
                }
              ]
            })
          }}
        />
      </head>
      
      <body className="min-h-full bg-white text-gray-900 antialiased">
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>

        {/* Main layout structure */}
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <Header />
          
          {/* Main content area */}
          <main 
            id="main-content"
            className="flex-1 "
            role="main"
          >
            {children}
          </main>
          
          {/* Footer */}
          <Footer />
        </div>

        {/* Development environment indicator */}
        {isDevelopment && (
          <div 
            className="environment-indicator"
            aria-hidden="true"
          >
            DEV
          </div>
        )}

        {/* Performance monitoring script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Web Vitals monitoring
              if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                  import('/js/web-vitals.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                    getCLS(console.log);
                    getFID(console.log);
                    getFCP(console.log);
                    getLCP(console.log);
                    getTTFB(console.log);
                  }).catch(() => {
                    // Silently fail if web-vitals is not available
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}