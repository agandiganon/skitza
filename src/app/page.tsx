import type { Metadata } from "next";
import { FaqSection } from "@/components/content/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { WhySkitza } from "@/components/sections/WhySkitza";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { ClientLogosSection } from "@/components/sections/ClientLogosSection";
import { HOME_FAQ_ITEMS } from "@/lib/content/servicePages";
import { getProjects } from "@/lib/content/projects.server";
import { buildFaqSchema } from "@/lib/seo/schema";

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
  const { allProjects, featuredProjects } = getProjects();

  return (
    <>
      <JsonLd data={buildFaqSchema(HOME_FAQ_ITEMS)} />
      <main>
        <Hero
          images={allProjects.map((project) => ({ src: project.imageSrc, alt: project.imageAlt }))}
        />
        <About />
        <ClientLogosSection />
        <Services />
        <Portfolio mode="home" projects={featuredProjects} />
        <WhySkitza />
        <section className="bg-gradient-to-b from-white via-blue-50/45 to-white px-4 py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <FaqSection
              id="home-faq"
              title="שאלות נפוצות לפני שמתחילים"
              intro="כמה תשובות קצרות שמבהירות איך נכון להתחיל תהליך של תכנון, עיצוב, הדמיה או הפקה."
              items={HOME_FAQ_ITEMS}
            />
          </div>
        </section>
        <StatsStrip />
      </main>
    </>
  );
}
