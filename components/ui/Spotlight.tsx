'use client';

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

/**
 * Props for the Spotlight component
 */
interface SpotlightProps {
  /**
   * CSS class names to apply to the component
   */
  className?: string;
  
  /**
   * Background color or gradient
   * @default "transparent"
   */
  background?: string;
  
  /**
   * Size of the spotlight in pixels
   * @default 200
   */
  size?: number;
  
  /**
   * Color of the spotlight
   * @default "#fff"
   */
  spotlightColour?: string;
  
  /**
   * Opacity of the spotlight effect
   * @default 0.2
   */
  opacity?: number;
  
  /**
   * Whether to reduce spotlight intensity on mobile
   * @default true
   */
  reduceMobileSpotlight?: boolean;
}

/**
 * Spotlight component creates a radial gradient that follows the pointer
 * for an interactive, spotlight-like effect
 */
export function Spotlight({
  className,
  background = "transparent",
  size = 200,
  spotlightColour = "#fff",
  opacity = 0.2,
  reduceMobileSpotlight = true,
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Create the spotlight image as a CSS gradient
  const backgroundImage = useMotionTemplate`radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px, ${spotlightColour}, ${background})`;

  // Handle mouse/pointer movement to update spotlight position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mouseX.set(x);
      mouseY.set(y);
    };
    
    // Handle touch movement for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || e.touches.length === 0) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      mouseX.set(x);
      mouseY.set(y);
    };
    
    // Set initial position to center of container
    const setInitialPosition = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
    };

    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };

    // Set mounted state and initialize
    setIsMounted(true);
    checkMobile();
    setInitialPosition();
    
    window.addEventListener('resize', checkMobile);
    window.addEventListener('resize', setInitialPosition);
    
    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
      containerRef.current.addEventListener('touchmove', handleTouchMove as any);
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', setInitialPosition);
      
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('touchmove', handleTouchMove as any);
      }
    };
  }, [mouseX, mouseY]);

  // Adjust the spotlight size and opacity for mobile if needed
  const effectiveOpacity = isMobile && reduceMobileSpotlight ? opacity * 0.5 : opacity;

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{
        background,
      }}
    >
      {isMounted && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage,
            opacity: effectiveOpacity,
          }}
        />
      )}
    </motion.div>
  );
}