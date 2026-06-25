# 포트폴리오 디자인 스펙

> 대상: 최대용(DevYongE) 개인 포트폴리오 (Next.js / App Router / TypeScript / Tailwind)
> 작성: portfolio-designer · 디자인 근거: ui-ux-pro-max (Portfolio Grid + Motion-Driven, Warm amber 팔레트, Outfit + Noto Sans KR)
> 카피: 한글, humanize-korean 원칙 적용(과한 병렬구조·약한 hype·군더더기 표현 제거 / 의미·사실·고유명사·버전·링크·빈칸 불변)

---

## 상단 요약: 이 스펙으로 빌더가 알아야 할 것

- 한 줄 정체성은 **[추천 — 확정 필요]** 상태다. 사용자가 확정하면 Hero 카피의 해당 줄만 교체.
- 4번째 프로젝트(로그몬스)는 카드 자리는 만들되 설명/링크는 빈칸이다.
- 컬러는 "신뢰감 있는 개발자" 중립톤 + "따뜻한 기록" 앰버 액센트를 섞었다. 다크모드 토큰 별도 정의됨.

---

## 디자인 방향

- **스타일:** Portfolio Grid 패턴 + Motion-Driven (절제된 마이크로 인터랙션 / 스크롤 등장 애니메이션). 과한 패럴럭스는 쓰지 않는다.
- **무드:** 신뢰감 있는 개발자 포트폴리오 + "따뜻한 기록" 스튜디오 색채. 깔끔한 중립 배경에 따뜻한 앰버 액센트.
- **팔레트 (라이트):**
  - primary `#B45309` (앰버700, 따뜻하지만 차분 — 링크/강조/버튼)
  - bg `#FFFBF5` (아주 옅은 웜화이트)
  - surface/card `#FFFFFF`
  - text `#1C1917` (stone900)
  - text-muted `#57534E` (stone600)
  - accent `#2563EB` (link blue — 외부 링크/보조 강조)
  - border `#EFE7DD` (웜 보더)
  - destructive `#DC2626`
- **팔레트 (다크):**
  - primary `#FBBF24` (앰버400 — 다크 위 가독 보정)
  - bg `#1C1917` (stone900)
  - surface/card `#292524` (stone800)
  - text `#FAFAF9` (stone50)
  - text-muted `#A8A29E` (stone400)
  - accent `#60A5FA` (link blue 라이트)
  - border `#3F3A36`
- **폰트:**
  - heading(영문/로고·이름) `Outfit` (600/700) — 지오메트릭, 포트폴리오에 적합
  - heading/body(한글) `Noto Sans KR` (400/500/700)
  - 코드/기술 라벨(선택) `JetBrains Mono` 또는 시스템 모노 — Skills 칩에만 소량
  - 본문 16px / line-height 1.6 / 한글 한 줄 35~50자
- **다크모드:** 예 (토큰 기반, light/dark 동시 설계). 토글은 우상단 또는 네비 끝.
- **모션:** 진입 페이드+업 (Intersection Observer, 200~300ms, ease-out), 카드 hover 시 살짝 상승(translateY -4px)+그림자. `prefers-reduced-motion` 존중.
- **아이콘:** Lucide(SVG)로 통일. 이모지 아이콘 금지.

---

## 섹션 (순서대로)

