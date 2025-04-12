import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@glory-destiny-online-guide/ui',
    '@glory-destiny-online-guide/prisma',
  ],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
