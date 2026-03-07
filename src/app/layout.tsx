import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DeferredWidgets } from "@/components/layout/DeferredWidgets";
import { ScrollToTopOnRouteChange } from "@/components/layout/ScrollToTopOnRouteChange";
import { MobileStickyBar } from "@/components/widgets/MobileStickyBar";
import { GtmScripts } from "@/components/analytics/GtmScripts";
import { InteractionTracker } from "@/components/analytics/InteractionTracker";
import { JsonLd } from "@/components/seo/JsonLd";
import { ADDRESS, PHONE_DISPLAY } from "@/lib/constants";
import { buildLocalBusinessSchema, buildWebsiteSchema } from "@/lib/seo/schema";

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
    images: [
      {
        url: "/logo.png",
        width: 1536,
        height: 1024,
        alt: "סקיצה אריזות",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "סקיצה אריזות | בית דפוס לאריזות בחולון",
    description:
      "בית דפוס בחולון המתמחה בהדפסת אריזות, אריזות מותאמות אישית ופתרונות מיתוג לעסקים.",
    images: ["/logo.png"],
  },
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
        className={`${heebo.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#site-content"
          className="sr-only fixed right-4 top-4 z-[200] rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
        >
          דלג לתוכן הראשי
        </a>
        <GtmScripts />
        <JsonLd
          data={[
            buildLocalBusinessSchema({
              name: "סקיצה אריזות",
              image: "/logo.png",
              telephone: PHONE_DISPLAY,
              address: ADDRESS,
              description:
                "בית דפוס בחולון המתמחה בהדפסת אריזות ואריזות מותאמות אישית לעסקים.",
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
        <DeferredWidgets />
        <Analytics />
        {shouldLoadSpeedInsights ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
