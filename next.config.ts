import type { NextConfig } from 'next';

//===========================================================================

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'aliiev-lomach.com' },
      { protocol: 'https', hostname: 'ac.goit.global' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'ftp.goit.study' },
    ],
  },

  async headers() {
    return [
      {
        source: '/',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
