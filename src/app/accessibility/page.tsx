import type { Metadata } from 'next';
import Link from 'next/link';
import { ADDRESS, EMAIL, PHONE_DISPLAY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'הצהרת נגישות',
  description: 'הצהרת הנגישות של אתר סקיצה אריזות.',
  alternates: {
    canonical: '/accessibility',
    languages: {
      'he-IL': '/accessibility',
    },
  },
  openGraph: {
    title: 'הצהרת נגישות - סקיצה אריזות',
    description: 'הצהרת הנגישות של אתר סקיצה אריזות.',
    url: '/accessibility',
    locale: 'he_IL',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'סקיצה אריזות - בית דפוס לאריזות בחולון',
      },
    ],
  },
};

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_rgba(247,250,255,0.96),_rgba(255,255,255,1)_30%,_rgba(247,250,255,0.88)_100%)] px-4 pt-6 pb-16 sm:pt-8 sm:pb-20">
      <div className="mx-auto max-w-4xl rounded-[1.8rem] border border-slate-200/90 bg-white p-7 shadow-[0_22px_60px_-52px_rgba(15,23,42,0.18)] sm:p-9">
        <h1 className="text-primary mb-6 text-3xl font-black">הצהרת נגישות</h1>
        <div className="text-foreground/88 space-y-6 text-base leading-relaxed">
          <section>
            <h2 className="text-primary mb-2 text-xl font-bold">
              מחויבות לנגישות
            </h2>
            <p>
              סקיצה אריזות פועלת כדי לאפשר גלישה נוחה ושוויונית לכלל המשתמשים,
              כולל אנשים עם מוגבלויות, באמצעות התאמות נגישות באתר.
            </p>
          </section>

          <section>
            <h2 className="text-primary mb-2 text-xl font-bold">
              תקנים והנחיות
            </h2>
            <p>
              ההתאמות בוצעו לפי תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות
              נגישות לשירות), התשע&quot;ג-2013, ובהתאם לתקן הישראלי ת&quot;י
              5568 המבוסס על הנחיות WCAG.
            </p>
          </section>

          <section>
            <h2 className="text-primary mb-2 text-xl font-bold">
              שימוש באתר נגיש
            </h2>
            <p>
              ניתן לנווט באתר באמצעות מקלדת (Tab, Shift+Tab, Enter, Esc ומקשי
              חיצים), וכן בעזרת טכנולוגיות מסייעות כגון תוכנות הקראת מסך.
            </p>
          </section>

          <section>
            <h2 className="text-primary mb-2 text-xl font-bold">
              תאימות דפדפנים
            </h2>
            <p>
              האתר נבדק לפעילות מיטבית בדפדפנים הנפוצים: Chrome, Firefox,
              Safari, Edge ודפדפנים עדכניים נוספים. מומלץ להשתמש בדפדפן מעודכן
              לקבלת חוויית נגישות מיטבית.
            </p>
          </section>

          <section>
            <h2 className="text-primary mb-2 text-xl font-bold">
              רכיב נגישות באתר
            </h2>
            <p>
              באתר מוטמע רכיב נגישות המאפשר התאמות תצוגה ושימוש, כולל שיפור
              קריאות, ניווט מקלדת והדגשת אלמנטים.
            </p>
          </section>

          <section>
            <h2 className="text-primary mb-2 text-xl font-bold">
              פניות בנושא נגישות
            </h2>
            <p>
              אם נתקלתם בקושי נגישות, נשמח לקבל פנייה ולשפר:
              <br />
              טלפון: <bdi>{PHONE_DISPLAY}</bdi>
              <br />
              דוא&quot;ל: {EMAIL}
              <br />
              כתובת: {ADDRESS}
            </p>
          </section>

          <p className="pt-4">
            <Link
              href="/"
              className="text-primary font-medium underline hover:no-underline"
            >
              חזרה לדף הבית
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
