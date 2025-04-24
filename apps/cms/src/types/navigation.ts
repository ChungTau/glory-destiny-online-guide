import { NavItem } from '@glory-destiny-online-guide/prisma';
import { IconName } from '@/components/common/DynamicIcon';

// Define NavItemConfig with conditional href based on children
export interface NavItemConfig
  extends Omit<NavItem, 'id' | 'createdAt' | 'updatedAt'> {
  iconName?: IconName;
}

// Separate interfaces for items with and without children
export interface NavItemWithChildren extends NavItemConfig {
  children: NavItemConfig[];
  href?: never; // href is optional and typically not used
}

export interface NavItemWithoutChildren extends NavItemConfig {
  children?: never; // No children
  href: string; // href is required
}

// Union type for NavItemConfig
export type NavItemConfigUnion = NavItemWithChildren | NavItemWithoutChildren;
