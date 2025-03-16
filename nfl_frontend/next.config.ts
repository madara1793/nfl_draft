import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd1dglpr230r57l.cloudfront.net',
        port: '',
        pathname: '/images/thumb/**',
        search: '',
      },
    ],
  },
}

export default nextConfig;
