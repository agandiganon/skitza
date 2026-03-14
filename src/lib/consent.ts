import { COOKIE_CONSENT_STORAGE_KEY } from '@/lib/constants';

const COOKIE_CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

export type CookieConsentChoice = 'accepted' | 'rejected';

function normalizeStoredConsent(
  value: string | null,
): CookieConsentChoice | null {
  if (value === 'true' || value === 'accepted' || value === 'dismissed') {
    return 'accepted';
  }

  if (value === 'false' || value === 'rejected') {
    return 'rejected';
  }

  return null;
}

function readCookieValue(cookieName: string) {
  if (typeof document === 'undefined') {
    return null;
  }

  const encodedName = encodeURIComponent(cookieName);
  const cookie = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${encodedName}=`));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.split('=').slice(1).join('='));
}

function writeConsentCookie(choice: CookieConsentChoice) {
  if (typeof document === 'undefined') {
    return;
  }

  const parts = [
    `${encodeURIComponent(COOKIE_CONSENT_STORAGE_KEY)}=${encodeURIComponent(choice)}`,
    `Max-Age=${COOKIE_CONSENT_MAX_AGE}`,
    'Path=/',
    'SameSite=Lax',
  ];

  if (window.location.protocol === 'https:') {
    parts.push('Secure');
  }

  document.cookie = parts.join('; ');
}

export function subscribeToCookieConsent(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleChange = () => {
    callback();
  };

  window.addEventListener('storage', handleChange);
  window.addEventListener('cookie-consent-sync', handleChange);

  return () => {
    window.removeEventListener('storage', handleChange);
    window.removeEventListener('cookie-consent-sync', handleChange);
  };
}

export function getCookieConsentClientSnapshot() {
  try {
    const cookieChoice = normalizeStoredConsent(
      readCookieValue(COOKIE_CONSENT_STORAGE_KEY),
    );

    if (cookieChoice) {
      return cookieChoice;
    }

    return normalizeStoredConsent(
      localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY),
    );
  } catch {
    return null;
  }
}

export function getCookieConsentServerSnapshot() {
  return null;
}

export function setCookieConsentChoice(choice: CookieConsentChoice) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice);
    writeConsentCookie(choice);
    window.dispatchEvent(new Event('cookie-consent-sync'));
  } catch {
    // ignore
  }
}

export function hasAcceptedCookieConsent(
  choice: CookieConsentChoice | null | undefined,
) {
  return choice === 'accepted';
}
