import React from "react";
import { AccessibleButton } from "./AccessibleButton";

// ERROR BOUNDARY WITH ACCESSIBILITY

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class AccessibleErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div
          className="p-8 text-center"
          role="alert"
          aria-labelledby="error-title"
          aria-describedby="error-description"
        >
          <h2 id="error-title" className="text-2xl font-bold text-red-600 mb-4">
            Something went wrong
          </h2>
          <p id="error-description" className="text-gray-600 mb-4">
            We're sorry, but something unexpected happened. Please try refreshing the page.
          </p>
          <AccessibleButton
            onClick={() => window.location.reload()}
            variant="primary"
          >
            Refresh Page
          </AccessibleButton>
        </div>
      );
    }
    
    return this.props.children;
  }
}