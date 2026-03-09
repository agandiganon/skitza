# CSP Hardening Notes

הקובץ הזה מסכם את ההחלטה והמצב הנוכחי סביב `Content-Security-Policy` באתר של סקיצה אריזות.

אם בעתיד תרצה לחזור לזה, אפשר פשוט לכתוב:

- `קרא את CSP_HARDENING_NOTES.md ותמשיך משם`

## המצב הנוכחי

האתר כרגע:

- עובד תקין ב־production build
- לא זורק שגיאות קונסול בגלל CSP
- כולל `CSP` פעיל דרך [src/middleware.ts](/Users/adiganon/Desktop/apps/skitza/src/middleware.ts)
- כולל headers נוספים דרך [next.config.ts](/Users/adiganon/Desktop/apps/skitza/next.config.ts)

אבל:

- ה־`CSP` אינו בגרסת `nonce-only` מחמירה
- יש עדיין `unsafe-inline` תחת `script-src`

## למה זה ככה

הסיבה העיקרית היא ש־`Next.js` עם `App Router` ועמודים סטטיים מזריק חלק מה־runtime scripts כ־inline scripts בתוך ה־HTML.

בפועל זה כולל אזורים כמו:

- hydration/runtime של Next
- נתוני רינדור פנימיים של האפליקציה
- סקריפטים inline שנוצרים כחלק מהפלט של framework/runtime

כאשר ניסינו להחמיר את ה־`CSP` ולחסום inline scripts לגמרי:

- האתר התחיל לזרוק שגיאות `CSP`
- חלק מסקריפטי ה־runtime של Next נחסמו
- זה פגע בטעינה ובהידרציה

## מה זה אומר מבחינת אבטחה

זה לא אומר שהאתר "לא מאובטח".

זה כן אומר:

- יש `CSP`
- הוא נותן שכבת הגנה שימושית
- אבל הוא לא ברמת ההקשחה התאורטית הכי גבוהה

במילים פשוטות:

- המצב הנוכחי הוא פרקטי ויציב
- אבל לא מקסימלי מבחינת קשיחות CSP

## האם אפשר לתקן את זה

כן, אבל לא כתיקון קטן.

כדי להגיע ל־`CSP` מחמיר באמת בלי `unsafe-inline`, בדרך כלל צריך אחד מהמסלולים הבאים:

1. `nonce` דינמי לכל inline script
2. `hash` לכל inline script קבוע
3. שינוי ארכיטקטוני שמקטין מאוד את התלות ב־inline scripts של Next

באתר הזה זה לא משהו של "שורה אחת ב־config".

## מה אפשר לעשות בעתיד

### רמה 1: להשאיר כמו עכשיו

זה המצב שמומלץ כרגע אם המטרה היא:

- אתר יציב
- השקה מהירה
- SEO / Google Ads / ביצועים בלי לשבור runtime

### רמה 2: הקשחה חלקית

אפשר לבצע סבב נוסף של שיפור בלי לדרוש מעבר מלא ל־nonce-only:

- לצמצם עוד inline scripts שאנחנו שולטים בהם
- להקשיח עוד `img-src`, `connect-src`, `frame-src`
- להפעיל `Content-Security-Policy-Report-Only`
- למפות בדיוק אילו inline scripts עדיין נחוצים

זה שיפור ריאלי יחסית.

### רמה 3: CSP מחמיר באמת

זה פרויקט נפרד.

מה שצריך בו:

- מיפוי מלא של כל ה־inline scripts בפועל
- בחינה אם אפשר לעבוד עם `nonce` או `hash`
- התאמה של רכיבי analytics / GTM / JSON-LD
- בדיקת השפעה על hydration ועל build סטטי

זה דורש עבודה ארכיטקטונית, לא רק patch קטן.

## המלצה מעשית

לא לעכב את העלייה לאוויר רק בגלל זה.

המצב המומלץ כרגע:

- להשאיר את ה־CSP הנוכחי
- ואם רוצים, לבצע אחר כך סבב ייעודי של `CSP hardening`

## קבצים רלוונטיים

- [src/middleware.ts](/Users/adiganon/Desktop/apps/skitza/src/middleware.ts)
- [next.config.ts](/Users/adiganon/Desktop/apps/skitza/next.config.ts)
- [src/components/analytics/GtmScripts.tsx](/Users/adiganon/Desktop/apps/skitza/src/components/analytics/GtmScripts.tsx)
- [src/app/gtm-loader/route.ts](/Users/adiganon/Desktop/apps/skitza/src/app/gtm-loader/route.ts)
- [src/components/seo/JsonLd.tsx](/Users/adiganon/Desktop/apps/skitza/src/components/seo/JsonLd.tsx)

## ניסוח קצר לשימוש עתידי

אם בעתיד תרצה שאמשיך לעבוד בדיוק על זה, תוכל לכתוב:

- `קרא את CSP_HARDENING_NOTES.md ותן לי תוכנית להקשחת CSP`
- `קרא את CSP_HARDENING_NOTES.md ותיישם הקשחה חלקית בלבד`
- `קרא את CSP_HARDENING_NOTES.md ותכין סבב Report-Only`
