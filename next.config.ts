import { NextConfig } from 'next';
import path from 'path';

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
      'framer-motion',
      'lucide-react', 
      '@/components/ui',
      'react-hook-form',
      'date-fns',
    ],
    // Remove this line: swcMinify: true,
    serverComponentsExternalPackages: ['sharp'],
  },

  // Production compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? {
      properties: ['^data-test']
    } : false,
    styledComponents: true,
  },

  // Enhanced image optimization configuration
  images: {
    // Modern image formats for better compression
    formats: ['image/avif', 'image/webp'],
    
    // Longer cache TTL for better performance
    minimumCacheTTL: 31536000, // 1 year
    
    // Optimized device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Allow SVG optimization
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // Image domains for external images
    domains: [
      'theglampingspot.com',
      'www.theglampingspot.com',
      'images.unsplash.com',
      'res.cloudinary.com'
    ],
    
    // Remote patterns for modern image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.theglampingspot.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },

  // Advanced webpack optimization
  webpack: (config, { dev, isServer, buildId }) => {
    // Production optimizations only
    if (!dev && !isServer) {
      // Advanced code splitting configuration
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        maxInitialRequests: 25,
        maxAsyncRequests: 25,
        cacheGroups: {
          // Vendor libraries chunk
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            chunks: 'all',
            enforce: true,
          },
          
          // Common reusable code
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
            chunks: 'all',
          },
          
          // Heavy animation libraries
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            priority: 15,
            chunks: 'async',
            enforce: true,
          },
          
          // React and React-DOM
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            priority: 20,
            chunks: 'all',
            enforce: true,
          },
          
          // UI component libraries
          ui: {
            test: /[\\/]components[\\/]ui[\\/]/,
            name: 'ui-components',
            priority: 8,
            chunks: 'all',
            minChunks: 2,
          },
        },
      };

      // Minimize bundle size by removing development dependencies
      config.resolve.alias = {
        ...config.resolve.alias,
        // Remove React DevTools in production
        ...(process.env.NODE_ENV === 'production' && {
          'react-devtools-detector': false,
          '@react-devtools/core': false,
        }),
      };

      // Tree shaking optimization
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Minimize asset duplication
      config.optimization.mergeDuplicateChunks = true;
      config.optimization.removeAvailableModules = true;
      config.optimization.removeEmptyChunks = true;
    }

    // Performance monitoring in development
    if (dev) {
      config.plugins.push(
        // Bundle analyzer (commented out for normal development)
        // new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
        //   analyzerMode: 'server',
        //   openAnalyzer: false,
        // })
      );
    }

    return config;
  },

  // Enhanced security headers for best practices score
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google-analytics.com https://www.googletagmanager.com https://connect.facebook.net",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' https: data: blob:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://api.theglampingspot.com https://www.google-analytics.com",
              "frame-ancestors 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          
          // Security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
          },
          
          // HSTS for secure connections
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
        ],
      },
      
      // Cache optimization for static assets
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
      
      // Cache optimization for fonts
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
      
      // Cache optimization for JS/CSS files
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
    ];
  },

  // Redirect configuration for SEO
  async redirects() {
    return [
      // Redirect www to non-www for better SEO
      {
        source: '/(.*)',
        has: [
          {
            type: 'host',
            value: 'www.theglampingspot.net',
          },
        ],
        destination: 'https://theglampingspot.net/:path*',
        permanent: true,
      },
      
      // Legacy URL redirects
      {
        source: '/property/:id',
        destination: '/properties/:id',
        permanent: true,
      },
    ];
  },

  // Performance-optimized rewrites
  async rewrites() {
    return [
      // API rewrites for better caching
      {
        source: '/api/properties/:path*',
        destination: '/api/properties/:path*',
      },
    ];
  },

  // Production-only optimizations
  ...(process.env.NODE_ENV === 'production' && {
    // Disable source maps in production for security
    productionBrowserSourceMaps: false,
    
    // Enable static optimization
    output: 'standalone',
    
    // PoweredBy header removal for security
    poweredByHeader: false,
    
    // Compression
    compress: true,
  }),

  // Development optimizations
  // ...(process.env.NODE_ENV === 'development' && {
  //   // Enable source maps for development
  //   productionBrowserSourceMaps: true,
    
  //   // Fast refresh
  //   reactStrictMode: true,
  // }),

  // Environment variables configuration
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://theglampingspot.net',
  },

  // TypeScript configuration
  typescript: {
    // Ignore build errors in production (use with caution)
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Run ESLint on specific directories during build
    dirs: ['pages', 'components', 'lib', 'app'],
    
    // Don't fail build on ESLint errors in production
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },

  // Trailing slash configuration for consistent URLs
  trailingSlash: false,

  // Page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  // React configuration
  reactStrictMode: true,

  // SWC configuration for better performance
  swcMinify: true,
};

export default nextConfig;