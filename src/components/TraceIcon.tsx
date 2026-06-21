import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "../lib/cn"
import { useStrokeTrace } from "../hooks/useStrokeTrace"

export interface TraceIconProps {
  icon: LucideIcon
  className?: string
  containerClassName?: string
  size?: number
  strokeWidth?: number
  durationMs?: number
  staggerMs?: number
  resetOnLeave?: boolean
  active?: boolean
  decorative?: boolean
  title?: string
}

/**
 * Convenience component for standalone icon buttons or icon-only actions.
 * For composite buttons/rows, prefer `useHoverTrace` so the entire control
 * triggers the animation, not just the icon area.
 */
export function TraceIcon({
  icon: Icon,
  className,
  containerClassName,
  size = 16,
  strokeWidth = 2,
  durationMs = 900,
  staggerMs = 70,
  resetOnLeave = true,
  active,
  decorative = true,
  title,
}: TraceIconProps) {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)

  const isActive = active ?? (hovered || focused)
  const svgRef = useStrokeTrace({
    active: isActive,
    durationMs,
    staggerMs,
    resetOnLeave,
  })

  return (
    <span
      className={cn("inline-flex shrink-0 leading-none", containerClassName)}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <Icon
        ref={svgRef}
        className={className}
        size={size}
        strokeWidth={strokeWidth}
        aria-hidden={decorative ? true : undefined}
        focusable="false"
        title={title}
      />
    </span>
  )
}
