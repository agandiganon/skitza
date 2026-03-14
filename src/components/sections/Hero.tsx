import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpLeft } from 'lucide-react';
import { HeroMarquees } from '@/components/sections/HeroMarquees';
import { BRAND_BLUR_DATA_URL } from '@/lib/media/placeholders';

type HeroGalleryImage = {
  src: string;
  alt: string;
  blurDataUrl: string;
};

type HeroProps = {
  images: readonly HeroGalleryImage[];
};

export function Hero({ images }: HeroProps) {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-3 pt-3 pb-1 sm:px-4 sm:pt-4 sm:pb-3 lg:pt-4 lg:pb-2"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-blue-200/80 via-blue-100 to-blue-50"
        aria-hidden
      />
      <div
        className="from-accent-cyan/10 absolute inset-0 bg-gradient-to-l via-blue-200/20 to-blue-100/10"
        aria-hidden
      />
      <div
        className="hero-grid-overlay absolute inset-0 opacity-[0.03]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[86rem]">
        <HeroMarquees images={images}>
          <HeroCenterContent />
        </HeroMarquees>
      </div>
    </section>
  );
}

function HeroCenterContent() {
  return (
    <div className="relative flex w-full flex-col items-center gap-1 sm:gap-1.5 lg:gap-1.5">
      <div className="hero-logo-shell relative overflow-hidden">
        <Image
          src="/logo.png"
          alt="לוגו סקיצה אריזות"
          width={2560}
          height={1706}
          placeholder="blur"
          blurDataURL={BRAND_BLUR_DATA_URL}
          priority
          loading="eager"
          fetchPriority="high"
          className="h-auto w-[274px] object-contain drop-shadow-[0_10px_22px_rgba(15,23,42,0.14)] sm:w-[300px] lg:w-[390px]"
          sizes="(max-width: 640px) 274px, (max-width: 1024px) 300px, 390px"
        />
        <div
          className="hero-logo-glint pointer-events-none absolute inset-y-[16%] -left-[45%] w-[26%] bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 mix-blend-screen blur-[1px]"
          aria-hidden
        />
        <div
          className="hero-logo-line via-primary/35 pointer-events-none absolute top-[calc(100%+5px)] left-1/2 h-px w-[68%] -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent"
          aria-hidden
        />
      </div>

      <p className="text-primary/90 inline-flex items-center rounded-full border border-white/75 bg-white/70 px-3 py-1 text-[10px] font-bold tracking-[0.15em] shadow-[0_6px_16px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:text-[11px] lg:text-[12px]">
        דפוס סקיצה אריזות
      </p>

      <div className="relative w-full max-w-[332px] overflow-hidden rounded-[1.35rem] border border-white/70 bg-white/66 px-3 py-2 text-center shadow-[0_10px_22px_rgba(15,23,42,0.12)] sm:max-w-[540px] sm:px-5 sm:py-2.5 lg:max-w-[610px] lg:px-6 lg:py-2">
        <h1
          className="hero-heading-package mx-auto max-w-[292px] text-[22px] leading-[0.98] tracking-tight sm:max-w-[430px] sm:text-[30px] lg:max-w-[560px] lg:text-[36px]"
          aria-label="בית דפוס לאריזות קרטון ממותגות לעסקים"
        >
          <svg
            className="hero-cardboard-sketch"
            viewBox="0 0 560 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              className="hero-cardboard-path hero-cardboard-path--delay-0"
              pathLength={1}
              d="M96 130l146-72 221 40-146 72z"
            />
            <path
              className="hero-cardboard-path hero-cardboard-path--delay-1"
              pathLength={1}
              d="M96 130v72l221 40v-72"
            />
            <path
              className="hero-cardboard-path hero-cardboard-path--delay-2"
              pathLength={1}
              d="M317 170l146-72v72l-146 72z"
            />
            <path
              className="hero-cardboard-path hero-cardboard-path--guide hero-cardboard-path--delay-3"
              pathLength={1}
              d="M206 112l221 40M206 112v72M317 170v72M96 130l110 54M463 98l-146 72"
            />
          </svg>
          <span className="hero-heading-line hero-heading-line--top">
            בית דפוס
          </span>
          <span className="hero-heading-line hero-heading-line--tape tape-highlight">
            לאריזות קרטון
          </span>
          <span className="hero-heading-line hero-heading-line--bottom">
            ממותגות לעסקים
          </span>
        </h1>
        <p className="mx-auto mt-1 max-w-[430px] text-[11px] leading-5 font-semibold tracking-[0.01em] text-[#3E5771] sm:text-[12px] sm:leading-[1.55] lg:max-w-[520px] lg:text-[13px] lg:leading-[1.45]">
          תכנון, עיצוב והפקת אריזות קרטון ממותגות לעסקים במקום אחד.
        </p>
        <div
          className="from-accent-cyan to-primary mx-auto mt-1.5 h-0.5 w-12 rounded-full bg-gradient-to-l via-blue-500 sm:w-[4.5rem]"
          aria-hidden
        />
        <div className="mt-2 flex items-center justify-center gap-2 sm:mt-2">
          <Link
            href="/gallery"
            data-track-event="cta_click"
            data-track-placement="hero"
            data-track-label="hero_gallery"
            className="hero-button-readable border-primary/50 text-primary hover:border-primary inline-flex min-h-[36px] items-center justify-center rounded-xl border-2 bg-transparent px-3.5 py-2 text-[13px] font-semibold shadow-sm transition hover:bg-white/80 sm:min-h-[38px] sm:px-5 sm:text-sm lg:min-h-[36px] lg:px-4.5"
          >
            גלריה
          </Link>
          <Link
            href="/contact"
            data-track-event="cta_click"
            data-track-placement="hero"
            data-track-label="hero_contact"
            className="hero-button-readable hero-cta-sweep bg-primary inline-flex min-h-[36px] items-center justify-center gap-1 rounded-xl px-3.5 py-2 text-[13px] font-semibold text-white shadow-[0_10px_22px_rgba(30,58,95,0.32)] transition hover:brightness-110 sm:min-h-[38px] sm:px-5 sm:text-sm lg:min-h-[36px] lg:px-4.5"
          >
            יצירת קשר
            <ArrowUpLeft className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <p className="text-foreground/62 mt-1.5 text-[9px] font-medium sm:text-[10px] lg:text-[10px]">
          למיתוג, ייצור וגימור במקום אחד.
        </p>
      </div>
    </div>
  );
}
