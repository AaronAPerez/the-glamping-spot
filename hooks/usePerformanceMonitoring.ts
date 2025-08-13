import { useEffect } from "react";

// Performance observer for monitoring
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Monitor LCP
      const lcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('LCP:', entry);
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      
      // Monitor FID
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('FID:', entry);
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      
      // Monitor CLS
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('CLS:', entry);
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      
      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);
};