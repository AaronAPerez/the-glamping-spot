'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Interface defining video clip properties
 */
interface VideoClip {
    src: string;
    webmSrc?: string; // Optional WebM source for better browser support
    poster: string;
}

/**
 * Props for the HeroWithLogo component
 */
interface HeroWithLogoProps {
    /**
     * Height of the hero section
     * @default "h-96"
     */
    height?: string;
    
    /**
     * Whether to show the logo
     * @default true
     */
    showLogo?: boolean;
    
    /**
     * Optional title to display
     */
    title?: string;
    
    /**
     * Optional subtitle to display
     */
    subtitle?: string;
}

/**
 * Array of video clips to rotate through
 */
const videoClips: VideoClip[] = [
    {
        src: '/videos/glamping-adventure.mp4',
        poster: '/images/video-thumbnail.jpg'
    },
    {
        src: '/videos/ZipLine.mp4',
        poster: '/images/atv-action.jpg'
    },
];

/**
 * Hero component with video background and logo
 * Designed to integrate with the memories page
 */
export default function HeroVideo({
    height = "h-96",
    showLogo = true,
    title,
    subtitle
}: HeroWithLogoProps) {
    // Track the current video being displayed
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    
    // References for DOM elements
    const videoRef = useRef<HTMLVideoElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
  
    /**
     * Handle smooth transition between videos
     */
    const transitionToNextVideo = () => {
      if (overlayRef.current) {
        // Fade out current video
        overlayRef.current.style.opacity = '1';
        
        setTimeout(() => {
          setCurrentVideoIndex((prev) => 
            prev === videoClips.length - 1 ? 0 : prev + 1
          );
          
          // Fade in new video
          if (overlayRef.current) {
            overlayRef.current.style.opacity = '0';
          }
        }, 1000); // Match this with CSS transition duration
      }
    };
  
    // Auto-advance videos
    useEffect(() => {
      const interval = setInterval(transitionToNextVideo, 8000); // Change video every 8 seconds
      return () => clearInterval(interval);
    }, []);
  
    // Set loaded state after initial render
    useEffect(() => {
      setIsLoaded(true);
    }, []);

    return (
        <section 
            className={`relative ${height} w-full overflow-hidden`} 
            aria-label="Hero section with video background"
        >
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="object-cover w-full h-full"
                    poster={videoClips[currentVideoIndex].poster}
                    onCanPlay={() => {
                        if (videoRef.current) {
                            videoRef.current.play().catch(console.error);
                        }
                    }}
                >
                    <source
                        src={videoClips[currentVideoIndex].src}
                        type="video/mp4"
                    />
                    {videoClips[currentVideoIndex].webmSrc && (
                        <source
                            src={videoClips[currentVideoIndex].webmSrc}
                            type="video/webm"
                        />
                    )}
                    Your browser does not support the video tag.
                </video>

                {/* Transition Overlay */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-black opacity-0 transition-opacity duration-1000"
                    aria-hidden="true"
                />

                {/* Gradient Overlay */}
                <div
                    className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"
                    aria-hidden="true"
                />
            </div>
          
            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
                    <div className="flex flex-col items-center justify-center text-center text-white">
                        {/* Title and Subtitle */}
                        {title && (
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl md:text-5xl font-bold mb-4"
                            >
                                {title}
                            </motion.h2>
                        )}
                        
                        {subtitle && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-xl max-w-2xl mx-auto mb-8"
                            >
                                {subtitle}
                            </motion.p>
                        )}
                        
                        {/* Logo */}
                        {showLogo && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
                                className="mt-4"
                            >
                                <div className="relative w-48 h-48 md:w-64 md:h-64">
                                    <Image
                                        src="/images/TheGlampingSpot_W.png"
                                        alt="The Glamping Spot"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}