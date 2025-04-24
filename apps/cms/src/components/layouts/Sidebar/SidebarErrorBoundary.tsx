'use client';

import React from 'react';

interface SidebarErrorBoundaryProps {
  children: React.ReactNode;
}

interface SidebarErrorBoundaryState {
  hasError: boolean;
}

export class SidebarErrorBoundary extends React.Component<
  SidebarErrorBoundaryProps,
  SidebarErrorBoundaryState
> {
  state: SidebarErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-red-500">Error loading sidebar</div>;
    }
    return this.props.children;
  }
}
