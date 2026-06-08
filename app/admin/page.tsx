"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Clock3, LogOut, ShieldCheck, UserCheck, UserX } from "lucide-react";

type User = {
  id: string;
  username: string;
  realName: string;
  studentId?: string;
  email?: string;
  provider: "credentials";
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectedReason?: string;
  lastLoginAt?: string;
};

function formatDate(value?: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [adminLogin, setAdminLogin] = useState({ username: "", password: "" });
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const pendingCount = useMemo(() => users.filter((user) => user.status === "pending").length, [users]);
  const approvedCount = useMemo(() => users.filter((user) => user.status === "approved").length, [users]);

  async function load() {
    setError("");
    const res = await fetch("/api/admin/requests", { cache: "no-store" });
    if (res.status === 401) {
      setAuthed(false);
      return;
    }
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "목록을 불러오지 못했습니다.");
      return;
    }
    setAuthed(true);
    setUsers(data.users ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminLogin)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "관리자 로그인 실패");
      setAuthed(true);
      setAdminLogin({ username: "", password: "" });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "관리자 로그인 실패");
    } finally {
      setLoading(false);
    }
  }

  async function action(userId: string, type: "approve" | "reject") {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(`/api/admin/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, reason: "경신고 학생 확인 불가" })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "처리하지 못했습니다.");
      setMessage(type === "approve" ? "승인 완료. 해당 학생은 이제 로그인할 수 있습니다." : "거절 처리 완료.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "처리하지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setUsers([]);
  }

  if (!authed) {
    return (
      <main className="min-h-screen bg-mesh-light px-5 py-8 text-slate-950 lg:px-8">
        <div className="mx-auto max-w-xl">
          <Link href="/auth" className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-4 py-2 text-sm font-black text-slate-600 shadow-card">
            <ArrowLeft className="h-4 w-4" /> 로그인 화면으로
          </Link>
          <section className="mt-6 rounded-[38px] border border-white/70 bg-white/85 p-7 shadow-card backdrop-blur-2xl">
            <div className="grid h-16 w-16 place-items-center rounded-[26px] bg-slate-950 text-white shadow-card">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight">관리자 승인실</h1>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
              가입 요청을 확인하고 경신고 학생인지 판단한 뒤 승인/거절할 수 있습니다. 관리자 인증 후에는 학습 사이트도 바로 열 수 있습니다.
            </p>
            {error ? <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">{error}</div> : null}
            <form onSubmit={login} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Admin ID</label>
                <input
                  value={adminLogin.username}
                  onChange={(e) => setAdminLogin((prev) => ({ ...prev, username: e.target.value }))}
                  className="mt-2 w-full rounded-[22px] border border-slate-200 bg-white px-5 py-4 font-bold outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                  placeholder="관리자 아이디"
                  autoComplete="username"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Admin Password</label>
                <input
                  value={adminLogin.password}
                  onChange={(e) => setAdminLogin((prev) => ({ ...prev, password: e.target.value }))}
                  type="password"
                  className="mt-2 w-full rounded-[22px] border border-slate-200 bg-white px-5 py-4 font-bold outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                  placeholder="관리자 비밀번호"
                  autoComplete="current-password"
                />
              </div>
              <button disabled={loading} className="w-full rounded-[22px] bg-slate-950 px-5 py-4 font-black text-white shadow-card transition hover:bg-brand-700 disabled:opacity-50">
                {loading ? "확인 중..." : "승인실 입장"}
              </button>
            </form>
            <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-xs font-bold leading-6 text-slate-500">
              관리자 아이디와 비밀번호는 프로젝트 루트의 .env.local 파일에서 KS_ADMIN_USERNAME, KS_ADMIN_PASSWORD 값으로 바꿀 수 있습니다. 이 계정은 승인실과 학습 사이트 모두 바로 접근할 수 있습니다.
            </p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-mesh-light px-5 py-8 text-slate-950 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-4 py-2 text-sm font-black text-slate-600 shadow-card">
            <ArrowLeft className="h-4 w-4" /> 홈으로
          </Link>
          <button onClick={logout} className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-card">
            <LogOut className="h-4 w-4" /> 관리자 로그아웃
          </button>
        </div>

        <section className="mt-6 overflow-hidden rounded-[42px] bg-slate-950 p-7 text-white shadow-deep lg:p-9">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-sky-100"><ShieldCheck className="h-4 w-4" /> KSarchive Access Control</p>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">가입 요청 승인 관리</h1>
          <p className="mt-4 max-w-3xl text-sm font-semibold leading-8 text-slate-300">
            이름과 학번을 확인한 뒤 경신고 학생이면 승인하세요. 승인된 계정만 앱 본문과 AI 기능을 사용할 수 있습니다. 관리자 계정으로 입장한 경우 승인실과 학습 사이트 모두 바로 접근할 수 있습니다.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[28px] border border-white/10 bg-white/10 p-5"><p className="text-sm text-slate-300">대기</p><p className="mt-2 text-4xl font-black text-red-200">{pendingCount}</p></div>
            <div className="rounded-[28px] border border-white/10 bg-white/10 p-5"><p className="text-sm text-slate-300">승인</p><p className="mt-2 text-4xl font-black text-emerald-200">{approvedCount}</p></div>
            <div className="rounded-[28px] border border-white/10 bg-white/10 p-5"><p className="text-sm text-slate-300">전체</p><p className="mt-2 text-4xl font-black text-sky-200">{users.length}</p></div>
          </div>
        </section>

        {message ? <div className="mt-5 flex items-center gap-2 rounded-[24px] border border-emerald-200 bg-emerald-50 p-4 text-sm font-black text-emerald-800"><CheckCircle2 className="h-5 w-5" /> {message}</div> : null}
        {error ? <div className="mt-5 rounded-[24px] border border-red-200 bg-red-50 p-4 text-sm font-black text-red-700">{error}</div> : null}

        <section className="mt-6 grid gap-4">
          {users.length === 0 ? (
            <div className="rounded-[34px] border border-white/70 bg-white/82 p-8 text-center font-black text-slate-500 shadow-card backdrop-blur-2xl">
              아직 가입 요청이 없습니다.
            </div>
          ) : users.map((user) => (
            <article key={user.id} className="rounded-[34px] border border-white/70 bg-white/86 p-5 shadow-card backdrop-blur-2xl lg:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${user.status === "pending" ? "bg-red-100 text-red-700" : user.status === "approved" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>
                      {user.status === "pending" ? "승인 대기" : user.status === "approved" ? "승인됨" : "거절됨"}
                    </span>
                    <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-brand-700">ID/PW</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-black text-slate-950">{user.realName}</h2>
                  <p className="mt-2 text-sm font-bold leading-7 text-slate-500">
                    ID: {user.username} · 학번: {user.studentId || "-"} {user.email ? `· 이메일: ${user.email}` : ""}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-xs font-bold text-slate-400"><Clock3 className="h-3.5 w-3.5" /> 요청 {formatDate(user.createdAt)} · 최근 로그인 {formatDate(user.lastLoginAt)}</p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row lg:shrink-0">
                  <button disabled={loading || user.status === "approved"} onClick={() => action(user.id, "approve")} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-black text-white shadow-card transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40">
                    <UserCheck className="h-4 w-4" /> 승인
                  </button>
                  <button disabled={loading || user.status === "rejected"} onClick={() => action(user.id, "reject")} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-3 text-sm font-black text-white shadow-card transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40">
                    <UserX className="h-4 w-4" /> 거절
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
