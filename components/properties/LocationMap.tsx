'use client';

import React from 'react';

/**
 * ───────────────────────────────────────────────────────────────────────────
 * APPROXIMATE-LOCATION MAP
 * ───────────────────────────────────────────────────────────────────────────
 * Deliberately shows a general area, not the front door. Airbnb withholds the
 * exact address until a booking is confirmed, and this page is public and
 * indexable, so it follows the same rule: the embed gets a bounding box and
 * NO `marker=` parameter, and the circle drawn over it is decorative — there
 * is no precise coordinate anywhere in the markup for someone to read off.
 *
 * The centre below is the Kountze town centre already published in this page's
 * geo metadata, not the property itself.
 *
 * OpenStreetMap is used rather than the Google Maps Embed API because it needs
 * no API key and no billing account. It does require attribution (ODbL), which
 * is the link underneath the frame — please keep it.
 *
 * NOTE: the embed only renders because next.config.ts allows
 * `frame-src https://www.openstreetmap.org`. Without that the site's CSP falls
 * back to `default-src 'self'` and the iframe is blocked with no visible error.
 */

/** Kountze, TX town centre — matches `geo.position` in app/properties/page.tsx. */
const CENTER = { lat: 30.3727, lon: -94.3099 } as const;

/** Roughly a 12km x 8km window — town-scale, deliberately too coarse to pinpoint. */
const SPAN = { lon: 0.065, lat: 0.037 } as const;

const BBOX = [
  CENTER.lon - SPAN.lon,
  CENTER.lat - SPAN.lat,
  CENTER.lon + SPAN.lon,
  CENTER.lat + SPAN.lat,
].join(',');

const EMBED_URL = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
  BBOX
)}&layer=mapnik`;

const VIEW_URL = `https://www.openstreetmap.org/#map=13/${CENTER.lat}/${CENTER.lon}`;

interface LocationMapProps {
  /** Human-readable place shown above the frame. */
  location?: string;
  className?: string;
}

export default function LocationMap({
  location = 'Kountze, Texas, United States',
  className = '',
}: LocationMapProps) {
  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
        <iframe
          src={EMBED_URL}
          title={`Map of the general area around ${location}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[280px] w-full sm:h-[360px]"
        />

        {/*
          Decorative "somewhere in here" halo. pointer-events-none so it never
          swallows a drag — the map underneath stays pannable and zoomable.
        */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="h-32 w-32 rounded-full border-2 border-[#FF385C]/70 bg-[#FF385C]/15 sm:h-40 sm:w-40" />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <p className="flex items-start gap-2 text-xs text-gray-500">
          <svg
            className="mt-px h-4 w-4 shrink-0 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span>
            Approximate location only. The exact address is shared after your booking is
            confirmed.
          </span>
        </p>

        <a
          href={VIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs text-gray-400 underline decoration-dotted underline-offset-2 transition-colors hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2 rounded-sm"
        >
          © OpenStreetMap contributors
        </a>
      </div>
    </div>
  );
}
