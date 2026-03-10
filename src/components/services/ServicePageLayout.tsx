import Link from 'next/link';
import { ArrowUpLeft } from 'lucide-react';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { FaqSection } from '@/components/content/FaqSection';
import { getContactServiceHrefForServicePage } from '@/lib/constants';
import {
  getRelatedServices,
  type ServicePageDefinition,
} from '@/lib/content/servicePages';

type ServicePageLayoutProps = {
  page: ServicePageDefinition;
};

const SERVICE_THEME_MAP = {
  print: {
    heroSurface:
      'border-cyan-100 bg-[linear-gradient(180deg,_rgba(255,255,255,0.95),_rgba(237,249,255,0.88))]',
    heroAccent: 'text-cyan-700/80',
    orb: 'bg-gradient-to-br from-cyan-300/28 via-blue-300/14 to-transparent',
    pill: 'border-cyan-100 bg-white/86 text-primary',
    valueBar: 'from-cyan-400 via-blue-500 to-primary',
    badge: 'from-cyan-400 via-blue-500 to-primary',
    aside: 'from-white to-cyan-50/65',
    relatedCard: 'bg-cyan-50/45 hover:bg-white',
    finalShell:
      'border-cyan-100 bg-[linear-gradient(135deg,_rgba(7,89,133,1),_rgba(14,116,144,0.96)_55%,_rgba(34,197,234,0.74))]',
  },
  '3d': {
    heroSurface:
      'border-violet-100 bg-[linear-gradient(180deg,_rgba(255,255,255,0.95),_rgba(245,243,255,0.9))]',
    heroAccent: 'text-violet-700/80',
    orb: 'bg-gradient-to-br from-violet-300/28 via-blue-300/12 to-transparent',
    pill: 'border-violet-100 bg-white/86 text-primary',
    valueBar: 'from-violet-400 via-indigo-500 to-blue-700',
    badge: 'from-violet-400 via-indigo-500 to-blue-700',
    aside: 'from-white to-violet-50/68',
    relatedCard: 'bg-violet-50/42 hover:bg-white',
    finalShell:
      'border-violet-100 bg-[linear-gradient(135deg,_rgba(49,46,129,1),_rgba(79,70,229,0.96)_55%,_rgba(59,130,246,0.72))]',
  },
  'promotional-design': {
    heroSurface:
      'border-fuchsia-100 bg-[linear-gradient(180deg,_rgba(255,255,255,0.95),_rgba(253,242,248,0.9))]',
    heroAccent: 'text-fuchsia-700/80',
    orb: 'bg-gradient-to-br from-fuchsia-300/26 via-rose-300/14 to-transparent',
    pill: 'border-fuchsia-100 bg-white/86 text-primary',
    valueBar: 'from-fuchsia-400 via-pink-500 to-rose-500',
    badge: 'from-fuchsia-400 via-pink-500 to-rose-500',
    aside: 'from-white to-fuchsia-50/66',
    relatedCard: 'bg-fuchsia-50/40 hover:bg-white',
    finalShell:
      'border-fuchsia-100 bg-[linear-gradient(135deg,_rgba(131,24,67,1),_rgba(190,24,93,0.96)_55%,_rgba(236,72,153,0.72))]',
  },
  consultancy: {
    heroSurface:
      'border-amber-100 bg-[linear-gradient(180deg,_rgba(255,255,255,0.95),_rgba(255,251,235,0.9))]',
    heroAccent: 'text-amber-700/80',
    orb: 'bg-gradient-to-br from-amber-300/28 via-orange-300/14 to-transparent',
    pill: 'border-amber-100 bg-white/86 text-primary',
    valueBar: 'from-amber-400 via-orange-500 to-primary',
    badge: 'from-amber-400 via-orange-500 to-primary',
    aside: 'from-white to-amber-50/66',
    relatedCard: 'bg-amber-50/42 hover:bg-white',
    finalShell:
      'border-amber-100 bg-[linear-gradient(135deg,_rgba(146,64,14,1),_rgba(194,65,12,0.96)_55%,_rgba(37,99,235,0.72))]',
  },
} as const;

