import type { Metadata } from 'next';
import Link from 'next/link';
import { ADDRESS, EMAIL, PHONE_DISPLAY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'מדיניות פרטיות',
  description: 'מדיניות הפרטיות המעודכנת של סקיצה אריזות.',
  alternates: {
    canonical: '/privacy',
    languages: {
      'he-IL': '/privacy',
    },
  },
  openGraph: {
    title: 'מדיניות פרטיות - סקיצה אריזות',
    description: 'מדיניות הפרטיות המעודכנת של סקיצה אריזות.',
    url: '/privacy',
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

const LAST_UPDATED = '2 במרץ 2026';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_rgba(247,250,255,0.96),_rgba(255,255,255,1)_30%,_rgba(247,250,255,0.88)_100%)] px-4 pt-6 pb-16 sm:pt-8 sm:pb-20">
      <div className="mx-auto max-w-4xl rounded-[1.8rem] border border-slate-200/90 bg-white p-7 shadow-[0_22px_60px_-52px_rgba(15,23,42,0.18)] sm:p-9">
        <h1 className="text-primary mb-4 text-3xl font-black">
          מדיניות פרטיות
        </h1>
        <p className="text-foreground/62 mb-8 text-sm">
          עודכן לאחרונה: {LAST_UPDATED}
        </p>
        <div className="text-foreground/88 space-y-6 text-base leading-relaxed">
          <section>
            <h2 className="text-primary mb-2 text-xl font-bold">1. מבוא</h2>
            <p>
              סקיצה אריזות מכבדת את פרטיות המשתמשים ומתחייבת לטיפול אחראי במידע
              אישי בהתאם לדין החל בישראל. מסמך זה מתאר איזה מידע נאסף באתר,
              לאילו מטרות הוא משמש, עם מי הוא עשוי להיות משותף, ומהן זכויותיכם.
            </p>
          </section>

          <section>
            <h2 className="text-primary mb-2 text-xl font-bold">
              2. בעל האתר ופרטי התקשרות
            </h2>
            <p>
              מפעיל האתר: סקיצה אריזות
              <br />
              כתובת: {ADDRESS}
              <br />
              טלפון: <bdi>{PHONE_DISPLAY}</bdi>
              <br />
              דוא&quot;ל: {EMAIL}
            </p>
          </section>

          <section>
            <h2 className="text-primary mb-2 text-xl font-bold">
              3. איזה מידע נאסף
            </h2>
            <ul className="list-inside list-disc space-y-1">
              <li>
                פרטי יצירת קשר שנמסרים בטופס: שם, טלפון, דוא&quot;ל וסוג פנייה.
              </li>
              <li>
                נתונים טכניים בסיסיים: סוג דפדפן, כתובת IP, זמני גישה ודפי אתר
                שנצפו.
              </li>
              <li>
                נתוני מדידה ושיווק באמצעות Cookies וכלי אנליטיקה (כאשר מופעלים
                באתר).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-primary mb-2 text-xl font-bold">
              4. מטרות השימוש במידע
            </h2>
            <ul className="list-inside list-disc space-y-1">
              <li>מענה לפניות והכנת הצעות מחיר.</li>
              <li>ניהול קשר עם לקוחות ושירות לקוחות.</li>
              <li>מדידת ביצועי האתר ושיפור חוויית המשתמש.</li>
              <li>אבטחת האתר, מניעת הונאות וטיפול בתקלות.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-primary mb-2 text-xl font-bold">
              5. בסיס חוקי לעיבוד מידע
            </h2>
            <p>
              עיבוד המידע מתבצע לפי הדין החל ובהתאם לצורך במתן שירות, ניהול קשר
              עסקי, הגנה על אינטרסים לגיטימיים של האתר, ובהתבסס על הסכמה במקרים
              המתאימים (למשל רכיבי מדידה/שיווק הכפופים להסכמה).
            </p>
          </section>

          <section>
            <h2 className="text-primary mb-2 text-xl font-bold">
              6. שיתוף מידע עם צדדים שלישיים
            </h2>
            <p>
              איננו מוכרים מידע אישי לצדדים שלישיים. מידע עשוי להיות מועבר לספקי
              שירות חיצוניים רק לצורך תפעול האתר והשירותים.
            </p>
            <p className="mt-2">
              שיתוף כזה נעשה במידה הנדרשת בלבד, בהתאם למדיניות הספקים הרלוונטיים
              ולהוראות הדין.
            </p>
          </section>

          <section>
            <h2 className="text-primary mb-2 text-xl font-bold">
              7. העברת מידע מחוץ לישראל
            </h2>
            <p>
              חלק מספקי השירות עשויים לאחסן או לעבד מידע בשרתים מחוץ לישראל.
              בשימוש בשירותים אלה אנו פועלים באופן סביר כדי לצמצם סיכונים ולשמור
              על רמת הגנה הולמת למידע.
            </p>
          </section>

          <section>
            <h2 className="text-primary mb-2 text-xl font-bold">
              8. אבטחת מידע
            </h2>
            <p>
              האתר נוקט אמצעים טכניים וארגוניים מקובלים לצמצום סיכוני גישה בלתי
              מורשית, שינוי או חשיפה של מידע. עם זאת, אין אפשרות להבטיח אבטחה
              מוחלטת בכל מערכת מקוונת.
            </p>
          </section>

          <section>
            <h2 className="text-primary mb-2 text-xl font-bold">
              9. שמירת מידע
            </h2>
            <p>
              פרטי פנייה נשמרים למשך הזמן הנדרש לטיפול בפנייה, ניהול קשר עסקי
              ועמידה בדרישות דין. האתר אינו מפעיל מאגר לידים ייעודי באתר עצמו,
              וספקי תשתית עשויים לשמור לוגים טכניים לפרקי זמן מוגבלים.
            </p>
          </section>

          <section>
            <h2 className="text-primary mb-2 text-xl font-bold">
              10. עוגיות (Cookies) ומדידה
            </h2>
            <p>
              האתר משתמש בעוגיות וטכנולוגיות דומות לצורך תפעול תקין, אבטחה,
              מדידת ביצועים ושיפור חוויית שימוש. ניתן לנהל או לחסום עוגיות דרך
              הגדרות הדפדפן. חסימת עוגיות עשויה להשפיע על חלק מפונקציונליות
              האתר.
            </p>
          </section>

          <section>
            <h2 className="text-primary mb-2 text-xl font-bold">
              11. זכויותיכם
            </h2>
            <p>
              בכפוף לדין, ניתן לפנות אלינו בבקשה לעיון במידע אישי, תיקון מידע
              שגוי, מחיקה או הגבלת שימוש במידע. ניתן גם להתנגד לשימושים מסוימים
              ולבקש הבהרות לגבי אופן העיבוד.
            </p>
          </section>

          <section>
            <h2 className="text-primary mb-2 text-xl font-bold">
              12. שינויים במדיניות
            </h2>
            <p>
              אנו רשאים לעדכן מדיניות זו מעת לעת. התאריך בראש העמוד מציין את
              מועד העדכון האחרון. שימוש מתמשך באתר לאחר עדכון מהווה הסכמה
              למדיניות בנוסחה המעודכן.
            </p>
          </section>

          <section>
            <h2 className="text-primary mb-2 text-xl font-bold">
              13. יצירת קשר בנושא פרטיות
            </h2>
            <p>
              לכל שאלה או בקשה בנושא פרטיות ניתן לפנות אלינו:
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
