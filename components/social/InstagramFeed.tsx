'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BackgroundGradient } from '@/components/ui/BackgroundGradient';

/**
 * Interface for Instagram post data
 */
interface InstagramPost {
  id: string;
  imageUrl: string;
  caption?: string;
  likes?: number;
  comments?: number;
  postUrl: string;
  isVideo?: boolean;
  alt?: string;
}

/**
 * Props for the InstagramFeed component
 */
interface InstagramFeedProps {
  username: string;
  title: string;
  subtitle?: string;
  postCount?: number;
  showCaptions?: boolean;
  showStats?: boolean;
  accessToken?: string;
  className?: string;
}

/**
 * Instagram Feed component with optimized performance and enhanced accessibility
 */
export default function InstagramFeed({
  username = 'the.glamping.spot',
  title,
  subtitle,
  postCount = 6,
  showCaptions = false,
  showStats = true,
  accessToken,
  className = '',
}: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Memoized fetch function for better performance
  const fetchInstagramPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (accessToken) {
        // In production, this should be handled by your backend API
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${accessToken}&limit=${postCount}`
        );
        
        if (!response.ok) {
          throw new Error(`Instagram API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform API response with better error handling
        const formattedPosts: InstagramPost[] = data.data
          ?.filter((post: any) => 
            post.media_type === 'IMAGE' || 
            post.media_type === 'CAROUSEL_ALBUM' || 
            post.media_type === 'VIDEO'
          )
          .map((post: any) => ({
            id: post.id,
            imageUrl: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
            caption: post.caption,
            postUrl: post.permalink,
            isVideo: post.media_type === 'VIDEO',
            alt: post.caption 
              ? `${post.caption.substring(0, 100)}${post.caption.length > 100 ? '...' : ''}`
              : `Instagram post by ${username}`,
          }))
          .slice(0, postCount) || [];
        
        setPosts(formattedPosts);
      } else {
        // Enhanced mock data with better variety
        const mockPosts: InstagramPost[] = [
          {
            id: 'mock-stargazing-dome',
            imageUrl: '/images/instagram/post1sunset.jpg',
            caption: 'Stargazing from your bed in our geodesic dome! 🌟✨ Book your magical night under the Texas stars. #TheGlampingSpot #TexasGlamping #Stargazing',
            likes: 324,
            comments: 28,
            postUrl: `https://instagram.com/${username}`,
            alt: 'Sunset view from inside a geodesic dome with transparent ceiling for stargazing',
          },
          {
            id: 'mock-morning-coffee',
            imageUrl: '/images/instagram/post2coffee.jpg',
            caption: 'Morning coffee with the best view in East Texas ☕🌄 Wake up refreshed in our luxury domes! #MorningVibes #GlampingLife',
            likes: 198,
            comments: 15,
            postUrl: `https://instagram.com/${username}`,
            alt: 'Person holding coffee mug with scenic East Texas landscape view from geodesic dome',
          },
          {
            id: 'mock-atv-adventure',
            imageUrl: '/images/instagram/post3atv.jpg',
            caption: 'ATV adventures await! 🏍️ Explore our private trails and experience the thrill of East Texas terrain. #ATVAdventure #GlampingActivities',
            likes: 256,
            comments: 34,
            postUrl: `https://instagram.com/${username}`,
            isVideo: true,
            alt: 'ATV adventure trails near The Glamping Spot geodesic domes',
          },
          {
            id: 'mock-luxury-bathroom',
            imageUrl: '/images/instagram/post4bed.jpg',
            caption: 'Luxury meets nature in our premium geodesic domes 🛁✨ Every detail designed for your comfort. #LuxuryGlamping #EcoLuxury',
            likes: 287,
            comments: 42,
            postUrl: `https://instagram.com/${username}`,
            alt: 'Luxury bathroom interior in geodesic dome with modern amenities',
          },
          {
            id: 'mock-dome-interior',
            imageUrl: '/images/instagram/post5interior.jpg',
            caption: 'Step inside paradise! 🏠💫 Our thoughtfully designed interiors blend comfort with nature. #DomeLife #InteriorDesign',
            likes: 203,
            comments: 19,
            postUrl: `https://instagram.com/${username}`,
            alt: 'Beautifully designed interior of luxury geodesic dome with modern furnishings',
          },
          {
            id: 'mock-campfire-evening',
            imageUrl: '/images/instagram/post6firepit.jpg',
            caption: 'Evening vibes around the fire pit 🔥🌙 Perfect end to your glamping adventure! #CampfireNights #WeekendGetaway',
            likes: 167,
            comments: 23,
            postUrl: `https://instagram.com/${username}`,
            alt: 'Glamping guests enjoying evening around fire pit with geodesic domes in background',
          },
        ];
        
        // Simulate realistic API delay
        await new Promise(resolve => setTimeout(resolve, 400));
        setPosts(mockPosts.slice(0, postCount));
      }
    } catch (err) {
      console.error('Error fetching Instagram posts:', err);
      setError('Unable to load Instagram posts at this time. Please visit our Instagram page directly.');
    } finally {
      setIsLoading(false);
    }
  }, [username, accessToken, postCount]);
  
  // Load Instagram data on mount
  useEffect(() => {
    fetchInstagramPosts();
  }, [fetchInstagramPosts]);
  
  // Optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Reduced for better performance
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <section 
      className={`py-16 bg-gray-50 ${className}`}
      aria-labelledby="instagram-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced section header */}
        <div className="text-center mb-12">
          <BackgroundGradient className="inline-block p-[3px] mb-4 rounded-xl">
            <div className="rounded-lg px-6 py-3 bg-white">
              <h2 
                id="instagram-heading" 
                className="text-3xl font-bold flex items-center justify-center text-gray-900"
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
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
          
          <Link 
            href={`https://instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-4 text-emerald-600 hover:text-emerald-700 transition-colors font-medium focus:outline-none focus:underline"
            aria-label={`Visit ${username} on Instagram (opens in new tab)`}
          >
            <span>@{username}</span>
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>
        
        {/* Optimized loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20" role="status" aria-label="Loading Instagram posts">
            <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading our latest Instagram posts...</p>
            <span className="sr-only">Loading Instagram feed from {username}</span>
          </div>
        )}
        
        {/* Enhanced error state */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl max-w-lg mx-auto text-center" role="alert">
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
            <p className="font-medium mb-2">{error}</p>
            <p className="text-sm">
              Follow us on{' '}
              <a 
                href={`https://instagram.com/${username}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline font-medium focus:outline-none focus:underline"
              >
                Instagram
              </a>{' '}
              to see our latest glamping adventures!
            </p>
          </div>
        )}
        
        {/* Optimized Instagram feed grid */}
        {!isLoading && !error && posts.length > 0 && (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {posts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="group relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <a
                  href={post.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  aria-label={post.caption || `View Instagram post by ${username} (opens in new tab)`}
                >
                  {/* Optimized post image */}
                  <div className="relative h-full w-full">
                    <Image
                      src={post.imageUrl}
                      alt={post.alt || `Instagram post by ${username}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500 group-hover:scale-110"
                      quality={75}
                      loading="lazy"
                    />
                    
                    {/* Video indicator with better accessibility */}
                    {post.isVideo && (
                      <div 
                        className="absolute top-3 right-3 bg-black/80 text-white rounded-full p-2 shadow-lg" 
                        aria-label="Video content"
                        role="img"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Enhanced overlay with better contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      {showCaptions && post.caption && (
                        <p className="text-white text-sm line-clamp-3 mb-3 leading-relaxed">
                          {post.caption}
                        </p>
                      )}
                      
                      {showStats && (post.likes || post.comments) && (
                        <div className="flex items-center space-x-4 text-white/90 mb-2">
                          {post.likes !== undefined && (
                            <span className="flex items-center text-sm font-medium">
                              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                              </svg>
                              {post.likes.toLocaleString()}
                            </span>
                          )}
                          
                          {post.comments !== undefined && (
                            <span className="flex items-center text-sm font-medium">
                              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
                              </svg>
                              {post.comments}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* Enhanced view on Instagram indicator */}
                      <div className="flex items-center text-white text-sm font-semibold">
                        <span>View on Instagram</span>
                        <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
          </motion.div>
        )}
        
        {/* Enhanced Instagram CTA */}
        {!isLoading && !error && (
          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-lg mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Follow Our Glamping Journey
              </h3>
              <p className="text-gray-600 mb-6">
                Get daily inspiration and see what makes The Glamping Spot special through the eyes of our guests.
              </p>
              <Link
                href={`https://www.instagram.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                aria-label={`Follow ${username} on Instagram (opens in new tab)`}
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Follow Us on Instagram
                <svg 
                  className="ml-2 h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
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
          </div>
        )}

        {/* No posts message */}
        {!isLoading && !error && posts.length === 0 && (
          <div className="text-center py-12">
            <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500 mb-4">No Instagram posts to display at this time.</p>
            <Link
              href={`https://instagram.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700 font-medium focus:outline-none focus:underline"
            >
              Visit our Instagram page
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}