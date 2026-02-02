import { BlogImageLightbox } from "@/components/BlogImageLightbox";
import { ArrowLeftIcon, ArrowUpIcon, ArticleIcon, GithubIcon, TelegramIcon, XIcon } from "@/components/icons";
import { JsonLd, createArticleSchema, createBreadcrumbSchema } from "@/components/JsonLd";
import { basePath } from "@/lib/basePath";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

type TocEntry = {
  id: string;
  text: string;
  level: 2 | 3;
};

function extractToc(markdown: string): TocEntry[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const entries: TocEntry[] = [];
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    entries.push({
      id: slugify(match[2]),
      text: match[2],
      level: match[1].length as 2 | 3,
    });
  }
  return entries;
}

function TableOfContents({ entries }: { entries: TocEntry[] }) {
  if (entries.length < 3) return null;
  return (
    <nav
      aria-label="Table of contents"
      className="mb-10 rounded-2xl border border-[rgba(232,220,196,0.1)] bg-[rgba(13,31,60,0.5)] p-5"
    >
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-cream-muted">
        In this article
      </p>
      <ul className="space-y-1.5">
        {entries.map((entry) => (
          <li key={entry.id} className={entry.level === 3 ? "ml-4" : ""}>
            <a
              href={`#${entry.id}`}
              className="text-sm text-cream-muted transition hover:text-star"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function HeadingWithAnchor({ id, children }: { id: string; children: ReactNode }) {
  return (
    <>
      <a href={`#${id}`} className="heading-anchor" aria-hidden="true">
        #
      </a>
      {children}
    </>
  );
}

const markdownComponents: Components = {
  img: ({ src, alt }) => {
    const srcStr = typeof src === "string" ? src : "";
    const imgSrc = srcStr.startsWith("/") ? `${basePath}${srcStr}` : srcStr;
    const isInfographic = srcStr.includes("/infographics/");
    if (isInfographic) {
      return <BlogImageLightbox src={imgSrc} alt={alt || ""} />;
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imgSrc}
        alt={alt || ""}
        className="mx-auto my-6 block max-w-xs rounded-lg"
        loading="lazy"
        decoding="async"
      />
    );
  },
  table: ({ children }) => (
    <div className="overflow-x-auto">
      <table>{children}</table>
    </div>
  ),
  a: ({ href, children, ...props }) => {
    const isExternal = typeof href === "string" && href.startsWith("http");
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
  h2: ({ children }) => {
    const text = typeof children === "string" ? children : String(children);
    const id = slugify(text);
    return (
      <h2 id={id}>
        <HeadingWithAnchor id={id}>{children}</HeadingWithAnchor>
      </h2>
    );
  },
  h3: ({ children }) => {
    const text = typeof children === "string" ? children : String(children);
    const id = slugify(text);
    return (
      <h3 id={id}>
        <HeadingWithAnchor id={id}>{children}</HeadingWithAnchor>
      </h3>
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found | Polaris" };

  const url = `https://polarisfinance.io/blog/${slug}`;
  const ogImage = post.image || "/polaris-og.png";

  return {
    title: `${post.title} | Polaris Blog`,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: "Polaris Protocol",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
      creator: "@polarisfinance_",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const toc = extractToc(post.content);
  const articleSchema = createArticleSchema(post);
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://polarisfinance.io" },
    { name: "Blog", url: "https://polarisfinance.io/blog" },
    { name: post.title, url: `https://polarisfinance.io/blog/${slug}` },
  ]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--polaris-navy-darkest)]">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Top Navigation */}
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
          <Link href="/blog" className="top-nav__link">
            <span className="top-nav__link-text">Blog</span>
            <ArticleIcon className="top-nav__link-icon h-4 w-4" aria-hidden />
          </Link>
          <a href="https://x.com/polarisfinance_" className="top-nav__link" target="_blank" rel="noreferrer">
            <span className="top-nav__link-text">X.com</span>
            <XIcon className="top-nav__link-icon h-4 w-4" aria-hidden />
          </a>
          <a href="https://t.me/polaris_ann" className="top-nav__link" target="_blank" rel="noreferrer">
            <span className="top-nav__link-text">Telegram</span>
            <TelegramIcon className="top-nav__link-icon h-4 w-4" aria-hidden />
          </a>
        </div>
        <span className="top-nav__cta">
          <span className="top-nav__cta-full">Whitepaper coming soon</span>
          <span className="top-nav__cta-short">WP coming soon</span>
        </span>
      </nav>

      <article id="main-content" className="px-6 pb-20 pt-16 sm:px-10 sm:pt-24">
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
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min read</span>
            </div>
          </header>

          <TableOfContents entries={toc} />

          <div className="prose-polaris">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{post.content}</ReactMarkdown>
          </div>

          <a
            href="#main-content"
            className="mt-12 inline-flex items-center gap-2 text-sm text-cream-muted transition hover:text-star"
          >
            <ArrowUpIcon className="h-4 w-4" />
            Back to top
          </a>
        </div>
      </article>

      <footer className="footer">
        <div className="footer__content">
          <div className="footer__brand">
            <Link href="/">
              <Image
                src={`${basePath}/full-logo.svg`}
                alt="Polaris"
                width={126}
                height={44}
                className="footer__logo"
              />
            </Link>
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
                className="footer__link footer__link--icon"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/polaris_ann"
                className="footer__link footer__link--icon"
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
