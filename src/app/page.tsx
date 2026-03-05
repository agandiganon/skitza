import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { WhySkitza } from "@/components/sections/WhySkitza";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { ClientLogosSection } from "@/components/sections/ClientLogosSection";

export const metadata: Metadata = {
  title: "בית דפוס לאריזות בחולון",
  description:
    "בית דפוס בחולון להדפסת אריזות ואריזות מותאמות אישית לעסקים, עם תכנון, עיצוב וייצור מלא במקום אחד.",
  keywords: [
    "בית דפוס בחולון",
    "הדפסת אריזות",
    "אריזות מותאמות אישית",
    "בית דפוס לאריזות",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "סקיצה אריזות | בית דפוס לאריזות בחולון",
    description:
      "הדפסת אריזות, תכנון אריזות ופתרונות מיתוג לעסקים מחולון לכל הארץ.",
    url: "/",
    locale: "he_IL",
    type: "website",
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <ClientLogosSection />
      <Services />
      <Portfolio mode="home" />
      <WhySkitza />
      <StatsStrip />
    </main>
  );
}
