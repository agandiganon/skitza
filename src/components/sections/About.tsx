"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Compass,
  Palette,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Workflow,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const HOME_ABOUT_PARAGRAPHS = [
  "סקיצה אריזות היא בית דפוס בחולון המתמחה בייעוץ, תכנון וייצור אריזות וקרטונים ממותגים לעסקים. אנחנו מלווים כל לקוח משלב הרעיון ועד למוצר מוגמר שמוכן למדף.",
  "התהליך שלנו משלב תכנון מבני מדויק, עיצוב שמתאים לשפה המותגית, בחירת חומרי גלם נכונה וייצור מוקפד במפעל. כך מתקבלת אריזה שנראית מעולה וגם עובדת נכון בפועל.",
];

type AboutStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const HOME_ABOUT_STEPS: AboutStep[] = [
  {
    title: "אפיון וייעוץ חכם",
    description: "מגדירים מטרה עסקית, קהל יעד ודרישות מוצר כבר בתחילת הדרך.",
    icon: Compass,
  },
  {
    title: "תכנון + מיתוג מדויק",
    description: "בונים מבנה אריזה ומתרגמים את השפה הגרפית לזהות מוצר ברורה.",
    icon: Workflow,
  },
  {
    title: "ייצור מהיר ובקרת איכות",
    description: "מוציאים לפועל בדפוס מתקדם עם בקרה רציפה וזמני אספקה קצרים.",
    icon: TimerReset,
  },
];

type AboutPillar = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const HOME_ABOUT_PILLARS: AboutPillar[] = [
  {
    title: "תכנון אסטרטגי",
    description: "בניית מבנה אריזה מדויק לפי מוצר, לוגיסטיקה וחוויית משתמש.",
    icon: Compass,
  },
  {
    title: "עיצוב ומיתוג",
    description: "תרגום השפה המותגית לאריזה שמושכת תשומת לב ונשארת בזיכרון.",
    icon: Palette,
  },
  {
    title: "ייצור בפועל",
    description: "דפוס, חיתוך ובקרת איכות במקום אחד לדיוק וזמני אספקה מהירים.",
    icon: Boxes,
  },
  {
    title: "איכות עקבית",
    description: "חומרי גלם איכותיים ותהליך עבודה מסודר בכל הזמנה ובכל כמות.",
    icon: ShieldCheck,
  },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="home-about-heading"
      className="bg-[radial-gradient(circle_at_20%_15%,rgba(56,189,248,0.16),transparent_42%),radial-gradient(circle_at_85%_80%,rgba(37,99,235,0.14),transparent_40%),linear-gradient(180deg,#eef4ff_0%,#e8f1ff_100%)] px-4 py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-[2.2rem] border border-blue-200/70 bg-white/60 p-5 shadow-[0_30px_80px_-48px_rgba(31,78,161,0.62)] backdrop-blur-sm sm:p-7 lg:p-9">
            <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-cyan-300/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-12 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-blue-200/40" />

            <div className="relative grid gap-5 lg:grid-cols-[1.22fr_0.88fr] lg:items-start">
              <article className="order-2 rounded-[1.8rem] border border-blue-100/80 bg-white/80 p-6 shadow-[0_18px_45px_-35px_rgba(37,99,235,0.75)] lg:order-1">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/90 px-3 py-1 text-sm font-bold text-primary">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  אודות סקיצה
                </div>

                <h2
                  id="home-about-heading"
                  className="text-right text-[1.95rem] font-black leading-tight tracking-tight text-primary sm:text-[2.4rem]"
                >
                  בית דפוס לאריזות שמחבר בין תכנון הנדסי, מיתוג חזק ותוצאה מסחרית.
                </h2>

                <div className="mt-4 space-y-3 text-right text-[1.03rem] leading-relaxed text-foreground/90">
                  {HOME_ABOUT_PARAGRAPHS.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {HOME_ABOUT_STEPS.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <article
                        key={step.title}
                        className="rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50/90 to-white/90 p-4 text-right shadow-sm"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[0.82rem] font-black text-primary/70">
                            0{index + 1}
                          </span>
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                        </div>
                        <h3 className="mb-1 text-sm font-extrabold text-primary">{step.title}</h3>
                        <p className="text-xs leading-relaxed text-foreground/75">{step.description}</p>
                      </article>
                    );
                  })}
                </div>

                <p className="mt-5 text-right">
                  <Link
                    href="/about"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-xl border-2 border-primary px-7 py-2.5 font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    קרא עוד אודות המפעל
                  </Link>
                </p>
              </article>

              <div className="order-1 grid gap-3 sm:grid-cols-2 lg:order-2 lg:grid-cols-1">
                {HOME_ABOUT_PILLARS.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <article
                      key={pillar.title}
                      className="group rounded-2xl border border-blue-100 bg-gradient-to-br from-white via-white to-blue-50/70 p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent-cyan text-white shadow-sm">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="mb-1 text-base font-extrabold text-primary">{pillar.title}</h3>
                      <p className="text-sm leading-relaxed text-foreground/80">
                        {pillar.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
