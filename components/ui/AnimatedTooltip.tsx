'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Interface for person/item data used in the AnimatedTooltip
 */
export interface AnimatedTooltipProps {
  /**
   * Array of items to display with tooltips
   */
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
  
  /**
   * CSS class to apply to the component container
   */
  className?: string;
  
  /**
   * CSS class to apply to individual avatar components
   */
  avatarClassName?: string;
  
  /**
   * Height for avatar (in pixels)
   * @default 80
   */
  avatarHeight?: number;
  
  /**
   * Width for avatar (in pixels)
   * @default 80
   */
  avatarWidth?: number;
}

/**
 * AnimatedTooltip component creates interactive avatars with animated tooltips on hover
 * Ideal for team members, testimonials, or user profiles
 */
export function AnimatedTooltip({
  items,
  className,
  avatarClassName,
  avatarHeight = 80,
  avatarWidth = 80,
}: AnimatedTooltipProps) {
  // Track which item is being hovered
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Get the currently hovered item
  
  // Function to handle hovered item tracking
  const handleHoverStart = (index: number) => {
    setHoveredIndex(index);
  };
  
  // Function to handle when hover ends
  const handleHoverEnd = () => {
    setHoveredIndex(null);
  };

  return (
    <div className={cn("flex flex-wrap justify-center gap-4", className)}>
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative group"
          onMouseEnter={() => handleHoverStart(idx)}
          onMouseLeave={handleHoverEnd}
        >
          {/* Avatar */}
          <motion.div
            className={cn(
              "flex items-center justify-center rounded-full bg-emerald-100 border-2 border-white dark:border-gray-800 shadow-md overflow-hidden transition-transform",
              avatarClassName
            )}
            style={{ 
              height: avatarHeight, 
              width: avatarWidth 
            }}
            initial={{ y: 0 }}
            whileHover={{ y: -8 }}
          >
            {item.image ? (
              <Image 
                src={item.image} 
                alt={`${item.name}'s avatar`} 
                width={avatarWidth} 
                height={avatarHeight} 
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-2xl font-bold text-emerald-600">
                {/* Get initials if no image */}
                {item.name.split(" ").map((n) => n[0]).join("")}
              </span>
            )}
          </motion.div>
          
          {/* Tooltip */}
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.div
                initial={{ opacity: 0, y: 0, scale: 0.8 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, y: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 z-10 bg-white dark:bg-gray-950 shadow-lg rounded-lg p-3 min-w-[160px] text-center"
                style={{ 
                  pointerEvents: "none",
                  originY: "0%",
                }}
              >
                {/* Tooltip arrow */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white dark:border-b-gray-950"></div>
                
                {/* Tooltip content */}
                <h3 className="font-medium text-sm text-gray-900 dark:text-white">{item.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.designation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}