import { NextConfig } from 'next';

/**
 * Enhanced Next.js Configuration for Maximum Performance
 * Addresses all Lighthouse performance issues and optimization opportunities
 * 
 * Key Performance Improvements:
 * - Advanced bundle splitting and code optimization
 * - Image optimization with modern formats
 * - Security headers for best practices
 * - Aggressive caching strategies
 * - Production-ready performance monitoring
 */

const nextConfig: NextConfig = {
  // Experimental features for performance
   experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'lucide-react', 
      '@/components/ui',
      'react-hook-form',
      'date-fns',
    ],

  },

      // Remove this line: swcMinify: true,
    serverComponentsExternalPackages: ['sharp'],

  // Production compiler optimizations
   compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? {
      properties: ['^data-test']
    } : false,
    styledComponents: true,
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        maxInitialRequests: 25,
        maxAsyncRequests: 25,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            chunks: 'all',
            enforce: true,
          },
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
            chunks: 'all',
          },
          // Remove framer-motion specific chunk for now
          // framerMotion: {
          //   test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
          //   name: 'framer-motion',
          //   priority: 15,
          //   chunks: 'async',
          //   enforce: true,
          // },
        },
      };

      config.resolve.alias = {
        ...config.resolve.alias,
        ...(process.env.NODE_ENV === 'production' && {
          'react-devtools-detector': false,
          '@react-devtools/core': false,
        }),
      };

      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }

    return config;
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' https: data: blob:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://api.theglampingspot.com",
              "frame-ancestors 'none'",
              "object-src 'none'",
              "base-uri 'self'",
            ].join('; ')
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ];
  },

  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,
};

export default nextConfig;

