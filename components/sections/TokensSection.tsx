import { ArrowRightIcon } from "@/components/icons";
import { tokens } from "@/lib/pageData";
import Image from "next/image";
import Link from "next/link";

export function TokensSection() {
  return (
    <section className="section section--gradient">
      <div className="mx-auto max-w-7xl">
        <h2 className="reveal section-heading">Triple-Engine Architecture</h2>
        <p className="reveal section-description">
          Three interlocking primitives power the Polaris ecosystem, designed to generate sustainable yield while maintaining robust stability mechanisms.
        </p>

        <div className="trust-strip mt-10">
          <div className="reveal-stagger trust-strip__items">
            {tokens.map((token, index) => (
              <div key={`token-${index}`} className={`token-card token-card--${token.color}`}>
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
        <div className="reveal blog-callout mt-10">
          <div className="blog-callout__content">
            <div className="blog-callout__text">
              <p>CDPs mint dollars. Polaris mints anything.</p>
              <p>From Maker to Liquity, we trace the CDP blueprint — and show how Polaris extends it with pETH, self-adjusting rates, and a factory for stablecoins pegged to anything.</p>
            </div>
          </div>
          <div className="blog-callout__action">
            <Link href="/blog/polaris-mints-anything" className="blog-callout__link">
              Read the article
              <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
