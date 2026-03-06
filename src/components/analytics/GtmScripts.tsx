"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { COOKIE_CONSENT_STORAGE_KEY } from "@/lib/constants";

function getValidGtmId(): string | null {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();

  if (!gtmId) return null;
  if (!/^GTM-[A-Z0-9]+$/i.test(gtmId)) return null;

  return gtmId;
}

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

export function GtmScripts() {
  const gtmId = getValidGtmId();
  const hasConsent = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  if (!gtmId || !hasConsent) return null;

  return (
    <Script id="gtm-base" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
    </Script>
  );
}
