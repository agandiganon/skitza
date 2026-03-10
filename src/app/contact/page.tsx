import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { ContactForm } from '@/components/ui/ContactForm';
import {
  ADDRESS,
  ADDRESS_MAP_URL,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_CONTACT_URL,
  getContactServiceKeyFromQuery,
  getContactServiceLabelByKey,
} from '@/lib/constants';
import {
  buildBreadcrumbSchema,
  buildContactPageSchema,
} from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'צור קשר',
  description:
    'אפשר להשאיר פרטים, להתקשר או לשלוח הודעה בוואטסאפ לבית הדפוס סקיצה אריזות בחולון.',
  keywords: ['צור קשר בית דפוס בחולון', 'הדפסת אריזות', 'בית דפוס לאריזות'],
  alternates: {
    canonical: '/contact',
    languages: {
      'he-IL': '/contact',
    },
  },
  openGraph: {
    title: 'צור קשר - סקיצה אריזות',
    description:
      'אפשר להשאיר פרטים, להתקשר או לשלוח הודעה בוואטסאפ לבית הדפוס סקיצה אריזות בחולון.',
    url: '/contact',
    locale: 'he_IL',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'סקיצה אריזות - בית דפוס לאריזות בחולון',
      },
    ],
  },
};

type ContactPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getQueryServiceKey(rawService: string | string[] | undefined) {
  if (Array.isArray(rawService)) {
    return getContactServiceKeyFromQuery(rawService[0]);
  }

  return getContactServiceKeyFromQuery(rawService);
}

