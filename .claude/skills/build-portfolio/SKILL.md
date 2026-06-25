---
name: build-portfolio
description: 개인 포트폴리오 사이트를 설계→구현→QA 파이프라인으로 만드는 오케스트레이터. 포트폴리오 사이트 생성·수정·보완·재실행, "포트폴리오 만들어줘/디자인 바꿔줘/프로젝트 추가/다시 실행" 등 포트폴리오 관련 작업 요청 시 반드시 이 스킬을 사용하라.
---

# build-portfolio (오케스트레이터)

Next.js 포트폴리오를 **서브에이전트 파이프라인**으로 만든다: designer → builder → reviewer(→builder 수정 루프). 데이터는 `_workspace/` 파일로 주고받는다.

**실행 모드:** 서브 에이전트 (`Agent` 도구 직접 호출, 모두 `model: "opus"`). 단계가 순차 의존이라 팀 통신은 불필요.

## Phase 0: 컨텍스트 확인
프로젝트 루트의 `_workspace/` 존재 여부로 실행 모드 판별:
- `_workspace/` 없음 → **초기 실행** (Phase 1부터 전체)
- `_workspace/` 있음 + 부분 수정 요청("히어로만 바꿔", "프로젝트 추가") → **부분 재실행** (해당 에이전트만 재호출)
- `_workspace/` 있음 + 완전히 새 입력 → **새 실행** (`_workspace/`를 `_workspace_prev/`로 옮기고 처음부터)

## Phase 1: 디자인 (designer)
`Agent(portfolio-designer, model:"opus")` 호출. 사용자 정보를 전달하고 `_workspace/01_designer_spec.md`를 만들게 한다. 정보 부족 시 designer가 빈칸을 남기므로, 결과의 빈칸 목록을 사용자에게 보여주고 채울지 물어본다.

## Phase 2: 구현 (builder)
`Agent(portfolio-builder, model:"opus")` 호출. `01_designer_spec.md`를 입력으로 Next.js 사이트를 구현하고 `npm run build` 통과 + `_workspace/02_builder_notes.md` 작성까지 시킨다.

## Phase 3: 리뷰 & 수정 루프 (reviewer ↔ builder)
1. `Agent(portfolio-reviewer, model:"opus")` 호출 → `_workspace/03_review.md` 생성.
2. blocker/major가 있으면 `Agent(portfolio-builder, model:"opus")`를 재호출해 `03_review.md`의 항목만 수정.
3. 다시 reviewer 호출. **최대 3회 반복**. blocker 0개가 되거나 3회 도달 시 종료.
4. 3회 후에도 남은 항목은 최종 보고에 "미해결"로 명시(은폐 금지).

## Phase 4: 보고 & 피드백
- 만든 것 요약, 사용자가 채워야 할 빈칸, 미해결 리뷰 항목, 로컬 실행법(`npm run dev`)을 보고한다.
- "디자인/콘텐츠에서 바꾸고 싶은 부분 있나요?" 물어본다. 피드백 오면 해당 Phase만 부분 재실행.

## 데이터 전달
- 중간 산출물: `_workspace/{01_designer_spec, 02_builder_notes, 03_review}.md` — 보존(감사 추적).
- 최종 산출물: 프로젝트 루트의 실제 Next.js 코드.

## 에러 핸들링
- 에이전트 실패 시 1회 재시도. 재실패하면 그 결과 없이 다음 단계 진행하되 보고에 누락 명시.
- 빌드가 환경 문제로 안 돌면 추정 통과 금지 — "수동 확인 필요"로 보고.

## 테스트 시나리오
- **정상**: "내 포트폴리오 만들어줘"(정보 제공) → designer 스펙 → builder 구현+빌드통과 → reviewer 통과 → 보고. dev 서버로 확인 가능.
- **에러**: builder 빌드 실패 → 자체 1회 수정 실패 → notes에 로그 기록 → reviewer가 blocker로 표시 → builder 재호출로 해결, 또는 3회 후 미해결 보고.
