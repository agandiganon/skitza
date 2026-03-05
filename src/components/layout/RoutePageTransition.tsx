"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSelectedLayoutSegments } from "next/navigation";
import {
  PAGE_REVEAL_DURATION,
  PAGE_REVEAL_EASE,
  PAGE_REVEAL_HEAVY_DURATION,
  PAGE_REVEAL_HEAVY_VARIANTS,
  PAGE_REVEAL_VARIANTS,
} from "@/lib/animations/pageReveal";
import { useStableReducedMotion } from "@/lib/hooks/useStableReducedMotion";

const HEAVY_ROUTES = new Set<string>(["/gallery"]);

type RoutePageTransitionProps = {
  children: React.ReactNode;
};

export function RoutePageTransition({ children }: RoutePageTransitionProps) {
  const segments = useSelectedLayoutSegments();
  const pathname = segments.length > 0 ? `/${segments.join("/")}` : "/";
  const shouldReduceMotion = useStableReducedMotion();

  if (pathname === "/" || shouldReduceMotion) {
    return <>{children}</>;
  }

  const isHeavyRoute = HEAVY_ROUTES.has(pathname);
  const variants = isHeavyRoute ? PAGE_REVEAL_HEAVY_VARIANTS : PAGE_REVEAL_VARIANTS;
  const duration = isHeavyRoute ? PAGE_REVEAL_HEAVY_DURATION : PAGE_REVEAL_DURATION;
  const preAnimationStyle = isHeavyRoute
    ? { opacity: 0, y: 24, scale: 0.985, filter: "blur(4px)" }
    : { opacity: 0, y: 24, scale: 0.985, filter: "blur(8px)" };

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={pathname}
        initial={false}
        animate="visible"
        exit="exit"
        variants={variants}
        transition={{ duration, ease: PAGE_REVEAL_EASE }}
        style={{ transformOrigin: "50% 0%", ...preAnimationStyle }}
        className="route-transition-layer"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
