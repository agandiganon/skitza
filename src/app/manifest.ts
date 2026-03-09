import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'סקיצה אריזות',
    short_name: 'סקיצה',
    description: 'סקיצה אריזות - בית דפוס לאריזות בחולון',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0f4ec9',
    lang: 'he-IL',
    dir: 'rtl',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
