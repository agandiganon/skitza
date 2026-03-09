import Link from "next/link";

const HOME_ABOUT_PARAGRAPHS = [
  "סקיצה אריזות היא בית דפוס בחולון המתמחה בייעוץ, תכנון וייצור אריזות וקרטונים ממותגים לעסקים בכל סדר גודל. כל פרויקט מתחיל מהבנה של המוצר, המותג והצרכים בפועל, וממשיך לפתרון מדויק שנראה טוב וגם עובד נכון.",
  "אנחנו משלבים חשיבה שיווקית, תכנון מבני ויכולת ייצור במפעל עצמו, כדי ללוות את הדרך משלב הרעיון ועד לתוצאה סופית שמרגישה מסודרת, מקצועית ועקבית.",
];

const HOME_ABOUT_HIGHLIGHTS = [
  {
    title: "מקום אחד לכל התהליך",
    body: "תכנון, עיצוב וייצור תחת קורת גג אחת, בלי לפזר אחריות בין כמה גורמים.",
  },
  {
    title: "התאמה נכונה למוצר",
    body: "בחירת מבנה, חומרי גלם וגימור בהתאם למוצר, לתקציב ולדרך שבה הוא אמור להימכר ולהישלח.",
  },
  {
    title: "ליווי אישי לאורך הדרך",
    body: "תקשורת ישירה, עבודה מסודרת וזמינות גבוהה כדי לקדם את הפרויקט בלי רעש מיותר.",
  },
] as const;

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="home-about-heading"
      className="cv-auto overflow-hidden bg-[linear-gradient(180deg,_rgba(242,247,255,0.96),_rgba(255,255,255,1)_55%,_rgba(239,246,255,0.7))] px-4 py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2.4rem] border border-blue-100/80 bg-white/92 p-6 shadow-[0_28px_90px_-52px_rgba(15,23,42,0.32)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
            <div className="relative">
              <div
                className="pointer-events-none absolute -right-12 top-0 h-40 w-40 rounded-full bg-cyan-300/16 blur-3xl"
                aria-hidden
              />
              <div className="relative">
                <p className="text-sm font-black uppercase tracking-[0.26em] text-blue-700/75">
                  אודות
                </p>
                <h2
                  id="home-about-heading"
                  className="mt-4 max-w-2xl text-4xl font-black tracking-tight text-primary sm:text-5xl"
                >
                  פתרונות אריזה שנבנים נכון מהשלב הראשון
                </h2>
                <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-foreground/80">
                  {HOME_ABOUT_PARAGRAPHS.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <p className="mt-7">
                  <Link
                    href="/about"
                    data-track-event="cta_click"
                    data-track-placement="home_about"
                    data-track-label="home_about_more"
                    className="inline-flex min-h-[46px] items-center justify-center rounded-2xl border border-primary/20 bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-24px_rgba(30,64,175,0.46)] transition hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    קראו עוד על סקיצה
                  </Link>
                </p>
              </div>
            </div>

            <div className="grid gap-3">
              {HOME_ABOUT_HIGHLIGHTS.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-[1.6rem] border border-blue-100/80 bg-[linear-gradient(180deg,_rgba(255,255,255,1),_rgba(239,246,255,0.82))] p-5 shadow-[0_18px_46px_-38px_rgba(15,23,42,0.3)]"
                >
                  <span className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full bg-blue-100 px-3 text-xs font-black text-blue-700">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 text-xl font-black text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/74">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
