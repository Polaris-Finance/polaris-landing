import { basePath } from "@/lib/basePath";
import { getAllPosts } from "@/lib/blog";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Blog | Polaris",
  description: "Updates, insights, and deep dives into the Self-Scaling Stablecoin Operating System.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--polaris-navy-darkest)]">
      <header className="px-6 py-8 sm:px-10">
        <div className="mx-auto max-w-4xl">
          <Link href="/" className="inline-flex items-center gap-3 transition hover:opacity-80">
            <Image
              src={`${basePath}/brand-mark.svg`}
              alt="Polaris mark"
              width={40}
              height={40}
              className="rounded-xl bg-[rgba(232,220,196,0.06)] p-2 border border-[rgba(232,220,196,0.1)]"
            />
            <span className="font-serif text-lg tracking-wider text-star">Polaris</span>
          </Link>
        </div>
      </header>

      <section className="px-6 pb-20 pt-8 sm:px-10">
        <div className="mx-auto max-w-4xl">
          <span className="section-kicker">Blog</span>
          <h1 className="section-heading">Latest Updates</h1>
          <p className="mt-4 max-w-2xl text-lg text-cream-muted">
            Insights, updates, and deep dives into the Polaris ecosystem.
          </p>

          <div className="mt-12 grid gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-[rgba(232,220,196,0.1)] bg-[rgba(13,31,60,0.5)] p-6 backdrop-blur-sm transition hover:border-[rgba(232,220,196,0.25)] hover:bg-[rgba(13,31,60,0.7)]"
              >
                <div className="flex flex-col gap-2">
                  <time className="text-xs font-medium uppercase tracking-wider text-cream-muted">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="font-serif text-xl text-star transition group-hover:text-[var(--polaris-cream)]">
                    {post.title}
                  </h2>
                  <p className="text-[0.92rem] leading-6 text-cream-muted">{post.description}</p>
                  <span className="mt-2 inline-flex items-center text-sm font-medium text-star">
                    Read more
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="mt-12 rounded-2xl border border-dashed border-[rgba(232,220,196,0.15)] bg-[rgba(13,31,60,0.3)] p-12 text-center">
              <p className="text-cream-muted">No posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="footer__content">
          <div className="footer__brand">
            <Image
              src={`${basePath}/brand-mark.svg`}
              alt="Polaris mark"
              width={48}
              height={48}
              className="footer__logo"
            />
            <span className="footer__name">Polaris</span>
          </div>

          <div className="footer__links">
            <div className="footer__nav">
              <Link href="/blog" className="footer__link">
                Blog
              </Link>
              <a
                href="https://x.com/polarisfinance_"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                X
              </a>
              <a
                href="https://github.com/Polaris-Finance"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/polaris_ann"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
            <a href="mailto:hello@polarisfinance.io" className="footer__email">
              hello@polarisfinance.io
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
