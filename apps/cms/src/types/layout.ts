// apps/cms/src/types/layout.ts
import { ReactNode } from 'react';

// 共用佈局 Props，供 AdminPanelLayout、GeographyLayout 等重用
export interface LayoutProps {
  children: ReactNode;
}

export interface LocaleLayoutProps extends LayoutProps {
  params: Promise<{ locale: string }>;
}
