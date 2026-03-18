"use client";

import { useState, useMemo } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { basePath } from "@/lib/basePath";
import { blogPostPath } from "@/lib/seo";
import type { BlogPostMeta } from "@/lib/blog";

type BlogSearchProps = {
  posts: BlogPostMeta[];
};

export function BlogSearch({ posts }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    const query = searchQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <>
      {/* Search Input */}
      <div className="mt-8 relative max-w-md">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--polaris-cream-muted)]" />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-full border border-[rgba(var(--polaris-star-rgb),0.15)] bg-[rgba(var(--polaris-navy-rgb),0.5)] py-3 pl-12 pr-10 text-[var(--polaris-cream)] placeholder:text-[var(--polaris-cream-muted)] focus:border-[rgba(var(--polaris-star-rgb),0.3)] focus:outline-none transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--polaris-cream-muted)] hover:text-[var(--polaris-cream)] transition-colors"
            aria-label="Clear search"
          >
            <XIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Count */}
      {searchQuery && (
        <p className="mt-4 text-sm text-[var(--polaris-cream-muted)]">
          {filteredPosts.length} {filteredPosts.length === 1 ? "result" : "results"} for &ldquo;{searchQuery}&rdquo;
        </p>
      )}

      {/* Featured Post */}
      {featuredPost && (
        <Link
          href={blogPostPath(featuredPost.slug)}
          className="group mt-8 block overflow-hidden rounded-2xl border border-[rgba(232,220,196,0.1)] bg-[rgba(var(--polaris-navy-rgb),0.5)] transition-colors duration-200 hover:border-[rgba(232,220,196,0.25)] hover:bg-[rgba(var(--polaris-navy-rgb),0.7)]"
        >
          {featuredPost.image && (
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={`${basePath}${featuredPost.image}`}
                alt={featuredPost.title}
                fill
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                priority
              />
            </div>
          )}
          <div className="flex flex-col gap-2 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-cream-muted">
              <time dateTime={featuredPost.date}>
                {new Date(featuredPost.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span aria-hidden="true">·</span>
              <span>{featuredPost.readingTime} min read</span>
            </div>
            <h2 className="font-serif text-2xl text-star transition-colors group-hover:text-[var(--polaris-cream)] sm:text-3xl">
              {featuredPost.title}
            </h2>
            <p className="text-[0.95rem] leading-relaxed text-cream-muted sm:text-base">
              {featuredPost.description}
            </p>
          </div>
        </Link>
      )}

      {/* Remaining Posts Grid */}
      {remainingPosts.length > 0 && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {remainingPosts.map((post) => (
            <Link
              key={post.slug}
              href={blogPostPath(post.slug)}
              className="group block overflow-hidden rounded-2xl border border-[rgba(232,220,196,0.1)] bg-[rgba(var(--polaris-navy-rgb),0.5)] transition-colors duration-200 hover:border-[rgba(232,220,196,0.25)] hover:bg-[rgba(var(--polaris-navy-rgb),0.7)]"
            >
              {post.image && (
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={`${basePath}${post.image}`}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 448px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <div className="flex flex-col gap-2 p-5">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-cream-muted">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime} min read</span>
                </div>
                <h2 className="font-serif text-xl text-star transition-colors group-hover:text-[var(--polaris-cream)]">
                  {post.title}
                </h2>
                <p className="text-[0.92rem] leading-6 text-cream-muted">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <div className="mt-12 rounded-2xl border border-dashed border-[rgba(232,220,196,0.15)] bg-[rgba(var(--polaris-navy-rgb),0.3)] p-12 text-center">
          <p className="text-cream-muted">
            No articles found matching &ldquo;{searchQuery}&rdquo;
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-4 text-[var(--polaris-star)] hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
    </>
  );
}
