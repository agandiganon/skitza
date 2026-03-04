import type { Metadata } from "next";
import Link from "next/link";
import { Palette } from "lucide-react";

export const metadata: Metadata = {
  title: "תכנון ועיצוב מוצרי פרסום",
  description:
    "תכנון ועיצוב מוצרי פרסום ממותגים בבית דפוס בחולון, כחלק ממעטפת מלאה של הדפסת אריזות לעסקים.",
  keywords: ["תכנון ועיצוב מוצרי פרסום", "בית דפוס בחולון", "הדפסת אריזות", "בית דפוס לאריזות"],
  alternates: {
    canonical: "/services/promotional-design",
  },
  openGraph: {
    title: "תכנון ועיצוב מוצרי פרסום - סקיצה אריזות",
    description:
      "קונספט, עיצוב והפקת מוצרי פרסום שמחזקים מותגים.",
    url: "/services/promotional-design",
    locale: "he_IL",
    type: "website",
  },
};

const planningSteps = [
  {
    id: "1",
    title: "הבנת יעדים עסקיים",
    text: "השלב הראשון בתהליך התכנון והעיצוב הוא הבנת המטרות והיעדים הייחודיים של כל עסק. סקיצה משתפת פעולה באופן הדוק עם הלקוחות כדי לקבל תובנות לגבי קהל היעד, זהות המותג והיעדים השיווקיים. על בסיס ערכי הליבה של העסק, אנחנו יוצרים מוצרי פרסום שמעבירים את המסר הנכון ומתחברים לקהל המדויק.",
  },
  {
    id: "2",
    title: "פיתוח קונספט יצירתי",
    text: "לאחר זיהוי היעדים העסקיים, צוות המתכננים של סקיצה מפתח קונספטים יצירתיים למוצרי הפרסום. אנחנו מבצעים סיעור מוחות, בוחנים אלמנטים עיצוביים ופורמטים מגוונים, ומייצרים שפה ויזואלית מושכת ומדויקת ששומרת על מהות המותג ומגדילה תשומת לב.",
  },
  {
    id: "3",
    title: "הפקות דפוס מותאמות אישית",
    text: "סקיצה מתמחה בהפקות דפוס בהתאמה אישית, כך שכל מוצר פרסום יהיה ייחודי ומדויק לצרכי העסק. אנו מציעים מגוון טכניקות דפוס: אופסט, דיגיטלי, משי והדפסה בפורמט רחב. בזכות הגמישות הזו ניתן לייצר באנרים, פוסטרים, חוברות, פליירים ומוצרים נוספים באיכות גבוהה.",
  },
  {
    id: "4",
    title: "תשומת לב לפרטים",
    text: "אחד מיתרונות הליבה של סקיצה הוא תשומת לב קפדנית לפרטים. מבחירת צבעים ועד טיפוגרפיה, מהיררכיית מידע ועד גימורים, כל רכיב עיצובי נבחן בקפידה כדי ליצור מוצר פרסומי מגובש, זכיר ויעיל יותר.",
  },
  {
    id: "5",
    title: "אבטחת איכות",
    text: "סקיצה מחויבת לספק איכות גבוהה בכל מוצר פרסום שמיוצר. אנו עובדים עם ציוד הדפסה מתקדם וחומרי גלם איכותיים, ומבצעים בקרת איכות שוטפת לאורך תהליך הייצור כדי לשמור על דיוק, עקביות צבע ועמידות גבוהה.",
  },
] as const;

export default function PromotionalDesignPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 px-4 pt-6 pb-16 sm:pt-8 sm:pb-20">
      <div className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white/90 px-6 py-10 shadow-xl ring-1 ring-blue-100 sm:px-10 sm:py-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(circle at 15% 20%, rgba(59,130,246,0.18), transparent 45%), radial-gradient(circle at 85% 15%, rgba(6,182,212,0.18), transparent 42%)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-2xl bg-gradient-to-l from-accent-cyan to-blue-600 p-4 text-white shadow-lg">
              <Palette className="h-10 w-10" aria-hidden />
            </span>
            <h1 className="mt-6 text-3xl font-black leading-tight text-primary sm:text-4xl lg:text-5xl">
              תכנון ועיצוב מוצרי פרסום: הפקות הדפוס המיוחדות של סקיצה לעסקים
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-foreground/90 sm:text-xl">
              בנוף העסקי התחרותי של ימינו, פרסום אפקטיבי הוא מנוע צמיחה משמעותי. אחד
              המרכיבים הקריטיים בקמפיינים מצליחים הוא מוצרי פרסום מעוצבים היטב,
              מושכים ובלתי נשכחים.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/80 sm:text-lg">
              כאן נכנסת סקיצה עם מומחיות בתכנון, עיצוב וייצור מוצרי פרסום בהתאמה
              אישית, שמחזקים את נראות המותג ומייצרים השפעה מתמשכת על לקוחות
              פוטנציאליים.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:gap-5">
          {planningSteps.map((step) => (
            <article
              key={step.id}
              className="group rounded-2xl border border-blue-100 bg-white/90 p-6 shadow-md transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-l from-accent-cyan via-blue-500 to-primary text-base font-bold text-white shadow-md">
                  {step.id}
                </span>
                <h2 className="text-xl font-bold text-primary">{step.title}</h2>
              </div>
              <p className="text-[1.02rem] leading-relaxed text-foreground/85">{step.text}</p>
            </article>
          ))}
        </section>

        <div className="mt-10 text-center sm:mt-12">
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-gradient-to-l from-accent-cyan via-blue-500 to-primary px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:opacity-95"
          >
            קבלו הצעת מחיר מותאמת לעסק שלכם
          </Link>
        </div>
      </div>
    </main>
  );
}
