'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BackgroundGradient } from '@/components/ui/BackgroundGradient';

/**
 * Interface for Instagram post data
 */
interface InstagramPost {
  /**
   * Unique identifier for the post
   */
  id: string;
  
  /**
   * URL of the image/media
   */
  imageUrl: string;
  
  /**
   * Caption text from the post
   */
  caption?: string;
  
  /**
   * Number of likes the post has received
   */
  likes?: number;
  
  /**
   * Number of comments on the post
   */
  comments?: number;
  
  /**
   * Direct link to the post on Instagram
   */
  postUrl: string;
  
  /**
   * Whether the post is a video
   */
  isVideo?: boolean;
  
  /**
   * Alternative text for the image
   */
  alt?: string;
}

/**
 * Props for the InstagramFeed component
 */
interface InstagramFeedProps {
  /**
   * Instagram username
   */
  username: 'the.glamping.spot';
  
  /**
   * Title for the Instagram feed section
   */
  title: string;
  
  /**
   * Subtitle text explaining the feed
   */
  subtitle?: string;
  
  /**
   * Number of posts to display
   * @default 6
   */
  postCount?: number;
  
  /**
   * Whether to show post captions
   * @default false
   */
  showCaptions?: boolean;
  
  /**
   * Whether to show post details (likes/comments)
   * @default true
   */
  showStats?: boolean;
  
  /**
   * Access token for Instagram API (optional)
   * If not provided, mock data will be used
   */
  accessToken?: string;
  
  /**
   * Custom CSS class for additional styling
   */
  className?: string;
}

/**
 * Instagram Feed component for displaying recent Instagram posts
 * Uses Instagram Basic Display API if access token is provided,
 * otherwise falls back to mock data
 */
