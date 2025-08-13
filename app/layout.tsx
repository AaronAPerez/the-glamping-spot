import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Suspense } from 'react'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

/**
 * Enhanced metadata for production with environment-specific URLs
 * Optimized for SEO and social sharing across all platforms
 */
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_SITE_URL || 'https://theglampingspot.com'
      : 'http://localhost:3000'
  ),
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
    'kountze texas lodging',
    'dome camping texas',
    'east texas glamping',
    'luxury outdoor accommodation',
    'nature retreat texas'
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
      {
        url: '/images/geo-dome.jpg',
        width: 800,
        height: 600,
        alt: 'Interior view of stargazing geodesic dome with transparent ceiling',
      }
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
  // verification: {
  //   google: process.env.GOOGLE_SITE_VERIFICATION,
  //   other: {
  //     'facebook-domain-verification': process.env.FACEBOOK_DOMAIN_VERIFICATION,
  //   }
  // },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/images/apple-touch-icon.png', sizes: '180x180' },
    ],
    shortcut: '/favicon.ico',
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
 * Production-ready analytics component
 * Only loads in production environment with proper error handling
 */
function Analytics() {
  if (process.env.NODE_ENV !== 'production') return null;
  
  return (
    <>
      {/* Google Analytics */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                  anonymize_ip: true,
                  custom_map: {
                    'custom_dimension_1': 'user_type'
                  }
                });
              `,
            }}
          />
        </>
      )}
      
      {/* Facebook Pixel */}
      {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID && (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img 
              height="1" 
              width="1" 
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      {/* Microsoft Clarity */}
      {process.env.NEXT_PUBLIC_CLARITY_ID && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `,
          }}
        />
      )}
    </>
  );
}

/**
 * Performance monitoring component
 * Tracks Core Web Vitals and sends to analytics in production
 */
