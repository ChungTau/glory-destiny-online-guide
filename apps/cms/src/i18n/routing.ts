// apps/web/src/i18n/routing.ts

import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'zh-hk'],

  // Used when no locale matches
  defaultLocale: 'zh-hk',
});
