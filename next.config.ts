import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // experimental: {
  //   staleTimes: {
  //     static: 60,
  //   },
  // },
  images: {
    domains: ["plus.unsplash.com"],
  },
};

export default nextConfig;
