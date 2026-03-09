"use client";

import { useSyncExternalStore } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  getCookieConsentClientSnapshot,
  getCookieConsentServerSnapshot,
  hasAnalyticsConsent,
  subscribeToCookieConsent,
} from "@/lib/consent";

type AnalyticsGateProps = {
  enableSpeedInsights?: boolean;
};

export function AnalyticsGate({ enableSpeedInsights = false }: AnalyticsGateProps) {
  const consentChoice = useSyncExternalStore(
    subscribeToCookieConsent,
    getCookieConsentClientSnapshot,
    getCookieConsentServerSnapshot
  );

  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      {hasAnalyticsConsent(consentChoice) ? <Analytics /> : null}
      {enableSpeedInsights ? <SpeedInsights /> : null}
    </>
  );
}
