# Lucide Hover Trace

A polished React utility for tracing Lucide SVG strokes on hover or focus.

![Lucide Hover Trace logo](./public/logo.svg)

**Project:** FireXCore  
**Author:** Farbod Akvan  
**Website:** https://firexcore.com  
**GitHub:** https://github.com/FireXCore

## What this package does

Lucide icons are stroke-based SVGs, which makes them ideal for a clean draw-on-hover effect. This project keeps that effect local, accessible, and predictable:

- traces the full SVG geometry, not only `path`
- supports hover, focus, and icon-only controls
- respects `prefers-reduced-motion`
- avoids global CSS hacks
- keeps the animation logic reusable and lightweight

## Installation

```bash
npm install
```

## Usage

### Trace a full button or row

Use `useHoverTrace` when the entire control should trigger the animation.

```tsx
import { ChevronRight } from "lucide-react"
import { useHoverTrace } from "./hooks/useHoverTrace"

export function RowAction() {
  const { triggerProps, iconRef } = useHoverTrace({ durationMs: 780 })

  return (
    <button type="button" className="row-action" {...triggerProps}>
      <ChevronRight ref={iconRef} className="row-action__icon" size={16} strokeWidth={1.8} />
      <span>Open request</span>
    </button>
  )
}
```

### Trace a standalone icon

Use `TraceIcon` when the icon itself is the control target.

```tsx
import { Plus } from "lucide-react"
import { TraceIcon } from "./components/TraceIcon"

export function CreateButton() {
  return <TraceIcon icon={Plus} className="text-primary" />
}
```

## API

### `useHoverTrace(options)`

Renderless hover controller for a Lucide icon.

**Options**

- `durationMs`: animation duration in milliseconds. Default `900`
- `staggerMs`: delay between SVG elements in milliseconds. Default `70`
- `easing`: CSS timing function. Default `cubic-bezier(0.2, 0.8, 0.2, 1)`
- `resetOnLeave`: restore the icon cleanly when hover ends. Default `true`

**Returns**

- `triggerProps`: spread these on the hoverable control
- `iconRef`: attach this ref directly to the Lucide icon
- `active`: current traced state

### `TraceIcon`

Convenience component for standalone icon buttons.

**Props**

- `icon`: a Lucide icon component
- `className`: icon class name
- `containerClassName`: wrapper class name
- `size`: icon size in pixels
- `strokeWidth`: icon stroke width
- `durationMs`: trace duration
- `staggerMs`: per-element stagger
- `resetOnLeave`: clean reset behavior
- `active`: controlled traced state
- `decorative`: set `false` only when the icon needs its own accessible label
- `title`: optional SVG title

## Implementation notes

The hook traces these SVG geometry elements:

- `path`
- `line`
- `circle`
- `rect`
- `polyline`
- `polygon`

It reads each element’s total length, sets `stroke-dasharray`, and animates `stroke-dashoffset` from full length to zero. The result is a clean stroke-drawing effect without relying on global stylesheet overrides.

## Demo

Run the demo app locally:

```bash
npm run dev
```

## License

MIT
