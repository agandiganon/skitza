import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { FaqSection } from "@/components/content/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactForm } from "@/components/ui/ContactForm";
import { CONTACT_FAQ_ITEMS } from "@/lib/content/servicePages";
import {
  ADDRESS,
  ADDRESS_MAP_URL,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SERVICE_PAGES,
  getContactServiceValueFromQuery,
} from "@/lib/constants";
import {
  buildBreadcrumbSchema,
  buildContactPageSchema,
  buildFaqSchema,
} from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "צור קשר",
  description:
    "צור קשר עם בית הדפוס סקיצה אריזות בחולון לקבלת הצעת מחיר להדפסת אריזות ואריזות מותאמות אישית.",
  keywords: ["צור קשר בית דפוס בחולון", "הדפסת אריזות", "בית דפוס לאריזות"],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "צור קשר - סקיצה אריזות",
    description: "השאירו פרטים ונחזור אליכם במהירות עם פתרון אריזה מותאם לעסק.",
    url: "/contact",
    locale: "he_IL",
    type: "website",
  },
};

const CONTACT_LEAD =
  "אם אתם צריכים תכנון אריזה, הדמיה, עיצוב או הפקת דפוס, הדרך המהירה ביותר להתחיל היא להשאיר פרטים ולכוון אותנו לשירות הרלוונטי.";
const MAP_EMBED =
  "https://www.openstreetmap.org/export/embed.html?bbox=34.768%2C32.008%2C34.792%2C32.022&layer=mapnik&marker=32.015%2C34.78";

type SearchParamsInput =
  | Promise<Record<string, string | string[] | undefined>>
  | Record<string, string | string[] | undefined>
  | undefined;

type ContactPageProps = {
  searchParams?: SearchParamsInput;
};

function getQueryServiceValue(rawService: string | string[] | undefined) {
  if (Array.isArray(rawService)) {
    return getContactServiceValueFromQuery(rawService[0]);
  }

  return getContactServiceValueFromQuery(rawService);
}

