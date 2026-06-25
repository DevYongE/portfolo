import Section from "./Section";
import Reveal from "./Reveal";
import { profile } from "@/data/profile";

export default function Skills() {
  return (
    <Section id="skills" title="기술">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {profile.skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={(i % 3) * 60}>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-muted">
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
