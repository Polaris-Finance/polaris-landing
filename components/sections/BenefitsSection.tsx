import { benefitHighlights } from "@/lib/pageData";

export function BenefitsSection() {
  return (
    <section className="section section--gradient">
      <div className="mx-auto max-w-7xl">
        <h2 className="reveal section-heading">Our Principles: The North Star of Ethereum</h2>
        <p className="reveal section-description">
          We&apos;ve been in the trenches for too long to see the space we&apos;ve dedicated our lives to neutralized. Polaris is our answer to the centralization of DeFi.
        </p>

        <div className="reveal-stagger benefits-grid mt-10">
          {benefitHighlights.map(({ title, bullets, Icon }, index) => (
            <div key={`benefit-${index}`} className="benefit-item">
              <Icon className="benefit-item__icon" aria-hidden />
              <h3 className="benefit-item__title">{title}</h3>
              <p className="benefit-item__description">{bullets.join(" ")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
