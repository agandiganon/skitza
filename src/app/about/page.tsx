import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

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

const ABOUT_FACTORY_PARAGRAPHS = [
  "במפעל הדפוס שלנו אנו מציעים שירותי ייעוץ מהשורה הראשונה לאריזה ותכנון מארזים. צוות המומחים שלנו יעבוד איתך בשיתוף פעולה הדוק כדי להבין את הדרישות שלך, לספק פתרונות חדשניים ולהבטיח ביצוע מוצלח של הפרויקטים שלך.",
  "אנו מתמחים בטיפול בפרויקטים מורכבים, לרבות עיצוב וייצור אריזות. בין אם אתם צריכים אריזות מותאמות אישית, קופסאות, תוויות או כל פתרון אריזה אחר, אנו מבטיחים רמת גימור מושלמת העומדת בסטנדרטים הגבוהים ביותר שלכם.",
  "כדי להשיג איכות יוצאת דופן, אנו משתמשים רק בחומרי הגלם הטובים ביותר הקיימים בשוק. תהליך המקור שלנו מבטיח שהחומרים המשמשים באריזה שלך הם עמידים, ידידותיים לסביבה ומושכים חזותית. אנו מבינים את החשיבות של שימוש בחומרים בני קיימא, ואנו שואפים למזער את ההשפעה הסביבתית שלנו.",
  "יתר על כן, מפעל הדפוס שלנו מצויד בטכנולוגיה מתקדמת. אנו עובדים עם מכונות הדפסה חדישות, ציוד גימור ומערכות בקרת איכות כדי לספק תוצאות יוצאות דופן. הטכנאים והמפעילים המיומנים שלנו מאומנים היטב בשימוש בכלים מתקדמים אלה כדי לייעל את היעילות ולהשיג תוצאות ייצור מעולות.",
  "לסיכום, מפעל הדפוס שלנו מציע שירותי ייעוץ, תכנון מומחה של אריזות וקרטונים, ביצוע פרויקטים מורכבים, רמת גימור מושלמת, מיטב חומרי הגלם וטכנולוגיה חדישה. עם המחויבות שלנו למצוינות, אנו מבטיחים שצורכי האריזה שלך ייענו בתקני האיכות הגבוהים ביותר.",
];

const ABOUT_VISION_PARAGRAPHS = [
  "במפעל הדפוס שלנו, אנו נותנים עדיפות לאיכות ללא פשרות. אנו מבינים שהאריזה שלך צריכה לייצג את המותג שלך ולספק חווית לקוח חיובית. לכן, אנו מבטיחים שכל פרויקט יבוצע תוך הקפדה על הפרטים הקטנים ביותר. יש לנו מומחיות בעבודה עם כל סוגי הנייר, הקרטון והקרטון הגלי. בין אם אתם זקוקים לפתרון אריזה יציב או עיצוב עדין יותר, יש לנו את החומרים שיתאימו לדרישות שלכם.",
  "הצוות שלנו יסייע לכם בבחירת החומרים הטובים ביותר המתאימים לחזון שלכם. כדי להחיות את עיצובי האריזה שלך, אנו משתמשים בפלוטר מתקדם לחיתוך דגמים. טכנולוגיה זו מאפשרת לנו לחתוך ולעצב במדויק את החומרים בהתאם למפרט שלך. בנוסף, אנו מציעים הדמיה חיה המבוססת על קובץ הלקוחות בצורה מכוונת, ומספקת לך הזדמנות ייחודית לראות את עיצוב האריזה שלך מתעורר לחיים לפני תחילת הייצור. מפעל הדפוס שלנו מצויד היטב לטיפול בפרויקטים מורכבים, לרבות הקמה ואריזה.",
  "יש לנו את המומחיות והמשאבים להתמודד עם עיצובים מורכבים, צורות ייחודיות ואפקטים מיוחדים להדפסה. הצוות שלנו עובד בחריצות כדי להבטיח שהפרויקט שלך יתבצע ללא רבב מתחילתו ועד סופו. בכל הנוגע למוצר הסופי, אנו מבטיחים רמת גימור מושלמת. בעלי המלאכה המיומנים שלנו שמים לב לכל פרט, ומבטיחים שהאריזה שלך תיראה ללא רבב. אנו מבינים את החשיבות של יצירת רושם חיובי, ואנו שואפים לספק איכות יוצאת דופן בכל פרויקט שאנו מבצעים, כמובן בלוחות זמנים הכי טובים.",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { label: "דף הבית", href: "/" },
          { label: "אודות", href: "/about" },
        ])}
      />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 px-4 pt-8 pb-16 sm:pt-10 sm:pb-20">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs items={[{ label: "דף הבית", href: "/" }, { label: "אודות" }]} />

          <section className="rounded-[2rem] border border-blue-100 bg-white/85 p-6 shadow-[0_24px_70px_-40px_rgba(31,78,161,0.45)] ring-1 ring-blue-50 sm:p-8">
            <p className="mb-2 text-center text-sm font-semibold tracking-wide text-blue-700">אודות</p>
            <h1 className="mb-8 text-center text-4xl font-black leading-tight tracking-tight text-primary sm:text-5xl">
              אודות סקיצה אריזות
            </h1>

            <section aria-labelledby="about-factory-heading">
              <h2 id="about-factory-heading" className="mb-4 text-2xl font-extrabold text-primary sm:text-3xl">
                אודות המפעל
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
                {ABOUT_FACTORY_PARAGRAPHS.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            <section className="mt-10" aria-labelledby="about-vision-heading">
              <h2 id="about-vision-heading" className="mb-4 text-2xl font-extrabold text-primary sm:text-3xl">
                החזון שלנו
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
                {ABOUT_VISION_PARAGRAPHS.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            <section className="mt-10" aria-label="סרטונים">
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
                  <video
                    className="aspect-video w-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                  >
                    <source src="/vidmp4/vid1.mp4" type="video/mp4" />
                    הדפדפן שלך לא תומך בניגון וידאו.
                  </video>
                </article>
                <article className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
                  <video
                    className="aspect-video w-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                  >
                    <source src="/vidmp4/vid2.mp4" type="video/mp4" />
                    הדפדפן שלך לא תומך בניגון וידאו.
                  </video>
                </article>
              </div>
            </section>

            <p className="mt-8 text-center">
              <Link
                href="/contact"
                className="inline-flex min-h-[46px] items-center justify-center rounded-xl bg-gradient-to-l from-accent-cyan via-blue-500 to-primary px-7 py-3 text-base font-semibold text-white shadow-lg transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                צור קשר
              </Link>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
