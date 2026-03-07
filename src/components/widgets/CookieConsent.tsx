"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
    <AnimatePresence>
      <motion.div
        className="fixed inset-x-3 bottom-[calc(var(--mobile-sticky-bar-height)+env(safe-area-inset-bottom)+0.65rem)] z-[65] rounded-[1.6rem] border border-primary/12 bg-white/94 px-4 py-4 shadow-[0_20px_55px_-32px_rgba(15,23,42,0.36)] backdrop-blur-xl sm:inset-x-6 sm:bottom-5 sm:rounded-[1.7rem] sm:px-6"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-center text-sm text-foreground sm:text-start">
            {COOKIE_CONSENT_TEXT}
            <Link
              href="/privacy"
              className="font-medium text-primary underline hover:no-underline"
            >
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
      </motion.div>
    </AnimatePresence>
  );
}
