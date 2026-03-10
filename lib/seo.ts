import { SITE_URL } from "@/lib/constants";

function withLeadingSlash(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

function hasFileExtension(path: string) {
  const pathname = path.split(/[?#]/, 1)[0];
  return /\.[a-z0-9]+$/i.test(pathname);
}

export function canonicalPath(path = "/") {
  const normalized = withLeadingSlash(path);
  if (normalized === "/" || hasFileExtension(normalized)) {
    return normalized;
  }

  return normalized.endsWith("/") ? normalized : `${normalized}/`;
}

export function absoluteCanonicalUrl(path = "/") {
  return new URL(canonicalPath(path), SITE_URL).toString();
}

export function absoluteUrl(path = "/") {
  return new URL(withLeadingSlash(path), SITE_URL).toString();
}

export function homeUrl() {
  return absoluteCanonicalUrl("/");
}

export function blogIndexPath() {
  return canonicalPath("/blog");
}

export function blogIndexUrl() {
  return absoluteCanonicalUrl("/blog");
}

export function blogPostPath(slug: string) {
  return canonicalPath(`/blog/${slug}`);
}

export function blogPostUrl(slug: string) {
  return absoluteCanonicalUrl(`/blog/${slug}`);
}

export function rssFeedUrl() {
  return absoluteUrl("/blog/feed.xml");
}

export function sitemapUrl() {
  return absoluteUrl("/sitemap.xml");
}
