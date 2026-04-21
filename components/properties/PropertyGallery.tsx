'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PropertyGalleryProps {
  images: { src: string; alt: string }[];
  airbnbUrl: string;
}

export default function PropertyGallery({ images, airbnbUrl }: PropertyGalleryProps) {
  const [active, setActive] = useState(0);
  const main = images[0];
  const thumbs = images.slice(1, 5);

  return (
    <div className="space-y-2">
      {/* Airbnb-style 5-photo grid */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-64 sm:h-80 md:h-[440px] rounded-2xl overflow-hidden">
        {/* Main image — 2 cols × 2 rows */}
        <button
          type="button"
          className="col-span-2 row-span-2 relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-inset"
          onClick={() => setActive(0)}
          aria-label="View main photo"
          aria-pressed={active === 0 ? 'true' : 'false'}
        >
          <Image
            src={images[active]?.src ?? main.src}
            alt={images[active]?.alt ?? main.alt}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 55vw"
            quality={85}
            priority
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </button>

        {/* 4 thumbnails */}
        {thumbs.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i + 1)}
            className={`relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-inset transition-opacity ${
              active === i + 1 ? 'ring-2 ring-inset ring-[#FF385C]' : 'opacity-80 hover:opacity-100'
            }`}
            aria-label={`View photo ${i + 2}`}
            aria-pressed={active === i + 1 ? 'true' : 'false'}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              style={{ objectFit: 'cover' }}
              sizes="25vw"
              quality={70}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            {/* "Show all photos" overlay on last thumbnail */}
            {i === 3 && (
              <a
                href={airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/60 transition-colors"
                aria-label="Show all photos on Airbnb"
              >
                <span className="text-white text-sm font-semibold flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Show all photos
                </span>
              </a>
            )}
          </button>
        ))}
      </div>

      {/* Dot indicators (mobile) */}
      <div className="flex justify-center gap-1.5 sm:hidden pt-1">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-colors focus:outline-none ${
              active === i ? 'bg-[#FF385C]' : 'bg-gray-300'
            }`}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
