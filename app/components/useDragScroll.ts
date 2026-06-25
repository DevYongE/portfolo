"use client";

import { useCallback, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

const DRAG_THRESHOLD = 6; // px — 이 이상 끌어야 드래그로 간주(우발적 클릭/드래그 방지)

/**
 * 마우스 드래그-투-스크롤 훅 (포인터 이벤트).
 * - 데스크톱: 잡고 끌면 가로 스크롤. 끄는 동안 cursor: grabbing.
 * - 임계값(6px) 넘게 끈 경우, 직후 발생하는 click을 1회 무시(카드 안 링크 오발동 방지).
 * - 터치는 네이티브 스크롤에 맡기므로 pointerType !== "mouse"면 관여하지 않는다.
 *
 * 반환값을 스크롤 컨테이너에 펼쳐 붙인다: {...drag.handlers}
 */
export function useDragScroll<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  const state = useRef({
    down: false,
    moved: false,
    startX: 0,
    startScroll: 0,
  });

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<T>) => {
      if (e.pointerType !== "mouse") return; // 터치/펜은 네이티브 스크롤
      const el = ref.current;
      if (!el) return;
      state.current.down = true;
      state.current.moved = false;
      state.current.startX = e.clientX;
      state.current.startScroll = el.scrollLeft;
    },
    [ref],
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<T>) => {
      const s = state.current;
      if (!s.down) return;
      const el = ref.current;
      if (!el) return;
      const dx = e.clientX - s.startX;
      if (!s.moved && Math.abs(dx) > DRAG_THRESHOLD) {
        s.moved = true;
        el.classList.add("is-dragging"); // grabbing 커서 + user-select 차단
        // 드래그 시작 시점에 포인터 캡처 → 컨테이너 밖으로 나가도 추적
        try {
          el.setPointerCapture(e.pointerId);
        } catch {
          /* 캡처 미지원 무시 */
        }
      }
      if (s.moved) {
        el.scrollLeft = s.startScroll - dx;
      }
    },
    [ref],
  );

  const end = useCallback(
    (e: ReactPointerEvent<T>) => {
      const s = state.current;
      const el = ref.current;
      if (el) el.classList.remove("is-dragging");
      if (s.moved && el) {
        // 드래그 직후의 click(버블)을 1회 차단해 링크 오발동 방지
        const suppress = (ev: Event) => {
          ev.stopPropagation();
          ev.preventDefault();
          el.removeEventListener("click", suppress, true);
        };
        el.addEventListener("click", suppress, true);
        // 안전장치: click이 안 오면 다음 틱에 해제
        setTimeout(() => el.removeEventListener("click", suppress, true), 0);
      }
      if (el) {
        try {
          el.releasePointerCapture(e.pointerId);
        } catch {
          /* 무시 */
        }
      }
      s.down = false;
      s.moved = false;
    },
    [ref],
  );

  const handlers = {
    onPointerDown,
    onPointerMove,
    onPointerUp: end,
    onPointerLeave: end,
    onPointerCancel: end,
  };

  return { handlers };
}
