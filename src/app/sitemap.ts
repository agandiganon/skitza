import type { MetadataRoute } from 'next';

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://skitza-pack.co.il'
).replace(/\/+$/, '');

const staticRoutes = [
  '/',
  '/about',
  '/gallery',
  '/contact',
  '/services/print',
  '/services/3d',
  '/services/promotional-design',
  '/services/consultancy',
  '/privacy',
  '/accessibility',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1 : 0.8,
  }));
}