export default function InstagramFeed({
  username,
  title,
  subtitle,
  postCount = 6,
  showCaptions = false,
  showStats = true,
  accessToken,
  className = '',
}: InstagramFeedProps) {
  // State for Instagram posts
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load Instagram data
  useEffect(() => {
    const fetchInstagramPosts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // If access token is provided, fetch from Instagram API
        if (accessToken) {
          // In a production environment, this call should be made to a backend API
          // to avoid exposing your access token in client-side code
          const response = await fetch(
            `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${accessToken}`
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch Instagram posts');
          }
          
          const data = await response.json();
          
          // Transform API response to our internal format
          const formattedPosts: InstagramPost[] = data.data
            .filter((post: any) => post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM' || post.media_type === 'VIDEO')
            .map((post: any) => ({
              id: post.id,
              imageUrl: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
              caption: post.caption,
              postUrl: post.permalink,
              isVideo: post.media_type === 'VIDEO',
              alt: post.caption ? post.caption.substring(0, 100) : `Instagram post by ${username}`,
            }))
            .slice(0, postCount);
          
          setPosts(formattedPosts);
        } else {
          // Use mock data if no access token provided
          // This is useful for development and preview purposes
          const mockPosts: InstagramPost[] = [
            {
              id: 'mock1',
              imageUrl: '/images/instagram/post1sunset.jpg',
              caption: 'Enjoying the sunset from our luxury dome 🌅 #TheGlampingSpot #TexasGlamping',
              likes: 124,
              comments: 18,
              postUrl: `https://instagram.com/${username}`,
              alt: 'Sunset view from inside a geodesic dome',
            },
            {
              id: 'mock2',
              imageUrl: '/images/instagram/post2coffee.jpg',
              caption: 'Morning coffee with the best view 🌄☕ #GlampingLife',
              likes: 98,
              comments: 12,
              postUrl: `https://instagram.com/${username}`,
              alt: 'Person holding coffee mug with mountain view',
            },
            {
              id: 'mock3',
              imageUrl: '/images/instagram/post3atv.jpg',
              caption: 'ATV adventures await! Book your glamping experience today 🏍️ #Adventure',
              likes: 156,
              comments: 23,
              postUrl: `https://instagram.com/${username}`,
              isVideo: true,
              alt: 'ATV tracks near the glamping property',
            },
            {
              id: 'mock4',
              imageUrl: '/images/instagram/post4bed.jpg',
              caption: 'Stargazing from your bed? Yes please! ✨ #NightSky #GlampingMagic',
              likes: 203,
              comments: 31,
              postUrl: `https://instagram.com/${username}`,
              alt: 'Night sky view through dome ceiling',
            },
            {
              id: 'mock5',
              imageUrl: '/images/instagram/post5interior.jpg',
              caption: 'Luxury meets nature in our premium geo domes 🌿 #EcoLuxury',
              likes: 187,
              comments: 26,
              postUrl: `https://instagram.com/${username}`,
              alt: 'Interior of luxury geodesic dome',
            },
            {
              id: 'mock6',
              imageUrl: '/images/instagram/post6firepit.jpg',
              caption: 'Weekend getaway goals 🏕️ #WeekendVibes #GlampingEscape',
              likes: 143,
              comments: 19,
              postUrl: `https://instagram.com/${username}`,
              alt: 'Glamping site with fire pit and seating area',
            },
          ];
          
          setPosts(mockPosts.slice(0, postCount));
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 800));
        }
      } catch (err) {
        console.error('Error fetching Instagram posts:', err);
        setError('Unable to load Instagram posts. Please check again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInstagramPosts();
  }, [username, accessToken, postCount]);
  
  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };
  
  return (
    <section 
      className={`py-16 ${className}`}
      aria-labelledby="instagram-heading"
    >
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <BackgroundGradient className="inline-block p-[3px] mb-4 rounded-xl">
            <div className="rounded-lg px-4 py-2">

              <h2 
                id="instagram-heading" 
                className="text-3xl font-bold flex items-center justify-center"
              >
                <svg 
                  className="h-8 w-8 mr-3 text-pink-500" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                {title}
              </h2>
            </div>
          </BackgroundGradient>
          
          {subtitle && (
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
          
          <Link 
            href={`https://instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-emerald-600 hover:text-emerald-700 transition-colors"
            aria-label={`Visit ${username} on Instagram`}
          >
            @{username}
          </Link>
        </div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div 
              className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"
              role="status"
            >
              <span className="sr-only">Loading Instagram posts...</span>
            </div>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg max-w-lg mx-auto text-center">
            <svg 
              className="h-12 w-12 text-red-400 mx-auto mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
            <p>{error}</p>
            <p className="mt-2">Follow us on <a href={`https://instagram.com/${username}`} className="text-emerald-600 hover:underline">Instagram</a> to see our latest posts.</p>
          </div>
        )}
        
        {/* Instagram Feed Grid */}
        {!isLoading && !error && posts.length > 0 && (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {posts.map((post) => (
              <motion.a
                key={post.id}
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                variants={itemVariants}
                aria-label={post.caption || `Instagram post by ${username}`}
              >
                {/* Post Image */}
                <div className="relative h-full w-full">
                  <Image
                    src={post.imageUrl}
                    alt={post.alt || `Instagram post by ${username}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Video Indicator */}
                  {post.isVideo && (
                    <div 
                      className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-2" 
                      aria-hidden="true"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Overlay with Caption and Stats */}
                  <div 
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
                    aria-hidden="true"
                  >
                    {showCaptions && post.caption && (
                      <p className="text-white text-sm line-clamp-3 mb-2">
                        {post.caption}
                      </p>
                    )}
                    
                    {showStats && (post.likes || post.comments) && (
                      <div className="flex items-center space-x-3 text-white/90">
                        {post.likes !== undefined && (
                          <span className="flex items-center text-sm">
                            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            {post.likes}
                          </span>
                        )}
                        
                        {post.comments !== undefined && (
                          <span className="flex items-center text-sm">
                            <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
                            </svg>
                            {post.comments}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* View on Instagram */}
                    <div className="mt-2 text-white text-sm font-medium flex items-center">
                      View on Instagram
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
        
        {/* Instagram CTA */}
        {!isLoading && !error && (
          <div className="mt-12 text-center">
            <Link
              href={`https://www.instagram.com/the.glamping.spot`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-emerald-600 text-base font-medium rounded-md text-emerald-600 hover:bg-emerald-50 transition-colors"
              aria-label={`Follow ${username} on Instagram`}
            >
              Follow Us On Instagram
              <svg 
                className="ml-2 h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}