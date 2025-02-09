import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/discord',
        destination: 'https://discord.gg/2eawa4PsFP',
        permanent: true
      },
      {
        source: '/docs',
        destination: 'https://atosjs-docs.vercel.app/',
        permanent: true
      }
    ]
  }
};

export default nextConfig;
