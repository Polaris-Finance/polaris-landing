import { ArrowLeftIcon, GithubIcon, TelegramIcon } from "@/components/icons";
import { basePath } from "@/lib/basePath";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown, { Components } from "react-markdown";

const markdownComponents: Components = {
  img: ({ src, alt }) => {
    const srcStr = typeof src === "string" ? src : "";
    const imgSrc = srcStr.startsWith("/") ? `${basePath}${srcStr}` : srcStr;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={imgSrc} alt={alt || ""} className="rounded-lg" />
    );
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found | Polaris" };

  return {
    title: `${post.title} | Polaris Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--polaris-navy-darkest)]">
      <header className="px-6 py-8 sm:px-10">
        <div className="mx-auto max-w-3xl">
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

      <article className="px-6 pb-20 pt-4 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-cream-muted transition hover:text-star"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to blog
          </Link>

          <header className="mb-10">
            <time className="text-xs font-medium uppercase tracking-wider text-cream-muted">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h1 className="mt-3 font-serif text-3xl text-star sm:text-4xl lg:text-[2.75rem]">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-cream-muted">{post.description}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-cream-muted">
              <span>By {post.author}</span>
            </div>
          </header>

          <div className="prose-polaris">
            <ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>

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
