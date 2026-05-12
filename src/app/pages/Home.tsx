import { AlertCircle, Lightbulb, Users, TrendingUp, PlayCircle, MessageSquare, ArrowRight } from "lucide-react";
import type { PageKey } from "../App";
import { InteractivePanel } from "../components/InteractivePanel";
import { TeamCarousel } from "../components/TeamCarousel";
import scopeLogo from "../../imports/scope_logo.jpg";
import { Users2 } from "lucide-react";

// TODO: Replace with the feedback URL provided by the hackathon organisers.
const FEEDBACK_URL: string = "REPLACE_WITH_FEEDBACK_URL";

// SCOPE brand palette
const NAVY = "#1e3a5f";
const TEAL = "#2ca2a4";
const GOLD = "#e8a83a";

interface HomeProps {
  navigate: (page: PageKey) => void;
}

const sections: { key: PageKey; label: string; desc: string; icon: any; bg: string; fg: string }[] = [
  { key: "problem", label: "The Problem", desc: "Capability overlap across WOG products", icon: AlertCircle, bg: "#fdecec", fg: "#b91c1c" },
  { key: "solution", label: "Our Solution", desc: "How SCOPE surfaces overlap", icon: Lightbulb, bg: "#fff5dc", fg: "#a86c12" },
  { key: "research", label: "User Research", desc: "Insights & stakeholder buy-in", icon: Users, bg: "#e8f6f6", fg: TEAL },
  { key: "impact", label: "Impact & Roadmap", desc: "Metrics and next steps", icon: TrendingUp, bg: "#e6ecf4", fg: NAVY },
  { key: "video", label: "Prototype Demo", desc: "Watch the screen recording", icon: PlayCircle, bg: "#fff5dc", fg: "#a86c12" },
];

export function Home({ navigate }: HomeProps) {
  const feedbackReady = FEEDBACK_URL !== "REPLACE_WITH_FEEDBACK_URL";

  return (
    <div className="min-h-full" style={{ background: "#f5f8fc" }}>
      {/* Hero — compact on mobile */}
      <header
        className="text-white px-5 pt-5 pb-5 sm:pt-7 sm:pb-7"
        style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2a4d7a 55%, ${TEAL} 130%)` }}
      >
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
          <p className="text-white/70 text-[10px] tracking-widest uppercase mb-2">build 2026</p>
          {/* Logo lockup: cropped logo image + tagline together */}
          <div
            className="rounded-lg flex flex-col items-center"
            style={{
              background: "#fff",
              padding: "8px 14px 10px",
              border: "1px solid rgba(255,255,255,0.35)",
            }}
          >
            {/* Cropped logo via background-image (trims the surrounding whitespace) */}
            <div
              role="img"
              aria-label="SCOPE"
              style={{
                width: "180px",
                maxWidth: "60vw",
                aspectRatio: "3.4 / 1",
                backgroundImage: `url(${scopeLogo})`,
                backgroundSize: "auto 340%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <p
              className="mt-0.5 text-center"
              style={{
                color: NAVY,
                fontSize: "0.62rem",
                letterSpacing: "0.04em",
                lineHeight: 1.2,
                fontWeight: 600,
              }}
            >
              Surfacing Capability Overlap &amp;<br />Portfolio Evidence
            </p>
          </div>
          <p className="text-white/95 text-xs sm:text-sm leading-relaxed mt-3">
            A decision-support tool that surfaces capability overlaps across whole-of-government products.
          </p>
        </div>
      </header>

      <main className="px-5 py-6 max-w-2xl mx-auto">
        {/* Interactive story */}
        <section className="mb-7">
          <InteractivePanel />
          <p className="text-xs mt-3 leading-relaxed" style={{ color: "#475569" }}>
            Proposals are scanned for capability overlaps with central products. Overlap results are <span style={{ color: NAVY, fontWeight: 600 }}>evidence, not a verdict</span>.
          </p>
        </section>

        {/* Cost card — tap to view methodology */}
        <section className="mb-7">
          <button
            type="button"
            onClick={() => navigate("cost")}
            className="w-full bg-white rounded-xl p-4 text-left active:scale-[0.99] transition shadow-sm flex items-center gap-3"
            style={{ border: `1px solid ${NAVY}14` }}
            aria-label="View cost methodology and references"
          >
            <div className="flex-1">
              <p className="text-xs" style={{ color: "#64748b" }}>Estimated annual WOG cost</p>
              <p className="mt-1" style={{ color: NAVY, fontSize: "1.25rem", fontWeight: 700 }}>
                S$165M–330M<span className="text-xs" style={{ color: "#94a3b8", fontWeight: 500 }}> /yr (directional)</span>
              </p>
              <p className="text-[11px] mt-1" style={{ color: TEAL, fontWeight: 600 }}>
                Tap for methodology &amp; references →
              </p>
            </div>
            <ArrowRight className="w-4 h-4 shrink-0" style={{ color: "#94a3b8" }} />
          </button>
        </section>


        {/* Section nav */}
        <h2 className="mb-3" style={{ color: NAVY, fontSize: "1rem", fontWeight: 600 }}>Explore</h2>
        <nav className="space-y-2.5 mb-7">
          {sections.map(({ key, label, desc, icon: Icon, bg, fg }) => (
            <button
              key={key}
              onClick={() => navigate(key)}
              className="w-full bg-white rounded-xl p-4 flex items-center gap-3 text-left active:scale-[0.99] transition shadow-sm"
              style={{ border: `1px solid ${NAVY}14` }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: bg, color: fg }}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ color: NAVY, fontWeight: 600 }}>{label}</p>
                <p className="text-xs truncate" style={{ color: "#64748b" }}>{desc}</p>
              </div>
              <ArrowRight className="w-4 h-4" style={{ color: "#94a3b8" }} />
            </button>
          ))}
        </nav>

        {/* Feedback */}
        <section className="bg-white rounded-xl p-4" style={{ border: `1px solid ${NAVY}14` }}>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${TEAL}1a`, color: TEAL }}>
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p style={{ color: NAVY, fontWeight: 600 }}>Share your feedback</p>
              <p className="text-xs mb-3" style={{ color: "#64748b" }}>Help us shape SCOPE — your input goes to the hackathon organisers.</p>
              {feedbackReady ? (
                <a
                  href={FEEDBACK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg text-white px-3 py-2 text-sm active:scale-95 transition"
                  style={{ background: NAVY }}
                >
                  Open feedback form
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <p className="text-xs px-2 py-1.5 rounded-md" style={{ background: `${GOLD}1f`, color: "#8a5a0a", border: `1px solid ${GOLD}55` }}>
                  Feedback URL pending — update FEEDBACK_URL in src/app/pages/Home.tsx.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Meet the team */}
        <section className="bg-white rounded-xl p-4 mt-4" style={{ border: `1px solid ${NAVY}14` }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${NAVY}10`, color: NAVY }}>
              <Users2 className="w-5 h-5" />
            </div>
            <div>
              <p style={{ color: NAVY, fontWeight: 600 }}>Meet the team</p>
              <p className="text-xs" style={{ color: "#64748b" }}>The minds behind SCOPE.</p>
            </div>
          </div>
          <TeamCarousel />
        </section>

        <p className="text-center text-xs mt-8" style={{ color: "#94a3b8" }}>build 2026 · Booth Showcase</p>
      </main>
    </div>
  );
}

