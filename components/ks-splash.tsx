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
    const timer = window.setTimeout(() => setVisible(false), 4000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_70%_65%,rgba(99,102,241,0.12),transparent_30%)]" />
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/10 blur-3xl splash-glow" />

      <div className="relative grid h-full place-items-center px-6">
        <div className="splash-wrap flex flex-col items-center">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="logo-box relative grid h-20 w-20 place-items-center rounded-[24px] border border-white/15 bg-white/95 p-2 shadow-[0_0_50px_rgba(56,189,248,0.18)] sm:h-24 sm:w-24">
              <Image src="/kyungshin-logo.png" alt="KSarchive 로고" width={80} height={80} className="h-full w-full object-contain" priority />
              <span className="logo-ring" />
            </div>

            <div className="wordmark-wrap relative">
              <span className="line-motion line-motion-a" />
              <span className="line-motion line-motion-b" />
              <span className="line-motion line-motion-c" />
              <h1 className="wordmark">KSarchive</h1>
            </div>
          </div>

          <p className="tagline mt-4 text-[11px] font-black uppercase tracking-[0.42em] text-sky-200/90 sm:text-xs">the key of study</p>
        </div>
      </div>

      <style jsx>{`
        .splash-wrap { animation: splash-fade 4s ease-in-out both; }
        .logo-box { animation: logo-in 0.9s cubic-bezier(.2,.9,.2,1) 0.12s both; }
        .logo-ring { position: absolute; inset: -1px; border-radius: 24px; border: 1px solid rgba(186,230,253,.55); animation: ring-pulse 2.2s ease-out .25s both; }
        .wordmark { margin: 0; white-space: nowrap; font-weight: 950; line-height: .92; letter-spacing: -.075em; font-size: clamp(2.7rem, 10.5vw, 5.6rem); color: rgba(241,245,249,.94); opacity: 0; animation: word-in .9s cubic-bezier(.2,.9,.2,1) .85s both; }
        .line-motion { position: absolute; z-index: 3; left: -12%; width: 124%; height: 2px; border-radius: 999px; background: linear-gradient(90deg, transparent, rgba(255,255,255,.95), rgba(125,211,252,.9), transparent); opacity: 0; box-shadow: 0 0 12px rgba(56,189,248,.5); }
        .line-motion-a { top: 12%; animation: line-a 1s ease-out .34s both; }
        .line-motion-b { top: 50%; animation: line-b 1s ease-out .52s both; }
        .line-motion-c { top: 84%; animation: line-a 1s ease-out .7s both; }
        .tagline { opacity: 0; transform: translateY(10px); animation: tagline-in 0.7s ease-out 1.35s both; }
        .splash-glow { animation: glow-breathe 4s ease-in-out both; }
        @keyframes splash-fade { 0% { opacity: 0; } 7% { opacity: 1; } 86% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes logo-in { 0% { opacity: 0; transform: translateX(-18px) scale(.92); filter: blur(10px); } 100% { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); } }
        @keyframes ring-pulse { 0% { opacity: .8; transform: scale(.92); } 100% { opacity: 0; transform: scale(1.35); } }
        @keyframes word-in { 0% { opacity: 0; transform: translateX(-14px); filter: blur(8px); } 100% { opacity: 1; transform: translateX(0); filter: blur(0); } }
        @keyframes line-a { 0% { opacity: 0; transform: translateX(-34%) scaleX(.35); } 28% { opacity: 1; } 100% { opacity: 0; transform: translateX(12%) scaleX(1.05); } }
        @keyframes line-b { 0% { opacity: 0; transform: translateX(34%) scaleX(.35); } 28% { opacity: 1; } 100% { opacity: 0; transform: translateX(-12%) scaleX(1.05); } }
        @keyframes tagline-in { 0% { opacity: 0; transform: translateY(10px); filter: blur(6px); } 100% { opacity: 1; transform: translateY(0); filter: blur(0); } }
        @keyframes glow-breathe { 0% { opacity: 0; transform: translate(-50%, -50%) scale(.85); } 35% { opacity: 1; transform: translate(-50%, -50%) scale(1); } 100% { opacity: 0; transform: translate(-50%, -50%) scale(1.18); } }
        @media (max-width: 520px) { .wordmark { font-size: clamp(2.45rem, 11.5vw, 3.55rem); letter-spacing: -.085em; } .tagline { letter-spacing: .28em; } }
        @media (prefers-reduced-motion: reduce) { .splash-wrap, .logo-box, .logo-ring, .wordmark, .line-motion, .tagline, .splash-glow { animation: none !important; opacity: 1; } }
      `}</style>
    </div>
  );
}