const contactCards = [
  {
    label: 'טלפון',
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_TEL}`,
    icon: Phone,
    trackEvent: 'click_to_call',
    trackLabel: 'contact_page_phone',
    tone: 'blue',
  },
  {
    label: 'וואטסאפ',
    value: 'שליחת הודעה ישירה',
    href: WHATSAPP_CONTACT_URL,
    icon: MessageCircle,
    trackEvent: 'whatsapp_click',
    trackLabel: 'contact_page_whatsapp',
    tone: 'green',
  },
  {
    label: 'דוא"ל',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: Mail,
    trackEvent: 'contact_click',
    trackLabel: 'contact_page_email',
    tone: 'blue',
  },
] as const;

function cardToneClasses(tone: 'blue' | 'green') {
  if (tone === 'green') {
    return {
      shell:
        'border-emerald-200/80 bg-[linear-gradient(180deg,_rgba(240,253,244,0.98),_rgba(220,252,231,0.8))] text-emerald-950 shadow-[0_24px_54px_-42px_rgba(22,163,74,0.5)]',
      icon: 'bg-emerald-500 text-white ring-4 ring-emerald-100',
      label: 'text-emerald-700/90',
      value: 'text-emerald-950',
    };
  }

  return {
    shell:
      'border-blue-100 bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(239,246,255,0.82))] text-primary shadow-[0_22px_50px_-40px_rgba(30,64,175,0.35)]',
    icon: 'bg-gradient-to-l from-accent-cyan via-blue-500 to-primary text-white ring-4 ring-blue-100',
    label: 'text-blue-700/80',
    value: 'text-primary',
  };
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedSearchParams = (
    searchParams ? await searchParams : {}
  ) as Record<string, string | string[] | undefined>;
  const selectedServiceKey = getQueryServiceKey(resolvedSearchParams.service);
  const selectedService = getContactServiceLabelByKey(selectedServiceKey);

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { label: 'דף הבית', href: '/' },
            { label: 'צור קשר', href: '/contact' },
          ]),
          buildContactPageSchema({
            description:
              'דף יצירת קשר קצר להשארת פרטים, שיחת טלפון או הודעת וואטסאפ מול סקיצה אריזות.',
          }),
        ]}
      />
      <main className="min-h-screen bg-[linear-gradient(180deg,_rgba(247,250,255,0.94),_rgba(255,255,255,1)_32%,_rgba(243,248,255,0.9)_100%)] px-4 pt-6 pb-16 sm:pt-8 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            items={[{ label: 'דף הבית', href: '/' }, { label: 'צור קשר' }]}
          />

          <section className="cv-auto overflow-hidden rounded-[2.2rem] border border-white/80 bg-white/90 p-5 shadow-[0_26px_80px_-56px_rgba(15,23,42,0.22)] backdrop-blur-xl sm:p-7 lg:p-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-start">
              <div className="relative overflow-hidden rounded-[1.9rem] border border-blue-100/70 bg-[linear-gradient(180deg,_rgba(248,251,255,0.98),_rgba(240,247,255,0.82))] p-6 shadow-[0_20px_56px_-42px_rgba(15,23,42,0.18)] sm:p-7">
                <div
                  className="pointer-events-none absolute top-10 -left-10 h-32 w-32 rounded-full bg-cyan-300/20 blur-3xl"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -right-8 bottom-0 h-40 w-40 rounded-full bg-blue-300/18 blur-3xl"
                  aria-hidden
                />
                <div className="relative">
                  <p className="text-sm font-black tracking-[0.28em] text-blue-700/90 uppercase">
                    צור קשר
                  </p>
                  <h1 className="text-primary mt-4 max-w-xl text-4xl font-black tracking-tight sm:text-5xl">
                    דברו איתנו בדרך שנוחה לכם
                  </h1>
                  <p className="text-foreground/88 mt-5 max-w-2xl text-lg leading-relaxed sm:text-xl">
                    אפשר להשאיר פרטים, להתקשר או לשלוח הודעה בוואטסאפ. אם נוח
                    לכם, מלאו את הטופס הקצר ונחזור אליכם להמשך תיאום מסודר.
                  </p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {contactCards.map((card) => {
                      const Icon = card.icon;
                      const tone = cardToneClasses(card.tone);
                      const external = card.href.startsWith('https://');

                      return (
                        <a
                          key={card.label}
                          href={card.href}
                          target={external ? '_blank' : undefined}
                          rel={external ? 'noopener noreferrer' : undefined}
                          data-track-event={card.trackEvent}
                          data-track-placement="contact_page"
                          data-track-label={card.trackLabel}
                          className={`group rounded-[1.5rem] border p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_56px_-40px_rgba(15,23,42,0.34)] active:translate-y-0 active:scale-[0.99] active:shadow-[0_18px_42px_-34px_rgba(15,23,42,0.28)] ${tone.shell}`}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm transition duration-300 group-hover:scale-[1.04] ${tone.icon}`}
                            >
                              <Icon className="h-5 w-5" aria-hidden />
                            </span>
                            <span>
                              <span
                                className={`block text-xs font-black tracking-[0.18em] uppercase ${tone.label}`}
                              >
                                {card.label}
                              </span>
                              {card.label === 'טלפון' ? (
                                <span
                                  dir="ltr"
                                  className={`mt-1 block text-base font-black sm:text-lg ${tone.value}`}
                                >
                                  {card.value}
                                </span>
                              ) : (
                                <span
                                  className={`mt-1 block text-base font-black sm:text-lg ${tone.value}`}
                                >
                                  {card.value}
                                </span>
                              )}
                            </span>
                          </span>
                        </a>
                      );
                    })}
                  </div>

                  <div className="mt-6 rounded-[1.35rem] border border-blue-100/75 bg-white/84 px-4 py-4 shadow-[0_12px_30px_-28px_rgba(15,23,42,0.18)]">
                    <div className="flex items-start gap-3">
                      <span className="text-primary inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100">
                        <MapPin className="h-5 w-5" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-black tracking-[0.2em] text-blue-700/90 uppercase">
                          כתובת
                        </p>
                        <a
                          href={ADDRESS_MAP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-track-event="contact_click"
                          data-track-placement="contact_page"
                          data-track-label="contact_page_map"
                          className="text-primary mt-1 inline-flex items-center gap-2 text-base font-semibold transition hover:text-blue-700 hover:underline active:scale-[0.99] active:text-blue-800"
                        >
                          {ADDRESS}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <section
                id="contact-form"
                aria-labelledby="contact-form-heading"
                className="rounded-[1.9rem] border border-blue-100/75 bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(244,249,255,0.86))] p-6 shadow-[0_20px_56px_-42px_rgba(15,23,42,0.18)] sm:p-7"
              >
                <p className="text-sm font-black tracking-[0.24em] text-blue-700/90 uppercase">
                  טופס קצר
                </p>
                <h2
                  id="contact-form-heading"
                  className="text-primary mt-3 text-3xl font-black tracking-tight"
                >
                  השאירו פרטים
                </h2>
                <p className="text-foreground/82 mt-3 text-base leading-relaxed">
                  מלאו שם, טלפון, דוא&quot;ל וסוג פנייה, ונחזור אליכם להמשך
                  תיאום.
                </p>
                <div className="mt-6">
                  <ContactForm
                    key={selectedServiceKey ?? 'default'}
                    variant="light"
                    defaultService={selectedService ?? undefined}
                  />
                </div>
                <p className="text-foreground/78 mt-5 text-sm leading-relaxed">
                  מעדיפים לעבור קודם על העבודות?{' '}
                  <Link
                    href="/gallery"
                    data-track-event="cta_click"
                    data-track-placement="contact_page"
                    data-track-label="contact_page_gallery"
                    className="text-primary font-semibold underline underline-offset-4 transition hover:text-blue-700 hover:no-underline active:scale-[0.99] active:text-blue-800"
                  >
                    עברו לגלריה
                  </Link>
                  .
                </p>
              </section>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
