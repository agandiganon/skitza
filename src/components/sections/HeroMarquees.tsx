"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode, DragEvent as ReactDragEvent } from "react";
import Image from "next/image";
import { useStableReducedMotion } from "@/lib/hooks/useStableReducedMotion";
import { useInteractiveMarquee } from "@/lib/hooks/useInteractiveMarquee";

type HeroGalleryImage = {
  src: string;
  alt: string;
};

type HeroMarqueesProps = {
  images: readonly HeroGalleryImage[];
  children: ReactNode;
};

function shuffleImages(images: readonly HeroGalleryImage[]): HeroGalleryImage[] {
  const shuffled = [...images];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

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
  const loopItems = useMemo(() => (reduceMotion ? [...images] : [...images, ...images]), [images, reduceMotion]);
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
                  unoptimized
                  draggable={false}
                  sizes="(max-width: 1279px) 0px, (max-width: 1536px) 220px, 250px"
                  className="object-contain p-1.5 transition-transform duration-500 ease-out group-hover:scale-[1.045]"
                  loading="lazy"
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
  const mobileItems = useMemo(() => [...images], [images]);
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
                  unoptimized
                  draggable={false}
                  sizes="106px"
                  className="object-contain p-1 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
          ))}
        </div>
        {!reduceMotion ? (
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
                    unoptimized
                    draggable={false}
                    sizes="106px"
                    className="object-contain p-1 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function HeroMarquees({ images, children }: HeroMarqueesProps) {
  const reduceMotion = useStableReducedMotion();
  const [shuffledImages, setShuffledImages] = useState<readonly HeroGalleryImage[]>(images);

  useEffect(() => {
    setShuffledImages(shuffleImages(images));
  }, [images]);

  const leftColumnImages = useMemo(
    () => shuffledImages.filter((_, index) => index % 2 === 0),
    [shuffledImages]
  );
  const rightColumnImages = useMemo(
    () => [...shuffledImages.filter((_, index) => index % 2 === 1)].reverse(),
    [shuffledImages]
  );

  return (
    <>
      <div className="hidden items-center gap-6 lg:grid lg:grid-cols-[minmax(220px,1fr)_minmax(560px,1.6fr)_minmax(220px,1fr)]">
        <VerticalMarqueeColumn
          images={leftColumnImages}
          reduceMotion={reduceMotion}
          direction={-1}
          initialOffsetRatio={0.08}
        />
        {children}
        <VerticalMarqueeColumn
          images={rightColumnImages}
          reduceMotion={reduceMotion}
          direction={1}
          initialOffsetRatio={0.56}
        />
      </div>

      <div className="flex flex-col items-center lg:hidden">
        {children}
        <HorizontalMarqueeRow images={shuffledImages} reduceMotion={reduceMotion} />
      </div>
    </>
  );
}
