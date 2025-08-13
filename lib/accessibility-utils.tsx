// lib/accessibility-utils.ts
'use client';

import { useEffect, useRef } from 'react';

/**
 * Screen reader announcements hook
 * Provides a function to announce messages to screen readers
 */
export const useAnnouncements = () => {
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    // Create a live region for the announcement
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    // Add to DOM
    document.body.appendChild(announcement);
    
    // Remove after screen reader has had time to announce
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  };
  
  return announce;
};

/**
 * Focus management hook for accessibility
 * Helps manage focus for skip links and keyboard navigation
 */
export const useFocusManagement = () => {
  const skipLinkRef = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
    const skipLink = skipLinkRef.current;
    if (skipLink) {
      const handleSkipLinkClick = (e: Event) => {
        e.preventDefault();
        const target = document.getElementById('main-content');
        if (target) {
          // Make the target focusable temporarily if it's not already
          const originalTabIndex = target.getAttribute('tabindex');
          if (!originalTabIndex) {
            target.setAttribute('tabindex', '-1');
          }
          
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
          
          // Remove temporary tabindex after focus
          if (!originalTabIndex) {
            setTimeout(() => {
              target.removeAttribute('tabindex');
            }, 100);
          }
        }
      };
      
      skipLink.addEventListener('click', handleSkipLinkClick);
      return () => skipLink.removeEventListener('click', handleSkipLinkClick);
    }
  }, []);
  
  return skipLinkRef;
};

/**
 * Trap focus within a container (useful for modals)
 */
export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };
    
    container.addEventListener('keydown', handleTabKey);
    
    // Focus first element when activated
    firstElement?.focus();
    
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);
  
  return containerRef;
};

/**
 * Keyboard navigation helper
 * Provides utilities for arrow key navigation in lists/grids
 */
export const useKeyboardNavigation = (
  containerRef: React.RefObject<HTMLElement>,
  options: {
    direction?: 'horizontal' | 'vertical' | 'grid';
    loop?: boolean;
    itemSelector?: string;
  } = {}
) => {
  const {
    direction = 'vertical',
    loop = true,
    itemSelector = '[role="option"], button, a, input'
  } = options;
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const items = Array.from(container.querySelectorAll(itemSelector)) as HTMLElement[];
      const currentIndex = items.findIndex(item => item === document.activeElement);
      
      if (currentIndex === -1) return;
      
      let nextIndex = currentIndex;
      
      switch (e.key) {
        case 'ArrowDown':
          if (direction === 'vertical' || direction === 'grid') {
            e.preventDefault();
            nextIndex = currentIndex + 1;
          }
          break;
          
        case 'ArrowUp':
          if (direction === 'vertical' || direction === 'grid') {
            e.preventDefault();
            nextIndex = currentIndex - 1;
          }
          break;
          
        case 'ArrowRight':
          if (direction === 'horizontal' || direction === 'grid') {
            e.preventDefault();
            nextIndex = currentIndex + 1;
          }
          break;
          
        case 'ArrowLeft':
          if (direction === 'horizontal' || direction === 'grid') {
            e.preventDefault();
            nextIndex = currentIndex - 1;
          }
          break;
          
        case 'Home':
          e.preventDefault();
          nextIndex = 0;
          break;
          
        case 'End':
          e.preventDefault();
          nextIndex = items.length - 1;
          break;
          
        default:
          return;
      }
      
      // Handle looping
      if (loop) {
        if (nextIndex < 0) nextIndex = items.length - 1;
        if (nextIndex >= items.length) nextIndex = 0;
      } else {
        nextIndex = Math.max(0, Math.min(nextIndex, items.length - 1));
      }
      
      items[nextIndex]?.focus();
    };
    
    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [containerRef, direction, loop, itemSelector]);
};

/**
 * Live region hook for dynamic content updates
 */
export const useLiveRegion = () => {
  const liveRegionRef = useRef<HTMLDivElement>(null);
  
  const updateLiveRegion = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (liveRegionRef.current) {
      liveRegionRef.current.setAttribute('aria-live', priority);
      liveRegionRef.current.textContent = message;
    }
  };
  
  const LiveRegion = () => (
    <div
      ref={liveRegionRef}
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    />
  );
  
  return { updateLiveRegion, LiveRegion };
};

/**
 * Intersection observer hook for lazy loading and animations
 */
export const useIntersectionObserver = (
  options: IntersectionObserverInit = {}
) => {
  const elementRef = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1, ...options }
    );
    
    observer.observe(element);
    
    return () => observer.disconnect();
  }, [options]);
  
  return [elementRef, isIntersecting] as const;
};

/**
 * Reduce motion preference hook
 */
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReducedMotion;
};

/**
 * Form validation hook with accessibility features
 */
export const useAccessibleForm = <T extends Record<string, any>>(
  initialData: T,
  validationRules: Record<keyof T, (value: any) => string | null>
) => {
  const [formData, setFormData] = React.useState<T>(initialData);
  const [errors, setErrors] = React.useState<Record<keyof T, string>>({} as Record<keyof T, string>);
  const announce = useAnnouncements();
  
  const validateField = (name: keyof T, value: any) => {
    const error = validationRules[name]?.(value);
    setErrors(prev => ({
      ...prev,
      [name]: error || ''
    }));
    return !error;
  };
  
  const validateForm = () => {
    const newErrors: Record<keyof T, string> = {} as Record<keyof T, string>;
    let isValid = true;
    
    Object.keys(validationRules).forEach(key => {
      const error = validationRules[key as keyof T](formData[key as keyof T]);
      if (error) {
        newErrors[key as keyof T] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    
    if (!isValid) {
      const errorCount = Object.keys(newErrors).length;
      announce(`Form has ${errorCount} error${errorCount > 1 ? 's' : ''}. Please correct them.`, 'assertive');
      
      // Focus first error field
      const firstErrorField = Object.keys(newErrors)[0];
      setTimeout(() => {
        document.getElementById(firstErrorField)?.focus();
      }, 100);
    }
    
    return isValid;
  };
  
  const updateField = (name: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const resetForm = () => {
    setFormData(initialData);
    setErrors({} as Record<keyof T, string>);
  };
  
  return {
    formData,
    errors,
    validateField,
    validateForm,
    updateField,
    resetForm
  };
};

// Missing React import for hooks that use React.useState
import React from 'react';

export default {
  useAnnouncements,
  useFocusManagement,
  useFocusTrap,
  useKeyboardNavigation,
  useLiveRegion,
  useIntersectionObserver,
  useReducedMotion,
  useAccessibleForm
};