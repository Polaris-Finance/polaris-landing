import { getAllPosts, getLatestPostLastModified } from "@/lib/blog";
import { blogIndexUrl, blogPostUrl, absoluteUrl, homeUrl } from "@/lib/seo";
import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPostLastModified = getLatestPostLastModified(posts);

  const blogPosts = posts.map((post) => ({
    url: blogPostUrl(post.slug),
    lastModified: new Date(post.lastModified),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: post.imageSources.map((source) => absoluteUrl(source)),
  }));

  return [
    {
      url: homeUrl(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: blogIndexUrl(),
      lastModified: latestPostLastModified ? new Date(latestPostLastModified) : undefined,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPosts,
  ];
}
