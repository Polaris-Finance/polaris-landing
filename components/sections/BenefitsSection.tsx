import { benefitHighlights } from "@/lib/pageData";

export function BenefitsSection() {
  return (
    <section className="section section--gradient">
      <div className="mx-auto max-w-7xl">
        <h2 className="reveal section-heading">Our Principles: The North Star of Ethereum</h2>
        <p className="reveal section-description">
          We&apos;ve been in the trenches for too long to see the space we&apos;ve dedicated our lives to end up neutralized. Polaris is our ultimate answer to the centralization of DeFi.
        </p>

        <div className="reveal-stagger mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefitHighlights.map(({ title, bullets, Icon }) => (
            <div key={title} className="benefit-card">
              <span className="benefit-card__icon" aria-hidden>
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="benefit-card__title">{title}</h3>
              <ul className="benefit-card__description space-y-2">
                {bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
