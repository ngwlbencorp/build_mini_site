import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileText, Search, AlertTriangle, EyeOff, CheckCircle2, ShieldCheck, Play } from "lucide-react";

// SCOPE brand palette
const NAVY = "#1e3a5f";
const TEAL = "#2ca2a4";
const GOLD = "#e8a83a";

// Timings (ms)
const LOAD_MS = 1100;       // "Loading Proposal" delay before scan starts
const ORBIT_MS = 7500;      // one full magnifier orbit
const HOLD_MS = 2400;       // pause after all matches revealed
const RESTART_MS = 5000;    // pause before auto-relooping

interface Match {
  product: string;
  overlap: "Critical" | "High" | "Medium";
  feature: string;
  color: string;
  // Position inside the panel — kept well within the boundary
  pos: { top?: string; bottom?: string; left?: string; right?: string };
}

// Adapted (not copied) from a real SCOPE response, kept short for booth viewing
const MATCHES: Match[] = [
  { product: "GatherSG", overlap: "Critical", feature: "Case management overlap", color: "#dc2626", pos: { top: "8%",    right: "4%" } },
  { product: "LifeSG",   overlap: "High",     feature: "Benefit wallet overlap",   color: GOLD,     pos: { bottom: "10%", right: "4%" } },
  { product: "MyInfo",   overlap: "High",     feature: "WOG data API overlap",     color: TEAL,     pos: { bottom: "8%",  left: "4%"  } },
];

type Phase = "idle" | "loading" | "scanning" | "done";

const MATCH_REVEAL_MS = ORBIT_MS / (MATCHES.length + 1); // spread reveals across the orbit

