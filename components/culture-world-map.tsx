"use client";

import { useMemo, useState } from "react";
import { Globe2, MapPin, Sparkles } from "lucide-react";
import { cultureZones, type CultureCountry, type CultureZone } from "@/lib/social-culture-data";

export function CultureWorldMap() {
  const [selectedZoneId, setSelectedZoneId] = useState(cultureZones[0].id);
  const [selectedCountry, setSelectedCountry] = useState<CultureCountry | null>(cultureZones[0].countries[0]);

  const selectedZone = useMemo(() => cultureZones.find((zone) => zone.id === selectedZoneId) ?? cultureZones[0], [selectedZoneId]);

  function selectZone(zone: CultureZone) {
    setSelectedZoneId(zone.id);
    setSelectedCountry(zone.countries[0] ?? null);
  }

  return (
    <section className="mt-8 rounded-[38px] border border-white/70 bg-white/90 p-5 shadow-card backdrop-blur-2xl sm:p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-brand-700">Culture Map</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">문화권 인터랙티브 세계지도</h2>
          <p className="mt-2 text-sm font-bold leading-7 text-slate-500">문화권 영역을 누르고, 대표 국가 핀을 눌러 교과서식 핵심 설명을 확인합니다.</p>
        </div>
        <div className="rounded-3xl bg-slate-950 px-5 py-4 text-white">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-sky-200">Selected</p>
          <p className="mt-1 text-lg font-black">{selectedZone.name}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-[32px] border border-slate-100 bg-slate-50 p-4 sm:p-5">
          <div className="relative aspect-[1.9/1] min-h-[360px] overflow-hidden rounded-[28px] border border-sky-100 bg-gradient-to-b from-sky-100 via-cyan-50 to-blue-100 shadow-inner">
            <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,.9) 0 2px, transparent 2px), radial-gradient(circle at 70% 55%, rgba(255,255,255,.7) 0 2px, transparent 2px)", backgroundSize: "38px 38px, 54px 54px" }} />
            <div className="absolute left-[8%] top-[20%] h-[34%] w-[26%] rounded-[48%_42%_50%_45%] bg-white/85 shadow-sm" />
            <div className="absolute left-[26%] top-[48%] h-[38%] w-[17%] rotate-[-12deg] rounded-[45%_50%_55%_45%] bg-white/85 shadow-sm" />
            <div className="absolute left-[43%] top-[26%] h-[22%] w-[16%] rounded-[50%_40%_45%_45%] bg-white/85 shadow-sm" />
            <div className="absolute left-[49%] top-[45%] h-[35%] w-[15%] rounded-[45%_55%_50%_50%] bg-white/85 shadow-sm" />
            <div className="absolute left-[59%] top-[30%] h-[34%] w-[30%] rounded-[50%_44%_48%_46%] bg-white/85 shadow-sm" />
            <div className="absolute left-[78%] top-[72%] h-[14%] w-[17%] rounded-[45%] bg-white/85 shadow-sm" />

            {cultureZones.map((zone) => (
              <button
                key={zone.id}
                onClick={() => selectZone(zone)}
                className={`absolute rounded-[30px] border-2 px-3 py-2 text-xs font-black shadow-card backdrop-blur transition hover:scale-[1.03] ${selectedZone.id === zone.id ? `${zone.color} border-white text-white` : `${zone.soft} ${zone.border} ${zone.text}`}`}
                style={{ left: `${zone.position.x}%`, top: `${zone.position.y}%`, width: `${zone.position.w}%`, minHeight: `${zone.position.h}%`, transform: "translate(-50%, -50%)" }}
                aria-label={zone.name}
              >
                {zone.label}
              </button>
            ))}

            {selectedZone.countries.map((country) => (
              <button
                key={country.name}
                onClick={() => setSelectedCountry(country)}
                className={`absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-xs font-black transition hover:scale-110 ${selectedCountry?.name === country.name ? "text-slate-950" : "text-slate-600"}`}
                style={{ left: `${country.x}%`, top: `${country.y}%` }}
              >
                <span className={`grid h-8 w-8 place-items-center rounded-full border-4 border-white text-white shadow-card ${selectedZone.color}`}><MapPin className="h-4 w-4" /></span>
                <span className="rounded-full bg-white/90 px-2 py-1 shadow-sm">{country.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {cultureZones.map((zone) => (
              <button key={zone.id} onClick={() => selectZone(zone)} className={`rounded-2xl border px-3 py-2 text-left text-xs font-black transition ${selectedZone.id === zone.id ? `${zone.color} border-transparent text-white` : `${zone.soft} ${zone.border} ${zone.text}`}`}>
                {zone.name}
              </button>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className={`rounded-[30px] border ${selectedZone.border} ${selectedZone.soft} p-5`}>
            <div className="flex items-center gap-3">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl text-white ${selectedZone.color}`}><Globe2 className="h-6 w-6" /></span>
              <div>
                <p className={`text-xs font-black uppercase tracking-[0.25em] ${selectedZone.text}`}>Culture Zone</p>
                <h3 className="text-2xl font-black text-slate-950">{selectedZone.name}</h3>
              </div>
            </div>
            <p className="mt-4 text-sm font-bold leading-7 text-slate-700"><b>분포:</b> {selectedZone.region}</p>
            <div className="mt-4 grid gap-3">
              <InfoList title="형성 요인" items={selectedZone.formation} />
              <InfoList title="특징" items={selectedZone.features} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedZone.keywords.map((keyword) => <span key={keyword} className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600 shadow-sm">#{keyword}</span>)}
            </div>
          </div>

          <div className="rounded-[30px] border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand-700" />
              <h3 className="text-xl font-black text-slate-950">대표 국가 설명</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedZone.countries.map((country) => (
                <button key={country.name} onClick={() => setSelectedCountry(country)} className={`rounded-2xl border px-3 py-2 text-sm font-black transition ${selectedCountry?.name === country.name ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
                  {country.name}
                </button>
              ))}
            </div>
            {selectedCountry && (
              <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                <p className="text-lg font-black text-slate-950">{selectedCountry.name}</p>
                <p className="mt-1 text-sm font-black text-brand-700">{selectedCountry.note}</p>
                <p className="mt-3 text-sm font-bold leading-7 text-slate-700">{selectedCountry.detail}</p>
                <p className="mt-3 rounded-2xl bg-amber-50 px-3 py-2 text-xs font-black leading-6 text-amber-700">시험 포인트: {selectedCountry.exam}</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl bg-white/80 p-4">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">{title}</p>
      <ul className="mt-2 space-y-1 text-sm font-bold leading-6 text-slate-700">
        {items.map((item) => <li key={item}>• {item}</li>)}
      </ul>
    </div>
  );
}
