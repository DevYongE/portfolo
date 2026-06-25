"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import CarouselArrow from "./CarouselArrow";
import { useDragScroll } from "./useDragScroll";

/**
 * 프로젝트 가로 스와이프 카루셀.
 * - 모바일: 네이티브 터치 스와이프(scroll-snap). 화살표 숨김.
 * - 데스크톱: 양쪽 가장자리에 세로 중앙 원형 화살표 + 마우스 드래그-투-스크롤 + 키보드(←/→).
 * - 스크롤바 숨김(.snap-x), 포커스 가능, prefers-reduced-motion이면 smooth 끔.
 * 외부 캐러셀 라이브러리 없음 — CSS scroll-snap + scrollBy + pointer 드래그.
 */
export default function ProjectsCarousel({
  children,
  ariaLabel,
}: {
  children: ReactNode;
  ariaLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const { handlers } = useDragScroll(trackRef);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    // 첫 카드 폭(+gap) 기준으로 한 칸 이동. 카드가 없으면 뷰포트 80%.
    const first = el.firstElementChild as HTMLElement | null;
    const gap = 24; // gap-6
    const step = first ? first.offsetWidth + gap : el.clientWidth * 0.8;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollByCard(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollByCard(-1);
      }
    },
    [scrollByCard],
  );

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={onKeyDown}
        {...handlers}
        className="drag-scroll snap-x flex gap-6 overflow-x-auto px-1 pb-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        {children}
      </div>

      {/* 양쪽 가장자리 세로 중앙 원형 화살표 (데스크톱 전용 — 모바일은 터치 스와이프) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between sm:flex">
        <div className="pointer-events-auto -ml-3 md:-ml-5">
          <CarouselArrow
            direction="prev"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            label="이전 프로젝트"
          />
        </div>
        <div className="pointer-events-auto -mr-3 md:-mr-5">
          <CarouselArrow
            direction="next"
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            label="다음 프로젝트"
          />
        </div>
      </div>
    </div>
  );
}
