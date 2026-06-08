"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Siren } from "lucide-react";

const TARGET_TIME = "2026-06-29T10:40:00+09:00";

function getRemaining() {
  const diff = new Date(TARGET_TIME).getTime() - Date.now();
  const safe = Math.max(0, diff);
  const totalSeconds = Math.floor(safe / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, done: diff <= 0 };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function DdayTimer() {
  const [remaining, setRemaining] = useState(getRemaining);
  const targetLabel = useMemo(() => "2026.06.29 10:40 KST", []);

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const timeCode = `${pad(remaining.days)} : ${pad(remaining.hours)} : ${pad(remaining.minutes)} : ${pad(remaining.seconds)}`;

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-red-300 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.22),transparent_28%),linear-gradient(135deg,#7f1d1d_0%,#dc2626_54%,#f97316_100%)] p-5 text-white shadow-[0_30px_90px_rgba(220,38,38,.35)] sm:p-6">
      <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-yellow-300/30 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-red-950/40 blur-3xl" />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-black uppercase tracking-[0.24em] text-red-50 backdrop-blur">
            <Siren className="h-4 w-4 animate-pulse" /> Warning ! Final Exam
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            기말고사까지 {remaining.done ? "START" : `D-${remaining.days}`}
          </h2>
          <p className="mt-1 text-xs font-bold text-red-100 sm:text-sm">한국 기준 {targetLabel} 시작</p>
        </div>
        <div className="rounded-3xl border border-white/20 bg-black/25 px-4 py-3 text-left shadow-inner backdrop-blur sm:text-right">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-yellow-100 sm:justify-end">
            <AlertTriangle className="h-4 w-4" /> Time Left
          </p>
          <p className="mt-2 whitespace-nowrap font-mono text-2xl font-black tracking-tight text-white sm:text-3xl">
            {remaining.done ? "00 : 00 : 00 : 00" : timeCode}
          </p>
          <p className="mt-1 text-[11px] font-bold text-red-100">일 : 시간 : 분 : 초</p>
        </div>
      </div>
    </div>
  );
}
