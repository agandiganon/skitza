export const PHONE_DISPLAY = '054-4282449';
export const PHONE_TEL = '0544282449';
export const WA_PHONE = '972544282449';
export const WHATSAPP_MESSAGE_CONTACT =
  'שלום סקיצה אריזות, הגעתי מהאתר ואשמח לדבר על תכנון, עיצוב או הצעת מחיר.';
export const WHATSAPP_CONTACT_URL = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE_CONTACT)}`;
export const ADDRESS = 'המעיין 4, חולון';
export const ADDRESS_MAP_URL =
  'https://www.google.com/maps/search/?api=1&query=%D7%94%D7%9E%D7%A2%D7%99%D7%99%D7%9F+4+%D7%97%D7%95%D7%9C%D7%95%D7%9F';
export const EMAIL = 'info@skitza-pack.co.il';
export const BUSINESS_PRICE_RANGE = '$$';
export const BUSINESS_OPENING_HOURS = ['Su-Th 09:00-17:00'] as const;

export const CONTACT_SERVICE_CHOICES = [
  {
    key: 'product-design',
    label: 'תכנון ועיצוב מוצר',
  },
  {
    key: 'existing-product-quote',
    label: 'הצעת מחיר למוצר קיים',
  },
  {
    key: 'new-product-quote',
    label: 'הצעת מחיר למוצר חדש',
  },
  {
    key: 'other',
    label: 'אפשרות אחרת',
  },
] as const;

export type ContactServiceKey = (typeof CONTACT_SERVICE_CHOICES)[number]['key'];
export type ContactServiceLabel =
  (typeof CONTACT_SERVICE_CHOICES)[number]['label'];

export const SERVICE_PAGES = [
  {
    key: 'print',
    label: 'הפקות דפוס ואריזות',
    href: '/services/print',
    contactServiceKey: 'existing-product-quote',
  },
  {
    key: '3d',
    label: 'הדמיות 3D',
    href: '/services/3d',
    contactServiceKey: 'new-product-quote',
  },
  {
    key: 'promotional-design',
    label: 'תכנון ועיצוב מוצרי פרסום',
    href: '/services/promotional-design',
    contactServiceKey: 'product-design',
  },
  {
    key: 'consultancy',
    label: 'תכנון אריזה למוצר קיים/חדש',
    href: '/services/consultancy',
    contactServiceKey: 'new-product-quote',
  },
] as const;

export const CONTACT_SERVICE_OPTIONS = CONTACT_SERVICE_CHOICES.map(
  (choice) => choice.label,
) as readonly ContactServiceLabel[];

export type ServicePageKey = (typeof SERVICE_PAGES)[number]['key'];

const CONTACT_SERVICE_ALIASES: Record<ContactServiceKey, readonly string[]> = {
  'product-design': [
    'design',
    'product-design',
    'product-design-request',
    'תכנון ועיצוב מוצר',
  ],
  'existing-product-quote': [
    'existing',
    'existing-product',
    'existing-product-quote',
    'quote-existing-product',
    'מוצר קיים',
  ],
  'new-product-quote': [
    'new',
    'new-product',
    'new-product-quote',
    'quote-new-product',
    'מוצר חדש',
  ],
  other: ['other', 'אפשרות אחרת'],
};

function normalizeLookupValue(value: string) {
  return value.trim().toLowerCase();
}

export function getContactServiceChoiceByKey(
  key: ContactServiceKey | null | undefined,
) {
  if (!key) {
    return null;
  }

  return CONTACT_SERVICE_CHOICES.find((choice) => choice.key === key) ?? null;
}

export function getContactServiceLabelByKey(
  key: ContactServiceKey | null | undefined,
): ContactServiceLabel | null {
  return getContactServiceChoiceByKey(key)?.label ?? null;
}

export function getContactServiceHref(key: ContactServiceKey) {
  return `/contact?service=${key}#contact-form`;
}

export function getContactServiceKeyForServicePage(
  servicePageKey: ServicePageKey,
): ContactServiceKey {
  return (
    SERVICE_PAGES.find((service) => service.key === servicePageKey)
      ?.contactServiceKey ?? 'other'
  );
}

export function getContactServiceHrefForServicePage(
  servicePageKey: ServicePageKey,
) {
  return getContactServiceHref(
    getContactServiceKeyForServicePage(servicePageKey),
  );
}

export function getContactServiceKeyFromQuery(
  serviceKey: string | null | undefined,
) {
  if (!serviceKey) {
    return null;
  }

  const normalizedKey = normalizeLookupValue(serviceKey);

  const directChoice = CONTACT_SERVICE_CHOICES.find((choice) => {
    return (
      normalizeLookupValue(choice.key) === normalizedKey ||
      normalizeLookupValue(choice.label) === normalizedKey ||
      CONTACT_SERVICE_ALIASES[choice.key].includes(normalizedKey)
    );
  });

  if (directChoice) {
    return directChoice.key;
  }

  const servicePage = SERVICE_PAGES.find((service) => {
    return (
      normalizeLookupValue(service.key) === normalizedKey ||
      normalizeLookupValue(service.label) === normalizedKey ||
      normalizeLookupValue(service.href) === normalizedKey
    );
  });

  return servicePage?.contactServiceKey ?? null;
}

export function getContactServiceValueFromQuery(
  serviceKey: string | null | undefined,
) {
  return getContactServiceLabelByKey(getContactServiceKeyFromQuery(serviceKey));
}

/** Cookie consent bar (link text to privacy page) */
export const COOKIE_CONSENT_TEXT =
  'האתר משתמש בקבצי קוקיז לצורך תפעול ומדידה. פרטים נוספים ב־';
export const COOKIE_CONSENT_LINK_LABEL = 'מדיניות פרטיות';
export const COOKIE_CONSENT_ACCEPT_BUTTON = 'הבנתי';
export const COOKIE_CONSENT_STORAGE_KEY = 'skitza-cookie-consent';
