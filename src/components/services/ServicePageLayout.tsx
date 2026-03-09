import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { FaqSection } from "@/components/content/FaqSection";
import { getContactServiceHrefForServicePage } from "@/lib/constants";
import { getRelatedServices, type ServicePageDefinition } from "@/lib/content/servicePages";

type ServicePageLayoutProps = {
  page: ServicePageDefinition;
};

export function ServicePageLayout({ page }: ServicePageLayoutProps) {
  const relatedServices = getRelatedServices(page.key);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 px-4 pt-6 pb-16 sm:pt-8 sm:pb-20">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs
          items={[
            { label: "דף הבית", href: "/" },
            { label: "שירותים", href: "/#services" },
            { label: page.label },
          ]}
        />

        <section className="cv-auto relative overflow-hidden rounded-[2.3rem] border border-blue-100 bg-white/92 px-6 py-10 shadow-[0_30px_90px_-48px_rgba(15,23,42,0.4)] ring-1 ring-blue-100 sm:px-10 sm:py-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 16% 18%, rgba(59,130,246,0.18), transparent 42%), radial-gradient(circle at 84% 16%, rgba(6,182,212,0.18), transparent 38%)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-700/75">
              שירותי סקיצה
            </p>
            <h1 className="mt-4 text-3xl font-black leading-tight text-primary sm:text-4xl lg:text-[3.2rem]">
              {page.heroTitle}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-foreground/90 sm:text-xl">
              {page.heroLead}
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-foreground/75 sm:text-lg">
              {page.heroBody}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              {page.heroPills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-semibold text-primary"
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
                className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-gradient-to-l from-accent-cyan via-blue-500 to-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {page.primaryCtaLabel}
              </Link>
              <Link
                href="/gallery"
                data-track-event="cta_click"
                data-track-placement="service_hero"
                data-track-label={`${page.href}::gallery`}
                data-track-service={page.key}
                className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-blue-100 bg-blue-50/55 px-8 py-3.5 text-base font-semibold text-primary transition hover:border-blue-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                צפייה בעבודות
              </Link>
            </div>
          </div>
        </section>

        <section className="cv-auto mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3 lg:gap-5" aria-labelledby={`${page.key}-value-heading`}>
          <div className="sm:col-span-3">
            <h2
              id={`${page.key}-value-heading`}
              className="text-3xl font-black tracking-tight text-primary sm:text-4xl"
            >
              מה תקבלו מהשירות
            </h2>
          </div>
          {page.valueItems.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.7rem] border border-blue-100 bg-white/90 p-6 shadow-[0_22px_48px_-40px_rgba(15,23,42,0.4)]"
            >
              <div className="mb-4 h-1.5 w-16 rounded-full bg-gradient-to-l from-accent-cyan via-blue-500 to-primary" aria-hidden />
              <h3 className="text-xl font-bold text-primary">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-foreground/80">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="cv-auto mt-10 grid gap-5 lg:mt-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.95fr)]">
          <div className="rounded-[2rem] border border-blue-100 bg-white/92 p-6 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.36)] sm:p-8">
            <h2 className="text-3xl font-black tracking-tight text-primary sm:text-4xl">
              איך עובדים
            </h2>
            <div className="mt-6 grid gap-4">
              {page.processSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-[1.5rem] border border-blue-100 bg-blue-50/50 p-5"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-l from-accent-cyan via-blue-500 to-primary text-sm font-black text-white shadow-md">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-primary">{step.title}</h3>
                      <p className="mt-2 leading-relaxed text-foreground/78">{step.text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-blue-100 bg-gradient-to-b from-white to-blue-50/65 p-6 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.32)] sm:p-8">
            <h2 className="text-3xl font-black tracking-tight text-primary sm:text-4xl">
              למי זה מתאים
            </h2>
            <ul className="mt-6 space-y-3">
              {page.fitItems.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-blue-100 bg-white/90 px-4 py-4 leading-relaxed text-foreground/80 shadow-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="cv-auto mt-10 grid gap-5 lg:mt-12 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-blue-100 bg-white/92 p-6 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.36)] sm:p-8">
            <h2 className="text-3xl font-black tracking-tight text-primary sm:text-4xl">
              {page.focusTitle}
            </h2>
            <ul className="mt-6 space-y-3">
              {page.focusItems.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-blue-100 bg-blue-50/55 px-4 py-4 leading-relaxed text-foreground/78"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[2rem] border border-blue-100 bg-white/92 p-6 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.36)] sm:p-8">
            <h2 className="text-3xl font-black tracking-tight text-primary sm:text-4xl">
              {page.prepTitle}
            </h2>
            <ul className="mt-6 space-y-3">
              {page.prepItems.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-blue-100 bg-white px-4 py-4 leading-relaxed text-foreground/78"
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
                className="text-3xl font-black tracking-tight text-primary sm:text-4xl"
              >
                שירותים שיכולים להשלים את הפרויקט
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground/75">
                אם הפרויקט שלכם דורש יותר משלב אחד, אלה השירותים שיכולים להתחבר להמשך עבודה
                מסודר.
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
                className="group rounded-[1.45rem] border border-blue-100 bg-blue-50/50 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <h3 className="text-lg font-bold text-primary">{relatedService.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                  {relatedService.heroLead}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 transition group-hover:text-primary">
                  מעבר לשירות
                  <ArrowUpLeft className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="cv-auto mt-10 rounded-[2rem] border border-blue-100 bg-gradient-to-l from-primary via-blue-800 to-primary p-6 text-white shadow-[0_26px_70px_-40px_rgba(15,23,42,0.55)] sm:mt-12 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-200/80">
                השלב הבא
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                אם הכיוון ברור, אפשר להתחיל מהשארת פרטים מסודרת
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/78 sm:text-lg">
                ספרו לנו בקצרה מה צריך לייצר או לתכנן, בחרו את סוג הפנייה, ונחזור להמשך
                בירור והתאמת פתרון לפרויקט.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href={getContactServiceHrefForServicePage(page.key)}
                data-track-event="cta_click"
                data-track-placement="service_bottom"
                data-track-label={`${page.href}::bottom_contact`}
                data-track-service={page.key}
                className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-white px-7 py-3 text-base font-semibold text-primary shadow-md transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900"
              >
                מעבר לטופס יצירת קשר
              </Link>
              <Link
                href={relatedServices[0]?.href ?? "/contact"}
                data-track-event="cta_click"
                data-track-placement="service_bottom"
                data-track-label={`${page.href}::bottom_related`}
                data-track-service={relatedServices[0]?.key ?? page.key}
                className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-7 py-3 text-base font-semibold text-white transition hover:bg-white/16 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900"
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
