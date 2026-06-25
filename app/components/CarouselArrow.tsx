"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * 원형 캐러셀 네비 버튼 (e커머스 클래식 스타일).
 * - 원형 + surface 배경 + 옅은 보더 + 부드러운 그림자.
 * - hover: 그림자 강조 + 살짝 확대(scale). focus-visible 아웃라인 유지.
 * - disabled: 흐리게 + 비활성.
 * - size="sm"는 카드 안 갤러리용 축소판.
 * surface/border/text 토큰을 써서 라이트·다크 모두 대비 확보.
 */
export default function CarouselArrow({
  direction,
  onClick,
  disabled,
  label,
  size = "md",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  label: string;
  size?: "sm" | "md";
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const box =
    size === "sm" ? "h-8 w-8" : "h-11 w-11";
  const icon = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`inline-flex ${box} items-center justify-center rounded-full border border-border bg-surface text-text shadow-md ring-1 ring-black/5 transition-all duration-200 hover:scale-105 hover:text-primary hover:shadow-lg active:scale-95 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
    >
      <Icon className={icon} aria-hidden="true" />
    </button>
  );
}
