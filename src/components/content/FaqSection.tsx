import type { FaqItem } from '@/types/faq';

type FaqSectionProps = {
  title?: string;
  intro?: string;
  items: readonly FaqItem[];
  id?: string;
  className?: string;
};

export function FaqSection({
  title = 'שאלות נפוצות',
  intro,
  items,
  id = 'faq',
  className = '',
}: FaqSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`cv-auto rounded-[2rem] border border-blue-100 bg-white/92 p-6 shadow-[0_22px_60px_-40px_rgba(15,23,42,0.32)] sm:p-8 ${className}`.trim()}
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id={`${id}-heading`}
          className="text-primary text-3xl font-black tracking-tight sm:text-4xl"
        >
          {title}
        </h2>
        {intro ? (
          <p className="text-foreground/75 mt-3 max-w-3xl text-base leading-relaxed sm:text-lg">
            {intro}
          </p>
        ) : null}

        <div className="mt-6 space-y-3">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-[1.35rem] border border-blue-100 bg-blue-50/55 px-5 py-4 transition hover:border-blue-200 hover:bg-white"
            >
              <summary className="text-primary focus-visible:ring-primary cursor-pointer list-none rounded-xl text-lg font-bold marker:hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none">
                <span className="flex items-start justify-between gap-4">
                  <span>{item.question}</span>
                  <span
                    className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-blue-700 shadow-sm transition group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="text-foreground/80 mt-4 border-t border-blue-100 pt-4 leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
