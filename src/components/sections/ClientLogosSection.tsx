import Image from "next/image";
import { CLIENT_LOGOS } from "@/lib/content/clientLogos";

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
              <p className="mb-3 text-[0.7rem] font-black uppercase tracking-[0.32em] text-sky-800/70 sm:text-xs">
                מותגים שעובדים איתנו
              </p>
              <h2
                id="home-partners-heading"
                className="text-3xl font-black leading-tight tracking-tight text-primary sm:text-[2.35rem] lg:text-[3rem]"
              >
                חברות שבוחרות לעבוד עם סקיצה
              </h2>
              <p className="mt-4 text-sm leading-7 text-foreground/72 sm:text-[0.98rem]">
                ממותגי קוסמטיקה וקמעונאות ועד גופים מובילים, לקוחות בוחרים בנו לפתרונות אריזה,
                דפוס ומיתוג שמבוצעים ברמה מדויקת ועקבית.
              </p>
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
