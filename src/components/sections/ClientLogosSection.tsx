import Link from 'next/link';
import Image from 'next/image';
import { CLIENT_LOGOS } from '@/lib/content/clientLogos';

const trustStatements = [
  'עבודה מול מותגים, קמעונאות ומוצרי צריכה',
  'שילוב בין תכנון, עיצוב, הדמיה והפקה',
  'מעבר מסודר מרעיון לפרויקט ביצוע',
] as const;

export function ClientLogosSection() {
  return (
    <section
      id="partners"
      aria-labelledby="home-partners-heading"
      dir="rtl"
      className="cv-auto partners-showcase-section px-4 py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="partners-showcase-shell overflow-hidden rounded-[2rem] border border-white/70 bg-white/78 px-4 py-5 shadow-[0_28px_80px_-54px_rgba(15,23,42,0.42)] backdrop-blur-xl sm:px-6 sm:py-7 lg:px-10 lg:py-10">
          <div className="relative z-[1] grid gap-8 lg:grid-cols-[minmax(250px,0.9fr)_minmax(0,1.85fr)] lg:items-center lg:gap-10">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-right">
              <p className="mb-3 text-[0.7rem] font-black tracking-[0.32em] text-sky-800/90 uppercase sm:text-xs">
                מותגים שעובדים איתנו
              </p>
              <h2
                id="home-partners-heading"
                className="text-primary text-3xl leading-tight font-black tracking-tight sm:text-[2.35rem] lg:text-[3rem]"
              >
                חברות שבוחרות לעבוד עם סקיצה
              </h2>
              <p className="text-foreground/86 mt-4 text-sm leading-7 sm:text-[0.98rem]">
                ממותגי קוסמטיקה וקמעונאות ועד גופים מובילים, לקוחות בוחרים בנו
                לפתרונות אריזה, דפוס ומיתוג שמבוצעים ברמה מדויקת ועקבית.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2.5 lg:justify-start">
                {trustStatements.map((statement) => (
                  <span
                    key={statement}
                    className="text-primary rounded-full border border-blue-100 bg-blue-50/75 px-4 py-2 text-sm font-semibold"
                  >
                    {statement}
                  </span>
                ))}
              </div>
              <Link
                href="/gallery"
                data-track-event="cta_click"
                data-track-placement="home_partners"
                data-track-label="home_partners_gallery"
                className="text-primary mt-5 inline-flex text-sm font-semibold underline underline-offset-4 transition hover:no-underline"
              >
                לצפייה בעבודות מהגלריה
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-5">
              {CLIENT_LOGOS.map((logo) => (
                <div
                  key={logo.id}
                  className="partners-logo-card group flex h-[88px] items-center justify-center overflow-hidden rounded-[1.45rem] border border-slate-200/75 bg-white/94 px-4 py-3 sm:h-[94px] sm:px-5 lg:h-[102px]"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      sizes="(max-width: 640px) 42vw, (max-width: 1024px) 28vw, (max-width: 1440px) 17vw, 13vw"
                      className="partners-logo-mark object-contain"
                      loading="lazy"
                      decoding="async"
                      quality={75}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
