import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// SEO Metadata
export const metadata: Metadata = {
  title: 'About The Glamping Spot | Our Story & Mission',
  description: 'Learn about our passion for providing unique, luxurious outdoor experiences that connect you with nature.',
  keywords: 'glamping, outdoor experiences, luxury camping, nature retreat, sustainable tourism',
};

export default function AboutPage() {
  // Team members data
  const teamMembers = [
    {
      name: 'Ivann G Rocha ',
      role: 'Founder & CEO',
      bio: 'Passionate adventurer and nature enthusiast who started The Glamping Spot to redefine outdoor experiences.',
      image: '/images/TheGlampingSpot_W.png'
    },
    {
      name: 'Andrew Perez',
      role: 'Head of Guest Experience',
      bio: 'Dedicated to ensuring every guest has an unforgettable and comfortable stay.',
      image: '/images/TheGlampingSpot_W.png'
    },
    {
      name: 'Aaron Perez',
      role: 'Sustainability Director',
      bio: 'Leading our efforts to minimize environmental impact and promote responsible tourism.',
      image: '/images/TheGlampingSpot_W.png'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-emerald-800 text-white py-16 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Story</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Founded with a vision to reconnect people with nature through luxurious, thoughtfully designed outdoor experiences.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              At The Glamping Spot, we believe that extraordinary experiences happen when luxury meets nature. 
              Our mission is to provide unique, sustainable glamping experiences that allow guests to connect 
              deeply with the natural world without sacrificing comfort.
            </p>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-emerald-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Sustainable and eco-friendly accommodations
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-emerald-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Unique properties in breathtaking locations
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-emerald-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Premium amenities and exceptional guest experiences
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {[
                '/images/MorningCoffee.jpg',
                '/images/stars1.jpg',
                '/images/dining.jpg',
                '/images/bathroom.jpg'
              ].map((src, index) => (
                <div 
                  key={src} 
                  className={`relative h-48 lg:h-64 rounded-xl overflow-hidden ${index % 2 === 1 ? 'mt-16' : ''}`}
                >
                  <Image
                    src={src}
                    alt="The Glamping Spot Experience"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the passionate individuals behind The Glamping Spot, dedicated to creating unforgettable outdoor experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.name} 
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-emerald-600 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Nature Differently?</h2>
          <p className="text-xl mb-8">
            Join us in our mission to create meaningful, sustainable outdoor experiences.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/properties" 
              className="inline-block bg-white text-emerald-700 hover:bg-emerald-50 py-3 px-6 rounded-md font-medium transition-colors"
            >
              View Properties
            </Link>
            <Link 
              href="/contact" 
              className="inline-block bg-emerald-600 hover:bg-emerald-800 py-3 px-6 rounded-md font-medium transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}