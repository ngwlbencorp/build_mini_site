import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "motion/react";
import { ChevronDown, Rocket, Compass, Landmark } from "lucide-react";
import { PageShell, Section, Card } from "../components/PageShell";

const NAVY = "#1e3a5f";
const TEAL = "#2ca2a4";
const GOLD = "#e8a83a";

export function Impact({ onBack }: { onBack: () => void }) {
  return (
    <PageShell
      title="Impact & Roadmap"
      subtitle="A three-stage system. The {build} 2026 prototype validates Stage 0."
      accent="from-emerald-500 to-teal-600"
      onBack={onBack}
    >
      <Section heading="North Star metric">
        <Card>
          <p style={{ fontWeight: 600 }}>Decision shifts at the funding gate attributable to overlap evidence.</p>
          <p className="text-xs text-slate-500 mt-1">The proportion of committee reviews where overlap evidence demonstrably influenced the decision — reuse, scope change, withdrawal, or documented justification to proceed.</p>
        </Card>
      </Section>

      <Section>
        <Expandable title="Leading indicators">
          <ul className="list-disc pl-5 space-y-1">
            <li>Coverage — % of in-scope proposals run through SCOPE before committee review</li>
            <li>Quality — precision &amp; recall of overlap detection on a labelled set</li>
            <li>Stickiness — % of officers returning &gt; 1×/quarter (target 50%+)</li>
            <li>Time-to-evidence — median time from submission to SCOPE output</li>
          </ul>
        </Expandable>
        <div className="mt-2">
          <Expandable title="Lagging indicators">
            <ul className="list-disc pl-5 space-y-1">
              <li>SCOPE citation rate in committee papers (Stage 1+)</li>
              <li>Documented avoided-cost cases with cumulative value</li>
              <li>User-reported usefulness — % who report SCOPE changed what they did</li>
            </ul>
          </Expandable>
        </div>
      </Section>

      <Section heading="Three-stage system">
        <StageSelector />
      </Section>

      <Section heading="Expected impact">
        <p className="text-xs text-slate-500">Drag the pill along the timeline.</p>
        <TimelineSlider />
      </Section>
    </PageShell>
  );
}

/* ----------------------------- Expandable ----------------------------- */

