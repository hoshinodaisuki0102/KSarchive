"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, EyeOff, LockKeyhole, LogIn, ShieldCheck, UserPlus } from "lucide-react";

type Mode = "login" | "signup";

type AgreementState = {
  noRedistribution: boolean;
  studentOnly: boolean;
  realNameCheck: boolean;
  copyrightNotice: boolean;
};

const defaultAgreement: AgreementState = {
  noRedistribution: false,
  studentOnly: false,
  realNameCheck: false,
  copyrightNotice: false
};

function allChecked(agreement: AgreementState) {
  return Object.values(agreement).every(Boolean);
}

export function AuthScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/";
  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [login, setLogin] = useState({ username: "", password: "" });
  const [signup, setSignup] = useState({ username: "", password: "", realName: "", studentId: "" });
  const [agreement, setAgreement] = useState<AgreementState>(defaultAgreement);

  const agreementReady = useMemo(() => allChecked(agreement), [agreement]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "로그인에 실패했습니다.");
      router.replace(nextPath);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...signup, agreement })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "회원가입 요청에 실패했습니다.");
      setMode("login");
      setSignup({ username: "", password: "", realName: "", studentId: "" });
      setAgreement(defaultAgreement);
      setMessage("가입 요청이 접수되었습니다. 승인 후 학습 공간에 입장 가능합니다.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "회원가입 요청에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_15%_12%,rgba(59,130,246,.28),transparent_26%),radial-gradient(circle_at_85%_16%,rgba(239,68,68,.16),transparent_24%),linear-gradient(180deg,#f8fbff_0%,#eef7ff_45%,#ffffff_100%)] px-5 py-8 text-slate-950 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
        <section className="relative overflow-hidden rounded-[42px] bg-slate-950 p-7 text-white shadow-deep lg:p-10">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-red-500/20 blur-3xl" />
          <div className="absolute left-8 top-36 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-[30px] bg-white p-2 shadow-neon">
              <Image src="/kyungshin-logo.png" alt="경신고등학교 로고" width={72} height={72} className="h-full w-full object-contain" priority />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-200">Private Study Gate</p>
              <h1 className="mt-1 text-3xl font-black tracking-tight">KSarchive</h1>
            </div>
          </div>

          <div className="relative mt-10 inline-flex items-center gap-2 rounded-full border border-red-300/20 bg-red-500/10 px-4 py-2 text-sm font-black text-red-100">
            <EyeOff className="h-4 w-4" /> 승인된 경신고 학생 전용
          </div>
          <h2 className="relative mt-5 text-4xl font-black leading-tight tracking-tight md:text-6xl">
            가입 요청 승인 후<br />학습 공간에 입장 가능합니다.
          </h2>
          <p className="relative mt-6 max-w-2xl text-sm leading-8 text-slate-300 md:text-base">
            KSarchive는 시험 범위 자료를 정리한 비공개 내신 학습 공간입니다. <span className="font-black text-red-200">외부 유포를 막고 선생님·외부인이 임의로 접근하지 못하게 하기 위해</span> 이름과 학번을 확인한 뒤 승인된 계정만 사용할 수 있습니다.
          </p>

          <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
            {[
              ["이름·학번 확인", "가입 요청에는 이름과 학번만 남깁니다."],
              ["관리자 승인", "관리자가 경신고 학생 여부를 확인합니다."],
              ["유포 금지", "링크와 자료를 외부에 공유하지 않습니다."],
              ["학생 전용", "승인 계정만 홈/영어/AI 페이지 접근 가능."]
            ].map(([title, desc]) => (
              <div key={title} className="rounded-[26px] border border-white/10 bg-white/10 p-5 backdrop-blur">
                <div className="flex items-center gap-2 font-black text-white"><ShieldCheck className="h-4 w-4 text-sky-200" /> {title}</div>
                <p className="mt-2 text-xs leading-6 text-slate-300">{desc}</p>
              </div>
            ))}
          </div>

          <Link href="/admin" className="relative mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black text-slate-200 transition hover:bg-white/15">
            관리자 승인 페이지로 이동
          </Link>
        </section>

        <section className="rounded-[42px] border border-white/70 bg-white/82 p-5 shadow-card backdrop-blur-2xl sm:p-7 lg:p-9">
          <div className="flex rounded-[26px] bg-slate-100 p-1.5">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 rounded-[20px] px-4 py-3 text-sm font-black transition ${mode === "login" ? "bg-slate-950 text-white shadow-card" : "text-slate-500 hover:text-slate-950"}`}
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-[20px] px-4 py-3 text-sm font-black transition ${mode === "signup" ? "bg-slate-950 text-white shadow-card" : "text-slate-500 hover:text-slate-950"}`}
            >
              회원가입 요청
            </button>
          </div>

          {message ? (
            <div className="mt-5 flex gap-3 rounded-[24px] border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold leading-7 text-emerald-800">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /> {message}
            </div>
          ) : null}
          {error ? (
            <div className="mt-5 flex gap-3 rounded-[24px] border border-red-200 bg-red-50 p-4 text-sm font-bold leading-7 text-red-700">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" /> {error}
            </div>
          ) : null}

          {mode === "login" ? (
            <form onSubmit={handleLogin} className="mt-7 space-y-4">
              <div>
                <label className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">ID</label>
                <input
                  value={login.username}
                  onChange={(e) => setLogin((prev) => ({ ...prev, username: e.target.value }))}
                  className="mt-2 w-full rounded-[22px] border border-slate-200 bg-white px-5 py-4 text-base font-bold outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                  placeholder="아이디"
                  autoComplete="username"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Password</label>
                <input
                  value={login.password}
                  onChange={(e) => setLogin((prev) => ({ ...prev, password: e.target.value }))}
                  className="mt-2 w-full rounded-[22px] border border-slate-200 bg-white px-5 py-4 text-base font-bold outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                  placeholder="비밀번호"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
              <button disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-[24px] bg-slate-950 px-5 py-4 text-base font-black text-white shadow-card transition hover:-translate-y-0.5 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-55">
                <LogIn className="h-5 w-5" /> {loading ? "확인 중..." : "로그인"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="mt-7 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Real Name</label>
                  <input value={signup.realName} onChange={(e) => setSignup((prev) => ({ ...prev, realName: e.target.value }))} className="mt-2 w-full rounded-[22px] border border-slate-200 bg-white px-5 py-4 font-bold outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100" placeholder="이름" autoComplete="name" />
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Student ID</label>
                  <input value={signup.studentId} onChange={(e) => setSignup((prev) => ({ ...prev, studentId: e.target.value }))} className="mt-2 w-full rounded-[22px] border border-slate-200 bg-white px-5 py-4 font-bold outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100" placeholder="학번" inputMode="numeric" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">ID</label>
                  <input value={signup.username} onChange={(e) => setSignup((prev) => ({ ...prev, username: e.target.value }))} className="mt-2 w-full rounded-[22px] border border-slate-200 bg-white px-5 py-4 font-bold outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100" placeholder="4자 이상" autoComplete="username" />
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Password</label>
                  <input value={signup.password} onChange={(e) => setSignup((prev) => ({ ...prev, password: e.target.value }))} className="mt-2 w-full rounded-[22px] border border-slate-200 bg-white px-5 py-4 font-bold outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100" placeholder="8자 이상" type="password" autoComplete="new-password" />
                </div>
              </div>

              <div className="space-y-2 rounded-[28px] border border-red-200 bg-red-50/80 p-4">
                <p className="px-3 text-xs font-black uppercase tracking-[0.22em] text-red-600">Important Notice</p>
                {[
                  ["noRedistribution", "이 사이트 링크와 자료를 외부에 유포하지 않겠습니다."],
                  ["studentOnly", "KSarchive가 승인된 경신고 학생 전용 학습 공간임을 이해했습니다."],
                  ["realNameCheck", "이름과 학번을 관리자 확인 목적으로 제출하는 데 동의합니다."],
                  ["copyrightNotice", "사이트 자료의 저작권 및 운영 권한이 개발자에게 있음을 확인했습니다."]
                ].map(([key, label]) => (
                  <label key={key} className="flex cursor-pointer items-start gap-3 rounded-2xl px-3 py-2 text-sm font-black leading-6 text-red-700 hover:bg-white">
                    <input
                      type="checkbox"
                      checked={agreement[key as keyof AgreementState]}
                      onChange={(e) => setAgreement((prev) => ({ ...prev, [key]: e.target.checked }))}
                      className="mt-1 h-4 w-4 accent-red-600"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>

              <button disabled={loading || !agreementReady} className="inline-flex w-full items-center justify-center gap-2 rounded-[24px] bg-slate-950 px-5 py-4 text-base font-black text-white shadow-card transition hover:-translate-y-0.5 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-55">
                <UserPlus className="h-5 w-5" /> {loading ? "요청 중..." : "가입 요청 보내기"}
              </button>
            </form>
          )}

          <div className="mt-7 rounded-[28px] border border-red-200 bg-red-50 p-5 text-sm leading-7 text-red-700">
            <p className="flex items-center gap-2 font-black"><LockKeyhole className="h-4 w-4" /> 승인 전에는 학습 공간 입장 불가</p>
            <p className="mt-1 font-black">가입 요청 승인 후 학습 공간에 입장 가능합니다. 승인 전에는 홈, 영어 분석, Arona OS, 한국사 타임라인을 열 수 없습니다.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
