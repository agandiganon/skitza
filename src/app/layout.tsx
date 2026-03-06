import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTopOnRouteChange } from "@/components/layout/ScrollToTopOnRouteChange";
import { WhatsAppFloat } from "@/components/widgets/WhatsAppFloat";
import { MobileStickyBar } from "@/components/widgets/MobileStickyBar";
import { CookieConsent } from "@/components/widgets/CookieConsent";
import { AccessibilityWidget } from "@/components/widgets/AccessibilityWidget";
import { GtmScripts } from "@/components/analytics/GtmScripts";
import { ADDRESS, PHONE_DISPLAY } from "@/lib/constants";

const fallbackSiteUrl = "https://skitza-pack.co.il";
const shouldLoadSpeedInsights =
  process.env.NODE_ENV === "production" && process.env.VERCEL === "1";
const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-heebo",
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
    default: "סקיצה אריזות | בית דפוס לאריזות בחולון",
    template: "%s | סקיצה אריזות",
  },
  description:
    "בית דפוס בחולון המתמחה בהדפסת אריזות, אריזות מותאמות אישית ופתרונות מיתוג לעסקים.",
  keywords: [
    "בית דפוס בחולון",
    "הדפסת אריזות",
    "אריזות מותאמות אישית",
    "בית דפוס לאריזות",
    "סקיצה אריזות",
  ],
  icons: {
    icon: { url: "/tab-icon.png", type: "image/png" },
    apple: { url: "/tab-icon.png", type: "image/png" },
  },
  openGraph: {
    title: "סקיצה אריזות | בית דפוס לאריזות בחולון",
    description:
      "בית דפוס בחולון המתמחה בהדפסת אריזות, אריזות מותאמות אישית ופתרונות מיתוג לעסקים.",
    type: "website",
    siteName: "סקיצה אריזות",
    url: "/",
    locale: "he_IL",
  },
  alternates: {
    canonical: "/",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "סקיצה אריזות",
  image: `${fallbackSiteUrl}/logo.png`,
  url: fallbackSiteUrl,
  telephone: PHONE_DISPLAY,
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS,
    addressLocality: "חולון",
    addressCountry: "IL",
  },
  areaServed: "ישראל",
  description:
    "בית דפוס בחולון המתמחה בהדפסת אריזות ואריזות מותאמות אישית לעסקים.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head />
      <body
        className={`${heebo.variable} font-sans antialiased pb-20 sm:pb-0`}
        suppressHydrationWarning
      >
        <a
          href="#site-content"
          className="sr-only fixed right-4 top-4 z-[200] rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
        >
          דלג לתוכן הראשי
        </a>
        <GtmScripts />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <ScrollToTopOnRouteChange />
        <Header />
        <div id="site-content">{children}</div>
        <Footer />
        <AccessibilityWidget />
        <WhatsAppFloat />
        <MobileStickyBar />
        <CookieConsent />
        {shouldLoadSpeedInsights ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
