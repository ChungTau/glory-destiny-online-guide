'use client';

import { motion } from 'framer-motion';
import { cn } from '@glory-destiny-online-guide/ui/lib/utils';
import { NavItemConfigUnion } from '@/types/navigation';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from '@glory-destiny-online-guide/ui/components/tooltip';
import DynamicIcon from '@/components/common/DynamicIcon';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { navAnimations } from '@/lib/animations/navAnimations';

interface NavItemButtonProps {
  item: NavItemConfigUnion;
  isMinimal: boolean;
  index: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsManuallyToggled: (toggled: boolean) => void;
  isSubItemActive: boolean;
  normalizedPathname: string;
  normalizedItemHref: string;
}

const debug = (message: string, data?: any) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(message, data);
  }
};

const NavItemButton = ({
  item,
  isMinimal,
  index,
  isOpen,
  setIsOpen,
  setIsManuallyToggled,
  isSubItemActive,
  normalizedPathname,
  normalizedItemHref,
}: NavItemButtonProps) => {
  const t = useTranslations('nav-item');
  const { textVariants } = navAnimations;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              setIsManuallyToggled(true);
              debug('Toggle clicked', { isOpen: !isOpen, isSubItemActive });
            }}
            className={cn(
              'flex items-center justify-items-center rounded-lg text-sm font-medium transition-colors duration-200 h-[47px] px-3.5',
              normalizedPathname === normalizedItemHref || isSubItemActive
                ? 'hover:bg-primary/80 hover:text-primary-foreground'
                : 'hover:bg-accent hover:text-accent-foreground',
              isMinimal ? 'w-[47px]' : 'w-full'
            )}
            aria-expanded={isOpen}
            aria-controls={`sub-nav-${item.name}`} // Use item.name instead of item.href
            aria-label={t(item.label)}
          >
            <div
              className={cn(
                'flex items-center',
                isMinimal ? 'justify-center' : 'w-full justify-between'
              )}
            >
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
              {!isMinimal && (
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              )}
            </div>
          </button>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NavItemButton;
