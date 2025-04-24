'use client';

import { ReactNode } from 'react';
import { cn } from '@glory-destiny-online-guide/ui/lib/utils';
import React from 'react';
import MainContentErrorBoundary from './MainContentErrorBoundary';

interface MainContentProps {
  isMinimal: boolean;
  isMobile: boolean;
  children: ReactNode;
}

/**
 * Main content component for the dashboard layout, including error boundary and content area.
 * @param isMinimal - Boolean indicating if the sidebar is in minimal mode.
 * @param isMobile - Boolean indicating if the viewport is mobile (<768px).
 * @param children - The content to render in the main area.
 */
export default function MainContent({
  isMinimal,
  isMobile,
  children,
}: MainContentProps) {
  return (
    <main
      id="main-content"
      role="main"
      className={cn(
        'flex-1 transition-all duration-300',
        isMinimal ? 'md:ml-16' : 'md:ml-56',
        isMobile ? 'ml-0' : '',
        'sm:px-4 sm:pt-2'
      )}
    >
      <div className="p-4 sm:p-4">
        <MainContentErrorBoundary>{children}</MainContentErrorBoundary>
      </div>
    </main>
  );
}
