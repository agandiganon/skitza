import Link from 'next/link';

const HOME_ABOUT_PARAGRAPHS = [
  'סקיצה אריזות היא בית דפוס בחולון המתמחה בייעוץ, תכנון וייצור אריזות וקרטונים ממותגים לעסקים בכל סדר גודל. כל פרויקט מתחיל מהבנה של המוצר, המותג והצרכים בפועל, וממשיך לפתרון מדויק שנראה טוב וגם עובד נכון.',
  'אנחנו משלבים חשיבה שיווקית, תכנון מבני ויכולת ייצור במפעל עצמו, כדי ללוות את הדרך משלב הרעיון ועד לתוצאה סופית שמרגישה מסודרת, מקצועית ועקבית.',
];

const HOME_ABOUT_HIGHLIGHTS = [
  {
    title: 'מקום אחד לכל התהליך',
    body: 'תכנון, עיצוב וייצור תחת קורת גג אחת, בלי לפזר אחריות בין כמה גורמים.',
  },
  {
    title: 'התאמה נכונה למוצר',
    body: 'בחירת מבנה, חומרי גלם וגימור בהתאם למוצר, לתקציב ולדרך שבה הוא אמור להימכר ולהישלח.',
  },
  {
    title: 'ליווי אישי לאורך הדרך',
    body: 'תקשורת ישירה, עבודה מסודרת וזמינות גבוהה כדי לקדם את הפרויקט בלי רעש מיותר.',
  },
] as const;

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="home-about-heading"
      className="cv-auto overflow-hidden bg-[linear-gradient(180deg,_rgba(245,249,255,0.96),_rgba(255,255,255,1)_52%,_rgba(241,247,255,0.76))] px-4 py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2.2rem] border border-white/80 bg-white/90 p-6 shadow-[0_24px_72px_-54px_rgba(15,23,42,0.2)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start lg:gap-10">
            <div className="relative">
              <div
                className="pointer-events-none absolute top-0 -right-10 h-36 w-36 rounded-full bg-cyan-300/14 blur-3xl"
                aria-hidden
              />
              <div className="relative">
                <p className="text-sm font-black tracking-[0.26em] text-blue-700/90 uppercase">
                  אודות
                </p>
                <h2
                  id="home-about-heading"
                  className="text-primary mt-4 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl"
                >
                  פתרונות אריזה שנבנים נכון מהשלב הראשון
                </h2>
                <div className="text-foreground/82 mt-6 max-w-3xl space-y-4 text-lg leading-relaxed">
                  {HOME_ABOUT_PARAGRAPHS.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <p className="mt-8">
                  <Link
                    href="/about"
                    data-track-event="cta_click"
                    data-track-placement="home_about"
                    data-track-label="home_about_more"
                    className="border-primary/12 bg-primary focus:ring-primary inline-flex min-h-[46px] items-center justify-center rounded-2xl border px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_-24px_rgba(30,64,175,0.34)] transition hover:-translate-y-0.5 hover:brightness-105 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  >
                    קראו עוד על סקיצה
                  </Link>
                </p>
              </div>
            </div>

            <div className="grid gap-3.5">
              {HOME_ABOUT_HIGHLIGHTS.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-[1.7rem] border border-blue-100/75 bg-[linear-gradient(180deg,_rgba(255,255,255,1),_rgba(244,249,255,0.88))] p-5 shadow-[0_18px_40px_-36px_rgba(15,23,42,0.16)]"
                >
                  <span className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full bg-blue-100/80 px-3 text-xs font-black text-blue-700">
                    0{index + 1}
                  </span>
                  <h3 className="text-primary mt-4 text-xl leading-tight font-black">
                    {item.title}
                  </h3>
                  <p className="text-foreground/84 mt-2.5 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
