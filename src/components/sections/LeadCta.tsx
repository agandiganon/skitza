import Link from "next/link";
import { ArrowUpLeft, Phone } from "lucide-react";
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_CONTACT_URL,
} from "@/lib/constants";

const PROCESS_CARDS = [
  {
    title: "מספרים מה צריך",
    text: "כמה שורות קצרות מספיקות כדי להבין אם מדובר בתכנון, עיצוב או הצעת מחיר.",
  },
  {
    title: "מקבלים כיוון ראשוני",
    text: "עוברים על הפרטים, בודקים מה נכון לפרויקט ומחדדים יחד את המסלול המתאים.",
  },
  {
    title: "ממשיכים מסודר",
    text: "משם מתקדמים לתיאום, הדמיה, עיצוב או הפקה לפי מה שהפרויקט באמת צריך.",
  },
] as const;

export function LeadCta() {
  return (
    <section className="cv-auto px-4 py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.3rem] border border-blue-100/70 bg-[linear-gradient(135deg,_rgba(13,47,102,1),_rgba(24,76,172,0.96)_55%,_rgba(34,197,234,0.78))] p-6 text-white shadow-[0_32px_92px_-50px_rgba(15,23,42,0.58)] sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.95fr)] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-100/82">
              מתחילים מסודר
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl lg:text-[3rem]">
              יודעים שיש פרויקט בדרך, אבל עוד לא בטוחים איך נכון להתחיל?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
              אפשר להשאיר פרטים, להתקשר או לשלוח הודעה בוואטסאפ. מכאן נבין יחד אם מדובר
              בתכנון, עיצוב או הצעת מחיר, ונמשיך לפי מה שהפרויקט באמת צריך.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                data-track-event="cta_click"
                data-track-placement="home_lead_band"
                data-track-label="home_lead_band::contact"
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-base font-semibold text-primary shadow-md transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900"
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
                className="inline-flex min-h-[46px] items-center justify-center rounded-2xl border border-white/18 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/16 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900"
              >
                וואטסאפ
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                data-track-event="click_to_call"
                data-track-placement="home_lead_band"
                data-track-label="home_lead_band::phone"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl border border-white/18 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/16 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {PHONE_DISPLAY}
              </a>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-white/72">
              רוצים קודם להתרשם מהעבודות?{" "}
              <Link
                href="/gallery"
                data-track-event="cta_click"
                data-track-placement="home_lead_band"
                data-track-label="home_lead_band::gallery"
                className="font-semibold text-white underline underline-offset-4 transition hover:no-underline"
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
                className="rounded-[1.6rem] border border-white/15 bg-white/10 p-5 shadow-[0_20px_40px_-32px_rgba(15,23,42,0.54)] backdrop-blur-md"
              >
                <span className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full bg-white/14 px-3 text-xs font-black text-cyan-100">
                  0{index + 1}
                </span>
                <h3 className="mt-4 text-xl font-black text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/72">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
