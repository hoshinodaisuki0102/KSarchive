-- KSarchive persistent auth store
-- Supabase SQL Editor에서 한 번 실행하세요.

create table if not exists public.ksarchive_kv (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.ksarchive_kv enable row level security;

-- 서버에서는 SUPABASE_SERVICE_ROLE_KEY를 사용하므로 RLS 정책 없이 접근 가능합니다.
-- 클라이언트에 SERVICE_ROLE_KEY를 절대 노출하지 마세요.

insert into public.ksarchive_kv (key, value, updated_at)
values ('users', '{"users": []}'::jsonb, now())
on conflict (key) do nothing;
