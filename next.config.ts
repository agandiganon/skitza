import type { NextConfig } from 'next';
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} from 'next/constants';

const createNextConfig = (phase: string): NextConfig => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProductionPhase =
    phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER;

  const securityHeaders = [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=()',
    },
    ...(isProductionPhase
      ? [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ]
      : []),
  ];

  const imageCacheHeaders = [
    {
      key: 'Cache-Control',
      value: 'public, max-age=604800, stale-while-revalidate=86400',
    },
  ];

  const immutableImageCacheHeaders = [
    {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable',
    },
  ];

  const staticMediaSources = [
    '/company-logos/:path*',
    '/logo.png',
    '/tab-icon.png',
    '/vidmp4/:path*',
  ];

  return {
    devIndicators: false,
    async headers() {
      if (isDev) {
        return [];
      }

      return [
        {
          source: '/api/:path*',
          headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
        },
        {
          source: '/pictures-derived/:path*',
          headers: immutableImageCacheHeaders,
        },
        {
          source: '/pictures/:path*',
          headers: immutableImageCacheHeaders,
        },
        ...staticMediaSources.map((source) => ({
          source,
          headers: imageCacheHeaders,
        })),
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
      ];
    },
    images: {
      formats: ['image/avif', 'image/webp'],
      qualities: [62, 66, 72, 75, 82],
      minimumCacheTTL: 60 * 60 * 24 * 7,
      localPatterns: [
        { pathname: '/pictures-derived/**' },
        { pathname: '/pictures/**' },
        { pathname: '/company-logos/**' },
        { pathname: '/logo.png' },
        { pathname: '/tab-icon.png' },
      ],
      remotePatterns: [
        { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
      ],
    },
  };
};

export default createNextConfig;
