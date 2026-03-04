"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useStableReducedMotion } from "@/lib/hooks/useStableReducedMotion";

type ServicesTemplateProps = {
  children: React.ReactNode;
};

const servicesIntroVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.992, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
};

export default function ServicesTemplate({ children }: ServicesTemplateProps) {
  const pathname = usePathname() ?? "";
  const shouldReduceMotion = useStableReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial="hidden"
      animate="visible"
      variants={servicesIntroVariants}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: "50% 0%", opacity: 0, y: 14, scale: 0.992, filter: "blur(4px)" }}
      className="route-transition-layer"
    >
      {children}
    </motion.div>
  );
}
