import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionProps {
  id: string;
  title: string;
  lead?: string;
  children: ReactNode;
}

/** 섹션 공통 래퍼 — 제목 + 선택적 한 줄 설명 + 본문 */
export default function Section({ id, title, lead, children }: SectionProps) {
  return (
    <section
      id={id}
      className="mx-auto max-w-5xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24"
    >
      <Reveal>
        <h2 className="font-display text-2xl font-bold tracking-tight text-text sm:text-3xl">
          {title}
        </h2>
        {lead ? (
          <p className="mt-3 max-w-2xl text-base text-muted">{lead}</p>
        ) : null}
      </Reveal>
      <div className="mt-10">{children}</div>
    </section>
  );
}
