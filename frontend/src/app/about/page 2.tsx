import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "אודות המפעל",
  description:
    "אודות סקיצה אריזות - בית דפוס בחולון המתמחה בהדפסת אריזות ואריזות מותאמות אישית לעסקים.",
  keywords: ["בית דפוס בחולון", "הדפסת אריזות", "בית דפוס לאריזות"],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "אודות סקיצה אריזות",
    description:
      "ניסיון מקצועי בתכנון, עיצוב וייצור אריזות ממותגות לעסקים מחולון לכל הארץ.",
    url: "/about",
    locale: "he_IL",
    type: "website",
  },
};

const ABOUT_PARAGRAPHS = [
  "סקיצה אריזות מתמחה בייעוץ, תכנון וייצור אריזות וקרטונים ממותגים לעסקים. אנחנו עובדים בשיתוף פעולה מלא עם הלקוח כדי להבין צרכים, לקבוע מפרט מדויק ולבנות פתרון שעובד בשטח.",
  "אנו מטפלים בפרויקטים פשוטים ומורכבים כאחד, כולל תכנון מבני, עיצוב גרפי והפקת דפוס. בין אם מדובר באריזות מותאמות אישית, קופסאות, תוויות או מוצרי פרסום, המטרה נשארת זהה: תוצאה מקצועית שמייצגת נכון את המותג.",
  "בחירת חומרי הגלם היא חלק קריטי בתהליך. לכן אנו עובדים עם חומרים איכותיים בלבד, תוך התאמה לדרישות עמידות, נראות, לוגיסטיקה ושיקולי עלות.",
  "המפעל מצויד בטכנולוגיה מתקדמת, כולל חיתוך דגמים בפלוטר והדמיות מקדימות. כך ניתן לדייק את התוצר עוד לפני הייצור, לחסוך טעויות ולשפר את מהירות הביצוע.",
  "החזון שלנו הוא לספק לעסקים מעטפת אריזה מלאה - משלב הרעיון ועד המוצר המוגמר - עם שירות אישי, גימור גבוה ועמידה בסטנדרטים מקצועיים לאורך זמן.",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 px-4 pt-6 pb-16 sm:pt-8 sm:pb-20">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection>
          <div className="rounded-2xl border-2 border-blue-100 bg-white/80 p-8 shadow-lg ring-1 ring-blue-50 sm:p-10">
          <h1 className="mb-10 text-center text-3xl font-bold text-primary sm:text-4xl">
            אודות המפעל
          </h1>
          <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
            {ABOUT_PARAGRAPHS.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <p className="pt-6">
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-gradient-to-l from-accent-cyan via-blue-500 to-primary px-6 py-3 font-semibold text-white shadow-lg transition hover:opacity-95"
              >
                צור קשר
              </Link>
            </p>
          </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
