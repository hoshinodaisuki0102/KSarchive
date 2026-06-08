"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Globe2, Loader2, MapPin, Sparkles } from "lucide-react";
import { cultureZones, type CultureCountry, type CultureZone, type CultureZoneId } from "@/lib/social-culture-data";

const WORLD_GEOJSON_URL = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 520;

type Position = [number, number];
type PolygonCoordinates = Position[][];
type MultiPolygonCoordinates = Position[][][];
type GeoGeometry =
  | { type: "Polygon"; coordinates: PolygonCoordinates }
  | { type: "MultiPolygon"; coordinates: MultiPolygonCoordinates };
type GeoFeature = {
  type: "Feature";
  id?: string | number;
  properties: Record<string, unknown>;
  geometry: GeoGeometry;
};
type WorldGeoJson = { type: "FeatureCollection"; features: GeoFeature[] };

const zoneFill: Record<CultureZoneId, string> = {
  "east-asia": "#38bdf8",
  "southeast-asia": "#10b981",
  "south-asia": "#d946ef",
  dry: "#f59e0b",
  africa: "#84cc16",
  europe: "#6366f1",
  "anglo-america": "#2563eb",
  "latin-america": "#f43f5e",
  polar: "#22d3ee",
  oceania: "#14b8a6"
};

const countryToZone: Record<string, CultureZoneId> = {
  China: "east-asia",
  Japan: "east-asia",
  Mongolia: "east-asia",
  "South Korea": "east-asia",
  "North Korea": "east-asia",
  Korea: "east-asia",

  Thailand: "southeast-asia",
  Vietnam: "southeast-asia",
  Indonesia: "southeast-asia",
  Malaysia: "southeast-asia",
  Philippines: "southeast-asia",
  Myanmar: "southeast-asia",
  Cambodia: "southeast-asia",
  Laos: "southeast-asia",
  Singapore: "southeast-asia",
  Brunei: "southeast-asia",

  India: "south-asia",
  Pakistan: "south-asia",
  Bangladesh: "south-asia",
  Nepal: "south-asia",
  Bhutan: "south-asia",
  "Sri Lanka": "south-asia",

  Egypt: "dry",
  Libya: "dry",
  Algeria: "dry",
  Morocco: "dry",
  Tunisia: "dry",
  Mauritania: "dry",
  Mali: "dry",
  Niger: "dry",
  Chad: "dry",
  Sudan: "dry",
  "Saudi Arabia": "dry",
  Iran: "dry",
  Iraq: "dry",
  Syria: "dry",
  Jordan: "dry",
  Israel: "dry",
  "United Arab Emirates": "dry",
  Oman: "dry",
  Yemen: "dry",
  Qatar: "dry",
  Kuwait: "dry",
  Turkmenistan: "dry",
  Uzbekistan: "dry",
  Kazakhstan: "dry",

  Kenya: "africa",
  Nigeria: "africa",
  Ethiopia: "africa",
  Tanzania: "africa",
  Uganda: "africa",
  Ghana: "africa",
  Angola: "africa",
  "South Africa": "africa",
  Congo: "africa",
  "Democratic Republic of the Congo": "africa",
  Cameroon: "africa",
  Zambia: "africa",
  Zimbabwe: "africa",
  Mozambique: "africa",
  Madagascar: "africa",

  "United Kingdom": "europe",
  France: "europe",
  Germany: "europe",
  Italy: "europe",
  Spain: "europe",
  Portugal: "europe",
  Poland: "europe",
  Sweden: "europe",
  Norway: "europe",
  Finland: "europe",
  Greece: "europe",
  Netherlands: "europe",
  Belgium: "europe",
  Austria: "europe",
  Switzerland: "europe",
  Ireland: "europe",
  Denmark: "europe",
  Ukraine: "europe",
  Romania: "europe",

  "United States of America": "anglo-america",
  "United States": "anglo-america",
  Canada: "anglo-america",

  Mexico: "latin-america",
  Brazil: "latin-america",
  Argentina: "latin-america",
  Peru: "latin-america",
  Chile: "latin-america",
  Colombia: "latin-america",
  Bolivia: "latin-america",
  Ecuador: "latin-america",
  Venezuela: "latin-america",
  Paraguay: "latin-america",
  Uruguay: "latin-america",
  Guatemala: "latin-america",
  Cuba: "latin-america",
  "Costa Rica": "latin-america",
  Panama: "latin-america",

  Greenland: "polar",
  Iceland: "polar",

  Australia: "oceania",
  "New Zealand": "oceania",
  "Papua New Guinea": "oceania"
};

const countryCoordinates: Record<string, Position> = {
  대한민국: [127.8, 36.3],
  중국: [104, 35.8],
  일본: [138, 37],
  태국: [101, 15],
  베트남: [108, 14],
  인도네시아: [117, -2.5],
  인도: [78, 22],
  사우디아라비아: [45, 24],
  이집트: [30, 26],
  케냐: [37.9, 0.5],
  나이지리아: [8.7, 9.1],
  영국: [-2.5, 54],
  프랑스: [2.2, 46.3],
  이탈리아: [12.5, 42.8],
  미국: [-98, 39.5],
  캐나다: [-106, 56],
  브라질: [-51, -10],
  멕시코: [-102, 23],
  페루: [-75, -9],
  그린란드: [-42, 72],
  오스트레일리아: [134, -25],
  뉴질랜드: [172, -41]
};

