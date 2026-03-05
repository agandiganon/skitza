import type { Metadata } from "next";
import Link from "next/link";
import { Printer } from "lucide-react";

export const metadata: Metadata = {
  title: "הפקות דפוס ואריזות",
  description:
    "הפקות דפוס ואריזות לעסקים בבית דפוס בחולון: אריזות מותאמות אישית, חומרי פרסום ומוצרים ממותגים.",
  keywords: ["הדפסת אריזות", "בית דפוס לאריזות", "בית דפוס בחולון", "אריזות מותאמות אישית"],
  alternates: {
    canonical: "/services/print",
  },
  openGraph: {
    title: "הפקות דפוס ואריזות - סקיצה אריזות",
    description:
      "פתרונות דפוס ואריזה מתקדמים לעסקים בכל היקף.",
    url: "/services/print",
    locale: "he_IL",
    type: "website",
  },
};

const printHighlights = [
  {
    title: "הפקות דפוס מותאמות לעסק",
    text: "מפעל דפוס סקיצה מתמחה בייצור מוצרי פרסום איכותיים לעסקים בכל היקף. אנו מציעים כרטיסי ביקור, ברושורים, פליירים, פוסטרים וחומרי פרסום נוספים, עם התאמה אישית מלאה לכל לקוח ולכל מטרה שיווקית.",
  },
  {
    title: "עיצוב יצירתי שמבליט מותגים",
    text: "צוות העיצוב הפנימי שלנו פועל בשיתוף פעולה הדוק עם הלקוחות כדי ליצור עיצובים מושכים ויזואלית שמבטאים במדויק את זהות המותג. המטרה שלנו היא לייצר חומרים שמושכים תשומת לב ומשאירים רושם חזק ומתמשך.",
  },
  {
    title: "טכנולוגיה פורצת דרך",
    text: "סקיצה מצוידת בציוד הדפסה חדיש עם יכולות רזולוציה גבוהה וטכניקות גימור מתקדמות. כך אנו מבטיחים שכל פרט בעיצוב יודפס בדיוק מקסימלי ובאיכות עקבית ברמה הגבוהה ביותר.",
  },
  {
    title: "השגת התוצאה המושלמת",
    text: "אנחנו מלווים כל פרויקט מקדם-דפוס ועד פוסט-פרודקשן, עם בקרת איכות קפדנית לאורך כל הדרך. שביעות רצון הלקוחות היא בראש סדר העדיפויות שלנו, ואנו פועלים כדי לעלות על הציפיות בכל הזמנה.",
  },
  {
    title: "הטבות אמיתיות לעסקים",
    text: "מוצרי הפרסום של Skitza מחזקים את נראות המותג, משפרים את אפקטיביות השיווק ומייצרים יתרון תחרותי. פתרונות הדפוס שלנו מסייעים לעסקים למשוך לקוחות חדשים, לשמר קיימים ולהעביר מסר מדויק בשוק דינמי.",
  },
  {
    title: "לקוחות מרוצים מדברים בעד עצמם",
    text: "יש לנו רקורד מוכח של הפקות מוצלחות לעסקים בכל הגדלים. הלקוחות שלנו מדגישים את המקצועיות, תשומת הלב לפרטים והיכולת שלנו להגשים חזון עסקי לעיצוב דפוס שמייצר תוצאות.",
  },
] as const;

export default function PrintPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 px-4 pt-6 pb-16 sm:pt-8 sm:pb-20">
      <div className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white/90 px-6 py-10 shadow-xl ring-1 ring-blue-100 sm:px-10 sm:py-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(circle at 16% 20%, rgba(59,130,246,0.18), transparent 44%), radial-gradient(circle at 84% 16%, rgba(6,182,212,0.18), transparent 40%)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-2xl bg-gradient-to-l from-accent-cyan to-blue-600 p-4 text-white shadow-lg">
              <Printer className="h-10 w-10" aria-hidden />
            </span>
            <h1 className="mt-6 text-3xl font-black leading-tight text-primary sm:text-4xl lg:text-5xl">
              הפקות דפוס ואריזות
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-foreground/90 sm:text-xl">
              מפעל דפוס סקיצה הינו בית דפוס מוביל המתמחה בייצור מוצרי פרסום איכותיים
              לעסקים בכל היקף, עם שילוב של עיצוב יצירתי וטכנולוגיה מתקדמת.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/80 sm:text-lg">
              אנו מחויבים לספק תוצאות יוצאות דופן שמחזקות נראות מותג, משפרות ביצועים
              שיווקיים ומייצרות יתרון תחרותי אמיתי.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:gap-5">
          {printHighlights.map((item) => (
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
            לא מתפשרים על איכות. מדפיסים חכם, מעצבים מדויק ומלווים אתכם עד לתוצאה
            מושלמת.
          </p>
          <p className="mt-3 text-base text-foreground/80 sm:text-lg">
            צרו קשר ונשמח להתאים עבורכם פתרון דפוס ואריזה שמקדם את העסק קדימה.
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
