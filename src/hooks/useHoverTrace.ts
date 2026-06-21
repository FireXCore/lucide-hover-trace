import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import { useStrokeTrace, type StrokeTraceOptions } from "./useStrokeTrace"

export interface HoverTraceOptions
  extends Omit<StrokeTraceOptions, "active" | "selector"> {}

export interface HoverTraceResult {
  active: boolean
  iconRef: ReturnType<typeof useStrokeTrace>
  triggerProps: {
    onPointerEnter: () => void
    onPointerLeave: () => void
    onFocus: () => void
    onBlur: () => void
  }
}

/**
 * Renderless hover/focus controller for icon traces.
 * Attach `triggerProps` to the actual hoverable element and `iconRef` to the
 * Lucide icon you want to animate.
 */
export function useHoverTrace(options: HoverTraceOptions = {}): HoverTraceResult {
  const [active, setActive] = useState(false)
  const iconRef = useStrokeTrace({
    active,
    durationMs: options.durationMs,
    staggerMs: options.staggerMs,
    easing: options.easing,
    resetOnLeave: options.resetOnLeave,
  })

  return {
    active,
    iconRef,
    triggerProps: {
      onPointerEnter: () => setActive(true),
      onPointerLeave: () => setActive(false),
      onFocus: () => setActive(true),
      onBlur: () => setActive(false),
    },
  }
}

/**
 * Type helper for docs and examples only.
 * Keeping the icon type nearby makes copy-paste usage less error prone.
 */
export type HoverTraceIcon = LucideIcon
