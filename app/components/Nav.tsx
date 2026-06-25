import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { profile } from "@/data/profile";

const links = [
  { href: "#about", label: "소개" },
  { href: "#projects", label: "프로젝트" },
  { href: "#skills", label: "기술" },
  { href: "#contact", label: "연락" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg/80 backdrop-blur">
      <nav
        aria-label="주요"
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-text transition-colors hover:text-primary"
        >
          {profile.handle}
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="mr-1 hidden items-center gap-1 sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
