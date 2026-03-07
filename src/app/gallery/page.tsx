import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Portfolio } from "@/components/sections/Portfolio";
import { orderProjectsForGallery } from "@/lib/content/galleryOrder";
import { getProjects } from "@/lib/content/projects.server";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "גלריה",
  description:
    "גלריית פרויקטים של סקיצה אריזות: הדפסת אריזות, אריזות מותאמות אישית וביצועי מיתוג לעסקים.",
  keywords: ["הדפסת אריזות", "אריזות מותאמות אישית", "בית דפוס לאריזות", "בית דפוס בחולון"],
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "גלריית עבודות - סקיצה אריזות",
    description:
      "דוגמאות אמיתיות להפקות דפוס ואריזות ממותגות לעסקים.",
    url: "/gallery",
    locale: "he_IL",
    type: "website",
  },
};

export default function GalleryPage() {
  const { allProjects } = getProjects();
  const orderedProjects = orderProjectsForGallery(allProjects);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { label: "דף הבית", href: "/" },
          { label: "גלריה", href: "/gallery" },
        ])}
      />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 px-4 pt-8 pb-16 sm:pt-10 sm:pb-20">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={[{ label: "דף הבית", href: "/" }, { label: "גלריה" }]} />
        </div>
        <Portfolio mode="full" projects={orderedProjects} />
      </main>
    </>
  );
}
