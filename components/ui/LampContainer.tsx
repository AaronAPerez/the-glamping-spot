'use client';

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useAnimation, useMotionTemplate, useMotionValue } from "framer-motion";

/**
 * Props for the LampContainer component
 */
interface LampContainerProps {
  /**
   * Children elements to render in the spotlight
   */
  children: React.ReactNode;
  /**
   * CSS class to apply to the component
   */
  className?: string;
  /**
   * CSS class to apply to the spotlight
   */
  spotlightClassName?: string;
  /**
   * Whether to disable the lamp effect
   * @default false
   */
  disabled?: boolean;
  /**
   * Color of the lamp spotlight gradient
   * @default "white"
   */
  spotlightColor?: string;
  /**
   * Size of the spotlight in pixels
   * @default 350
   */
  size?: number;
}

/**
 * LampContainer component creates a spotlight effect that follows
 * the pointer/mouse and illuminates content
 */
export function LampContainer({
  children,
  className,
  spotlightClassName,
  disabled = false,
  spotlightColor = "white",
  size = 80,
}: LampContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isClient, setIsClient] = useState(false);

  // Convert mouse position to a CSS image for spotlight gradient
  const spotlightImage = useMotionTemplate`radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent)`;
  
  // Setup animation controls for interactive effects
  const controls = useAnimation();
  
  // Ensure we only run client-side to avoid SSR hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Determine if the device supports hover
  const mql = typeof window !== 'undefined' ? window.matchMedia('(hover: hover)') : { matches: false };
  const supportsHover = mql.matches;

  // Update mouse position based on pointer events or center on mobile
  useEffect(() => {
    if (disabled || !containerRef.current || !isClient || !supportsHover) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
      
      mouseX.set(relativeX);
      mouseY.set(relativeY);
    };
    
    if (containerRef.current) {
      containerRef.current.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [disabled, mouseX, mouseY, isClient, supportsHover]);

  // Center the spotlight on mobile or when hover isn't available
  useEffect(() => {
    if (!isClient || supportsHover) return;
    
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(rect.width / 2);
        mouseY.set(rect.height / 2);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mouseX, mouseY, isClient, supportsHover]);

  // Animate spotlight on hover
  const handleMouseEnter = () => {
    if (disabled) return;
    controls.start({ opacity: 1, transition: { duration: 0.2 } });
  };
  
  const handleMouseLeave = () => {
    if (disabled) return;
    controls.start({ opacity: 0, transition: { duration: 0.2 } });
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative overflow-hidden w-full bg-transparent", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={controls}
    >
      {/* Background spotlight element */}
      {isClient && !disabled && (
        <motion.div
          className={cn(
            "pointer-events-none absolute inset-0 z-10 bg-blend-overlay opacity-0",
            spotlightClassName
          )}
          style={{
            backgroundImage: spotlightImage,
          }}
          animate={controls}
        />
      )}
      
      {/* Content that will be illuminated by the spotlight */}
      <div className="relative z-20">{children}</div>
    </motion.div>
  );
}