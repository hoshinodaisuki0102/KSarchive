# GitHub Pages 배포 방법

## 1) 저장소 이름
이 프로젝트를 GitHub 저장소 `KSarchive-main` 에 올리는 기준으로 설정되어 있습니다.
다른 저장소 이름을 쓰면 `.github/workflows/deploy-pages.yml` 안의 `NEXT_PUBLIC_BASE_PATH` 값을 같은 이름으로 바꿔 주세요.

## 2) 업로드
프로젝트 전체를 GitHub 새 저장소에 push 합니다.

## 3) Pages 설정
GitHub 저장소에서:
- **Settings**
- **Pages**
- **Build and deployment**
- **Source = GitHub Actions**

## 4) 배포
`main` 브랜치에 push 하면 자동으로 배포됩니다.

## 5) 링크
배포 주소는 보통 아래 형태입니다.

```
https://YOUR_GITHUB_ID.github.io/KSarchive-main/
```

## 6) 로컬 실행
```bash
npm install
npm run dev
```
