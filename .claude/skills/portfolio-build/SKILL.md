---
name: portfolio-build
description: 디자인 스펙을 Next.js(App Router) 포트폴리오 사이트로 구현하는 스킬. portfolio-builder 에이전트가 사용한다. Next.js 포트폴리오 코드를 작성·수정할 때 사용하라.
---

# portfolio-build

`_workspace/01_designer_spec.md`를 동작하는 Next.js 사이트로 구현한다.

## 스택/구조
- **Next.js App Router + TypeScript**. 프로젝트가 없으면 `npx create-next-app@latest`로 스캐폴드(App Router, TS, Tailwind, ESLint = yes).
- 스타일은 **Tailwind** 기본. 스펙의 팔레트는 `tailwind.config`의 theme 또는 CSS 변수로 등록해 재사용한다.
- 구조:
  - `app/page.tsx` — 섹션들을 조립하는 단일 페이지(포트폴리오는 보통 원페이지)
  - `app/components/` — 섹션별 컴포넌트(Hero, About, Projects, …)
  - `data/profile.ts` — 이름·소개·프로젝트·링크 등 **콘텐츠를 데이터로 분리**(사용자가 여기만 고치면 되게)
  - `app/layout.tsx` — 메타데이터(title/description/OG), 폰트 로딩

## 구현 원칙
- 콘텐츠 하드코딩 금지 — `data/profile.ts`에서 import. 빈칸(`[채워주세요]`)은 데이터에 그대로 두되 TODO 주석을 단다.
- 반응형 필수: Tailwind 브레이크포인트로 모바일(기본)→데스크톱 순으로. 360px대에서 안 깨지게.
- 메타데이터(`app/layout.tsx`의 `metadata`)에 title·description·openGraph를 채운다.
- 이미지엔 `alt`, 시맨틱 태그(`<header><main><section><footer>`), 폼/버튼 접근성 기본 준수.
- 의존성은 스펙이 요구할 때만 추가(예: 애니메이션). 안 쓰면 넣지 마라.

## 다크모드 (React 19 / Next 16 주의)
- **다크모드는 CSS-first로 구현하라.** `<head>`에 인라인/외부 `<script>`로 테마를 초기화하지 마라 — React 19는 컴포넌트 트리 안의 `<script>`를 "client에서 실행 안 됨" 경고로 띄우고, 브라우저 번역 확장 등으로 hydration이 깨지면 그 경고가 표면화된다.
- 권장 패턴: 다크 토큰을 `@media (prefers-color-scheme: dark)`로 적용(첫 페인트부터 시스템 설정 반영, 무스크립트 no-flash) + 사용자 토글은 `<html>`에 `.dark`/`.light` 클래스로 override + localStorage 저장, 클라이언트 컴포넌트의 `useEffect`에서 저장된 선호를 재적용. Tailwind면 `@custom-variant dark`가 `.dark` 클래스와 시스템 다크(`:root:not(.light)`) 양쪽에 매칭되게 정의.

## 마무리 (반드시)
1. `npm run build` 실행 → 통과 확인. 실패 시 1회 자체 수정.
2. `_workspace/02_builder_notes.md`에 기록: 구현한 섹션 / 추가 의존성 / 스펙→코드 매핑 / 미구현·보류 / 빌드 결과.

## 재호출
`_workspace/03_review.md`가 있으면 그 지적 항목만 수정하고 다시 빌드 확인. 전체 재작성 금지.
