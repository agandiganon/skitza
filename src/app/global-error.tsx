'use client';

import Link from 'next/link';

export default function GlobalError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html lang="he-IL" dir="rtl">
      <body className="bg-slate-50 text-slate-900">
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-sky-700 uppercase">
            אירעה שגיאה
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            משהו השתבש בטעינת האתר
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
            אפשר לנסות שוב או לחזור לדף הבית.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-full bg-sky-700 px-5 py-3 font-semibold text-white transition hover:bg-sky-800 focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              נסו שוב
            </button>
            <Link
              href="/"
              className="rounded-full border border-slate-300 px-5 py-3 font-semibold transition hover:border-slate-400 hover:bg-white focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              חזרה לדף הבית
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
