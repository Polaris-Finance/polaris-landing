import { SITE_NAME } from "@/lib/constants";
import type { LocalImageMetadata } from "@/lib/blog";
import { absoluteUrl, blogIndexUrl, blogPostUrl, homeUrl } from "@/lib/seo";

type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: homeUrl(),
  logo: absoluteUrl("/emblem.svg"),
  sameAs: [
    "https://x.com/polarisfinance_",
    "https://github.com/Polaris-Finance",
    "https://t.me/polaris_ann",
  ],
  description:
    "Self-scaling stablecoin operating system. Uncorrelated, scalable returns without T-Bills, without CEXs, without compromises.",
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: homeUrl(),
  description:
    "Self-scaling stablecoin operating system. Uncorrelated, scalable returns without T-Bills, without CEXs, without compromises.",
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: homeUrl(),
  },
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Ethereum",
  description:
    "A self-scaling stablecoin operating system that generates uncorrelated, scalable yields without T-Bills, CEXs, or trusted third parties.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: SITE_NAME,
    url: homeUrl(),
  },
};

export function createArticleSchema(post: {
  title: string;
  description: string;
  date: string;
  lastModified: string;
  author: string;
  slug: string;
  image?: string;
  wordCount: number;
}, imageMetadata: LocalImageMetadata | null) {
  const canonicalUrl = blogPostUrl(post.slug);
  const articleImage = post.image
    ? {
        "@type": "ImageObject",
        url: absoluteUrl(post.image),
        width: imageMetadata?.width,
        height: imageMetadata?.height,
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.lastModified,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    wordCount: post.wordCount,
    url: canonicalUrl,
    image: articleImage,
    author: {
      "@type": "Organization",
      name: post.author,
      url: homeUrl(),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: homeUrl(),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/emblem.svg"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };
}

export function createBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createCollectionPageSchema(posts: {
  title: string;
  description: string;
  date: string;
  lastModified: string;
  slug: string;
  image?: string;
}[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${SITE_NAME} Blog`,
    description: "Updates, insights, and deep dives into the Self-Scaling Stablecoin Operating System.",
    url: blogIndexUrl(),
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: homeUrl(),
    },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: blogPostUrl(post.slug),
        name: post.title,
        item: {
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          url: blogPostUrl(post.slug),
          datePublished: post.date,
          dateModified: post.lastModified,
          image: post.image ? absoluteUrl(post.image) : undefined,
        },
      })),
    },
  };
}
