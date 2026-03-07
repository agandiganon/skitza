import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: readonly BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="פירורי דרך"
      className={`mb-6 rounded-full border border-blue-100 bg-white/80 px-4 py-3 shadow-[0_14px_42px_-34px_rgba(15,23,42,0.38)] backdrop-blur-sm ${className}`.trim()}
    >
      <ol className="flex flex-wrap items-center gap-2 text-sm font-medium text-foreground/70">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden className="text-blue-400">/</span> : null}
              {item.href && !isLast ? (
                <Link href={item.href} className="transition hover:text-primary hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? "font-bold text-primary" : ""}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
