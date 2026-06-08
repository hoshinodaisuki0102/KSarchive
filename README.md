# KSarchive

경신고 내신 대비용 비공개 학습 아카이브입니다.

## 실행

```bash
npm install
npm run dev
```

- 홈: http://localhost:3000
- 로그인/회원가입: http://localhost:3000/auth
- 관리자 승인실: http://localhost:3000/admin

## 로그인/승인 게이트

- 회원가입 요청 시 이름, 학번, 아이디, 비밀번호만 받습니다.
- 가입 요청은 `data/users.json`에 `pending` 상태로 저장됩니다.
- 관리자가 `/admin`에서 승인하면 해당 학생이 로그인할 수 있습니다.
- 관리자 계정으로 로그인하면 승인실뿐 아니라 학습 사이트에도 바로 접근할 수 있습니다.
- 승인 전에는 홈, 영어, 한국사, Arona OS 등 본문 페이지에 접근할 수 없습니다.

## 기본 관리자 계정

`.env.local` 또는 배포 서비스의 Environment Variables에서 수정할 수 있습니다.

```env
KS_ADMIN_USERNAME=ksadmin
KS_ADMIN_PASSWORD=Ksa!0629_Admin
```

배포 전에는 반드시 비밀번호를 바꾸는 것을 권장합니다.

## PWA 설치형 앱

이번 버전에는 기본 PWA 설정이 들어 있습니다.

- `public/manifest.webmanifest`
- `public/sw.js`
- `components/pwa-register.tsx`
- `public/pwa-192.png`, `public/pwa-512.png`

친구들에게 ZIP 파일을 뿌리는 방식은 업데이트가 자동 반영되지 않습니다. 업데이트를 바로바로 적용하려면 한 곳에 배포한 웹 주소를 친구들에게 보내고, 친구들은 그 주소를 스마트폰에서 `홈 화면에 추가`해야 합니다.

배포 후 스마트폰 크롬에서 사이트에 접속하면 “홈 화면에 추가” 방식으로 앱처럼 사용할 수 있습니다. iPhone은 Safari 공유 메뉴에서 “홈 화면에 추가”를 사용하면 됩니다.

## 환경변수

`.env.local`에 다음 값이 들어갑니다.

```env
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash
KS_AUTH_SECRET=change-this-to-a-long-random-secret
KS_ADMIN_USERNAME=ksadmin
KS_ADMIN_PASSWORD=change-this-admin-password
```

## 주의

`.env.local`과 `data/users.json`은 개인정보/인증정보가 들어갈 수 있으므로 GitHub에 올리지 마세요. 친구들과 사용할 때는 ZIP 파일이 아니라 배포 URL만 공유하고, API 키와 관리자 비밀번호는 서버 배포 환경변수로 관리하는 것이 좋습니다.

Vercel 같은 서버리스 환경에서는 `data/users.json` 파일 저장이 영구 유지되지 않을 수 있습니다. 실제 운영용으로 오래 쓰려면 Supabase/Firebase 같은 DB 연결을 권장합니다.
