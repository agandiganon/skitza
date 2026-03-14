'use client';

import Script from 'next/script';

function getValidGtmId(): string | null {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();

  if (!gtmId) return null;
  if (!/^GTM-[A-Z0-9]+$/i.test(gtmId)) return null;
  if (/^GTM-X+$/i.test(gtmId)) return null;

  return gtmId;
}

export function GtmHeadScript() {
  const gtmId = getValidGtmId();

  if (!gtmId) return null;

  return (
    <Script
      id="gtm-base"
      src={`/gtm-loader?id=${encodeURIComponent(gtmId)}`}
      strategy="afterInteractive"
    />
  );
}

export function GtmBodyFallback() {
  const gtmId = getValidGtmId();

  if (!gtmId) return null;

  return (
    <noscript>
      <iframe
        title="Google Tag Manager"
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        className="gtm-noscript-frame"
      />
    </noscript>
  );
}
