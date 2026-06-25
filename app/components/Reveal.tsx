"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** 등장 지연(ms) — 스태거 효과용 */
  delay?: number;
  className?: string;
  as?: ElementType;
}

/**
 * 진입 시 페이드+업 애니메이션 래퍼.
 * Intersection Observer로 뷰포트 진입을 감지해 .is-visible를 붙인다.
 * prefers-reduced-motion은 globals.css에서 무력화 처리됨.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as,
}: RevealProps) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
