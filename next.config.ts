import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  devIndicators: false,
  transpilePackages: ['@view360/core', '@view360/controls'],
};

export default nextConfig;
