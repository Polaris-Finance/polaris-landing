import { ArrowRightIcon } from "@/components/icons";
import { stablecoinOSMilestones } from "@/lib/pageData";
import Link from "next/link";

export function StablecoinOSSection() {
  return (
    <section id="stablecoin-os" className="section">
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

        {/* Blog callout */}
        <Link href="/blog/pGOLD-finishing-what-digixdao-started" className="reveal blog-callout mt-10">
          <div className="blog-callout__content">
            <div className="blog-callout__text">
              <p>pGOLD: Finishing what DigixDAO started.</p>
              <p>How pGOLD breaks the XAUT/PAXG duopoly without touching a single gold bar.</p>
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
