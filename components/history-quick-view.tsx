"use client";

import { useMemo, useState } from "react";
import { CalendarDays, ListChecks, UsersRound } from "lucide-react";
import { modernHistoryTimeline } from "@/lib/history-data";

type QuickTab = "timeline" | "events" | "people";

const tabs: { id: QuickTab; label: string; icon: typeof CalendarDays }[] = [
  { id: "timeline", label: "연표", icon: CalendarDays },
  { id: "events", label: "사건", icon: ListChecks },
  { id: "people", label: "인물", icon: UsersRound }
];

export function HistoryQuickView() {
  const [active, setActive] = useState<QuickTab>("timeline");
  const people = useMemo(() => {
    const seen = new Set<string>();
    return modernHistoryTimeline
      .flatMap((entry) => entry.people.map((person) => ({ person, event: entry.title })))
      .filter((item) => {
        if (seen.has(item.person)) return false;
        seen.add(item.person);
        return true;
      });
  }, []);

  return (
    <section className="mt-8 rounded-[36px] border border-white/70 bg-white/90 p-5 shadow-card backdrop-blur-2xl sm:p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-brand-700">Quick View</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">시험 직전 간단히 보기</h2>
          <p className="mt-2 text-sm font-bold leading-7 text-slate-500">연표·사건·인물만 빠르게 훑는 압축 화면입니다.</p>
        </div>
        <div className="grid grid-cols-3 gap-2 rounded-3xl border border-slate-100 bg-slate-50 p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActive(tab.id)} className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black transition ${active === tab.id ? "bg-slate-950 text-white shadow-card" : "text-slate-500 hover:bg-white"}`}>
                <Icon className="h-4 w-4" /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {active === "timeline" && (
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {modernHistoryTimeline.map((entry) => (
            <div key={entry.id} className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <span className="min-w-24 rounded-2xl bg-slate-950 px-3 py-2 text-center font-mono text-xs font-black text-white">{entry.year}</span>
              <div><p className="text-sm font-black text-slate-950">{entry.title}</p><p className="mt-1 text-xs font-bold text-slate-500">{entry.relation}</p></div>
            </div>
          ))}
        </div>
      )}

      {active === "events" && (
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {modernHistoryTimeline.map((entry) => (
            <div key={entry.id} className="rounded-[24px] border border-slate-100 bg-slate-50/80 p-4">
              <div className="flex items-center justify-between gap-3"><h3 className="font-black text-slate-950">{entry.title}</h3><span className="rounded-full bg-white px-3 py-1 font-mono text-xs font-black text-brand-700 ring-1 ring-slate-100">{entry.year}</span></div>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-600">{entry.summary}</p>
            </div>
          ))}
        </div>
      )}

      {active === "people" && (
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {people.map((item) => (
            <div key={item.person} className="rounded-[24px] border border-indigo-100 bg-indigo-50/70 p-4">
              <p className="text-lg font-black text-indigo-900">{item.person}</p>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-600">연결 사건: {item.event}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
