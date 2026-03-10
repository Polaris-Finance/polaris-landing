import { Footer } from "@/components/Footer";
import { JsonLd, createBreadcrumbSchema, createCollectionPageSchema } from "@/components/JsonLd";
import { TopNav } from "@/components/TopNav";
import { basePath } from "@/lib/basePath";
import { getAllPosts } from "@/lib/blog";
import { SITE_NAME, TWITTER_HANDLE } from "@/lib/constants";
import { blogIndexUrl, blogPostPath, homeUrl } from "@/lib/seo";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const blogTitle = `Blog | ${SITE_NAME}`;
const blogDescription = "Polaris blog: DeFi stablecoin insights, CDP innovations, and protocol updates. Learn how pUSD delivers scalable, trustless yield.";
const blogRobots: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
};

export const metadata: Metadata = {
  title: blogTitle,
  description: blogDescription,
  alternates: {
    canonical: blogIndexUrl(),
  },
  openGraph: {
    title: blogTitle,
    description: blogDescription,
    url: blogIndexUrl(),
    siteName: SITE_NAME,
    images: [
      {
        url: "/polaris-og.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Blog`,
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: blogTitle,
    description: blogDescription,
    images: ["/polaris-og.png"],
    creator: TWITTER_HANDLE,
  },
  robots: blogRobots,
};

export default function BlogPage() {
  const posts = getAllPosts();
  const collectionSchema = createCollectionPageSchema(posts);
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: homeUrl() },
    { name: "Blog", url: blogIndexUrl() },
  ]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--polaris-navy-darkest)]">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />

      <TopNav />

      <section id="main-content" className="px-6 pb-20 pt-24 sm:px-10">
        <div className="mx-auto max-w-4xl">
          <span className="section-kicker">Blog</span>
          <h1 className="section-heading">Latest Updates</h1>
          <p className="mt-4 text-lg text-cream-muted">
            Every mechanism, every design choice — covered in depth. Learn how Polaris works before it launches.
          </p>

          <div className="mt-12 grid gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={blogPostPath(post.slug)}
                className="group block overflow-hidden rounded-2xl border border-[rgba(232,220,196,0.1)] bg-[rgba(var(--polaris-navy-rgb),0.5)] backdrop-blur-sm transition hover:border-[rgba(232,220,196,0.25)] hover:bg-[rgba(var(--polaris-navy-rgb),0.7)]"
              >
                {post.image && (
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={`${basePath}${post.image}`}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 896px, 100vw"
                      className="object-cover transition group-hover:scale-[1.02]"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2 p-6">
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
            <div className="mt-12 rounded-2xl border border-dashed border-[rgba(232,220,196,0.15)] bg-[rgba(var(--polaris-navy-rgb),0.3)] p-12 text-center">
              <p className="text-cream-muted">No posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
