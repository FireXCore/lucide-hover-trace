import { useEffect, useLayoutEffect, useRef } from "react"

export interface StrokeTraceOptions {
  active: boolean
  durationMs?: number
  staggerMs?: number
  easing?: string
  resetOnLeave?: boolean
  selector?: string
}

const DRAWABLE_SELECTOR = "path, line, circle, rect, polyline, polygon"

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function isGeometryElement(element: Element): element is SVGGeometryElement {
  return typeof (element as SVGGeometryElement).getTotalLength === "function"
}

/**
 * Returns a ref that can be attached directly to a Lucide SVG element.
 * The hook traces every SVG geometry element on activation and restores it
 * cleanly when the trigger is released.
 */
export function useStrokeTrace({
  active,
  durationMs = 900,
  staggerMs = 70,
  easing = "cubic-bezier(0.2, 0.8, 0.2, 1)",
  resetOnLeave = true,
  selector = DRAWABLE_SELECTOR,
}: StrokeTraceOptions) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const shapes = Array.from(svg.querySelectorAll(selector)).filter(isGeometryElement)

    // Cancel any in-flight animations before starting the next pass.
    shapes.forEach((shape) => {
      shape.getAnimations().forEach((animation) => animation.cancel())
    })

    if (!active) {
      if (resetOnLeave) {
        shapes.forEach((shape) => {
          shape.style.removeProperty("stroke-dasharray")
          shape.style.strokeDashoffset = "0"
        })
      }
      return
    }

    if (prefersReducedMotion()) {
      shapes.forEach((shape) => {
        shape.style.removeProperty("stroke-dasharray")
        shape.style.strokeDashoffset = "0"
      })
      return
    }

    const animations: Animation[] = []

    shapes.forEach((shape, index) => {
      const length = shape.getTotalLength()

      shape.style.strokeDasharray = `${length}`
      shape.style.strokeDashoffset = `${length}`

      // Ensure the starting dash state is committed before the animation begins.
      void shape.getBBox()

      const animation = shape.animate(
        [
          { strokeDashoffset: `${length}` },
          { strokeDashoffset: "0" },
        ],
        {
          duration: durationMs,
          delay: index * staggerMs,
          easing,
          fill: "forwards",
        }
      )

      animations.push(animation)
    })

    return () => {
      animations.forEach((animation) => animation.cancel())
    }
  }, [active, durationMs, easing, resetOnLeave, selector, staggerMs])

  return svgRef
}
