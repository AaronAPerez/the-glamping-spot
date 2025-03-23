'use client';

import { useState, useEffect } from 'react';
import { useResponsiveLogoSize } from '@/hooks/useResponsiveLogoSize';
import { usePathname } from 'next/navigation';

/**
 * Maintenance banner that pushes content down and adjusts when closed
 */
export function MaintenanceBanner({
  message = "This site is currently under development. Some features may not be fully functional.",
  expectedCompletion,
}: {
  message?: string;
  expectedCompletion?: string;
}) {
  const [dismissed, setDismissed] = useState(false);
  
  // When banner is dismissed, inform parent components via localStorage
  const handleDismiss = () => {
    setDismissed(true);
    // Save dismissal state to localStorage to persist across page loads
    localStorage.setItem('maintenanceBannerDismissed', 'true');
    
    // Dispatch a custom event that our Header can listen for
    window.dispatchEvent(new CustomEvent('maintenanceBannerDismissed'));
  };
  
  // Check if banner was previously dismissed on mount
  useEffect(() => {
    const wasDismissed = localStorage.getItem('maintenanceBannerDismissed') === 'true';
    setDismissed(wasDismissed);
  }, []);
  
  if (dismissed) return null;
  
  return (
    <div 
      className="bg-amber-50 border-b border-amber-200 px-4 py-3 w-full" 
      role="alert" 
      aria-live="polite"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <svg 
            className="h-5 w-5 text-amber-500 mr-2" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <p className="text-amber-800 text-sm font-medium">
            {message}
            {expectedCompletion && (
              <span className="ml-1">
                Expected completion: {expectedCompletion}
              </span>
            )}
          </p>
        </div>
        
        <button
          onClick={handleDismiss}
          className="text-amber-500 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
          aria-label="Dismiss maintenance notification"
        >
          <svg 
            className="h-5 w-5" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}