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
  name: "Polaris Protocol",
  url: "https://polarisfinance.io",
  logo: "https://polarisfinance.io/brand-mark.svg",
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
  name: "Polaris Protocol",
  url: "https://polarisfinance.io",
  description:
    "Self-scaling stablecoin operating system. Uncorrelated, scalable returns without T-Bills, without CEXs, without compromises.",
  publisher: {
    "@type": "Organization",
    name: "Polaris Protocol",
    url: "https://polarisfinance.io",
  },
};

export function createArticleSchema(post: {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Polaris Protocol",
      url: "https://polarisfinance.io",
      logo: {
        "@type": "ImageObject",
        url: "https://polarisfinance.io/brand-mark.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://polarisfinance.io/blog/${post.slug}`,
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
  slug: string;
}[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Polaris Protocol Blog",
    description: "Updates, insights, and deep dives into the Self-Scaling Stablecoin Operating System.",
    url: "https://polarisfinance.io/blog",
    isPartOf: {
      "@type": "WebSite",
      name: "Polaris Protocol",
      url: "https://polarisfinance.io",
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://polarisfinance.io/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };
}
