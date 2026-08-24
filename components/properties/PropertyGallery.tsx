'use client';

import { useState } from 'react';
import Image from 'next/image';
import PhotoLightbox, { type GalleryImage } from './PhotoLightbox';

interface PropertyGalleryProps {
  images: GalleryImage[];
  airbnbUrl: string;
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
      />
    </svg>
  );
}

export default function PropertyGallery({ images, airbnbUrl }: PropertyGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [hero, ...rest] = images;
  const tiles = rest.slice(0, 4);

  return (
    <div className="relative">
      {/*
        One grid for both breakpoints: below `sm` only the hero cell is shown
        (the four side tiles are hidden), so phones get a single tall photo
        instead of five thumbnails squeezed into 256px.
      */}
      <div className="grid grid-cols-1 sm:grid-cols-4 sm:grid-rows-2 gap-2 h-72 sm:h-80 md:h-[440px] rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          className="sm:col-span-2 sm:row-span-2 relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-inset"
          aria-label={`Open photo gallery — ${hero.alt}`}
        >
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 640px) 100vw, 55vw"
            quality={85}
            priority
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </button>

        {tiles.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setLightboxIndex(i + 1)}
            className="hidden sm:block relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-inset"
            aria-label={`Open photo gallery at photo ${i + 2} — ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              style={{ objectFit: 'cover' }}
              sizes="25vw"
              quality={70}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>
        ))}
      </div>

      {/* Floating "show all" affordance, Airbnb-style */}
      <button
        type="button"
        onClick={() => setLightboxIndex(0)}
        className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-white text-gray-900 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-900/10 shadow-md hover:bg-gray-50 hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
      >
        <GridIcon className="w-4 h-4" />
        Show all {images.length} photos
      </button>

      {lightboxIndex !== null && (
        <PhotoLightbox
          images={images}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
          airbnbUrl={airbnbUrl}
        />
      )}
    </div>
  );
}
