'use client';

import Link from 'next/link';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main
      dir="rtl"
      className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 text-center"
    >
      <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-sky-700 uppercase">
        אירעה שגיאה
      </p>
      <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
        העמוד לא נטען כמו שצריך
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
        אפשר לנסות שוב, או לחזור לדף הבית ולהמשיך משם.
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
          className="rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          חזרה לדף הבית
        </Link>
      </div>
    </main>
  );
}