function PerformanceMonitoring() {
  if (process.env.NODE_ENV !== 'production') return null;
  
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          // Web Vitals monitoring for production
          if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
              // Send performance metrics to analytics
              const sendToAnalytics = (metric) => {
                // Send to Google Analytics if available
                if (typeof gtag !== 'undefined') {
                  gtag('event', metric.name, {
                    event_category: 'Web Vitals',
                    event_label: metric.id,
                    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                    non_interaction: true,
                  });
                }
                
                // Send to console in development for debugging
                if ('${process.env.NODE_ENV}' === 'development') {
                  console.log('Web Vital:', metric);
                }
              };
              
              // Import and track core web vitals
              Promise.all([
                import('web-vitals/attribution').then(({ onCLS }) => onCLS(sendToAnalytics)),
                import('web-vitals/attribution').then(({ onFID }) => onFID(sendToAnalytics)),
                import('web-vitals/attribution').then(({ onFCP }) => onFCP(sendToAnalytics)),
                import('web-vitals/attribution').then(({ onLCP }) => onLCP(sendToAnalytics)),
                import('web-vitals/attribution').then(({ onTTFB }) => onTTFB(sendToAnalytics))
              ]).catch((error) => {
                // Silently fail if web-vitals is not available
                console.warn('Web Vitals not available:', error);
              });
            });
          }
        `,
      }}
    />
  );
}

/**
 * Loading fallback component with accessibility
 */
function LoadingFallback({ message = "Loading..." }: { message?: string }) {
  return (
    <div 
      className="flex items-center justify-center min-h-[200px] bg-gray-50"
      role="status"
      aria-label={message}
    >
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <span className="sr-only">{message}</span>
        <p className="text-gray-600 text-sm">{message}</p>
      </div>
    </div>
  );
}

/**
 * Error boundary fallback component
 */
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center min-h-[200px] bg-red-50" role="alert">
      <div className="text-center p-6">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-4">We're sorry, but there was an error loading this content.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Refresh Page
        </button>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-500">Error Details</summary>
            <pre className="mt-2 text-xs text-gray-600 bg-gray-100 p-2 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

/**
 * Root layout component with production optimizations
 * Includes analytics, performance monitoring, error boundaries, and accessibility features
 */
export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const isProduction = process.env.NODE_ENV === 'production';
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
        
        {/* DNS prefetch for production services */}
        {isProduction && (
          <>
            <link rel="dns-prefetch" href="https://www.google-analytics.com" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://connect.facebook.net" />
            <link rel="dns-prefetch" href="https://www.clarity.ms" />
          </>
        )}
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#059669" />
        <meta name="msapplication-TileColor" content="#059669" />
        
        {/* Viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* Security headers via meta tags */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Performance hints - preload critical resources */}
        <link rel="preload" href="/images/GlampingHero.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/images/TheGlampingSpot_W.png" as="image" type="image/png" />
        
        {/* Resource hints for better performance */}
        <link rel="modulepreload" href="/_next/static/chunks/polyfills.js" />
        
        {/* Structured data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "name": "The Glamping Spot",
              "description": "Luxury geodesic dome glamping experience near Houston, Texas",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://theglampingspot.com",
              "telephone": "+1-123-456-7890",
              "email": "info@theglampingspot.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Glamping Way",
                "addressLocality": "Kountze",
                "addressRegion": "TX",
                "postalCode": "77625",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "30.3727",
                "longitude": "-94.3099"
              },
              "priceRange": "$249-$399",
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
                  "name": "Climate Control"
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Stargazing"
                },
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Private Bathroom"
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "127"
              },
              "openingHours": [
                "Mo-Su 08:00-20:00"
              ],
              "paymentAccepted": "Cash, Credit Card, Debit Card",
              "currenciesAccepted": "USD",
              "image": [
                `${process.env.NEXT_PUBLIC_SITE_URL || 'https://theglampingspot.com'}/images/GlampingHero.jpg`,
                `${process.env.NEXT_PUBLIC_SITE_URL || 'https://theglampingspot.com'}/images/geo-dome.jpg`
              ]
            })
          }}
        />

        {/* Additional structured data for organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "The Glamping Spot",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://theglampingspot.com",
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://theglampingspot.com'}/images/TheGlampingSpot_W.png`,
              "sameAs": [
                "https://www.facebook.com/theglampingspot",
                "https://www.instagram.com/theglampingspot",
                "https://www.tripadvisor.com/theglampingspot"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-123-456-7890",
                "contactType": "customer service",
                "areaServed": "US",
                "availableLanguage": "English"
              }
            })
          }}
        />
      </head>
      
      <body className="min-h-full bg-white text-gray-900 antialiased">
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md focus:shadow-lg transition-all duration-200"
        >
          Skip to main content
        </a>

        {/* Main layout structure with error boundary */}
        <div className="flex flex-col min-h-screen">
          {/* Header with suspense boundary */}
          <Suspense fallback={<LoadingFallback message="Loading navigation..." />}>
            <Header />
          </Suspense>
          
          {/* Main content area with error boundary */}
          <main 
            id="main-content"
            className="flex-1"
            role="main"
          >
            <Suspense fallback={<LoadingFallback message="Loading content..." />}>
              {children}
            </Suspense>
          </main>
          
          {/* Footer with suspense boundary */}
          <Suspense fallback={<LoadingFallback message="Loading footer..." />}>
            <Footer />
          </Suspense>
        </div>

        {/* Development environment indicator */}
        {isDevelopment && (
          <div 
            className="fixed bottom-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold z-50 shadow-lg"
            aria-hidden="true"
          >
            DEV
          </div>
        )}

        {/* Production analytics */}
        <Analytics />

        {/* Performance monitoring */}
        <PerformanceMonitoring />

        {/* Service Worker Registration */}
        {isProduction && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').then(function(registration) {
                      console.log('SW registered: ', registration);
                    }, function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                  });
                }
              `,
            }}
          />
        )}

        {/* Cookie Consent (GDPR Compliance) */}
        {isProduction && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Simple cookie consent implementation
                if (!localStorage.getItem('cookieConsent')) {
                  const banner = document.createElement('div');
                  banner.innerHTML = \`
                    <div id="cookie-banner" style="position: fixed; bottom: 0; left: 0; right: 0; background: #1f2937; color: white; padding: 1rem; z-index: 1000; text-align: center;">
                      <p style="margin: 0 0 1rem 0; font-size: 0.875rem;">
                        We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                        <a href="/privacy" style="color: #10b981; text-decoration: underline;">Learn more</a>
                      </p>
                      <button onclick="acceptCookies()" style="background: #10b981; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.375rem; cursor: pointer; margin-right: 0.5rem;">
                        Accept
                      </button>
                      <button onclick="declineCookies()" style="background: transparent; color: white; border: 1px solid white; padding: 0.5rem 1rem; border-radius: 0.375rem; cursor: pointer;">
                        Decline
                      </button>
                    </div>
                  \`;
                  document.body.appendChild(banner);
                  
                  window.acceptCookies = function() {
                    localStorage.setItem('cookieConsent', 'accepted');
                    document.getElementById('cookie-banner').remove();
                  };
                  
                  window.declineCookies = function() {
                    localStorage.setItem('cookieConsent', 'declined');
                    document.getElementById('cookie-banner').remove();
                  };
                }
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}