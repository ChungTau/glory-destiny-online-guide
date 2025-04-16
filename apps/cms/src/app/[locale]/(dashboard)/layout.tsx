// apps/cms/src/app/[locale]/(dashboard)/layout.tsx
'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import React from 'react';
import { LayoutProps } from '@/types/layout';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

// 動態載入組件，指定命名導出，解決 ts(2345)
const Breadcrumb = dynamic(
  () => import('@/components/common/Breadcrumb').then((mod) => mod.Breadcrumb),
  { ssr: false }
);
const Sidebar = dynamic(
  () => import('@/components/common/Sidebar').then((mod) => mod.Sidebar),
  { ssr: false }
);
const LanguageSwitcher = dynamic(
  () =>
    import('@/components/common/LanguageSwitcher').then(
      (mod) => mod.LanguageSwitcher
    ),
  { ssr: false }
);

// 改良嘅 AdminPanelLayout，Sidebar 頂層，無 md:ml-64，Breadcrumb 喺 <= 768px 隱藏
function AdminPanelLayout({ children }: LayoutProps) {
  const t = useTranslations('common');

  return (
    <div className="flex min-h-screen flex-row bg-white dark:bg-gray-900 transition-colors">
      {/* 側邊欄：頂層，手機覆蓋 header */}
      <Sidebar />

      {/* Header 同 Main：右邊垂直佈局 */}
      <div className="flex-1 flex flex-col w-full">
        <header
          className="bg-white dark:bg-gray-800 shadow-sm"
          role="banner"
          aria-label={t('header.ariaLabel')} // 例如 "主要導航標頭"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
            <div className="hidden md:block">
              <Breadcrumb />
            </div>
            <div className="ml-auto">
              <LanguageSwitcher />
            </div>
          </div>
        </header>

        {/* 主要內容：適配子頁面（例如 geography 嘅 tabs） */}
        <main
          className="flex-1 p-4 sm:p-6"
          role="main"
          aria-label={t('main.ariaLabel')} // 例如 "主要內容區域"
        >
          <div className="max-w-7xl mx-auto">
            {/* 錯誤邊界保護子頁面 */}
            <ErrorBoundary>{children}</ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
}

// 防止無必要重新渲染
export default React.memo(AdminPanelLayout);
