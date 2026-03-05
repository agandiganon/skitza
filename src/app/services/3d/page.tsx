import type { Metadata } from "next";
import Link from "next/link";
import { Box } from "lucide-react";

export const metadata: Metadata = {
  title: "הדמיות 3D",
  description:
    "הדמיות 3D ותכנון מבני לאריזות בבית דפוס בחולון לפני ייצור, כדי לדייק את המוצר ולחסוך טעויות.",
  keywords: ["הדמיות 3D", "תכנון אריזות", "בית דפוס בחולון", "הדפסת אריזות"],
  alternates: {
    canonical: "/services/3d",
  },
  openGraph: {
    title: "הדמיות 3D לאריזות - סקיצה אריזות",
    description:
      "סימולציה תלת־ממדית לאריזות לפני הפקה מלאה.",
    url: "/services/3d",
    locale: "he_IL",
    type: "website",
  },
};

export default function Service3DPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 px-4 pt-6 pb-16 sm:pt-8 sm:pb-20">
      <div className="mx-auto max-w-3xl rounded-2xl border-2 border-blue-100 bg-white/80 p-8 shadow-lg ring-1 ring-blue-50 sm:p-10">
        <div className="mb-8 flex justify-center">
          <span className="inline-flex rounded-xl bg-gradient-to-l from-accent-cyan to-blue-600 p-4 text-white shadow-lg">
            <Box className="h-10 w-10" aria-hidden />
          </span>
        </div>
        <h1 className="mb-6 text-center text-3xl font-bold text-primary sm:text-4xl">
          הדמיות 3D
        </h1>
        <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
          <p>
            שירות ההדמיות התלת־ממדיות מאפשר לראות את המוצר או האריזה לפני כניסה לייצור.
            בעזרת הדמיה חיה ניתן לבחון מבנה, פרופורציות ומראה סופי, ולבצע התאמות בזמן.
          </p>
          <p>
            אנחנו משלבים הדמיה עם תכנון ייצור בפועל, כדי לקצר תהליכים ולמנוע טעויות יקרות.
            הפתרון מתאים גם לפיתוח מוצר חדש וגם לשדרוג אריזה קיימת.
          </p>
          <p className="pt-4">
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-gradient-to-l from-accent-cyan via-blue-500 to-primary px-6 py-3 font-semibold text-white shadow-lg transition hover:opacity-95"
            >
              קבל הצעת מחיר
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
