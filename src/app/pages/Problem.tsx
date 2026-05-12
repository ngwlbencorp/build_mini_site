import { PageShell, Section, Card } from "../components/PageShell";
import { ArrowRight } from "lucide-react";
import type { PageKey } from "../App";

interface ProblemProps {
  onBack: () => void;
  navigate: (page: PageKey) => void;
}

export function Problem({ onBack, navigate }: ProblemProps) {
  return (
    <PageShell
      title="The Problem"
      subtitle="Capability overlap across WOG products carries significant, hidden cost."
      accent="from-rose-500 to-pink-600"
      onBack={onBack}
    >
      <Section heading="Who is affected">
        <p><strong>Primary (longer-term):</strong> Approving authorities at central funding and approval committees (IB) and agency-level equivalents.</p>
        <p><strong>Secondary ({"{build}"} test cohort):</strong> PMs, BAs, product managers, delivery managers and non-GovTech officers searching for existing solutions — hundreds across WOG.</p>
      </Section>

      <Section heading="The use case">
        <p>When a proposal lands at a funding gate, approvers need to evaluate whether the proposed capability already exists, in whole or in part, somewhere in the WOG product portfolio — but lack systematic means to do so.</p>
        <p>Officers writing new proposals encounter this when shaping a problem statement, evaluating build-vs-reuse, or preparing for funding.</p>
      </Section>

      <Section heading="Root cause">
        <p>There is no systematic way to detect capability overlap. Detection relies on:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Institutional memory of the assessor or proposer</li>
          <li>The proposer's own framing of related work</li>
          <li>Ad-hoc cross-checks</li>
        </ul>
        <p>AI-assisted development is lowering the cost of building from scratch — weakening the natural friction that previously slowed redundant builds.</p>
      </Section>

      <Section heading="The consequence">
        <button
          type="button"
          onClick={() => navigate("cost")}
          className="w-full text-left bg-white rounded-xl p-4 border border-rose-200 shadow-sm active:scale-[0.99] transition flex items-center gap-3"
          aria-label="View cost methodology and references"
        >
          <div className="flex-1">
            <p className="text-slate-900" style={{ fontWeight: 600 }}>S$165M – S$330M annually</p>
            <p className="text-xs text-slate-500 mt-1">Directional: 5–10% of Singapore's FY24 ICT spend (~S$3.3B) going toward overlapping capabilities.</p>
            <p className="text-[11px] mt-2 text-rose-600" style={{ fontWeight: 600 }}>Tap for methodology &amp; references →</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
        </button>
        <p>Without intervention, WOG accumulates costs across maintenance, security, compliance, and dilution of investment that should have gone into fewer, more mature products.</p>
        <p className="text-xs text-slate-500">Precedents: US GAO; UK State of Digital Government Review.</p>
      </Section>
    </PageShell>
  );
}
