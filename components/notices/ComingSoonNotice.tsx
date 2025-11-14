"use client";

/**
 * Coming Soon Notice Component
 * Displays a prominent notice that The Glamping Spot is not yet open for bookings
 */
export default function ComingSoonNotice() {
  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 py-16 sm:py-20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-emerald-500">
          <div className="p-8 sm:p-12 text-center">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 sm:w-12 sm:h-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Opening Soon! 🎉
            </h2>

            {/* Main Message */}
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-lg sm:text-xl text-gray-700 mb-4 leading-relaxed">
                <strong className="text-emerald-600">The Glamping Spot is not yet open for reservations.</strong>
              </p>
              <p className="text-base sm:text-lg text-gray-600 mb-4">
                We're putting the finishing touches on our luxury geodesic domes and preparing an unforgettable
                glamping experience for you. Our team is working hard to create the perfect blend of nature,
                comfort, and adventure in the heart of East Texas.
              </p>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200">
                <div className="text-3xl mb-3">🏕️</div>
                <h3 className="font-semibold text-gray-900 mb-2">Luxury Domes</h3>
                <p className="text-sm text-gray-600">Premium geodesic dome accommodations with stunning views</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <div className="text-3xl mb-3">⭐</div>
                <h3 className="font-semibold text-gray-900 mb-2">Stargazing</h3>
                <p className="text-sm text-gray-600">Crystal-clear night skies perfect for celestial viewing</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                <div className="text-3xl mb-3">🌲</div>
                <h3 className="font-semibold text-gray-900 mb-2">Nature Trails</h3>
                <p className="text-sm text-gray-600">Explore the beauty of the Big Thicket National Preserve</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">Stay Updated</h3>
              <p className="text-base mb-6">
                Be the first to know when we open! Subscribe to our newsletter for exclusive launch offers,
                sneak peeks, and priority booking access.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <span className="inline-flex items-center px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg shadow-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Newsletter signup below ↓
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-4">Follow our journey on social media</p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://instagram.com/theglampingspot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transform hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  aria-label="Follow us on Instagram (opens in new tab)"
                >
                  <span className="text-xl">📸</span>
                </a>
                <a
                  href="https://facebook.com/theglampingspot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:shadow-lg transform hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Follow us on Facebook (opens in new tab)"
                >
                  <span className="text-xl">📘</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
