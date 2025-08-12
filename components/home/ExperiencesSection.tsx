'use client';

import React, { useState } from 'react';
import Image from 'next/image';

/**
 * Interface for a experience item (image or video)
 */
interface experienceItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  location?: string;
  date?: string;
}

/**
 * Props for the experiencesSection component
 */
interface experiencesSectionProps {
  title?: string;
  subtitle?: string;
  experiences: experienceItem[];
  className?: string;
}

/**
 * Component that displays a gallery of experiences with images and videos
 * Includes a modal for enlarged viewing and detailed information
 */
export default function ExperiencesSection({
  title = "Glamping experiences",
  subtitle = "Unforgettable experiences from our guests and adventures",
  experiences,
  className = ''
}: experiencesSectionProps) {
  const [selectedexperience, setSelectedexperience] = useState<experienceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the modal with the selected experience
  const openexperience = (experience: experienceItem) => {
    setSelectedexperience(experience);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  return (
    <section className={`py-16 ${className}`} aria-labelledby="experiences-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="experiences-heading" className="text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mt-4 text-xl text-gray-600">{subtitle}</p>
        </div>

        {/* experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map(experience => (
            <div
              key={experience.id}
              className="experience-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => openexperience(experience)}
            >
              <div className="relative aspect-square">
                {experience.type === 'image' ? (
                  <Image
                    src={experience.src}
                    alt={experience.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={experience.thumbnail || experience.src}
                      alt={experience.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white bg-opacity-75 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-emerald-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {experience.title && (
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">{experience.title}</h3>
                  {experience.location && (
                    <p className="text-sm text-gray-500">{experience.location}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* experience Modal */}
      {isModalOpen && selectedexperience && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="experience-modal-title"
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 id="experience-modal-title" className="text-xl font-semibold">{selectedexperience.title || 'experience Details'}</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              {selectedexperience.type === 'image' ? (
                <div className="relative h-[60vh]">
                  <Image
                    src={selectedexperience.src}
                    alt={selectedexperience.alt}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="100vw"
                  />
                </div>
              ) : (
                <div className="relative aspect-video">
                  <video
                    src={selectedexperience.src}
                    poster={selectedexperience.thumbnail}
                    controls
                    className="w-full h-full"
                  />
                </div>
              )}

              {(selectedexperience.description || selectedexperience.date || selectedexperience.location) && (
                <div className="mt-4">
                  {selectedexperience.description && (
                    <p className="text-gray-700 mb-2">{selectedexperience.description}</p>
                  )}
                  <div className="flex flex-wrap text-sm text-gray-500">
                    {selectedexperience.location && (
                      <span className="mr-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {selectedexperience.location}
                      </span>
                    )}
                    {selectedexperience.date && (
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {selectedexperience.date}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}