import Link from 'next/link';
import { ArrowUpLeft, Phone } from 'lucide-react';
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_CONTACT_URL,
} from '@/lib/constants';

const PROCESS_CARDS = [
  {
    title: 'מספרים מה צריך',
    text: 'כמה שורות קצרות מספיקות כדי להבין אם מדובר בתכנון, עיצוב או הצעת מחיר.',
  },
  {
    title: 'מקבלים כיוון ראשוני',
    text: 'עוברים על הפרטים, בודקים מה נכון לפרויקט ומחדדים יחד את המסלול המתאים.',
  },
  {
    title: 'ממשיכים מסודר',
    text: 'משם מתקדמים לתיאום, הדמיה, עיצוב או הפקה לפי מה שהפרויקט באמת צריך.',
  },
] as const;

export function LeadCta() {
  return (
    <section className="cv-auto px-4 py-12 sm:py-14 lg:py-16">
      <div className="text-primary mx-auto max-w-6xl overflow-hidden rounded-[2.2rem] border border-blue-100/70 bg-[linear-gradient(145deg,_rgba(240,247,255,0.95),_rgba(226,239,255,0.98)_55%,_rgba(247,251,255,0.98))] p-6 shadow-[0_28px_82px_-54px_rgba(15,23,42,0.22)] sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.95fr)] lg:items-center">
          <div>
            <p className="text-sm font-black tracking-[0.24em] text-blue-700/85 uppercase">
              מתחילים מסודר
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl lg:text-[3rem]">
              יש כיוון לפרויקט, אבל עוד לא ברור מה המסלול הנכון?
            </h2>
            <p className="text-foreground/78 mt-4 max-w-3xl text-base leading-relaxed sm:text-lg">
              אפשר להשאיר פרטים, להתקשר או לשלוח הודעה בוואטסאפ. מכאן נבין יחד
              אם מדובר בתכנון, עיצוב או הצעת מחיר, ונמשיך לפי מה שהפרויקט באמת
              צריך.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                data-track-event="cta_click"
                data-track-placement="home_lead_band"
                data-track-label="home_lead_band::contact"
                className="from-accent-cyan to-primary focus:ring-primary inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-l via-blue-500 px-6 py-3.5 text-base font-semibold text-white shadow-[0_16px_34px_-24px_rgba(30,64,175,0.34)] transition hover:-translate-y-0.5 hover:brightness-105 focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                עמוד יצירת קשר
                <ArrowUpLeft className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href={WHATSAPP_CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-track-event="whatsapp_click"
                data-track-placement="home_lead_band"
                data-track-label="home_lead_band::whatsapp"
                className="text-primary focus:ring-primary inline-flex min-h-[46px] items-center justify-center rounded-2xl border border-blue-100 bg-white/88 px-5 py-3 text-sm font-semibold transition hover:border-blue-200 hover:bg-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                וואטסאפ
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                data-track-event="click_to_call"
                data-track-placement="home_lead_band"
                data-track-label="home_lead_band::phone"
                className="text-primary focus:ring-primary inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-white/88 px-5 py-3 text-sm font-semibold transition hover:border-blue-200 hover:bg-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                <Phone className="h-4 w-4" aria-hidden />
                <span dir="ltr">{PHONE_DISPLAY}</span>
              </a>
            </div>

            <p className="text-foreground/68 mt-5 text-sm leading-relaxed">
              רוצים קודם להתרשם מהעבודות?{' '}
              <Link
                href="/gallery"
                data-track-event="cta_click"
                data-track-placement="home_lead_band"
                data-track-label="home_lead_band::gallery"
                className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4 transition hover:no-underline"
              >
                עברו לגלריה המלאה
              </Link>
              .
            </p>
          </div>

          <div className="grid gap-3">
            {PROCESS_CARDS.map((card, index) => (
              <article
                key={card.title}
                className="rounded-[1.6rem] border border-blue-100/80 bg-white/88 p-5 shadow-[0_18px_38px_-34px_rgba(15,23,42,0.18)]"
              >
                <span className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full bg-blue-100 px-3 text-xs font-black text-blue-700">
                  0{index + 1}
                </span>
                <h3 className="text-primary mt-4 text-xl font-black">
                  {card.title}
                </h3>
                <p className="text-foreground/78 mt-2 text-sm leading-relaxed">
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
