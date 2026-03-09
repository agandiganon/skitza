'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const DeferredCookieConsent = dynamic(
  () =>
    import('@/components/widgets/CookieConsent').then(
      (module) => module.CookieConsent,
    ),
  { ssr: false },
);
const DeferredAccessibilityWidget = dynamic(
  () =>
    import('@/components/widgets/AccessibilityWidget').then(
      (module) => module.AccessibilityWidget,
    ),
  { ssr: false },
);
const DeferredWhatsAppFloat = dynamic(
  () =>
    import('@/components/widgets/WhatsAppFloat').then(
      (module) => module.WhatsAppFloat,
    ),
  { ssr: false },
);

type WindowWithIdleCallback = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number },
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function DeferredWidgets() {
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [showAccessibilityWidget, setShowAccessibilityWidget] = useState(false);
  const [showWhatsAppFloat, setShowWhatsAppFloat] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowCookieConsent(true), 420);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    let activated = false;
    let fallbackTimer = 0;
    let idleHandle: number | undefined;

    const activate = () => {
      if (activated) {
        return;
      }

      activated = true;
      setShowAccessibilityWidget(true);
      if (window.matchMedia('(min-width: 640px)').matches) {
        setShowWhatsAppFloat(true);
      }
    };

    const handleInteraction = () => activate();
    const cleanupEvents = () => {
      window.removeEventListener('pointerdown', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    window.addEventListener('pointerdown', handleInteraction, {
      passive: true,
    });
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('scroll', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });

    fallbackTimer = window.setTimeout(() => {
      cleanupEvents();
      activate();
    }, 2200);

    const idleWindow = window as WindowWithIdleCallback;
    if (idleWindow.requestIdleCallback) {
      idleHandle = idleWindow.requestIdleCallback(
        () => {
          cleanupEvents();
          activate();
        },
        { timeout: 1800 },
      );
    }

    return () => {
      cleanupEvents();
      window.clearTimeout(fallbackTimer);
      if (idleHandle !== undefined) {
        idleWindow.cancelIdleCallback?.(idleHandle);
      }
    };
  }, []);

  return (
    <>
      {showCookieConsent ? <DeferredCookieConsent /> : null}
      {showAccessibilityWidget ? <DeferredAccessibilityWidget /> : null}
      {showWhatsAppFloat ? <DeferredWhatsAppFloat /> : null}
    </>
  );
}
