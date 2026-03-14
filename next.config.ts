import type { NextConfig } from 'next';
import os from 'node:os';
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} from 'next/constants';

const createNextConfig = (phase: string): NextConfig => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProductionPhase =
    phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER;
  const localDevOrigins = Array.from(
    new Set([
      'localhost',
      '127.0.0.1',
      ...Object.values(os.networkInterfaces())
        .flat()
        .flatMap((network) =>
          network &&
          network.family === 'IPv4' &&
          !network.internal &&
          network.address
            ? [network.address]
            : [],
        ),
    ]),
  );
  const contentSecurityPolicy = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    [
      "connect-src 'self'",
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://region1.google-analytics.com',
      'https://vitals.vercel-insights.com',
      'https://va.vercel-scripts.com',
    ].join(' '),
    "worker-src 'self' blob:",
    "frame-src 'self' https://www.googletagmanager.com",
    "media-src 'self' blob:",
    'upgrade-insecure-requests',
  ].join('; ');

  const securityHeaders = [
    { key: 'Content-Security-Policy', value: contentSecurityPolicy },
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
    distDir: '.next-runtime',
    reactStrictMode: true,
    devIndicators: false,
    allowedDevOrigins: localDevOrigins,
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
