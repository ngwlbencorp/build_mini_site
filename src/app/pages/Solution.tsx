import { PageShell, Section, Card } from "../components/PageShell";
import { Upload, Search, ListChecks } from "lucide-react";

export function Solution({ onBack }: { onBack: () => void }) {
  return (
    <PageShell
      title="Our Solution"
      subtitle="SCOPE searches the WOG portfolio at the level of capability — not product name or owning agency."
      accent="from-amber-500 to-orange-600"
      onBack={onBack}
    >
      <Section heading="Problem–solution fit">
        <p>SCOPE returns matches and combinations relevant to the stated need. It doesn't change decision rights — it changes the information available to whoever is deciding.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>{"{build}"} cohort:</strong> faster, more complete answer when scoping a proposal.</li>
          <li><strong>Longer term:</strong> the same engine surfaces build-vs-reuse at the funding gate where it matters most.</li>
        </ul>
      </Section>

      <Section heading="Key user flow">
        <Card>
          <ol className="space-y-3">
            <li className="flex gap-3"><Upload className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /><span>User uploads a proposal, system description, or asks a free-form question.</span></li>
            <li className="flex gap-3"><Search className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /><span>SCOPE parses the input into capability claims (function, user/data scope, interface).</span></li>
            <li className="flex gap-3"><ListChecks className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /><span>It searches the indexed WOG catalogue and returns overlapping or partially-overlapping products with matched capability dimensions.</span></li>
          </ol>
        </Card>
      </Section>

      <Section heading="Technical approach">
        <p>Capability extraction parses proposal text and product documentation into structured representations. An AI Agent uses tools for keyword, semantic and hybrid search to surface direct and partial matches.</p>
        <p>Matching is at the capability level — not name-level keyword search — so the agent can compare what existing products can do against what a proposed new product seeks to implement.</p>
      </Section>

      <Section heading="Why a gate, not a portal">
        <p>Upstream portals, composability tooling, and pre-submission declarations all rely on the proposer choosing to engage. The funding gate is the one point that reaches every proposal, where the actor has authority, and before resources are committed.</p>
      </Section>

      <Section heading="User experience">
        <p>SCOPE accepts free-form input and returns an evidence-linked list. No new interface to learn beyond <em>"describe what you're trying to do."</em></p>
      </Section>
    </PageShell>
  );
}
