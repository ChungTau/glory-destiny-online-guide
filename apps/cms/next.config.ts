import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/absproxy/3000',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH + '/' || '/absproxy/3000/',
  trailingSlash: true,
  transpilePackages: [
    '@glory-destiny-online-guide/ui',
    '@glory-destiny-online-guide/prisma',
  ],
  // allowedDevOrigins 可能無效，建議移除或確認其用途
  allowedDevOrigins: ['coder.chungtau.com', '*.coder.chungtau.com'],
  async rewrites() {
    return [];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
