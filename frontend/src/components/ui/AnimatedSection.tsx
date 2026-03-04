"use client";

import { motion } from "framer-motion";
import { useStableReducedMotion } from "@/lib/hooks/useStableReducedMotion";

const defaultVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.985, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variants?: typeof defaultVariants;
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  variants = defaultVariants,
}: AnimatedSectionProps) {
  const shouldReduceMotion = useStableReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.62,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      variants={shouldReduceMotion ? undefined : variants}
    >
      {children}
    </motion.div>
  );
}
