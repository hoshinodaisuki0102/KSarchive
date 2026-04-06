import Link from "next/link";
import { BrainCircuit, Menu, Search } from "lucide-react";

const navItems = [
  { label: "Subjects", href: "#subjects" },
  { label: "Exam", href: "#exam" },
  { label: "Quiz", href: "#quiz" },
  { label: "AI Chat", href: "#ai" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500 text-white shadow-glow transition-transform duration-300 group-hover:scale-105">
            KS
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-700/80">
              Kyungshin Study Archive
            </p>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">KSarchive</h1>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-blue-100 bg-white/90 p-1.5 shadow-card md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-100 bg-white text-slate-600 shadow-card transition hover:-translate-y-0.5 hover:text-brand-700">
            <Search className="h-5 w-5" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-700">
            <BrainCircuit className="h-4 w-4" />
            전체 AI 질문
          </button>
        </div>

        <button className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-100 bg-white text-slate-700 shadow-card md:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}