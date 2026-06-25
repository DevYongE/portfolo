"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import CarouselArrow from "./CarouselArrow";
import { useDragScroll } from "./useDragScroll";
import type { Screenshot } from "@/data/profile";

/**
 * 카드 안 스크린샷 갤러리.
 * - 1장: 단순 이미지(화살표·점 없음).
 * - 여러 장: 가로 scroll-snap 갤러리 + 마우스 드래그/터치 스와이프 + 작은 원형 화살표 + 하단 점 인디케이터.
 * 점은 현재 보이는 장을 강조하고, 클릭 시 해당 이미지로 스크롤.
 */
export default function ScreenshotGallery({
  shots,
  projectName,
}: {
  shots: Screenshot[];
  projectName: string;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const { handlers } = useDragScroll(trackRef);
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // 스크롤 위치 기준으로 점 강조 + 화살표 활성/비활성 갱신.
  // (반올림 인덱스가 아니라 실제 scrollLeft를 봐야 부분 너비 아이템에서도 끝까지 정확.)
  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 12 : el.clientWidth; // gap-3 = 12px
    const idx = Math.round(el.scrollLeft / step);
    setActive(Math.max(0, Math.min(shots.length - 1, idx)));
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, [shots.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || shots.length <= 1) return;
    onScroll(); // 초기 상태 반영
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onScroll, shots.length]);

  const scrollByItem = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 12 : el.clientWidth;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  }, []);

  const scrollToIndex = useCallback((idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 12 : el.clientWidth;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: idx * step, behavior: reduce ? "auto" : "smooth" });
  }, []);

  if (shots.length === 0) return null;

  // 한 장: 갤러리 없이 이미지만
  if (shots.length === 1) {
    const s = shots[0];
    return (
      <div className="overflow-hidden rounded-xl border border-border bg-bg">
        <Image
          src={s.src}
          alt={s.alt}
          width={s.width}
          height={s.height}
          sizes="(max-width: 640px) 90vw, 480px"
          className="h-auto w-full object-cover"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div className="group/gallery relative">
      <div
        ref={trackRef}
        {...handlers}
        className="drag-scroll snap-x flex gap-3 overflow-x-auto pb-1"
        role="group"
        aria-label={`${projectName} 스크린샷 갤러리 (가로로 스와이프)`}
      >
        {shots.map((s, i) => (
          <div
            key={s.src}
            className="snap-item w-[44%] shrink-0 overflow-hidden rounded-xl border border-border bg-bg sm:w-[38%]"
          >
            <Image
              src={s.src}
              alt={s.alt}
              width={s.width}
              height={s.height}
              sizes="(max-width: 640px) 44vw, 200px"
              className="h-auto w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* 작은 원형 화살표 — hover 시 노출(터치 기기는 스와이프) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-1 opacity-0 transition-opacity group-hover/gallery:opacity-100 sm:flex">
        <span className="pointer-events-auto">
          <CarouselArrow
            direction="prev"
            size="sm"
            onClick={() => scrollByItem(-1)}
            disabled={!canPrev}
            label={`${projectName} 이전 스크린샷`}
          />
        </span>
        <span className="pointer-events-auto">
          <CarouselArrow
            direction="next"
            size="sm"
            onClick={() => scrollByItem(1)}
            disabled={!canNext}
            label={`${projectName} 다음 스크린샷`}
          />
        </span>
      </div>

      {/* 점(dots) 인디케이터 — 현재 장 강조, 클릭 시 해당 이미지로 스크롤 */}
      <div
        className="mt-3 flex items-center justify-center gap-1.5"
        aria-label={`${projectName} 스크린샷 ${active + 1}/${shots.length}`}
      >
        {shots.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`${i + 1}번째 스크린샷으로 이동`}
            aria-current={i === active ? "true" : undefined}
            onClick={() => scrollToIndex(i)}
            className={`h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              i === active ? "w-5 bg-primary" : "w-2 bg-border hover:bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
