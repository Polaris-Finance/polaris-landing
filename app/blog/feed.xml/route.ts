import { getAllPosts, getLatestPostLastModified } from "@/lib/blog";
import { blogIndexUrl, blogPostUrl, rssFeedUrl } from "@/lib/seo";

export const dynamic = "force-static";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getAllPosts();
  const lastBuildDate = getLatestPostLastModified(posts) || new Date().toISOString();

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${blogPostUrl(post.slug)}</link>
      <guid isPermaLink="true">${blogPostUrl(post.slug)}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>hello@polarisfinance.io (${escapeXml(post.author)})</author>
    </item>`
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Polaris Protocol Blog</title>
    <link>${blogIndexUrl()}</link>
    <description>Updates, insights, and deep dives into the Self-Scaling Stablecoin Operating System.</description>
    <language>en</language>
    <lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>
    <atom:link href="${rssFeedUrl()}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
