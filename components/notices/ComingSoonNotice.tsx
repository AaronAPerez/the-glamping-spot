"use client";

/**
 * Coming Soon Notice Component
 * Displays a prominent notice that The Glamping Spot is not yet open for bookings
 */
export default function ComingSoonNotice() {
  return (
    <section className="relative bg-gradient-to-b from-black/50 to-emerald-100 py-20 sm:py-24">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-200">
          <div className="p-10 sm:p-16 text-center">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-12 h-12 sm:w-14 sm:h-14 text-white"
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
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Opening Soon! 🎉
            </h2>

            {/* Main Message */}
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-xl sm:text-2xl text-emerald-600 font-semibold mb-6 leading-relaxed">
                The Glamping Spot is not yet open for reservations.
              </p>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                We're putting the finishing touches on our luxury geodesic domes and preparing an unforgettable
                glamping experience for you. Our team is working hard to create the perfect blend of nature,
                comfort, and adventure in the heart of East Texas.
              </p>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl border border-emerald-200 hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">🏕️</div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Luxury Domes</h3>
                <p className="text-gray-600 leading-relaxed">Premium geodesic dome accommodations with stunning views</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-200 hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Stargazing</h3>
                <p className="text-gray-600 leading-relaxed">Crystal-clear night skies perfect for celestial viewing</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl border border-emerald-200 hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">🌲</div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Nature Trails</h3>
                <p className="text-gray-600 leading-relaxed">Explore the beauty of the Big Thicket National Preserve</p>
              </div>
            </div>

            {/* Call to Action */}
            {/* <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl p-8 text-white">
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
            </div> */}

            {/* Social Media */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-4">Follow our journey on social media</p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://instagram.com/the.glamping.spot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transform hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  aria-label="Follow us on Instagram (opens in new tab)"
                >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
              </svg>
                </a>
                <a
                  href="https://www.facebook.com/people/The-Glamping-Spot/61574219567434/#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:shadow-lg transform hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Follow us on Facebook (opens in new tab)"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
