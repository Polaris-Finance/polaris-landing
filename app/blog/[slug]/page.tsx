import { ActiveTocSidebar } from "@/components/ActiveTocSidebar";
import { BlogImageLightbox } from "@/components/BlogImageLightbox";
import { Footer } from "@/components/Footer";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ArrowLeftIcon, ArrowUpIcon, XIcon } from "@/components/icons";
import { JsonLd, createArticleSchema, createBreadcrumbSchema } from "@/components/JsonLd";
import { TopNav } from "@/components/TopNav";
import { basePath } from "@/lib/basePath";
import { getAllPosts, getAllSlugs, getLocalImageMetadataMap, type LocalImageMetadata, getPostBySlug, slugify } from "@/lib/blog";
import { SITE_NAME, TWITTER_HANDLE } from "@/lib/constants";
import { blogIndexPath, blogIndexUrl, blogPostPath, blogPostUrl, homeUrl, absoluteUrl } from "@/lib/seo";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

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
      className="mb-10 rounded-2xl border border-[rgba(232,220,196,0.1)] border-l-2 border-l-[rgba(232,220,196,0.2)] bg-[rgba(var(--polaris-navy-rgb),0.5)] p-5"
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
      <a href={`#${id}`} className="heading-anchor" aria-hidden="true" tabIndex={-1}>
        #
      </a>
      {children}
    </>
  );
}

function formatDisplayDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const blogRobots: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
};

