import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? (process.env.NEXT_PUBLIC_BASE_PATH ?? '/lilli') : '';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  reactCompiler: true,
  output: 'export',
  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
