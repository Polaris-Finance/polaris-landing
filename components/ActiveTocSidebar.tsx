"use client";

import { useEffect, useState } from "react";

type TocEntry = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function ActiveTocSidebar({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = entries
      .map((e) => document.getElementById(e.id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (observerEntries) => {
        for (const entry of observerEntries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-96px 0px -70% 0px" }
    );

    for (const heading of headings) {
      observer.observe(heading);
    }

    return () => observer.disconnect();
  }, [entries]);

  if (entries.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-20"
    >
      <p className="mb-3 pl-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-cream-muted">
        In this article
      </p>
      <ul className="space-y-0.5">
        {entries.map((entry) => (
          <li key={entry.id} className={entry.level === 3 ? "ml-3" : ""}>
            <a
              href={`#${entry.id}`}
              className={`block border-l-2 py-1 pl-3 text-xs leading-snug transition-colors duration-200 ease-out ${
                activeId === entry.id
                  ? "border-[var(--polaris-star)] text-[var(--polaris-star)] font-medium"
                  : "border-[rgba(232,220,196,0.1)] text-[var(--polaris-cream-muted)] hover:border-[rgba(232,220,196,0.28)] hover:text-[var(--polaris-cream)]"
              }`}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