function createMarkdownComponents(imageMetadataMap: Map<string, LocalImageMetadata>): Components {
  return {
    img: ({ src, alt }) => {
      const srcStr = typeof src === "string" ? src : "";
      const imgSrc = srcStr.startsWith("/") ? `${basePath}${srcStr}` : srcStr;
      const imageMetadata = imageMetadataMap.get(srcStr);
      const isInfographic = srcStr.includes("/infographics/");
      if (isInfographic) {
        return (
          <BlogImageLightbox
            src={imgSrc}
            alt={alt || ""}
            width={imageMetadata?.width}
            height={imageMetadata?.height}
          />
        );
      }
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imgSrc}
          alt={alt || ""}
          width={imageMetadata?.width}
          height={imageMetadata?.height}
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
      delete (props as Record<string, unknown>).node;
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
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Check if slug exists in valid slugs first
  const validSlugs = getAllSlugs();
  if (!validSlugs.includes(slug)) {
    return { title: "Post Not Found | Polaris Blog" };
  }

  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found | Polaris" };

  const url = blogPostUrl(slug);
  const ogImageSrc = post.image || "/polaris-og.png";
  const ogImageMetadata = await getLocalImageMetadataMap([ogImageSrc]);
  const ogImage = ogImageMetadata.get(ogImageSrc);

  return {
    title: `${post.title} | Polaris Blog`,
    description: post.description,
    authors: [{ name: post.author, url: homeUrl() }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.lastModified,
      authors: [post.author],
      images: [
        {
          url: absoluteUrl(ogImageSrc),
          width: ogImage?.width || 1200,
          height: ogImage?.height || 630,
          alt: post.title,
          type: ogImage?.mimeType || "image/png",
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [absoluteUrl(ogImageSrc)],
      creator: TWITTER_HANDLE,
    },
    robots: blogRobots,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // Check if slug is valid first (prevents issues with static export)
  const validSlugs = getAllSlugs();
  if (!validSlugs.includes(slug)) {
    notFound();
  }

  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentPostIndex = allPosts.findIndex((entry) => entry.slug === slug);
  const newerPost = currentPostIndex > 0 ? allPosts[currentPostIndex - 1] : null;
  const olderPost = currentPostIndex >= 0 && currentPostIndex < allPosts.length - 1
    ? allPosts[currentPostIndex + 1]
    : null;
  const imageMetadataMap = await getLocalImageMetadataMap(post.imageSources);
  const postImageMetadata = post.image ? imageMetadataMap.get(post.image) ?? null : null;
  const toc = extractToc(post.content);
  const articleSchema = createArticleSchema(post, postImageMetadata);
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: homeUrl() },
    { name: "Blog", url: blogIndexUrl() },
    { name: post.title, url: blogPostUrl(slug) },
  ]);
  const markdownComponents = createMarkdownComponents(imageMetadataMap);
  const showUpdatedDate = post.lastModified.slice(0, 10) !== post.date;

  const shareUrl = encodeURIComponent(blogPostUrl(slug));
  const shareText = encodeURIComponent(post.title);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[var(--polaris-navy-darkest)]">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ReadingProgress />
      <div className="blog-atmosphere" aria-hidden="true" />
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <TopNav />

      <article id="main-content" className="px-6 pb-20 pt-16 sm:px-10 sm:pt-24">
        <div className="mx-auto max-w-3xl">
          <Link
            href={blogIndexPath()}
            className="mb-8 inline-flex items-center gap-2 text-sm text-cream-muted transition hover:text-star"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to blog
          </Link>

          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wider text-cream-muted">
              <time dateTime={post.date}>{formatDisplayDate(post.date)}</time>
              {showUpdatedDate && (
                <>
                  <span aria-hidden="true">·</span>
                  <time dateTime={post.lastModified}>
                    Updated {formatDisplayDate(post.lastModified)}
                  </time>
                </>
              )}
            </div>
            <h1 className="mt-6 font-serif text-[2.25rem] leading-[1.1] tracking-tight text-star sm:text-[3rem] lg:text-[3.75rem] xl:text-[4rem]">
              {post.title}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-cream-muted">{post.description}</p>
            <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-cream-muted">
                <span>By {post.author}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime} min read</span>
              </div>
              <a
                href={`https://x.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(var(--polaris-star-rgb),0.15)] px-4 py-2 text-sm text-[var(--polaris-cream-muted)] transition-colors hover:border-[rgba(var(--polaris-star-rgb),0.3)] hover:text-[var(--polaris-star)]"
              >
                <XIcon className="h-4 w-4" />
                Share on X
              </a>
            </div>
            {post.image && (
              <div className="mt-10 overflow-hidden rounded-2xl border border-[rgba(232,220,196,0.12)]">
                <Image
                  src={`${basePath}${post.image}`}
                  alt={post.title}
                  width={postImageMetadata?.width || 1200}
                  height={postImageMetadata?.height || 630}
                  className="h-auto w-full object-cover"
                  priority
                  sizes="(min-width: 1280px) 768px, (min-width: 640px) calc(100vw - 5rem), calc(100vw - 3rem)"
                />
              </div>
            )}
          </header>

          {/* Inline TOC — visible below xl */}
          <div className="xl:hidden">
            <TableOfContents entries={toc} />
          </div>

          {/* Content area with sticky sidebar TOC on xl */}
          <div className="relative">
            {/* Sidebar TOC — visible on xl, sticky with active highlighting */}
            <div className="hidden xl:block absolute right-[calc(100%+2rem)] top-0 bottom-0 w-56">
              <ActiveTocSidebar entries={toc} />
            </div>

            <div className="prose-polaris">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{post.content}</ReactMarkdown>
            </div>
          </div>

          {(newerPost || olderPost) && (
            <nav aria-label="More articles" className="mt-12 grid gap-4 sm:grid-cols-2">
              {newerPost ? (
                <Link
                  href={blogPostPath(newerPost.slug)}
                  className="rounded-2xl border border-[rgba(232,220,196,0.1)] bg-[rgba(var(--polaris-navy-rgb),0.35)] p-5 transition hover:border-[rgba(232,220,196,0.22)] hover:bg-[rgba(var(--polaris-navy-rgb),0.55)]"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-cream-muted">Newer post</p>
                  <p className="mt-2 font-serif text-xl text-star">{newerPost.title}</p>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}
              {olderPost && (
                <Link
                  href={blogPostPath(olderPost.slug)}
                  className="rounded-2xl border border-[rgba(232,220,196,0.1)] bg-[rgba(var(--polaris-navy-rgb),0.35)] p-5 transition hover:border-[rgba(232,220,196,0.22)] hover:bg-[rgba(var(--polaris-navy-rgb),0.55)]"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-cream-muted">Older post</p>
                  <p className="mt-2 font-serif text-xl text-star">{olderPost.title}</p>
                </Link>
              )}
            </nav>
          )}

          <a
            href="#main-content"
            className="mt-12 inline-flex items-center gap-2 text-sm text-cream-muted transition hover:text-star"
          >
            <ArrowUpIcon className="h-4 w-4" />
            Back to top
          </a>
        </div>
      </article>

      <Footer />
    </main>
  );
}
