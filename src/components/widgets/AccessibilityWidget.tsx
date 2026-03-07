"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  Blend,
  Contrast,
  EyeOff,
  Heading,
  Link2,
  Minus,
  MousePointer2,
  Plus,
  RotateCcw,
  TextSelect,
  Type,
  X,
} from "lucide-react";

const STORAGE_KEY = "skitza-accessibility-settings";
const TEXT_SCALE_LEVELS = [100, 120, 140] as const;

type TextScaleLevel = (typeof TEXT_SCALE_LEVELS)[number];

interface AccessibilitySettings {
  textScale: TextScaleLevel;
  highContrast: boolean;
  grayscale: boolean;
  invertColors: boolean;
  readableFont: boolean;
  highlightLinks: boolean;
  highlightHeadings: boolean;
  textSpacing: boolean;
  hideImages: boolean;
  largeCursor: boolean;
}

type ToggleKey = Exclude<keyof AccessibilitySettings, "textScale">;

interface ToggleItem {
  key: ToggleKey;
  label: string;
  description: string;
  icon: LucideIcon;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  textScale: 100,
  highContrast: false,
  grayscale: false,
  invertColors: false,
  readableFont: false,
  highlightLinks: false,
  highlightHeadings: false,
  textSpacing: false,
  hideImages: false,
  largeCursor: false,
};

const HTML_CLASS_NAMES = [
  "a11y-text-scale-120",
  "a11y-text-scale-140",
  "a11y-high-contrast",
  "a11y-grayscale",
  "a11y-invert",
  "a11y-readable-font",
  "a11y-highlight-links",
  "a11y-highlight-headings",
  "a11y-text-spacing",
  "a11y-hide-images",
  "a11y-large-cursor",
] as const;

const TOGGLES: ToggleItem[] = [
  {
    key: "highContrast",
    label: "ניגודיות גבוהה",
    description: "רקע כהה וטקסט בהיר במיוחד",
    icon: Contrast,
  },
  {
    key: "grayscale",
    label: "גווני אפור",
    description: "הצגת האתר בשחור-לבן",
    icon: Blend,
  },
  {
    key: "invertColors",
    label: "היפוך צבעים",
    description: "היפוך כל צבעי האתר",
    icon: Contrast,
  },
  {
    key: "readableFont",
    label: "גופן קריא",
    description: "החלפת פונטים לגופן סנס-סריף ברור",
    icon: Type,
  },
  {
    key: "highlightLinks",
    label: "הדגשת קישורים",
    description: "קו תחתון עבה וצבע בולט לקישורים",
    icon: Link2,
  },
  {
    key: "highlightHeadings",
    label: "הדגשת כותרות",
    description: "סימון ברור לכותרות הראשיות בעמוד",
    icon: Heading,
  },
  {
    key: "textSpacing",
    label: "ריווח טקסט",
    description: "הגדלת ריווח בין שורות ומילים",
    icon: TextSelect,
  },
  {
    key: "hideImages",
    label: "הסתרת תמונות",
    description: "הצגת תוכן טקסט בלבד לקריאה ממוקדת",
    icon: EyeOff,
  },
  {
    key: "largeCursor",
    label: "סמן עכבר גדול",
    description: "הגדלת הסמן בכל האתר",
    icon: MousePointer2,
  },
];

function isTextScaleLevel(value: unknown): value is TextScaleLevel {
  return typeof value === "number" && TEXT_SCALE_LEVELS.includes(value as TextScaleLevel);
}

function isAccessibilitySettings(value: unknown): value is AccessibilitySettings {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;

  return (
    isTextScaleLevel(candidate.textScale) &&
    typeof candidate.highContrast === "boolean" &&
    typeof candidate.grayscale === "boolean" &&
    typeof candidate.invertColors === "boolean" &&
    typeof candidate.readableFont === "boolean" &&
    typeof candidate.highlightLinks === "boolean" &&
    typeof candidate.highlightHeadings === "boolean" &&
    typeof candidate.textSpacing === "boolean" &&
    typeof candidate.hideImages === "boolean" &&
    typeof candidate.largeCursor === "boolean"
  );
}

