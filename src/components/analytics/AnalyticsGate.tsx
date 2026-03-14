'use client';

import { useSyncExternalStore } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import {
  getCookieConsentClientSnapshot,
  getCookieConsentServerSnapshot,
  hasAcceptedCookieConsent,
  subscribeToCookieConsent,
} from '@/lib/consent';
import {
  GtmBodyFallback,
  GtmHeadScript,
} from '@/components/analytics/GtmScripts';

type AnalyticsGateProps = {
  enableSpeedInsights?: boolean;
};

export function AnalyticsGate({
  enableSpeedInsights = false,
}: AnalyticsGateProps) {
  const consentChoice = useSyncExternalStore(
    subscribeToCookieConsent,
    getCookieConsentClientSnapshot,
    getCookieConsentServerSnapshot,
  );

  if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
    return null;
  }

  if (!hasAcceptedCookieConsent(consentChoice)) {
    return null;
  }

  return (
    <>
      <GtmHeadScript />
      <GtmBodyFallback />
      <Analytics />
      {enableSpeedInsights ? <SpeedInsights /> : null}
    </>
  );
}
