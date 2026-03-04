"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type PartnerLogo = {
  id: string;
  name: string;
  src: string;
  alt: string;
};

type ClientLogosOrbitProps = {
  logos: readonly PartnerLogo[];
};

const TWO_PI = Math.PI * 2;
const MOBILE_BREAKPOINT = 639;

type OrbitLayoutConfig = {
  edgePadX: number;
  edgePadY: number;
  minNode: number;
  maxNode: number;
  minGap: number;
  speedPxPerSec: number;
  sampleSteps: number;
};

function getOrbitConfig(isMobile: boolean): OrbitLayoutConfig {
  if (isMobile) {
    return {
      edgePadX: 20,
      edgePadY: 8,
      minNode: 34,
      maxNode: 58,
      minGap: 10,
      speedPxPerSec: 30,
      sampleSteps: 768,
    };
  }

  return {
    edgePadX: 42,
    edgePadY: 24,
    minNode: 42,
    maxNode: 74,
    minGap: 14,
    speedPxPerSec: 24,
    sampleSteps: 1280,
  };
}

type ArcSample = {
  theta: number;
  length: number;
};

function ellipsePerimeter(rx: number, ry: number): number {
  const term = (3 * rx + ry) * (rx + 3 * ry);
  return Math.PI * (3 * (rx + ry) - Math.sqrt(term));
}

function buildArcTable(rx: number, ry: number, steps = 1024): ArcSample[] {
  const samples: ArcSample[] = [{ theta: 0, length: 0 }];
  let prevX = rx;
  let prevY = 0;
  let total = 0;

  for (let index = 1; index <= steps; index += 1) {
    const theta = (index / steps) * TWO_PI;
    const x = rx * Math.cos(theta);
    const y = ry * Math.sin(theta);
    total += Math.hypot(x - prevX, y - prevY);
    samples.push({ theta, length: total });
    prevX = x;
    prevY = y;
  }

  return samples;
}

function thetaForArcLength(samples: ArcSample[], targetLength: number): number {
  const maxLength = samples[samples.length - 1]?.length ?? 0;
  if (maxLength <= 0) {
    return 0;
  }

  let normalized = targetLength % maxLength;
  if (normalized < 0) {
    normalized += maxLength;
  }

  let low = 0;
  let high = samples.length - 1;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if ((samples[mid]?.length ?? 0) < normalized) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  const current = samples[Math.max(1, low)];
  const previous = samples[Math.max(0, low - 1)];
  if (!current || !previous) {
    return 0;
  }

  const segment = current.length - previous.length;
  if (segment <= 0) {
    return current.theta;
  }

  const ratio = (normalized - previous.length) / segment;
  return previous.theta + (current.theta - previous.theta) * ratio;
}

export function ClientLogosOrbit({ logos }: ClientLogosOrbitProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    const ring = ringRef.current;
    if (!stage || !ring) {
      return;
    }

    const count = Math.max(1, logos.length);
    nodesRef.current = nodesRef.current.slice(0, count);
    stage.style.setProperty("--logo-count", String(count));

    let phaseDistance = 0;
    let lastTimestamp = 0;
    let rafId = 0;
    let resizeRafId = 0;
    let cx = 0;
    let cy = 0;
    let rx = 0;
    let ry = 0;
    let nodeSize = 0;
    let speedPxPerSec = 24;
    let perimeter = 0;
    let arcSamples: ArcSample[] = [];
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const mobileMedia = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const reducedMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyLayout = () => {
      const rect = stage.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        return;
      }

      const config = getOrbitConfig(mobileMedia.matches);
      speedPxPerSec = config.speedPxPerSec;
      cx = rect.width / 2;
      cy = rect.height / 2;

      const baseRx = Math.max(100, cx - config.edgePadX);
      const baseRy = Math.max(74, cy - config.edgePadY);
      const roughPerimeter = ellipsePerimeter(baseRx, baseRy);
      const targetNodeSize = roughPerimeter / count - config.minGap;
      nodeSize = Math.max(config.minNode, Math.min(config.maxNode, targetNodeSize));

      // Keep node centers strictly on the same ellipse used by the ring.
      rx = Math.max(nodeSize / 2 + 6, baseRx - nodeSize / 2);
      ry = Math.max(nodeSize / 2 + 6, baseRy - nodeSize / 2);
      perimeter = ellipsePerimeter(rx, ry);
      arcSamples = buildArcTable(rx, ry, config.sampleSteps);
      stage.style.setProperty("--orbit-node-size", `${Math.round(nodeSize)}px`);

      ring.style.width = `${(rx * 2).toFixed(2)}px`;
      ring.style.height = `${(ry * 2).toFixed(2)}px`;
    };

    const applyPositions = (offsetDistance: number) => {
      if (perimeter <= 0) {
        return;
      }

      const spacing = perimeter / count;
      for (let index = 0; index < count; index += 1) {
        const node = nodesRef.current[index];
        if (!node) {
          continue;
        }

        const arcDistance = offsetDistance + spacing * index;
        const theta = thetaForArcLength(arcSamples, arcDistance);
        const x = rx * Math.cos(theta);
        const y = ry * Math.sin(theta);

        node.style.left = `${(cx + x).toFixed(2)}px`;
        node.style.top = `${(cy + y).toFixed(2)}px`;
      }
    };

    const handleResize = () => {
      cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        applyLayout();
        applyPositions(phaseDistance);
      });
    };

    const step = (timestamp: number) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }

      const deltaSeconds = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
      lastTimestamp = timestamp;

      if (!reducedMotion) {
        phaseDistance = (phaseDistance + deltaSeconds * speedPxPerSec) % (perimeter || 1);
      }

      applyPositions(phaseDistance);
      rafId = requestAnimationFrame(step);
    };

    const onMobileChange = () => {
      handleResize();
    };

    const onReducedChange = () => {
      reducedMotion = reducedMedia.matches;
      if (!reducedMotion) {
        lastTimestamp = 0;
      }
    };

    applyLayout();
    applyPositions(phaseDistance);
    rafId = requestAnimationFrame(step);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(stage);

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });
    mobileMedia.addEventListener("change", onMobileChange);
    reducedMedia.addEventListener("change", onReducedChange);

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(resizeRafId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      mobileMedia.removeEventListener("change", onMobileChange);
      reducedMedia.removeEventListener("change", onReducedChange);
    };
  }, [logos]);

  return (
    <div className="partners-orbit-stage" ref={stageRef} data-track="client-logos-showcase">
      <div className="partners-orbit-ring" ref={ringRef} aria-hidden="true" />
      <div className="partners-orbit-list" role="list" aria-label="חברות שותפות במסלול אליפטי">
        {logos.map((logo, index) => {
          return (
            <div
              key={logo.id}
              className="partners-orbit-node"
              ref={(element) => {
                nodesRef.current[index] = element;
              }}
              role="listitem"
              aria-label={logo.alt}
            >
              <div className="partners-orbit-node__inner">
                <div className="partners-orbit-node__media">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={180}
                    height={180}
                    sizes="(max-width: 639px) 18vw, (max-width: 1024px) 8vw, 6vw"
                    className="partners-orbit-logo"
                    loading="lazy"
                    decoding="async"
                    quality={75}
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