const trustPoints = [
  "אפשר להתחיל גם משלב הרעיון וגם ממוצר קיים.",
  "התהליך יכול לחבר בין תכנון, הדמיה, עיצוב והפקה.",
  "הפנייה מגיעה ישירות לשירות הרלוונטי שבחרתם.",
] as const;

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const selectedService = getQueryServiceValue(resolvedSearchParams.service);

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { label: "דף הבית", href: "/" },
            { label: "צור קשר", href: "/contact" },
          ]),
          buildContactPageSchema({
            description:
              "דף יצירת קשר להשארת פרטים מהירה עבור תכנון אריזות, הדמיות, עיצוב והפקות דפוס.",
          }),
          buildFaqSchema(CONTACT_FAQ_ITEMS),
        ]}
      />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 px-4 pt-6 pb-16 sm:pt-8 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={[{ label: "דף הבית", href: "/" }, { label: "צור קשר" }]} />

          <section className="rounded-[2.3rem] border border-blue-100 bg-white/92 p-6 shadow-[0_30px_90px_-48px_rgba(15,23,42,0.42)] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:items-start">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-700/75">
                  צור קשר
                </p>
                <h1 className="mt-4 text-4xl font-black tracking-tight text-primary sm:text-5xl">
                  הכי מהיר זה להשאיר פרטים
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/85 sm:text-xl">
                  {CONTACT_LEAD}
                </p>

                <div className="mt-7 rounded-[1.7rem] border border-blue-100 bg-blue-50/55 p-5">
                  <h2 className="text-xl font-bold text-primary">בחרו במה תרצו שנתחיל לטפל</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {SERVICE_PAGES.map((service) => {
                      const isSelected = selectedService === service.contactValue;

                      return (
                        <Link
                          key={service.key}
                          href={`/contact?service=${service.key}#contact-form`}
                          className={`rounded-2xl border px-4 py-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                            isSelected
                              ? "border-blue-500 bg-white text-primary shadow-md"
                              : "border-blue-100 bg-white/70 text-foreground/80 hover:border-blue-200 hover:bg-white"
                          }`}
                        >
                          {service.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {trustPoints.map((point) => (
                    <div
                      key={point}
                      className="rounded-2xl border border-blue-100 bg-white/88 px-4 py-4 text-sm font-semibold text-primary shadow-sm"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              <section
                id="contact-form"
                aria-labelledby="contact-form-heading"
                className="rounded-[2rem] border border-blue-100 bg-gradient-to-b from-white to-blue-50/70 p-6 shadow-[0_26px_72px_-44px_rgba(15,23,42,0.42)] sm:p-8"
              >
                <h2 id="contact-form-heading" className="text-2xl font-black text-primary sm:text-3xl">
                  השאירו פרטים ונחזור אליכם
                </h2>
                <p className="mt-3 text-base leading-relaxed text-foreground/72">
                  מלאו את הפרטים, בחרו את סוג השירות, ואנחנו נחזור להמשך התאמה של הפתרון.
                </p>
                <div className="mt-6">
                  <ContactForm key={selectedService ?? "default"} variant="light" defaultService={selectedService ?? undefined} />
                </div>
              </section>
            </div>
          </section>

          <section className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)]">
            <div className="rounded-[2rem] border border-blue-100 bg-white/92 p-6 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.36)] sm:p-8">
              <h2 className="text-3xl font-black tracking-tight text-primary sm:text-4xl">
                רוצים לדבר ישירות?
              </h2>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <a
                    href={ADDRESS_MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary transition hover:underline"
                    aria-label="פתח את כתובת העסק בגוגל מפות"
                  >
                    {ADDRESS}
                  </a>
                </li>
                <li>
                  <a
                    id="cta-call-contact-page"
                    data-track="phone-call"
                    href={`tel:${PHONE_TEL}`}
                    className="flex items-center gap-3 font-medium text-primary transition hover:underline"
                  >
                    <Phone className="h-5 w-5 shrink-0" aria-hidden />
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-3 font-medium text-primary transition hover:underline"
                  >
                    <Mail className="h-5 w-5 shrink-0" aria-hidden />
                    {EMAIL}
                  </a>
                </li>
              </ul>

              <div className="mt-8 rounded-[1.7rem] border border-blue-100 bg-blue-50/55 p-5">
                <h3 className="text-lg font-bold text-primary">קישורים מהירים לשירותים</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {SERVICE_PAGES.map((service) => (
                    <Link
                      key={service.key}
                      href={service.href}
                      className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:border-blue-300 hover:bg-blue-50"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <section className="rounded-[2rem] border border-blue-100 bg-white/92 p-6 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.36)] sm:p-8">
              <h2 className="text-3xl font-black tracking-tight text-primary sm:text-4xl">
                מפת הגעה
              </h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/72">
                אם נוח לכם להגיע אלינו, כאן תוכלו לפתוח את הכתובת במפה ולהגיע ישירות.
              </p>
              <div className="mt-6 overflow-hidden rounded-[1.7rem] border border-blue-100 shadow-sm">
                <iframe
                  title="מפת הגעה – סקיצה אריזות חולון"
                  src={MAP_EMBED}
                  width="100%"
                  height="320"
                  className="border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href={ADDRESS_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-blue-100 py-3 text-center text-sm font-semibold text-blue-800 transition hover:bg-blue-200"
                >
                  פתחו את הכתובת במפה
                </a>
              </div>
            </section>
          </section>

          <FaqSection
            id="contact-faq"
            className="mt-10 sm:mt-12"
            title="שאלות נפוצות לפני שמשאירים פרטים"
            intro="תשובות קצרות לשאלות שעוזרות להבין איך נכון להתחיל את הפנייה."
            items={CONTACT_FAQ_ITEMS}
          />
        </div>
      </main>
    </>
  );
}
