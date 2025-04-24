'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@glory-destiny-online-guide/ui/lib/utils';
import Image from 'next/image';
import { Button } from '@glory-destiny-online-guide/ui/components/button';
import { ScrollArea } from '@glory-destiny-online-guide/ui/components/scroll-area';
import { LogOut } from 'lucide-react';
import { navigationRegistry } from '@/lib/navigation';
import { SidebarErrorBoundary } from './SidebarErrorBoundary';
import CollapsibleNavItem from './CollapsibleNavItem';

interface SidebarProps {
  isSidebarOpen: boolean;
  isMinimal: boolean;
  isMobile: boolean;
  isTransitioningToDesktop: boolean;
  pathname: string;
  toggleSidebar: () => void;
}

const Sidebar = ({
  isSidebarOpen,
  isMinimal,
  isMobile,
  isTransitioningToDesktop,
  pathname,
  toggleSidebar,
}: SidebarProps) => {
  const [navItems, setNavItems] = useState(navigationRegistry.getItems());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchNavItems = async () => {
      try {
        console.log('Fetching nav items...');
        setIsLoading(true);
        setError(null);
        await navigationRegistry.registerDynamic({ signal: controller.signal });
        const items = navigationRegistry.getItems();
        console.log('Nav items loaded:', items);
        setNavItems(items);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unknown error';
        console.error('Failed to load nav items:', message);
        setError(`Failed to load navigation: ${message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNavItems();

    return () => controller.abort();
  }, []);

  const sidebarVariants = {
    open: { x: 0, opacity: 1, width: '14rem' },
    minimal: { x: 0, opacity: 1, width: '4rem' },
    closed: { x: '-100%', opacity: 0, width: '0' },
    transition: { x: 0, opacity: 0, width: '14rem' },
  };

  const mobileSidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 },
  };

  const backdropVariants = {
    open: { opacity: 1 },
    closed: { overflow: 'auto', opacity: 0 },
  };

  const titleVariants = {
    open: { width: 100 },
    minimal: { width: 32 },
  };

  const logoutButtonVariants = {
    open: { scale: 1, opacity: 1 },
    minimal: { scale: 0.9, opacity: 1 },
  };

  const imageSrc = process.env.NEXT_PUBLIC_BASE_PATH
    ? `${process.env.NEXT_PUBLIC_BASE_PATH}/next.svg`
    : '/next.svg';

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        className={cn(
          'hidden md:block fixed top-0 left-0 h-full bg-card border-r shadow-sm z-20',
          isMinimal ? 'w-16' : 'w-56'
        )}
        initial={
          isTransitioningToDesktop
            ? 'transition'
            : isMobile
              ? 'closed'
              : isMinimal
                ? 'minimal'
                : 'open'
        }
        animate={isSidebarOpen ? (isMinimal ? 'minimal' : 'open') : 'closed'}
        variants={sidebarVariants}
        transition={
          isTransitioningToDesktop
            ? {
                opacity: { duration: 0.2, ease: 'easeInOut', delay: 0.1 },
                x: { duration: 0 },
                width: { duration: 0 },
              }
            : {
                duration: 0.25,
                ease: 'easeInOut',
                width: { duration: 0.25, ease: 'easeInOut' },
                opacity: { duration: 0.25, ease: 'easeInOut' },
                x: { duration: 0.25, ease: 'easeInOut' },
              }
        }
      >
        <SidebarErrorBoundary>
          <div className="flex h-full flex-col justify-between">
            {/* First Row: Image */}
            <div
              className={cn(
                'h-[100px] flex flex-col',
                isMinimal ? 'p-2' : 'p-4'
              )}
            >
              <motion.div
                variants={titleVariants}
                animate={isMinimal ? 'minimal' : 'open'}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="flex justify-center items-center flex-1"
              >
                <div className="flex-shrink-0">
                  <Image
                    src={imageSrc}
                    alt="Next.js Logo"
                    width={isMinimal ? 32 : 100}
                    height={isMinimal ? 32 : 30}
                    priority
                    className={cn('mx-auto')}
                    style={{ aspectRatio: isMinimal ? '1/1' : '10/3' }}
                  />
                </div>
              </motion.div>
              <hr
                className={cn(
                  'border-t w-full',
                  isMinimal ? 'border-transparent' : 'border-muted'
                )}
              />
            </div>

            {/* Second Row: Navigation */}
            <ScrollArea className="flex-1">
              <nav
                className={cn('flex flex-col items-center space-y-2 p-2')}
                role="navigation"
                aria-label="Main navigation"
              >
                {error ? (
                  <div className="text-center text-sm text-destructive h-[42px]">
                    {error}
                  </div>
                ) : isLoading ? (
                  <div className="text-center text-sm text-muted-foreground h-[42px]">
                    Loading navigation...
                  </div>
                ) : (
                  navItems.map((item, index) => (
                    <div key={item.name} className="w-full">
                      <CollapsibleNavItem
                        item={item}
                        isMinimal={isMinimal}
                        index={index}
                        pathname={pathname}
                        isSidebarOpen={isSidebarOpen}
                      />
                    </div>
                  ))
                )}
              </nav>
            </ScrollArea>

            {/* Third Row: Logout Button */}
            <div
              className={cn(
                'h-[100px] flex items-center',
                isMinimal ? 'p-2' : 'p-4'
              )}
            >
              <motion.div
                variants={logoutButtonVariants}
                animate={isMinimal ? 'minimal' : 'open'}
                transition={{ duration: 0.25, ease: 'easeInOut', delay: 0.1 }}
                className="w-full"
              >
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full h-[36px] flex items-center transition-colors duration-200',
                    isMinimal ? 'justify-center p-1' : 'justify-start py-2',
                    'hover:bg-accent/50'
                  )}
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  {!isMinimal && 'Logout'}
                </Button>
              </motion.div>
            </div>
          </div>
        </SidebarErrorBoundary>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && isMobile && !isTransitioningToDesktop && (
          <motion.aside
            key="mobile-sidebar"
            className="md:hidden fixed top-0 left-0 h-full w-56 bg-card border-r z-30 shadow-lg"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileSidebarVariants}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <SidebarErrorBoundary>
              <div className="flex h-full flex-col justify-between">
                {/* First Row: Image */}
                <div className="h-[100px] flex flex-col p-4">
                  <div className="flex justify-center items-center flex-1">
                    <div className="flex-shrink-0">
                      <Image
                        src={imageSrc}
                        alt="Next.js Logo"
                        width={100}
                        height={30}
                        style={{ aspectRatio: '10/3' }}
                      />
                    </div>
                  </div>
                  <hr className="border-t border-muted w-full" />
                </div>

                {/* Second Row: Navigation */}
                <ScrollArea className="flex-1">
                  <nav
                    className="flex flex-col items-center space-y-2 p-2"
                    role="navigation"
                    aria-label="Main navigation"
                  >
                    {error ? (
                      <div className="text-center text-sm text-destructive min-h-[36px]">
                        {error}
                      </div>
                    ) : isLoading ? (
                      <div className="text-center text-sm text-muted-foreground min-h-[36px]">
                        Loading navigation...
                      </div>
                    ) : (
                      navItems.map((item) => (
                        <div key={item.name} className="w-full">
                          <CollapsibleNavItem
                            item={item}
                            isMinimal={false}
                            index={0}
                            pathname={pathname}
                            isSidebarOpen={isSidebarOpen}
                          />
                        </div>
                      ))
                    )}
                  </nav>
                </ScrollArea>

                {/* Third Row: Logout Button */}
                <div className="h-[100px] flex items-center p-4">
                  <Button
                    variant="ghost"
                    className="w-full h-[36px] flex items-center justify-start hover:bg-accent/50"
                    aria-label="Logout"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                  </Button>
                </div>
              </div>
            </SidebarErrorBoundary>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isSidebarOpen && isMobile && !isTransitioningToDesktop && (
          <motion.div
            key="backdrop"
            className="md:hidden fixed inset-0 bg-black/50 z-20 backdrop-blur-sm"
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            transition={{ duration: 0.25, ease: 'easeInOut', delay: 0.15 }}
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Portal container for hover menus */}
      <div id="sidebar-menu-portal" />
    </>
  );
};

export default Sidebar;
