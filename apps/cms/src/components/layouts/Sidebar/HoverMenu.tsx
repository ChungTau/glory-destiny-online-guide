'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@glory-destiny-online-guide/ui/lib/utils';
import Link from 'next/link';
import { NavItemConfigUnion } from '@/types/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { navAnimations } from '@/lib/animations/navAnimations';

interface HoverMenuProps {
  item: NavItemConfigUnion;
  isHovered: boolean;
  menuPosition: { top: number; left: number };
  normalizedPathname: string;
  handleMenuHoverStart: () => void;
  handleMenuHoverEnd: () => void;
}

const debug = (message: string, data?: any) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(message, data);
  }
};

const HoverMenu = ({
  item,
  isHovered,
  menuPosition,
  normalizedPathname,
  handleMenuHoverStart,
  handleMenuHoverEnd,
}: HoverMenuProps) => {
  const t = useTranslations('nav-item');
  const locale = useLocale();
  const { menuVariants, menuTextRevealVariants } = navAnimations;

  return (
    <motion.div
      key="hover-menu"
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{
        duration: 0.1,
        ease: 'easeOut',
        delay: 0.2,
        opacity: { duration: 0.1, ease: 'easeOut', delay: 0.2 },
        x: { duration: 0.1, ease: 'easeOut', delay: 0.2 },
        exit: {
          opacity: { duration: 0.1, ease: 'easeOut' },
          x: { duration: 0.1, ease: 'easeOut' },
        },
      }}
      className={cn(
        'fixed w-48 bg-primary text-primary-foreground rounded-xl shadow-md p-2 z-50 space-y-1',
        'before:content-[""] before:absolute before:top-4 before:-left-2',
        'before:w-0 before:h-0 before:border-t-8 before:border-t-transparent',
        'before:border-b-8 before:border-b-transparent before:border-r-8',
        'before:border-r-primary'
      )}
      style={{ top: menuPosition.top, left: menuPosition.left }}
      onMouseEnter={handleMenuHoverStart}
      onMouseLeave={handleMenuHoverEnd}
    >
      <AnimatePresence>
        {item.children?.map((subItem, subIndex) => (
          <motion.div
            key={subItem.href}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{
              duration: 0.1,
              ease: 'easeOut',
              delay: 0.2 + subIndex * 0.05, // Stagger items by 50ms
            }}
          >
            <Link
              href={`/${locale}${subItem.href}`}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors duration-200 w-full',
                subItem.href === normalizedPathname
                  ? 'bg-accent/10 text-primary-foreground'
                  : 'hover:bg-accent/20 hover:text-primary-foreground'
              )}
              role="menuitem"
            >
              <span>
                {t(subItem.label)
                  .split('')
                  .map((char, i) => (
                    <motion.span
                      key={`${subItem.href}-${char}-${i}`}
                      variants={menuTextRevealVariants}
                      initial="hidden"
                      animate="visible"
                      custom={i + subIndex * 10}
                      onAnimationStart={() =>
                        debug(
                          `Menu text reveal start: ${subItem.label}, char ${i}`,
                          Date.now()
                        )
                      }
                      style={{ display: 'inline-block' }}
                    >
                      {char}
                    </motion.span>
                  ))}
              </span>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default HoverMenu;
