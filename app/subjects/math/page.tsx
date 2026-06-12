import Link from "next/link";
import { ArrowLeft, BookOpenCheck, Boxes, Calculator, Route, Sigma, Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { countingFormulas } from "@/lib/math-counting-data";

export default function MathPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-mesh-light text-slate-900">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/85 px-4 py-2 text-sm font-black text-slate-700 shadow-card backdrop-blur transition hover:bg-sky-50">
          <ArrowLeft className="h-4 w-4" /> 홈으로
        </Link>
      </div>
      <SiteFooter />
    </main>
  );
}
