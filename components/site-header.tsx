import Image from "next/image";
import Link from "next/link";
import { BrainCircuit, Orbit, Sparkles } from "lucide-react";
import { AuthStatus } from "@/components/auth-status";

const navItems = [
  { label: "Subjects", href: "/#subjects" },
  { label: "English", href: "/subjects/english" },
  { label: "History", href: "/subjects/history" },
  { label: "Arona OS", href: "/chat" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/72 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3.5 lg:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <div className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-[22px] border border-sky-100 bg-white p-1 shadow-neon transition duration-300 group-hover:-rotate-3 group-hover:scale-105">
            <Image src="/kyungshin-logo.png" alt="경신고등학교 로고" width={52} height={52} className="h-12 w-12 object-contain" priority />
          </div>
          <div className="min-w-0">
            <p className="hidden items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.28em] text-brand-700/90 sm:flex">
              <Orbit className="h-3.5 w-3.5" /> Kyungshin OS
            </p>
            <h1 className="truncate text-xl font-black tracking-tight text-slate-950">KSarchive</h1>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-sky-100 bg-white/80 p-1.5 shadow-card md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-black text-slate-600 transition hover:bg-slate-950 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/chat" className="hidden items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-card transition hover:-translate-y-0.5 hover:bg-brand-700 sm:inline-flex">
            <Sparkles className="h-4 w-4 text-sky-200" />
            Arona OS
          </Link>
          <Link href="/chat" className="grid h-11 w-11 place-items-center rounded-full bg-slate-950 text-white shadow-card sm:hidden" aria-label="Arona OS">
            <BrainCircuit className="h-5 w-5" />
          </Link>
          <AuthStatus />
        </div>
      </div>
    </header>
  );
}