function getInitialSettings(): AccessibilitySettings {
  if (typeof window === "undefined") {
    return DEFAULT_SETTINGS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;

    const parsed = JSON.parse(raw) as unknown;
    return isAccessibilitySettings(parsed) ? parsed : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function applySettingsToDocument(settings: AccessibilitySettings) {
  const root = document.documentElement;
  root.classList.remove(...HTML_CLASS_NAMES);

  if (settings.textScale === 120) root.classList.add("a11y-text-scale-120");
  if (settings.textScale === 140) root.classList.add("a11y-text-scale-140");
  if (settings.highContrast) root.classList.add("a11y-high-contrast");
  if (settings.grayscale) root.classList.add("a11y-grayscale");
  if (settings.invertColors) root.classList.add("a11y-invert");
  if (settings.readableFont) root.classList.add("a11y-readable-font");
  if (settings.highlightLinks) root.classList.add("a11y-highlight-links");
  if (settings.highlightHeadings) root.classList.add("a11y-highlight-headings");
  if (settings.textSpacing) root.classList.add("a11y-text-spacing");
  if (settings.hideImages) root.classList.add("a11y-hide-images");
  if (settings.largeCursor) root.classList.add("a11y-large-cursor");
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = Array.from(
    container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  );

  return elements.filter(
    (element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true"
  );
}

export function AccessibilityWidget() {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLSpanElement | null>(null);

  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(getInitialSettings);

  const isDefaultState = useMemo(
    () =>
      settings.textScale === 100 &&
      !settings.highContrast &&
      !settings.grayscale &&
      !settings.invertColors &&
      !settings.readableFont &&
      !settings.highlightLinks &&
      !settings.highlightHeadings &&
      !settings.textSpacing &&
      !settings.hideImages &&
      !settings.largeCursor,
    [settings]
  );

  useEffect(() => {
    applySettingsToDocument(settings);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore storage errors
    }
  }, [settings]);

  useEffect(() => {
    return () => {
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove(...HTML_CLASS_NAMES);
      }
    };
  }, []);

  useEffect(() => {
    // Desktop-only custom cursor: guarantees visible "large cursor" behavior across browsers.
    if (!settings.largeCursor) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer:fine)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let rafId = 0;
    let x = -100;
    let y = -100;
    const ringRadius = 26;

    const renderCursor = () => {
      cursor.style.transform = `translate3d(${x - ringRadius}px, ${y - ringRadius}px, 0)`;
      rafId = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      x = event.clientX;
      y = event.clientY;
      cursor.style.opacity = "1";
      if (!rafId) {
        rafId = window.requestAnimationFrame(renderCursor);
      }
    };

    const onPointerLeave = () => {
      cursor.style.opacity = "0";
    };

    const onPointerDown = () => {
      cursor.classList.add("a11y-cursor-ring--active");
    };

    const onPointerUp = () => {
      cursor.classList.remove("a11y-cursor-ring--active");
    };

    const onDragStart = (event: DragEvent) => {
      event.preventDefault();
    };

    x = window.innerWidth * 0.5;
    y = window.innerHeight * 0.5;
    cursor.style.opacity = "0.9";
    renderCursor();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("dragstart", onDragStart, true);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("dragstart", onDragStart, true);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      cursor.classList.remove("a11y-cursor-ring--active");
      cursor.style.opacity = "0";
      cursor.style.transform = "translate3d(-120px, -120px, 0)";
    };
  }, [settings.largeCursor]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    if (!panel) return;

    const focusables = getFocusableElements(panel);
    focusables[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const currentFocusable = getFocusableElements(panel);
      if (currentFocusable.length === 0) return;

      const first = currentFocusable[0];
      const last = currentFocusable[currentFocusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const panelNode = panelRef.current;
      const triggerNode = triggerRef.current;
      if (!panelNode || !triggerNode) return;

      if (!panelNode.contains(target) && !triggerNode.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const toggleFlag = (key: ToggleKey) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const adjustTextScale = (direction: "up" | "down") => {
    const currentIndex = TEXT_SCALE_LEVELS.findIndex((level) => level === settings.textScale);
    const delta = direction === "up" ? 1 : -1;
    const nextIndex = Math.min(TEXT_SCALE_LEVELS.length - 1, Math.max(0, currentIndex + delta));
    setSettings((prev) => ({ ...prev, textScale: TEXT_SCALE_LEVELS[nextIndex] }));
  };

  const resetAll = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <div
      data-a11y-widget="true"
      className="fixed bottom-[calc(var(--mobile-sticky-bar-height)+env(safe-area-inset-bottom)+1rem)] left-4 z-[70] sm:bottom-6 sm:left-6"
    >
      {settings.largeCursor ? (
        <span ref={cursorRef} aria-hidden className="a11y-cursor-ring" />
      ) : null}

      <button
        ref={triggerRef}
        type="button"
        aria-label="פתיחת תפריט נגישות"
        aria-expanded={open}
        aria-controls="accessibility-panel"
        onClick={() => setOpen((prev) => !prev)}
        className="flex min-h-[52px] min-w-[52px] items-center justify-center rounded-full border border-blue-100 bg-primary text-white shadow-[0_16px_35px_-18px_rgba(15,37,64,0.5)] transition hover:scale-105 hover:shadow-[0_18px_38px_-16px_rgba(15,37,64,0.55)] focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
      >
        <Accessibility className="h-6 w-6" aria-hidden />
      </button>

      {open ? (
        <div
          id="accessibility-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="אפשרויות נגישות"
          className="mt-3 w-[min(92vw,360px)] max-h-[min(72vh,560px)] overflow-y-auto rounded-2xl border border-blue-100 bg-white/95 p-4 shadow-[0_20px_50px_rgba(15,37,64,0.26)] backdrop-blur-md"
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-extrabold text-primary">הנגשה מהירה</h2>
              <p className="mt-1 text-xs text-foreground/70">התאמות נגישות לצפייה נוחה יותר</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-foreground/70 transition hover:bg-blue-50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="סגירת תפריט נגישות"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <section className="mb-4 rounded-xl border border-blue-100 bg-blue-50/55 p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-bold text-primary">גודל טקסט</p>
              <p className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-primary">
                {settings.textScale}%
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => adjustTextScale("down")}
                disabled={settings.textScale === 100}
                className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg border border-blue-200 bg-white text-primary transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-45 focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="הקטנת גודל טקסט"
              >
                <Minus className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => adjustTextScale("up")}
                disabled={settings.textScale === 140}
                className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg border border-blue-200 bg-white text-primary transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-45 focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="הגדלת גודל טקסט"
              >
                <Plus className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </section>

          <ul className="space-y-2">
            {TOGGLES.map((item) => {
              const isActive = settings[item.key];
              return (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => toggleFlag(item.key)}
                    aria-pressed={isActive}
                    className={`flex w-full min-h-[44px] items-center gap-3 rounded-xl border px-3 py-2 text-right transition focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                      isActive
                        ? "border-blue-500 bg-blue-50 text-primary"
                        : "border-blue-100 bg-white text-foreground hover:border-blue-200 hover:bg-blue-50/50"
                    }`}
                  >
                    <span
                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        isActive ? "bg-primary text-white" : "bg-blue-50 text-primary"
                      }`}
                      aria-hidden
                    >
                      <item.icon className="h-4 w-4" />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-sm font-bold">{item.label}</span>
                      <span className="text-xs text-foreground/65">{item.description}</span>
                    </span>
                    <span
                      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition ${
                        isActive ? "bg-primary" : "bg-slate-300"
                      }`}
                      aria-hidden
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                          isActive ? "right-0.5" : "right-[calc(100%-1.35rem)]"
                        }`}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={resetAll}
            disabled={isDefaultState}
            className="mt-4 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-bold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-45 focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            איפוס כל ההגדרות
          </button>
        </div>
      ) : null}
    </div>
  );
}
