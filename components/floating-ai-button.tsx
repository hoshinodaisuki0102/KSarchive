import Link from "next/link";
import { BrainCircuit } from "lucide-react";

export function FloatingAIButton() {
  return (
    <Link
      href="/chat"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-full bg-slate-900 px-5 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.25)] transition hover:-translate-y-1 hover:bg-brand-700"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
        <BrainCircuit className="h-5 w-5" />
      </span>
      AI 질문하기
    </Link>
  );
}