"use client";

import { useEffect } from "react";
import { pushToDataLayer } from "@/lib/analytics/datalayer";

type TrackableElement = HTMLElement & {
  dataset: DOMStringMap & {
    trackEvent?: string;
    trackPlacement?: string;
    trackLabel?: string;
    trackService?: string;
  };
};

export function InteractionTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const trackable = target?.closest<TrackableElement>("[data-track-event]");

      if (!trackable) {
        return;
      }

      const { trackEvent, trackPlacement, trackLabel, trackService } = trackable.dataset;

      if (!trackEvent) {
        return;
      }

      const href =
        trackable instanceof HTMLAnchorElement ? trackable.href : trackable.getAttribute("href");

      pushToDataLayer(trackEvent, {
        placement: trackPlacement,
        label: trackLabel,
        service_type: trackService,
        href: href ?? undefined,
        page_path: window.location.pathname,
      });
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
