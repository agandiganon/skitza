'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  COOKIE_CONSENT_TEXT,
  COOKIE_CONSENT_LINK_LABEL,
  COOKIE_CONSENT_ACCEPT_BUTTON,
} from '@/lib/constants';
import {
  getCookieConsentClientSnapshot,
  getCookieConsentServerSnapshot,
  setCookieConsentChoice,
  subscribeToCookieConsent,
} from '@/lib/consent';

export function CookieConsent() {
  const consentChoice = useSyncExternalStore(
    subscribeToCookieConsent,
    getCookieConsentClientSnapshot,
    getCookieConsentServerSnapshot,
  );

  function handleDismiss() {
    setCookieConsentChoice('dismissed');
  }

  if (consentChoice) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="הודעת קוקיות"
      className="cookie-consent-banner border-primary/10 fixed inset-x-3 bottom-[calc(var(--floating-stack-offset)+0.45rem)] z-[65] rounded-[1.45rem] border bg-white/95 px-4 py-4 shadow-[0_20px_55px_-32px_rgba(15,23,42,0.3)] backdrop-blur-xl sm:inset-x-6 sm:bottom-5 sm:rounded-[1.7rem] sm:px-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="w-full">
          <p className="text-foreground/78 text-center text-sm leading-relaxed sm:text-start">
            {COOKIE_CONSENT_TEXT}
            <Link
              href="/privacy"
              className="text-primary font-medium underline hover:no-underline"
            >
              {COOKIE_CONSENT_LINK_LABEL}
            </Link>
            .
          </p>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:min-w-[180px]">
          <button
            type="button"
            onClick={handleDismiss}
            className="bg-primary text-primary-foreground focus:ring-primary min-h-[44px] rounded-xl px-6 py-2.5 text-sm font-medium transition hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            {COOKIE_CONSENT_ACCEPT_BUTTON}
          </button>
        </div>
      </div>
    </div>
  );
}
