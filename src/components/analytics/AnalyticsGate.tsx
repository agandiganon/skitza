"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

type AnalyticsGateProps = {
  enableSpeedInsights?: boolean;
};

export function AnalyticsGate({ enableSpeedInsights = false }: AnalyticsGateProps) {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <Analytics />
      {enableSpeedInsights ? <SpeedInsights /> : null}
    </>
  );
}
