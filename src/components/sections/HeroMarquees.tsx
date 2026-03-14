'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ReactNode, DragEvent as ReactDragEvent } from 'react';
import Image from 'next/image';
import { useStableReducedMotion } from '@/lib/hooks/useStableReducedMotion';
import { useInteractiveMarquee } from '@/lib/hooks/useInteractiveMarquee';

type HeroGalleryImage = {
  src: string;
  alt: string;
  blurDataUrl: string;
};

type HeroMarqueesProps = {
  images: readonly HeroGalleryImage[];
  children: ReactNode;
};

const INITIAL_HERO_IMAGE_COUNT = 10;

function buildImageSeed(images: readonly HeroGalleryImage[]) {
  const source = images.map((image) => image.src).join('|');
  let seed = 2166136261;

  for (let index = 0; index < source.length; index += 1) {
    seed ^= source.charCodeAt(index);
    seed = Math.imul(seed, 16777619);
  }

  return seed >>> 0;
}

function shuffleImages(
  images: readonly HeroGalleryImage[],
  seed: number,
): HeroGalleryImage[] {
  const shuffled = [...images];
  let randomSeed = seed || 1;

  const nextRandom = () => {
    randomSeed = (Math.imul(randomSeed, 1664525) + 1013904223) >>> 0;
    return randomSeed / 4294967296;
  };

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(nextRandom() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
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
  const loopItems = useMemo(
    () => (reduceMotion ? [...images] : [...images, ...images]),
    [images, reduceMotion],
  );
  const { containerRef, trackRef, bind } = useInteractiveMarquee({
    axis: 'y',
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
      className="hero-marquee hero-marquee--vertical relative hidden h-[458px] overflow-hidden lg:block xl:h-[468px]"
      aria-label="גלריית פרויקטים מתחלפת"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-blue-100/95 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-blue-100/95 to-transparent" />

      <div
        ref={trackRef}
        className="hero-marquee-track flex flex-col items-center gap-3 pb-3"
      >
        {loopItems.map((image, index) => {
          const isClone = index >= images.length;
          return (
            <article
              key={`${image.src}-${index}`}
              aria-hidden={isClone}
              onDragStart={preventNativeDrag}
              className="hero-marquee-card group relative aspect-square w-full max-w-[186px] overflow-hidden rounded-[1.45rem] border border-white/85 bg-white/75 p-1 shadow-[0_12px_24px_rgba(15,23,42,0.15)] backdrop-blur-sm"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[1.15rem] border border-blue-100/60 bg-slate-50/80">
                <Image
                  src={image.src}
                  alt={isClone ? '' : image.alt}
                  width={384}
                  height={384}
                  placeholder="blur"
                  blurDataURL={image.blurDataUrl}
                  draggable={false}
                  sizes="(max-width: 1279px) 0px, (max-width: 1536px) 220px, 250px"
                  className="h-full w-full object-contain p-1.5 transition-transform duration-500 ease-out group-hover:scale-[1.045]"
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

function HorizontalMarqueeRow({
  images,
  reduceMotion,
}: HorizontalMarqueeRowProps) {
  const mobileItems = useMemo(() => [...images], [images]);

  return (
    <div
      dir="ltr"
      className="hero-marquee hero-marquee--horizontal relative mt-1 overflow-hidden rounded-[1.3rem] border border-blue-200/80 bg-white/45 px-0.5 py-0.5 backdrop-blur-sm lg:hidden"
      aria-label="גלריית פרויקטים מתחלפת"
    >
      <div
        className={`hero-marquee-track hero-mobile-marquee-track inline-flex items-stretch ${reduceMotion ? 'hero-mobile-marquee-track--static' : ''}`}
      >
        <div className="hero-mobile-marquee-group">
          {mobileItems.map((image, index) => (
            <article
              key={`group-a-${image.src}-${index}`}
              onDragStart={preventNativeDrag}
              className="hero-marquee-card group relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-[1rem] border border-white/85 bg-white/85 p-1 shadow-[0_8px_18px_rgba(15,23,42,0.14)]"
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl border border-blue-100/60 bg-slate-50/80">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={384}
                  height={384}
                  placeholder="blur"
                  blurDataURL={image.blurDataUrl}
                  draggable={false}
                  sizes="106px"
                  className="h-full w-full object-contain p-1 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
          ))}
        </div>
        {!reduceMotion ? (
          <div
            className="hero-mobile-marquee-group"
            data-clone="true"
            aria-hidden
          >
            {mobileItems.map((image, index) => (
              <article
                key={`group-b-${image.src}-${index}`}
                onDragStart={preventNativeDrag}
                className="hero-marquee-card group relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-[1rem] border border-white/85 bg-white/85 p-1 shadow-[0_8px_18px_rgba(15,23,42,0.14)]"
              >
                <div className="relative h-full w-full overflow-hidden rounded-xl border border-blue-100/60 bg-slate-50/80">
                  <Image
                    src={image.src}
                    alt=""
                    width={384}
                    height={384}
                    placeholder="blur"
                    blurDataURL={image.blurDataUrl}
                    draggable={false}
                    sizes="106px"
                    className="h-full w-full object-contain p-1 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
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
  const [showAllImages, setShowAllImages] = useState(false);
  const shuffledImages = useMemo(() => {
    return shuffleImages(images, buildImageSeed(images));
  }, [images]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let idleId: number | null = null;

    const revealAllImages = () => {
      setShowAllImages(true);
    };

    if (typeof window === 'undefined') {
      return;
    }

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(revealAllImages, { timeout: 1400 });
    } else {
      timeoutId = setTimeout(revealAllImages, 1100);
    }

    return () => {
      if (idleId !== null && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [images]);
  const displayImages = useMemo(() => {
    if (showAllImages || shuffledImages.length <= INITIAL_HERO_IMAGE_COUNT) {
      return shuffledImages;
    }

    return shuffledImages.slice(0, INITIAL_HERO_IMAGE_COUNT);
  }, [showAllImages, shuffledImages]);

  const leftColumnImages = useMemo(
    () => displayImages.filter((_, index) => index % 2 === 0),
    [displayImages],
  );
  const rightColumnImages = useMemo(
    () => [...displayImages.filter((_, index) => index % 2 === 1)].reverse(),
    [displayImages],
  );

  return (
    <div className="flex flex-col items-center gap-2 lg:grid lg:grid-cols-[minmax(220px,1.18fr)_minmax(610px,1.12fr)_minmax(220px,1.18fr)] lg:items-start lg:gap-5">
      <VerticalMarqueeColumn
        images={leftColumnImages}
        reduceMotion={reduceMotion}
        direction={-1}
        initialOffsetRatio={0.01}
      />
      <div className="w-full">{children}</div>
      <VerticalMarqueeColumn
        images={rightColumnImages}
        reduceMotion={reduceMotion}
        direction={1}
        initialOffsetRatio={0.18}
      />
      <div className="w-full lg:hidden">
        <HorizontalMarqueeRow
          images={displayImages}
          reduceMotion={reduceMotion}
        />
      </div>
    </div>
  );
}
