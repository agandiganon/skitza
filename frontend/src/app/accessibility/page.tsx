import type { Metadata } from "next";
import Link from "next/link";
import { ADDRESS, EMAIL, PHONE_DISPLAY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
  description: "הצהרת הנגישות של אתר סקיצה אריזות.",
  alternates: {
    canonical: "/accessibility",
  },
};

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 px-4 pt-6 pb-16 sm:pt-8 sm:pb-20">
      <div className="mx-auto max-w-4xl rounded-2xl border-2 border-blue-100 bg-white/80 p-8 shadow-lg ring-1 ring-blue-50 sm:p-10">
        <h1 className="mb-6 text-3xl font-bold text-primary">הצהרת נגישות</h1>
        <div className="space-y-6 text-base leading-relaxed text-foreground/90">
          <section>
            <h2 className="mb-2 text-xl font-bold text-primary">מחויבות לנגישות</h2>
            <p>
              סקיצה אריזות פועלת כדי לאפשר גלישה נוחה ושוויונית לכלל המשתמשים, כולל אנשים עם
              מוגבלויות, באמצעות התאמות נגישות באתר.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-primary">תקנים והנחיות</h2>
            <p>
              ההתאמות בוצעו לפי תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות),
              התשע&quot;ג-2013, ובהתאם לתקן הישראלי ת&quot;י 5568 המבוסס על הנחיות WCAG.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-primary">שימוש באתר נגיש</h2>
            <p>
              ניתן לנווט באתר באמצעות מקלדת (Tab, Shift+Tab, Enter, Esc ומקשי חיצים), וכן
              בעזרת טכנולוגיות מסייעות כגון תוכנות הקראת מסך.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-primary">תאימות דפדפנים</h2>
            <p>
              האתר נבדק לפעילות מיטבית בדפדפנים הנפוצים: Chrome, Firefox, Safari, Edge ודפדפנים
              עדכניים נוספים. מומלץ להשתמש בדפדפן מעודכן לקבלת חוויית נגישות מיטבית.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-primary">רכיב נגישות באתר</h2>
            <p>
              באתר מוטמע רכיב נגישות המאפשר התאמות תצוגה ושימוש, כולל שיפור קריאות, ניווט
              מקלדת והדגשת אלמנטים.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold text-primary">פניות בנושא נגישות</h2>
            <p>
              אם נתקלתם בקושי נגישות, נשמח לקבל פנייה ולשפר:
              <br />
              טלפון: {PHONE_DISPLAY}
              <br />
              דוא&quot;ל: {EMAIL}
              <br />
              כתובת: {ADDRESS}
            </p>
          </section>

          <p className="pt-4">
            <Link href="/" className="font-medium text-primary underline hover:no-underline">
              חזרה לדף הבית
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
