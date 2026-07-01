"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import CarouselArrow from "./CarouselArrow";
import { useDragScroll } from "./useDragScroll";
import type { Screenshot } from "@/data/profile";

/**
 * 카드 안 스크린샷 갤러리.
 * - 1장: 단순 이미지(화살표·점 없음).
 * - 여러 장: 가로 scroll-snap 갤러리 + 마우스 드래그/터치 스와이프 + 작은 원형 화살표 + 하단 점 인디케이터.
 * 점은 현재 보이는 장을 강조하고, 클릭 시 해당 이미지로 스크롤.
 * - 썸네일 클릭: 원본을 네이티브 <dialog> 라이트박스로 크게 열기(ESC·바깥 클릭 닫기).
 *   드래그(6px 초과) 직후의 click은 useDragScroll이 1회 막으므로 스와이프와 안 엉킨다.
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

  // 라이트박스(원본 크게 보기) — 열린 이미지 인덱스, null이면 닫힘.
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [zoom, setZoom] = useState<number | null>(null);
  const openZoom = useCallback((i: number) => {
    setZoom(i);
    dialogRef.current?.showModal();
  }, []);
  const closeZoom = useCallback(() => {
    dialogRef.current?.close();
  }, []);

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

  // 원본 크게 보기 라이트박스 — 네이티브 <dialog>(ESC 닫기 기본), 바깥(백드롭) 클릭 시 닫기.
  const lightbox = (
    <dialog
      ref={dialogRef}
      onClose={() => setZoom(null)}
      onClick={(e) => {
        if (e.target === dialogRef.current) closeZoom(); // 백드롭 클릭만 닫기
      }}
      className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/80"
      aria-label={`${projectName} 스크린샷 크게 보기`}
    >
      {zoom !== null ? (
        <div className="relative">
          <button
            type="button"
            onClick={closeZoom}
            aria-label="닫기"
            className="absolute -top-3 -right-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-surface text-text shadow-lg ring-1 ring-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <Image
            src={shots[zoom].src}
            alt={shots[zoom].alt}
            width={shots[zoom].width}
            height={shots[zoom].height}
            sizes="92vw"
            className="h-auto max-h-[90vh] w-auto max-w-[92vw] rounded-xl object-contain"
            priority
            draggable={false}
          />
        </div>
      ) : null}
    </dialog>
  );

  // 한 장: 갤러리 없이 이미지만 (클릭 시 크게 보기)
  if (shots.length === 1) {
    const s = shots[0];
    return (
      <>
        <button
          type="button"
          onClick={() => openZoom(0)}
          aria-label={`${s.alt} — 크게 보기`}
          className="block w-full cursor-zoom-in overflow-hidden rounded-xl border border-border bg-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Image
            src={s.src}
            alt={s.alt}
            width={s.width}
            height={s.height}
            sizes="(max-width: 640px) 90vw, 480px"
            className="pointer-events-none h-auto w-full object-cover"
            draggable={false}
          />
        </button>
        {lightbox}
      </>
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
          <button
            key={s.src}
            type="button"
            onClick={() => openZoom(i)}
            aria-label={`${s.alt} — 크게 보기`}
            className="snap-item w-[44%] shrink-0 cursor-zoom-in overflow-hidden rounded-xl border border-border bg-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-[38%]"
          >
            <Image
              src={s.src}
              alt={s.alt}
              width={s.width}
              height={s.height}
              sizes="(max-width: 640px) 44vw, 200px"
              className="pointer-events-none h-auto w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              draggable={false}
            />
          </button>
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

      {lightbox}
    </div>
  );
}
