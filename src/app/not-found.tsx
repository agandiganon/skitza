import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_rgba(243,247,255,0.94),_rgba(255,255,255,1)_36%,_rgba(238,246,255,0.86)_100%)] px-4 py-16 sm:py-20">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
        <section className="w-full rounded-[2.4rem] border border-blue-100/85 bg-white/94 p-8 text-center shadow-[0_30px_95px_-52px_rgba(15,23,42,0.36)] backdrop-blur-xl sm:p-12">
          <p className="text-sm font-black tracking-[0.28em] text-blue-700/85 uppercase">
            404
          </p>
          <h1 className="text-primary mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            העמוד שחיפשתם לא נמצא
          </h1>
          <p className="text-foreground/80 mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
            ייתכן שהכתובת השתנתה או שהעמוד כבר לא זמין. אפשר לחזור לדף הבית
            ולהמשיך משם לשירותים, לגלריה או לעמוד יצירת הקשר.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="from-accent-cyan to-primary focus:ring-primary inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-gradient-to-l via-blue-500 px-7 py-3 text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:opacity-95 focus:ring-2 focus:ring-offset-2 focus:outline-none active:translate-y-0 active:scale-[0.99]"
            >
              חזרה לדף הבית
            </Link>
            <Link
              href="/contact"
              className="text-primary focus:ring-primary inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-blue-200 bg-white px-7 py-3 text-base font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 focus:ring-2 focus:ring-offset-2 focus:outline-none active:translate-y-0 active:scale-[0.99] active:bg-blue-100"
            >
              מעבר ליצירת קשר
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
