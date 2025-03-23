'use client';

import dynamic from 'next/dynamic';

// Dynamically import the WeatherHighlights component with client-side only rendering
const WeatherHighlights = dynamic(
  () => import('@/components/home/WeatherHighlights'),
  { ssr: false }
);

// client component wrapper that can be imported in the server component
export default function WeatherHighlightsClient() {
  return <WeatherHighlights />;
}