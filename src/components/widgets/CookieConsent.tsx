'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import {
  COOKIE_CONSENT_TEXT,
  COOKIE_CONSENT_LINK_LABEL,
  COOKIE_CONSENT_ACCEPT_BUTTON,
  COOKIE_CONSENT_REJECT_BUTTON,
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
    setCookieConsentChoice('accepted');
  }

  function handleReject() {
    setCookieConsentChoice('rejected');
  }

  if (consentChoice) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="הודעת קוקיות"
      className="cookie-consent-banner fixed right-3 bottom-[calc(var(--floating-stack-offset)+0.35rem)] left-[4.6rem] z-[63] rounded-[1.2rem] border border-slate-200/90 bg-white/92 px-3 py-2.5 shadow-[0_16px_42px_-28px_rgba(15,23,42,0.24)] backdrop-blur-xl sm:right-auto sm:bottom-4 sm:left-20 sm:w-[min(86vw,440px)] sm:translate-x-0 sm:rounded-[1.2rem] sm:px-3 sm:py-2"
    >
      <div className="mx-auto flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-2.5">
        <div className="min-w-0 flex-1">
          <p className="text-foreground/76 text-[0.78rem] leading-relaxed sm:text-start sm:text-[0.74rem] sm:leading-5">
            {COOKIE_CONSENT_TEXT}
            <Link
              href="/privacy"
              className="text-primary font-semibold underline decoration-blue-300 underline-offset-3 transition hover:text-blue-700 hover:no-underline"
            >
              {COOKIE_CONSENT_LINK_LABEL}
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap justify-end gap-2 sm:justify-start">
          <button
            type="button"
            onClick={handleReject}
            className="inline-flex min-h-[38px] items-center justify-center rounded-full border border-slate-300/90 bg-white/90 px-3.5 py-2 text-[13px] font-semibold text-slate-700 shadow-[0_10px_22px_-18px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 focus:outline-none active:translate-y-0 active:scale-[0.99] sm:min-h-[34px] sm:px-3 sm:py-1.5 sm:text-[12px]"
          >
            {COOKIE_CONSENT_REJECT_BUTTON}
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="bg-primary text-primary-foreground focus:ring-primary inline-flex min-h-[38px] items-center justify-center rounded-full px-3.5 py-2 text-[13px] font-semibold shadow-[0_12px_24px_-18px_rgba(30,58,95,0.45)] transition hover:-translate-y-0.5 hover:opacity-95 focus:ring-2 focus:ring-offset-2 focus:outline-none active:translate-y-0 active:scale-[0.99] sm:min-h-[34px] sm:px-3 sm:py-1.5 sm:text-[12px]"
          >
            {COOKIE_CONSENT_ACCEPT_BUTTON}
          </button>
        </div>
      </div>
    </div>
  );
}
