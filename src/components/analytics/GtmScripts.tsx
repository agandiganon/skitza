"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import {
  getCookieConsentClientSnapshot,
  getCookieConsentServerSnapshot,
  hasAnalyticsConsent,
  subscribeToCookieConsent,
} from "@/lib/consent";

function getValidGtmId(): string | null {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();

  if (!gtmId) return null;
  if (!/^GTM-[A-Z0-9]+$/i.test(gtmId)) return null;

  return gtmId;
}

export function GtmScripts() {
  const gtmId = getValidGtmId();
  const consentChoice = useSyncExternalStore(
    subscribeToCookieConsent,
    getCookieConsentClientSnapshot,
    getCookieConsentServerSnapshot
  );

  if (!gtmId || !hasAnalyticsConsent(consentChoice)) return null;

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
