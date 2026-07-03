/**
 * Single source of truth for the business facts used in JSON-LD structured
 * data across the site. Previously these facts (name, address, amenities,
 * social links) were hand-duplicated in three separate <script> blocks
 * (app/layout.tsx x2, app/about/page.tsx), which let stale/fabricated data
 * drift in one copy without the others being updated.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://theglampingspot.com';

export const BUSINESS_NAME = 'The Glamping Spot';
export const BUSINESS_DESCRIPTION = 'Luxury geodesic dome glamping experience near Houston, Texas';
export const LOGO_URL = `${SITE_URL}/images/TheGlampingSpot_W.png`;

export const BUSINESS_ADDRESS = {
  '@type': 'PostalAddress' as const,
  addressLocality: 'Kountze',
  addressRegion: 'TX',
  addressCountry: 'US',
};

export const BUSINESS_GEO = {
  '@type': 'GeoCoordinates' as const,
  latitude: '30.3727',
  longitude: '-94.3099',
};

// Verified against the live Airbnb listing — do not add amenities here
// that aren't actually confirmed, since this feeds public structured data.
export const CORE_AMENITIES = [
  'Lake access',
  'Kitchen',
  'WiFi',
  'Free residential garage on premises',
  'TV with premium cable',
  'Spacious wooden deck',
  'Private pond',
  'Scenic trails',
];

// Real, active accounts only.
export const SOCIAL_LINKS = [
  'https://www.facebook.com/people/The-Glamping-Spot/61574219567434/',
  'https://www.instagram.com/the.glamping.spot',
];

export function getLodgingBusinessSchema(overrides: Record<string, unknown> = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: BUSINESS_NAME,
    description: BUSINESS_DESCRIPTION,
    url: SITE_URL,
    address: BUSINESS_ADDRESS,
    geo: BUSINESS_GEO,
    amenityFeature: CORE_AMENITIES.map((name) => ({
      '@type': 'LocationFeatureSpecification',
      name,
    })),
    image: [`${SITE_URL}/images/GlampingHero.jpg`, `${SITE_URL}/images/geo-dome.jpg`],
    ...overrides,
  };
}

export function getOrganizationSchema(overrides: Record<string, unknown> = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BUSINESS_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    sameAs: SOCIAL_LINKS,
    ...overrides,
  };
}
