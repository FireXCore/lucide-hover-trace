import {
  ArrowRight,
  Bell,
  ChevronRight,
  Download,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  Sparkles,
} from "lucide-react"
import { TraceIcon } from "./components/TraceIcon"
import { useHoverTrace } from "./hooks/useHoverTrace"
import { cn } from "./lib/cn"

function ExampleAction({
  label,
  icon: Icon,
  className,
}: {
  label: string
  icon: typeof ArrowRight
  className?: string
}) {
  const { triggerProps, iconRef } = useHoverTrace({ durationMs: 780, staggerMs: 60 })

  return (
    <button className={cn("demo-action", className)} {...triggerProps} type="button">
      <Icon
        ref={iconRef}
        className="demo-action__icon"
        size={16}
        strokeWidth={1.8}
      />
      <span>{label}</span>
    </button>
  )
}

export function App() {
  return (
    <div className="page">
      <header className="hero">
        <div className="hero__mark">
          <img src="/logo.svg" alt="lucide-hover-trace logo" />
        </div>

        <div className="hero__copy">
          <p className="eyebrow">React + Lucide</p>
          <h1>Hover stroke tracing for Lucide icons.</h1>
          <p className="lede">
            A small, dependency-light utility that traces the stroke of Lucide SVG
            icons on hover or focus without global CSS hacks, per-icon state soup,
            or animation loops that flicker.
          </p>
        </div>
      </header>

      <main className="content">
        <section className="panel">
          <div className="panel__header">
            <h2>Standalone icon</h2>
            <p>Use this when the icon itself is the hover target.</p>
          </div>

          <div className="icon-showcase">
            <TraceIcon icon={Sparkles} className="icon-demo icon-demo--accent" />
            <TraceIcon icon={Settings} className="icon-demo icon-demo--muted" />
            <TraceIcon icon={Download} className="icon-demo icon-demo--muted" />
          </div>
        </section>

        <section className="panel">
          <div className="panel__header">
            <h2>Button-level hover</h2>
            <p>Attach the trigger to the button so the entire control activates the trace.</p>
          </div>

          <div className="stack">
            <ExampleAction label="Open request" icon={ChevronRight} />
            <ExampleAction label="Create new item" icon={Plus} />
            <ExampleAction label="Search records" icon={Search} />
          </div>
        </section>

        <section className="panel">
          <div className="panel__header">
            <h2>Icon-only actions</h2>
            <p>Compact controls keep the same motion language without adding visual noise.</p>
          </div>

          <div className="toolbar">
            <TraceIcon icon={Menu} className="toolbar__icon" />
            <TraceIcon icon={Bell} className="toolbar__icon" />
            <TraceIcon icon={LogOut} className="toolbar__icon toolbar__icon--danger" />
          </div>
        </section>
      </main>
    </div>
  )
}
