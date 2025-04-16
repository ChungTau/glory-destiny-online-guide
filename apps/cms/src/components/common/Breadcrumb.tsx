'use client';

import { useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

export function Breadcrumb() {
  const pathname = usePathname();
  const t = useTranslations('common');
  const locale = useLocale();

  // Memoize segments so we recompute only when pathname or locale changes.
  const segments = useMemo(() => {
    return pathname
      .split('/')
      .filter((segment) => segment && segment !== locale);
  }, [pathname, locale]);

  return (
    <nav
      className="flex items-center space-x-2 text-sm text-gray-600"
      aria-label="Breadcrumb"
    >
      <Link href="/admin" className="hover:text-primary">
        {t('home')}
      </Link>
      {segments.map((segment, index) => {
        // Reconstruct the path for each breadcrumb segment.
        const path = `/${segments.slice(0, index + 1).join('/')}`;
        const isLast = index === segments.length - 1;
        return (
          <span key={`${segment}-${index}`} className="flex items-center">
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
}
