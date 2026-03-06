"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useStableReducedMotion } from "@/lib/hooks/useStableReducedMotion";
import type { ProjectItem } from "@/lib/content/projects";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type PortfolioMode = "home" | "full";

type PortfolioProps = {
  mode?: PortfolioMode;
  projects: readonly ProjectItem[];
};

export function Portfolio({ mode = "home", projects }: PortfolioProps) {
  const isHome = mode === "home";
  const reduceMotion = useStableReducedMotion();
  const eagerImagesCount = isHome ? 2 : 1;
  const priorityImagesCount = isHome ? 1 : 1;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const previousActiveIndexRef = useRef<number | null>(null);

  const visibleProjects = useMemo(() => projects, [projects]);
  const activeProject = activeIndex === null ? null : visibleProjects[activeIndex] ?? null;
  const sectionClassName = isHome
    ? "bg-white px-4 py-14 sm:py-16 lg:py-20"
    : "bg-transparent px-4 pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24";
  const gridClassName = isHome
    ? "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-4"
    : "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6";
  const cardClassName = isHome
    ? "group overflow-hidden rounded-[1.8rem] border border-slate-200/80 bg-white/95 p-2 shadow-[0_24px_54px_-34px_rgba(15,23,42,0.42)]"
    : "group overflow-hidden rounded-[1.9rem] border border-white/75 bg-white/86 p-2.5 shadow-[0_28px_72px_-44px_rgba(15,23,42,0.38)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-34px_rgba(15,23,42,0.42)]";
  const frameClassName = isHome
    ? "relative aspect-square overflow-hidden rounded-[1.35rem] border border-slate-100 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.98),_rgba(241,245,249,0.92)_52%,_rgba(226,232,240,0.74)_100%)]"
    : "relative aspect-square overflow-hidden rounded-[1.45rem] border border-white/80 bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(244,247,251,0.92)_58%,_rgba(232,239,247,0.86)_100%)]";
  const imageClassName = isHome
    ? "object-contain p-3 transition duration-500 ease-out group-hover:scale-[1.025]"
    : "object-contain p-3.5 transition duration-500 ease-out group-hover:scale-[1.025]";
  const portalTarget = typeof document !== "undefined" ? document.body : null;

  useEffect(() => {
    if (isHome || activeIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActiveIndex(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((current) =>
          current === null ? current : (current + 1) % visibleProjects.length
        );
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((current) =>
          current === null ? current : (current - 1 + visibleProjects.length) % visibleProjects.length
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, isHome, visibleProjects.length]);

  useEffect(() => {
    const wasOpen = previousActiveIndexRef.current !== null;

    if (activeIndex !== null) {
      if (!wasOpen) {
        dialogRef.current?.focus();
      }

      thumbnailRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    } else if (wasOpen) {
      triggerRef.current?.focus();
    }

    previousActiveIndexRef.current = activeIndex;
  }, [activeIndex]);

  function openLightbox(index: number, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setActiveIndex(index);
  }

  function showPrevious() {
    setActiveIndex((current) =>
      current === null ? current : (current - 1 + visibleProjects.length) % visibleProjects.length
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === null ? current : (current + 1) % visibleProjects.length
    );
  }

  const lightbox =
    !isHome && portalTarget
      ? createPortal(
          <AnimatePresence initial={false}>
            {activeProject ? (
              <motion.div
                key="gallery-lightbox"
                className="fixed inset-0 z-[160] overflow-hidden bg-slate-950/18 backdrop-blur-[14px] backdrop-saturate-150"
                role="dialog"
                aria-modal="true"
                aria-label={activeProject.imageAlt}
                onClick={() => setActiveIndex(null)}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_24%),radial-gradient(circle_at_18%_20%,_rgba(56,189,248,0.12),_transparent_22%),radial-gradient(circle_at_80%_18%,_rgba(37,99,235,0.12),_transparent_24%),linear-gradient(180deg,_rgba(2,6,23,0.06),_rgba(2,6,23,0.24))]"
                  aria-hidden
                />
                <motion.div
                  ref={dialogRef}
                  tabIndex={-1}
                  className="relative z-[1] flex h-full flex-col px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-[max(0.6rem,env(safe-area-inset-top))] outline-none sm:px-5 sm:pb-[max(0.8rem,env(safe-area-inset-bottom))] sm:pt-[max(0.8rem,env(safe-area-inset-top))] lg:px-8"
                  onClick={(event) => event.stopPropagation()}
                  initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.992 }}
                  animate={reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
                  exit={reduceMotion ? { opacity: 0, y: 6, scale: 0.996 } : { opacity: 0, y: 10, scale: 0.996 }}
                  transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mx-auto flex w-full max-w-[min(96vw,1680px)] items-center justify-between gap-3 pb-2 sm:pb-4">
                    <div className="min-w-11 sm:min-w-12" aria-hidden />
                    <div className="rounded-full border border-white/16 bg-white/10 px-4 py-2 text-center text-white shadow-[0_18px_44px_-28px_rgba(15,23,42,0.65)] backdrop-blur-xl sm:px-5">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/55 sm:text-[0.72rem]">
                        גלריית פרויקטים
                      </p>
                      <p dir="ltr" className="mt-1 text-sm font-semibold text-white/90 sm:text-base">
                        {(activeIndex ?? 0) + 1} / {visibleProjects.length}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(null)}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white shadow-[0_18px_44px_-26px_rgba(15,23,42,0.72)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/70 sm:h-12 sm:w-12"
                      aria-label="סגור תמונה מוגדלת"
                    >
                      <X className="h-5 w-5" aria-hidden />
                    </button>
                  </div>

                  <div className="mx-auto flex w-full max-w-[min(98vw,1820px)] flex-1 min-h-0 items-center gap-3 sm:gap-4 lg:gap-5">
                    <button
                      type="button"
                      onClick={showPrevious}
                      className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white shadow-[0_18px_44px_-28px_rgba(15,23,42,0.7)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/70 sm:inline-flex lg:h-14 lg:w-14"
                      aria-label="התמונה הקודמת"
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden />
                    </button>

                    <div className="relative min-h-0 flex-1">
                      <div className="pointer-events-none absolute inset-x-[10%] top-[8%] h-24 rounded-full bg-cyan-300/10 blur-3xl" aria-hidden />
                      <div className="relative h-[min(71svh,680px)] w-full overflow-hidden rounded-[1.9rem] border border-white/14 bg-white/[0.08] shadow-[0_30px_90px_-40px_rgba(15,23,42,0.6)] backdrop-blur-xl sm:h-[min(72svh,760px)] sm:rounded-[2.2rem] lg:h-[min(78vh,880px)] lg:rounded-[2.6rem]">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.06),_rgba(255,255,255,0.02))]" aria-hidden />
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={activeProject.id}
                            className="absolute inset-0"
                            initial={reduceMotion ? false : { opacity: 0, scale: 0.988 }}
                            animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.008 }}
                            transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
                          >
                            <Image
                              src={activeProject.imageSrc}
                              alt={activeProject.imageAlt}
                              fill
                              sizes="(max-width: 640px) 92vw, 88vw"
                              className="object-contain p-2 sm:p-4 lg:p-5"
                              quality={82}
                              priority
                            />
                          </motion.div>
                        </AnimatePresence>

                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-3 pb-3 sm:hidden">
                          <button
                            type="button"
                            onClick={showPrevious}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-slate-950/34 text-white shadow-[0_18px_34px_-22px_rgba(15,23,42,0.75)] backdrop-blur-xl transition duration-200 hover:bg-slate-950/46 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/70"
                            aria-label="התמונה הקודמת"
                          >
                            <ChevronRight className="h-5 w-5" aria-hidden />
                          </button>
                          <button
                            type="button"
                            onClick={showNext}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-slate-950/34 text-white shadow-[0_18px_34px_-22px_rgba(15,23,42,0.75)] backdrop-blur-xl transition duration-200 hover:bg-slate-950/46 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/70"
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
                      className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white shadow-[0_18px_44px_-28px_rgba(15,23,42,0.7)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/70 sm:inline-flex lg:h-14 lg:w-14"
                      aria-label="התמונה הבאה"
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden />
                    </button>
                  </div>

                  <div className="mx-auto mt-3 w-full max-w-[min(96vw,1640px)]">
                    <div className="rounded-[1.35rem] border border-white/12 bg-slate-950/18 p-2 shadow-[0_22px_60px_-38px_rgba(15,23,42,0.66)] backdrop-blur-xl sm:rounded-[1.55rem] sm:p-2.5">
                      <div className="lightbox-thumbnails flex gap-2 overflow-x-auto py-0.5 sm:gap-2.5">
                        {visibleProjects.map((project, index) => {
                          const isActive = index === activeIndex;

                          return (
                            <button
                              key={`thumb-${project.id}`}
                              ref={(element) => {
                                thumbnailRefs.current[index] = element;
                              }}
                              type="button"
                              onClick={() => setActiveIndex(index)}
                              aria-label={`עבור לתמונה ${index + 1}`}
                              aria-current={isActive ? "true" : undefined}
                              className={`relative h-13 w-13 shrink-0 overflow-hidden rounded-[1rem] border transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/70 sm:h-[3.65rem] sm:w-[3.65rem] lg:h-[4.1rem] lg:w-[4.1rem] ${
                                isActive
                                  ? "border-white/85 bg-white/16 shadow-[0_18px_40px_-24px_rgba(125,211,252,0.58)]"
                                  : "border-white/12 bg-white/8 opacity-80 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/12 hover:opacity-100"
                              }`}
                            >
                              <Image
                                src={project.imageSrc}
                                alt=""
                                fill
                                sizes="80px"
                                className="object-contain p-1.5"
                                quality={62}
                                loading="lazy"
                                decoding="async"
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          portalTarget
        )
      : null;

  return (
    <section
      id={isHome ? "gallery" : undefined}
      aria-labelledby={isHome ? "home-gallery-heading" : "gallery-page-heading"}
      className={sectionClassName}
    >
      <div className="mx-auto max-w-7xl">
        {!isHome && (
          <p className="mb-2 text-center text-sm font-semibold tracking-[0.18em] text-sky-800/80">העבודות שלנו</p>
        )}
        <h2
          id={isHome ? "home-gallery-heading" : "gallery-page-heading"}
          className="mb-5 text-center text-4xl font-black leading-tight tracking-tight text-primary sm:text-5xl lg:text-[3.35rem]"
        >
          {isHome ? "פרויקטים נבחרים" : "גלריית פרויקטים מלאה"}
        </h2>
        {!isHome && (
          <p className="mx-auto mb-10 max-w-3xl text-center text-[0.98rem] leading-relaxed text-foreground/72 sm:mb-12">
            מבחר העבודות מוצג כאן בגלריה נקייה ומדויקת, עם פתיחה מהירה לצפייה גדולה יותר בכל פרויקט.
          </p>
        )}
        <div className={gridClassName}>
          {visibleProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.05 }}
              className={cardClassName}
            >
              {isHome ? (
                <div className={frameClassName}>
                  <Image
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, (max-width: 1280px) 18vw, 15vw"
                    className={imageClassName}
                    quality={72}
                    loading={index < eagerImagesCount ? "eager" : "lazy"}
                    priority={index < priorityImagesCount}
                    decoding="async"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  aria-label={`פתח תמונה מוגדלת עבור ${project.imageAlt}`}
                  onClick={(event) => openLightbox(index, event.currentTarget)}
                  className={`${frameClassName} block w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset`}
                >
                  <Image
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, (max-width: 1440px) 22vw, 18vw"
                    className={imageClassName}
                    quality={72}
                    loading={index < eagerImagesCount ? "eager" : "lazy"}
                    priority={index < priorityImagesCount}
                    decoding="async"
                  />
                </button>
              )}
            </motion.article>
          ))}
        </div>
        {isHome && (
          <motion.div
            className="mt-10 flex justify-center"
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
          >
            <Link
              href="/gallery"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3.5 font-semibold text-primary shadow-[0_16px_34px_-20px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              הצג עוד פרויקטים
            </Link>
          </motion.div>
        )}
      </div>
      {lightbox}
    </section>
  );
}
