import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Heebo } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DeferredWidgets } from '@/components/layout/DeferredWidgets';
import { ScrollToTopOnRouteChange } from '@/components/layout/ScrollToTopOnRouteChange';
import { MobileStickyBar } from '@/components/widgets/MobileStickyBar';
import { AnalyticsGate } from '@/components/analytics/AnalyticsGate';
import { InteractionTracker } from '@/components/analytics/InteractionTracker';
import { JsonLd } from '@/components/seo/JsonLd';
import { ADDRESS, PHONE_DISPLAY } from '@/lib/constants';
import { buildLocalBusinessSchema, buildWebsiteSchema } from '@/lib/seo/schema';

const fallbackSiteUrl = 'https://skitza-pack.co.il';
const shouldLoadSpeedInsights =
  process.env.NODE_ENV === 'production' && process.env.VERCEL === '1';
const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-heebo',
});

function getMetadataBase() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackSiteUrl;
  try {
    return new URL(siteUrl);
  } catch {
    return new URL(fallbackSiteUrl);
  }
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: 'סקיצה אריזות | בית דפוס בחולון לתכנון ועיצוב אריזות',
    template: '%s | סקיצה אריזות',
  },
  description:
    'בית דפוס בחולון לתכנון, עיצוב והפקת אריזות קרטון לעסקים. צפו בגלריית עבודות, בחרו סוג פנייה, והשאירו פרטים לשיחה, ליווי מקצועי וקבלת הצעת מחיר מותאמת.',
  keywords: [
    'בית דפוס בחולון',
    'הדפסת אריזות',
    'אריזות מותאמות אישית',
    'בית דפוס לאריזות',
    'סקיצה אריזות',
  ],
  icons: {
    icon: { url: '/favicon.ico', type: 'image/x-icon' },
    shortcut: { url: '/favicon.ico', type: 'image/x-icon' },
    apple: { url: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'סקיצה אריזות | בית דפוס בחולון לתכנון ועיצוב אריזות',
    description:
      'בית דפוס בחולון לתכנון, עיצוב והפקת אריזות קרטון לעסקים. צפו בגלריית עבודות, בחרו סוג פנייה, והשאירו פרטים לשיחה, ליווי מקצועי וקבלת הצעת מחיר מותאמת.',
    type: 'website',
    siteName: 'סקיצה אריזות',
    url: '/',
    locale: 'he_IL',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'סקיצה אריזות - בית דפוס לאריזות בחולון',
      },
    ],
  },
  alternates: {
    canonical: '/',
    languages: {
      'he-IL': '/',
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'סקיצה אריזות | בית דפוס בחולון לתכנון ועיצוב אריזות',
    description:
      'בית דפוס בחולון לתכנון, עיצוב והפקת אריזות קרטון לעסקים. צפו בגלריית עבודות, בחרו סוג פנייה, והשאירו פרטים לשיחה, ליווי מקצועי וקבלת הצעת מחיר מותאמת.',
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he-IL" dir="rtl" suppressHydrationWarning>
      <head />
      <body
        className={`${heebo.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#site-content"
          className="bg-primary text-primary-foreground focus:ring-offset-primary sr-only fixed top-4 right-4 z-[200] rounded-full px-4 py-2 text-sm font-semibold shadow-lg focus:not-sr-only focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none"
        >
          דלג לתוכן הראשי
        </a>
        <JsonLd
          data={[
            buildLocalBusinessSchema({
              name: 'סקיצה אריזות',
              image: '/opengraph-image',
              telephone: PHONE_DISPLAY,
              address: ADDRESS,
              description:
                'בית דפוס בחולון המתמחה בהדפסת אריזות ואריזות מותאמות אישית לעסקים.',
            }),
            buildWebsiteSchema(),
          ]}
        />
        <ScrollToTopOnRouteChange />
        <InteractionTracker />
        <Header />
        <div id="site-content">{children}</div>
        <Footer />
        <MobileStickyBar />
        <Suspense fallback={null}>
          <DeferredWidgets />
        </Suspense>
        <Suspense fallback={null}>
          <AnalyticsGate enableSpeedInsights={shouldLoadSpeedInsights} />
        </Suspense>
      </body>
    </html>
  );
}
