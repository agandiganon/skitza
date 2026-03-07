import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { SERVICE_PAGES, getContactServiceHrefForServicePage } from "@/lib/constants";

export function LeadCta() {
  return (
    <section className="cv-auto px-4 py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.2rem] border border-blue-100 bg-gradient-to-l from-primary via-blue-800 to-primary p-6 text-white shadow-[0_28px_80px_-44px_rgba(15,23,42,0.55)] sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-200/85">
              מתחילים מסודר
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-[3rem]">
              צריכים אריזה, הדמיה, עיצוב או הפקה?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/78 sm:text-lg">
              ספרו לנו בקצרה מה צריך לייצר או לתכנן. מכאן אפשר להמשיך לשירות המדויק, לגלריה
              או להשאיר פרטים ישירות כדי שנתאים את הפתרון לפרויקט.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {SERVICE_PAGES.map((service) => (
                <Link
                  key={service.key}
                  href={getContactServiceHrefForServicePage(service.key)}
                  data-track-event="cta_click"
                  data-track-placement="home_lead_band"
                  data-track-label={`home_lead_band::${service.key}`}
                  data-track-service={service.key}
                  className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/16 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900"
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            <Link
              href="/contact"
              data-track-event="cta_click"
              data-track-placement="home_lead_band"
              data-track-label="home_lead_band::contact"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-base font-semibold text-primary shadow-md transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900"
            >
              מעבר לעמוד יצירת קשר
              <ArrowUpLeft className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/gallery"
              data-track-event="cta_click"
              data-track-placement="home_lead_band"
              data-track-label="home_lead_band::gallery"
              className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-white/18 bg-white/10 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-white/16 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900"
            >
              מעבר לגלריה המלאה
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
