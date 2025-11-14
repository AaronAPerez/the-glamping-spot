import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

/**
 * Enhanced SEO metadata for contact page
 */
export const metadata: Metadata = {
  title: 'Contact The Glamping Spot | Coming Soon',
  description: 'The Glamping Spot is currently under development. Check back soon for our luxury geodesic dome glamping experiences in East Texas.',
  robots: {
    index: false,
    follow: true,
  },
};

/**
 * Contact page - Currently disabled as site is in development
 */
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50 to-blue-50">
      {/* Skip to main content for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Breadcrumb navigation */}
        <nav
          className="pb-8"
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
              Contact
            </li>
          </ol>
        </nav>

        {/* Main content */}
        <main id="main-content" className="text-center">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-500 p-12">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Contact Form Coming Soon
            </h1>

            {/* Message */}
            <div className="max-w-2xl mx-auto mb-8">
              <p className="text-xl text-gray-700 mb-4">
                <strong className="text-amber-600">The Glamping Spot is not yet open for business.</strong>
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We're currently in development and preparing to launch our luxury geodesic dome glamping experience.
                Our contact form and reservation system will be available once we're ready to welcome guests.
              </p>
            </div>

            {/* What to do instead */}
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 mb-8 border border-emerald-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Stay Connected
              </h2>
              <p className="text-gray-700 mb-6">
                Want to be notified when we launch? Subscribe to our newsletter on the homepage for:
              </p>

              <ul className="text-left max-w-md mx-auto space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Early access to booking when we launch</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Exclusive launch discounts and offers</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Behind-the-scenes updates and sneak peeks</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Grand opening announcements</span>
                </li>
              </ul>

              <Link
                href="/#newsletter"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Subscribe to Newsletter
              </Link>
            </div>

            {/* Social Media */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-4 font-medium">Follow our journey on social media</p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://instagram.com/the.glamping.spot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transform hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  aria-label="Follow us on Instagram (opens in new tab)"
                >
                  <span className="text-2xl">📸</span>
                </a>
                <a
                  href="https://facebook.com/theglampingspot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full hover:shadow-lg transform hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Follow us on Facebook (opens in new tab)"
                >
                  <span className="text-2xl">📘</span>
                </a>
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-10">
              <Link
                href="/"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-2 py-1"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return to Homepage
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}