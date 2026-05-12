import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { PageShell, Section, Card } from "../components/PageShell";

const NAVY = "#1e3a5f";

export function Research({ onBack }: { onBack: () => void }) {
  return (
    <PageShell
      title="User Research"
      subtitle="Stakeholder engagement across three layers, plus a producer-side poll of 14 PMs."
      accent="from-sky-500 to-cyan-600"
      onBack={onBack}
    >
      <Section heading="Who we engaged">
        <ul className="list-disc pl-5 space-y-1">
          <li>Practice &amp; strategy leadership — DCE Sau Sheong, ACE/CIO Dominic, ACE Bee Teck, PMP Lead Jona</li>
          <li>CDB/IB committee member, Developer Portal team, Product Strategy Office officers</li>
          <li>Producer-side poll of 14 PMs (~16–17 central WOG products)</li>
        </ul>
      </Section>

      <Section heading="Key findings">
        <p className="text-xs text-slate-500 -mt-1">Tap each finding to expand.</p>
        <div className="space-y-2">
          <Expandable title="No consistent discovery moment">
            <p>9 of 14 PMs said discovery timing "varies too much to say". Only 3 reported agencies encountering their product before writing a proposal.</p>
          </Expandable>
          <Expandable title="Build-for-control dominates non-adoption">
            <p>Agencies prefer ownership over functional gaps — non-adoption is rarely about features missing.</p>
          </Expandable>
          <Expandable title="Integration is rarely the primary blocker">
            <p>Composability and integration friction surface only after the build-vs-reuse decision has already been made on other grounds.</p>
          </Expandable>
        </div>
      </Section>

      <Section heading="De-risking via technical experiment">
        <p>The primary risk is technical: whether SCOPE's matching engine returns relevant overlaps on real WOG inputs. If returns are inaccurate, no rollout strategy saves the proposal. The experiment tests this directly.</p>
        <Card>
          <p style={{ fontWeight: 600 }}>How it runs</p>
          <p className="text-xs text-slate-500 mt-1">
            Ten users provide their own prompts, questions or documents. SCOPE's output is independently reviewed by PMs of the products surfaced. PSO and TMO officers may comment as proxy-business-owner perspectives.
          </p>
        </Card>
        <p className="text-xs text-slate-500">
          Approving authorities are out of scope at this stage — recruiting them now would conflate technical validation with adoption signal. Approaching them later with a validated prototype is structurally more impactful.
        </p>
      </Section>
    </PageShell>
  );
}

function Expandable({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
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
