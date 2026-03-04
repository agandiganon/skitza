import type { NextConfig } from "next";
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} from "next/constants";

const createNextConfig = (phase: string): NextConfig => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProductionPhase =
    phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER;

  const backendOrigin = process.env.NEXT_PUBLIC_BACKEND_ORIGIN
    ?.trim()
    .replace(/\/+$/, "");
  const connectSrcOrigins = [
    "'self'",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    backendOrigin,
  ].filter(Boolean);

  const contentSecurityPolicy = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com",
    "font-src 'self' data:",
    `connect-src ${connectSrcOrigins.join(" ")}`,
    "frame-src https://www.googletagmanager.com",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'self'",
    "form-action 'self'",
    isProductionPhase ? "upgrade-insecure-requests" : "",
  ]
    .filter(Boolean)
    .join("; ");

  const securityHeaders = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ...(isProductionPhase
      ? [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ]
      : []),
    { key: "Content-Security-Policy", value: contentSecurityPolicy },
  ];

  const imageCacheHeaders = [
    {
      key: "Cache-Control",
      value: "public, max-age=604800, stale-while-revalidate=86400",
    },
  ];

  return {
    devIndicators: false,
    async headers() {
      if (isDev) {
        return [];
      }

      return [
        {
          source: "/pictures/:path*",
          headers: imageCacheHeaders,
        },
        {
          source: "/(.*)",
          headers: securityHeaders,
        },
      ];
    },
    images: {
      formats: ["image/avif", "image/webp"],
      qualities: [62, 66, 72, 75],
      minimumCacheTTL: 60 * 60 * 24 * 7,
      remotePatterns: [
        { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      ],
    },
  };
};

export default createNextConfig;
