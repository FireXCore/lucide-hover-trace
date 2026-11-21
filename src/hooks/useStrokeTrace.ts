import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { traceDelay, traceOffsets, type TraceMode } from "../animation";

export interface StrokeTraceOptions {
  active: boolean;
  durationMs?: number;
  staggerMs?: number;
  easing?: string;
  resetOnLeave?: boolean;
  selector?: string;
  mode?: TraceMode;
  simultaneous?: boolean;
  replayKey?: number;
}

const DRAWABLE_SELECTOR = "path, line, circle, rect, polyline, polygon, ellipse";
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
type SavedStyle = { value: string; priority: string };
type ShapeSnapshot = { shape: SVGGeometryElement; dasharray: SavedStyle; dashoffset: SavedStyle };

function readStyle(element: SVGGeometryElement, property: string): SavedStyle {
  return { value: element.style.getPropertyValue(property), priority: element.style.getPropertyPriority(property) };
}
function restoreStyle(element: SVGGeometryElement, property: string, saved: SavedStyle) {
  if (saved.value) element.style.setProperty(property, saved.value, saved.priority);
  else element.style.removeProperty(property);
}
function isGeometryElement(element: Element): element is SVGGeometryElement {
  return typeof (element as SVGGeometryElement).getTotalLength === "function";
}
function reducedMotionEnabled(): boolean {
  return typeof window !== "undefined" && typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Animates only this hook's SVG strokes and restores each original inline style on cleanup. */
export function useStrokeTrace({
  active, durationMs = 900, staggerMs = 70,
  easing = "cubic-bezier(0.2, 0.8, 0.2, 1)",
  resetOnLeave = true, selector = DRAWABLE_SELECTOR,
  mode = "draw", simultaneous = false, replayKey = 0,
}: StrokeTraceOptions) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [motionRevision, setMotionRevision] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setMotionRevision((revision) => revision + 1);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg || !active || reducedMotionEnabled()) return;
    let elements: SVGGeometryElement[];
    try {
      elements = Array.from(svg.querySelectorAll(selector)).filter(isGeometryElement);
    } catch {
      return;
    }

    const snapshots: ShapeSnapshot[] = [];
    const ownedAnimations: Animation[] = [];

    for (const [index, shape] of elements.entries()) {
      let length: number;
      try { length = shape.getTotalLength(); } catch { continue; }
      if (!Number.isFinite(length) || length <= 0 || typeof shape.animate !== "function") continue;

      snapshots.push({
        shape,
        dasharray: readStyle(shape, "stroke-dasharray"),
        dashoffset: readStyle(shape, "stroke-dashoffset"),
      });
      const offsets = traceOffsets(mode, length);
      shape.style.setProperty("stroke-dasharray", String(length));
      shape.style.setProperty("stroke-dashoffset", String(offsets[0]));
      try {
        const animation = shape.animate(
          offsets.map((value) => ({ strokeDashoffset: String(value) })),
          {
            duration: Math.max(0, durationMs),
            delay: traceDelay(index, staggerMs, simultaneous),
            easing,
            fill: "forwards",
          },
        );
        ownedAnimations.push(animation);
      } catch {
        shape.style.setProperty("stroke-dashoffset", "0");
      }
    }

    return () => {
      for (const animation of ownedAnimations) animation.cancel();
      for (const saved of snapshots) {
        restoreStyle(saved.shape, "stroke-dasharray", saved.dasharray);
        restoreStyle(saved.shape, "stroke-dashoffset", saved.dashoffset);
      }
      // Both states restore a visible SVG; option retained for compatibility.
      void resetOnLeave;
    };
  }, [active, durationMs, staggerMs, easing, resetOnLeave, selector,
      mode, simultaneous, replayKey, motionRevision]);

  return svgRef;
}
