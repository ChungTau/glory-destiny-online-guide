'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Globe } from 'lucide-react';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { Button } from '@glory-destiny-online-guide/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@glory-destiny-online-guide/ui/components/dropdown-menu';
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

const Breadcrumb = () => {
  const pathname = usePathname();
  const t = useTranslations('common');
  const segments = pathname.split('/').filter((segment) => segment);

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600">
      <Link href="/admin" className="hover:text-primary">
        {t('home')}
      </Link>
      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join('/')}`;
        const isLast = index === segments.length - 1;
        return (
          <span key={segment} className="flex items-center">
            <span className="mx-1">/</span>
            {isLast ? (
              <span className="text-gray-900">
                {t(segment, { defaultValue: segment })}
              </span>
            ) : (
              <Link href={path} className="hover:text-primary">
                {t(segment, { defaultValue: segment })}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

const Sidebar = () => {
  const { isOpen, toggle } = useSidebarStore();
  const t = useTranslations('common');
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

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
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={toggle}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      <aside
        className={cn(
          'fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform md:translate-x-0 md:static md:shadow-none',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-6">
          <Link href="/admin" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
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
            <div className="px-6 py-2 text-gray-600">載入中...</div>
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
                onClick={() => useSidebarStore.getState().toggle()}
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
          onClick={toggle}
        />
      )}
    </>
  );
};

const LanguageSwitcher = () => {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: 'en', label: t('english') },
    { code: 'zh-hk', label: t('chinese') },
  ];

  const changeLanguage = (lng: string) => {
    if (lng !== locale) {
      router.push(pathname, { locale: lng });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={cn(locale === lang.code && 'bg-gray-100')}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Breadcrumb />
          <LanguageSwitcher />
        </div>
      </header>
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 md:ml-64">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
