import Link from "next/link";
import { ArrowUpRight, DatabaseZap } from "lucide-react";
import type { SubjectItem } from "@/lib/site-data";

type Props = {
  subject: SubjectItem;
  count: number;
};

const statusLabel = {
  empty: "EMPTY",
  rebuilding: "REBUILD",
  ready: "READY"
} as const;

export function SubjectCard({ subject, count }: Props) {
  const Icon = subject.icon;

  return (
    <Link
      href={`/subjects/${subject.id}`}
      className="group relative overflow-hidden rounded-[34px] border border-white/70 bg-white/75 p-6 shadow-card backdrop-blur-2xl transition duration-300 hover:-translate-y-2 hover:border-sky-200 hover:shadow-neon"
    >
      <div className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${subject.accent} opacity-20 blur-2xl transition group-hover:opacity-40`} />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
      <div className="flex items-start justify-between gap-4">
        <div className={`relative grid h-16 w-16 place-items-center overflow-hidden rounded-3xl bg-gradient-to-br ${subject.accent} text-white shadow-lg`}>
          <div className="absolute inset-0 bg-white/10" />
          <Icon className="relative h-8 w-8" />
        </div>
        <div className="rounded-full border border-sky-100 bg-white/80 p-2 text-brand-700 transition group-hover:rotate-12 group-hover:bg-slate-950 group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <h3 className="text-2xl font-black tracking-tight text-slate-950">{subject.name}</h3>
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-black tracking-wider ${subject.status === "ready" ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-500"}`}>
          {statusLabel[subject.status]}
        </span>
      </div>
      <p className="mt-3 min-h-[54px] text-sm leading-7 text-slate-600">{subject.description}</p>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
        <span className="inline-flex items-center gap-2 text-xs font-black text-slate-500">
          <DatabaseZap className="h-4 w-4 text-brand-700" /> 자료 {count}개
        </span>
        <span className="text-sm font-black text-brand-700">Open</span>
      </div>
    </Link>
  );
}
