import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowLeft, ShieldCheck, UsersRound } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { publicUser, readStore } from "@/lib/auth-store";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

export const dynamic = "force-dynamic";

function formatDate(value?: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("ko-KR", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

export default async function MembersPage() {
  const cookieStore = await cookies();
  const session = await verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  if (!session) redirect("/auth?next=/members");

  const store = await readStore();
  const approved = store.users
    .filter((user) => user.status === "approved")
    .map(publicUser)
    .sort((a, b) => (a.realName ?? "").localeCompare(b.realName ?? "", "ko"));
  const pending = store.users.filter((user) => user.status === "pending").length;

  return (
    <main className="min-h-screen bg-mesh-light px-5 py-8 text-slate-950 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black shadow-card"><ArrowLeft className="h-4 w-4" />홈으로</Link>
          {session.role === "admin" ? <Link href="/admin" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-card"><ShieldCheck className="h-4 w-4" />승인실</Link> : null}
        </div>

        <section className="mt-8 rounded-[42px] bg-mesh-dark p-8 text-white shadow-deep lg:p-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-sky-100"><UsersRound className="h-4 w-4" /> KSarchive Members</p>
          <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">승인된 멤버 목록</h1>
          <p className="mt-4 max-w-3xl text-sm font-bold leading-8 text-slate-300">현재 KSarchive를 사용할 수 있는 승인 계정을 확인합니다. 관리자 계정은 승인 대기 인원도 함께 확인할 수 있습니다.</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[28px] bg-white/10 p-5"><p className="text-sm text-slate-300">승인 멤버</p><p className="mt-2 text-4xl font-black text-emerald-200">{approved.length}</p></div>
            <div className="rounded-[28px] bg-white/10 p-5"><p className="text-sm text-slate-300">승인 대기</p><p className="mt-2 text-4xl font-black text-red-200">{session.role === "admin" ? pending : "-"}</p></div>
            <div className="rounded-[28px] bg-white/10 p-5"><p className="text-sm text-slate-300">내 권한</p><p className="mt-2 text-4xl font-black text-sky-200">{session.role === "admin" ? "ADMIN" : "USER"}</p></div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {approved.length === 0 ? (
            <div className="rounded-[30px] bg-white/85 p-6 text-sm font-bold text-slate-500 shadow-card">아직 승인된 멤버가 없습니다.</div>
          ) : approved.map((member) => (
            <article key={member.id} className="rounded-[30px] bg-white/90 p-6 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-700">APPROVED</p>
                  <h2 className="mt-2 text-2xl font-black text-slate-950">{member.nickname || member.realName}</h2>
                  <p className="mt-2 text-sm font-bold leading-7 text-slate-500">실명: {member.realName} · 학번: {member.studentId || "-"}</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">사용 가능</span>
              </div>
              <p className="mt-4 text-xs font-bold text-slate-400">최근 로그인 {formatDate(member.lastLoginAt)}</p>
            </article>
          ))}
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
