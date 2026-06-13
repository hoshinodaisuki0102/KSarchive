"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const WORD = "KSarchive".split("");

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
    const timer = window.setTimeout(() => setVisible(false), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_70%_65%,rgba(99,102,241,0.12),transparent_30%)]" />
      <div className="splash-glow absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/10 blur-3xl" />

      <div className="relative grid h-full place-items-center px-6">
        <div className="splash-wrap flex flex-col items-center">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="logo-box relative grid h-20 w-20 place-items-center rounded-[24px] border border-white/15 bg-white/95 p-2 shadow-[0_0_50px_rgba(56,189,248,0.18)] sm:h-24 sm:w-24">
              <Image src="/kyungshin-logo.png" alt="KSarchive 로고" width={80} height={80} className="h-full w-full object-contain" priority />
              <span className="logo-ring" />
            </div>

            <div className="wordmark" aria-label="KSarchive">
              {WORD.map((char, index) => (
                <span key={`${char}-${index}`} className="letter" style={{ ["--i" as string]: index }}>
                  <span className="letter-core">{char}</span>
                  <span className="letter-bar letter-bar-a" />
                  <span className="letter-bar letter-bar-b" />
                </span>
              ))}
            </div>
          </div>

          <p className="tagline mt-4 text-[11px] font-black uppercase tracking-[0.42em] text-sky-200/90 sm:text-xs">the key of study</p>
        </div>
      </div>

      <style jsx>{`
        .splash-wrap { animation: splash-fade 3s ease-in-out both; }
        .logo-box { animation: logo-in 0.9s cubic-bezier(.2,.9,.2,1) 0.12s both; }
        .logo-ring { position: absolute; inset: -1px; border-radius: 24px; border: 1px solid rgba(186,230,253,.55); animation: ring-pulse 2.2s ease-out .25s both; }
        .wordmark { display: flex; align-items: center; gap: .01em; font-weight: 900; line-height: 1; letter-spacing: -.04em; font-size: clamp(2.35rem, 6vw, 4.8rem); color: white; text-shadow: 0 0 18px rgba(125,211,252,.12); }
        .letter { position: relative; display: inline-block; overflow: visible; min-width: .55em; }
        .letter-core { position: relative; display: inline-block; opacity: 0; transform: translateY(16px) scale(.96); animation: letter-in .7s cubic-bezier(.2,.9,.2,1) both; animation-delay: calc(.32s + var(--i) * .075s); }
        .letter-bar { position: absolute; left: -.08em; width: 1.15em; height: .11em; border-radius: 999px; background: linear-gradient(90deg, rgba(255,255,255,0), rgba(186,230,253,.95), rgba(255,255,255,0)); filter: blur(.2px); opacity: 0; pointer-events: none; }
        .letter-bar-a { top: .18em; transform: translateX(-34px) rotate(-12deg); animation: bar-sweep-a .72s ease-out both; animation-delay: calc(.14s + var(--i) * .07s); }
        .letter-bar-b { top: .72em; transform: translateX(34px) rotate(10deg); animation: bar-sweep-b .72s ease-out both; animation-delay: calc(.2s + var(--i) * .07s); }
        .tagline { opacity: 0; transform: translateY(10px); animation: tagline-in .7s ease-out 1.25s both; }
        .splash-glow { animation: glow-breathe 3s ease-in-out both; }
        @keyframes splash-fade { 0% { opacity: 0; } 8% { opacity: 1; } 84% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes logo-in { 0% { opacity: 0; transform: translateX(-18px) scale(.92); filter: blur(10px); } 100% { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); } }
        @keyframes ring-pulse { 0% { opacity: .8; transform: scale(.92); } 100% { opacity: 0; transform: scale(1.35); } }
        @keyframes letter-in { 0% { opacity: 0; transform: translateY(16px) scale(.96); filter: blur(8px); } 55% { opacity: 1; transform: translateY(0) scale(1.015); filter: blur(0); } 100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } }
        @keyframes bar-sweep-a { 0% { opacity: 0; transform: translateX(-36px) rotate(-12deg) scaleX(.65); } 25% { opacity: 1; } 72% { opacity: .95; transform: translateX(0) rotate(0deg) scaleX(1); } 100% { opacity: 0; transform: translateX(10px) rotate(2deg) scaleX(1.08); } }
        @keyframes bar-sweep-b { 0% { opacity: 0; transform: translateX(36px) rotate(10deg) scaleX(.65); } 25% { opacity: 1; } 72% { opacity: .95; transform: translateX(0) rotate(0deg) scaleX(1); } 100% { opacity: 0; transform: translateX(-10px) rotate(-2deg) scaleX(1.08); } }
        @keyframes tagline-in { 0% { opacity: 0; transform: translateY(10px); filter: blur(6px); } 100% { opacity: 1; transform: translateY(0); filter: blur(0); } }
        @keyframes glow-breathe { 0% { opacity: 0; transform: translate(-50%,-50%) scale(.85); } 35% { opacity: 1; transform: translate(-50%,-50%) scale(1); } 100% { opacity: 0; transform: translate(-50%,-50%) scale(1.18); } }
        @media (prefers-reduced-motion: reduce) { .splash-wrap, .logo-box, .logo-ring, .letter-core, .letter-bar, .tagline, .splash-glow { animation: none !important; } }
      `}</style>
    </div>
  );
}
