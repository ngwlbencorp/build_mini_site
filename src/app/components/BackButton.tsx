import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onBack: () => void;
}

export function BackButton({ onBack }: BackButtonProps) {
  return (
    <button
      onClick={onBack}
      aria-label="Back to home"
      className="fixed top-3 left-3 z-50 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-3 py-2 shadow-md border border-black/5 active:scale-95 transition"
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="text-sm">Back</span>
    </button>
  );
}
