'use client';

import { useCallback, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Globe } from 'lucide-react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Button } from '@glory-destiny-online-guide/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@glory-destiny-online-guide/ui/components/dropdown-menu';
import { cn } from '@glory-destiny-online-guide/ui/lib/utils';

export function LanguageSwitcher() {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Memoize languages array so it doesn't get re-created unnecessarily.
  const languages = useMemo(
    () => [
      { code: 'en', label: t('english') },
      { code: 'zh-hk', label: t('chinese') },
    ],
    [t]
  );

  const changeLanguage = useCallback(
    (lng: string) => {
      if (lng !== locale) {
        router.push(pathname, { locale: lng });
      }
    },
    [locale, pathname, router]
  );

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
}
