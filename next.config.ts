import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // React의 Strict Mode 활성화
  env: {
    DATABASE_URL: process.env.DATABASE_URL || 'mysql://root:rootpassword@localhost:3306/mydb', // 환경 변수 설정
  },
  publicRuntimeConfig: {
    GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-L24YB6S0E7', // 런타임 환경 변수
  },
  experimental: {
    allowedDevOrigins: ['http://127.0.0.1:3000'], // 허용할 개발 출처를 추가
  },
};

export default nextConfig;
