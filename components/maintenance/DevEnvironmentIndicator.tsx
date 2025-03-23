'use client';

interface DevEnvironmentIndicatorProps {
  /**
   * Whether to show the indicator
   * Usually tied to environment variables
   */
  show: boolean;
}

/**
 * Visual indicator for development environment
 */
export default function DevEnvironmentIndicator({
  show
}: DevEnvironmentIndicatorProps) {
  if (!show) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-purple-600 text-white text-md px-3 py-1 rounded-full shadow-lg">
      Development Environment
    </div>
  );
}