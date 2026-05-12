import { ReactNode } from "react";
import { BackButton } from "./BackButton";

interface PageShellProps {
  title: string;
  subtitle?: string;
  accent?: string;
  onBack: () => void;
  children: ReactNode;
}

export function PageShell({ title, subtitle, accent = "from-indigo-500 to-violet-600", onBack, children }: PageShellProps) {
  return (
    <div className="min-h-full bg-slate-50">
      <BackButton onBack={onBack} />
      <header className={`bg-gradient-to-br ${accent} text-white pt-16 pb-8 px-5`}>
        <h1 className="text-white" style={{ fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.3 }}>{title}</h1>
        {subtitle && <p className="text-white/85 mt-2 text-sm leading-relaxed">{subtitle}</p>}
      </header>
      <main className="px-5 py-6 max-w-2xl mx-auto pb-16">
        {children}
      </main>
    </div>
  );
}

export function Section({ heading, children }: { heading?: string; children: ReactNode }) {
  return (
    <section className="mb-6">
      {heading && <h2 className="text-slate-900 mb-2" style={{ fontSize: "1.05rem", fontWeight: 600 }}>{heading}</h2>}
      <div className="text-slate-700 text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
      {children}
    </div>
  );
}
