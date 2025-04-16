// apps/cms/src/components/common/ErrorBoundary.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LayoutProps } from '@/types/layout';

// 通用錯誤邊界組件，保護子組件渲染錯誤
export function ErrorBoundary({ children }: LayoutProps) {
  const t = useTranslations('common');
  const [hasError, setHasError] = useState(false);

  // 模擬錯誤捕捉（簡單版，實際可用第三方庫如 react-error-boundary）
  try {
    if (hasError) {
      return (
        <div className="text-red-600 dark:text-red-400 p-4">
          {t('error')} {/* 例如 "出錯啦，請再試一次" */}
        </div>
      );
    }
    return <>{children}</>;
  } catch (error: any) {
    setHasError(true);
    return (
      <div className="text-red-600 dark:text-red-400 p-4">
        {`${t('error')}: ${error.message}`}
      </div>
    );
  }
}
