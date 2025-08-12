'use client';

import React, { useState } from 'react';

/**
 * FAQ section with accessible collapsible content
 */
export function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is included in my geodesic dome stay?",
      answer: "Each dome includes luxury bedding, private bathroom, climate control, Wi-Fi, hot tub access, fire pit, basic kitchenette, and complimentary coffee/tea. Specific amenities vary by dome type - check individual property listings for details."
    },
    {
      question: "What is your cancellation policy?",
      answer: "We offer free cancellation up to 7 days before your check-in date. Cancellations within 7 days are subject to a 50% charge. No-shows or same-day cancellations forfeit the full payment. Weather-related cancellations may have different terms."
    },
    {
      question: "Are pets allowed?",
      answer: "Select properties are pet-friendly with advance notice and a $75 additional fee per stay. Maximum 2 pets per reservation. Pets must be leashed when outside and cannot be left unattended in the domes. Please contact us during booking to arrange pet accommodations."
    },
    {
      question: "What activities are available nearby?",
      answer: "We're 5 minutes from Big Thicket National Preserve offering hiking, bird watching, and wildlife viewing. On-site we have ATV trails, fire pit areas, and stargazing. Nearby you'll find Village Creek State Park (15 min), fishing spots, and local restaurants."
    },
    {
      question: "What should I bring for my stay?",
      answer: "We provide all bedding, towels, and basic amenities. Bring comfortable clothes, sunscreen, insect repellent, camera, and any personal items. For activities, bring hiking shoes, swimwear, and weather-appropriate clothing. We have a packing checklist we can email you."
    },
    {
      question: "Do you accommodate dietary restrictions or accessibility needs?",
      answer: "Yes! Please let us know about any dietary restrictions, food allergies, or accessibility needs when booking. Some domes have wheelchair accessibility, and we can arrange special meal accommodations. Contact us to discuss specific requirements."
    },
    {
      question: "What is the check-in/check-out process?",
      answer: "Check-in is 4:00 PM - 8:00 PM, check-out is 11:00 AM. Late arrivals can be arranged with advance notice. We'll provide detailed arrival instructions and property orientation. Early check-in or late check-out may be available for an additional fee."
    },
    {
      question: "What happens in case of bad weather?",
      answer: "Our domes are weather-resistant and comfortable in all seasons. For severe weather, we have safety protocols and will move guests to our main facility if needed. In case of dangerous conditions preventing travel, we offer flexible rescheduling options."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset rounded-lg"
              aria-expanded={openFaq === index}
              aria-controls={`faq-answer-${index}`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            {openFaq === index && (
              <div
                id={`faq-answer-${index}`}
                className="px-6 pb-4 text-gray-600 leading-relaxed"
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Additional Help */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Still Have Questions?
        </h3>
        <p className="text-gray-600 mb-4">
          Can't find what you're looking for? Our friendly team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+1234567890"
            className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Us Now
          </a>
          
          <a
            href="mailto:info@theglampingspot.com"
            className="inline-flex items-center justify-center px-6 py-3 border border-emerald-600 text-emerald-600 font-medium rounded-lg hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Email
          </a>
        </div>
      </div>
    </div>
  );
}