import { useState } from "react";
import type { FocusEvent, HTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { useStrokeTrace, type StrokeTraceOptions } from "./useStrokeTrace";

export interface HoverTraceOptions extends Omit<StrokeTraceOptions, "active" | "selector"> {}
export interface HoverTraceResult {
  active: boolean;
  iconRef: ReturnType<typeof useStrokeTrace>;
  triggerProps: Pick<HTMLAttributes<HTMLElement>, "onPointerEnter" | "onPointerLeave" | "onFocus" | "onBlur">;
}

/** Separate pointer/focus flags prevent stopping a trace while the other input is active. */
export function useHoverTrace(options: HoverTraceOptions = {}): HoverTraceResult {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const active = hovered || focused;
  const iconRef = useStrokeTrace({ ...options, active });

  function onBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
  }
  return {
    active, iconRef,
    triggerProps: {
      onPointerEnter: () => setHovered(true),
      onPointerLeave: () => setHovered(false),
      onFocus: () => setFocused(true),
      onBlur,
    },
  };
}
export type HoverTraceIcon = LucideIcon;
