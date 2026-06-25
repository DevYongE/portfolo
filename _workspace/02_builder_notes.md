# 빌더 노트 (portfolio-builder)

> 입력: `_workspace/01_designer_spec.md`
> 스택: Next.js 16.2.9 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · lucide-react

---

## 구현한 섹션

단일 페이지(`app/page.tsx`)에 스펙 순서 그대로 조립:

1. **Nav** (`app/components/Nav.tsx`) — sticky 상단바, 로고(DevYongE) + 섹션 앵커 + 다크모드 토글. 모바일에선 메뉴 숨기고 토글만.
2. **Hero** (`Hero.tsx`) — min-h-80vh, 좌측 정렬 단일 컬럼(max-w-3xl). 라벨 → 이름 → 정체성 한 줄 → 보조 문장 → CTA 2개(프로젝트 보기 primary / GitHub secondary). 옅은 앰버 radial 그라데이션 배경.
3. **About** (`About.tsx`) — 데스크톱 2컬럼(좌 소개 2문단 / 우 사실 목록 카드), 모바일 1컬럼. 프로필 이미지 대신 이니셜 마크(DE).
4. **Projects** (`Projects.tsx` + `Section.tsx`) — 데스크톱 2열 / 모바일 1열 카드 그리드. 4장(온기록·온서재·KeyDeck·로그몬스). 카드: 제목 + 뱃지 + 한 줄 + 기능 칩 + 스택(#mono) + 상태 + 링크. hover 시 -translate-y-1 + shadow.
5. **Skills** (`Skills.tsx`) — 카테고리 5그룹 칩 wrap. % 게이지 없음(스펙 준수).
6. **Contact** (`Contact.tsx`) — 중앙 정렬 카드, 헤드 문장 + 이메일 버튼(mailto) + GitHub 버튼.
7. **Footer** (`Footer.tsx`) — 저작권 한 줄.

공통: `Section.tsx`(제목+lead 래퍼), `Reveal.tsx`(진입 페이드+업), `ThemeToggle.tsx`, `GithubIcon.tsx`.

콘텐츠는 전부 `data/profile.ts`로 분리 — 사용자는 이 파일만 수정하면 됨.

---

## 추가 의존성

| 패키지 | 용도 | 비고 |
|--------|------|------|
| `lucide-react` | 아이콘(스펙: Lucide SVG로 통일, 이모지 금지) | 사용 아이콘: ArrowRight, Mail, ExternalLink, Sun, Moon |

그 외 애니메이션/상태관리 라이브러리는 **추가하지 않음**. 진입 모션은 브라우저 내장 IntersectionObserver + CSS transition으로 구현(의존성 0).

---

## 스펙 → 코드 매핑

| 스펙 항목 | 구현 위치 |
|-----------|-----------|
| 라이트/다크 팔레트 hex | `app/globals.css` CSS 변수(`:root` / `.dark`) + `@theme inline` 토큰. 색은 스펙 hex 그대로(primary #B45309 / #FBBF24 등). |
| 폰트 Outfit + Noto Sans KR (+ JetBrains Mono) | `app/layout.tsx` `next/font/google`. `--font-display`(Outfit, 제목/이름), `--font-sans`(Noto Sans KR, 본문), `--font-mono`(JetBrains, 스킬·스택 칩). |
| 다크모드 토글(우상단) | `ThemeToggle.tsx`(Nav 끝). 클래스 전략(`<html class="dark">`) + localStorage 저장 + `layout.tsx`의 no-flash 인라인 스크립트. |
| 모션: 진입 페이드+업 200~300ms ease-out | `Reveal.tsx` + `globals.css .reveal`(300ms ease-out). 카드 hover 상승 -4px + 그림자. |
| `prefers-reduced-motion` 존중 | `globals.css` 미디어쿼리로 transition/animation 무력화. |
| 아이콘 Lucide(SVG), 이모지 금지 | lucide-react + `GithubIcon.tsx`(아래 참고). |
| 본문 16px / line-height 1.6 | `body { line-height: 1.6 }`, 본문 text-base(16px). |
| 반응형 360px~ | 모바일 우선. base=1열, `sm:`/`md:`/`lg:` 브레이크포인트로 확장. 패딩 px-5(모바일)→sm:px-8. |
| 메타데이터 title/description/openGraph | `layout.tsx` `metadata`(openGraph + twitter + keywords + authors, locale ko_KR). |
| 시맨틱/접근성 | `<header><nav><main><section><footer>`, `aria-label`, `dl/dt/dd`, 버튼 aria-label, focus-visible 아웃라인, 외부링크 rel="noreferrer noopener". |
| 빈칸(`[채워주세요]`) | `data/profile.ts`에 값 그대로 유지 + TODO 주석. UI에선 자연스럽게 노출(로그몬스 카드/About 상태). |

---

## 빈칸·보류 항목 (사용자 입력 필요)

`data/profile.ts`에 TODO 주석으로 표기. 모두 스펙의 "빈칸" 목록과 1:1 대응:

- 한 줄 정체성: 추천안 사용 중(확정 시 `profile.identity` 교체).
- About 현재 상태: `[채워주세요...]` 문자열 그대로 노출 중.
- KeyDeck 링크: 미정 → 링크 버튼 미노출(`links: []`). 채우면 자동 표시.
- 로그몬스(카드4): 한 줄/기능/기술/상태/링크 전부 빈칸. `placeholder: true`로 표시, 틀만 노출.
- 프로필 이미지: 미사용 → 이니셜 마크(DE)로 대체. 사용 시 About.tsx의 마크를 `<Image>`로 교체.
- LinkedIn 등 SNS: `profile.socials: []` — 확정된 것만 노출(현재 없음).

---

## 구현 중 변경/판단 (스펙과 다른 점)

1. **GitHub 아이콘**: 최신 lucide-react에서 brand 아이콘 `Github`가 제거됨(빌드 에러). 스펙의 "Lucide SVG로 통일, 이모지 금지" 의도를 지키기 위해 동일 stroke 스타일의 인라인 SVG 컴포넌트 `GithubIcon.tsx`를 직접 정의해 사용(이모지 아님, SVG 유지). 나머지 아이콘은 lucide-react 그대로.
2. **Tailwind v4**: create-next-app 최신이 Tailwind v4(CSS `@theme`, `tailwind.config.js` 없음)를 스캐폴드. 팔레트는 `tailwind.config` 대신 `globals.css`의 CSS 변수 + `@theme inline`으로 토큰화(스킬 문서의 "theme 또는 CSS 변수" 허용 범위 내).
3. **다크모드 전략**: 스펙은 토큰 기반. prefers-color-scheme 자동 대신 **클래스 토글 + localStorage 기억**(사용자가 우상단 토글로 직접 제어). 최초 방문 시엔 시스템 설정을 따름(no-flash 스크립트).
4. **package name**: 스캐폴드가 임시 폴더명(scaffoldtmp)으로 생성됨 → `portfolio`로 정정.

---

## 빌드 결과

- `npm run lint` → **통과** (에러 0). ThemeToggle을 CSS dark: variant 기반으로 리팩터해 `react-hooks/set-state-in-effect` 경고 제거.
- `npm run build` → **통과**. Next.js 16.2.9 Turbopack, TypeScript 검사 통과, `/`가 static으로 prerender됨.

```
✓ Compiled successfully
✓ Finished TypeScript
✓ Generating static pages (4/4)
Route (app)
┌ ○ /            (Static)
└ ○ /_not-found
```

막힌 부분 없음. 위 GitHub 아이콘 이슈만 자체 수정으로 해결.

---

## 파일 트리 (추가/수정분)

```
app/
  layout.tsx          # 폰트 3종 + 메타데이터 + no-flash 다크모드 스크립트
  page.tsx            # 섹션 조립
  globals.css         # 디자인 토큰(라이트/다크) + reveal 모션
  components/
    Nav.tsx
    Hero.tsx
    About.tsx
    Projects.tsx
    Skills.tsx
    Contact.tsx
    Footer.tsx
    Section.tsx       # 섹션 공통 래퍼
    Reveal.tsx        # IntersectionObserver 진입 애니메이션
    ThemeToggle.tsx   # 다크모드 토글
    GithubIcon.tsx    # GitHub 인라인 SVG(lucide 대체)
  opengraph-image.tsx # OG/twitter 미리보기 이미지(next/og 동적 생성) — 리뷰 후 추가
data/
  profile.ts          # 모든 콘텐츠 + 빈칸 TODO
```

---

## 리뷰 반영 (03_review.md Major 2건)

리뷰어 지적 중 실제 수정이 필요한 Major 2건만 처리(전체 재작성 없음). 나머지 Major("identity 미확정 메타", description)는 리뷰가 "추가 작업 불필요"로 명시 → 손대지 않음.

### 1. 다크모드 primary 버튼 대비 미달 (a11y)
- 문제: Hero "프로젝트 보기" / Contact 이메일 버튼이 `text-white` 고정. 다크 primary=#FBBF24(앰버400) 위 흰 글자는 대비비 ~1.3:1로 WCAG AA 미달.
- 수정: `--color-on-primary` 토큰 추가(`globals.css`). 라이트=`#ffffff`, 다크=`#1c1917`(stone900, 앰버 위 대비 AA 확보). `@theme inline`에 등록해 `text-on-primary` 유틸로 노출.
- 적용: primary 배경 버튼 2곳(`Hero.tsx`·`Contact.tsx`)의 `text-white` → `text-on-primary`. 다른 primary 배경 버튼은 이 둘뿐이라 전체 일관 적용 완료.

### 2. OG 이미지 부재 (twitter summary_large_image)
- 문제: `twitter.card=summary_large_image`인데 `openGraph.images`가 비어 SNS 미리보기가 깨질 수 있음.
- 수정: `app/opengraph-image.tsx` 추가. Next.js 내장 `next/og`(ImageResponse)로 1200x630 OG 이미지를 빌드 시 생성 — **추가 의존성 없음**(Next 기본 제공). 카드 하향 대신 이미지 1장 추가 방식 선택.
- 효과: 빌드 후 렌더 HTML에 `og:image`/`twitter:image`(1200x630, alt 포함)가 자동 주입됨을 직접 확인. `summary_large_image`가 이제 유효.

### 재검증 결과
- `npm run lint` → 통과(에러 0).
- `npm run build` → **통과**. 라우트에 `/opengraph-image`(static) 추가, `/` 정상 prerender.
- 빌드 산출 HTML에서 `og:image` + `twitter:image` 메타 태그 존재 확인.

---

## Projects 섹션 개선 (스크린샷 + Play 스토어 필드 + 가로 카루셀)

### 1. 스크린샷 자산 복사 (`public/projects/<slug>/`)
실물 이미지를 Bash `cp`로 복사. 원본은 그대로 두고 portfolio로 복사만.

| 프로젝트 | 출처 | 복사본 | 장수 |
|----------|------|--------|------|
| 온서재(onseojae) | `workspace_s/sentence-drawer-app/store/screenshots/raw/` | `1_home.png · 2_library.png · 3_book.png · 4_profile.png` (1064×2384) | 4 |
| KeyDeck(keydeck) | `bt-macro-keyboard/assets/store/screenshots_pretty/` | `01.png · 02.png · 03.png` (1080×1920) | 3 |
| 온기록(ongirok) | `workspace/onmemory_flutter_app/docs/design/screenshots/` | `1_home.jpg(check)` · `2_feed.jpg(right)` (909×525) | 2 |
| 로그몬스(logmons) | 자산 없음 | — | 0 (빈 배열) |

- **선택 근거**: KeyDeck은 `screenshots_pretty`(기기 목업+카피)가 plain보다 보기 좋아 채택. 온기록은 design/screenshots의 4종을 직접 열어 본 뒤, 앰버(웜) 테마라 포트폴리오 팔레트와 가장 어울리는 `check.png`(홈)·`right.png`(피드/프로필)를 선택(`lavender`는 보라 변형, `new`는 right와 중복). fastlane/store 폴더에 더 나은 자산 없음을 확인.
- **포맷 정정**: 온기록 원본은 확장자만 `.png`이고 실제는 JPEG(909×525 가로 합성)였음 → 복사 후 `.jpg`로 리네임해 확장자/실제 포맷 일치.
- **렌더**: 모두 Next `<Image>`로 렌더(실제 픽셀 width/height를 데이터에 명시 → CLS 방지·최적화). `alt` 전부 작성.

### 2. Play 스토어 링크 필드 (미출시 → 빈 값)
`data/profile.ts` `Project` 인터페이스에 필드 추가: `slug` · `packageId` · `playStoreUrl` · `screenshots: Screenshot[]`(+`Screenshot` 타입).
- `packageId`: 온기록=`com.onmemory.app`, 온서재=`com.onseojae.app`, KeyDeck=`com.btmacro.bt_macro_keyboard`, 로그몬스=`""`.
- `playStoreUrl`: 3앱 모두 **빈 문자열 + TODO 주석**(비공개 테스트/업로드 전이라 공개 URL 없음).
- 카드 렌더: `playStoreUrl`이 truthy일 때만 "Play 스토어" 버튼 노출(`Projects.tsx` `showPlayStore`). 채워지면 자동 표시. GitHub 링크는 기존대로.

### 3. 가로 스와이프 카루셀 (외부 라이브러리 없음)
- `ProjectsCarousel.tsx`(client): 트랙 `overflow-x-auto` + `.snap-x`(`scroll-snap-type:x mandatory`), 각 카드 `.snap-item`(`scroll-snap-align:start`). 모바일은 네이티브 터치 스와이프, 데스크톱은 좌우 화살표(`scrollBy` 한 칸) + 키보드(←/→). 스크롤 위치로 화살표 disabled 토글.
- 카드 폭: 모바일 88% → sm 72% → md/lg `calc(50%-12px)`(2장 보임).
- 카드 내 스크린샷: `ScreenshotGallery.tsx`(server) — 1장이면 단순 이미지, 여러 장이면 같은 scroll-snap 패턴의 가로 갤러리.
- 접근성: 카루셀 `role="region"`+`aria-label`+`aria-roledescription="carousel"`+`tabIndex=0`, 화살표 버튼 `aria-label`, 갤러리 `role="group"`+`aria-label`. 스크롤바는 `.snap-x`에서 숨기되(키보드/스와이프 동작 유지), `prefers-reduced-motion`이면 `scrollBy` behavior를 `auto`로(smooth 끔).
- 디자인 토큰·다크모드 그대로(색/보더/그림자/`text-on-primary` 등 기존 토큰 재사용). 추가 의존성 0 — 화살표 아이콘은 기존 lucide(ChevronLeft/Right), Play 버튼은 lucide Smartphone.

### 추가/수정 파일
- 추가: `app/components/ProjectsCarousel.tsx`, `app/components/ScreenshotGallery.tsx`, `public/projects/{onseojae,keydeck,ongirok,logmons}/...`
- 수정: `data/profile.ts`(Project/Screenshot 타입 + 필드), `app/components/Projects.tsx`(카루셀·갤러리·Play 버튼), `app/globals.css`(`.snap-x`/`.snap-item` 유틸 + reduced-motion).

### 재검증 결과
- `npm run lint` → 통과(에러 0).
- `npm run build` → **통과**(이미지 import/경로 에러 없음). `/` static prerender 유지.
- 실행 중 dev 서버(:3000) 확인: `/projects/onseojae/1_home.png`·`/projects/keydeck/01.png`·`/projects/ongirok/1_home.jpg` 모두 **200**. Next 이미지 최적화 엔드포인트(`/_next/image?...`)도 PNG·JPEG 모두 **200**.

---

## 카루셀 UX/디자인 폴리시 (ui-ux-pro-max 참고)

외부 라이브러리 추가 없이(lucide만) 캐러셀을 "예쁜 클래식 캐러셀"로 개선. ui-ux-pro-max 규칙 반영: 토큰 기반 라이트/다크 대비, 드래그 임계값(우발 클릭 방지), reduced-motion, 모든 컨트롤 aria-label, press 시 scale 피드백, focus 링 유지.

### 공용 유틸
- `app/components/useDragScroll.ts` (신규 훅): 포인터 드래그-투-스크롤. `pointerType==="mouse"`일 때만 관여(터치는 네이티브 scroll-snap 유지). **임계값 6px** 넘게 끌어야 드래그로 간주하고, 드래그한 경우 직후 발생하는 click을 캡처 단계에서 1회 차단 → 카드 안 GitHub/Play 링크 오발동 방지. 드래그 중 컨테이너에 `.is-dragging` 토글(커서 grabbing + `user-select:none`), `setPointerCapture`로 컨테이너 밖까지 추적.
- `app/components/CarouselArrow.tsx` (신규): 원형 네비 버튼 공통 컴포넌트. surface 배경 + `border-border` + `shadow-md`(+`ring-black/5`), hover 시 `scale-105`+`shadow-lg`, active `scale-95`, disabled 흐리게/비활성. `size="sm"`은 갤러리용 축소판. 토큰(surface/border/text/primary) 사용으로 다크모드에서도 버튼이 배경과 분리돼 보임.
- `app/globals.css`: `.drag-scroll`(cursor grab) + `.drag-scroll.is-dragging`(grabbing + user-select 차단) 추가.

### 1) 프로젝트 카루셀 (`ProjectsCarousel.tsx`)
- 밋밋한 하단 화살표 → **양쪽 가장자리 세로 중앙 절대배치 원형 화살표**(카드 가장자리에 `-ml-3`/`md:-ml-5`로 살짝 겹쳐 떠 있음). 데스크톱 전용(`hidden sm:flex`), 모바일은 터치 스와이프. 오버레이는 `pointer-events-none`+버튼만 `pointer-events-auto`라 드래그/스크롤 방해 없음.
- 시작/끝이면 해당 화살표 `disabled`(흐림). 스크롤 위치로 `canPrev`/`canNext` 토글.
- 마우스 드래그-투-스크롤 추가(`useDragScroll`). 기존 터치 스와이프·키보드(←/→)·`prefers-reduced-motion`·`role="region"`/`aria-roledescription="carousel"`/`aria-label` 유지.

### 2) 카드 안 갤러리 (`ScreenshotGallery.tsx`, server→client 전환)
- 여러 장일 때: 같은 디자인의 **작은(sm) 원형 화살표**를 좌/우에 오버레이(hover 시 페이드 인). **마우스 드래그 + 터치 스와이프**(scroll-snap 유지).
- 하단 **점(dots) 인디케이터**: 스크롤 위치로 현재 장 계산해 강조(활성 점은 폭 확장 `w-5 bg-primary`). 점 클릭 시 `scrollTo`로 해당 이미지 이동. `aria-current`로 현재 장 표시(tablist 오용 대신 버튼+aria-label/aria-current 패턴).
- 한 장이면 화살표·점 모두 숨김(기존 단일 이미지 렌더).
- 모든 `<Image>`에 `draggable={false}` — 드래그 시 고스트 이미지 방지.

### 디자인/접근성
- 새 색 없음 — 기존 토큰(surface/border/text/primary/muted)만 사용해 라이트·다크 대비 확보. 화살표·점 모두 `aria-label`, 포커스 가능, `focus-visible` 아웃라인 유지.

### 추가/수정 파일 (이번 단계)
- 추가: `app/components/useDragScroll.ts`, `app/components/CarouselArrow.tsx`.
- 수정: `app/components/ProjectsCarousel.tsx`(가장자리 원형 화살표 + 드래그), `app/components/ScreenshotGallery.tsx`(client화 + 화살표/점/드래그 + draggable=false), `app/globals.css`(`.drag-scroll` 커서).

### 재검증 결과
- `npm run lint` → 통과(에러 0). `npm run build` → **통과**. `/` static prerender 유지.
- (dev 서버 재시작은 코디네이터가 수행 — 빌더는 빌드까지.)
