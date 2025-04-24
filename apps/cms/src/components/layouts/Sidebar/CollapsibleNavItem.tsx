'use client';

import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@glory-destiny-online-guide/ui/lib/utils';
import { NavItemConfigUnion } from '@/types/navigation';
import { useTranslations } from 'next-intl';
import { usePathNormalization } from '@/hooks/usePathNormalization';
import { useHoverMenu } from '@/hooks/useHoverMenu';
import NavItemButton from './NavItemButton';
import NavItemLink from './NavItemLink';
import HoverMenu from './HoverMenu';
import SubNavList from './SubNavList';
import { createPortal } from 'react-dom';

interface CollapsibleNavItemProps {
  item: NavItemConfigUnion;
  isMinimal: boolean;
  index: number;
  pathname: string;
  isSidebarOpen: boolean;
}

const debug = (message: string, data?: any) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(message, data);
  }
};

const CollapsibleNavItem = memo(
  ({
    item,
    isMinimal,
    index,
    pathname,
    isSidebarOpen,
  }: CollapsibleNavItemProps) => {
    const t = useTranslations('nav-item');
    const [isOpen, setIsOpen] = useState(false);
    const [isManuallyToggled, setIsManuallyToggled] = useState(false);
    const { normalizedPathname, normalizedItemHref, isSubItemActive } =
      usePathNormalization(item, pathname);
    const {
      isHovered,
      isTooltipVisible,
      menuPosition,
      navItemRef,
      handleHoverStart,
      handleHoverEnd,
      handleMenuHoverStart,
      handleMenuHoverEnd,
    } = useHoverMenu(isMinimal, !!item.children);

    // Reset isOpen when switching to minimal mode
    useEffect(() => {
      if (isMinimal && isOpen) {
        setIsOpen(false);
        setIsManuallyToggled(true);
        debug('Closed SubNavList due to minimal mode', {
          item: item.name,
          isMinimal,
          isOpen: false,
        });
      }
    }, [isMinimal, isOpen, item.name]);

    // Reset isManuallyToggled on pathname change
    useEffect(() => {
      debug('Rendering CollapsibleNavItem', {
        item: item.name,
        hasChildren: !!item.children,
        href: item.href,
        normalizedItemHref,
        normalizedPathname,
        isSubItemActive,
        isMinimal,
        isOpen,
      });
      setIsManuallyToggled(false);
      debug('Pathname changed, reset isManuallyToggled', {
        pathname,
        itemLabel: t(item.label),
      });
    }, [
      pathname,
      t,
      item.label,
      item.name,
      item.href,
      normalizedItemHref,
      normalizedPathname,
      isSubItemActive,
      isMinimal,
    ]);

    // Auto-expand when sub-item is active
    useEffect(() => {
      if (isSidebarOpen && isSubItemActive && !isOpen && !isManuallyToggled) {
        const timer = setTimeout(() => {
          setIsOpen(true);
          debug('Auto-expand triggered', {
            item: item.name,
            isOpen: true,
            isSubItemActive,
            isManuallyToggled,
          });
        }, 250);
        return () => clearTimeout(timer);
      }
    }, [isSubItemActive, isOpen, isManuallyToggled, isSidebarOpen, item.name]);

    const portalContainer =
      typeof document !== 'undefined'
        ? document.getElementById('sidebar-menu-portal')
        : null;

    return (
      <>
        <motion.div
          className={cn(
            'h-auto relative',
            isSubItemActive
              ? 'bg-primary text-primary-foreground rounded-lg'
              : normalizedPathname === normalizedItemHref && normalizedItemHref
                ? 'bg-primary text-primary-foreground shadow-sm rounded-lg'
                : 'bg-transparent'
          )}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          ref={navItemRef}
        >
          {item.children ? (
            <NavItemButton
              item={item}
              isMinimal={isMinimal}
              index={index}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setIsManuallyToggled={setIsManuallyToggled}
              isSubItemActive={isSubItemActive}
              normalizedPathname={normalizedPathname}
              normalizedItemHref={normalizedItemHref}
            />
          ) : (
            <NavItemLink
              item={item}
              isMinimal={isMinimal}
              index={index}
              isTooltipVisible={isTooltipVisible}
              normalizedPathname={normalizedPathname}
              normalizedItemHref={normalizedItemHref}
            />
          )}
          {!isMinimal && item.children && (
            <SubNavList
              isOpen={isOpen}
              items={item.children}
              normalizedPathname={normalizedPathname}
            />
          )}
        </motion.div>
        {isMinimal &&
          isHovered &&
          item.children &&
          portalContainer &&
          createPortal(
            <HoverMenu
              item={item}
              isHovered={isHovered}
              menuPosition={menuPosition}
              normalizedPathname={normalizedPathname}
              handleMenuHoverStart={handleMenuHoverStart}
              handleMenuHoverEnd={handleMenuHoverEnd}
            />,
            portalContainer
          )}
      </>
    );
  }
);

CollapsibleNavItem.displayName = 'CollapsibleNavItem';
export default CollapsibleNavItem;
