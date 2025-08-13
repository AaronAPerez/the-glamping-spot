import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { LoadingSkeleton } from './LoadingSkeleton';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  threshold?: number;
}

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback,
  className = '',
  threshold = 0.1
}) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold });

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : fallback || <LoadingSkeleton lines={3} height="h-64" />}
    </div>
  );
};