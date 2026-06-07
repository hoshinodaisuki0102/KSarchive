import Link from "next/link";
import { BrainCircuit, Sparkles } from "lucide-react";

export function FloatingAIButton() {
  return (
    <Link
      href="/chat"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-full border border-white/20 bg-slate-950/95 px-5 py-4 text-sm font-black text-white shadow-deep backdrop-blur transition hover:-translate-y-1 hover:bg-brand-700"
    >
      <span className="relative grid h-10 w-10 place-items-center rounded-full bg-white/10">
        <span className="absolute inset-0 animate-pulseSoft rounded-full bg-sky-400/25" />
        <BrainCircuit className="relative h-5 w-5" />
      </span>
      <span>Arona OS</span>
      <Sparkles className="h-4 w-4 text-sky-200" />
    </Link>
  );
}
