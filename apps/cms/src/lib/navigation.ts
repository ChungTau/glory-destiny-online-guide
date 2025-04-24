import { NavItem } from '@glory-destiny-online-guide/prisma';
import { IconName } from '@/components/common/DynamicIcon';

// Define NavItemConfig with conditional href based on children
export interface NavItemConfig
  extends Omit<NavItem, 'id' | 'createdAt' | 'updatedAt'> {
  iconName?: IconName;
}

// Separate interfaces for items with and without children
export interface NavItemWithChildren extends NavItemConfig {
  children: NavItemWithoutChildren[];
  href?: never; // href is optional and typically not used
}

export interface NavItemWithoutChildren extends NavItemConfig {
  children?: never; // No children
  href: string; // href is required
}

// Union type for NavItemConfig
export type NavItemConfigUnion = NavItemWithChildren | NavItemWithoutChildren;

// List of valid Lucide icon names (subset for validation)
const validIconNames = [
  'layout-dashboard',
  'globe',
  'user-2',
  'file-text',
  'star',
] as const;

// Example navigation items
export const coreNavItems: NavItemConfigUnion[] = [
  {
    name: 'dashboard',
    href: '/',
    label: 'dashboard',
    iconName: 'layout-dashboard',
    order: 0,
  } as NavItemWithoutChildren,
  {
    name: 'geography',
    label: 'geography',
    iconName: 'globe',
    order: 1,
    children: [
      {
        name: 'nation',
        href: '/geography/nation',
        label: 'nation',
        order: 0,
      } as NavItemWithoutChildren,
      {
        name: 'area',
        href: '/geography/area',
        label: 'area',
        order: 1,
      } as NavItemWithoutChildren,
    ],
  } as NavItemWithChildren,
  {
    name: 'role',
    href: '/role',
    label: 'role',
    iconName: 'user-2',
    order: 2,
  } as NavItemWithoutChildren,
];

export class NavigationRegistry {
  private items: ReadonlyArray<NavItemConfigUnion> = [...coreNavItems];

  // Validate icon name
  private isValidIconName(icon: string | null | undefined): icon is IconName {
    return typeof icon === 'string' && validIconNames.includes(icon as any);
  }

  // Validate and format nav item
  private formatNavItem({
    id,
    createdAt,
    updatedAt,
    icon,
    children,
    href,
    name,
    label,
    order,
  }: NavItem): NavItemConfigUnion {
    const baseItem = {
      name,
      label,
      order,
      iconName: this.isValidIconName(icon) ? icon : 'file-text',
    };

    if (children && children.length > 0) {
      return {
        ...baseItem,
        children: children.map((child) => ({
          name: child.name,
          label: child.label,
          order: child.order,
          href: child.href || `/${child.name}`, // Ensure href
          children: undefined,
        })) as NavItemWithoutChildren[],
      } as NavItemWithChildren;
    }

    return {
      ...baseItem,
      href: href || `/${name}`, // Fallback href
      children: undefined,
    } as NavItemWithoutChildren;
  }

  // Merge static and dynamic items
  private mergeNavItems(dynamicItems: NavItem[]): NavItemConfigUnion[] {
    console.log('Merging dynamic items:', dynamicItems);
    const formattedDynamic: NavItemConfigUnion[] = dynamicItems
      .filter((item) => item.name && item.label && item.order != null)
      .map((item) => this.formatNavItem(item));
    const merged = [...coreNavItems, ...formattedDynamic].sort(
      (a, b) => a.order - b.order
    );
    console.log('Merged nav items:', merged);
    return merged;
  }

  // Register dynamic nav items
  async registerDynamic({
    signal,
  }: { signal?: AbortSignal } = {}): Promise<void> {
    try {
      console.log(
        'Fetching dynamic nav items from:',
        process.env.NEXT_PUBLIC_API_URL ?? '/api/nav-items'
      );
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL ?? '/api/nav-items',
        { signal }
      );
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      const dynamicItems: NavItem[] = await response.json();
      this.items = this.mergeNavItems(dynamicItems);
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Failed to fetch dynamic nav items:', error);
      }
      this.items = [...coreNavItems]; // Fallback to core items
    }
  }

  // Get all navigation items, sorted by order
  getItems(): NavItemConfigUnion[] {
    return [...this.items].sort((a, b) => a.order - b.order);
  }
}

export const navigationRegistry = new NavigationRegistry();
