'use client';

import { useEffect, useRef, useState } from 'react';
import type {
  Dispatch,
  RefObject,
  SetStateAction,
  TouchEvent as ReactTouchEvent,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { ProjectItem } from '@/lib/content/projects';
import { pushToDataLayer } from '@/lib/analytics/datalayer';

type PortfolioMode = 'home' | 'full';

type PortfolioProps = {
  mode?: PortfolioMode;
  projects: readonly ProjectItem[];
  enableLightbox?: boolean;
  lightboxPlacement?: 'home_gallery' | 'gallery_page';
};

type NetworkInformationLike = {
  effectiveType?: string;
  saveData?: boolean;
};

type BackgroundPreloadProfile = {
  batchSize: number;
  batchDelayMs: number;
  idleDelayMs: number;
  idleTimeoutMs: number;
};

function getNeighborIndices(index: number, length: number) {
  if (length <= 1) {
    return [];
  }

  const previousIndex = (index - 1 + length) % length;
  const nextIndex = (index + 1) % length;
  return previousIndex === nextIndex
    ? [previousIndex]
    : [previousIndex, nextIndex];
}

function markLightboxLoaded(
  sourcePath: string,
  setLoadedSources: Dispatch<SetStateAction<Record<string, true>>>,
) {
  setLoadedSources((current) => {
    if (current[sourcePath]) {
      return current;
    }

    return {
      ...current,
      [sourcePath]: true,
    };
  });
}

function markLightboxFailed(
  sourcePath: string,
  setFailedSources: Dispatch<SetStateAction<Record<string, true>>>,
) {
  setFailedSources((current) => {
    if (current[sourcePath]) {
      return current;
    }

    return {
      ...current,
      [sourcePath]: true,
    };
  });
}

function preloadLightboxAsset(
  sourcePath: string,
  preloadedSourcesRef: RefObject<Set<string>>,
  setLoadedSources: Dispatch<SetStateAction<Record<string, true>>>,
  setFailedSources: Dispatch<SetStateAction<Record<string, true>>>,
) {
  if (!sourcePath || typeof window === 'undefined') {
    return;
  }

  if (preloadedSourcesRef.current?.has(sourcePath)) {
    return;
  }

  preloadedSourcesRef.current?.add(sourcePath);

  const image = new window.Image();
  image.decoding = 'async';
  image.onload = () => {
    markLightboxLoaded(sourcePath, setLoadedSources);
  };
  image.onerror = () => {
    markLightboxFailed(sourcePath, setFailedSources);
    preloadedSourcesRef.current?.delete(sourcePath);
  };
  image.src = sourcePath;
}

function isSmallViewport() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia('(max-width: 767px)').matches;
}

function canPreloadNeighbors() {
  if (typeof navigator === 'undefined') {
    return false;
  }

  const connection = (
    navigator as Navigator & { connection?: NetworkInformationLike }
  ).connection;

  if (!connection) {
    return !isSmallViewport();
  }

  if (connection.saveData) {
    return false;
  }

  if (
    connection.effectiveType &&
    ['slow-2g', '2g', '3g'].includes(connection.effectiveType)
  ) {
    return false;
  }

  return true;
}

function getBackgroundPreloadProfile(): BackgroundPreloadProfile {
  const isSlowConnection =
    typeof navigator !== 'undefined' &&
    'connection' in navigator &&
    Boolean(
      (
        navigator as Navigator & {
          connection?: NetworkInformationLike;
        }
      ).connection?.saveData,
    );
  const effectiveType =
    typeof navigator !== 'undefined' && 'connection' in navigator
      ? (
          navigator as Navigator & {
            connection?: NetworkInformationLike;
          }
        ).connection?.effectiveType
      : undefined;

  if (isSlowConnection || ['slow-2g', '2g'].includes(effectiveType ?? '')) {
    return {
      batchSize: 1,
      batchDelayMs: 1600,
      idleDelayMs: 2200,
      idleTimeoutMs: 2800,
    };
  }

  if (isSmallViewport() || (effectiveType && ['3g'].includes(effectiveType))) {
    return {
      batchSize: 1,
      batchDelayMs: 900,
      idleDelayMs: 1500,
      idleTimeoutMs: 2200,
    };
  }

  return {
    batchSize: 3,
    batchDelayMs: 280,
    idleDelayMs: 900,
    idleTimeoutMs: 1600,
  };
}

