import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

// Next.js 내장 OG 이미지 생성(next/og — 추가 의존성 없음).
// 이 라우트가 있으면 openGraph.images / twitter.images가 자동 등록되어
// summary_large_image 카드의 미리보기 깨짐이 해소된다.

export const alt = `${profile.name} (${profile.handle}) · 포트폴리오`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#FFFBF5",
          color: "#1C1917",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#B45309", fontWeight: 600 }}>
          {profile.studio} · 따뜻한 기록을 남깁니다
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {profile.name} ({profile.handle})
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 36, color: "#57534E" }}>
          {profile.identity}
        </div>
      </div>
    ),
    { ...size },
  );
}
