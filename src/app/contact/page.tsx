import type { Metadata } from "next";
import { ContactFormClient } from "@/components/ui/ContactFormClient";
import { MapPin, Phone, Mail } from "lucide-react";
import { ADDRESS, ADDRESS_MAP_URL, EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/constants";

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
    description:
      "השאירו פרטים ונחזור אליכם במהירות עם פתרון אריזה מותאם לעסק.",
    url: "/contact",
    locale: "he_IL",
    type: "website",
  },
};

const CONTACT_LEAD =
  "יש לכם פרויקט חדש? צוות סקיצה מלווה עסקים בתכנון אריזות, הדמיות והפקות דפוס עם פתרונות מותאמים אישית.";
// OpenStreetMap embed for Holon area – center near המעיין 4
const MAP_EMBED =
  "https://www.openstreetmap.org/export/embed.html?bbox=34.768%2C32.008%2C34.792%2C32.022&layer=mapnik&marker=32.015%2C34.78";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="px-4 pt-6 pb-16 sm:pt-8 sm:pb-20">
        <h1 className="mb-8 text-center text-3xl font-bold text-primary sm:text-4xl">
          צור קשר
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-center text-foreground/80">
          {CONTACT_LEAD}
        </p>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <section aria-labelledby="contact-form-heading">
              <h2 id="contact-form-heading" className="mb-6 text-2xl font-bold text-primary">
                השאר פרטים
              </h2>
              <div className="rounded-2xl border-2 border-blue-100 bg-white p-6 shadow-lg ring-1 ring-blue-50 sm:p-8">
                <ContactFormClient variant="light" />
              </div>
            </section>
            <section aria-labelledby="contact-details-heading">
              <h2 id="contact-details-heading" className="mb-6 text-2xl font-bold text-primary">
                פרטי התקשרות
              </h2>
              <ul className="mb-10 space-y-4">
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
              <h3 className="mb-3 text-lg font-bold text-primary">מפת הגעה</h3>
              <div className="overflow-hidden rounded-xl border-2 border-blue-200 shadow-lg">
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
                  className="block bg-blue-100 py-2 text-center text-sm font-medium text-blue-800 transition hover:bg-blue-200"
                >
                  פתח ב-Google Maps
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
