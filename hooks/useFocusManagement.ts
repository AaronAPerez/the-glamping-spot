import { useEffect, useRef } from 'react';

// Focus management hook for accessibility
export const useFocusManagement = () => {
  const skipLinkRef = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
    const skipLink = skipLinkRef.current;
    if (skipLink) {
      const handleSkipLinkClick = (e: Event) => {
        e.preventDefault();
        const target = document.getElementById('main-content');
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      };
      
      skipLink.addEventListener('click', handleSkipLinkClick);
      return () => skipLink.removeEventListener('click', handleSkipLinkClick);
    }
  }, []);
  
  return skipLinkRef;
};