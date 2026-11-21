import { useMemo, useState } from "react";
import {
  ArrowDownToLine, ArrowRight, Bell, Check, ChevronRight, Cloud, Code2, Copy,
  Download, ExternalLink, Heart, Menu, Moon, MousePointer2, Play, Plus,
  RefreshCw, Search, Settings2, ShieldCheck, Sparkles, Sun, WandSparkles, Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TraceIcon } from "./components/TraceIcon";
import { useHoverTrace } from "./hooks/useHoverTrace";
import type { TraceMode } from "./animation";

const ICONS: { name: string; icon: LucideIcon }[] = [
  { name: "Sparkles", icon: Sparkles }, { name: "ArrowRight", icon: ArrowRight },
  { name: "Heart", icon: Heart }, { name: "Download", icon: Download },
  { name: "Search", icon: Search }, { name: "Bell", icon: Bell },
  { name: "Cloud", icon: Cloud }, { name: "Moon", icon: Moon },
  { name: "Sun", icon: Sun }, { name: "Menu", icon: Menu },
  { name: "Zap", icon: Zap }, { name: "Plus", icon: Plus },
];

const MODES: { value: TraceMode; name: string; detail: string }[] = [
  { value: "draw", name: "Draw", detail: "Reveal every stroke" },
  { value: "reverse", name: "Reverse", detail: "Trace the other way" },
  { value: "redraw", name: "Redraw", detail: "Erase and construct" },
  { value: "ping-pong", name: "Ping-pong", detail: "Flow back and forth" },
];

function ActionExample() {
  const { triggerProps, iconRef } = useHoverTrace({ durationMs: 740, staggerMs: 56 });
  return (
    <button className="example-action" type="button" {...triggerProps}>
      <span className="example-action__symbol">
        <ChevronRight ref={iconRef} size={20} aria-hidden="true" />
      </span>
      <span><strong>Open workspace</strong><small>Full button triggers the trace</small></span>
      <ExternalLink size={16} className="example-action__trail" aria-hidden="true" />
    </button>
  );
}

