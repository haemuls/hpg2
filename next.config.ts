import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // React의 Strict Mode 활성화
  env: {
    DATABASE_URL: process.env.DATABASE_URL || 'mysql://root:rootpassword@localhost:3306/mydb', // 환경 변수 설정
  },
  publicRuntimeConfig: {
    GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-L24YB6S0E7', // 런타임 환경 변수
  },
};

export default nextConfig;