'use client';

import { useEffect, useState, useCallback } from 'react';

/**
 * Returns the target render HEIGHT (in px) for the header logo at the
 * current viewport width. The header bar is a fixed 64px tall, so sizing
 * by height (rather than width) keeps the logo comfortably inside it —
 * width is then derived from the logo's actual aspect ratio.
 */
export function useResponsiveLogoSize(): number {
  const [logoHeight, setLogoHeight] = useState(64); // Default size

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    if (width < 480) {
      setLogoHeight(56); // Small mobile
    } else if (width < 768) {
      setLogoHeight(64); // Mobile
    } else if (width < 1024) {
      setLogoHeight(72); // Tablet
    } else {
      setLogoHeight(84); // Desktop
    }
  }, []);

  useEffect(() => {
    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return logoHeight;
}
