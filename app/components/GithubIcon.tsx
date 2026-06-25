import type { SVGProps } from "react";

/**
 * GitHub 마크 (인라인 SVG).
 * 최신 lucide-react에서 brand 아이콘(Github)이 제거되어, 동일한 stroke 스타일로 직접 정의.
 * 스펙의 "아이콘은 Lucide(SVG)로 통일 / 이모지 금지" 원칙 유지 (이모지 아님, SVG임).
 */
export default function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C4 2 3 2 3 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 2 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
