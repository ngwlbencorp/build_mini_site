import { PageShell, Section, Card } from "../components/PageShell";
import { ExternalLink } from "lucide-react";

export function Cost({ onBack }: { onBack: () => void }) {
  return (
    <PageShell
      title="Cost Methodology"
      subtitle="How the S$165M–S$330M directional figure was derived."
      accent="from-[#1e3a5f] to-[#2ca2a4]"
      onBack={onBack}
    >
      <Section heading="Singapore illustrative estimate">
        <Card>
          <p style={{ fontWeight: 600 }}>S$165M – S$330M annually</p>
          <p className="text-xs text-slate-500 mt-1">
            Represents 5–10% of Singapore's FY24 ICT spend (~S$3.3B) going toward capabilities that overlap with what already exists. The figure is directional, not measured.
          </p>
        </Card>
      </Section>

      <Section heading="Method and caveats">
        <p>
          There is no Singapore-specific benchmark for capability overlap as a percentage of ICT spend; the 5–10% range is therefore a working assumption rather than a derived estimate.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>5% treated as a conservative working assumption</li>
          <li>10% treated as a plausible ceiling pending direct measurement</li>
          <li>Intended to convey order of magnitude, not precision</li>
        </ul>
        <p>
          The absence of any systematic measurement of capability overlap cost in Singapore is itself part of the problem SCOPE addresses. A medium-term outcome of adoption is the data to replace this estimate with a measured figure.
        </p>
      </Section>

      <Section heading="Government precedents">
        <p>These are not direct analogues, but they show the structural conditions that produce material avoidable costs are well-documented in comparable governments.</p>

        <Card>
          <p style={{ fontWeight: 600 }}>US Government Accountability Office (GAO)</p>
          <p className="text-xs text-slate-500 mt-1">
            ~US$725B in financial benefits documented from 2011–2025 by addressing fragmentation, overlap and duplication across the federal government. A single 2025 recommendation on IT portfolio reviews was assessed as capable of generating US$100M+ on its own.
          </p>
          <a
            href="https://www.gao.gov/products/gao-25-107604"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-xs rounded-md px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700"
          >
            GAO-25-107604 · 2025 Annual Report
            <ExternalLink className="w-3 h-3" />
          </a>
        </Card>

        <Card>
          <p style={{ fontWeight: 600 }}>UK State of Digital Government Review (2025)</p>
          <p className="text-xs text-slate-500 mt-1">
            Identified fragmentation and duplication as systemic — including 44 different ways to prove identity to government in 2021. Broader digitisation savings estimated at £45B per year, or 4–7% of total UK public sector spend.
          </p>
          <a
            href="https://www.gov.uk/government/publications/state-of-digital-government-review/state-of-digital-government-review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-xs rounded-md px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700"
          >
            UK DSIT · State of Digital Government Review
            <ExternalLink className="w-3 h-3" />
          </a>
        </Card>
      </Section>

      <Section heading="Source for FY24 ICT spend">
        <Card>
          <p className="text-xs text-slate-700">
            GovTech Singapore (2024). "FY24: Government to spend more than $3B to modernise ICT infrastructure and develop digital services."
          </p>
          <a
            href="https://www.tech.gov.sg/media/media-releases/fy24-government-to-spend-more-than-3b-on-infrastructure-and-digital-services/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-xs rounded-md px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700"
          >
            tech.gov.sg
            <ExternalLink className="w-3 h-3" />
          </a>
        </Card>
      </Section>
    </PageShell>
  );
}
