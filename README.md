# Lucide Hover Trace 2.0

Accessible, dependency-light SVG stroke tracing for **React + Lucide**. Built by [FireXCore](https://firexcore.com).

## Install

```bash
npm install lucide-hover-trace lucide-react
```

React 18.2+ and Lucide React are peer dependencies.

## Quick start

```tsx
import { Sparkles } from "lucide-react";
import { TraceIcon, useHoverTrace } from "lucide-hover-trace";

function IconButton() {
  return <TraceIcon icon={Sparkles} label="Open animations" mode="ping-pong" />;
}
function FullButton() {
  const { triggerProps, iconRef } = useHoverTrace({ durationMs: 700 });
  return (
    <button type="button" {...triggerProps}>
      <Sparkles ref={iconRef} size={20} aria-hidden="true" /> Animate
    </button>
  );
}
```

## API

- `TraceIcon`: with `label`, renders an accessible native button; without, a decorative span.
- `useHoverTrace(options)`: apply `triggerProps` to the interactive parent and `iconRef` to the Lucide icon.
- `useStrokeTrace(options)`: headless native SVG animation engine.

Common options: `mode` (`draw`, `reverse`, `redraw`, `ping-pong`), `durationMs`, `staggerMs`, `simultaneous`, `easing`, `replayKey`, `active`, `resetOnLeave`, `selector`.

The engine covers path, line, circle, rect, polyline, polygon, ellipse and respects dynamic `prefers-reduced-motion`. Only animations created by this library are cancelled. Existing inline SVG styles are restored.

## Commands

```bash
npm ci
npm run typecheck
npm run build
npm test
npm run dev
```

The build creates ESM/CJS modules and TypeScript declarations in `dist/` and a separate Vite demo in `demo-dist/`.

## Publishing

Use npm Trusted Publishing with GitHub Actions OIDC instead of permanent npm tokens. In your npm package settings, register `FireXCore/lucide-hover-trace`, workflow `publish.yml`, GitHub environment `npm-publish`, and allow `npm publish`. Do this **before** creating the GitHub release. First-time publishing may require npm account authorization or initial package ownership registration.

## License

MIT
