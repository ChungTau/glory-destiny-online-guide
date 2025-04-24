import { useState, useEffect, useRef } from 'react';
import { debounce } from '@/lib/utils/debounce';

export const useHoverMenu = (isMinimal: boolean, hasChildren: boolean) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const navItemRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debug = (message: string, data?: any) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(message, data);
    }
  };

  // Debounce menu position updates
  const updateMenuPosition = debounce(() => {
    if (isHovered && navItemRef.current && isMinimal && hasChildren) {
      const rect = navItemRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.top + window.scrollY,
        left: rect.right + 20, // 1.25rem = 20px
      });
      debug('Menu position updated', {
        top: rect.top + window.scrollY,
        left: rect.right + 20,
      });
    }
  }, 100);

  useEffect(() => {
    updateMenuPosition();
  }, [isHovered, isMinimal, hasChildren, updateMenuPosition]);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
      updateMenuPosition.cancel(); // Cancel debounce on unmount
    };
  }, [updateMenuPosition]);

  const handleHoverStart = () => {
    if (!isMinimal) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    debug('Hover start', Date.now());
    if (hasChildren) {
      setIsHovered(true);
    } else {
      tooltipTimeoutRef.current = setTimeout(() => {
        setIsTooltipVisible(true);
        debug('Tooltip visible', Date.now());
      }, 200);
    }
  };

  const handleHoverEnd = () => {
    if (!isMinimal) return;
    if (tooltipTimeoutRef.current) clearTimeout(tooltipTimeoutRef.current);
    if (hasChildren) {
      hoverTimeoutRef.current = setTimeout(() => {
        debug('Hover end', Date.now());
        setIsHovered(false);
        debug('Exit animation start', Date.now());
      }, 100);
    } else {
      setIsTooltipVisible(false);
    }
  };

  const handleMenuHoverStart = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    debug('Menu hover start', Date.now());
    setIsHovered(true);
  };

  const handleMenuHoverEnd = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      debug('Menu hover end', Date.now());
      setIsHovered(false);
      debug('Exit animation start', Date.now());
    }, 100);
  };

  return {
    isHovered,
    isTooltipVisible,
    menuPosition,
    navItemRef,
    handleHoverStart,
    handleHoverEnd,
    handleMenuHoverStart,
    handleMenuHoverEnd,
  };
};
