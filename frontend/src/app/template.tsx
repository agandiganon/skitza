"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  PAGE_REVEAL_DURATION,
  PAGE_REVEAL_EASE,
  PAGE_REVEAL_HEAVY_DURATION,
  PAGE_REVEAL_HEAVY_VARIANTS,
  PAGE_REVEAL_VARIANTS,
} from "@/lib/animations/pageReveal";
import { useStableReducedMotion } from "@/lib/hooks/useStableReducedMotion";

const HEAVY_ROUTES = new Set<string>(["/gallery"]);
const HOME_REVEAL_VARIANTS = {
  hidden: { opacity: 0, y: 18, scale: 0.99, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, y: -10, scale: 1.005, filter: "blur(3px)" },
} as const;
const HOME_REVEAL_DURATION = 0.62;

type TemplateProps = {
  children: React.ReactNode;
};

export default function Template({ children }: TemplateProps) {
  const pathname = usePathname() ?? "/";
  const shouldReduceMotion = useStableReducedMotion();
  const isHomeRoute = pathname === "/";

  if (shouldReduceMotion || pathname.startsWith("/services/")) {
    return <>{children}</>;
  }

  const isHeavyRoute = HEAVY_ROUTES.has(pathname);
  const variants = isHomeRoute
    ? HOME_REVEAL_VARIANTS
    : isHeavyRoute
      ? PAGE_REVEAL_HEAVY_VARIANTS
      : PAGE_REVEAL_VARIANTS;
  const duration = isHomeRoute
    ? HOME_REVEAL_DURATION
    : isHeavyRoute
      ? PAGE_REVEAL_HEAVY_DURATION
      : PAGE_REVEAL_DURATION;
  const preAnimationStyle = isHomeRoute
    ? { opacity: 0, y: 18, scale: 0.99, filter: "blur(4px)" }
    : isHeavyRoute
      ? { opacity: 0, y: 24, scale: 0.985, filter: "blur(4px)" }
      : { opacity: 0, y: 24, scale: 0.985, filter: "blur(8px)" };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration, ease: PAGE_REVEAL_EASE, delay: isHomeRoute ? 0.04 : 0 }}
      style={{ transformOrigin: "50% 0%", ...preAnimationStyle }}
      className="route-transition-layer"
    >
      {children}
    </motion.div>
  );
}
