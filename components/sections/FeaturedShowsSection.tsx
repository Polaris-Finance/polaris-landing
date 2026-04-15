import { CalendarDaysIcon, Mic2Icon, UsersIcon } from "lucide-react";
import Image from "next/image";

import { ArrowRightIcon } from "@/components/icons";
import { featuredShows } from "@/lib/pageData";

export function FeaturedShowsSection() {
  return (
    <section id="featured-shows" className="section section--gradient featured-shows" aria-labelledby="featured-shows-heading">
      <div className="mx-auto max-w-7xl">
        <div className="featured-shows__grid">
          <div className="featured-shows__intro">
<h2 id="featured-shows-heading" className="reveal section-heading">
              Transmission Log
            </h2>
            <p className="reveal section-description">
              Start here for the long-form interviews, podcast episodes, and live talks that unpack the Polaris thesis in full.
            </p>
          </div>

          <div className="featured-shows__list reveal-stagger">
            {featuredShows.map((show, index) => (
              <article key={show.href} className="show-card">
                <div className="show-card__eyebrow">
                  <span className="show-card__platform">{show.platform}</span>
                  <span className="show-card__index" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="show-card__title-row">
                  <Image
                    src={show.hostLogoSrc}
                    alt={`${show.host} logo`}
                    width={40}
                    height={40}
                    className="show-card__logo"
                  />
                  <h3 className="show-card__title">{show.name}</h3>
                </div>

                <dl className="show-card__meta">
                  <div className="show-card__meta-item">
                    <dt className="show-card__meta-term">
                      <Mic2Icon className="show-card__meta-icon" aria-hidden />
                      Host
                    </dt>
                    <dd className="show-card__meta-description">{show.host}</dd>
                  </div>

                  <div className="show-card__meta-item">
                    <dt className="show-card__meta-term">
                      <UsersIcon className="show-card__meta-icon" aria-hidden />
                      Polaris Team Members
                    </dt>
                    <dd className="show-card__meta-description">{show.teamMembers.join(", ")}</dd>
                  </div>

                  <div className="show-card__meta-item">
                    <dt className="show-card__meta-term">
                      <CalendarDaysIcon className="show-card__meta-icon" aria-hidden />
                      Date
                    </dt>
                    <dd className="show-card__meta-description">
                      <time dateTime={show.dateIso}>{show.dateLabel}</time>
                    </dd>
                  </div>

                  <div className="show-card__meta-item">
                    <dt className="show-card__meta-term">Link</dt>
                    <dd className="show-card__meta-description">
                      <a
                        href={show.href}
                        className="show-card__link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${show.name} (opens in new window)`}
                      >
                        Open recording
                        <ArrowRightIcon className="h-4 w-4" aria-hidden />
                      </a>
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
