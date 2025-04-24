import React from 'react';

// Main content error boundary
class MainContentErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-red-500">Error loading content</div>;
    }
    return this.props.children;
  }
}

export default MainContentErrorBoundary;
