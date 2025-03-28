'use client';

import { useEffect, useState, useCallback } from 'react';

export function useResponsiveLogoSize(): number {
  // For horizontal header logo, we want slightly larger sizes
  const [logoSize, setLogoSize] = useState(180); // Default size
  
  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    if (width < 480) {
      setLogoSize(120); // Small mobile
    } else if (width < 768) {
      setLogoSize(130); // Mobile
    } else if (width < 1024) {
      setLogoSize(140); // Tablet
    } else {
      setLogoSize(150); // Desktop
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
  
  return logoSize;
}