import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-mesh-light px-5 text-center text-slate-900">
      <div className="rounded-[40px] border border-white/70 bg-white/80 p-10 shadow-card backdrop-blur-2xl">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-brand-700">404</p>
        <h1 className="mt-3 text-4xl font-black">페이지를 찾을 수 없습니다</h1>
        <p className="mt-3 text-slate-600">주소를 확인하거나 홈으로 돌아가 주세요.</p>
        <Link href="/" className="mt-6 inline-block rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white">홈으로 돌아가기</Link>
      </div>
    </main>
  );
}
