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
      className="hero-marquee hero-marquee--vertical pointer-events-none relative block h-full min-h-0 self-stretch overflow-hidden lg:pointer-events-auto"
      aria-label="גלריית פרויקטים מתחלפת"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-blue-100/95 to-transparent sm:h-12 lg:h-16" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-blue-100/95 to-transparent sm:h-12 lg:h-16" />

      <div
        ref={trackRef}
        className="hero-marquee-track flex flex-col items-center gap-[clamp(0.55rem,1.05vw,0.9rem)] pb-[clamp(0.55rem,1.05vw,0.9rem)]"
      >
        {loopItems.map((image, index) => {
          const isClone = index >= images.length;
          return (
            <article
              key={`${image.src}-${index}`}
              aria-hidden={isClone}
              onDragStart={preventNativeDrag}
              className="hero-marquee-card group relative aspect-square w-full overflow-hidden rounded-[clamp(1rem,1.7vw,1.45rem)] border border-white/85 bg-white/75 p-[clamp(0.18rem,0.4vw,0.3rem)] shadow-[0_12px_24px_rgba(15,23,42,0.15)] backdrop-blur-sm"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[clamp(0.82rem,1.4vw,1.15rem)] border border-blue-100/60 bg-slate-50/80">
                <Image
                  src={image.src}
                  alt={isClone ? '' : image.alt}
                  width={384}
                  height={384}
                  placeholder="blur"
                  blurDataURL={image.blurDataUrl}
                  draggable={false}
                  sizes="(max-width: 767px) 92px, (max-width: 1024px) 116px, (max-width: 1440px) 168px, 210px"
                  className="h-full w-full object-contain p-[clamp(0.25rem,0.65vw,0.55rem)] transition-transform duration-500 ease-out group-hover:scale-[1.045]"
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
    <div className="grid h-full min-h-0 w-full grid-cols-[clamp(3.85rem,14vw,5rem)_minmax(0,1fr)_clamp(3.85rem,14vw,5rem)] items-stretch gap-[clamp(0.45rem,1.35vw,1.5rem)] sm:grid-cols-[clamp(4.4rem,13vw,6.5rem)_minmax(0,1fr)_clamp(4.4rem,13vw,6.5rem)] md:grid-cols-[clamp(6.25rem,13vw,9rem)_minmax(0,1fr)_clamp(6.25rem,13vw,9rem)] lg:grid-cols-[clamp(9rem,13vw,12.5rem)_minmax(0,1fr)_clamp(9rem,13vw,12.5rem)] xl:grid-cols-[clamp(10rem,13vw,13rem)_minmax(0,1fr)_clamp(10rem,13vw,13rem)]">
      <VerticalMarqueeColumn
        images={leftColumnImages}
        reduceMotion={reduceMotion}
        direction={-1}
        initialOffsetRatio={0.06}
      />
      <div className="h-full min-w-0">{children}</div>
      <VerticalMarqueeColumn
        images={rightColumnImages}
        reduceMotion={reduceMotion}
        direction={1}
        initialOffsetRatio={0.22}
      />
    </div>
  );
}
