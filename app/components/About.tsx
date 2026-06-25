import Section from "./Section";
import Reveal from "./Reveal";
import { profile } from "@/data/profile";

export default function About() {
  // 이름 이니셜 마크 (프로필 이미지 미사용 시 대체)
  // TODO: [채워주세요] 프로필 이미지 사용 여부 — 사용 시 이 마크를 <Image>로 교체.
  const initials = profile.handle.slice(0, 2).toUpperCase();

  return (
    <Section id="about" title="소개">
      <div className="grid gap-10 md:grid-cols-[1.6fr_1fr] md:gap-12">
        <Reveal className="space-y-4">
          <div className="flex items-center gap-4 md:hidden">
            <span
              aria-hidden="true"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 font-display text-lg font-bold text-primary"
            >
              {initials}
            </span>
          </div>
          {profile.about.map((para, i) => (
            <p key={i} className="text-base leading-relaxed text-text/90">
              {para}
            </p>
          ))}
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <span
              aria-hidden="true"
              className="mb-5 hidden h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 font-display text-lg font-bold text-primary md:flex"
            >
              {initials}
            </span>
            <dl className="space-y-4">
              {profile.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm text-text">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
