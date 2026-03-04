"use client";

import Link from "next/link";
import { Box } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function Section3D() {
  return (
    <section className="bg-gradient-to-b from-blue-700 to-primary px-4 py-16 text-primary-foreground sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <AnimatedSection>
          <div className="mb-6 inline-flex rounded-2xl bg-white/10 p-4">
            <Box className="h-12 w-12" aria-hidden />
          </div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">הדמיות 3D</h2>
          <p className="mb-8 text-lg text-primary-foreground/90">
            הדמיה חיה לפני ייצור שמאפשרת לראות את המוצר בתלת־ממד, לדייק פרטים ולהחליט מהר יותר.
            פתרון פרקטי שחוסך תיקונים, זמן ועלויות.
          </p>
          <Link
            href="/services/3d"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg transition hover:bg-primary-foreground/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
          >
            לפרטים על שירות הדמיות 3D
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
