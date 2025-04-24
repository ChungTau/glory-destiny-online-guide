'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@glory-destiny-online-guide/ui/lib/utils';
import Link from 'next/link';
import { NavItemConfigUnion } from '@/types/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@glory-destiny-online-guide/ui/components/tooltip';
import DynamicIcon from '@/components/common/DynamicIcon';
import { useLocale, useTranslations } from 'next-intl';
import { navAnimations } from '@/lib/animations/navAnimations';

interface NavItemLinkProps {
  item: NavItemConfigUnion;
  isMinimal: boolean;
  index: number;
  isTooltipVisible: boolean;
  normalizedPathname: string;
  normalizedItemHref: string;
}

const debug = (message: string, data?: any) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(message, data);
  }
};

const NavItemLink = ({
  item,
  isMinimal,
  index,
  isTooltipVisible,
  normalizedPathname,
  normalizedItemHref,
}: NavItemLinkProps) => {
  const t = useTranslations('nav-item');
  const locale = useLocale();
  const { textVariants, menuVariants, textRevealVariants } = navAnimations;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={`/${locale}${item.href}`}
            className={cn(
              'flex w-full items-center justify-items-center rounded-lg text-sm font-medium transition-colors duration-200 h-[47px] px-3.5',
              normalizedPathname === normalizedItemHref
                ? 'hover:bg-primary/80 hover:text-primary-foreground'
                : 'hover:bg-accent hover:text-accent-foreground',
              isMinimal ? 'w-[47px]' : 'w-full'
            )}
            aria-label={t(item.label)}
          >
            <div className={cn('flex items-center')}>
              <div
                className={cn(
                  'flex items-center',
                  isMinimal ? 'gap-0' : 'gap-3'
                )}
              >
                <div className="flex-shrink-0 w-5 h-5">
                  <DynamicIcon
                    name={item.iconName}
                    className="h-5 w-5"
                    style={{ aspectRatio: '1/1' }}
                  />
                </div>
                <motion.span
                  variants={textVariants}
                  animate={isMinimal ? 'minimal' : 'open'}
                  transition={{
                    duration: 0.25,
                    ease: 'easeInOut',
                    delay: isMinimal ? 0 : 0.25, // Delay label in full mode
                  }}
                >
                  {!isMinimal && t(item.label)}
                </motion.span>
              </div>
            </div>
          </Link>
        </TooltipTrigger>
        <AnimatePresence>
          {isMinimal && isTooltipVisible && (
            <TooltipContent
              side="right"
              className="translate-x-[7px] bg-primary text-primary-foreground rounded-lg p-2"
              key="tooltip-content"
            >
              <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{
                  duration: 0.2,
                  ease: 'easeIn',
                  delay: 0.2,
                  opacity: { duration: 0.2, ease: 'easeIn', delay: 0.2 },
                  x: { duration: 0.2, ease: 'easeIn', delay: 0.1 },
                  exit: {
                    opacity: { duration: 0, ease: 'easeOut' },
                    x: { duration: 0, ease: 'easeOut' },
                  },
                }}
                onAnimationStart={() =>
                  debug('Tooltip animation start', Date.now())
                }
              >
                <p>
                  {t(item.label)
                    .split('')
                    .map((char, i) => (
                      <motion.span
                        key={`${char}-${i}`}
                        variants={textRevealVariants}
                        initial="hidden"
                        animate="visible"
                        custom={i}
                        onAnimationStart={() =>
                          debug('Text reveal start', Date.now())
                        }
                      >
                        {char}
                      </motion.span>
                    ))}
                </p>
              </motion.div>
            </TooltipContent>
          )}
        </AnimatePresence>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NavItemLink;
