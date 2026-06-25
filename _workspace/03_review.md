# 리뷰 결과 — 최종 통과 (blocker 0개 · Major 2건 수정 확인)

> 최종 판정(재검증, 2026-06-25): **통과**. 1차 지적 Major 2건(다크모드 버튼 대비 / OG 이미지) 모두 수정 확인. `npm run build` 재실행 통과, 회귀 없음.
>
> 교차 검증: `01_designer_spec.md` ↔ 실제 코드(app/, data/, globals.css) 대조 + `npm run build` 직접 실행.
> 빌드 환경: Windows / Git Bash, `cd /c/Users/shini/portfolio && npm run build`.

---

## 재검증 (2차 — Major 2건 수정 확인)

### 1. 다크모드 버튼 대비 — **해결 확인**
- `app/globals.css:19` 라이트 `--color-on-primary: #ffffff`, `:31` 다크 `--color-on-primary: #1c1917` 토큰 추가됨. `@theme inline`(:43)에도 등록 → `text-on-primary` 유틸 생성.
- `app/components/Hero.tsx:48`("프로젝트 보기")·`Contact.tsx:24`(이메일 버튼) 모두 `text-white` → `text-on-primary`로 교체 확인.
- 대비 계산: 다크 모드 버튼 = primary `#FBBF24`(앰버400) 배경 + `#1C1917`(stone900) 전경 → 대비비 약 **10.4:1**, WCAG AA(4.5:1)·AAA(7:1) 모두 충족. 라이트 모드 = `#B45309` + `#FFFFFF` → 약 4.9:1, AA 충족. **양쪽 다 통과.**

### 2. OG 이미지 — **해결 확인**
- `app/opengraph-image.tsx` 추가(`next/og` ImageResponse, 1200×630, 추가 의존성 없음). 빌드에서 `/opengraph-image` 라우트가 static prerender됨(아래 빌드 로그 5/5).
- Next.js 파일 기반 OG 규칙이라 `metadata.openGraph.images`/`twitter.images`에 자동 주입됨 → `summary_large_image` 카드의 미리보기 깨짐 해소. layout.tsx의 기존 metadata 객체와 충돌·중복 없음.

### 빌드 재실행 (회귀 확인) — **통과**
```
✓ Compiled successfully in 2.8s
  Finished TypeScript
✓ Generating static pages (5/5)
Route (app)  ┌ ○ /  ├ ○ /_not-found  └ ○ /opengraph-image   (Static)
```
정적 페이지 4→5개(opengraph-image 추가분), 그 외 출력 동일. 런타임/타입 에러 없음, **회귀 없음.**

---

## (이하 1차 리뷰 기록)

> 교차 검증: `01_designer_spec.md` ↔ 실제 코드(app/, data/, globals.css) 대조 + `npm run build` 직접 실행.
> 빌드 환경: Windows / Git Bash, `cd /c/Users/shini/portfolio && npm run build`.

## 빌드 검증 (직접 실행)

`npm run build` **통과 확인**. 노트 주장과 일치.

```
▲ Next.js 16.2.9 (Turbopack)
✓ Compiled successfully in 2.8s
  Finished TypeScript
✓ Generating static pages (4/4)
Route (app)  ┌ ○ /  └ ○ /_not-found  (Static)
```

런타임 에러 없음. `/`가 static prerender. 화면에 노출되는 미완 placeholder는 모두 스펙의 "사용자 입력 필요" 빈칸(로그몬스 카드 / About 상태)으로, 의도된 빈칸 → blocker 아님(아래 Minor 참조).

---

## Blocker

없음.

---

## Major

- **[app/components/Hero.tsx:48 · Contact.tsx:24 / 다크모드 버튼 대비]** primary 버튼이 `bg-primary text-white`로 고정. 라이트에서 primary=`#B45309`(앰버700) 위 흰 글자는 OK지만, **다크 모드에서 primary=`#FBBF24`(앰버400)** 위 흰 글자는 대비비가 ~1.3:1로 WCAG AA(4.5:1) 크게 미달 — 다크모드에서 "프로젝트 보기"·이메일 버튼 글자가 거의 안 읽힘.
  - 왜 문제: 스펙이 다크모드를 1급으로 설계(별도 토큰)했는데, 버튼 전경색만 라이트 기준으로 하드코딩됨.
  - 고치기: 버튼 텍스트를 토큰화. 예) `--color-on-primary`를 추가(`:root`에서 `#ffffff`, `.dark`에서 `#1c1917`)하고 `text-white` → `text-[var(--color-on-primary)]`. 또는 다크 primary를 흰 글자에서도 통과하는 더 진한 앰버로 조정.

