export type TraceMode = "draw" | "reverse" | "redraw" | "ping-pong";
export function traceOffsets(mode: TraceMode, length: number): number[] {
  if (!Number.isFinite(length) || length <= 0) return [0, 0];
  if (mode === "reverse") return [-length, 0];
  if (mode === "redraw") return [0, length, 0];
  if (mode === "ping-pong") return [length, 0, length, 0];
  return [length, 0];
}
export function traceDelay(index: number, staggerMs: number, simultaneous: boolean): number {
  return simultaneous ? 0 : Math.max(0, index) * Math.max(0, staggerMs);
}
