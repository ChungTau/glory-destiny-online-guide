'use client';

import { useMemo } from 'react';
import { Button } from '@glory-destiny-online-guide/ui/components/button';
import { navigationRegistry } from '@/lib/navigation';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';

interface HeaderProps {
  pathname: string;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

/**
 * Header component for the dashboard layout, including sidebar toggle, page title, and settings button.
 * @param pathname - Current URL pathname for dynamic page title.
 * @param toggleSidebar - Function to toggle the sidebar.
 * @param isSidebarOpen - Boolean indicating if the sidebar is open.
 */
export default function Header({
  pathname,
  toggleSidebar,
  isSidebarOpen,
}: HeaderProps) {
  const navItems = useMemo(() => navigationRegistry.getItems(), []);

  return (
    <header
      role="banner"
      className="bg-card border-b p-4 flex items-center justify-between shadow-sm"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        aria-expanded={isSidebarOpen}
        aria-controls="sidebar"
        className="hover:bg-accent/50"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </Button>
      <h2 className="text-lg font-semibold">
        {navItems.find((item) => pathname.includes(item.href))?.label ||
          'Dashboard'}
      </h2>
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
      </div>
    </header>
  );
}
