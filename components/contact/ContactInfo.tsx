'use client';

import React from 'react';

/**
 * Contact information component with accessibility and structured data
 */
export function ContactInfo() {
  const contactDetails = [
    {
      title: 'Reservations',
      phone: '(123) 456-7890',
      email: 'reservations@theglampingspot.com',
      hours: 'Daily 8 AM - 8 PM CST',
      description: 'Book your luxury geodesic dome experience'
    },
    {
      title: 'Guest Services',
      phone: '(123) 456-7890',
      email: 'guest@theglampingspot.com',
      hours: 'Daily 8 AM - 8 PM CST',
      description: 'Support during your stay'
    },
    {
      title: 'Groups & Events',
      phone: '(123) 456-7892',
      email: 'events@theglampingspot.com',
      hours: 'Mon-Fri 9 AM - 5 PM CST',
      description: 'Corporate retreats, weddings, special occasions'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 id="contact-info-heading" className="text-2xl font-bold text-gray-900 mb-6">
        Contact Information
      </h2>
      
      <div className="space-y-6">
        {contactDetails.map((contact, index) => (
          <div key={index} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{contact.title}</h3>
            <p className="text-gray-600 mb-3">{contact.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a 
                  href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="text-emerald-600 hover:text-emerald-700 font-medium focus:outline-none focus:underline"
                >
                  {contact.phone}
                </a>
              </div>
              
              <div className="flex items-center">
                <svg className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a 
                  href={`mailto:${contact.email}`}
                  className="text-emerald-600 hover:text-emerald-700 font-medium focus:outline-none focus:underline"
                >
                  {contact.email}
                </a>
              </div>
              
              <div className="flex items-center">
                <svg className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-600">{contact.hours}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Additional Contact Methods */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Ways to Connect</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://instagram.com/theglampingspot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.219-5.175 1.219-5.175s-.31-.641-.31-1.59c0-1.487.873-2.6 1.967-2.6.927 0 1.377.695 1.377 1.528 0 .93-.593 2.322-.898 3.61-.255 1.075.538 1.951 1.601 1.951 1.92 0 3.397-2.025 3.397-4.947 0-2.591-1.862-4.395-4.526-4.395-3.081 0-4.888 2.315-4.888 4.712 0 .934.358 1.935.805 2.474.088.107.101.201.075.309-.082.33-.266 1.07-.302 1.22-.047.196-.154.238-.355.143-1.327-.619-2.158-2.563-2.158-4.124 0-3.406 2.474-6.535 7.131-6.535 3.742 0 6.654 2.667 6.654 6.231 0 3.718-2.344 6.711-5.598 6.711-1.093 0-2.122-.57-2.474-1.25 0 0-.542 2.067-.674 2.57-.244.952-.9 2.144-1.339 2.87 1.009.313 2.077.472 3.176.472 6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
            </svg>
            <div className="text-left">
              <div className="font-medium">Instagram</div>
              <div className="text-sm opacity-90">@theglampingspot</div>
            </div>
          </a>
          
          <a
            href="https://facebook.com/theglampingspot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <div className="text-left">
              <div className="font-medium">Facebook</div>
              <div className="text-sm opacity-90">The Glamping Spot</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}