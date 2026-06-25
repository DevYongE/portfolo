---
name: portfolio-review
description: 구현된 Next.js 포트폴리오를 QA하는 스킬. portfolio-reviewer 에이전트가 사용한다. 포트폴리오 빌드·반응형·접근성·SEO·디자인 일치를 검증할 때 사용하라.
---

# portfolio-review

디자인 스펙과 코드를 **교차 비교**해 판정하고, 고칠 항목을 `_workspace/03_review.md`에 심각도별로 남긴다.

## 체크리스트

### Blocker (있으면 통과 불가)
- [ ] `npm run build`가 실제로 통과한다 — notes 주장만 믿지 말고 직접 실행.
- [ ] 페이지가 렌더된다(런타임 에러 없음).
- [ ] `[채워주세요]` 같은 미완 placeholder가 화면에 노출되지 않는다(데이터에 남은 건 minor로).

### Major
- [ ] **디자인 일치**: 스펙의 색 hex·폰트·섹션 순서·다크모드가 코드에 반영됐는가.
- [ ] **반응형**: 360px 모바일 폭에서 레이아웃이 깨지지 않는가(Tailwind 브레이크포인트·overflow 확인).
- [ ] **SEO**: `metadata`에 title·description·openGraph가 채워졌는가.
- [ ] **링크/CTA**: GitHub·이메일·프로젝트 링크가 유효한 형식이고 연결됐는가.

### Minor
- [ ] 접근성: img `alt`, 시맨틱 태그, 폼/버튼 라벨, 색 대비.
- [ ] 콘텐츠가 `data/`로 분리돼 사용자가 고치기 쉬운가.
- [ ] 불필요한 의존성이 추가되지 않았는가.

## 검증 방법
- 빌드: 직접 `npm run build` 실행. 환경 문제로 못 돌면 "실행 불가 — 수동 확인 필요"로 표시(추정 통과 금지).
- 디자인 일치: `01_designer_spec.md`의 hex/폰트/섹션을 코드(`tailwind.config`, 컴포넌트)에서 grep해 대조.
- 반응형: 컴포넌트의 Tailwind 클래스에 모바일 기준 + 브레이크포인트(`sm:`/`md:`)가 있는지 확인.

## 출력 형식 (`_workspace/03_review.md`)

```markdown
# 리뷰 결과 — <통과 | blocker N개>

## Blocker
- [파일:라인] 무엇이 / 왜 문제 / 어떻게 고칠지

## Major
- ...

## Minor
- ...
```
blocker 0개면 상단에 "통과"를 명시한다.
