import { Footer } from "@/components/Footer";
import { BlogSearch } from "@/components/BlogSearch";
import { JsonLd, createBreadcrumbSchema, createCollectionPageSchema } from "@/components/JsonLd";
import { TopNav } from "@/components/TopNav";
import { getAllPosts } from "@/lib/blog";
import { SITE_NAME, TWITTER_HANDLE } from "@/lib/constants";
import { blogIndexUrl, homeUrl } from "@/lib/seo";
import { Metadata } from "next";

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
      <div className="blog-atmosphere" aria-hidden="true" />
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />

      <TopNav />

      <section id="main-content" className="px-6 pb-20 pt-24 sm:px-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="section-heading">Latest Updates</h1>
          <p className="mt-4 text-lg text-cream-muted">
            Every mechanism, every design choice — covered in depth. Learn how Polaris works before it launches.
          </p>

          <BlogSearch posts={posts} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