### Hero
- **레이아웃:** 풀스크린(min-h-dvh) 또는 80vh. 좌측 정렬 텍스트 블록 중심의 단일 컬럼(데스크톱 max-w-3xl 중앙~좌측). 상단에 작은 라벨(스튜디오/소속), 그 아래 이름+정체성 한 줄, 짧은 보조 문장, CTA 버튼 2개. 배경은 웜화이트 + 아주 옅은 그라데이션/그레인(선택). 우상단에 다크모드 토글.
- **CTA:** [프로젝트 보기](#projects) (primary), [GitHub](https://github.com/DevYongE) (secondary, 외부 링크 아이콘).
- **카피:**
  - 라벨: `OnMemoryLabs · 따뜻한 기록을 남깁니다`
  - 이름: `최대용 (DevYongE)`
  - 정체성 한 줄 **[추천 — 확정 필요]**: `모바일과 웹을 혼자 다 만드는 1인 풀스택 개발자`
  - 보조 문장: `앱은 Flutter, 웹은 Next.js, 뒷단은 Supabase로 만듭니다. 기획부터 출시까지 직접 합니다.`

### About
- **레이아웃:** 2컬럼(데스크톱) — 좌측 1~2문단 소개, 우측 간단한 사실 목록(소속, 주요 분야, 현재 상태). 모바일은 1컬럼. 프로필 이미지는 선택(없으면 이니셜 마크).
- **카피 (1~2문단):**
  - `앱과 웹을 혼자 처음부터 끝까지 만듭니다. 모바일 앱은 Flutter로, 웹은 Next.js로 짜고 데이터와 로그인은 Supabase로 붙입니다. 화면 디자인, 백엔드, 스토어 출시까지 혼자 합니다.`
  - `"따뜻한 기록을 남깁니다." OnMemoryLabs라는 이름으로 이런 마음을 담아 서비스를 만듭니다. 하루를 적는 온기록, 읽은 책을 모으는 온서재가 그렇게 나왔습니다. 만들면서 배우고 출시한 뒤에 다듬는 편입니다.`
- **우측 사실 목록:**
  - 소속: `OnMemoryLabs (온메모리랩스)`
  - 분야: `모바일(Flutter) · 웹(Next.js) · 백엔드(Supabase/FastAPI)`
  - 상태: `[채워주세요: 현재 상태 — 예) 새 협업·합류 제안 환영 / 특정 프로젝트 집중 중]`

### Projects
- **레이아웃:** 섹션 제목 + 짧은 한 줄 설명 후, 카드 그리드(데스크톱 2열, 모바일 1열). 카드 4개. 각 카드: 상단 제목, 카테고리/플랫폼 뱃지, 한 줄 설명, 핵심 기능 2~3개(불릿 또는 칩), 기술 스택 칩, 하단 링크(GitHub/스토어). hover 시 상승+그림자. 4번째(로그몬스)는 동일 틀, 내용만 빈칸.
- **섹션 한 줄:** `직접 기획하고 만들어 출시했거나, 출시를 준비 중인 서비스들입니다.`

- **카드 1 — 온기록 (Ongirok)**
  - 한 줄: `하루를 기록하고 공감을 나누는 따뜻한 공간`
  - 기능: `300자 일기 · AI 감정 분석(OpenAI) · 공감 이모티콘 · PDF 내보내기 · 날씨/위치 기록`
  - 기술: `Flutter · Next.js · Supabase · OpenAI`
  - 상태/버전: `v1.3.1 · Play스토어 비공개 테스트 준비`
  - 링크: https://github.com/onmemorylabs/ongirok

- **카드 2 — 온서재 (OnLibrary)**
  - 한 줄: `읽은 책과 문장을 모으는 독서 기록 SNS`
  - 기능: `바코드 도서 등록 · 문장 수집 · 독서 집중 타이머 · 팔로우 · 레벨 배지 · 인앱 구독`
  - 기술: `Flutter(Riverpod) · FastAPI · Next.js · Supabase (모노레포)`
  - 상태/버전: `v1.1.1`
  - 링크: https://github.com/onmemorylabs/onlibrary_app

- **카드 3 — KeyDeck**
  - 한 줄: `갤럭시폰을 PC용 블루투스 매크로 키보드로 바꾸는 앱`
  - 기능: `블루투스 HID 키보드(Kotlin) · 단축키 프리셋 · PC 무설치 연결`
  - 기술: `Flutter · Kotlin(HID Peripheral) · RevenueCat`
  - 상태/버전: `v1.3.4 · 스토어 등록정보 완성`
  - 링크: `[채워주세요: KeyDeck 링크 — GitHub 또는 스토어 URL]`

- **카드 4 — 로그몬스 (LogMons)**
  - 한 줄: `[채워주세요: 로그몬스 한 줄 설명]`
  - 기능: `[채워주세요: 핵심 기능 2~3개]`
  - 기술: `[채워주세요: 사용 기술]`
  - 상태/버전: `[채워주세요: 진행 단계/버전]`
  - 링크: `[채워주세요: 로그몬스 링크]`

### Skills
- **레이아웃:** 카테고리별 칩 그룹(가로 wrap). 각 그룹에 소제목. 칩은 텍스트(+선택적 Lucide 아이콘). 화려한 % 게이지는 쓰지 않는다.
- **카피 (그룹별):**
  - 모바일: `Flutter · Dart · Riverpod · Provider`
  - 웹: `Next.js · TypeScript · React · Tailwind CSS`
  - 백엔드: `Supabase (DB · Auth · Storage) · FastAPI (Python)`
  - 연동·수익화: `OpenAI API · RevenueCat · AdMob`
  - 네이티브·배포: `Kotlin (HID) · Cloud Run`

### Contact
- **레이아웃:** 짧은 한 문장 + 이메일 버튼(primary) + GitHub 버튼. 푸터에 저작권/이름. SNS는 확정된 것만 노출.
- **카피:**
  - 헤드: `같이 만들 거리가 있다면 편하게 연락 주세요.`
  - 이메일: `devxcdy@gmail.com`
  - GitHub: `github.com/DevYongE`
  - 푸터: `© 2026 최대용 (DevYongE) · OnMemoryLabs`

---

## 빈칸 (사용자 입력 필요)

- [채워주세요: 한 줄 정체성 확정 — 추천안 "모바일과 웹을 혼자 다 만드는 1인 풀스택 개발자"를 쓸지, 다른 문구로 바꿀지]
- [채워주세요: About 현재 상태 한 줄 — 예) 협업/합류 제안 환영 또는 특정 프로젝트 집중 중]
- [채워주세요: KeyDeck 링크 — GitHub 저장소 또는 스토어 URL]
- [채워주세요: 로그몬스 한 줄 설명]
- [채워주세요: 로그몬스 핵심 기능 2~3개]
- [채워주세요: 로그몬스 사용 기술]
- [채워주세요: 로그몬스 진행 단계/버전]
- [채워주세요: 로그몬스 링크]
- [채워주세요: 프로필 이미지 사용 여부 및 파일 (없으면 이니셜 마크로 대체)]
- [채워주세요: LinkedIn 등 추가 SNS 링크 (있으면)]
