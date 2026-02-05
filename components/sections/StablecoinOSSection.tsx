import { stablecoinOSMilestones } from "@/lib/pageData";

export function StablecoinOSSection() {
  return (
    <section className="section">
      <div className="mx-auto max-w-7xl">
        <h2 className="reveal section-heading">Stablecoin Operating System</h2>
        <p className="reveal section-description">
          The Polaris StablecoinOS is a framework to steward Polaris growth and enable selected projects to deploy their own decentralized stablecoin while benefiting from shared liquidity and protocol-level integrations.
        </p>

        <div className="reveal-stagger narrative-timeline mt-10">
          {stablecoinOSMilestones.map((milestone, index) => (
            <div key={`os-milestone-${index}`} className="narrative-step">
              <span className="narrative-step__marker" aria-hidden="true" />
              <div className="narrative-step__body">
                <h3 className="narrative-step__title">{milestone.title}</h3>
                <ul className="narrative-step__description space-y-2">
                  {milestone.bullets.map((bullet, bulletIndex) => (
                    <li key={`os-${index}-bullet-${bulletIndex}`}>{bullet}</li>
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
