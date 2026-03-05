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
  "סקיצה אריזות היא בית דפוס בחולון המתמחה בייעוץ, תכנון וייצור אריזות וקרטונים ממותגים לעסקים בכל סדר גודל. אנחנו מלווים כל פרויקט באופן אישי ומתרגמים צורך עסקי לפתרון אריזה פרקטי, מדויק וממותג.",
  "העבודה שלנו משלבת חשיבה שיווקית, תכנון מבני נכון ויכולות ייצור מתקדמות במפעל עצמו. המטרה היא לא רק אריזה שנראית טוב, אלא אריזה שעובדת נכון על המדף, בלוגיסטיקה ובחוויה שהלקוח מקבל.",
  "אנו מייצרים מגוון פתרונות: אריזות למוצרים קמעונאיים, קופסאות לתצוגה, חומרי קידום ממותגים ופרויקטים ייחודיים לפי דרישה, תוך התאמת חומרי גלם ותהליך ייצור לכל לקוח.",
];

const PROCESS_STEPS = [
  {
    title: "אפיון ודיוק הצרכים",
    description:
      "אנחנו מתחילים בהבנה מלאה של המוצר, קהל היעד, ערכי המותג והדרישות התפעוליות כדי לבנות תשתית נכונה לפיתוח האריזה.",
  },
  {
    title: "תכנון קונספט ומבנה אריזה",
    description:
      "צוות סקיצה בונה כיוון עיצובי ומבני, כולל בחינת פורמטים, התאמה לחומרי גלם ולשיטת הייצור המתאימה לפרויקט.",
  },
  {
    title: "דגמים והדמיה לפני ייצור",
    description:
      "באמצעות חיתוך דגמים בפלוטר והדמיות מקדימות ניתן לבחון את התוצאה בפועל, לדייק פרטים ולמנוע טעויות בשלב הייצור.",
  },
  {
    title: "ייצור מוקפד ובקרת איכות",
    description:
      "לאחר אישור, הפרויקט עובר לייצור במפעל עם בקרת איכות קפדנית, עמידה בזמנים ושמירה על גימור גבוה ועקביות מלאה.",
  },
];

const ABOUT_ADVANTAGES = [
  "התמחות בהפקות דפוס ואריזות לעסקים",
  "שילוב תכנון, עיצוב וייצור תחת קורת גג אחת",
  "התאמת חומרי גלם לפי עמידות, נראות ותקציב",
  "מיקוד בפתרונות איכותיים וידידותיים יותר לסביבה",
  "ליווי אישי וזמינות גבוהה לאורך כל הפרויקט",
  "יכולת טיפול בפרויקטים פשוטים ומורכבים כאחד",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 px-4 pt-6 pb-16 sm:pt-8 sm:pb-20">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="rounded-2xl border-2 border-blue-100 bg-white/80 p-8 shadow-lg ring-1 ring-blue-50 sm:p-10">
            <h1 className="mb-8 text-center text-3xl font-bold text-primary sm:text-4xl">
              אודות המפעל
            </h1>

            <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
              {ABOUT_PARAGRAPHS.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <section className="mt-10" aria-labelledby="about-process-heading">
              <h2
                id="about-process-heading"
                className="mb-5 text-2xl font-extrabold text-primary sm:text-3xl"
              >
                איך אנחנו עובדים
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {PROCESS_STEPS.map((step) => (
                  <article
                    key={step.title}
                    className="rounded-xl border border-blue-100 bg-blue-50/70 p-5 shadow-sm"
                  >
                    <h3 className="mb-2 text-lg font-bold text-primary">{step.title}</h3>
                    <p className="text-base leading-relaxed text-foreground/85">{step.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-10" aria-labelledby="about-advantages-heading">
              <h2
                id="about-advantages-heading"
                className="mb-4 text-2xl font-extrabold text-primary sm:text-3xl"
              >
                למה עסקים בוחרים בסקיצה
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {ABOUT_ADVANTAGES.map((advantage) => (
                  <li
                    key={advantage}
                    className="rounded-lg border border-blue-100 bg-white px-4 py-3 text-base font-medium text-foreground/90 shadow-sm"
                  >
                    {advantage}
                  </li>
                ))}
              </ul>
            </section>

            <p className="pt-8">
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-gradient-to-l from-accent-cyan via-blue-500 to-primary px-6 py-3 font-semibold text-white shadow-lg transition hover:opacity-95"
              >
                צור קשר
              </Link>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
