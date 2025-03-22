'use client';

import { cn } from '@/lib/utils';
import React from 'react';


/**
 * Props for the BackgroundGradient component
 */
interface BackgroundGradientProps {
  /**
   * CSS class names to apply to the component
   */
  className?: string;
  
  /**
   * Custom border radius for the component
   * @default '1.5rem'
   */
  borderRadius?: string;
  
  /**
   * Color for the component's gradient
   * @default 'from-emerald-300 via-emerald-100/70 to-emerald-300'
   */
  gradientColor?: string;
  
  /**
   * Children elements to render inside the component
   */
  children: React.ReactNode;
}

/**
 * BackgroundGradient component creates a subtle animated gradient background effect
 * with a translucent glass-like appearance
 */
export function BackgroundGradient({ 
  className, 
  children, 
  borderRadius = '1.5rem', 
  gradientColor = 'from-emerald-300 via-emerald-100/70 to-emerald-300'
}: BackgroundGradientProps) {
  return (
    <div
      className={cn(
        'relative p-[4px] group/card overflow-hidden',
        className
      )}
      style={{ borderRadius }}
    >
      {/* Animated background gradient */}
      <div
        className={cn(
          'absolute inset-0 z-0 rounded-xl opacity-50 group-hover/card:opacity-70 blur-xl transition duration-500',
          `bg-gradient-to-r ${gradientColor}`
        )}
        aria-hidden="true"
      />

      {/* Moving gradient animation */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-[1px] z-0 rounded-xl opacity-60 transition duration-500',
          `bg-gradient-to-r ${gradientColor}`
        )}
        style={{
          backgroundSize: '300% 300%',
          animation: 'moveBackground 8s linear infinite',
        }}
      />

      {/* Content container */}
      <div
        className="relative z-10 bg-white dark:bg-gray-950 rounded-xl h-full w-full p-4 overflow-hidden"
        style={{ borderRadius: 'calc(1.5rem - 4px)' }}
      >
        {children}
      </div>

      {/* CSS for the moving gradient animation */}
      <style jsx>{`
        @keyframes moveBackground {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}