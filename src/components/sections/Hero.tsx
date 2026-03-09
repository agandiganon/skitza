import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpLeft } from 'lucide-react';
import { HeroMarquees } from '@/components/sections/HeroMarquees';

type HeroGalleryImage = {
  src: string;
  alt: string;
};

type HeroProps = {
  images: readonly HeroGalleryImage[];
};

export function Hero({ images }: HeroProps) {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-3 pt-0 pb-10 sm:px-4 sm:pt-1 sm:pb-14 lg:pt-2 lg:pb-16"
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

      <div className="relative mx-auto max-w-7xl">
        <HeroMarquees images={images}>
          <HeroCenterContent />
        </HeroMarquees>
      </div>
    </section>
  );
}

function HeroCenterContent() {
  return (
    <div className="relative -mt-4 flex w-full flex-col items-center lg:-mt-12">
      <div className="hero-logo-shell relative -mb-2 overflow-hidden sm:-mb-3 lg:-mb-5">
        <Image
          src="/logo.png"
          alt="לוגו סקיצה אריזות"
          width={2560}
          height={1706}
          priority
          loading="eager"
          fetchPriority="high"
          className="h-auto w-[340px] object-contain drop-shadow-[0_10px_22px_rgba(15,23,42,0.14)] sm:w-[390px] lg:w-[680px]"
          sizes="(max-width: 640px) 340px, (max-width: 1024px) 390px, 680px"
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

      <div className="relative -mt-2 w-full max-w-[325px] overflow-hidden rounded-3xl border border-white/70 bg-white/65 px-3 py-3 text-center shadow-[0_16px_36px_rgba(15,23,42,0.16)] sm:-mt-4 sm:max-w-[560px] sm:px-5 sm:py-4 lg:-mt-7 lg:max-w-[720px] lg:px-7 lg:py-5">
        <h1
          className="hero-heading-package mx-auto max-w-[300px] text-[26px] leading-[1.06] tracking-tight sm:max-w-[460px] sm:text-[40px] lg:max-w-[640px] lg:text-[58px]"
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
        <p className="mt-2 text-[13px] font-semibold tracking-[0.01em] text-[#3E5771] sm:text-base lg:text-[22px]">
          הדפסה בכל כמות ובזמני אספקה מהירים
        </p>
        <div
          className="from-accent-cyan to-primary mx-auto mt-3 h-1 w-28 rounded-full bg-gradient-to-l via-blue-500 sm:w-40"
          aria-hidden
        />
        <div className="mt-4 flex items-center justify-center gap-2.5 sm:mt-5">
          <Link
            href="/gallery"
            data-track-event="cta_click"
            data-track-placement="hero"
            data-track-label="hero_gallery"
            className="hero-button-readable border-primary/50 text-primary hover:border-primary inline-flex min-h-[42px] items-center justify-center rounded-xl border-2 bg-transparent px-4 py-2 text-sm font-semibold shadow-sm transition hover:bg-white/80 sm:min-h-[46px] sm:px-6 sm:text-base"
          >
            גלריה
          </Link>
          <Link
            href="/contact"
            data-track-event="cta_click"
            data-track-placement="hero"
            data-track-label="hero_contact"
            className="hero-button-readable hero-cta-sweep bg-primary inline-flex min-h-[42px] items-center justify-center gap-1 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(30,58,95,0.35)] transition hover:brightness-110 sm:min-h-[46px] sm:px-6 sm:text-base"
          >
            יצירת קשר
            <ArrowUpLeft className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
