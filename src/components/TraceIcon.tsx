import { useState } from "react";
import type { MouseEventHandler } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/cn";
import { useStrokeTrace, type StrokeTraceOptions } from "../hooks/useStrokeTrace";

export interface TraceIconProps extends Omit<Partial<StrokeTraceOptions>, "active"> {
  icon: LucideIcon;
  className?: string;
  containerClassName?: string;
  size?: number;
  strokeWidth?: number;
  active?: boolean;
  decorative?: boolean;
  title?: string;
  label?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

/** A labeled TraceIcon is a keyboard-accessible button; an unlabeled one is decorative. */
export function TraceIcon({
  icon: Icon, className, containerClassName, size = 24, strokeWidth = 1.8,
  durationMs = 900, staggerMs = 70, easing, resetOnLeave = true, selector,
  mode = "draw", simultaneous = false, replayKey = 0, active,
  decorative = true, title, label, disabled, onClick,
}: TraceIconProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const isActive = !disabled && (active ?? (hovered || focused));
  const svgRef = useStrokeTrace({
    active: isActive, durationMs, staggerMs, easing, resetOnLeave, selector,
    mode, simultaneous, replayKey,
  });
  const content = (
    <Icon ref={svgRef} className={className} size={size} strokeWidth={strokeWidth}
      aria-hidden={decorative || !!label ? true : undefined} focusable="false" title={title} />
  );
  if (!label) {
    return (
      <span className={cn("trace-icon", containerClassName)} aria-hidden={decorative ? true : undefined}
        onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
        {content}
      </span>
    );
  }
  return (
    <button type="button" className={cn("trace-icon", "trace-icon--button", containerClassName)}
      aria-label={label} disabled={disabled} onClick={onClick}
      onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      {content}
    </button>
  );
}
