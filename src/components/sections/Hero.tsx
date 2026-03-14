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
      className="relative h-[calc(100svh-3.75rem-var(--mobile-sticky-bar-height))] overflow-hidden px-3 pt-2 pb-2 sm:h-[calc(100svh-3.85rem-var(--mobile-sticky-bar-height))] sm:px-4 sm:pt-2.5 sm:pb-2.5 md:h-[calc(100svh-3.9rem)] lg:h-[calc(100svh-3.95rem)] lg:px-6 lg:pt-3 lg:pb-3"
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

      <div className="relative mx-auto h-full max-w-[92rem]">
        <HeroMarquees images={images}>
          <HeroCenterContent />
        </HeroMarquees>
      </div>
    </section>
  );
}

function HeroCenterContent() {
  return (
    <div className="relative flex h-full min-h-0 w-full flex-col items-center justify-between py-[clamp(0.25rem,1vh,0.85rem)] text-center">
      <div className="flex flex-col items-center gap-[clamp(0.35rem,1vh,0.85rem)]">
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
            className="h-auto w-[clamp(11rem,26vw,24.5rem)] object-contain drop-shadow-[0_10px_22px_rgba(15,23,42,0.14)]"
            sizes="(max-width: 420px) 192px, (max-width: 768px) 248px, (max-width: 1280px) 320px, 392px"
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

        <p className="text-primary/90 inline-flex items-center rounded-full border border-white/75 bg-white/70 px-[clamp(0.7rem,1.8vw,1rem)] py-[clamp(0.22rem,0.7vw,0.38rem)] text-[clamp(0.58rem,0.95vw,0.82rem)] font-bold tracking-[0.16em] shadow-[0_6px_16px_rgba(15,23,42,0.08)] backdrop-blur-sm">
          דפוס סקיצה אריזות
        </p>
      </div>

      <div className="relative w-full max-w-[clamp(15rem,44vw,38rem)] overflow-hidden rounded-[1.35rem] border border-white/70 bg-white/66 px-[clamp(0.8rem,2vw,1.6rem)] py-[clamp(0.72rem,1.55vh,1.3rem)] text-center shadow-[0_10px_22px_rgba(15,23,42,0.12)]">
        <h1
          className="hero-heading-package mx-auto max-w-[clamp(13rem,34vw,35rem)] text-[clamp(1.5rem,4vw,3.35rem)] leading-[0.98] tracking-tight"
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
        <p className="mx-auto mt-[clamp(0.25rem,0.8vh,0.65rem)] max-w-[clamp(12rem,32vw,31rem)] text-[clamp(0.64rem,1.05vw,0.98rem)] leading-[1.4] font-semibold tracking-[0.01em] text-[#3E5771]">
          תכנון, עיצוב והפקת אריזות קרטון ממותגות לעסקים במקום אחד.
        </p>
        <div
          className="from-accent-cyan to-primary mx-auto mt-[clamp(0.35rem,0.9vh,0.65rem)] h-0.5 w-[clamp(2.8rem,5vw,4.5rem)] rounded-full bg-gradient-to-l via-blue-500"
          aria-hidden
        />
        <div className="mt-[clamp(0.45rem,1.2vh,0.95rem)] flex flex-wrap items-center justify-center gap-[clamp(0.4rem,1vw,0.75rem)]">
          <Link
            href="/gallery"
            data-track-event="cta_click"
            data-track-placement="hero"
            data-track-label="hero_gallery"
            className="hero-button-readable border-primary/50 text-primary hover:border-primary inline-flex min-h-[clamp(2.2rem,4.8vh,2.75rem)] items-center justify-center rounded-xl border-2 bg-transparent px-[clamp(0.85rem,2vw,1.35rem)] py-[clamp(0.42rem,1.05vh,0.7rem)] text-[clamp(0.72rem,1vw,0.96rem)] font-semibold shadow-sm transition hover:bg-white/80"
          >
            גלריה
          </Link>
          <Link
            href="/contact"
            data-track-event="cta_click"
            data-track-placement="hero"
            data-track-label="hero_contact"
            className="hero-button-readable hero-cta-sweep bg-primary inline-flex min-h-[clamp(2.2rem,4.8vh,2.75rem)] items-center justify-center gap-1 rounded-xl px-[clamp(0.85rem,2vw,1.35rem)] py-[clamp(0.42rem,1.05vh,0.7rem)] text-[clamp(0.72rem,1vw,0.96rem)] font-semibold text-white shadow-[0_10px_22px_rgba(30,58,95,0.32)] transition hover:brightness-110"
          >
            יצירת קשר
            <ArrowUpLeft className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <p className="text-foreground/62 mt-[clamp(0.45rem,1.1vh,0.7rem)] text-[clamp(0.56rem,0.82vw,0.72rem)] font-medium">
          למיתוג, ייצור וגימור במקום אחד.
        </p>
      </div>
    </div>
  );
}
