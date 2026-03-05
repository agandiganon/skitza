"use client";

import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
  href?: string;
}

export function ServiceCard({ title, description, icon: Icon, delay = 0, href }: ServiceCardProps) {
  const content = (
    <div className="group relative h-full rounded-2xl border-2 border-blue-100 bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-300 hover:ring-2 hover:ring-blue-200/50 sm:p-8">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-cyan/15 via-blue-100/20 to-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 inline-flex rounded-xl bg-gradient-to-l from-accent-cyan to-blue-600 p-3 text-white shadow-md">
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
        </div>
        <h3 className="mb-2 text-xl font-bold text-primary sm:text-2xl">{title}</h3>
        <p className="text-foreground/80 leading-relaxed">{description}</p>
      </div>
    </div>
  );

  return (
    <AnimatedSection delay={delay}>
      {href ? (
        <Link href={href} className="block h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl">
          {content}
        </Link>
      ) : (
        content
      )}
    </AnimatedSection>
  );
}
