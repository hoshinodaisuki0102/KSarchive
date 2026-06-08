# GitHub Pages 배포 메모

지금 버전은 로컬 개발 우선입니다. GitHub Pages에 올릴 때는 Next.js 정적 내보내기 설정을 추가해야 할 수 있습니다.

## 나중에 검토할 항목

`next.config.ts`에 아래와 같은 설정이 필요할 수 있습니다.

```ts
const nextConfig = {
  output: "export",
  images: { unoptimized: true }
};
```

단, API route(`/api/chat`)는 정적 export에서 동작하지 않습니다. AI 채팅까지 배포하려면 Vercel 같은 서버 실행 환경을 쓰는 것이 더 자연스럽습니다.