function orderProjectsForBackgroundPreload(projects: readonly ProjectItem[]) {
  return [...projects].sort((left, right) => {
    if (left.featuredHome !== right.featuredHome) {
      return left.featuredHome ? -1 : 1;
    }

    return left.id - right.id;
  });
}

export function Portfolio({
  mode = 'home',
  projects,
  enableLightbox,
  lightboxPlacement,
}: PortfolioProps) {
  const isHome = mode === 'home';
  const resolvedEnableLightbox = enableLightbox ?? true;
  const resolvedLightboxPlacement =
    lightboxPlacement ?? (isHome ? 'home_gallery' : 'gallery_page');
  const eagerImagesCount = isHome ? 2 : 1;
  const priorityImagesCount = 1;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loadedLightboxSources, setLoadedLightboxSources] = useState<
    Record<string, true>
  >({});
  const [failedLightboxSources, setFailedLightboxSources] = useState<
    Record<string, true>
  >({});
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const preloadedLightboxSourcesRef = useRef<Set<string>>(new Set());
  const previousActiveIndexRef = useRef<number | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const activeProject =
    activeIndex === null ? null : (projects[activeIndex] ?? null);
  const activeLightboxSrc = activeProject?.lightboxSrc ?? null;
  const activeLightboxLoaded = activeLightboxSrc
    ? Boolean(loadedLightboxSources[activeLightboxSrc])
    : false;
  const activeLightboxFailed = activeLightboxSrc
    ? Boolean(failedLightboxSources[activeLightboxSrc])
    : false;
  const sectionClassName = isHome
    ? 'cv-auto bg-white px-4 py-14 sm:py-16 lg:py-20'
    : 'cv-auto bg-transparent px-4 pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24';
  const gridClassName = isHome
    ? 'grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-4'
    : 'grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6';
  const cardClassName = isHome
    ? 'group overflow-hidden rounded-[1.8rem] border border-slate-200/80 bg-white/95 p-2 shadow-[0_24px_54px_-34px_rgba(15,23,42,0.42)]'
    : 'group gallery-card overflow-hidden rounded-[1.9rem] border border-white/75 bg-white/88 p-2.5 shadow-[0_28px_72px_-44px_rgba(15,23,42,0.38)] backdrop-blur-sm';
  const frameClassName = isHome
    ? 'relative aspect-square overflow-hidden rounded-[1.35rem] border border-slate-100 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.98),_rgba(241,245,249,0.92)_52%,_rgba(226,232,240,0.74)_100%)]'
    : 'relative aspect-square overflow-hidden rounded-[1.45rem] border border-white/80 bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(244,247,251,0.92)_58%,_rgba(232,239,247,0.86)_100%)]';
  const imageClassName = isHome
    ? 'object-contain p-3 transition duration-500 ease-out group-hover:scale-[1.025]'
    : 'object-contain p-3.5 transition duration-500 ease-out group-hover:scale-[1.025]';
  const portalTarget = typeof document !== 'undefined' ? document.body : null;
  const GalleryHeadingTag = isHome ? 'h2' : 'h1';

  useEffect(() => {
    if (!resolvedEnableLightbox || activeIndex === null || !activeProject) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    preloadLightboxAsset(
      activeProject.lightboxSrc,
      preloadedLightboxSourcesRef,
      setLoadedLightboxSources,
      setFailedLightboxSources,
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setActiveIndex(null);
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActiveIndex((current) =>
          current === null ? current : (current + 1) % projects.length,
        );
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveIndex((current) =>
          current === null
            ? current
            : (current - 1 + projects.length) % projects.length,
        );
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, activeProject, projects, resolvedEnableLightbox]);

  useEffect(() => {
    const wasOpen = previousActiveIndexRef.current !== null;

    if (activeIndex !== null) {
      if (!wasOpen) {
        dialogRef.current?.focus();
      }

      thumbnailRefs.current[activeIndex]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    } else if (wasOpen) {
      triggerRef.current?.focus();
    }

    previousActiveIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (
      !resolvedEnableLightbox ||
      activeIndex === null ||
      !activeProject ||
      !activeLightboxLoaded ||
      !canPreloadNeighbors()
    ) {
      return;
    }

    getNeighborIndices(activeIndex, projects.length).forEach(
      (neighborIndex) => {
        const neighborProject = projects[neighborIndex];
        if (!neighborProject) {
          return;
        }

        preloadLightboxAsset(
          neighborProject.lightboxSrc,
          preloadedLightboxSourcesRef,
          setLoadedLightboxSources,
          setFailedLightboxSources,
        );
      },
    );
  }, [
    activeIndex,
    activeLightboxLoaded,
    activeProject,
    projects,
    resolvedEnableLightbox,
  ]);

  useEffect(() => {
    if (!resolvedEnableLightbox || typeof window === 'undefined') {
      return;
    }

    const preloadQueue = orderProjectsForBackgroundPreload(projects)
      .map((project) => project.lightboxSrc)
      .filter(
        (sourcePath) =>
          sourcePath && !preloadedLightboxSourcesRef.current?.has(sourcePath),
      );

    if (preloadQueue.length === 0) {
      return;
    }

    const profile = getBackgroundPreloadProfile();
    const idleWindow = window as Window & {
      requestIdleCallback?: (
        callback: () => void,
        options?: { timeout: number },
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    let cancelled = false;
    let startTimer = 0;
    let batchTimer = 0;
    let idleHandle: number | undefined;
    let queueIndex = 0;

    const runBatch = () => {
      if (cancelled) {
        return;
      }

      const batch = preloadQueue.slice(
        queueIndex,
        queueIndex + profile.batchSize,
      );

      batch.forEach((sourcePath) => {
        preloadLightboxAsset(
          sourcePath,
          preloadedLightboxSourcesRef,
          setLoadedLightboxSources,
          setFailedLightboxSources,
        );
      });

      queueIndex += batch.length;

      if (queueIndex < preloadQueue.length) {
        batchTimer = window.setTimeout(runBatch, profile.batchDelayMs);
      }
    };

    const startPreloading = () => {
      if (cancelled) {
        return;
      }

      startTimer = window.setTimeout(runBatch, profile.idleDelayMs);
    };

    if (idleWindow.requestIdleCallback) {
      idleHandle = idleWindow.requestIdleCallback(startPreloading, {
        timeout: profile.idleTimeoutMs,
      });
    } else {
      startPreloading();
    }

    return () => {
      cancelled = true;
      if (idleHandle !== undefined) {
        idleWindow.cancelIdleCallback?.(idleHandle);
      }
      window.clearTimeout(startTimer);
      window.clearTimeout(batchTimer);
    };
  }, [projects, resolvedEnableLightbox]);

  function openLightbox(index: number, trigger: HTMLButtonElement) {
    if (!resolvedEnableLightbox) {
      return;
    }

    const project = projects[index];
    if (!project) {
      return;
    }

    triggerRef.current = trigger;
    preloadLightboxAsset(
      project.lightboxSrc,
      preloadedLightboxSourcesRef,
      setLoadedLightboxSources,
      setFailedLightboxSources,
    );
    setActiveIndex(index);
    pushToDataLayer('gallery_lightbox_open', {
      placement: resolvedLightboxPlacement,
      image_index: index + 1,
    });
  }

  function showPrevious() {
    setActiveIndex((current) =>
      current === null
        ? current
        : (current - 1 + projects.length) % projects.length,
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === null ? current : (current + 1) % projects.length,
    );
  }

  function handleLightboxTouchStart(event: ReactTouchEvent<HTMLDivElement>) {
    const touch = event.changedTouches[0];

    if (!touch) {
      return;
    }

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  }

  function handleLightboxTouchEnd(event: ReactTouchEvent<HTMLDivElement>) {
    const touch = event.changedTouches[0];
    const touchStart = touchStartRef.current;
    touchStartRef.current = null;

    if (!touch || !touchStart) {
      return;
    }

    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    if (absDeltaX < 40 && absDeltaY < 40) {
      return;
    }

    if (absDeltaY > absDeltaX && deltaY > 72) {
      setActiveIndex(null);
      return;
    }

    if (absDeltaX > absDeltaY && absDeltaX > 48) {
      if (deltaX < 0) {
        showNext();
        return;
      }

      showPrevious();
    }
  }

  const lightbox =
    resolvedEnableLightbox && portalTarget && activeProject
      ? createPortal(
          <div
            className="gallery-lightbox-backdrop fixed inset-0 z-[160] overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label={activeProject.imageAlt}
            onClick={() => setActiveIndex(null)}
          >
            <div
              ref={dialogRef}
              tabIndex={-1}
              className="gallery-lightbox-shell relative z-[1] flex h-full flex-col px-3 pt-[max(0.65rem,env(safe-area-inset-top))] pb-[max(0.6rem,env(safe-area-inset-bottom))] outline-none sm:px-5 sm:pt-[max(0.8rem,env(safe-area-inset-top))] sm:pb-[max(0.8rem,env(safe-area-inset-bottom))] lg:px-8"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mx-auto flex w-full max-w-[min(96vw,1720px)] items-center justify-between gap-3 pb-2 sm:pb-4">
                <div className="min-w-11 sm:min-w-12" aria-hidden />
                <div className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-center text-white shadow-[0_18px_44px_-28px_rgba(15,23,42,0.65)] backdrop-blur-xl sm:px-5">
                  <p className="text-[0.65rem] font-semibold tracking-[0.24em] text-white/55 uppercase sm:text-[0.72rem]">
                    גלריית פרויקטים
                  </p>
                  <p
                    dir="ltr"
                    className="mt-1 text-sm font-semibold text-white/90 sm:text-base"
                  >
                    {(activeIndex ?? 0) + 1} / {projects.length}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white shadow-[0_18px_44px_-26px_rgba(15,23,42,0.72)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:bg-white/16 focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/70 focus-visible:outline-none active:translate-y-0 active:scale-[0.98] active:bg-white/20 sm:h-12 sm:w-12"
                  aria-label="סגור תמונה מוגדלת"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <div className="mx-auto flex min-h-0 w-full max-w-[min(98vw,1860px)] flex-1 items-center gap-3 sm:gap-4 lg:gap-5">
                <button
                  type="button"
                  onClick={showPrevious}
                  className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white shadow-[0_18px_44px_-28px_rgba(15,23,42,0.7)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:bg-white/16 focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/70 focus-visible:outline-none active:translate-y-0 active:scale-[0.98] active:bg-white/20 sm:inline-flex lg:h-14 lg:w-14"
                  aria-label="התמונה הקודמת"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>

                <div className="relative min-h-0 flex-1">
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_26%),radial-gradient(circle_at_16%_20%,_rgba(56,189,248,0.14),_transparent_22%),radial-gradient(circle_at_84%_18%,_rgba(37,99,235,0.14),_transparent_24%)]"
                    aria-hidden
                  />
                  <div
                    className="gallery-lightbox-stage relative h-[min(76svh,760px)] w-full overflow-hidden rounded-[1.95rem] border border-white/14 bg-white/[0.08] shadow-[0_30px_90px_-40px_rgba(15,23,42,0.6)] backdrop-blur-xl sm:h-[min(77svh,820px)] sm:rounded-[2.25rem] lg:h-[min(81vh,920px)] lg:rounded-[2.75rem]"
                    onTouchStart={handleLightboxTouchStart}
                    onTouchEnd={handleLightboxTouchEnd}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0.02))]"
                      aria-hidden
                    />
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={activeProject.cardSrc}
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full scale-105 object-contain p-2 opacity-45 blur-2xl sm:p-4 lg:p-5"
                      />
                    </div>
                    {!activeLightboxLoaded && !activeLightboxFailed ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-[1.6rem] border border-white/12 bg-slate-950/28 px-5 py-4 text-center text-white shadow-[0_22px_52px_-30px_rgba(15,23,42,0.72)] backdrop-blur-xl">
                          <span className="mx-auto block h-10 w-10 animate-spin rounded-full border-2 border-white/28 border-t-white" />
                          <p className="mt-3 text-sm font-semibold text-white/84">
                            טוען תמונה באיכות מלאה
                          </p>
                        </div>
                      </div>
                    ) : null}
                    {activeLightboxFailed ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-[1.6rem] border border-rose-200/35 bg-slate-950/34 px-5 py-4 text-center text-white shadow-[0_22px_52px_-30px_rgba(15,23,42,0.72)] backdrop-blur-xl">
                          <p className="text-sm font-semibold text-white">
                            לא הצלחנו לטעון את התמונה המלאה כרגע
                          </p>
                        </div>
                      </div>
                    ) : null}
                    <div className="gallery-lightbox-media absolute inset-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        key={activeProject.lightboxSrc}
                        src={activeProject.lightboxSrc}
                        alt={activeProject.imageAlt}
                        decoding="async"
                        loading="eager"
                        fetchPriority="high"
                        onLoad={() =>
                          markLightboxLoaded(
                            activeProject.lightboxSrc,
                            setLoadedLightboxSources,
                          )
                        }
                        onError={() =>
                          markLightboxFailed(
                            activeProject.lightboxSrc,
                            setFailedLightboxSources,
                          )
                        }
                        className={`h-full w-full object-contain p-2 transition-opacity duration-300 sm:p-4 lg:p-5 ${
                          activeLightboxLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-3 pb-3 sm:hidden">
                      <button
                        type="button"
                        onClick={showPrevious}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-slate-950/34 text-white shadow-[0_18px_34px_-22px_rgba(15,23,42,0.75)] backdrop-blur-xl transition duration-200 hover:bg-slate-950/46 focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/70 focus-visible:outline-none active:scale-[0.98] active:bg-slate-950/52"
                        aria-label="התמונה הקודמת"
                      >
                        <ChevronRight className="h-5 w-5" aria-hidden />
                      </button>
                      <button
                        type="button"
                        onClick={showNext}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-slate-950/34 text-white shadow-[0_18px_34px_-22px_rgba(15,23,42,0.75)] backdrop-blur-xl transition duration-200 hover:bg-slate-950/46 focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/70 focus-visible:outline-none active:scale-[0.98] active:bg-slate-950/52"
                        aria-label="התמונה הבאה"
                      >
                        <ChevronLeft className="h-5 w-5" aria-hidden />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={showNext}
                  className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white shadow-[0_18px_44px_-28px_rgba(15,23,42,0.7)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:bg-white/16 focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/70 focus-visible:outline-none active:translate-y-0 active:scale-[0.98] active:bg-white/20 sm:inline-flex lg:h-14 lg:w-14"
                  aria-label="התמונה הבאה"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <div className="mx-auto mt-3 w-full max-w-[min(96vw,1680px)]">
                <div className="rounded-[1.35rem] border border-white/12 bg-slate-950/18 p-2 shadow-[0_22px_60px_-38px_rgba(15,23,42,0.66)] backdrop-blur-xl sm:rounded-[1.55rem] sm:p-2.5">
                  <div className="lightbox-thumbnails flex gap-2 overflow-x-auto py-0.5 sm:gap-2.5">
                    {projects.map((project, index) => {
                      const isActive = index === activeIndex;

                      return (
                        <button
                          key={`thumb-${project.id}`}
                          ref={(element) => {
                            thumbnailRefs.current[index] = element;
                          }}
                          type="button"
                          onClick={() => setActiveIndex(index)}
                          onMouseEnter={() =>
                            preloadLightboxAsset(
                              project.lightboxSrc,
                              preloadedLightboxSourcesRef,
                              setLoadedLightboxSources,
                              setFailedLightboxSources,
                            )
                          }
                          onFocus={() =>
                            preloadLightboxAsset(
                              project.lightboxSrc,
                              preloadedLightboxSourcesRef,
                              setLoadedLightboxSources,
                              setFailedLightboxSources,
                            )
                          }
                          aria-label={`עבור לתמונה ${index + 1}`}
                          aria-current={isActive ? 'true' : undefined}
                          className={`relative h-[3.25rem] w-[3.25rem] shrink-0 overflow-hidden rounded-[1rem] border transition duration-200 focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/70 focus-visible:outline-none sm:h-[3.65rem] sm:w-[3.65rem] lg:h-[4.1rem] lg:w-[4.1rem] ${
                            isActive
                              ? 'border-white/85 bg-white/16 shadow-[0_18px_40px_-24px_rgba(125,211,252,0.58)]'
                              : 'border-white/12 bg-white/8 opacity-80 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/12 hover:opacity-100 active:translate-y-0 active:scale-[0.98] active:bg-white/16'
                          }`}
                        >
                          <Image
                            src={project.thumbSrc}
                            alt=""
                            width={160}
                            height={160}
                            sizes="(max-width: 640px) 52px, (max-width: 1024px) 58px, 66px"
                            className="h-full w-full object-contain p-1.5"
                            loading="lazy"
                            decoding="async"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          portalTarget,
        )
      : null;

  return (
    <>
      <section
        id={isHome ? 'gallery' : undefined}
        aria-labelledby={
          isHome ? 'home-gallery-heading' : 'gallery-page-heading'
        }
        className={sectionClassName}
      >
        <div className="mx-auto max-w-7xl">
          {!isHome ? (
            <div className="mb-10 text-center sm:mb-12">
              <p className="text-sm font-semibold tracking-[0.18em] text-sky-800/80">
                העבודות שלנו
              </p>
              <GalleryHeadingTag
                id="gallery-page-heading"
                className="text-primary mt-3 text-center text-4xl leading-tight font-black tracking-tight sm:text-5xl lg:text-[3.35rem]"
              >
                גלריית פרויקטים מלאה
              </GalleryHeadingTag>
              <p className="text-foreground/72 mx-auto mt-4 max-w-3xl text-[0.98rem] leading-relaxed">
                עבודות אמיתיות מתוך פרויקטים של אריזות, דפוס ומיתוג. בלחיצה על
                כל תמונה אפשר לראות את הפרויקט בגדול ולדפדף בכל הגלריה.
              </p>
            </div>
          ) : (
            <>
              <p className="mb-2 text-center text-sm font-black tracking-[0.24em] text-blue-700/75 uppercase">
                עבודות נבחרות
              </p>
              <h2
                id="home-gallery-heading"
                className="text-primary mb-5 text-center text-4xl font-black tracking-tight sm:text-5xl lg:text-[3.35rem]"
              >
                פרויקטים שממחישים את רמת הביצוע
              </h2>
              <p className="text-foreground/72 mx-auto mb-10 max-w-3xl text-center text-[1rem] leading-relaxed sm:mb-12">
                מבחר עבודות מתוך פרויקטים של אריזות, קרטונים ופתרונות דפוס שנבנו
                לעסקים שרצו תוצאה מדויקת, יציבה וממותגת.
              </p>
            </>
          )}

          <div className={gridClassName}>
            {projects.map((project, index) => (
              <article key={project.id} className={cardClassName}>
                {resolvedEnableLightbox ? (
                  <button
                    type="button"
                    aria-label={`פתח תמונה מוגדלת עבור ${project.imageAlt}`}
                    onClick={(event) =>
                      openLightbox(index, event.currentTarget)
                    }
                    onMouseEnter={() =>
                      preloadLightboxAsset(
                        project.lightboxSrc,
                        preloadedLightboxSourcesRef,
                        setLoadedLightboxSources,
                        setFailedLightboxSources,
                      )
                    }
                    onFocus={() =>
                      preloadLightboxAsset(
                        project.lightboxSrc,
                        preloadedLightboxSourcesRef,
                        setLoadedLightboxSources,
                        setFailedLightboxSources,
                      )
                    }
                    className={`${frameClassName} focus:ring-primary block w-full transition duration-200 focus:ring-2 focus:outline-none focus:ring-inset active:scale-[0.995]`}
                  >
                    <Image
                      src={project.cardSrc}
                      alt={project.imageAlt}
                      width={768}
                      height={768}
                      sizes={
                        isHome
                          ? '(max-width: 640px) 46vw, (max-width: 1024px) 30vw, (max-width: 1280px) 18vw, 15vw'
                          : '(max-width: 640px) 46vw, (max-width: 1024px) 30vw, (max-width: 1440px) 22vw, 18vw'
                      }
                      className={`h-full w-full ${imageClassName}`}
                      loading={index < eagerImagesCount ? 'eager' : 'lazy'}
                      priority={index < priorityImagesCount}
                      decoding="async"
                    />
                  </button>
                ) : (
                  <div className={frameClassName}>
                    <Image
                      src={project.cardSrc}
                      alt={project.imageAlt}
                      width={768}
                      height={768}
                      sizes={
                        isHome
                          ? '(max-width: 640px) 46vw, (max-width: 1024px) 30vw, (max-width: 1280px) 18vw, 15vw'
                          : '(max-width: 640px) 46vw, (max-width: 1024px) 30vw, (max-width: 1440px) 22vw, 18vw'
                      }
                      className={`h-full w-full ${imageClassName}`}
                      loading={index < eagerImagesCount ? 'eager' : 'lazy'}
                      priority={index < priorityImagesCount}
                      decoding="async"
                    />
                  </div>
                )}
              </article>
            ))}
          </div>

          {isHome ? (
            <div className="mt-10 flex justify-center">
              <Link
                href="/gallery"
                data-track-event="cta_click"
                data-track-placement="home_gallery"
                data-track-label="home_gallery_more"
                className="text-primary focus:ring-primary inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-blue-200 bg-white px-7 py-3 text-base font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 focus:ring-2 focus:ring-offset-2 focus:outline-none active:translate-y-0 active:scale-[0.99] active:bg-blue-100"
              >
                הצג עוד פרויקטים
              </Link>
            </div>
          ) : null}
        </div>
      </section>
      {lightbox}
    </>
  );
}
