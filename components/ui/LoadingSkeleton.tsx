import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  height?: string;
  lines?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  className = '', 
  height = 'h-4',
  lines = 1 
}) => (
  <div className={`animate-pulse ${className}`} role="status" aria-label="Loading content">
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className={`bg-gray-200 rounded ${height} mb-2`} />
    ))}
    <span className="sr-only">Loading...</span>
  </div>
);

export const ImageSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} role="status">
    <span className="sr-only">Loading image...</span>
  </div>
);