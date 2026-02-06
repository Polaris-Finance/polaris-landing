"use client";

import { RssIcon } from "@/components/icons";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function RssFeedLink() {
  const handleClick = () => {
    window.gtag?.("event", "rss_subscribe", {
      event_category: "engagement",
      event_label: "footer_rss_link",
    });
  };

  return (
    <a
      href="/blog/feed.xml"
      className="footer__link footer__link--icon"
      aria-label="RSS feed"
      onClick={handleClick}
    >
      <RssIcon className="h-4 w-4" />
    </a>
  );
}
