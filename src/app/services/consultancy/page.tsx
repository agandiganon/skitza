import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "תכנון אריזה למוצר חדש/קיים",
  description:
    "תכנון אריזה למוצר חדש או קיים בבית דפוס בחולון, עם דגש על אריזות מותאמות אישית ותכנון לייצור יעיל.",
  keywords: ["תכנון אריזה", "אריזות מותאמות אישית", "בית דפוס בחולון", "בית דפוס לאריזות"],
  alternates: {
    canonical: "/services/consultancy",
  },
  openGraph: {
    title: "תכנון אריזה למוצר קיים או חדש - סקיצה אריזות",
    description:
      "אפיון, תכנון וליווי מקצועי לאריזות ממותגות לעסקים.",
    url: "/services/consultancy",
    locale: "he_IL",
    type: "website",
  },
};

const highlights = [
  {
    title: "פתרונות מותאמים אישית",
    text: "מפעל דפוס סקיצה מתמחה בעיצוב אריזות וקרטונים ממותגים לעסקים וארגונים, עם התאמה מלאה לדרישות הייחודיות של כל לקוח.",
  },
  {
    title: "שילוב עיצוב וטכנולוגיה",
    text: "צוות המעצבים והטכנאים המנוסה שלנו עובד בשיתוף פעולה הדוק עם הלקוחות, כדי להבטיח שהאריזה מייצגת את זהות המותג בצורה מדויקת ומרשימה.",
  },
  {
    title: "חומרי גלם איכותיים",
    text: "אנו נותנים עדיפות לחומרי גלם איכותיים כדי לספק עמידות גבוהה ונראות חזקה, מתוך הבנה שהאריזה משפיעה ישירות על תפיסת המוצר אצל הלקוח.",
  },
  {
    title: "ליווי מלא עד מוצר סופי",
    text: "בין אם מדובר באריזות קמעונאיות, חומרי קידום מכירות או מיתוג לאירועים מיוחדים, סקיצה מחויבת להפיק פתרונות שמגנים על המוצר ומחזקים את תדמית המותג.",
  },
] as const;

export default function ConsultancyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 px-4 pt-6 pb-16 sm:pt-8 sm:pb-20">
      <div className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white/90 px-6 py-10 shadow-xl ring-1 ring-blue-100 sm:px-10 sm:py-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(circle at 18% 22%, rgba(59,130,246,0.18), transparent 44%), radial-gradient(circle at 82% 14%, rgba(6,182,212,0.18), transparent 40%)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-2xl bg-gradient-to-l from-accent-cyan to-blue-600 p-4 text-white shadow-lg">
              <MessageCircle className="h-10 w-10" aria-hidden />
            </span>
            <h1 className="mt-6 text-3xl font-black leading-tight text-primary sm:text-4xl lg:text-5xl">
              תכנון אריזה למוצר חדש/קיים
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-foreground/90 sm:text-xl">
              מפעל דפוס סקיצה הינה חברה מובילה המתמחה בעיצוב אריזות וקרטונים ממותגים
              לעסקים וארגונים, עם דגש על פתרונות מותאמים אישית לכל צורך.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/80 sm:text-lg">
              אנו משלבים יצירתיות, טכנולוגיה מתקדמת וניסיון מעשי כדי להפוך כל רעיון
              לאריזה שמחזקת את המותג ומייצרת השפעה מיידית.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:gap-5">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="group rounded-2xl border border-blue-100 bg-white/90 p-6 shadow-md transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <h2 className="mb-3 text-xl font-bold text-primary">{item.title}</h2>
              <p className="text-[1.02rem] leading-relaxed text-foreground/85">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-blue-100 bg-gradient-to-l from-blue-50 to-white p-6 text-center shadow-md sm:mt-12 sm:p-8">
          <p className="text-lg leading-relaxed text-foreground/90 sm:text-xl">
            צרו איתנו קשר עוד היום כדי לדון בדרישות שלכם ולתת לנו להגשים את החזון
            שלכם.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-gradient-to-l from-accent-cyan via-blue-500 to-primary px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:opacity-95"
            >
              קבלו הצעת מחיר מותאמת לעסק שלכם
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
