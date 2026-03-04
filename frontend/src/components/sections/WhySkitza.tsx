"use client";

import Link from "next/link";
import { ArrowUpLeft, Headphones, Palette, Zap } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const items = [
  {
    icon: Zap,
    title: "ייעוץ ותכנון אריזה",
    description: "שירותי ייעוץ ותכנון אריזות/קרטוניות ברמה גבוהה, בהתאמה למוצר, למותג ולתקציב.",
  },
  {
    icon: Palette,
    title: "ביצוע פרויקטים מורכבים",
    description: "ניסיון מעשי בפרויקטים מורכבים כולל אריזה, עם תהליך עבודה מסודר וליווי רציף.",
  },
  {
    icon: Headphones,
    title: "רמת גימור מושלמת",
    description: "בקרת איכות קפדנית לאורך כל הדרך כדי להבטיח תוצאה סופית מדויקת ומרשימה.",
  },
];

const PROCESS_STEPS = [
  {
    title: "חומרי גלם מעולים",
    text: "בחירה בחומרי גלם איכותיים, עמידים ומתאימים לכל סוגי המוצרים והאריזות.",
  },
  {
    title: "חיתוך דגמים מתקדם",
    text: "יצירת דגמים מדויקים בפלוטר מתקדם לצורך בדיקה ואישור לפני כניסה לייצור.",
  },
  {
    title: "הדמיה חיה אונליין",
    text: "הדמיה לפי קובץ לקוח שמאפשרת לראות את התוצאה מראש ולדייק פרטים בזמן אמת.",
  },
];

export function WhySkitza() {
  return (
    <section
      aria-labelledby="home-advantages-heading"
      className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-[#edf5ff] to-white px-4 py-14 sm:py-16 lg:py-20"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -right-28 top-8 h-64 w-64 rounded-full bg-blue-300/25 blur-3xl" />
        <div className="absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <AnimatedSection>
          <div className="mb-12 text-center sm:mb-14">
            <h2
              id="home-advantages-heading"
              className="text-4xl font-black tracking-tight text-primary sm:text-5xl lg:text-[3.35rem]"
            >
              היתרונות שלנו
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-foreground/75 sm:text-lg">
              שילוב בין קריאייטיב, דיוק הנדסי וחומרי גלם איכותיים כדי שהאריזה שלכם תבלוט,
              תישאר עמידה ותשדר מותג חזק בכל מפגש עם הלקוח.
            </p>
          </div>
        </AnimatedSection>

        <div className="mb-12 grid gap-7 sm:grid-cols-3 lg:mb-14">
          {items.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1}>
              <article className="group relative flex h-full flex-col items-center overflow-hidden rounded-[28px] border border-blue-200/80 bg-white/85 p-8 text-center shadow-[0_18px_45px_-26px_rgba(30,58,95,0.7)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-[0_26px_60px_-30px_rgba(30,58,95,0.75)]">
                <div className="absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-300/35 to-transparent blur-2xl" />
                <span className="absolute left-4 top-4 inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-blue-100 px-2 text-xs font-bold text-blue-700">
                  0{i + 1}
                </span>
                <div className="relative mb-5 inline-flex rounded-2xl bg-gradient-to-l from-accent-cyan via-blue-500 to-primary p-4 text-white shadow-lg ring-4 ring-blue-100/70 transition duration-300 group-hover:scale-[1.06] group-hover:shadow-xl">
                  <item.icon className="h-8 w-8" aria-hidden />
                </div>
                <h3 className="mb-2.5 text-xl font-extrabold leading-tight text-primary">{item.title}</h3>
                <p className="leading-relaxed text-foreground/78">{item.description}</p>
              </article>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[30px] border border-blue-200/80 bg-white/90 p-5 shadow-[0_24px_70px_-40px_rgba(29,78,216,0.6)] sm:p-7 lg:p-8">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-blue-100/70 to-transparent"
              aria-hidden
            />
            <div className="relative grid gap-4 sm:grid-cols-3">
              {PROCESS_STEPS.map((step) => (
                <article
                  key={step.title}
                  className="group relative rounded-2xl border border-blue-100/90 bg-gradient-to-b from-white to-blue-50/45 p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <div
                    className="mb-3 h-1.5 w-14 rounded-full bg-gradient-to-l from-accent-cyan via-blue-500 to-primary"
                    aria-hidden
                  />
                  <h3 className="text-lg font-extrabold text-primary">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">{step.text}</p>
                </article>
              ))}
            </div>
          </div>

          <p className="mt-9 text-center">
            <Link
              href="/contact"
              className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-accent-cyan via-blue-500 to-primary px-8 py-4 text-lg font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              קבלת הצעת מחיר
              <ArrowUpLeft className="h-5 w-5" aria-hidden />
            </Link>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