export function InteractivePanel() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [revealed, setRevealed] = useState(0);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const startScan = useCallback(() => {
    clearTimers();
    setRevealed(0);
    setPhase("loading");

    timers.current.push(
      window.setTimeout(() => {
        setPhase("scanning");
        MATCHES.forEach((_, i) => {
          timers.current.push(
            window.setTimeout(() => {
              setRevealed(i + 1);
            }, MATCH_REVEAL_MS * (i + 1))
          );
        });
        timers.current.push(
          window.setTimeout(() => {
            setPhase("done");
            timers.current.push(
              window.setTimeout(() => {
                setRevealed(0);
                setPhase("idle");
                // auto-relaunch
                timers.current.push(window.setTimeout(() => startScan(), RESTART_MS));
              }, HOLD_MS)
            );
          }, ORBIT_MS)
        );
      }, LOAD_MS)
    );
  }, []);

  // auto-start on mount
  useEffect(() => {
    const t = window.setTimeout(() => startScan(), 600);
    timers.current.push(t);
    return clearTimers;
  }, [startScan]);

  const magnifierVisible = phase === "scanning";
  // Indicators flip colour midway through the scan (after the 2nd match reveal), then hold through "done"
  const indicatorsFlipped =
    phase === "done" || (phase === "scanning" && revealed >= Math.ceil(MATCHES.length / 2));

  return (
    <div className="w-full">
      {/* Animated scene */}
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          aspectRatio: "16 / 12",
          border: `1px solid ${NAVY}1f`,
          background: `radial-gradient(circle at 50% 50%, #ffffff 0%, #eaf3f4 70%, #d9e6ea 100%)`,
        }}
      >
        {/* subtle grid */}
        <svg className="absolute inset-0 w-full h-full opacity-40" aria-hidden>
          <defs>
            <pattern id="grid2" width="22" height="22" patternUnits="userSpaceOnUse">
              <path d="M 22 0 L 0 0 0 22" fill="none" stroke={NAVY} strokeOpacity="0.06" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid2)" />
        </svg>

        {/* Orbit guide (faint dashed circle) — only while scanning */}
        <AnimatePresence>
          {magnifierVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: "62%",
                paddingBottom: "62%",
                transform: "translate(-50%, -50%)",
                border: `1.5px dashed ${NAVY}26`,
              }}
            />
          )}
        </AnimatePresence>

        {/* BIG proposal card (centerpiece) — z-0 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 5 }}>
          <div
            className="rounded-2xl shadow-lg flex flex-col items-center gap-2 px-5 py-4"
            style={{ background: "#fff", border: `1.5px solid ${NAVY}26`, width: 170 }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ background: `${NAVY}10`, color: NAVY }}
            >
              <FileText className="w-8 h-8" />
            </div>
            <p style={{ color: NAVY, fontWeight: 700, fontSize: "0.95rem" }}>Proposal</p>
            <div className="w-full space-y-1 pt-1">
              <div className="h-1.5 rounded-full" style={{ background: `${NAVY}1a` }} />
              <div className="h-1.5 rounded-full w-3/4" style={{ background: `${NAVY}1a` }} />
              <div className="h-1.5 rounded-full w-1/2" style={{ background: `${NAVY}1a` }} />
            </div>
          </div>
        </div>

        {/* Orbiting magnifier — fades in/out with scan */}
        <AnimatePresence>
          {magnifierVisible && (
            <motion.div
              key="orbit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute left-1/2 top-1/2 pointer-events-none"
              style={{
                width: "62%",
                paddingBottom: "62%",
                marginLeft: "-31%",
                marginTop: "-31%",
                zIndex: 10,
              }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: ORBIT_MS / 1000, ease: "linear", repeat: Infinity }}
              >
                {/* magnifier sits at top-center of orbit wrapper, counter-rotated to stay upright */}
                <motion.div
                  className="absolute"
                  style={{ left: "50%", top: 0, width: 64, height: 64, marginLeft: -32, marginTop: -32 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: ORBIT_MS / 1000, ease: "linear", repeat: Infinity }}
                >
                  {/* glow */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${TEAL}40 0%, ${TEAL}00 65%)`,
                      transform: "scale(1.5)",
                    }}
                  />
                  {/* translucent magnifier */}
                  <div
                    className="absolute inset-0 rounded-full flex items-center justify-center"
                    style={{
                      background: `${NAVY}55`,
                      backdropFilter: "blur(2px)",
                      WebkitBackdropFilter: "blur(2px)",
                      border: `2px solid ${NAVY}99`,
                      boxShadow: `0 6px 16px ${NAVY}33`,
                    }}
                  >
                    <Search className="w-7 h-7" style={{ color: "#ffffffd9" }} />
                  </div>
                  <div
                    className="absolute"
                    style={{
                      right: -5,
                      bottom: -5,
                      width: 14,
                      height: 14,
                      borderRadius: 7,
                      background: GOLD,
                      border: "2px solid #fff",
                      opacity: 0.85,
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Match cards — IN FRONT of magnifier, instant pop, contained within panel */}
        {MATCHES.map((m, i) => (
          <AnimatePresence key={m.product}>
            {i < revealed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute rounded-lg shadow-md px-2.5 py-1.5"
                style={{
                  ...m.pos,
                  background: "#fff",
                  border: `1.5px solid ${m.color}aa`,
                  maxWidth: 140,
                  zIndex: 20,
                }}
              >
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: m.color }} />
                  <span style={{ color: NAVY, fontSize: "0.7rem", fontWeight: 700 }}>{m.product}</span>
                  <span
                    className="px-1 py-0.5 rounded"
                    style={{ background: `${m.color}1f`, color: m.color, fontSize: "0.55rem", fontWeight: 700, lineHeight: 1 }}
                  >
                    {m.overlap.toUpperCase()}
                  </span>
                </div>
                <p className="mt-0.5" style={{ color: "#475569", fontSize: "0.62rem", lineHeight: 1.25 }}>
                  {m.feature}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        ))}

        {/* Status pill — bigger text */}
        <div className="absolute left-3 top-3" style={{ zIndex: 30 }}>
          <div
            className="px-3 py-1.5 rounded-full flex items-center gap-2"
            style={{
              background: "#fff",
              border: `1px solid ${NAVY}1f`,
              color: NAVY,
              fontWeight: 700,
              fontSize: "0.85rem",
            }}
          >
            <motion.span
              className="w-2 h-2 rounded-full"
              style={{ background: phase === "loading" ? GOLD : TEAL }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            {phase === "loading" && "Loading Proposal…"}
            {phase === "scanning" && "SCOPE scanning…"}
            {phase === "done" && "Scan complete"}
            {phase === "idle" && "Ready"}
          </div>
        </div>

        {/* Manual trigger when idle */}
        <AnimatePresence>
          {phase === "idle" && (
            <motion.button
              key="trigger"
              type="button"
              onClick={startScan}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute left-1/2 -translate-x-1/2 rounded-full flex items-center gap-2 shadow-lg active:scale-95 transition"
              style={{
                bottom: "8%",
                background: NAVY,
                color: "#fff",
                padding: "0.55rem 1rem",
                fontWeight: 700,
                fontSize: "0.8rem",
                zIndex: 30,
                border: `2px solid ${TEAL}`,
              }}
              aria-label="Start scan"
            >
              <Play className="w-4 h-4" />
              Run scan
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Indicator chips — swap from problem → outcome during scan */}
      <div className="grid grid-cols-2 gap-3 mt-3">
        <IndicatorChip
          problemIcon={<AlertTriangle className="w-4 h-4" />}
          outcomeIcon={<CheckCircle2 className="w-4 h-4" />}
          problemLabel="Run / maintenance cost"
          outcomeLabel="Capability match"
          scanning={indicatorsFlipped}
        />
        <IndicatorChip
          problemIcon={<EyeOff className="w-4 h-4" />}
          outcomeIcon={<ShieldCheck className="w-4 h-4" />}
          problemLabel="No visibility"
          outcomeLabel="Evidence, not verdict"
          scanning={indicatorsFlipped}
        />
      </div>
    </div>
  );
}

interface ChipProps {
  problemIcon: React.ReactNode;
  outcomeIcon: React.ReactNode;
  problemLabel: string;
  outcomeLabel: string;
  scanning: boolean;
}

function IndicatorChip({ problemIcon, outcomeIcon, problemLabel, outcomeLabel, scanning }: ChipProps) {
  const bg = scanning ? "#e8f6f6" : "#fdecec";
  const border = scanning ? `${TEAL}66` : "#fca5a5";
  const fg = scanning ? TEAL : "#b91c1c";
  return (
    <motion.div
      animate={{ background: bg, borderColor: border }}
      transition={{ duration: 0.5 }}
      className="rounded-xl px-3 py-2.5 flex items-center gap-2 border"
      style={{ borderColor: border }}
    >
      <motion.div
        animate={{ color: fg, scale: scanning ? [1, 1.15, 1] : 1 }}
        transition={{ duration: 0.6 }}
        className="shrink-0"
      >
        {scanning ? outcomeIcon : problemIcon}
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.p
          key={scanning ? "out" : "prob"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
          style={{ color: fg, fontWeight: 600, fontSize: "0.72rem" }}
        >
          {scanning ? outcomeLabel : problemLabel}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}
