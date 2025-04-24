'use client';

import { motion } from 'framer-motion';
import { NavItemConfigUnion } from '@/types/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { cn } from '@glory-destiny-online-guide/ui/lib/utils';
import { Dot } from 'lucide-react';

interface SubNavListProps {
  isOpen: boolean;
  items: NavItemConfigUnion[];
  normalizedPathname: string;
}

const listVariants = {
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: 'easeInOut',
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: 'easeInOut',
    },
  },
};

const debug = (message: string, data?: any) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(message, data);
  }
};

const SubNavList = ({ isOpen, items, normalizedPathname }: SubNavListProps) => {
  const t = useTranslations('nav-item');

  const normalizePath = (path: string): string => {
    return path.replace(/^\/+|\/+$/g, '') || '/';
  };

  return (
    <motion.ul
      variants={listVariants}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      className={cn('overflow-hidden')}
      role="menu"
    >
      {items.map((subItem, index) => {
        const normalizedSubItemHref = normalizePath(subItem.href);
        const isActive = normalizedPathname === normalizedSubItemHref;

        debug('SubNavList item:', {
          name: subItem.name,
          href: subItem.href,
          normalizedSubItemHref,
          normalizedPathname,
          isActive,
        });

        return (
          <li key={subItem.name} role="menuitem">
            <Link
              href={subItem.href}
              className={cn(
                'flex items-center gap-2 py-2 pl-10 pr-4 text-sm transition-colors duration-200 hover:bg-accent/10',
                isActive
                  ? 'text-primary-foreground font-medium'
                  : 'text-muted-foreground hover:text-primary-foreground',
                index === items.length - 1 ? 'mb-3' : ''
              )}
              aria-label={t(subItem.label)}
            >
              <Dot className="h-4 w-4" />
              {t(subItem.label)}
            </Link>
          </li>
        );
      })}
    </motion.ul>
  );
};

export default SubNavList;