export function ServicePageLayout({ page }: ServicePageLayoutProps) {
  const relatedServices = getRelatedServices(page.key);
  const theme = SERVICE_THEME_MAP[page.key];

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 px-4 pt-6 pb-16 sm:pt-8 sm:pb-20">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs
          items={[
            { label: 'דף הבית', href: '/' },
            { label: 'שירותים', href: '/#services' },
            { label: page.label },
          ]}
        />

        <section
          className={`cv-auto relative overflow-hidden rounded-[2.3rem] border px-6 py-10 shadow-[0_30px_90px_-48px_rgba(15,23,42,0.3)] ring-1 ring-blue-100 sm:px-10 sm:py-12 ${theme.heroSurface}`}
        >
          <div
            className={`service-hero-orbs pointer-events-none absolute inset-0 opacity-30 ${theme.orb}`}
            aria-hidden
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <p
              className={`text-sm font-black tracking-[0.28em] uppercase ${theme.heroAccent}`}
            >
              שירותי סקיצה
            </p>
            <h1 className="text-primary mt-4 text-3xl leading-tight font-black sm:text-4xl lg:text-[3.2rem]">
              {page.heroTitle}
            </h1>
            <p className="text-foreground/90 mt-5 text-lg leading-relaxed sm:text-xl">
              {page.heroLead}
            </p>
            <p className="text-foreground/75 mx-auto mt-4 max-w-3xl text-base leading-relaxed sm:text-lg">
              {page.heroBody}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              {page.heroPills.map((pill) => (
                <span
                  key={pill}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold ${theme.pill}`}
                >
                  {pill}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={getContactServiceHrefForServicePage(page.key)}
                data-track-event="cta_click"
                data-track-placement="service_hero"
                data-track-label={`${page.href}::primary_contact`}
                data-track-service={page.key}
                className="from-accent-cyan to-primary focus:ring-primary inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-gradient-to-l via-blue-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:opacity-95 focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                {page.primaryCtaLabel}
              </Link>
              <Link
                href="/gallery"
                data-track-event="cta_click"
                data-track-placement="service_hero"
                data-track-label={`${page.href}::gallery`}
                data-track-service={page.key}
                className="text-primary focus:ring-primary inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-blue-100 bg-blue-50/55 px-8 py-3.5 text-base font-semibold transition hover:border-blue-200 hover:bg-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                צפייה בעבודות
              </Link>
            </div>
          </div>
        </section>

        <section
          className="cv-auto mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3 lg:gap-5"
          aria-labelledby={`${page.key}-value-heading`}
        >
          <div className="sm:col-span-3">
            <h2
              id={`${page.key}-value-heading`}
              className="text-primary text-3xl font-black tracking-tight sm:text-4xl"
            >
              מה תקבלו מהשירות
            </h2>
          </div>
          {page.valueItems.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.7rem] border border-blue-100 bg-white/90 p-6 shadow-[0_22px_48px_-40px_rgba(15,23,42,0.4)]"
            >
              <div
                className={`mb-4 h-1.5 w-16 rounded-full bg-gradient-to-l ${theme.valueBar}`}
                aria-hidden
              />
              <h3 className="text-primary text-xl font-bold">{item.title}</h3>
              <p className="text-foreground/80 mt-3 leading-relaxed">
                {item.text}
              </p>
            </article>
          ))}
        </section>

        <section className="cv-auto mt-10 grid gap-5 lg:mt-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.95fr)]">
          <div className="rounded-[2rem] border border-blue-100 bg-white/92 p-6 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.36)] sm:p-8">
            <h2 className="text-primary text-3xl font-black tracking-tight sm:text-4xl">
              איך עובדים
            </h2>
            <div className="mt-6 grid gap-4">
              {page.processSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-[1.5rem] border border-blue-100 bg-blue-50/50 p-5"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-l text-sm font-black text-white shadow-md ${theme.badge}`}
                    >
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-primary text-lg font-bold">
                        {step.title}
                      </h3>
                      <p className="text-foreground/78 mt-2 leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside
            className={`rounded-[2rem] border border-blue-100 bg-gradient-to-b p-6 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.32)] sm:p-8 ${theme.aside}`}
          >
            <h2 className="text-primary text-3xl font-black tracking-tight sm:text-4xl">
              למי זה מתאים
            </h2>
            <ul className="mt-6 space-y-3">
              {page.fitItems.map((item) => (
                <li
                  key={item}
                  className="text-foreground/80 rounded-2xl border border-blue-100 bg-white/90 px-4 py-4 leading-relaxed shadow-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="cv-auto mt-10 grid gap-5 lg:mt-12 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-blue-100 bg-white/92 p-6 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.36)] sm:p-8">
            <h2 className="text-primary text-3xl font-black tracking-tight sm:text-4xl">
              {page.focusTitle}
            </h2>
            <ul className="mt-6 space-y-3">
              {page.focusItems.map((item) => (
                <li
                  key={item}
                  className="text-foreground/78 rounded-2xl border border-blue-100 bg-blue-50/55 px-4 py-4 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[2rem] border border-blue-100 bg-white/92 p-6 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.36)] sm:p-8">
            <h2 className="text-primary text-3xl font-black tracking-tight sm:text-4xl">
              {page.prepTitle}
            </h2>
            <ul className="mt-6 space-y-3">
              {page.prepItems.map((item) => (
                <li
                  key={item}
                  className="text-foreground/78 rounded-2xl border border-blue-100 bg-white px-4 py-4 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <FaqSection
          items={page.faq}
          className="mt-10 sm:mt-12"
          intro="תשובות קצרות לשאלות שעוזרות להבין מתי השירות נכון לכם ואיך נכון להתחיל."
        />

        <section
          className="cv-auto mt-10 rounded-[2rem] border border-blue-100 bg-white/92 p-6 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.36)] sm:mt-12 sm:p-8"
          aria-labelledby={`${page.key}-related-heading`}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id={`${page.key}-related-heading`}
                className="text-primary text-3xl font-black tracking-tight sm:text-4xl"
              >
                שירותים שיכולים להשלים את הפרויקט
              </h2>
              <p className="text-foreground/75 mt-3 max-w-3xl text-base leading-relaxed">
                אם הפרויקט שלכם דורש יותר משלב אחד, אלה השירותים שיכולים להתחבר
                להמשך עבודה מסודר.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {relatedServices.map((relatedService) => (
              <Link
                key={relatedService.key}
                href={relatedService.href}
                data-track-event="service_navigation_click"
                data-track-placement="service_related"
                data-track-label={relatedService.href}
                data-track-service={relatedService.key}
                className={`group focus:ring-primary rounded-[1.45rem] border border-blue-100 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none ${theme.relatedCard}`}
              >
                <h3 className="text-primary text-lg font-bold">
                  {relatedService.label}
                </h3>
                <p className="text-foreground/75 mt-3 text-sm leading-relaxed">
                  {relatedService.heroLead}
                </p>
                <span className="group-hover:text-primary mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 transition">
                  מעבר לשירות
                  <ArrowUpLeft className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section
          className={`cv-auto mt-10 rounded-[2rem] border p-6 text-white shadow-[0_26px_70px_-40px_rgba(15,23,42,0.45)] sm:mt-12 sm:p-8 ${theme.finalShell}`}
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-black tracking-[0.24em] text-cyan-200/80 uppercase">
                השלב הבא
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                אם הכיוון ברור, אפשר להתחיל מהשארת פרטים מסודרת
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/78 sm:text-lg">
                ספרו לנו בקצרה מה צריך לייצר או לתכנן, בחרו את סוג הפנייה,
                ונחזור להמשך תיאום והתאמה של המסלול הנכון לפרויקט.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href={getContactServiceHrefForServicePage(page.key)}
                data-track-event="cta_click"
                data-track-placement="service_bottom"
                data-track-label={`${page.href}::bottom_contact`}
                data-track-service={page.key}
                className="text-primary inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-white px-7 py-3 text-base font-semibold shadow-md transition hover:-translate-y-0.5 hover:bg-sky-50 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900 focus:outline-none"
              >
                מעבר לטופס יצירת קשר
              </Link>
              <Link
                href={relatedServices[0]?.href ?? '/contact'}
                data-track-event="cta_click"
                data-track-placement="service_bottom"
                data-track-label={`${page.href}::bottom_related`}
                data-track-service={relatedServices[0]?.key ?? page.key}
                className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-7 py-3 text-base font-semibold text-white/92 transition hover:bg-white/16 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900 focus:outline-none"
              >
                מעבר לשירות משלים
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
