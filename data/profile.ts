// 포트폴리오 콘텐츠 데이터.
// 사용자는 이 파일만 고치면 사이트 내용이 바뀝니다.
// [채워주세요]가 남은 항목은 TODO 주석으로 표시했습니다.

export type ProjectStatus = "draft" | "ready" | "released";

export interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

/** 앱 스크린샷 — Next <Image> 최적화를 위해 실제 픽셀 크기를 함께 둔다. */
export interface Screenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  /** 자산 폴더/식별용 slug (public/projects/<slug>) */
  slug: string;
  name: string;
  /** 카테고리/플랫폼 뱃지 */
  badge: string;
  /** 한 줄 설명 */
  tagline: string;
  /** 핵심 기능 2~3개 (칩) */
  features: string[];
  /** 기술 스택 칩 */
  stack: string[];
  /** 상태/버전 라벨 */
  status: string;
  /** 하단 링크 (없으면 빈 배열) */
  links: ProjectLink[];
  /** Android 패키지 ID (없으면 빈 문자열) */
  packageId: string;
  /** Play 스토어 URL — 채워지면 카드에 "Play 스토어" 버튼 자동 노출 */
  playStoreUrl: string;
  /** 앱 스크린샷 (없으면 빈 배열) */
  screenshots: Screenshot[];
  /** 스크린샷이 없는 프로젝트의 상세 기여 내용(불릿). 있으면 카드에 목록으로 표시. */
  details?: string[];
  /** 빈칸(placeholder) 카드 여부 — 내용 미정 */
  placeholder?: boolean;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export const profile = {
  // ── 기본 ───────────────────────────────────────────────
  name: "최대용",
  handle: "DevYongE",
  studio: "OnMemoryLabs",
  studioKo: "온메모리랩스",

  // ── Hero ───────────────────────────────────────────────
  heroLabel: "OnMemoryLabs · 따뜻한 기록을 남깁니다",
  // TODO: [채워주세요] 한 줄 정체성 확정 — 추천안 사용 중. 다른 문구로 바꿀지 결정.
  identity: "모바일과 웹을 혼자 다 만드는 1인 풀스택 개발자",
  heroSub:
    "앱은 Flutter, 웹은 Next.js, 백엔드는 FastAPI·Supabase로 만듭니다. 기획부터 출시까지 직접 합니다.",

  // ── About ──────────────────────────────────────────────
  about: [
    "Flutter로 모바일 앱을, Next.js로 웹을 만들고, 백엔드는 FastAPI와 Supabase로 직접 설계합니다. TourAPI 같은 외부 데이터와 AI 호출을 FastAPI 한 곳으로 모으고, Supabase(DB·인증·스토리지)에 연결하는 구조를 선호합니다.",
    "OpenAI·Claude 같은 LLM 연동, RevenueCat·AdMob 수익화, Kotlin 네이티브(블루투스 HID)까지 필요한 영역은 직접 다룹니다. 기획·UI 디자인·백엔드·Play 스토어 출시와 운영까지 한 사람이 끝까지 책임지는 것이 강점입니다.",
    "온기록·온서재·KeyDeck을 직접 출시했고, 2026 관광데이터 활용 공모전 출품작 ‘다시로컬’을 비롯해 멀티플랫폼 서비스를 이어서 만들고 있습니다. “따뜻한 기록을 남깁니다.” OnMemoryLabs라는 이름으로 그 마음을 담아, 빠르게 만들어 출시한 뒤 사용자 반응을 보며 다듬습니다.",
  ],
  facts: [
    { label: "소속", value: "OnMemoryLabs (온메모리랩스)" },
    {
      label: "분야",
      value: "모바일(Flutter) · 웹(Next.js) · 백엔드(FastAPI · Supabase)",
    },
    {
      label: "상태",
      value: "이직 준비 중 · 합류·협업 제안 환영",
    },
  ],

  // ── Projects ───────────────────────────────────────────
  projectsLead:
    "직접 기획하고 만들어 출시했거나, 출시를 준비 중인 서비스들입니다.",
  projects: [
    {
      slug: "dasi-local",
      name: "다시, 로컬 (Again, Local)",
      badge: "공모전 · 개발 중",
      tagline: "소멸위기지역 × 반려동물 동반여행 AI 큐레이션 SaaS",
      features: [
        "AI 맞춤 코스 추천",
        "관광지 혼잡도 알림",
        "반려동물 동반 필터",
        "로컬 스토리 콘텐츠",
        "연관 관광지 동선 확장",
      ],
      stack: [
        "Next.js",
        "Flutter",
        "FastAPI",
        "Supabase",
        "Anthropic (Claude)",
        "TourAPI",
        "Leaflet",
      ],
      status: "2026 관광데이터 활용 공모전 출품작 · 개발 중",
      details: [
        "한국관광공사 TourAPI(7종)와 AI(Claude)를 결합해 인구감소지역 89곳의 관광 매력을 재발견하는 멀티플랫폼(웹·앱) SaaS를 개발하고 있습니다.",
        "FastAPI를 유일한 백엔드 관문으로 두어 TourAPI·AI 호출을 가공하고 Supabase에 캐싱하는 모노레포(api·web·mobile) 구조를 설계했습니다.",
        "날씨·요일·여행 타입·이동거리를 반영한 AI 맞춤 코스 추천과, 반려동물 동반여행 전용 필터·혼잡도 알림을 구현하고 있습니다.",
      ],
      packageId: "",
      playStoreUrl: "",
      screenshots: [],
      links: [],
    },
    {
      slug: "ongirok",
      name: "온기록 (Ongirok)",
      badge: "모바일 · 앱",
      tagline: "하루를 기록하고 공감을 나누는 따뜻한 공간",
      features: [
        "300자 일기",
        "AI 감정 분석(OpenAI)",
        "공감 이모티콘",
        "PDF 내보내기",
        "날씨/위치 기록",
      ],
      stack: ["Flutter", "Next.js", "Supabase", "OpenAI"],
      status: "v1.3.1 · Play 스토어 출시",
      packageId: "com.onmemory.app",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.onmemory.app",
      screenshots: [
        {
          src: "/projects/ongirok/1_feed.png",
          alt: "온기록 피드 — 다른 사람의 하루에 온기를 나누는 공감 피드, AI 마음 문장",
          width: 1290,
          height: 2796,
        },
        {
          src: "/projects/ongirok/2_write.png",
          alt: "온기록 일기 쓰기 — 짧은 글로 남기는 하루, 날씨·감정 자동 기록",
          width: 1290,
          height: 2796,
        },
        {
          src: "/projects/ongirok/3_mydiary.png",
          alt: "온기록 내 일기 — 날짜별로 모아 보는 내 기록(공개/비공개)",
          width: 1290,
          height: 2796,
        },
        {
          src: "/projects/ongirok/4_calendar.png",
          alt: "온기록 달력 — 한 달의 감정을 색으로 한눈에, 이번 달 마음 요약",
          width: 1290,
          height: 2796,
        },
        {
          src: "/projects/ongirok/5_profile.png",
          alt: "온기록 프로필 — 9가지 감성 테마와 기록 통계, 이번 달 감정",
          width: 1290,
          height: 2796,
        },
        {
          src: "/projects/ongirok/6_membership.png",
          alt: "온기록 멤버십 — AI·무제한 기록·광고 제거 구독",
          width: 1290,
          height: 2796,
        },
      ],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/onmemorylabs/ongirok",
          external: true,
        },
      ],
    },
    {
      slug: "onseojae",
      name: "온서재 (OnLibrary)",
      badge: "모바일 · SNS",
      tagline: "읽은 책과 문장을 모으는 독서 기록 SNS",
      features: [
        "바코드 도서 등록",
        "문장 수집",
        "독서 집중 타이머",
        "팔로우",
        "레벨 배지",
        "인앱 구독",
      ],
      stack: ["Flutter(Riverpod)", "FastAPI", "Next.js", "Supabase (모노레포)"],
      status: "v1.1.1 · Play 스토어 출시",
      packageId: "com.onseojae.app",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.onseojae.app",
      screenshots: [
        {
          src: "/projects/onseojae/1_home.png",
          alt: "온서재 홈 화면 — 독서 통계, 읽는 중인 책 진행률, 읽고 싶은 책",
          width: 1080,
          height: 1920,
        },
        {
          src: "/projects/onseojae/2_library.png",
          alt: "온서재 나의 서재 — 책장 그리드로 정리한 내 책",
          width: 1080,
          height: 1920,
        },
        {
          src: "/projects/onseojae/3_bookmark.png",
          alt: "온서재 책갈피 추가 — 인상 깊은 문장, 페이지, 내 생각, 태그 입력",
          width: 1080,
          height: 1920,
        },
        {
          src: "/projects/onseojae/4_extract.png",
          alt: "온서재 문장 추출 — 카메라·갤러리에서 사진 속 문장을 글자로 추출",
          width: 1080,
          height: 1920,
        },
        {
          src: "/projects/onseojae/5_reading.png",
          alt: "온서재 독서 현황 — 진행률, 완독하기, 독서 타이머",
          width: 1080,
          height: 1920,
        },
        {
          src: "/projects/onseojae/6_record.png",
          alt: "온서재 독서 기록 작성 — 별점, 한 줄 감상, 독서 기록",
          width: 1080,
          height: 1920,
        },
        {
          src: "/projects/onseojae/7_explore.png",
          alt: "온서재 탐색 — 이번 주 인기 도서와 인기 책갈피",
          width: 1080,
          height: 1920,
        },
        {
          src: "/projects/onseojae/8_profile.png",
          alt: "온서재 MY 프로필 — 독서 통계와 서재·책갈피·독서기록 메뉴",
          width: 1080,
          height: 1920,
        },
      ],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/onmemorylabs/onlibrary_app",
          external: true,
        },
      ],
    },
    {
      slug: "keydeck",
      name: "KeyDeck",
      badge: "모바일 · 유틸리티",
      tagline: "갤럭시폰을 PC용 블루투스 매크로 키보드로 바꾸는 앱",
      features: [
        "블루투스 HID 키보드(Kotlin)",
        "단축키 프리셋",
        "PC 무설치 연결",
      ],
      stack: ["Flutter", "Kotlin(HID Peripheral)", "RevenueCat"],
      status: "v1.3.4 · Play 스토어 출시",
      packageId: "com.btmacro.bt_macro_keyboard",
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.btmacro.bt_macro_keyboard",
      screenshots: [
        {
          src: "/projects/keydeck/01.png",
          alt: "KeyDeck 매크로 키패드 화면 — 단축키 버튼 그리드",
          width: 1080,
          height: 1920,
        },
        {
          src: "/projects/keydeck/02.png",
          alt: "KeyDeck 매크로 편집 화면",
          width: 1080,
          height: 1920,
        },
        {
          src: "/projects/keydeck/03.png",
          alt: "KeyDeck 단축키 프리셋 화면",
          width: 1080,
          height: 1920,
        },
      ],
      // TODO: [채워주세요] KeyDeck 링크 — GitHub 또는 스토어 URL. 확정 전까지 링크 미노출.
      links: [],
    },
    {
      slug: "logmons",
      name: "로그몬스 (LogMons)",
      badge: "백엔드 · 데이터",
      tagline: "대용량 로그 수집·분석을 위한 End-to-End 데이터 파이프라인",
      features: [
        "로그 수집·전송 (Vector)",
        "Kafka 스트리밍",
        "OpenSearch 검색·분석",
        "관리자 웹 (Next.js·Express)",
      ],
      stack: [
        "Vector",
        "Apache Kafka",
        "OpenSearch",
        "Next.js",
        "Express.js",
        "Claude Code (Skills·MCP·Agent)",
      ],
      status: "팀 참여 · 개발~운영 전 과정",
      details: [
        "대용량 로그 수집·분석 플랫폼 개발에 참여하여 로그 수집·전송·저장·조회를 포함한 End-to-End 데이터 파이프라인을 구축했습니다.",
        "Vector로 Syslog 등 다양한 형태의 로그를 수집·가공하고, 안정적인 로그 전달 체계를 설계·구현했습니다.",
        "Apache Kafka 기반 메시지 큐로 로그 스트리밍 환경을 구축해 대용량 로그를 안정적으로 처리하는 구조를 개발했습니다.",
        "OpenSearch로 수집 로그를 저장하고, 빠른 검색·분석이 가능하도록 인덱스 설계와 데이터 적재를 구현했습니다.",
        "Next.js·Express.js 기반 관리자 웹을 기획·개발해 로그 조회·검색·운영 관리 기능과 사용성을 개선했습니다.",
        "Claude Code 기반 AI 개발 환경(Claude Skills·MCP·Agent)을 도입해 생산성을 높이고 반복 작업을 자동화했습니다.",
        "데이터 흐름과 성능을 분석해 안정성·확장성을 고려한 구조 개선과 최적화를 수행했습니다.",
        "개발·테스트·운영 환경 개선까지 전 과정에 참여하며 서비스 품질과 유지보수 효율을 높였습니다.",
      ],
      packageId: "",
      playStoreUrl: "",
      screenshots: [],
      links: [],
    },
  ] satisfies Project[],

  // ── Skills ─────────────────────────────────────────────
  skillGroups: [
    { title: "모바일", items: ["Flutter", "Dart", "Riverpod", "Provider"] },
    { title: "웹", items: ["Next.js", "TypeScript", "React", "Tailwind CSS"] },
    {
      title: "백엔드",
      items: ["Supabase (DB · Auth · Storage)", "FastAPI (Python)"],
    },
    { title: "연동·수익화", items: ["OpenAI API", "RevenueCat", "AdMob"] },
    { title: "네이티브·배포", items: ["Kotlin (HID)", "Cloud Run"] },
  ] satisfies SkillGroup[],

  // ── Contact ────────────────────────────────────────────
  contactHead: "같이 만들 거리가 있다면 편하게 연락 주세요.",
  email: "devxcdy@gmail.com",
  github: "https://github.com/DevYongE",
  githubLabel: "github.com/DevYongE",
  // TODO: [채워주세요] LinkedIn 등 추가 SNS 링크 (있으면). 확정된 것만 노출.
  socials: [] as ProjectLink[],
  footer: "© 2026 최대용 (DevYongE) · OnMemoryLabs",
};

export type Profile = typeof profile;
