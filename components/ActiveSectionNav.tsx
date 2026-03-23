"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { id: "main-content", label: "Home" },
  { id: "stats", label: "Stats" },
  { id: "how-it-works", label: "How It Works" },
  { id: "tokens", label: "Tokens" },
  { id: "stablecoin-os", label: "OS" },
  { id: "benefits", label: "Principles" },
  { id: "roadmap", label: "Roadmap" },
  { id: "featured-shows", label: "Media" },
  { id: "faq", label: "FAQ" },
];

export function ActiveSectionNav() {
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Only show on homepage
  if (pathname !== "/") {
    return null;
  }

  return (
    <nav
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex"
      aria-label="Section navigation"
    >
      {sections.map((section) => (
        <Link
          key={section.id}
          href={`#${section.id}`}
          className={`group relative flex h-2.5 w-2.5 items-center justify-center rounded-full transition-all duration-200 ${
            activeSection === section.id
              ? "bg-[var(--polaris-star)] scale-125"
              : "bg-[rgba(var(--polaris-star-rgb),0.3)] hover:bg-[rgba(var(--polaris-star-rgb),0.5)]"
          }`}
          aria-current={activeSection === section.id ? "true" : undefined}
          aria-label={section.label}
        >
          {/* Tooltip */}
          <span className="absolute left-5 whitespace-nowrap rounded-md bg-[rgba(var(--polaris-navy-rgb),0.95)] px-2.5 py-1 text-xs text-[var(--polaris-cream)] opacity-0 transition-opacity group-hover:opacity-100 border border-[rgba(var(--polaris-star-rgb),0.1)]">
            {section.label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
