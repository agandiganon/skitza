import Link from 'next/link';
import { ArrowUpLeft, Mail, MapPin, Phone } from 'lucide-react';
import {
  ADDRESS,
  ADDRESS_MAP_URL,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SERVICE_PAGES,
} from '@/lib/constants';

const quickLinks = [
  { label: 'דף הבית', href: '/' },
  { label: 'גלריה', href: '/gallery' },
  { label: 'צור קשר', href: '/contact' },
  { label: 'מדיניות פרטיות', href: '/privacy' },
] as const;

export function Footer() {
  return (
    <footer className="text-primary border-t border-blue-900/10 bg-[linear-gradient(180deg,_rgba(248,251,255,0.98),_rgba(237,245,255,0.94))]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="footer-shell rounded-[2rem] border border-white/75 bg-white/88 p-6 shadow-[0_28px_90px_-52px_rgba(15,23,42,0.34)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(520px,0.95fr)] lg:gap-10">
            <section
              aria-labelledby="footer-brand-heading"
              className="space-y-5"
            >
              <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-black tracking-[0.22em] text-blue-700/80 uppercase">
                סקיצה אריזות
              </div>
              <div>
                <h2
                  id="footer-brand-heading"
                  className="text-primary text-3xl font-black tracking-tight sm:text-[2.2rem]"
                >
                  בית דפוס לאריזות שמרכז את העבודה במקום אחד
                </h2>
                <p className="text-foreground/78 mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">
                  תכנון, עיצוב, הדמיה והפקה לעסקים שצריכים אריזות ופתרונות דפוס
                  ברמת גימור מדויקת, עם עבודה מסודרת וזמינות גבוהה לאורך הדרך.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  data-track-event="cta_click"
                  data-track-placement="footer_primary"
                  data-track-label="footer_contact"
                  className="from-accent-cyan to-primary focus:ring-primary inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-l via-blue-500 px-6 py-3.5 text-base font-semibold text-white shadow-[0_18px_44px_-24px_rgba(30,64,175,0.45)] transition hover:-translate-y-0.5 hover:brightness-105 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                >
                  השאירו פרטים
                  <ArrowUpLeft className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href="/gallery"
                  data-track-event="cta_click"
                  data-track-placement="footer_secondary"
                  data-track-label="footer_gallery"
                  className="text-primary focus:ring-primary inline-flex min-h-[44px] items-center justify-center rounded-2xl px-1 py-3 text-sm font-semibold underline underline-offset-4 transition hover:no-underline focus:ring-2 focus:ring-offset-2 focus:outline-none"
                >
                  צפו בעבודות
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <a
                  href={`tel:${PHONE_TEL}`}
                  data-track-event="click_to_call"
                  data-track-placement="footer"
                  data-track-label="footer_phone"
                  className="text-primary rounded-[1.35rem] border border-blue-100 bg-blue-50/55 px-4 py-4 text-sm font-semibold shadow-sm transition hover:border-blue-200 hover:bg-white"
                >
                  <span className="mb-2 flex items-center gap-2 text-blue-700">
                    <Phone className="h-4 w-4" aria-hidden />
                    טלפון
                  </span>
                  <span dir="ltr" className="block text-base font-black">
                    {PHONE_DISPLAY}
                  </span>
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  data-track-event="contact_click"
                  data-track-placement="footer"
                  data-track-label="footer_email"
                  className="text-primary rounded-[1.35rem] border border-blue-100 bg-blue-50/55 px-4 py-4 text-sm font-semibold shadow-sm transition hover:border-blue-200 hover:bg-white"
                >
                  <span className="mb-2 flex items-center gap-2 text-blue-700">
                    <Mail className="h-4 w-4" aria-hidden />
                    אימייל
                  </span>
                  <span className="block truncate text-base font-black">
                    {EMAIL}
                  </span>
                </a>
                <a
                  href={ADDRESS_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-event="contact_click"
                  data-track-placement="footer"
                  data-track-label="footer_map"
                  className="text-primary rounded-[1.35rem] border border-blue-100 bg-blue-50/55 px-4 py-4 text-sm font-semibold shadow-sm transition hover:border-blue-200 hover:bg-white"
                >
                  <span className="mb-2 flex items-center gap-2 text-blue-700">
                    <MapPin className="h-4 w-4" aria-hidden />
                    כתובת
                  </span>
                  <span className="block text-base font-black">{ADDRESS}</span>
                </a>
              </div>
            </section>

            <div className="grid gap-6 sm:grid-cols-2">
              <section
                aria-labelledby="footer-services-heading"
                className="rounded-[1.6rem] border border-blue-100 bg-white/88 p-5 shadow-[0_16px_40px_-32px_rgba(15,23,42,0.32)]"
              >
                <h2
                  id="footer-services-heading"
                  className="text-primary text-lg font-black"
                >
                  שירותים מרכזיים
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {SERVICE_PAGES.map(({ label, href, key }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        data-track-event="service_navigation_click"
                        data-track-placement="footer"
                        data-track-label={href}
                        data-track-service={key}
                        className="group text-foreground/78 hover:text-primary focus:ring-primary flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold transition hover:bg-blue-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                      >
                        <span>{label}</span>
                        <ArrowUpLeft
                          className="group-hover:text-primary h-4 w-4 text-blue-600/70 transition"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              <section
                aria-labelledby="footer-links-heading"
                className="rounded-[1.6rem] border border-blue-100 bg-white/88 p-5 shadow-[0_16px_40px_-32px_rgba(15,23,42,0.32)]"
              >
                <h2
                  id="footer-links-heading"
                  className="text-primary text-lg font-black"
                >
                  קישורים שימושיים
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {quickLinks.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        data-track-event="navigation_click"
                        data-track-placement="footer"
                        data-track-label={href}
                        className="text-foreground/78 hover:text-primary focus:ring-primary block rounded-xl px-3 py-3 text-sm font-semibold transition hover:bg-blue-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          <div className="text-foreground/58 mt-8 border-t border-blue-100/80 pt-5 text-center text-sm">
            סקיצה אריזות, חולון. תכנון, עיצוב והפקת אריזות ופתרונות דפוס לעסקים.
          </div>
        </div>
      </div>
    </footer>
  );
}
