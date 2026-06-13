"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function KsSplash() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const seen = sessionStorage.getItem("ksarchive-splash-seen");
    if (seen) {
      setVisible(false);
      return;
    }
    sessionStorage.setItem("ksarchive-splash-seen", "1");
    const timer = window.setTimeout(() => setVisible(false), 1900);
    return () => window.clearTimeout(timer);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div className="fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-slate-950 text-white">
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/20 blur-3xl splash-pulse" />
      <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />

      <div className="relative flex flex-col items-center splash-enter">
        <div className="relative grid h-28 w-28 place-items-center rounded-[34px] border border-white/20 bg-white p-3 shadow-[0_0_60px_rgba(56,189,248,0.45)]">
          <Image src="/kyungshin-logo.png" alt="KSarchive 로고" width={96} height={96} className="h-full w-full object-contain" priority />
          <span className="absolute inset-0 rounded-[34px] border border-sky-200/70 splash-ring" />
        </div>
        <h1 className="mt-7 text-4xl font-black tracking-tight sm:text-5xl">KSarchive</h1>
        <p className="mt-3 text-xs font-black uppercase tracking-[0.38em] text-sky-200">Final Study System</p>
        <div className="mt-7 h-1 w-56 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full origin-left rounded-full bg-sky-300 splash-bar" />
        </div>
      </div>

      <style jsx>{`
        .splash-enter {
          animation: splash-enter 1.55s cubic-bezier(.2,.9,.2,1) both;
        }
        .splash-ring {
          animation: splash-ring 1.45s ease-out infinite;
        }
        .splash-pulse {
          animation: splash-pulse 1.9s ease-in-out both;
        }
        .splash-bar {
          animation: splash-bar 1.55s ease-out both;
        }
        @keyframes splash-enter {
          0% { opacity: 0; transform: translateY(18px) scale(.92); filter: blur(10px); }
          45% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
          82% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
          100% { opacity: 0; transform: translateY(-10px) scale(1.03); filter: blur(8px); }
        }
        @keyframes splash-ring {
          0% { opacity: .75; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.36); }
        }
        @keyframes splash-pulse {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(.75); }
          35% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.2); }
        }
        @keyframes splash-bar {
          0% { transform: scaleX(0); opacity: .4; }
          70% { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(1); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .splash-enter, .splash-ring, .splash-pulse, .splash-bar { animation: none; }
        }
      `}</style>
    </div>
  );
}
