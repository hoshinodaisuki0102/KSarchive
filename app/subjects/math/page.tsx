import Link from "next/link";
import { ArrowLeft, Clock3, Construction } from "lucide-react";

export default function MathPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.28),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_24%),linear-gradient(180deg,_#f8fdff_0%,_#eff7ff_40%,_#ffffff_100%)] text-slate-900">
      <div className="mx-auto max-w-5xl px-5 py-8 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-card transition hover:bg-blue-50">
          <ArrowLeft className="h-4 w-4" />
          홈으로
        </Link>

        <section className="mt-8 rounded-[36px] border border-white/70 bg-white/85 p-10 text-center shadow-glow">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-brand-700">
            <Construction className="h-10 w-10" />
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950">수학 페이지 준비중</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
            수학은 우선 후순위로 두고, 현재는 페이지 준비중 상태로 표시해 두었습니다.
            나중에 범위와 자료를 보내주면 같은 톤으로 상세 페이지를 이어서 붙일 수 있습니다.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-brand-700">
            <Clock3 className="h-4 w-4" />
            Coming Soon
          </div>
        </section>
      </div>
    </main>
  );
}
