export const PHONE_DISPLAY = "054-4282449";
export const PHONE_TEL = "0544282449";
export const WA_PHONE = "972544282449";
export const ADDRESS = "המעיין 4, חולון";
export const ADDRESS_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=%D7%94%D7%9E%D7%A2%D7%99%D7%99%D7%9F+4+%D7%97%D7%95%D7%9C%D7%95%D7%9F";
export const EMAIL = "info@skitza-pack.co.il";

export const SERVICE_PAGES = [
  {
    key: "print",
    label: "הפקות דפוס ואריזות",
    href: "/services/print",
    contactValue: "הפקות דפוס ואריזות",
  },
  {
    key: "3d",
    label: "הדמיות 3D",
    href: "/services/3d",
    contactValue: "הדמיות 3D",
  },
  {
    key: "promotional-design",
    label: "תכנון ועיצוב מוצרי פרסום",
    href: "/services/promotional-design",
    contactValue: "תכנון ועיצוב מוצרי פרסום",
  },
  {
    key: "consultancy",
    label: "תכנון אריזה למוצר קיים/חדש",
    href: "/services/consultancy",
    contactValue: "תכנון אריזה למוצר קיים/חדש",
  },
] as const;

export const CONTACT_SERVICE_OPTIONS = [
  "הפקות דפוס ואריזות",
  "הדמיות 3D",
  "תכנון ועיצוב מוצרי פרסום",
  "תכנון אריזה למוצר קיים/חדש",
  "אפשרות אחרת",
] as const;

export type ServicePageKey = (typeof SERVICE_PAGES)[number]["key"];

export function getContactServiceValueFromQuery(serviceKey: string | null | undefined) {
  if (!serviceKey) {
    return null;
  }

  const normalizedKey = serviceKey.trim().toLowerCase();
  const match = SERVICE_PAGES.find((service) => service.key === normalizedKey);
  return match?.contactValue ?? null;
}

/** Cookie consent bar (link text to privacy page) */
export const COOKIE_CONSENT_TEXT =
  'אנו משתמשים בקבצי קוקיז וטכנולוגיות ניטור כדי לאפשר לאתר לפעול, לשפר חווית משתמש ולסייע בשיווק. למידע נוסף ראו ';
export const COOKIE_CONSENT_LINK_LABEL = "מדיניות פרטיות";
export const COOKIE_CONSENT_BUTTON = "הבנתי";
export const COOKIE_CONSENT_STORAGE_KEY = "skitza-cookie-consent";
