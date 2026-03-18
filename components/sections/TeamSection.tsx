import Image from "next/image";
import { LinkedinIcon } from "lucide-react";
import { XIcon } from "@/components/icons";

const founders = [
  {
    name: "Robert Mullins",
    role: "CEO (Co-Founder)",
    bio: "7y in crypto, VC, Jumper Exchange",
    image: "/team/robert-mullins.jpg",
    twitter: "https://x.com/0xluude"
  },
  {
    name: "Laurens Kessenich",
    role: "CTO (Co-Founder)",
    bio: "PhD (Physics), 7y in crypto, DeFi Founder, ETH Zurich",
    image: "/team/laurens-kessenich.png",
    linkedin: "https://www.linkedin.com/in/laurens-michiels-van-kessenich-213582171/"
  },
  {
    name: "TokenBrice",
    role: "Growth (Co-Founder)",
    bio: "7y in crypto, DeFiScan, Liquity, Paraswap",
    image: "/team/tokenbrice.png",
    twitter: "https://x.com/TokenBrice"
  }
];

export function TeamSection() {
  return (
    <section className="section">
      <div className="mx-auto max-w-5xl">
        <h2 className="reveal section-heading">Built by DeFi Veterans</h2>
        <p className="reveal section-description">
          Seven years of stablecoin experience, distilled into Polaris.
        </p>
        
        <div className="reveal-stagger mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {founders.map((founder) => (
            <div 
              key={founder.name}
              className="group relative overflow-hidden rounded-2xl border border-[rgba(var(--polaris-star-rgb),0.1)] bg-[rgba(var(--polaris-navy-rgb),0.5)] p-6 transition-all hover:border-[rgba(var(--polaris-star-rgb),0.2)] hover:bg-[rgba(var(--polaris-navy-rgb),0.7)]"
            >
              <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-[var(--polaris-navy-dark)]">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              </div>
              
              <h3 className="font-serif text-xl text-[var(--polaris-star)]">
                {founder.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-[var(--polaris-star)] opacity-80">
                {founder.role}
              </p>
              <p className="mt-3 text-sm text-[var(--polaris-cream-muted)] leading-relaxed">
                {founder.bio}
              </p>
              
              {founder.twitter ? (
                <a
                  href={founder.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--polaris-cream-muted)] transition-colors hover:text-[var(--polaris-star)]"
                >
                  <XIcon className="h-4 w-4" />
                  Follow on X
                </a>
              ) : founder.linkedin ? (
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--polaris-cream-muted)] transition-colors hover:text-[var(--polaris-star)]"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  LinkedIn
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
