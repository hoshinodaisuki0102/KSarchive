import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SubjectItem } from "@/lib/site-data";

type Props = {
  subject: SubjectItem;
};

export function SubjectCard({ subject }: Props) {
  const Icon = subject.icon;

  return (
    <Link
      href={`/subjects/${subject.id}`}
      className="group relative overflow-hidden rounded-[28px] border border-white/70 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-glow"
    >
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${subject.accent}`} />
      <div className="absolute right-4 top-4 rounded-full bg-blue-50 p-2 text-brand-700 transition group-hover:scale-105">
        <ArrowUpRight className="h-4 w-4" />
      </div>

      <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${subject.accent} text-white shadow-lg`}>
        <Icon className="h-7 w-7" />
      </div>

      <h3 className="text-xl font-bold tracking-tight text-slate-900">{subject.name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{subject.description}</p>

      <div className="mt-6 flex items-center justify-between">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {subject.stats}
        </span>
        <span className="text-sm font-semibold text-brand-700">열기</span>
      </div>
    </Link>
  );
}