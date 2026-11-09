# BECLASSY 웹사이트

비클래시(을왕리점 메인 · 나주점) 브랜드 사이트. Astro 정적 사이트 + GSAP/ScrollTrigger + Lenis.

## 페이지

| 경로 | 내용 |
|---|---|
| `/` · `/en/` | 메인 (히어로 → 스테이트먼트 → 건축 → 층 안내 → 미디어아트 → 베이커리 → 커피 → 지점) |
| `/menu` · `/en/menu` | 전체 메뉴 |
| `/stores/eulwangni` · `/stores/naju` (+ `/en/…`) | 지점 상세 |

## 개발

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # dist/ 생성
```

### Windows에서 빌드가 "Cannot find native binding"으로 실패할 때
Windows 스마트 앱 컨트롤이 번들러(rolldown)의 서명 없는 네이티브 파일을 차단하는 경우입니다.
보안 설정을 바꾸지 말고 WASM 버전을 로컬에만 설치하세요(package.json에는 넣지 않음):

```bash
npm i --no-save --force @rolldown/binding-wasm32-wasi
```

## 콘텐츠 수정
- 문구·매장 정보·메뉴·가격: `src/data/site.ts` 한 파일에 모여 있습니다 (KO/EN).
- 이미지: `src/assets/img/` (빌드 시 WebP·반응형 크기로 자동 변환)
- 영상: `public/media/`

## 사진·영상 원본 가공
웹용 이미지·보정 영상은 이미 `src/assets/img`, `public/media`에 들어 있습니다.
원본 촬영 폴더에서 다시 만드는 스크립트(`scripts/local/`)와 기획 문서(`docs/`)는 내부 경로가 들어 있어 저장소에 올리지 않고 로컬에만 둡니다.

## 배포
- **GitHub Pages**: `main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 빌드·배포합니다.
  저장소 Settings → Pages → Source를 **GitHub Actions**로 한 번 설정해야 합니다.
  주소: `https://theshy3819.github.io/beclassy/`
- **Vercel(추후)**: 저장소를 import하면 그대로 동작합니다. `BASE_PATH`를 설정하지 않으면 루트(`/`)로 빌드됩니다.
  커스텀 도메인을 쓰면 `SITE_URL` 환경변수에 도메인을 넣어 주세요(canonical·OG 주소용).
