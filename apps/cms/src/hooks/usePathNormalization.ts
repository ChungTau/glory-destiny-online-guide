import { useMemo } from 'react';
import { useLocale } from 'next-intl';
import { NavItemConfigUnion } from '@/types/navigation';

export const usePathNormalization = (
  item: NavItemConfigUnion,
  pathname: string
) => {
  const locale = useLocale();

  const normalizePath = (path: string | undefined): string => {
    if (!path) return ''; // Handle undefined or empty path
    const normalized = path
      .replace(`/${locale}/`, '/') // Remove locale prefix (ensure trailing slash)
      .replace(/^\/+|\/+$/g, ''); // Trim leading/trailing slashes
    return normalized || '/'; // Preserve '/' for root path
  };

  return useMemo(() => {
    const normalizedPathname = normalizePath(pathname);
    const normalizedItemHref = item.href ? normalizePath(item.href) : '';
    const isSubItemActive =
      item.children?.some(
        (subItem) => normalizePath(subItem.href) === normalizedPathname
      ) || false;

    console.log('Path normalization:', {
      item: item.name,
      pathname,
      normalizedPathname,
      normalizedItemHref,
      isSubItemActive,
      subItems: item.children?.map((sub) => ({
        name: sub.name,
        href: sub.href,
        normalized: normalizePath(sub.href),
      })),
    });

    return {
      normalizedPathname,
      normalizedItemHref,
      isSubItemActive,
    };
  }, [item, pathname, locale]);
};
