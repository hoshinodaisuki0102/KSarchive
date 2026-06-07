import { Coffee, Copyright, HeartHandshake } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/70 px-5 py-8 backdrop-blur lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm font-bold leading-7 text-slate-500">
          <p className="inline-flex items-center gap-2 text-slate-900"><Copyright className="h-4 w-4" /> Copyright © 2026 KSarchive. All rights reserved.</p>
          <p>For private study use only. Unauthorized redistribution is prohibited.</p>
        </div>
        <a
          href="https://www.kakaobank.com/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-card transition hover:-translate-y-0.5 hover:bg-red-600"
        >
          <Coffee className="h-4 w-4 text-yellow-200" /> 개발자한테 몬스터 후원하기
          <span className="hidden rounded-full bg-white/10 px-2 py-1 text-xs sm:inline">카뱅 333-36-3741467</span>
          <HeartHandshake className="h-4 w-4 text-red-200" />
        </a>
      </div>
    </footer>
  );
}
