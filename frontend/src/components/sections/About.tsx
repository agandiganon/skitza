"use client";

import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const HOME_ABOUT_PARAGRAPHS = [
  "סקיצה אריזות היא בית דפוס בחולון המתמחה בייעוץ, תכנון וייצור אריזות וקרטונים ממותגים לעסקים. אנחנו מלווים את הלקוחות משלב הרעיון, דרך פיתוח מבנה האריזה והעיצוב, ועד תוצר מדויק ומוכן לייצור.",
  "במפעל אנו מטפלים גם בפרויקטים מורכבים, תוך שימוש בחומרי גלם איכותיים, תהליכי בקרת איכות קפדניים, טכנולוגיות דפוס מתקדמות, חיתוך דגמים בפלוטר והדמיה מקדימה כדי לחסוך טעויות ולדייק את התוצאה.",
  "אנחנו עובדים עם מגוון ניירות, קרטון קשיח וקרטון גלי, עם התאמה נכונה לשימוש, לעמידות ולמראה הסופי. הדגש שלנו הוא על תוצאה איכותית, שירות אישי ולוחות זמנים מהירים.",
];

const HOME_ABOUT_HIGHLIGHTS = [
  "ייעוץ מקצועי לתכנון אריזות",
  "התאמת חומרים לפי שימוש, עמידות ותקציב",
  "טיפול בפרויקטים פשוטים ומורכבים",
  "עמידה בזמנים ושירות אישי לאורך כל הדרך",
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="home-about-heading"
      className="bg-blue-50 px-4 py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <AnimatedSection>
          <h2
            id="home-about-heading"
            className="mb-6 text-center text-4xl font-black tracking-tight text-primary sm:text-5xl lg:text-[3.2rem]"
          >
            אודות
          </h2>
          <div className="space-y-4 text-center text-lg leading-relaxed text-foreground/90">
            {HOME_ABOUT_PARAGRAPHS.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-7 grid gap-3 text-right sm:grid-cols-2">
            {HOME_ABOUT_HIGHLIGHTS.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-blue-100 bg-white/70 px-4 py-3 text-sm font-semibold text-primary shadow-sm"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center">
            <Link
              href="/about"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border-2 border-primary px-6 py-2.5 font-medium text-primary transition hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              קרא עוד אודות המפעל
            </Link>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
