import { PageShell, Section } from "../components/PageShell";
import { useState } from "react";
import { Film } from "lucide-react";

// To replace the demo: drop your file at `public/videos/prototype-demo.mp4`
// (create the `public/videos/` folder if it doesn't exist). Update VIDEO_SRC
// if you use a different filename or extension.
const VIDEO_SRC = "/videos/prototype-demo.mp4";

export function Video({ onBack }: { onBack: () => void }) {
  const [errored, setErrored] = useState(false);

  return (
    <PageShell
      title="Prototype Demo"
      subtitle="A screen-recording walkthrough of the SCOPE prototype."
      accent="from-violet-500 to-purple-600"
      onBack={onBack}
    >
      <Section>
        <div className="rounded-xl overflow-hidden bg-black aspect-video relative">
          {!errored ? (
            <video
              key={VIDEO_SRC}
              src={VIDEO_SRC}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full"
              onError={() => setErrored(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80 px-6 text-center">
              <Film className="w-10 h-10 mb-3 opacity-70" />
              <p className="text-sm" style={{ fontWeight: 600 }}>Video not found</p>
              <p className="text-xs mt-1 opacity-80">
                Upload your recording to <code className="font-mono bg-white/10 px-1 py-0.5 rounded">public/videos/prototype-demo.mp4</code>
              </p>
            </div>
          )}
        </div>
      </Section>

      <Section heading="About this demo">
        <p>This recording walks through the core SCOPE flow: free-form input, capability extraction, and the evidence-linked list of overlapping or partially-overlapping WOG products.</p>
        <p className="text-xs text-slate-500">Tip: rotate your phone to landscape for a larger view.</p>
      </Section>
    </PageShell>
  );
}
