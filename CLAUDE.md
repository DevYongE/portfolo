# portfolio

개인 포트폴리오 사이트 (Next.js / App Router / TypeScript / Tailwind).

## 하네스: 포트폴리오 빌드

**목표:** 디자인→구현→QA 파이프라인으로 Next.js 포트폴리오를 만들고 유지보수한다.

**트리거:** 포트폴리오 사이트 생성·수정·보완·재실행 요청 시 `build-portfolio` 스킬을 사용하라. 단순 질문은 직접 응답 가능.

**구성:** designer → builder → reviewer 서브에이전트 파이프라인 (모두 opus). 중간 산출물은 `_workspace/`.

**변경 이력:**
| 날짜 | 변경 내용 | 대상 | 사유 |
|------|----------|------|------|
| 2026-06-25 | 초기 구성 | 전체 | - |
| 2026-06-25 | humanize-korean 연결(한글 카피 다듬기) | designer, portfolio-design | 카피 AI 티 제거 요청 |
| 2026-06-25 | 다크모드 CSS-first 규칙 추가 | portfolio-build | React19 script-in-JSX 경고 재발 방지 |
