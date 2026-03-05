import Link from "next/link";
import { ContactFormClient } from "@/components/ui/ContactFormClient";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  ADDRESS,
  ADDRESS_MAP_URL,
  EMAIL,
  SERVICE_PAGES,
} from "@/lib/constants";

const quickLinks = [
  { label: "דף הבית", href: "/" },
  { label: "אודות", href: "/about" },
  { label: "גלריה", href: "/gallery" },
  { label: "צור קשר", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-blue-400/30 bg-gradient-to-b from-primary to-blue-900 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <section aria-labelledby="footer-menu-heading">
            <h2 id="footer-menu-heading" className="mb-4 text-lg font-bold">
              תפריט האתר
            </h2>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-primary-foreground/90 transition hover:text-primary-foreground hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="footer-services-heading">
            <h2 id="footer-services-heading" className="mb-4 text-lg font-bold">
              שירותים
            </h2>
            <ul className="space-y-2">
              {SERVICE_PAGES.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-primary-foreground/90 transition hover:text-primary-foreground hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="footer-policies-heading">
            <h2 id="footer-policies-heading" className="mb-4 text-lg font-bold">
              מדיניות האתר
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-primary-foreground/90 transition hover:text-primary-foreground hover:underline"
                >
                  מדיניות פרטיות
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className="text-sm text-primary-foreground/90 transition hover:text-primary-foreground hover:underline"
                >
                  הצהרת נגישות
                </Link>
              </li>
            </ul>
          </section>
          <section aria-labelledby="footer-contact-heading">
            <h2 id="footer-contact-heading" className="mb-4 text-lg font-bold">
              יצירת קשר
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <a
                  href={ADDRESS_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/90 transition hover:text-primary-foreground hover:underline"
                  aria-label="פתח את כתובת העסק בגוגל מפות"
                >
                  {ADDRESS}
                </a>
              </li>
              <li>
                <a
                  id="cta-call-footer"
                  data-track="phone-call"
                  href={`tel:${PHONE_TEL}`}
                  className="flex items-center gap-2 text-sm text-primary-foreground/90 transition hover:text-primary-foreground hover:underline"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-2 text-sm text-primary-foreground/90 transition hover:text-primary-foreground hover:underline"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden />
                  {EMAIL}
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-12 lg:mt-16 lg:pt-16">
          <h2 className="mb-6 text-xl font-bold">הכי מהיר זה להשאיר פרטים</h2>
          <div className="max-w-xl">
            <ContactFormClient />
          </div>
        </div>
      </div>
    </footer>
  );
}
