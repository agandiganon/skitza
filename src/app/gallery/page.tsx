import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Portfolio } from '@/components/sections/Portfolio';
import { orderProjectsForGallery } from '@/lib/content/galleryOrder';
import { getProjects } from '@/lib/content/projects.server';
import { buildBreadcrumbSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'גלריה',
  description:
    'גלריית פרויקטים של סקיצה אריזות: הדפסת אריזות, אריזות מותאמות אישית וביצועי מיתוג לעסקים.',
  keywords: [
    'הדפסת אריזות',
    'אריזות מותאמות אישית',
    'בית דפוס לאריזות',
    'בית דפוס בחולון',
  ],
  alternates: {
    canonical: '/gallery',
    languages: {
      'he-IL': '/gallery',
    },
  },
  openGraph: {
    title: 'גלריית עבודות - סקיצה אריזות',
    description: 'דוגמאות אמיתיות להפקות דפוס ואריזות ממותגות לעסקים.',
    url: '/gallery',
    locale: 'he_IL',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'סקיצה אריזות - בית דפוס לאריזות בחולון',
      },
    ],
  },
};

export default function GalleryPage() {
  const { allProjects } = getProjects();
  const orderedProjects = orderProjectsForGallery(allProjects);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { label: 'דף הבית', href: '/' },
          { label: 'גלריה', href: '/gallery' },
        ])}
      />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 px-4 pt-8 pb-16 sm:pt-10 sm:pb-20">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            items={[{ label: 'דף הבית', href: '/' }, { label: 'גלריה' }]}
          />
        </div>
        <Portfolio
          mode="full"
          projects={orderedProjects}
          enableLightbox
          lightboxPlacement="gallery_page"
        />
        <section className="cv-auto px-4 pb-4">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-blue-100 bg-white/90 p-6 text-center shadow-[0_22px_60px_-42px_rgba(15,23,42,0.36)] sm:p-8">
            <h2 className="text-primary text-3xl font-black tracking-tight sm:text-4xl">
              רוצים שנבנה גם לכם פתרון דומה?
            </h2>
            <p className="text-foreground/75 mx-auto mt-4 max-w-3xl text-base leading-relaxed sm:text-lg">
              אם מצאתם כיוון שמתאים למותג או למוצר שלכם, השלב הבא הוא להשאיר
              פרטים ולהסביר בקצרה מה צריך לתכנן, לעצב או לייצר.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                data-track-event="cta_click"
                data-track-placement="gallery_page"
                data-track-label="gallery_contact"
                className="from-accent-cyan to-primary focus:ring-primary inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-gradient-to-l via-blue-500 px-7 py-3 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:opacity-95 focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                מעבר לעמוד יצירת קשר
              </Link>
              <Link
                href="/services/print"
                data-track-event="service_navigation_click"
                data-track-placement="gallery_page"
                data-track-label="/services/print"
                data-track-service="print"
                className="text-primary focus:ring-primary inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-blue-200 bg-white px-7 py-3 text-base font-semibold shadow-sm transition hover:border-blue-300 hover:bg-blue-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                מעבר לשירותי דפוס ואריזות
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
