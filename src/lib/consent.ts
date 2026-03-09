import { COOKIE_CONSENT_STORAGE_KEY } from "@/lib/constants";

export type CookieConsentChoice = "accepted" | "essential";

function normalizeStoredConsent(value: string | null): CookieConsentChoice | null {
  if (value === "true" || value === "accepted") {
    return "accepted";
  }

  if (value === "essential") {
    return "essential";
  }

  return null;
}

export function subscribeToCookieConsent(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleChange = () => {
    callback();
  };

  window.addEventListener("storage", handleChange);
  window.addEventListener("cookie-consent-sync", handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener("cookie-consent-sync", handleChange);
  };
}

export function getCookieConsentClientSnapshot() {
  try {
    return normalizeStoredConsent(localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function getCookieConsentServerSnapshot() {
  return null;
}

export function setCookieConsentChoice(choice: CookieConsentChoice) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice);
    window.dispatchEvent(new Event("cookie-consent-sync"));
  } catch {
    // ignore
  }
}

export function hasAnalyticsConsent(choice: CookieConsentChoice | null) {
  return choice === "accepted";
}
