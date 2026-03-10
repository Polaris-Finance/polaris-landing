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
      className="sticky top-24 border-l-2 border-l-[rgba(232,220,196,0.2)] pl-3"
    >
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-cream-muted">
        In this article
      </p>
      <ul className="space-y-1.5">
        {entries.map((entry) => (
          <li key={entry.id} className={entry.level === 3 ? "ml-4" : ""}>
            <a
              href={`#${entry.id}`}
              className={`text-xs transition ${
                activeId === entry.id
                  ? "text-star"
                  : "text-cream-muted hover:text-star"
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
