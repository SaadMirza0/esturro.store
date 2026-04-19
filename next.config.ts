import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '://cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};


export default nextConfig;
