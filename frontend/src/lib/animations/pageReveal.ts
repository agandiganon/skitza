import type { TargetAndTransition, Transition } from "framer-motion";

type PageRevealVariants = {
  hidden: TargetAndTransition;
  visible: TargetAndTransition;
  exit: TargetAndTransition;
};

export const PAGE_REVEAL_EASE: Transition["ease"] = [0.22, 1, 0.36, 1];
export const PAGE_REVEAL_DURATION = 0.62;
export const PAGE_REVEAL_HEAVY_DURATION = 0.44;

const DEFAULT_BLUR = 8;
const HEAVY_ROUTE_BLUR = 4;

function buildVariants(blur: number): PageRevealVariants {
  return {
    hidden: { opacity: 0, y: 24, scale: 0.985, filter: `blur(${blur}px)` },
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, y: -12, scale: 1.01, filter: `blur(${Math.max(blur - 2, 0)}px)` },
  };
}

export const PAGE_REVEAL_VARIANTS = buildVariants(DEFAULT_BLUR);
export const PAGE_REVEAL_HEAVY_VARIANTS = buildVariants(HEAVY_ROUTE_BLUR);
