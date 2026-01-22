import { GithubIcon, TelegramIcon } from "@/components/icons";
import { basePath } from "@/lib/basePath";
import { getAllPosts } from "@/lib/blog";
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
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/polaris_ann"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
              >
                <TelegramIcon className="h-4 w-4" />
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
