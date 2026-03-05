"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useStableReducedMotion } from "@/lib/hooks/useStableReducedMotion";
import { HOME_FEATURED_PROJECTS, PROJECTS, type ProjectCategory } from "@/lib/content/projects";

const GALLERY_FILTERS = [
  { id: "all", label: "כל העבודות" },
  { id: "branding", label: "מיתוג" },
  { id: "innovation", label: "חדשנות" },
  { id: "packaging", label: "מארזים" },
] as const;

type FilterId = (typeof GALLERY_FILTERS)[number]["id"];

function isCategoryFilter(filter: FilterId): filter is ProjectCategory {
  return filter !== "all";
}

type PortfolioMode = "home" | "full";

type PortfolioProps = {
  mode?: PortfolioMode;
};

export function Portfolio({ mode = "home" }: PortfolioProps) {
  const isHome = mode === "home";
  const [filter, setFilter] = useState<FilterId>("all");
  const reduceMotion = useStableReducedMotion();
  const eagerImagesCount = isHome ? 2 : 1;
  const priorityImagesCount = isHome ? 1 : 1;

  const filteredProjects = useMemo(
    () => (isCategoryFilter(filter) ? PROJECTS.filter((project) => project.category === filter) : PROJECTS),
    [filter]
  );

  const visibleProjects = isHome
    ? HOME_FEATURED_PROJECTS
    : filteredProjects;

  return (
    <section
      id={isHome ? "gallery" : undefined}
      aria-labelledby={isHome ? "home-gallery-heading" : "gallery-page-heading"}
      className={
        isHome
          ? "bg-white px-4 py-14 sm:py-16 lg:py-20"
          : "bg-white px-4 pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24"
      }
    >
      <div className="mx-auto max-w-7xl">
        {!isHome && (
          <p className="mb-2 text-center text-sm font-semibold tracking-wide text-blue-700">העבודות שלנו</p>
        )}
        <h2
          id={isHome ? "home-gallery-heading" : "gallery-page-heading"}
          className="mb-5 text-center text-4xl font-black leading-tight tracking-tight text-primary sm:text-5xl lg:text-[3.35rem]"
        >
          {isHome ? "פרויקטים נבחרים" : "גלריית פרויקטים מלאה"}
        </h2>
        {!isHome && (
          <p className="mx-auto mb-10 max-w-3xl text-center text-foreground/75">
            מבחר עבודות שבוצעו עבור לקוחות מתחומי קוסמטיקה, מזון, מסחר ומתנות.
          </p>
        )}
        {!isHome && (
          <div className="mb-10 flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {GALLERY_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`min-h-[44px] rounded-full px-5 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  filter === f.id
                    ? "bg-primary text-white shadow-lg"
                    : "bg-blue-50 text-blue-700 ring-1 ring-blue-200 hover:bg-blue-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
          {visibleProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.05 }}
              className="group overflow-hidden rounded-2xl border border-blue-200/70 bg-white shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, (max-width: 1280px) 30vw, 22vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                  quality={72}
                  loading={index < eagerImagesCount ? "eager" : "lazy"}
                  priority={index < priorityImagesCount}
                  decoding="async"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold leading-tight text-primary">{project.title}</h3>
              </div>
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
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border-2 border-primary px-8 py-3 font-medium text-primary transition hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              הצג עוד פרויקטים
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
