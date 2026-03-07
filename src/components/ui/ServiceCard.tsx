import Link from "next/link";
import { type LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
}

export function ServiceCard({ title, description, icon: Icon, href }: ServiceCardProps) {
  const content = (
    <div className="group relative h-full rounded-[1.7rem] border border-blue-100 bg-white/92 p-6 shadow-[0_26px_54px_-36px_rgba(15,23,42,0.44)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_32px_62px_-34px_rgba(30,64,175,0.28)] sm:p-8">
      <div className="absolute inset-0 rounded-[1.7rem] bg-gradient-to-br from-accent-cyan/12 via-blue-100/18 to-primary/8 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-l from-accent-cyan to-blue-600 p-3 text-white shadow-md ring-4 ring-blue-50/80">
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
        </div>
        <h3 className="mb-2 text-xl font-bold text-primary sm:text-2xl">{title}</h3>
        <p className="leading-relaxed text-foreground/80">{description}</p>
        <span className="mt-5 inline-flex items-center text-sm font-semibold text-blue-700 transition group-hover:text-primary">
          לפרטים על השירות
        </span>
      </div>
    </div>
  );

  return href ? (
    <Link
      href={href}
      className="block h-full rounded-[1.7rem] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      {content}
    </Link>
  ) : (
    content
  );
}
