// apps/cms/src/components/common/Sidebar.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { Button } from '@glory-destiny-online-guide/ui/components/button';
import { cn } from '@glory-destiny-online-guide/ui/lib/utils';
import { create } from 'zustand';
import { navigationRegistry } from '@/lib/navigation';
import Image from 'next/image';

type SidebarStore = {
  isOpen: boolean;
  toggle: () => void;
};

const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export function Sidebar() {
  const { isOpen, toggle } = useSidebarStore();
  const t = useTranslations('common');
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  // Memoize the toggle handler to avoid recreating the function on each render.
  const handleToggle = useCallback(() => {
    toggle();
  }, [toggle]);

  useEffect(() => {
    const loadDynamicItems = async () => {
      setIsLoading(true);
      await navigationRegistry.registerDynamic();
      setIsLoading(false);
    };
    loadDynamicItems();
  }, []);

  const navItems = navigationRegistry.getItems();

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={handleToggle}
        aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      <aside
        className={cn(
          'fixed inset-y-0 left-0 w-64 bg-white shadow-lg md:shadow-md transform transition-transform md:translate-x-0 md:static',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Sidebar"
      >
        <div className="p-6">
          <Link href="/admin" className="flex items-center space-x-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH}/next.svg`}
              alt="Glory Destiny Online Guide"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-xl font-bold">GDO Guide</span>
          </Link>
        </div>
        <nav className="mt-4">
          {isLoading ? (
            <div className="px-6 py-2 text-gray-600">{t('loading')}</div>
          ) : (
            navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block px-6 py-2 text-gray-600 hover:bg-gray-100 hover:text-primary',
                  pathname === item.href &&
                    'bg-gray-100 text-primary font-semibold'
                )}
                onClick={handleToggle}
              >
                {t(item.label)}
              </Link>
            ))
          )}
        </nav>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={handleToggle}
          aria-hidden="true"
        />
      )}
    </>
  );
}
