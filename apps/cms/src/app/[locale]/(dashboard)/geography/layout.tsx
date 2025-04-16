'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@glory-destiny-online-guide/ui/components/tabs';
import type { TabConfig } from '@/types/tabs';

export default function GeographyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('common');
  const pathname = usePathname();

  // Define the tabs configuration with our type.
  const tabsConfig: TabConfig[] = useMemo(
    () => [
      {
        id: 'nation',
        label: t('nation', { defaultValue: 'Nation' }),
        href: `/geography/nation`,
      },
      {
        id: 'area',
        label: t('area', { defaultValue: 'Area' }),
        href: `/geography/area`,
      },
    ],
    [t]
  );

  // Determine active tab based on current pathname.
  const activeTab =
    tabsConfig.find((tab) => pathname.includes(tab.id))?.id || 'nation';

  return (
    <div className="p-4">
      <Tabs defaultValue={activeTab}>
        <TabsList className="mb-4">
          {tabsConfig.map((tab) => (
            <TabsTrigger asChild key={tab.id} value={tab.id}>
              <Link href={tab.href}>{tab.label}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {/* Render the nested page content */}
      <div>{children}</div>
    </div>
  );
}
