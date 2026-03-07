"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  COOKIE_CONSENT_TEXT,
  COOKIE_CONSENT_LINK_LABEL,
  COOKIE_CONSENT_BUTTON,
  COOKIE_CONSENT_STORAGE_KEY,
} from "@/lib/constants";

function subscribe(callback: () => void) {
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

function getClientSnapshot() {
  try {
    return localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

export function CookieConsent() {
  const [acceptedNow, setAcceptedNow] = useState(false);
  const storedAccepted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );
  const accepted = acceptedNow || storedAccepted;

  function handleAccept() {
    try {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, "true");
      window.dispatchEvent(new Event("cookie-consent-sync"));
    } catch {
      // ignore
    }
    setAcceptedNow(true);
  }

  if (accepted) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="הודעת קוקיות"
      className="cookie-consent-banner fixed inset-x-3 bottom-[calc(var(--floating-stack-offset)+0.45rem)] z-[65] rounded-[1.45rem] border border-primary/10 bg-white/95 px-4 py-4 shadow-[0_20px_55px_-32px_rgba(15,23,42,0.3)] backdrop-blur-xl sm:inset-x-6 sm:bottom-5 sm:rounded-[1.7rem] sm:px-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-center text-sm leading-relaxed text-foreground/78 sm:text-start">
          {COOKIE_CONSENT_TEXT}
          <Link href="/privacy" className="font-medium text-primary underline hover:no-underline">
            {COOKIE_CONSENT_LINK_LABEL}
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={handleAccept}
          className="min-h-[44px] shrink-0 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {COOKIE_CONSENT_BUTTON}
        </button>
      </div>
    </div>
  );
}
