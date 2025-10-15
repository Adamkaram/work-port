import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Increase timeout for font downloads
  experimental: {
    optimizeCss: false,
  },
  // Skip font optimization if Google Fonts is blocked
  optimizeFonts: false,
};

export default withNextIntl(nextConfig);
