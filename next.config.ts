// next.config.js

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    DATABASE_URL: 'mysql://root:rootpassword@localhost:3306/mydb', // MySQL 연결 URL
  },
};

export default nextConfig;
