"use client";

import { useMemo } from "react";
import type { DragEvent as ReactDragEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/content/projects";
import { useStableReducedMotion } from "@/lib/hooks/useStableReducedMotion";
import { useInteractiveMarquee } from "@/lib/hooks/useInteractiveMarquee";

type HeroGalleryImage = {
  src: string;
  alt: string;
};

function preventNativeDrag(event: ReactDragEvent<HTMLElement>) {
  event.preventDefault();
}

type VerticalMarqueeColumnProps = {
  images: readonly HeroGalleryImage[];
  reduceMotion: boolean;
  direction: 1 | -1;
  initialOffsetRatio: number;
};

function VerticalMarqueeColumn({
  images,
  reduceMotion,
  direction,
  initialOffsetRatio,
}: VerticalMarqueeColumnProps) {
  const loopItems = useMemo(() => [...images, ...images], [images]);
  const { containerRef, trackRef, bind } = useInteractiveMarquee({
    axis: "y",
    direction,
    speedPxPerSec: 20,
    pauseAfterInteractionMs: 1500,
    startDelayMs: 260,
    enabled: !reduceMotion,
    initialOffsetRatio,
  });

  return (
    <aside
      ref={containerRef}
      {...bind}
      className="hero-marquee hero-marquee--vertical relative hidden h-[620px] overflow-hidden lg:block"
      aria-label="גלריית פרויקטים מתחלפת"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-blue-100/95 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-blue-100/95 to-transparent" />

      <div ref={trackRef} className="hero-marquee-track flex flex-col items-center gap-3 pb-3">
        {loopItems.map((image, index) => {
          const isClone = index >= images.length;
          return (
            <article
              key={`${image.src}-${index}`}
              aria-hidden={isClone}
              onDragStart={preventNativeDrag}
              className="hero-marquee-card group relative aspect-square w-full max-w-[230px] overflow-hidden rounded-3xl border border-white/85 bg-white/75 p-1 shadow-[0_14px_28px_rgba(15,23,42,0.16)] backdrop-blur-sm"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[1.15rem] border border-blue-100/60 bg-slate-50/80">
                <Image
                  src={image.src}
                  alt={isClone ? "" : image.alt}
                  fill
                  draggable={false}
                  sizes="(max-width: 1279px) 0px, (max-width: 1536px) 220px, 250px"
                  className="object-contain p-1.5 transition-transform duration-500 ease-out group-hover:scale-[1.045]"
                  quality={66}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
            </article>
          );
        })}
      </div>
    </aside>
  );
}

type HorizontalMarqueeRowProps = {
  images: readonly HeroGalleryImage[];
  reduceMotion: boolean;
};

function HorizontalMarqueeRow({ images, reduceMotion }: HorizontalMarqueeRowProps) {
  const mobileItems = useMemo(() => images, [images]);
  const { containerRef, trackRef, bind } = useInteractiveMarquee({
    axis: "x",
    direction: 1,
    speedPxPerSec: 28,
    pauseAfterInteractionMs: 1500,
    startDelayMs: 260,
    enabled: !reduceMotion,
    initialOffsetRatio: 0.28,
  });

  return (
    <div
      ref={containerRef}
      {...bind}
      className="hero-marquee hero-marquee--horizontal relative mt-4 overflow-hidden rounded-3xl border border-blue-200/80 bg-white/45 p-2 backdrop-blur-sm lg:hidden"
      aria-label="גלריית פרויקטים מתחלפת"
    >
      <div ref={trackRef} className="hero-marquee-track flex w-max items-stretch pb-1">
        <div className="hero-mobile-marquee-group">
          {mobileItems.map((image, index) => (
            <article
              key={`group-a-${image.src}-${index}`}
              onDragStart={preventNativeDrag}
              className="hero-marquee-card group relative h-[106px] w-[106px] shrink-0 overflow-hidden rounded-2xl border border-white/85 bg-white/85 p-1 shadow-[0_10px_22px_rgba(15,23,42,0.15)]"
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl border border-blue-100/60 bg-slate-50/80">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  draggable={false}
                  sizes="106px"
                  className="object-contain p-1 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  quality={62}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
            </article>
          ))}
        </div>
        <div className="hero-mobile-marquee-group" data-clone="true" aria-hidden>
          {mobileItems.map((image, index) => (
            <article
              key={`group-b-${image.src}-${index}`}
              onDragStart={preventNativeDrag}
              className="hero-marquee-card group relative h-[106px] w-[106px] shrink-0 overflow-hidden rounded-2xl border border-white/85 bg-white/85 p-1 shadow-[0_10px_22px_rgba(15,23,42,0.15)]"
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl border border-blue-100/60 bg-slate-50/80">
                <Image
                  src={image.src}
                  alt=""
                  fill
                  draggable={false}
                  sizes="106px"
                  className="object-contain p-1 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  quality={62}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const reduceMotion = useStableReducedMotion();
  const heroImages = useMemo(
    () => PROJECTS.map((project) => ({ src: project.imageSrc, alt: project.imageAlt })),
    []
  );
  const reversedHeroImages = useMemo(() => [...heroImages].reverse(), [heroImages]);

  return (
    <section
      id="home"
      className="relative overflow-hidden px-3 pb-10 pt-0 sm:px-4 sm:pb-14 sm:pt-1 lg:pb-16 lg:pt-2"
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-blue-200/80 via-blue-100 to-blue-50"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-l from-accent-cyan/10 via-blue-200/20 to-blue-100/10"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%231d4ed8' d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="hidden items-center gap-6 lg:grid lg:grid-cols-[minmax(220px,1fr)_minmax(560px,1.6fr)_minmax(220px,1fr)]">
          <VerticalMarqueeColumn
            images={heroImages}
            reduceMotion={reduceMotion}
            direction={-1}
            initialOffsetRatio={0.08}
          />
          <HeroCenterContent reduceMotion={reduceMotion} />
          <VerticalMarqueeColumn
            images={reversedHeroImages}
            reduceMotion={reduceMotion}
            direction={1}
            initialOffsetRatio={0.56}
          />
        </div>

        <div className="flex flex-col items-center lg:hidden">
          <HeroCenterContent reduceMotion={reduceMotion} isMobile />
          <HorizontalMarqueeRow images={heroImages} reduceMotion={reduceMotion} />
        </div>
      </div>
    </section>
  );
}

type HeroCenterContentProps = {
  reduceMotion: boolean;
  isMobile?: boolean;
};

function HeroCenterContent({ reduceMotion, isMobile = false }: HeroCenterContentProps) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.99 }}
      animate={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.72, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col items-center ${isMobile ? "w-full -mt-4" : "-mt-12"}`}
    >
      <motion.div
        className="relative -mb-2 overflow-hidden sm:-mb-3 lg:-mb-5"
        initial={false}
        animate={reduceMotion ? {} : { y: [0, -2.5, 0], rotate: [0, 0.08, 0], scale: [1, 1.004, 1] }}
        transition={{
          duration: reduceMotion ? 0 : 9.2,
          repeat: reduceMotion ? 0 : Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/logo.png"
          alt="לוגו סקיצה אריזות"
          width={2560}
          height={1706}
          className="h-auto w-[340px] object-contain drop-shadow-[0_10px_22px_rgba(15,23,42,0.14)] sm:w-[390px] lg:w-[680px]"
          sizes="(max-width: 640px) 340px, (max-width: 1024px) 390px, 680px"
          priority
        />
        <motion.div
          className="pointer-events-none absolute inset-y-[16%] -left-[45%] w-[26%] bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 mix-blend-screen blur-[1px]"
          initial={{ x: "0%", opacity: 0 }}
          animate={reduceMotion ? { opacity: 0 } : { x: ["0%", "390%"], opacity: [0, 0.2, 0] }}
          transition={{
            duration: reduceMotion ? 0 : 8.8,
            delay: reduceMotion ? 0 : 1.1,
            repeat: reduceMotion ? 0 : Infinity,
            repeatDelay: reduceMotion ? 0 : 3.2,
            ease: "easeInOut",
          }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-[calc(100%+5px)] h-px w-[68%] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/35 to-transparent"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? {} : { opacity: [0.18, 0.3, 0.18] }}
          transition={{ duration: reduceMotion ? 0 : 7.2, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
          aria-hidden
        />
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.74, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        className="relative -mt-2 w-full max-w-[325px] overflow-hidden rounded-3xl border border-white/70 bg-white/65 px-3 py-3 text-center shadow-[0_16px_36px_rgba(15,23,42,0.16)] sm:-mt-4 sm:max-w-[560px] sm:px-5 sm:py-4 lg:-mt-7 lg:max-w-[720px] lg:px-7 lg:py-5"
      >
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
          <span className="hero-heading-line hero-heading-line--top">בית דפוס</span>
          <span className="hero-heading-line hero-heading-line--tape tape-highlight">לאריזות קרטון</span>
          <span className="hero-heading-line hero-heading-line--bottom">ממותגות לעסקים</span>
        </h1>
        <p className="mt-2 text-[13px] font-semibold tracking-[0.01em] text-[#3E5771] sm:text-base lg:text-[22px]">
          הדפסה בכל כמות ובזמני אספקה מהירים
        </p>
        <div
          className="mx-auto mt-3 h-1 w-28 rounded-full bg-gradient-to-l from-accent-cyan via-blue-500 to-primary sm:w-40"
          aria-hidden
        />
        <div className="mt-4 flex items-center justify-center gap-2.5 sm:mt-5">
          <Link
            href="/gallery"
            className="hero-button-readable inline-flex min-h-[42px] items-center justify-center rounded-xl border-2 border-primary/50 bg-transparent px-4 py-2 text-sm font-semibold text-primary shadow-sm transition hover:border-primary hover:bg-white/80 sm:min-h-[46px] sm:px-6 sm:text-base"
          >
            גלריה
          </Link>
          <Link
            href="/contact"
            className="hero-button-readable hero-cta-sweep inline-flex min-h-[42px] items-center justify-center gap-1 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(30,58,95,0.35)] transition hover:brightness-110 sm:min-h-[46px] sm:px-6 sm:text-base"
          >
            יצירת קשר
            <ArrowUpLeft className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
