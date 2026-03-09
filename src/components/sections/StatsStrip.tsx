const STATS_ITEMS = [
  {
    value: '+500,000',
    label: 'אריזות שיוצרו עד כה',
    variant: 'ribbon',
  },
  {
    value: '+1,000',
    label: 'לקוחות מרוצים',
    variant: 'spotlight',
  },
  {
    value: '30',
    label: 'שנות ניסיון בתעשייה',
    variant: 'frame',
  },
] as const;

export function StatsStrip() {
  return (
    <section
      id="stats"
      aria-labelledby="home-stats-heading"
      className="cv-auto stats-workshop-section px-4 py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto max-w-7xl">
        <h2 id="home-stats-heading" className="sr-only">
          נתוני סקיצה
        </h2>
        <div className="stats-workshop">
          <div className="stats-workshop__frame rounded-[30px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <div className="stats-workshop__modules grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
              {STATS_ITEMS.map((item) => (
                <article
                  key={item.label}
                  dir="rtl"
                  className={`stats-module stats-module--${item.variant} px-4 py-5 sm:px-6 sm:py-6 lg:px-8`}
                >
                  <div className="stats-module__content">
                    <p className="stats-module__value text-[clamp(2.3rem,4.8vw,5.2rem)] leading-none font-black tracking-tight">
                      {item.value}
                    </p>
                    <p className="stats-module__label mt-2 text-[0.98rem] leading-snug sm:mt-3 sm:text-[1.22rem]">
                      {item.label}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