const englishToKoreanCountry: Record<string, string> = {
  "South Korea": "대한민국",
  Korea: "대한민국",
  China: "중국",
  Japan: "일본",
  Thailand: "태국",
  Vietnam: "베트남",
  Indonesia: "인도네시아",
  India: "인도",
  "Saudi Arabia": "사우디아라비아",
  Egypt: "이집트",
  Kenya: "케냐",
  Nigeria: "나이지리아",
  "United Kingdom": "영국",
  France: "프랑스",
  Italy: "이탈리아",
  "United States of America": "미국",
  "United States": "미국",
  Canada: "캐나다",
  Brazil: "브라질",
  Mexico: "멕시코",
  Peru: "페루",
  Greenland: "그린란드",
  Australia: "오스트레일리아",
  "New Zealand": "뉴질랜드"
};

function project([lon, lat]: Position): Position {
  return [((lon + 180) / 360) * MAP_WIDTH, ((90 - lat) / 180) * MAP_HEIGHT];
}

function ringToPath(ring: Position[]) {
  return ring
    .map((point, index) => {
      const [x, y] = project(point);
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ") + " Z";
}

function geometryToPath(geometry: GeoGeometry) {
  if (geometry.type === "Polygon") {
    return geometry.coordinates.map(ringToPath).join(" ");
  }
  return geometry.coordinates.flatMap((polygon) => polygon.map(ringToPath)).join(" ");
}

function getFeatureName(feature: GeoFeature) {
  return String(feature.properties.name ?? feature.properties.ADMIN ?? feature.properties.NAME ?? "");
}

function zoneById(id: CultureZoneId) {
  return cultureZones.find((zone) => zone.id === id) ?? cultureZones[0];
}

function zoneForCountry(name: string) {
  return countryToZone[name] ?? null;
}

export function CultureWorldMap() {
  const [features, setFeatures] = useState<GeoFeature[]>([]);
  const [mapStatus, setMapStatus] = useState<"loading" | "ready" | "error">("loading");
  const [selectedZoneId, setSelectedZoneId] = useState<CultureZoneId>(cultureZones[0].id);
  const [selectedCountry, setSelectedCountry] = useState<CultureCountry | null>(cultureZones[0].countries[0]);

  const selectedZone = useMemo(() => zoneById(selectedZoneId), [selectedZoneId]);
  const selectedCountryNames = new Set(selectedZone.countries.map((country) => country.name));

  useEffect(() => {
    let active = true;
    async function loadMap() {
      try {
        const response = await fetch(WORLD_GEOJSON_URL);
        if (!response.ok) throw new Error("world map fetch failed");
        const data = (await response.json()) as WorldGeoJson;
        if (active) {
          setFeatures(data.features);
          setMapStatus("ready");
        }
      } catch (error) {
        console.error("KSarchive world map load failed:", error);
        if (active) setMapStatus("error");
      }
    }
    loadMap();
    return () => {
      active = false;
    };
  }, []);

  function selectZone(zone: CultureZone) {
    setSelectedZoneId(zone.id);
    setSelectedCountry(zone.countries[0] ?? null);
  }

  function selectCountryFromEnglish(countryName: string, zoneId: CultureZoneId) {
    const zone = zoneById(zoneId);
    const koreanName = englishToKoreanCountry[countryName];
    const country = koreanName ? zone.countries.find((item) => item.name === koreanName) : null;
    setSelectedZoneId(zoneId);
    setSelectedCountry(country ?? zone.countries[0] ?? null);
  }

  return (
    <section className="mt-8 rounded-[38px] border border-white/70 bg-white/95 p-5 shadow-card backdrop-blur-2xl sm:p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-brand-700">Culture Map</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">문화권 인터랙티브 세계지도</h2>
          <p className="mt-2 text-sm font-bold leading-7 text-slate-500">실제 세계지도 데이터를 불러와 문화권을 색으로 구분하고, 대표 국가 핀을 누르면 설명이 열립니다.</p>
        </div>
        <div className="rounded-3xl bg-slate-950 px-5 py-4 text-white">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-sky-200">Selected</p>
          <p className="mt-1 text-lg font-black">{selectedZone.name}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.75fr]">
        <div className="rounded-[32px] border border-slate-100 bg-slate-50 p-4 sm:p-5">
          <div className="overflow-hidden rounded-[28px] border border-sky-100 bg-gradient-to-b from-sky-50 via-cyan-50 to-blue-100 shadow-inner">
            <div className="relative">
              {mapStatus === "loading" && (
                <div className="absolute inset-0 z-20 grid place-items-center bg-white/70 backdrop-blur-sm">
                  <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-950 px-5 py-4 text-sm font-black text-white shadow-card">
                    <Loader2 className="h-5 w-5 animate-spin" /> 실제 세계지도 로딩 중
                  </div>
                </div>
              )}
              {mapStatus === "error" && (
                <div className="absolute inset-0 z-20 grid place-items-center bg-white/80 p-6 text-center backdrop-blur-sm">
                  <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-amber-800 shadow-card">
                    <AlertTriangle className="mx-auto h-8 w-8" />
                    <p className="mt-3 text-sm font-black">세계지도 데이터를 불러오지 못했습니다.</p>
                    <p className="mt-1 text-xs font-bold">인터넷 연결 또는 외부 GeoJSON 접근 상태를 확인해 주세요.</p>
                  </div>
                </div>
              )}

              <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="h-auto w-full" role="img" aria-label="문화권별 세계지도">
                <defs>
                  <linearGradient id="ocean" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#dff8ff" />
                    <stop offset="100%" stopColor="#dbeafe" />
                  </linearGradient>
                  <filter id="mapShadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="8" stdDeviation="8" floodOpacity="0.12" />
                  </filter>
                </defs>
                <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#ocean)" />
                {[-120, -60, 0, 60, 120].map((lon) => {
                  const [x] = project([lon, 0]);
                  return <line key={`lon-${lon}`} x1={x} x2={x} y1={0} y2={MAP_HEIGHT} stroke="#bae6fd" strokeWidth="1" strokeDasharray="6 8" opacity="0.75" />;
                })}
                {[-60, -30, 0, 30, 60].map((lat) => {
                  const [, y] = project([0, lat]);
                  return <line key={`lat-${lat}`} x1={0} x2={MAP_WIDTH} y1={y} y2={y} stroke="#bae6fd" strokeWidth="1" strokeDasharray="6 8" opacity="0.75" />;
                })}

                <g filter="url(#mapShadow)">
                  {features.map((feature) => {
                    const name = getFeatureName(feature);
                    const zoneId = zoneForCountry(name);
                    const active = zoneId === selectedZone.id;
                    const fill = zoneId ? zoneFill[zoneId] : "#e5e7eb";
                    return (
                      <path
                        key={`${name}-${feature.id ?? "country"}`}
                        d={geometryToPath(feature.geometry)}
                        fill={active ? "#0f172a" : fill}
                        fillOpacity={zoneId ? (active ? 0.95 : 0.74) : 0.64}
                        stroke="#ffffff"
                        strokeWidth={active ? 1.4 : 0.75}
                        className={zoneId ? "cursor-pointer transition hover:opacity-90" : ""}
                        onClick={() => zoneId && selectCountryFromEnglish(name, zoneId)}
                      >
                        <title>{name}</title>
                      </path>
                    );
                  })}
                </g>

                {selectedZone.countries.map((country) => {
                  const coord = countryCoordinates[country.name];
                  if (!coord) return null;
                  const [x, y] = project(coord);
                  const active = selectedCountry?.name === country.name;
                  return (
                    <g key={country.name} transform={`translate(${x} ${y})`} className="cursor-pointer" onClick={() => setSelectedCountry(country)}>
                      <circle r={active ? 13 : 10} fill="white" stroke="#0f172a" strokeWidth="3" />
                      <circle r={active ? 6 : 4.8} fill={active ? "#0f172a" : zoneFill[selectedZone.id]} />
                      <text y={-18} textAnchor="middle" fontSize="13" fontWeight="900" fill="#0f172a" stroke="white" strokeWidth="4" paintOrder="stroke">
                        {country.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {cultureZones.map((zone) => (
              <button key={zone.id} onClick={() => selectZone(zone)} className={`rounded-2xl border px-3 py-2 text-left text-xs font-black transition ${selectedZone.id === zone.id ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}>
                <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: zoneFill[zone.id] }} />
                {zone.name}
              </button>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-[30px] border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ backgroundColor: zoneFill[selectedZone.id] }}><Globe2 className="h-6 w-6" /></span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-brand-700">Culture Zone</p>
                <h3 className="text-2xl font-black text-slate-950">{selectedZone.name}</h3>
              </div>
            </div>
            <p className="mt-4 text-sm font-bold leading-7 text-slate-700"><b>분포:</b> {selectedZone.region}</p>
            <InfoList title="형성 요인" items={selectedZone.formation} />
            <InfoList title="특징" items={selectedZone.features} />
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedZone.keywords.map((keyword) => <span key={keyword} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">#{keyword}</span>)}
            </div>
          </div>

          <div className="rounded-[30px] border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand-700" />
              <h3 className="text-xl font-black text-slate-950">대표 국가 설명</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedZone.countries.map((country) => (
                <button key={country.name} onClick={() => setSelectedCountry(country)} className={`rounded-2xl border px-3 py-2 text-sm font-black transition ${selectedCountryNames.has(country.name) && selectedCountry?.name === country.name ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
                  <MapPin className="mr-1 inline h-3.5 w-3.5" />{country.name}
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
    <div className="mt-4 rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">{title}</p>
      <ul className="mt-2 space-y-1 text-sm font-bold leading-6 text-slate-700">
        {items.map((item) => <li key={item}>• {item}</li>)}
      </ul>
    </div>
  );
}
