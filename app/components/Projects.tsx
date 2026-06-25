import { ExternalLink, Smartphone } from "lucide-react";
import GithubIcon from "./GithubIcon";
import Section from "./Section";
import ProjectsCarousel from "./ProjectsCarousel";
import ScreenshotGallery from "./ScreenshotGallery";
import { profile, type Project } from "@/data/profile";

function LinkIcon({ label }: { label: string }) {
  if (label.toLowerCase().includes("github")) {
    return <GithubIcon className="h-4 w-4" aria-hidden="true" />;
  }
  return <ExternalLink className="h-4 w-4" aria-hidden="true" />;
}

function ProjectCard({ project }: { project: Project }) {
  // playStoreUrl이 truthy일 때만 Play 스토어 버튼 노출 (미출시면 숨김)
  const showPlayStore = Boolean(project.playStoreUrl);

  return (
    <article
      className={`group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7 ${
        project.placeholder ? "opacity-90" : ""
      }`}
    >
      {project.screenshots.length > 0 ? (
        <div className="mb-5">
          <ScreenshotGallery
            shots={project.screenshots}
            projectName={project.name}
          />
        </div>
      ) : null}

      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-text">
          {project.name}
        </h3>
        <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
          {project.badge}
        </span>
      </div>

      <p className="mt-3 text-sm text-muted">{project.tagline}</p>

      <ul className="mt-4 flex flex-wrap gap-2" aria-label="핵심 기능">
        {project.features.map((f) => (
          <li
            key={f}
            className="rounded-md border border-border bg-bg px-2.5 py-1 text-xs text-text/80"
          >
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2" aria-label="기술 스택">
        {project.stack.map((s) => (
          <span key={s} className="font-mono text-xs text-muted">
            #{s}
          </span>
        ))}
      </div>

      {project.details && project.details.length > 0 ? (
        <ul className="mt-5 space-y-2" aria-label="주요 기여">
          {project.details.map((d) => (
            <li
              key={d}
              className="flex gap-2 text-xs leading-relaxed text-muted"
            >
              <span
                aria-hidden="true"
                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60"
              />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto pt-6">
        <p className="text-xs text-muted">{project.status}</p>
        {project.links.length > 0 || showPlayStore ? (
          <div className="mt-3 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer noopener" : undefined}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <LinkIcon label={link.label} />
                {link.label}
              </a>
            ))}
            {showPlayStore ? (
              <a
                href={project.playStoreUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Smartphone className="h-4 w-4" aria-hidden="true" />
                Play 스토어
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <Section id="projects" title="프로젝트" lead={profile.projectsLead}>
      <ProjectsCarousel ariaLabel="프로젝트 카루셀 — 좌우로 스와이프하거나 화살표 키로 탐색">
        {profile.projects.map((project) => (
          <div
            key={project.slug}
            className="snap-item w-[88%] shrink-0 sm:w-[72%] md:w-[calc(50%-12px)] lg:w-[calc(50%-12px)]"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </ProjectsCarousel>
    </Section>
  );
}
