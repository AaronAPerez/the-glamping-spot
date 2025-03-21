import React from 'react'
import Link from 'next/link';

/**
 * Footer component containing site information, navigation links and copyright
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">The Glamping Spot</h2>
            <p className="text-gray-300">Luxury outdoor experiences in nature&apos;s most beautiful locations.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <nav aria-label="Footer Navigation">
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-300 hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact</h2>
            <address className="not-italic">
              <p className="text-gray-300">
                <a href="mailto:info@theglampingspot.com" className="hover:text-white">
                  info@theglampingspot.com
                </a>
              </p>
              <p className="text-gray-300">
                <a href="tel:+15551234567" className="hover:text-white">
                  +1 (555) 123-4567
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">© {currentYear} The Glamping Spot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
