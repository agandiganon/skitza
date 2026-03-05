import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CLIENT_LOGOS } from "@/lib/content/clientLogos";
import { ClientLogosOrbit } from "@/components/sections/ClientLogosOrbit";

export function ClientLogosSection() {
  return (
    <section
      id="partners"
      aria-labelledby="home-partners-heading"
      dir="rtl"
      className="partners-orbit-section px-4 pt-4 pb-8 sm:pt-6 sm:pb-10 lg:pb-12"
    >
      <div className="mx-auto w-full max-w-[2000px]">
        <AnimatedSection>
          <div className="partners-orbit-shell">
            <div className="partners-orbit-center">
              <h2 id="home-partners-heading" className="text-xl font-black tracking-tight text-primary sm:text-2xl lg:text-[2rem]">
                חברות שבוחרות לעבוד איתנו
              </h2>
              <p className="mt-1.5 text-[11px] leading-relaxed text-foreground/70 sm:text-xs">
                מותגים מובילים בוחרים בסקיצה לפתרונות אריזה, מיתוג והדפסה מדויקים לאורך זמן.
              </p>
            </div>
            <ClientLogosOrbit logos={CLIENT_LOGOS} />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
