import { ArrowRightIcon } from "@/components/icons";
import { tokens } from "@/lib/pageData";
import Image from "next/image";
import Link from "next/link";

// Pattern backgrounds for color-blind accessibility
const tokenPatterns = {
  pusd: {
    // Subtle grid pattern
    backgroundImage: `linear-gradient(rgba(var(--polaris-star-rgb), 0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(var(--polaris-star-rgb), 0.03) 1px, transparent 1px)`,
    backgroundSize: "20px 20px",
  },
  peth: {
    // Subtle dot pattern
    backgroundImage: `radial-gradient(circle, rgba(var(--polaris-peth-rgb), 0.06) 1px, transparent 1px)`,
    backgroundSize: "12px 12px",
  },
  polar: {
    // Subtle diagonal lines
    backgroundImage: `repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(var(--polaris-polar-rgb), 0.04) 10px,
      rgba(var(--polaris-polar-rgb), 0.04) 12px
    )`,
  },
};

export function TokensSection() {
  return (
    <section className="section section--gradient section--showcase">
      <div className="mx-auto max-w-7xl">
        <h2 className="reveal section-heading">Triple-Engine Architecture</h2>
        <p className="reveal section-description">
          Three interlocking primitives power the Polaris ecosystem, designed to generate sustainable yield while maintaining robust stability mechanisms.
        </p>

        <div className="trust-strip mt-10">
          <div className="reveal-stagger trust-strip__items">
            {tokens.map((token, index) => (
              <div 
                key={`token-${index}`} 
                className={`token-card token-card--${token.color}`}
                style={tokenPatterns[token.color]}
              >
                <Image
                  src={token.iconSrc}
                  alt={`${token.name} icon`}
                  width={72}
                  height={72}
                  className="token-card__icon"
                />
                <h3 className="token-card__name">{token.name}</h3>
                <p className="token-card__tagline">{token.tagline}</p>
                <p className="token-card__description">{token.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Blog callout */}
        <Link href="/blog/stewardship-not-governance" className="reveal blog-callout mt-10">
          <div className="blog-callout__content">
            <div className="blog-callout__text">
              <p>Stewardship, not Governance.</p>
              <p>Governance fails because of structure, not people. Here&apos;s how stewardship fixes the structure with immutable foundations and scoped human judgment.</p>
            </div>
          </div>
          <div className="blog-callout__action">
            <span className="blog-callout__link">
              Read the article
              <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