function Slider({
  label, value, min, max, step, unit, onChange,
}: {
  label: string; value: number; min: number; max: number; step: number;
  unit: string; onChange: (value: number) => void;
}) {
  return (
    <label className="control-row">
      <span className="control-row__top"><span>{label}</span><output>{value}{unit}</output></span>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

export function App() {
  const [iconName, setIconName] = useState("Sparkles");
  const [mode, setMode] = useState<TraceMode>("draw");
  const [durationMs, setDurationMs] = useState(900);
  const [staggerMs, setStaggerMs] = useState(70);
  const [simultaneous, setSimultaneous] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const [active, setActive] = useState(false);
  const [light, setLight] = useState(false);
  const [copied, setCopied] = useState(false);
  const selection = ICONS.find((item) => item.name === iconName) || ICONS[0];
  const code = useMemo(() => [
    'import { ' + iconName + ' } from "lucide-react";',
    'import { TraceIcon } from "lucide-hover-trace";',
    "",
    "<TraceIcon",
    "  icon={" + iconName + "}",
    '  label="' + iconName + ' animation"',
    '  mode="' + mode + '"',
    "  durationMs={" + durationMs + "}",
    "  staggerMs={" + staggerMs + "}",
    "  simultaneous={" + simultaneous + "}",
    "/>",
  ].join("\n"), [iconName, mode, durationMs, staggerMs, simultaneous]);

  const run = () => {
    setActive(true);
    setReplayKey((key) => key + 1);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={light ? "app app--light" : "app"}>
      <div className="ambient ambient--one" />
      <div className="ambient ambient--two" />
      <header className="nav">
        <a className="brand" href="https://github.com/FireXCore/lucide-hover-trace" target="_blank" rel="noreferrer">
          <span className="brand__mark"><WandSparkles size={21} strokeWidth={1.8} /></span>
          <span>lucide<span className="brand__accent">/</span>trace <sup>2.0</sup></span>
        </a>
        <nav className="nav__links" aria-label="Main navigation">
          <a href="#studio">Playground</a>
          <a href="#examples">Examples</a>
          <a href="#install">Installation</a>
        </nav>
        <div className="nav__right">
          <button type="button" className="theme-button" aria-label="Toggle color theme" onClick={() => setLight(!light)}>
            {light ? <Moon size={19} /> : <Sun size={19} />}
          </button>
          <a className="github-button" href="https://github.com/FireXCore/lucide-hover-trace" target="_blank" rel="noreferrer">
            GitHub <ArrowRight size={15} />
          </a>
        </div>
      </header>
      <main>
        <section className="hero">
          <div className="hero__eyebrow"><span className="live-dot" /> OPEN SOURCE · REACT + LUCIDE</div>
          <h1>Make every icon<br /><em>come alive.</em></h1>
          <p>Trace. Reveal. Replay. A precise, lightweight motion engine for Lucide icons — built for interfaces that feel considered.</p>
          <div className="hero__buttons">
            <a className="primary-button" href="#studio">Explore playground <ArrowRight size={17} /></a>
            <a className="secondary-button" href="#install"><Code2 size={17} /> Quick start</a>
          </div>
          <div className="hero__metrics">
            <span><Zap size={15} /> Native Web Animations</span>
            <span><ShieldCheck size={15} /> Reduced-motion aware</span>
            <span><MousePointer2 size={15} /> Focus + hover</span>
          </div>
        </section>

        <section className="studio" id="studio">
          <div className="section-top">
            <div><span className="overline">01 / INTERACTIVE LAB</span><h2>Trace Studio</h2><p>Shape every stroke, down to the millisecond.</p></div>
            <span className="section-top__tag">LIVE PLAYGROUND <span className="live-dot" /></span>
          </div>
          <div className="workspace">
            <div className="preview-pane">
              <div className="pane-header"><span><span className="pane-header__light" /> PREVIEW</span><span>INTERACTIVE SVG</span></div>
              <div className="preview-pane__middle">
                <div className="preview-orbit preview-orbit--outer" />
                <div className="preview-orbit preview-orbit--inner" />
                <div className="preview-core">
                  <TraceIcon
                    icon={selection.icon} label={"Animate " + selection.name}
                    containerClassName="preview-icon" className="preview-svg"
                    size={104} strokeWidth={1.3}
                    active={active ? true : undefined} replayKey={replayKey}
                    mode={mode} durationMs={durationMs} staggerMs={staggerMs}
                    simultaneous={simultaneous} onClick={run}
                  />
                </div>
              </div>
              <div className="preview-footer">
                <span><span className="live-dot" /> READY TO TRACE</span>
                <div>
                  <button className="ghost-button" onClick={() => setActive(false)} type="button"><RefreshCw size={15} /> Reset</button>
                  <button className="run-button" onClick={run} type="button"><Play size={14} fill="currentColor" /> Run animation</button>
                </div>
              </div>
            </div>
            <div className="controls-pane">
              <div className="pane-header"><span><Settings2 size={15} /> CONTROLS</span><span>01—03</span></div>
              <div className="controls-body">
                <div className="control-heading">Animation mode <span>01</span></div>
                <div className="mode-grid">
                  {MODES.map((item) => (
                    <button type="button" key={item.value} onClick={() => { setMode(item.value); run(); }}
                      className={"mode-button" + (mode === item.value ? " is-selected" : "")}
                      aria-pressed={mode === item.value}>
                      <span>{item.name}</span><small>{item.detail}</small>
                    </button>
                  ))}
                </div>
                <div className="control-heading control-heading--space">Timing <span>02</span></div>
                <Slider label="Duration" value={durationMs} min={200} max={2400} step={100} unit=" ms" onChange={setDurationMs} />
                <Slider label="Stagger" value={staggerMs} min={0} max={250} step={10} unit=" ms" onChange={setStaggerMs} />
                <label className="toggle-row">
                  <span><strong>Simultaneous</strong><small>Animate all paths at once</small></span>
                  <input type="checkbox" checked={simultaneous} onChange={(event) => setSimultaneous(event.target.checked)} />
                  <span className="switch" aria-hidden="true" />
                </label>
                <div className="control-heading control-heading--space">Icon library <span>03</span></div>
                <div className="icon-picker">
                  {ICONS.map((item) => {
                    const PickerIcon = item.icon;
                    return (
                      <button type="button" key={item.name} aria-label={"Select " + item.name}
                        aria-pressed={iconName === item.name} title={item.name}
                        className={"icon-choice" + (iconName === item.name ? " is-selected" : "")}
                        onClick={() => { setIconName(item.name); setActive(false); }}>
                        <PickerIcon size={21} strokeWidth={1.8} />
                      </button>
                    );
                  })}
                </div>
                <div className="picker-bottom"><span>{iconName}</span><span>{ICONS.length} curated icons</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="lower-grid" id="examples">
          <div className="feature-panel">
            <span className="overline">02 / COMPOSITION</span><h3>Built for real interfaces.</h3>
            <p>Animate the icon when the entire button is focused or hovered — not just the pixels around the SVG.</p>
            <ActionExample />
            <div className="feature-tags"><span>Keyboard ready</span><span>Independent focus state</span></div>
          </div>
          <div className="code-panel" id="install">
            <div className="code-panel__top">
              <span><Code2 size={16} /> REACT / TYPESCRIPT</span>
              <button type="button" onClick={copy}><Copy size={14} /> {copied ? "Copied" : "Copy"}</button>
            </div>
            <pre><code>{code}</code></pre>
            <div className="install-bar">
              <span><ArrowDownToLine size={15} /> npm install lucide-hover-trace lucide-react</span><Check size={16} />
            </div>
          </div>
        </section>
        <section className="bottom-banner">
          <span><ShieldCheck size={18} /> No animation framework required.</span>
          <span>Powered by the native Web Animations API.</span>
        </section>
      </main>
      <footer><span>© 2026 FireXCore. MIT License.</span>
        <a href="https://firexcore.com" target="_blank" rel="noreferrer">Crafted by FireXCore <ArrowRight size={14} /></a>
      </footer>
    </div>
  );
}
