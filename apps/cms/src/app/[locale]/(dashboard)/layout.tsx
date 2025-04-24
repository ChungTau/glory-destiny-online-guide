'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSidebarStore } from '@/lib/store/useSidebarStore';
import { Sidebar } from '@/components/layouts/Sidebar';
import { Header } from '@/components/layouts/Header';
import { MainContent } from '@/components/layouts/MainContent';
import { debounce } from '@/lib/utils/debounce';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    isSidebarOpen,
    isMinimal,
    toggleSidebar,
    setIsSidebarOpen,
    setIsMinimal,
  } = useSidebarStore();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  );
  const [prevIsMobile, setPrevIsMobile] = useState(isMobile);
  const [isTransitioningToDesktop, setIsTransitioningToDesktop] =
    useState(false);

  // Handle responsive sidebar behavior
  useEffect(() => {
    const handleResize = debounce(() => {
      const mobile = window.innerWidth < 768;

      if (!mobile && prevIsMobile) {
        setIsTransitioningToDesktop(true);
        setIsMobile(false);
        setIsSidebarOpen(true);
        setIsMinimal(false);
        setPrevIsMobile(false);
        setTimeout(() => setIsTransitioningToDesktop(false), 300);
      } else if (mobile && !prevIsMobile) {
        setIsMobile(true);
        setIsSidebarOpen(false);
        setIsMinimal(false);
        setPrevIsMobile(true);
      } else {
        setIsMobile(mobile);
        setPrevIsMobile(mobile);
      }
    }, 50);

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsSidebarOpen, setIsMinimal, prevIsMobile]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMinimal={isMinimal}
        isMobile={isMobile}
        isTransitioningToDesktop={isTransitioningToDesktop}
        pathname={pathname}
        toggleSidebar={toggleSidebar}
      />
      <MainContent isMinimal={isMinimal} isMobile={isMobile}>
        <Header
          pathname={pathname}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        {children}
      </MainContent>
    </div>
  );
}
