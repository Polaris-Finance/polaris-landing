import { basePath } from "@/lib/basePath";
import { narrativeMilestones } from "@/lib/pageData";
import Image from "next/image";

export function HowItWorksSection() {
  return (
    <section className="section">
      <div className="mx-auto max-w-7xl">
        <h2 className="reveal section-heading">How Scalable Yield Works</h2>
        <p className="reveal section-description">
          Polaris is a triple-engine stablecoin protocol built to solve the stablecoin &ldquo;Yield Trap&rdquo;. By monetizing pETH volatility via a bonding curve, conversion mechanics, and CDP architecture, Polaris generates uncorrelated yield that scales as the system grows without counterparty or credit risk.
        </p>

        <div className="reveal--scale system-diagram mt-10">
          <Image
            src={`${basePath}/polaris-system-v2-vertical.svg`}
            alt="Polaris protocol system diagram"
            width={400}
            height={1450}
            sizes="100vw"
            className="h-auto w-full md:hidden"
          />
          <Image
            src={`${basePath}/polaris-system-v2.svg`}
            alt="Polaris protocol system diagram"
            width={1200}
            height={510}
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="hidden h-auto w-full md:block"
          />
        </div>

        <div className="reveal-stagger narrative-timeline mt-10">
          {narrativeMilestones.map((milestone) => (
            <div key={milestone.title} className="narrative-step">
              <span className="narrative-step__marker" aria-hidden="true" />
              <div className="narrative-step__body">
                <h3 className="narrative-step__title">{milestone.title}</h3>
                <ul className="narrative-step__description space-y-2">
                  {milestone.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
