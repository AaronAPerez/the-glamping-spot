'use client';

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Item to be displayed in the InfiniteMovingCards component
 */
interface InfiniteMovingCardsItem {
  /**
   * Content (React node) to display inside the card
   */
  content: React.ReactNode;
  /**
   * Optional link URL for the card
   */
  link?: string;
}

/**
 * Props for the InfiniteMovingCards component
 */
interface InfiniteMovingCardsProps {
  /**
   * Array of items to display in the moving cards
   */
  items: InfiniteMovingCardsItem[];
  /**
   * Direction of movement
   * @default "left"
   */
  direction?: "left" | "right";
  /**
   * Speed of movement
   * @default "normal"
   */
  speed?: "fast" | "normal" | "slow";
  /**
   * Whether the animation should pause on hover
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * CSS class names to apply to the component
   */
  className?: string;
}

/**
 * InfiniteMovingCards component creates a horizontally scrolling carousel
 * with continuous smooth animation
 */
export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) {
  // Reference to the container element
  const containerRef = useRef<HTMLDivElement>(null);
  // Track if component is visible in viewport
  const [isInView, setIsInView] = useState(false);
  // Track if user is hovering
  const [isPaused, setIsPaused] = useState(false);
  
  // Setup speed value based on prop
  let speedValue = 50;
  switch (speed) {
    case "fast":
      speedValue = 35;
      break;
    case "slow":
      speedValue = 80;
      break;
    default:
      speedValue = 50;
  }

  // Setup intersection observer to only animate when visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        setIsInView(entries[0].isIntersecting);
      },
      { threshold: 0.2 } // 20% visible to trigger
    );
    
    observer.observe(container);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden group mx-auto w-full",
        className
      )}
      aria-label="Testimonial carousel"
      role="region"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Gradient fade on edges for smooth appearance */}
      <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-950" />
      <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-950" />
      
      {/* Main content */}
      <div className="flex gap-4 px-4 overflow-hidden">
        {/* First set of duplicated cards */}
        <div
          className="flex gap-4 min-w-full flex-nowrap"
          style={{
            animationPlayState: (!isInView || isPaused) ? "paused" : "running",
            animationName: "scroll",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDirection: direction === "left" ? "normal" : "reverse",
            animationDuration: `${items.length * speedValue}s`,
          }}
        >
          {items.map((item, idx) => (
            <div
              className="flex-shrink-0 w-80 md:w-96 rounded-2xl border border-gray-200 shadow-lg overflow-hidden bg-white dark:bg-gray-950 dark:border-gray-800"
              key={`card-1-${idx}`}
            >
              {item.link ? (
                <a href={item.link} className="h-full block">
                  {item.content}
                </a>
              ) : (
                item.content
              )}
            </div>
          ))}
        </div>
        
        {/* Second set of duplicated cards for seamless loop */}
        <div
          className="flex gap-4 min-w-full flex-nowrap"
          style={{
            animationPlayState: (!isInView || isPaused) ? "paused" : "running",
            animationName: "scroll",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDirection: direction === "left" ? "normal" : "reverse",
            animationDuration: `${items.length * speedValue}s`,
          }}
        >
          {items.map((item, idx) => (
            <div
              className="flex-shrink-0 w-80 md:w-96 rounded-2xl border border-gray-200 shadow-lg overflow-hidden bg-white dark:bg-gray-950 dark:border-gray-800"
              key={`card-2-${idx}`}
            >
              {item.link ? (
                <a href={item.link} className="h-full block">
                  {item.content}
                </a>
              ) : (
                item.content
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* CSS for animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% - 1rem));
          }
        }
      `}</style>
    </div>
  );
}