import { ArrowRight } from "lucide-react";
import GithubIcon from "./GithubIcon";
import Reveal from "./Reveal";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[80vh] items-center overflow-hidden"
    >
      {/* 아주 옅은 앰버 그라데이션 배경 (절제된 분위기) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_20%_0%,rgba(180,83,9,0.07),transparent_70%)]"
      />
      <div className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-3xl">
          <Reveal>
            <p className="mb-5 inline-flex items-center rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium text-muted">
              {profile.heroLabel}
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-text sm:text-5xl md:text-6xl">
              {profile.name}{" "}
              <span className="text-muted">({profile.handle})</span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-4 text-xl font-medium text-primary sm:text-2xl">
              {profile.identity}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
              {profile.heroSub}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                프로젝트 보기
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-text transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <GithubIcon className="h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
