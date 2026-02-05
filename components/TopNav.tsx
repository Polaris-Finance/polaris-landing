"use client";

import { ArticleIcon, TelegramIcon, XIcon } from "@/components/icons";
import { basePath } from "@/lib/basePath";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function TopNav() {
  const pathname = usePathname();
  const isBlogActive = pathname?.startsWith("/blog");

  return (
    <nav className="top-nav">
      <Link href="/" className="top-nav__brand">
        <Image
          src={`${basePath}/full-logo.svg`}
          alt="Polaris"
          width={126}
          height={44}
          className="top-nav__logo top-nav__logo--full"
        />
        <Image
          src={`${basePath}/emblem.svg`}
          alt="Polaris"
          width={28}
          height={28}
          className="top-nav__logo top-nav__logo--emblem"
        />
      </Link>
      <div className="top-nav__links">
        <Link
          href="/blog"
          className="top-nav__link"
          aria-current={isBlogActive ? "page" : undefined}
        >
          <span className="top-nav__link-text">Blog</span>
          <ArticleIcon className="top-nav__link-icon h-4 w-4" aria-hidden />
        </Link>
        <a href="https://x.com/polarisfinance_" className="top-nav__link" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X (opens in new window)">
          <span className="top-nav__link-text">X.com</span>
          <XIcon className="top-nav__link-icon h-4 w-4" aria-hidden />
        </a>
        <a href="https://t.me/polaris_ann" className="top-nav__link" target="_blank" rel="noopener noreferrer" aria-label="Join our Telegram channel (opens in new window)">
          <span className="top-nav__link-text">Telegram</span>
          <TelegramIcon className="top-nav__link-icon h-4 w-4" aria-hidden />
        </a>
      </div>
      <span className="top-nav__cta">
        <span className="top-nav__cta-full">Whitepaper coming soon</span>
        <span className="top-nav__cta-short">WP coming soon</span>
      </span>
    </nav>
  );
}
