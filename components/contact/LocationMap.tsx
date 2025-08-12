'use client';

import React, { useState } from 'react';

/**
 * Interactive location map component with accessibility features
 */
export function LocationMap() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  
  const directions = [
    {
      from: 'Houston',
      time: '1 hour',
      description: 'Take US-90 East to TX-326 North, then follow signs to Kountze'
    },
    {
      from: 'Beaumont',
      time: '30 minutes',
      description: 'Take US-69 North to TX-326, turn left toward Kountze'
    },
    {
      from: 'Dallas',
      time: '4.5 hours',
      description: 'Take I-45 South to US-59 East, then US-69 North to Kountze'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-8">
        <h2 id="location-heading" className="text-2xl font-bold text-gray-900 mb-6">
          Our Location
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Container */}
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center border border-gray-200">
              {!isMapLoaded ? (
                <div className="text-center">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <button
                    onClick={() => setIsMapLoaded(true)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Load Interactive Map
                  </button>
                  <p className="text-sm text-gray-500 mt-2">Click to load Google Maps</p>
                </div>
              ) : (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.123456789!2d-94.3099!3d30.3727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDIyJzIxLjciTiA5NMKwMTgnMzUuNiJX!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="256"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Glamping Spot Location Map"
                  className="rounded-lg"
                />
              )}
            </div>
            
            {/* Address Information */}
            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
              <h3 className="font-semibold text-emerald-800 mb-2">Physical Address</h3>
              <address className="not-italic text-emerald-700">
                123 Glamping Way<br />
                Kountze, TX 77625<br />
                United States
              </address>
              
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href="https://maps.google.com/?q=123+Glamping+Way+Kountze+TX+77625"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 bg-emerald-600 text-white text-sm rounded-full hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Open in Google Maps
                  <svg className="ml-1 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                
                <a
                  href="https://www.waze.com/ul?q=123%20Glamping%20Way%20Kountze%20TX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Open in Waze
                  <svg className="ml-1 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Driving Directions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Driving Directions</h3>
            
            <div className="space-y-4">
              {directions.map((direction, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">From {direction.from}</h4>
                    <span className="text-sm text-emerald-600 font-medium">{direction.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{direction.description}</p>
                </div>
              ))}
            </div>
            
            {/* Nearby Landmarks */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Nearby Landmarks</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Big Thicket National Preserve (5 minutes)</li>
                <li>• Village Creek State Park (15 minutes)</li>
                <li>• Kountze City Center (10 minutes)</li>
                <li>• Local restaurants and gas stations (8 minutes)</li>
              </ul>
            </div>
            
            {/* Arrival Instructions */}
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">Arrival Instructions</h4>
              <div className="text-sm text-yellow-700 space-y-1">
                <p>• Look for The Glamping Spot entrance sign</p>
                <p>• Follow the gravel road to the check-in office</p>
                <p>• Parking is available next to each dome</p>
                <p>• Call us if you have trouble finding us: (123) 456-7890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}