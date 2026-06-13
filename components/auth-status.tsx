"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Save, ShieldCheck, UserRound, UsersRound, X } from "lucide-react";

type User = {
  realName: string;
  username: string;
  nickname?: string;
  role?: string;
};

export function AuthStatus() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function loadUser() {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      if (data?.user) {
        setUser(data.user);
        setNickname(data.user.nickname ?? "");
      }
    } catch {}
  }

  useEffect(() => { loadUser(); }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/auth");
    router.refresh();
  }

  async function saveNickname() {
    if (!user || user.role === "admin") return;
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/user/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nickname }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "닉네임 저장 실패");
      setUser(data.user);
      setNickname(data.user.nickname ?? "");
      setMessage("닉네임을 저장했습니다.");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "닉네임 저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  }

  if (!user) return null;
  const displayName = user.nickname || user.realName || user.username;

  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => setOpen(true)} className="inline-flex max-w-[150px] items-center gap-1.5 rounded-full border border-sky-100 bg-white/85 px-3 py-2 text-xs font-black text-emerald-700 shadow-card transition hover:-translate-y-0.5 hover:bg-emerald-50 sm:max-w-none" title="프로필 설정">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate">{displayName}</span>
      </button>
      <button type="button" onClick={logout} className="hidden items-center gap-1.5 rounded-full bg-slate-950 px-3 py-2 text-xs font-black text-white transition hover:bg-red-600 lg:inline-flex">
        <LogOut className="h-3.5 w-3.5" /> 로그아웃
      </button>

      {open && (
        <div className="fixed inset-0 z-[120] grid place-items-center bg-slate-950/45 px-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[32px] border border-white/70 bg-white p-6 shadow-deep">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1.5 text-xs font-black text-white"><UserRound className="h-3.5 w-3.5" /> My Profile</p>
                <h2 className="mt-4 text-2xl font-black text-slate-950">{displayName}</h2>
                <p className="mt-1 text-sm font-bold text-slate-500">ID: {user.username}</p>
              </div>
              <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-600"><X className="h-5 w-5" /></button>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <button onClick={() => router.push("/members")} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-50 px-4 py-3 text-sm font-black text-brand-700"><UsersRound className="h-4 w-4" /> 멤버 목록</button>
              {user.role === "admin" ? <button onClick={() => router.push("/admin")} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white"><ShieldCheck className="h-4 w-4" /> 승인실</button> : null}
            </div>

            {user.role !== "admin" ? (
              <div className="mt-5">
                <label className="text-sm font-black text-slate-800">닉네임</label>
                <input value={nickname} onChange={(e) => setNickname(e.target.value)} maxLength={12} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none transition focus:border-sky-400" placeholder="예: 영어만점가자" />
                <button onClick={saveNickname} disabled={saving} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-brand-700 disabled:opacity-60"><Save className="h-4 w-4" /> {saving ? "저장 중..." : "닉네임 저장"}</button>
              </div>
            ) : <p className="mt-5 rounded-2xl bg-sky-50 p-4 text-sm font-bold leading-6 text-brand-700">관리자 계정은 승인실과 학습 공간을 모두 바로 이용할 수 있습니다.</p>}

            {message && <p className="mt-3 text-sm font-black text-red-600">{message}</p>}
            <button onClick={logout} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-black text-red-600 lg:hidden"><LogOut className="h-4 w-4" /> 로그아웃</button>
          </div>
        </div>
      )}
    </div>
  );
}
