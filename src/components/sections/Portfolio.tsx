"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
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
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

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
    : "group overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/95 p-2.5 shadow-[0_28px_72px_-44px_rgba(15,23,42,0.48)] backdrop-blur-sm";
  const frameClassName = isHome
    ? "relative aspect-square overflow-hidden rounded-[1.35rem] border border-slate-100 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.98),_rgba(241,245,249,0.92)_52%,_rgba(226,232,240,0.74)_100%)]"
    : "relative aspect-square overflow-hidden rounded-[1.45rem] border border-slate-100 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.98),_rgba(244,247,251,0.94)_54%,_rgba(226,232,240,0.72)_100%)]";
  const imageClassName = isHome
    ? "object-contain p-3 transition duration-500 ease-out group-hover:scale-[1.025]"
    : "object-contain p-4 transition duration-700 ease-out group-hover:scale-[1.03]";
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
    if (activeIndex !== null) {
      closeButtonRef.current?.focus();
      thumbnailRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      return;
    }

    triggerRef.current?.focus();
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
    !isHome && activeProject && portalTarget
      ? createPortal(
          <div
            className="fixed inset-0 z-[160] bg-slate-950/94 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={activeProject.imageAlt}
            onClick={() => setActiveIndex(null)}
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_32%),radial-gradient(circle_at_bottom,_rgba(37,99,235,0.12),_transparent_28%)]"
              aria-hidden
            />
            <div
              className="relative z-[1] flex h-full min-h-0 flex-col"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3 px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:pb-4 lg:px-8">
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.9)] transition hover:bg-white/14 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-slate-950"
                  aria-label="סגור תמונה מוגדלת"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>

                <div className="text-center text-white">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white/55 sm:text-xs">
                    גלריית פרויקטים
                  </p>
                  <p dir="ltr" className="mt-1 text-sm font-semibold text-white/88 sm:text-base">
                    {(activeIndex ?? 0) + 1} / {visibleProjects.length}
                  </p>
                </div>

                <div className="h-12 w-12 shrink-0" aria-hidden />
              </div>

              <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 py-2 sm:px-6 lg:px-8">
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute right-3 top-1/2 z-[2] inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/30 text-white shadow-[0_20px_44px_-26px_rgba(15,23,42,0.88)] transition hover:bg-black/45 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-slate-950 sm:right-5 sm:h-12 sm:w-12"
                  aria-label="התמונה הקודמת"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>

                <div className="flex h-full w-full items-center justify-center">
                  <div className="relative h-full max-h-full w-full max-w-[min(92vw,1520px)] overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.03] shadow-[0_30px_90px_-42px_rgba(15,23,42,0.92)] sm:rounded-[2.2rem]">
                    <div className="relative h-full min-h-[340px] w-full sm:min-h-[420px]">
                      <Image
                        src={activeProject.imageSrc}
                        alt={activeProject.imageAlt}
                        fill
                        sizes="92vw"
                        className="object-contain p-4 sm:p-6 lg:p-8"
                        quality={80}
                        priority
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={showNext}
                  className="absolute left-3 top-1/2 z-[2] inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/30 text-white shadow-[0_20px_44px_-26px_rgba(15,23,42,0.88)] transition hover:bg-black/45 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-slate-950 sm:left-5 sm:h-12 sm:w-12"
                  aria-label="התמונה הבאה"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <div className="px-3 pb-[max(0.9rem,env(safe-area-inset-bottom))] pt-2 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-[min(92vw,1320px)]">
                  <div className="lightbox-thumbnails flex gap-2 overflow-x-auto py-1 sm:gap-3">
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
                          className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border bg-white/6 transition focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-slate-950 sm:h-20 sm:w-20 ${
                            isActive
                              ? "border-white/85 shadow-[0_18px_40px_-24px_rgba(125,211,252,0.65)]"
                              : "border-white/12 opacity-70 hover:border-white/35 hover:opacity-100"
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
            </div>
          </div>,
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
