import {
  AwardIcon,
  GithubIcon,
  Link2OffIcon,
  LockKeyholeIcon,
  ShieldCheckIcon,
  TelegramIcon,
  TrendingUpIcon,
  ZapIcon,
} from "@/components/icons";
import Image from "next/image";
import Link from "next/link";
import { basePath } from "@/lib/basePath";
import { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type HeroStat = {
  value: string;
  label: string;
  Icon: IconComponent;
};

type TokenInfo = {
  name: string;
  tagline: string;
  description: string;
  iconSrc: string;
  color: "pusd" | "peth" | "polar";
};

type BenefitHighlight = {
  title: string;
  bullets: string[];
  Icon: IconComponent;
};

const heroStats: HeroStat[] = [
  {
    value: "Counterparty free",
    label: "Polaris is free of RWAs or other offchain dependencies: the whole protocol lives onchain; transparent and auditable",
    Icon: Link2OffIcon,
  },
  {
    value: "Untapped yield source",
    label: "Harnesses an endogenous and uncorrelated yield by monetizing ETH volatility via a bonding curve",
    Icon: ZapIcon,
  },
  {
    value: "Scalable yields",
    label: "pUSD and pETH harness self-correlated yield sources as their adoption and supply grow",
    Icon: TrendingUpIcon,
  },
  {
    value: "Immutable & trustless",
    label: "Fully onchain, immutable and extensively verified: simulations, agent-based modeling and Tier1 audits planned.",
    Icon: ShieldCheckIcon,
  },
];

const tokens: TokenInfo[] = [
  {
    name: "pUSD",
    tagline: "Stability that pays you back",
    description: "Yield-bearing stablecoin minted against pETH, backed by pristine collateral with yield that scales with volume",
    iconSrc: "/components/pusd-icon.svg",
    color: "pusd",
  },
  {
    name: "pETH",
    tagline: "Supercharged ETH with a safety net",
    description: "ETH derivative token backed by ETH held within a bonding curve that benefits from an ever rising price floor",
    iconSrc: "/components/peth-icon.svg",
    color: "peth",
  },
  {
    name: "POLAR",
    tagline: "Stable beta, real yield",
    description: "Stewardship token minted via 1-way auctions, burning pETH to raise its floor price and generate yield",
    iconSrc: "/components/polar-icon.svg",
    color: "polar",
  },
];

const narrativeMilestones = [
  {
    title: "Bonding Curve",
    bullets: [
      "pETH, the protocol's collateral, is minted by depositing ETH into a Bonding Curve, enabling to capture volatility and translate it into yield for pUSD borrowers.",
    ],
  },
  {
    title: "CDP Architecture",
    bullets: [
      "Polaris harnesses a CDP infrastructure optimized for growth and stability: it provides maximal guarantees to pUSD holders and compelling borrowing terms to pUSD borrowers.",
    ],
  },
  {
    title: "POLAR Conversion",
    bullets: [
      "New POLAR can only be minted by achieving the most synergetic action possible for the protocol: burning pETH, which raises its floor price, increasing pUSD's collateralization ratio.",
    ],
  },
];

const privacyMilestones = [
  {
    title: "Stewarded, not governed",
    bullets: [
      "While no changes can be made to the core protocol logic, several parameters can be adjusted to adapt to any market situation and protocol growth stage.",
      "Only a small set of quantitative parameters can be adjusted, all within hard-coded safety bounds and subject to onchain voting and delay.",
      "POLAR holders can lock their token to obtain vePOLAR and weight on those changes and the distribution of incentives to grow the ecosystem.",
    ],
  },
  {
    title: "Forkable infrastructure, shared liquidity",
    bullets: [
      "The Polaris CDP infrastructure can be forked to deliver stablecoin tracking any currency or commodities: pCHF, pGOLD, etc.",
      "Obtaining the licensing right over the CDP infrastructure requires the avail of vePOLAR holders.",
      "Many pFiats/pCommodities, but one pETH: all stable share the same collateral, further contributing to the resilience of the whole ecosystem.",
    ],
  },
  {
    title: "True community ownership",
    bullets: [
      "Any participant of the Polaris ecosystem, not just the forks can join the StablecoinOS: integrators, frontends, etc.",
      "Doing so requires sharing revenues with vePOLAR holders, and gain access to a stream of POLAR proportional to the gauge-voting they receive to grow their application.",
      "vePOLAR holders are the ones allocating resources within the ecosystem to foster its growth.",
    ],
  },
];

const benefitHighlights: BenefitHighlight[] = [
  {
    title: "Zero value leakage, maximal growth potential",
    bullets: [
      "From the bonding curve fees to the pUSD swap fees on PolarEX, Polaris knows no value leakage and capture all pETH/pUSD/POLAR-related revenue streams, redirected to best support the protocol and its ecosystem.",
    ],
    Icon: LockKeyholeIcon,
  },
  {
    title: "Scalable, without offchain dependencies",
    bullets: [
      "Unlike other stablecoins that might experience fast early growth, but eventually plateau and turn into T-bill wrappers; Polaris creates and nurtures its own yield source as it grows, enabling yield as competitive when $10M or $10B pUSD are minted.",
    ],
    Icon: TrendingUpIcon,
  },
  {
    title: "Immutable core, agile operating system",
    bullets: [
      "Polaris provides maximal guarantees to its users thanks to its immutability while still being able to evolve and incorporate new product offerings thanks to its stewards and operating system.",
    ],
    Icon: ShieldCheckIcon,
  },
  {
    title: "Built by a team with 7 years of stablecoin experience",
    bullets: [
      "The Polaris team is composed of experienced Solidity developers who shipped several stablecoins. They learned from their experience, and are joined by DeFi legends to face the final boss.",
    ],
    Icon: AwardIcon,
  },
];

// Generate random stars for the starfield
function generateStars(count: number, type: "tiny" | "small" | "medium" | "bright") {
  return Array.from({ length: count }, (_, i) => {
    // For stars near Polaris (around 50% x, 35% y), concentrate some stars there
    const isNearPolaris = type !== "bright" && Math.random() < 0.3;
    const baseLeft = isNearPolaris ? 40 + Math.random() * 20 : Math.random() * 100;
    const baseTop = isNearPolaris ? 20 + Math.random() * 30 : Math.random() * 55;

    return {
      id: `${type}-${i}`,
      left: `${baseLeft}%`,
      top: `${baseTop}%`,
      delay: `${Math.random() * 5}s`,
      nearPolaris: isNearPolaris,
    };
  });
}

// Reduced star counts for better performance (50 total vs 110)
const tinyStars = generateStars(30, "tiny");
const smallStars = generateStars(15, "small");
const mediumStars = generateStars(5, "medium");
const brightStars = generateStars(3, "bright");

// Polaris Star SVG Component
function PolarisStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="heroStarGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: "#FFFFFF", stopOpacity: 1 }} />
          <stop offset="30%" style={{ stopColor: "#E8DCC4", stopOpacity: 0.8 }} />
          <stop offset="70%" style={{ stopColor: "#E8DCC4", stopOpacity: 0.3 }} />
          <stop offset="100%" style={{ stopColor: "#E8DCC4", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id="heroStarBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#FFFFFF" }} />
          <stop offset="50%" style={{ stopColor: "#E8DCC4" }} />
          <stop offset="100%" style={{ stopColor: "#C4B8A0" }} />
        </linearGradient>
      </defs>

      {/* Outer glow */}
      <circle cx="100" cy="100" r="80" fill="url(#heroStarGlow)" opacity="0.6" />

      {/* Eight-pointed star - Main cardinal points */}
      <polygon points="100,10 103,85 100,100 97,85" fill="url(#heroStarBody)" />
      <polygon points="100,190 97,115 100,100 103,115" fill="url(#heroStarBody)" fillOpacity="0.9" />
      <polygon points="190,100 115,103 100,100 115,97" fill="url(#heroStarBody)" fillOpacity="0.9" />
      <polygon points="10,100 85,97 100,100 85,103" fill="url(#heroStarBody)" fillOpacity="0.9" />

      {/* Diagonal points */}
      <polygon points="163,37 112,88 100,100 108,92" fill="url(#heroStarBody)" fillOpacity="0.7" />
      <polygon points="37,37 88,88 100,100 92,92" fill="url(#heroStarBody)" fillOpacity="0.7" />
      <polygon points="163,163 112,112 100,100 108,108" fill="url(#heroStarBody)" fillOpacity="0.7" />
      <polygon points="37,163 88,112 100,100 92,108" fill="url(#heroStarBody)" fillOpacity="0.7" />

      {/* Center bright point */}
      <circle cx="100" cy="100" r="6" fill="#FFFFFF" />
      <circle cx="100" cy="100" r="3" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

// Mountain SVG Component
function Mountains() {
  return (
    <div className="mountains">
      {/* Left mountain range */}
      <svg className="mountain mountain--left" viewBox="0 0 400 200" preserveAspectRatio="none">
        <path
          d="M0,200 L0,120 L50,80 L100,100 L150,60 L200,90 L250,40 L300,70 L350,50 L400,80 L400,200 Z"
          fill="#0d1f3c"
          opacity="0.7"
        />
        <path
          d="M0,200 L0,140 L80,100 L120,120 L180,80 L220,110 L280,70 L340,100 L400,90 L400,200 Z"
          fill="#122a4d"
          opacity="0.5"
        />
      </svg>

      {/* Right mountain range */}
      <svg className="mountain mountain--right" viewBox="0 0 400 200" preserveAspectRatio="none">
        <path
          d="M0,200 L0,100 L60,70 L100,90 L160,50 L220,80 L280,30 L340,60 L400,40 L400,200 Z"
          fill="#0d1f3c"
          opacity="0.5"
        />
        <path
          d="M0,200 L0,130 L50,100 L110,120 L170,80 L230,100 L290,60 L350,90 L400,70 L400,200 Z"
          fill="#122a4d"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}

// Wave Surface Lines SVG
function WaveSurface() {
  return (
    <svg viewBox="0 0 1200 30" preserveAspectRatio="none">
      <path
        d="M0,15 Q75,12 150,15 T300,15 T450,15 T600,15 T750,15 T900,15 T1050,15 T1200,15"
        fill="none"
        stroke="rgba(232, 220, 196, 0.12)"
        strokeWidth="1"
      />
      <path
        d="M0,20 Q75,17 150,20 T300,20 T450,20 T600,20 T750,20 T900,20 T1050,20 T1200,20"
        fill="none"
        stroke="rgba(232, 220, 196, 0.08)"
        strokeWidth="0.5"
      />
    </svg>
  );
}

// Water/Ocean Component with reflection
function Ocean() {
  return (
    <div className="ocean">
      {/* Animated wave surface lines */}
      <div className="wave-surface">
        <WaveSurface />
      </div>

      {/* Horizontal light ripples */}
      <div className="water-ripple water-ripple--1" />
      <div className="water-ripple water-ripple--2" />
      <div className="water-ripple water-ripple--3" />

      {/* Soft ambient water glow layers */}
      <div className="water-glow water-glow--1" />
      <div className="water-glow water-glow--2" />
      <div className="water-glow water-glow--3" />

      {/* Star reflection with shimmer bands */}
      <div className="star-reflection" />
      <div className="star-reflection-band star-reflection-band--1" />
      <div className="star-reflection-band star-reflection-band--2" />
      <div className="star-reflection-band star-reflection-band--3" />
    </div>
  );
}

// Compass Rose SVG Component
function CompassRose() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="compassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#E8DCC4", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#C4B8A0", stopOpacity: 0.6 }} />
        </linearGradient>
      </defs>
      {/* Main cardinal points */}
      <polygon points="50,5 53,45 50,50 47,45" fill="url(#compassGradient)" />
      <polygon points="50,95 47,55 50,50 53,55" fill="url(#compassGradient)" opacity="0.8" />
      <polygon points="95,50 55,53 50,50 55,47" fill="url(#compassGradient)" opacity="0.8" />
      <polygon points="5,50 45,47 50,50 45,53" fill="url(#compassGradient)" opacity="0.8" />
      {/* Diagonal points */}
      <polygon points="82,18 54,46 50,50 52,48" fill="url(#compassGradient)" opacity="0.5" />
      <polygon points="18,18 46,46 50,50 48,48" fill="url(#compassGradient)" opacity="0.5" />
      <polygon points="82,82 54,54 50,50 52,52" fill="url(#compassGradient)" opacity="0.5" />
      <polygon points="18,82 46,54 50,50 48,52" fill="url(#compassGradient)" opacity="0.5" />
      {/* Center circle */}
      <circle cx="50" cy="50" r="4" fill="url(#compassGradient)" />
      <circle cx="50" cy="50" r="8" fill="none" stroke="url(#compassGradient)" strokeWidth="0.5" opacity="0.6" />
    </svg>
  );
}

