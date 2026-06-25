import { Mail } from "lucide-react";
import GithubIcon from "./GithubIcon";
import Reveal from "./Reveal";
import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-5xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24"
    >
      <Reveal>
        <div className="rounded-3xl border border-border bg-surface px-6 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="font-display text-2xl font-bold tracking-tight text-text sm:text-3xl">
            Contact
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-muted">
            {profile.contactHead}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-5 py-3 text-sm font-semibold text-text transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <GithubIcon className="h-4 w-4" aria-hidden="true" />
              {profile.githubLabel}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
