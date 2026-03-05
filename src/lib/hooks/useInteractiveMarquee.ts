import { useCallback, useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent, RefObject } from "react";

type MarqueeAxis = "x" | "y";
type MarqueeDirection = 1 | -1;

type UseInteractiveMarqueeOptions = {
  axis: MarqueeAxis;
  direction: MarqueeDirection;
  speedPxPerSec: number;
  pauseAfterInteractionMs?: number;
  startDelayMs?: number;
  enabled?: boolean;
  initialOffsetRatio?: number;
};

type PointerHandler = (event: ReactPointerEvent<HTMLDivElement>) => void;

type UseInteractiveMarqueeResult = {
  containerRef: RefObject<HTMLDivElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
  bind: {
    onPointerDown: PointerHandler;
    onPointerMove: PointerHandler;
    onPointerUp: PointerHandler;
    onPointerCancel: PointerHandler;
    onPointerEnter: PointerHandler;
    onPointerLeave: PointerHandler;
    onLostPointerCapture: PointerHandler;
  };
};

export function useInteractiveMarquee({
  axis,
  direction,
  speedPxPerSec,
  pauseAfterInteractionMs = 1500,
  startDelayMs = 0,
  enabled = true,
  initialOffsetRatio = 0,
}: UseInteractiveMarqueeOptions): UseInteractiveMarqueeResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const loopLengthRef = useRef(0);
  const positionRef = useRef(0);
  const initializedRef = useRef(false);
  const draggingRef = useRef(false);
  const hoverPausedRef = useRef(false);
  const resumeAtRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const pointerPositionRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);

  const normalizePosition = useCallback((value: number): number => {
    const loopLength = loopLengthRef.current;
    if (!Number.isFinite(loopLength) || loopLength <= 0 || !Number.isFinite(value)) {
      return 0;
    }

    let normalized = value % loopLength;
    if (normalized > 0) {
      normalized -= loopLength;
    }
    if (Object.is(normalized, -0)) {
      normalized = 0;
    }

    return normalized;
  }, []);

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const position = positionRef.current;
    track.style.transform =
      axis === "x"
        ? `translate3d(${position}px, 0px, 0px)`
        : `translate3d(0px, ${position}px, 0px)`;
  }, [axis]);

  const measureLoop = useCallback(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const firstGroup = track.firstElementChild as HTMLElement | null;
    let nextLoopLength =
      axis === "x" && firstGroup
        ? firstGroup.getBoundingClientRect().width
        : (axis === "x" ? track.scrollWidth : track.scrollHeight) / 2;

    if (!Number.isFinite(nextLoopLength) || nextLoopLength <= 0) {
      const fullLength = axis === "x" ? track.scrollWidth : track.scrollHeight;
      nextLoopLength = fullLength / 2;
    }

    if (!Number.isFinite(nextLoopLength) || nextLoopLength <= 0) {
      return;
    }

    loopLengthRef.current = nextLoopLength;
    if (!initializedRef.current) {
      positionRef.current = -nextLoopLength * initialOffsetRatio;
      initializedRef.current = true;
    } else {
      positionRef.current = normalizePosition(positionRef.current);
    }

    applyTransform();
  }, [applyTransform, axis, initialOffsetRatio, normalizePosition]);

  const endDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current || pointerIdRef.current !== event.pointerId) {
        return;
      }

      draggingRef.current = false;
      pointerIdRef.current = null;
      resumeAtRef.current = performance.now() + pauseAfterInteractionMs;
    },
    [pauseAfterInteractionMs]
  );

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!event.isPrimary) {
        return;
      }

      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      event.preventDefault();
      measureLoop();
      event.currentTarget.setPointerCapture(event.pointerId);

      draggingRef.current = true;
      pointerIdRef.current = event.pointerId;
      pointerPositionRef.current = axis === "x" ? event.clientX : event.clientY;
    },
    [axis, measureLoop]
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current || pointerIdRef.current !== event.pointerId) {
        return;
      }

      event.preventDefault();
      const currentPosition = axis === "x" ? event.clientX : event.clientY;
      const delta = currentPosition - pointerPositionRef.current;
      pointerPositionRef.current = currentPosition;
      if (delta === 0) {
        return;
      }

      positionRef.current = normalizePosition(positionRef.current + delta);
      applyTransform();
    },
    [applyTransform, axis, normalizePosition]
  );

  const onPointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      endDrag(event);
    },
    [endDrag]
  );

  const onPointerCancel = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      endDrag(event);
    },
    [endDrag]
  );

  const onPointerEnter = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") {
      hoverPausedRef.current = true;
    }
  }, []);

  const onPointerLeave = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") {
      hoverPausedRef.current = false;
    }
  }, []);

  const onLostPointerCapture = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || pointerIdRef.current !== event.pointerId) {
      return;
    }

    draggingRef.current = false;
    pointerIdRef.current = null;
    resumeAtRef.current = performance.now() + pauseAfterInteractionMs;
  }, [pauseAfterInteractionMs]);

  useEffect(() => {
    measureLoop();

    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) {
      return;
    }

    const observer = new ResizeObserver(() => {
      measureLoop();
    });

    observer.observe(track);
    observer.observe(container);
    window.addEventListener("resize", measureLoop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureLoop);
    };
  }, [measureLoop]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (startDelayMs > 0) {
      resumeAtRef.current = performance.now() + startDelayMs;
    }

    const loop = (timestamp: number) => {
      if (lastTickRef.current == null) {
        lastTickRef.current = timestamp;
      }

      const deltaSeconds = (timestamp - lastTickRef.current) / 1000;
      lastTickRef.current = timestamp;

      const shouldPause =
        draggingRef.current ||
        hoverPausedRef.current ||
        timestamp < resumeAtRef.current;

      if (!shouldPause && loopLengthRef.current > 0) {
        positionRef.current = normalizePosition(
          positionRef.current + direction * speedPxPerSec * deltaSeconds
        );
        applyTransform();
      }

      rafRef.current = window.requestAnimationFrame(loop);
    };

    rafRef.current = window.requestAnimationFrame(loop);

    return () => {
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = null;
      lastTickRef.current = null;
    };
  }, [applyTransform, direction, enabled, normalizePosition, speedPxPerSec, startDelayMs]);

  return {
    containerRef,
    trackRef,
    bind: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onPointerEnter,
      onPointerLeave,
      onLostPointerCapture,
    },
  };
}