function Expandable({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full px-4 py-3 flex items-center justify-between text-left active:scale-[0.995] transition"
        aria-expanded={open}
      >
        <span style={{ color: NAVY, fontWeight: 600 }}>{title}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 text-sm text-slate-700">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------- Stage selector --------------------------- */

interface Stage {
  key: "0" | "1" | "2";
  label: string;
  chip: string;
  title: string;
  body: string;
  icon: React.ReactNode;
}

const STAGES: Stage[] = [
  {
    key: "0",
    label: "Stage 0",
    chip: "Now · {build} 2026",
    title: "Officer-facing discovery",
    body: "PMs, BAs and product managers searching the WOG portfolio. Validated through the {build} 2026 technical experiment.",
    icon: <Compass className="w-4 h-4" />,
  },
  {
    key: "1",
    label: "Stage 1",
    chip: "Years 1–2",
    title: "Voluntary at funding gates",
    body: "Concrete incentives (e.g. expedited clearance) for proposers who engage. Building the run-case corpus and establishing expected-but-not-mandatory practice.",
    icon: <Rocket className="w-4 h-4" />,
  },
  {
    key: "2",
    label: "Stage 2",
    chip: "Year 2+",
    title: "Mandatory at scale-stage proposals",
    body: "Applied at scale-stage proposals (e.g. CDB/PSIRC) where overlap cost is highest. Identical technical core — different consumer and rollout posture.",
    icon: <Landmark className="w-4 h-4" />,
  },
];

function StageSelector() {
  const [active, setActive] = useState<Stage["key"]>("0");
  const stage = STAGES.find((s) => s.key === active)!;
  return (
    <div>
      <div className="flex gap-2 mb-3">
        {STAGES.map((s) => {
          const isActive = s.key === active;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => setActive(s.key)}
              className="flex-1 rounded-lg px-2 py-2 flex flex-col items-center gap-1 transition active:scale-95"
              style={{
                background: isActive ? NAVY : "#fff",
                color: isActive ? "#fff" : NAVY,
                border: `1.5px solid ${isActive ? NAVY : NAVY + "26"}`,
                boxShadow: isActive ? `0 4px 12px ${NAVY}33` : "none",
              }}
              aria-pressed={isActive}
            >
              <span style={{ opacity: isActive ? 1 : 0.7 }}>{s.icon}</span>
              <span style={{ fontSize: "0.7rem", fontWeight: 700 }}>{s.label}</span>
            </button>
          );
        })}
      </div>
      <div
        className="bg-white rounded-xl border p-4 min-h-[140px]"
        style={{ borderColor: `${NAVY}26` }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.key}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <span
              className="inline-block px-2 py-0.5 rounded text-[10px] mb-2"
              style={{ background: `${TEAL}1a`, color: TEAL, fontWeight: 700 }}
            >
              {stage.chip}
            </span>
            <p style={{ color: NAVY, fontWeight: 600 }}>{stage.title}</p>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">{stage.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* --------------------------- Timeline slider --------------------------- */

interface Horizon {
  key: "short" | "medium" | "long";
  label: string;
  range: string;
  title: string;
  body: string;
}

const HORIZONS: Horizon[] = [
  {
    key: "short",
    label: "Short",
    range: "0–6 months",
    title: "Stage 0 → Stage 1 transition",
    body: "Working prototype with measured matching performance on real WOG inputs (from {build} experiment). Sponsor identification and pilot deployment with one approving authority/committee, beginning Stage 1.",
  },
  {
    key: "medium",
    label: "Medium",
    range: "6–18 months",
    title: "Stage 1 in operation",
    body: "Voluntary use at funding gates is normalised across multiple agencies' funding/approval committees, with concrete incentives drawing engagement. Overlap engine functions across officer-facing search and developer-facing API, with a feedback loop to PSO and PMP on systemic gaps.",
  },
  {
    key: "long",
    label: "Long",
    range: "18+ months",
    title: "Stage 2 — mandatory at scale",
    body: "Mandatory use at scale-stage proposals (e.g. CDB/PSIRC). Capability overlap becomes a routine input to funding decisions across WOG. Run-case corpus produces the first systematic measurement of WOG capability overlap cost.",
  },
];

function TimelineSlider() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const x = useMotionValue(0);

  // Measure the track on mount + on resize
  useEffect(() => {
    const measure = () => {
      const w = trackRef.current?.offsetWidth ?? 0;
      setTrackWidth(w);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const stops = useMemo(() => {
    if (trackWidth <= 0) return [0, 0, 0];
    return HORIZONS.map((_, i) => (i * trackWidth) / (HORIZONS.length - 1));
  }, [trackWidth]);

  // Whenever the active index or track width changes, snap the pill
  useEffect(() => {
    if (trackWidth > 0) x.set(stops[index]);
  }, [index, trackWidth, stops, x]);

  const horizon = HORIZONS[index];

  return (
    <div>
      {/* Track */}
      <div className="relative mt-3 mb-5 select-none" style={{ paddingTop: 18, paddingBottom: 22 }}>
        <div
          ref={trackRef}
          className="relative h-1.5 rounded-full"
          style={{ background: "#e2e8f0" }}
        >
          {/* progress fill */}
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${NAVY}, ${TEAL})`, width: x }}
          />
          {/* stops */}
          {HORIZONS.map((h, i) => {
            const pos = stops[i] ?? 0;
            const isActive = i === index;
            return (
              <button
                key={h.key}
                type="button"
                onClick={() => setIndex(i)}
                className="absolute -translate-x-1/2 flex flex-col items-center"
                style={{ left: pos, top: -16 }}
                aria-label={`Jump to ${h.label} term`}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: isActive ? GOLD : "#fff",
                    border: `2px solid ${isActive ? GOLD : NAVY + "55"}`,
                  }}
                />
              </button>
            );
          })}
          {/* draggable pill */}
          {trackWidth > 0 && (
            <motion.div
              drag="x"
              dragMomentum={false}
              dragConstraints={{ left: 0, right: trackWidth }}
              dragElastic={0}
              style={{ x, top: -14, left: 0 }}
              className="absolute"
              onDrag={() => {
                const cur = x.get();
                let best = 0;
                let bestDist = Infinity;
                stops.forEach((s, i) => {
                  const d = Math.abs(s - cur);
                  if (d < bestDist) {
                    bestDist = d;
                    best = i;
                  }
                });
                if (best !== index) setIndex(best);
              }}
              onDragEnd={() => {
                const cur = x.get();
                let best = 0;
                let bestDist = Infinity;
                stops.forEach((s, i) => {
                  const d = Math.abs(s - cur);
                  if (d < bestDist) {
                    bestDist = d;
                    best = i;
                  }
                });
                setIndex(best);
              }}
            >
              <div
                className="-translate-x-1/2 px-3 py-1.5 rounded-full shadow-md cursor-grab active:cursor-grabbing flex items-center gap-1.5"
                style={{ background: NAVY, color: "#fff", border: `2px solid ${GOLD}` }}
              >
                <span
                  className="w-1 h-3 rounded-full"
                  style={{ background: "#ffffff80" }}
                />
                <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.02em" }}>{horizon.label}</span>
                <span
                  className="w-1 h-3 rounded-full"
                  style={{ background: "#ffffff80" }}
                />
              </div>
            </motion.div>
          )}
        </div>
        {/* axis labels */}
        <div className="absolute left-0 right-0 flex justify-between" style={{ bottom: 0, fontSize: "0.6rem", color: "#64748b", fontWeight: 600 }}>
          {HORIZONS.map((h) => (
            <span key={h.key} className="text-center" style={{ width: "33%" }}>{h.range}</span>
          ))}
        </div>
      </div>

      {/* Content panel */}
      <div className="bg-white rounded-xl border min-h-[150px] p-4" style={{ borderColor: `${NAVY}26` }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={horizon.key}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <span
              className="inline-block px-2 py-0.5 rounded text-[10px] mb-2"
              style={{ background: `${GOLD}26`, color: "#8a5a0a", fontWeight: 700 }}
            >
              {horizon.label.toUpperCase()} TERM · {horizon.range}
            </span>
            <p style={{ color: NAVY, fontWeight: 600 }}>{horizon.title}</p>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">{horizon.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
