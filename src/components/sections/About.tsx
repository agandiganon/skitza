import Link from "next/link";

const HOME_ABOUT_PARAGRAPHS = [
  "סקיצה אריזות היא בית דפוס בחולון המתמחה בייעוץ, תכנון וייצור אריזות וקרטונים ממותגים לעסקים בכל סדר גודל. אנחנו מלווים כל פרויקט באופן אישי ומתרגמים צורך עסקי לפתרון אריזה פרקטי, מדויק וממותג.",
  "העבודה שלנו משלבת חשיבה שיווקית, תכנון מבני נכון ויכולות ייצור מתקדמות במפעל עצמו. המטרה היא לא רק אריזה שנראית טוב, אלא אריזה שעובדת נכון על המדף, בלוגיסטיקה ובחוויה שהלקוח מקבל.",
];

const HOME_ABOUT_POINTS = [
  "תכנון, עיצוב וייצור תחת קורת גג אחת",
  "התאמת חומרי גלם לפי מוצר, תקציב ולוגיסטיקה",
  "ליווי אישי וזמינות גבוהה לאורך כל הפרויקט",
  "עמידה בזמני אספקה וגימור מוקפד בכל כמות",
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="home-about-heading"
      className="bg-gradient-to-b from-blue-50 via-blue-50/70 to-blue-100/60 px-4 py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] border border-blue-200/70 bg-white/85 p-6 shadow-[0_24px_70px_-45px_rgba(31,78,161,0.58)] backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="mx-auto mb-5 h-1 w-28 rounded-full bg-gradient-to-r from-primary to-accent-cyan" />

          <h2
            id="home-about-heading"
            className="text-center text-4xl font-black tracking-tight text-primary sm:text-5xl"
          >
            אודות סקיצה
          </h2>

          <div className="mt-6 space-y-4 text-center text-[1.06rem] leading-relaxed text-foreground/90">
            {HOME_ABOUT_PARAGRAPHS.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {HOME_ABOUT_POINTS.map((point) => (
              <li
                key={point}
                className="rounded-xl border border-blue-100 bg-blue-50/55 px-4 py-3 text-center text-sm font-semibold text-primary"
              >
                {point}
              </li>
            ))}
          </ul>

          <p className="mt-7 text-center">
            <Link
              href="/about"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border-2 border-primary px-7 py-2.5 font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              קרא עוד אודות המפעל
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