// Compass Divider Component
function CompassDivider() {
  return (
    <div className="compass-divider">
      <CompassRose />
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* ============================================
          HERO SECTION - Celestial Scene
          ============================================ */}
      <section className="hero-scene">
        {/* Starfield with drift animation */}
        <div className="starfield starfield--drift">
          {tinyStars.map((star) => (
            <div
              key={star.id}
              className={`star star--tiny ${star.nearPolaris ? "star--near-polaris" : ""}`}
              style={{ left: star.left, top: star.top }}
            />
          ))}
          {smallStars.map((star) => (
            <div
              key={star.id}
              className={`star star--small ${star.nearPolaris ? "star--near-polaris" : ""}`}
              style={{ left: star.left, top: star.top, animationDelay: star.delay }}
            />
          ))}
          {mediumStars.map((star) => (
            <div
              key={star.id}
              className={`star star--medium ${star.nearPolaris ? "star--near-polaris" : ""}`}
              style={{ left: star.left, top: star.top, animationDelay: star.delay }}
            />
          ))}
          {/* Bright stars with pronounced glow */}
          {brightStars.map((star) => (
            <div
              key={star.id}
              className="star star--bright"
              style={{ left: star.left, top: star.top, animationDelay: star.delay }}
            />
          ))}
        </div>

        {/* Mountains silhouette */}
        <Mountains />

        {/* Ocean with reflection */}
        <Ocean />

        {/* Polaris Star - Main focal point with depth rings */}
        <div className="polaris-star-container">
          {/* Concentric depth rings */}
          <div className="polaris-depth-ring polaris-depth-ring--3" />
          <div className="polaris-depth-ring polaris-depth-ring--2" />
          <div className="polaris-depth-ring polaris-depth-ring--1" />
          {/* Rotating outer glow ring */}
          <div className="polaris-glow-ring" />
          {/* Main glow */}
          <div className="polaris-star-glow" />
          {/* Star - increased size ~40% */}
          <PolarisStar className="polaris-star w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80" />
        </div>

        {/* Hero Content - CSS Grid with star zone and text zone */}
        <div className="hero-content">
          {/* Row 1: Star zone spacer - reserves space for star visual effects */}
          <div className="hero-star-zone" aria-hidden="true" />

          {/* Row 2: Text content */}
          <div className="hero-text-content">
            <div className="hero-logo">
              <h1 className="hero-title">Polaris</h1>
              <p className="hero-subtitle">Protocol</p>
            </div>

            <p className="hero-tagline">
              Self-scaling stablecoin operating system. Uncorrelated, scalable returns without T-Bills, without CEXs, without compromises.
            </p>

            <div className="hero-cta">
              <Link href="https://t.me/polaris_ann" className="btn-primary">
                <span>Get Launch Updates</span>
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          STATS SECTION
          ============================================ */}
      <section className="section section--gradient">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {heroStats.map((stat) => (
              <div key={stat.value} className="stat-card">
                <span className="stat-card__icon">
                  <stat.Icon className="h-4 w-4" aria-hidden />
                </span>
                <p className="stat-card__value">{stat.value}</p>
                <p className="stat-card__label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compass divider */}
      <CompassDivider />

      {/* ============================================
          HOW IT WORKS SECTION
          ============================================ */}
      <section className="section">
        <div className="mx-auto max-w-7xl">
          <span className="section-kicker">Yield</span>
          <h2 className="section-heading">How It Works: Scalable Yield</h2>
          <p className="section-description">
            Polaris is a triple-engine stablecoin protocol built to solve the stablecoin &ldquo;Yield Trap&rdquo;. By monetizing ETH volatility via a bonding curve, speculative conversion mechanics, and CDP architecture, Polaris generates uncorrelated yield that scales as the system grows without counterparty or credit risk.
          </p>

          <div className="system-diagram mt-10">
            <Image
              src={`${basePath}/polaris-system-v2.svg`}
              alt="Polaris protocol system diagram"
              width={1200}
              height={510}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="h-auto w-full"
            />
          </div>

          <div className="narrative-timeline mt-10">
            {narrativeMilestones.map((milestone, index) => (
              <div key={milestone.title} className="narrative-step">
                <span className="narrative-step__index">{index + 1}</span>
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

      {/* Compass divider */}
      <CompassDivider />

      {/* ============================================
          TOKENS SECTION
          ============================================ */}
      <section className="section section--gradient">
        <div className="mx-auto max-w-7xl">
          <span className="section-kicker">Tokens</span>
          <h2 className="section-heading">Triple-Engine Architecture</h2>
          <p className="section-description">
            Three interlocking primitives power the Polaris ecosystem, designed to generate sustainable yield while maintaining robust stability mechanisms.
          </p>

          <div className="trust-strip mt-10">
            <div className="trust-strip__items">
              {tokens.map((token) => (
                <div key={token.name} className={`token-card token-card--${token.color}`}>
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
        </div>
      </section>

      {/* Compass divider */}
      <CompassDivider />

      {/* ============================================
          STABLECOIN OS SECTION
          ============================================ */}
      <section className="section">
        <div className="mx-auto max-w-7xl">
          <span className="section-kicker">Stablecoin OS</span>
          <h2 className="section-heading">Stablecoin Operating System</h2>
          <p className="section-description">
            The Polaris StablecoinOS is a framework to steward Polaris growth and enable selected projects to deploy their own decentralized stablecoin while benefiting from shared liquidity and protocol-level integrations.
          </p>

          <div className="narrative-timeline mt-10">
            {privacyMilestones.map((milestone, index) => (
              <div key={milestone.title} className="narrative-step">
                <span className="narrative-step__index">{index + 1}</span>
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

      {/* Compass divider */}
      <CompassDivider />

      {/* ============================================
          BENEFITS SECTION
          ============================================ */}
      <section className="section section--gradient">
        <div className="mx-auto max-w-7xl">
          <span className="section-kicker">Principles</span>
          <h2 className="section-heading">The North Star of Ethereum</h2>
          <p className="section-description">
            We&apos;ve been in the trenches for too long to see the space we&apos;ve dedicated our life to end up neutralized like the Internet was: Polaris is our magnus opus and ultimate answer to the centralization and institutional capture of DeFi.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="footer">
        <div className="footer__content">
          <div className="footer__brand">
            <Image
              src={`${basePath}/brand-mark.svg`}
              alt="Polaris mark"
              width={48}
              height={48}
              className="footer__logo"
            />
            <span className="footer__name">Polaris</span>
          </div>

          <div className="footer__links">
            <div className="footer__nav">
              <Link href="/blog" className="footer__link">
                Blog
              </Link>
              <a
                href="https://x.com/polarisfinance_"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                X
              </a>
              <a
                href="https://github.com/Polaris-Finance"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/polaris_ann"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
              >
                <TelegramIcon className="h-4 w-4" />
              </a>
            </div>
            <a href="mailto:hello@polarisfinance.io" className="footer__email">
              hello@polarisfinance.io
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
