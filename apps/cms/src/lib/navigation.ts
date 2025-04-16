import { NavItem } from '@glory-destiny-online-guide/prisma';

export interface NavItemConfig
  extends Omit<NavItem, 'id' | 'createdAt' | 'updatedAt'> {
  children?: NavItemConfig[];
}

// 必須存在嘅核心導航項目（唔依賴數據庫）
export const coreNavItems: NavItemConfig[] = [
  { name: 'creatures', href: '/creatures', label: 'creatures', order: 0 },
  { name: 'items', href: '/items', label: 'items', order: 1 },
  { name: 'quests', href: '/quests', label: 'quests', order: 2 },
  { name: 'geography', href: '/geography', label: 'geography', order: 3 },
  { name: 'roles', href: '/role', label: 'roles', order: 4 },
  { name: 'skills', href: '/skill', label: 'skills', order: 5 },
];

export class NavigationRegistry {
  private items: NavItemConfig[] = [...coreNavItems];

  // 註冊動態導航項目
  async registerDynamic(): Promise<void> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/nav-items`
      );
      if (!response.ok) throw new Error('API 請求失敗');
      const dynamicItems: NavItem[] = await response.json();
      this.items = [
        ...this.items,
        ...dynamicItems.map(({ id, createdAt, updatedAt, ...rest }) => ({
          ...rest,
          children: rest.children?.map((child) => ({ ...child, children: [] })),
        })),
      ];
    } catch (error) {
      console.error('無法獲取動態導航項目:', error);
    }
  }

  // 獲取所有導航項目，按 order 排序
  getItems(): NavItemConfig[] {
    return [...this.items].sort((a, b) => a.order - b.order);
  }
}

export const navigationRegistry = new NavigationRegistry();