- **[data/profile.ts:46 ↔ layout.tsx:28 / SEO description에 미확정 카피 의존]** `description = ${profile.identity}. ${profile.heroSub}` 인데 `identity`는 스펙상 **[추천 — 확정 필요]** 상태(TODO). 메타 description이 미확정 문구로 박힘.
  - 왜 문제: SEO 메타는 정상 채워졌으나(title/description/openGraph/twitter 모두 존재 — 이 부분은 양호), 내용이 사용자 확정 전 추천안. 확정 시 메타도 같이 갱신 필요.
  - 고치기: 결함은 아님(빈칸 정책상 허용). 사용자가 identity 확정하면 자동 반영되므로 **추가 작업 불필요** — 주의 환기용으로만 기록.

- **[layout.tsx:31 / openGraph.images 없음 → twitter `summary_large_image`]** twitter 카드를 `summary_large_image`로 선언했으나 `openGraph.images` / `twitter.images`가 비어 있음.
  - 왜 문제: large_image 카드인데 이미지가 없어 SNS 공유 시 미리보기가 비거나 깨질 수 있음.
  - 고치기: OG 이미지(예: `public/og.png`) 추가 후 `openGraph.images`에 등록하거나, 이미지 없을 동안은 `twitter.card`를 `summary`로 낮추기.

**Major에서 양호 확인된 항목(결함 아님):**
- 디자인 일치: 라이트/다크 팔레트 hex 8종 모두 스펙과 정확히 일치(globals.css `:root`/`.dark`). 폰트 3종(Outfit/Noto Sans KR/JetBrains Mono) layout.tsx에 정확 연결, `--font-display`/`--font-sans`/`--font-mono` 매핑도 스펙대로. 섹션 순서 Hero→About→Projects→Skills→Contact→Footer 일치. 다크 토글 우상단(Nav 끝) 위치 일치.
- 반응형(360px): 모바일 우선 + 브레이크포인트 일관. 패딩 `px-5`(모바일)→`sm:px-8`, 그리드 `md:grid-cols-2`(프로젝트)·`sm:grid-cols-2 lg:grid-cols-3`(스킬)·`md:grid-cols-[1.6fr_1fr]`(About). Hero에 `overflow-hidden`으로 그라데이션 배경 가로 넘침 차단. 360px에서 깨질 요소 없음.
- 링크/CTA: GitHub `https://github.com/DevYongE`, 이메일 `mailto:devxcdy@gmail.com`, 프로젝트 GitHub 링크 2종 모두 유효한 형식 + 외부 링크 `target="_blank" rel="noreferrer noopener"`. KeyDeck/로그몬스 링크는 `links: []`로 미노출 처리(빈 URL 노출 없음) — 의도된 빈칸.

---

## Minor

- **[data/profile.ts:64 / About 현재 상태 placeholder 화면 노출]** `facts`의 "상태" 값이 `[채워주세요: 현재 상태...]` 문자열 그대로라 About 우측 카드에 **화면에 그대로 표시됨**(About.tsx:43 `dd`). 스펙상 의도된 빈칸이므로 minor지만, 로그몬스 카드와 달리 placeholder임을 시각적으로 구분하지 않아 그대로 텍스트가 보임.
  - 고치기: 사용자가 값 채우면 해결. 채우기 전 노출이 부담되면 빈 값일 때 해당 fact를 렌더에서 제외하는 조건 추가 고려.

- **[data/profile.ts:131-143 / 로그몬스 카드 placeholder 화면 노출]** `[채워주세요: ...]` 4종(tagline/features/stack/status)이 카드에 그대로 노출. `placeholder: true`지만 시각 처리는 `opacity-90`만(Projects.tsx:18) — 텍스트 자체는 읽힘. 스펙이 "틀만 노출"로 의도 → minor. 사용자 입력 시 해소.

- **[접근성 — 양호]** img 없음(이니셜 마크는 `aria-hidden`), 시맨틱 `header/nav/main/section/footer` 사용, `dl/dt/dd`로 사실 목록, 버튼 `aria-label`, 외부 링크 rel 처리, `focus-visible` 아웃라인, `prefers-reduced-motion` 존중(globals.css). 기능/스택 그룹에 `aria-label`. 결함 없음. (단, 다크모드 버튼 대비는 위 Major로 분리.)

- **[콘텐츠 분리 — 양호]** 모든 콘텐츠가 `data/profile.ts` 한 곳에 분리되고 빈칸은 TODO 주석으로 표기. 사용자가 이 파일만 고치면 됨 — 스펙 의도 충족.

- **[의존성 — 양호]** 런타임 의존성은 `lucide-react`·`next`·`react`·`react-dom`뿐. 애니메이션/상태관리 라이브러리 추가 없음(IntersectionObserver+CSS로 자체 구현). 불필요 의존성 없음.

- **[app/components/Reveal.tsx:51 / 모션 깜빡임]** `.reveal` 초기 `opacity:0`이라 JS 비활성/IntersectionObserver 미지원 환경에서 콘텐츠가 안 보일 수 있음. `prefers-reduced-motion`은 처리되나 JS-off는 미대응. 정적 포트폴리오 특성상 영향 낮아 minor. 필요 시 `<noscript>`로 `.reveal{opacity:1}` 폴백 추가.
