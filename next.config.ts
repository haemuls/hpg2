// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    DATABASE_URL: 'mysql://root:rootpassword@localhost:3306/mydb', // MySQL 연결 URL
  },
  publicRuntimeConfig: {
    GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  },
};

export default nextConfig;
