import {
  ArrowRightIcon,
  ArticleIcon,
  AwardIcon,
  GithubIcon,
  Link2OffIcon,
  LockKeyholeIcon,
  ShieldCheckIcon,
  TelegramIcon,
  TrendingUpIcon,
  XIcon,
  ZapIcon,
} from "@/components/icons";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/JsonLd";
import { ScrollReveal } from "@/components/ScrollReveal";
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
    label: "Polaris is free of trusted assets or other offchain dependencies: the whole protocol lives onchain; transparent and auditable",
    Icon: Link2OffIcon,
  },
  {
    value: "Untapped yield source",
    label: "Harnesses novel, uncorrelated yield sources by monetizing volatility and growth via a bonding curve",
    Icon: ZapIcon,
  },
  {
    value: "Scalable yields",
    label: "pUSD and pETH harness self-correlated yield sources as their adoption and supply grow",
    Icon: TrendingUpIcon,
  },
  {
    value: "Immutable & trustless",
    label: "Fully onchain, immutable and extensively verified: simulations, agent-based modeling and Tier-1 audits.",
    Icon: ShieldCheckIcon,
  },
];

const tokens: TokenInfo[] = [
  {
    name: "pUSD",
    tagline: "Stability that pays you back",
    description: "Yield-bearing stablecoin minted against pETH, backed by pristine collateral with yield that scales with supply",
    iconSrc: "/components/pusd-icon.svg",
    color: "pusd",
  },
  {
    name: "pETH",
    tagline: "Supercharged ETH with a safety net",
    description: "A token backed by ETH held within the bonding curve that benefits from an ever rising price floor growing with activity",
    iconSrc: "/components/peth-icon.svg",
    color: "peth",
  },
  {
    name: "POLAR",
    tagline: "Stable beta, real yield",
    description: "Stewardship token minted via 1-way conversions, generating yield and increasing stability",
    iconSrc: "/components/polar-icon.svg",
    color: "polar",
  },
];

const narrativeMilestones = [
  {
    title: "Bonding Curve",
    bullets: [
      "pETH, the protocol's collateral, is minted by depositing ETH into a bonding curve, capturing volatility and translating it into yield for pUSD borrowers.",
    ],
  },
  {
    title: "CDP Architecture",
    bullets: [
      "Polaris harnesses a CDP architecture optimized for growth and stability: it provides maximal guarantees to pUSD holders and compelling borrowing terms to pUSD borrowers. It's flexible and can cater for assets with negative interest rates, such as gold.",
    ],
  },
  {
    title: "POLAR Issuance",
    bullets: [
      "New POLAR is minted by performing the most synergistic action possible for the protocol: burning pETH, which raises its floor price, increasing pUSD's collateralization ratio and releasing additional yield.",
    ],
  },
];

const privacyMilestones = [
  {
    title: "Stewarded, not governed",
    bullets: [
      "While no changes can be made to the core protocol logic, several parameters can be adjusted to adapt to any market situation and protocol growth stage.",
      "Only a small set of quantitative parameters can be adjusted, all within hard-coded safety bounds and subject to onchain voting and delay.",
      "POLAR holders can lock their token to obtain vePOLAR and vote on those changes and the distribution of incentives to grow the ecosystem.",
    ],
  },
  {
    title: "Forkable infrastructure, shared liquidity",
    bullets: [
      "The Polaris CDP infrastructure can be forked to deliver stablecoins tracking any currency or commodities: pCHF, pGOLD, etc.",
      "Obtaining the licensing right over the CDP infrastructure requires the approval of vePOLAR holders.",
      "Many pFiats/pCommodities, but one pETH: all stablecoins share the same collateral, further contributing to the resilience of the whole ecosystem.",
    ],
  },
  {
    title: "True community ownership",
    bullets: [
      "Any participant of the Polaris ecosystem, not just the forks, can join the StablecoinOS: integrators, frontends, etc.",
      "Doing so requires sharing revenues with vePOLAR holders, enabling them to gain access to a stream of incentives proportional to the gauge-voting they receive to grow their application.",
      "vePOLAR holders are the ones allocating resources within the ecosystem to foster its growth.",
    ],
  },
];

const benefitHighlights: BenefitHighlight[] = [
  {
    title: "Zero value leakage, maximal growth potential",
    bullets: [
      "By internalizing all system activity, Polaris ensures no value is leaked to external parties, capturing all revenue streams and redirecting them to best support the protocol and overall ecosystem.",
    ],
    Icon: LockKeyholeIcon,
  },
  {
    title: "Scalable, without offchain dependencies",
    bullets: [
      "Unlike other stablecoins that might experience fast early growth, but eventually plateau and turn into T-bill wrappers; Polaris creates and nurtures its own yield source as it grows, enabling yield that scales regardless of whether $10M or $10B pUSD are minted.",
    ],
    Icon: TrendingUpIcon,
  },
  {
    title: "Immutable core, unlimited growth",
    bullets: [
      "Polaris provides maximal guarantees to its users thanks to its immutability while still being able to evolve and incorporate new product offerings thanks to its stewards.",
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
      index: i,
      left: `${baseLeft}%`,
      top: `${baseTop}%`,
      delay: `${Math.random() * 5}s`,
      nearPolaris: isNearPolaris,
      // Mark stars to hide on mobile (keep first ~35% of each type)
      hideOnMobile: type === "tiny" ? i >= 10 : type === "small" ? i >= 5 : type === "medium" ? i >= 2 : i >= 2,
    };
  });
}

// Reduced star counts for better performance (50 total vs 110)
const tinyStars = generateStars(30, "tiny");
const smallStars = generateStars(15, "small");
const mediumStars = generateStars(5, "medium");
const brightStars = generateStars(3, "bright");


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
      {/* Skip to content link for keyboard accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <ScrollReveal />

      {/* ============================================
          TOP NAVIGATION
          ============================================ */}
      <nav className="top-nav">
        <Link href="/" className="top-nav__brand">
          <Image
            src={`${basePath}/full-logo.svg`}
            alt="Polaris"
            width={126}
            height={44}
            className="top-nav__logo top-nav__logo--full"
          />
          <Image
            src={`${basePath}/emblem.svg`}
            alt="Polaris"
            width={28}
            height={28}
            className="top-nav__logo top-nav__logo--emblem"
          />
        </Link>
        <div className="top-nav__links">
          <Link href="/blog" className="top-nav__link">
            <span className="top-nav__link-text">Blog</span>
            <ArticleIcon className="top-nav__link-icon h-4 w-4" aria-hidden />
          </Link>
          <a href="https://x.com/polarisfinance_" className="top-nav__link" target="_blank" rel="noreferrer">
            <span className="top-nav__link-text">X.com</span>
            <XIcon className="top-nav__link-icon h-4 w-4" aria-hidden />
          </a>
          <a href="https://t.me/polaris_ann" className="top-nav__link" target="_blank" rel="noreferrer">
            <span className="top-nav__link-text">Telegram</span>
            <TelegramIcon className="top-nav__link-icon h-4 w-4" aria-hidden />
          </a>
        </div>
        <span className="top-nav__cta">
          <span className="top-nav__cta-full">Whitepaper coming soon</span>
          <span className="top-nav__cta-short">WP coming soon</span>
        </span>
      </nav>

      {/* ============================================
          HERO SECTION - Celestial Scene
          ============================================ */}
      <section id="main-content" className="hero-scene">
        {/* Starfield with drift animation */}
        <div className="starfield starfield--drift">
          {tinyStars.map((star) => (
            <div
              key={star.id}
              className={`star star--tiny ${star.nearPolaris ? "star--near-polaris" : ""} ${star.hideOnMobile ? "star--hide-mobile" : ""}`}
              style={{ left: star.left, top: star.top }}
            />
          ))}
          {smallStars.map((star) => (
            <div
              key={star.id}
              className={`star star--small ${star.nearPolaris ? "star--near-polaris" : ""} ${star.hideOnMobile ? "star--hide-mobile" : ""}`}
              style={{ left: star.left, top: star.top, animationDelay: star.delay }}
            />
          ))}
          {mediumStars.map((star) => (
            <div
              key={star.id}
              className={`star star--medium ${star.nearPolaris ? "star--near-polaris" : ""} ${star.hideOnMobile ? "star--hide-mobile" : ""}`}
              style={{ left: star.left, top: star.top, animationDelay: star.delay }}
            />
          ))}
          {/* Bright stars with pronounced glow */}
          {brightStars.map((star) => (
            <div
              key={star.id}
              className={`star star--bright ${star.hideOnMobile ? "star--hide-mobile" : ""}`}
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
          {/* Star emblem */}
          <Image
            src={`${basePath}/emblem.svg`}
            alt="Polaris star"
            width={320}
            height={320}
            className="polaris-star w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80"
            priority
          />
        </div>

        {/* Hero Content - CSS Grid with star zone and text zone */}
        <div className="hero-content">
          {/* Row 1: Star zone spacer - reserves space for star visual effects */}
          <div className="hero-star-zone" aria-hidden="true" />

          {/* Row 2: Text content */}
          <div className="hero-text-content">
            <div className="hero-logo">
              <h1 className="hero-title">Self-Scaling Stablecoin Operating System</h1>
            </div>

            <p className="hero-tagline">
              We&apos;re building uncorrelated, scalable returns without T-Bills, without CEXs, without compromises.
            </p>

            <div className="hero-cta">
              <a href="https://x.com/polarisfinance_" className="btn-primary" target="_blank" rel="noreferrer">
                Get updates on X
              </a>
              <a href="https://t.me/polaris_ann" className="btn-primary" target="_blank" rel="noreferrer">
                Get updates on Telegram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          STATS SECTION
          ============================================ */}
      <section className="section section--gradient">
        <div className="mx-auto max-w-7xl">
          <div className="reveal-stagger grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
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
          <h2 className="reveal section-heading">How Scalable Yield Works</h2>
          <p className="reveal section-description">
            Polaris is a triple-engine stablecoin protocol built to solve the stablecoin &ldquo;Yield Trap&rdquo;. By monetizing pETH volatility via a bonding curve, conversion mechanics, and CDP architecture, Polaris generates uncorrelated yield that scales as the system grows without counterparty or credit risk.
          </p>

          <div className="reveal--scale system-diagram mt-10">
            {/* Vertical diagram for mobile (< 768px) */}
            <Image
              src={`${basePath}/polaris-system-v2-vertical.svg`}
              alt="Polaris protocol system diagram"
              width={400}
              height={1450}
              sizes="100vw"
              className="h-auto w-full md:hidden"
            />
            {/* Horizontal diagram for tablet/desktop (>= 768px) */}
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

      {/* Compass divider */}
      <CompassDivider />

      {/* ============================================
          TOKENS SECTION
          ============================================ */}
      <section className="section section--gradient">
        <div className="mx-auto max-w-7xl">
          <h2 className="reveal section-heading">Triple-Engine Architecture</h2>
          <p className="reveal section-description">
            Three interlocking primitives power the Polaris ecosystem, designed to generate sustainable yield while maintaining robust stability mechanisms.
          </p>

          <div className="trust-strip mt-10">
            <div className="reveal-stagger trust-strip__items">
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

          {/* Blog callout */}
          <div className="reveal blog-callout mt-10">
            <div className="blog-callout__content">
              <div className="blog-callout__text">
                <p>We analyzed where USDC, USDS, USDe, and LUSD fall short.</p>
                <p>And how pUSD delivers scalable, yield-bearing stability without counterparty risk.</p>
              </div>
            </div>
            <div className="blog-callout__action">
              <Link href="/blog/why-polaris" className="blog-callout__link">
                Read the article
                <ArrowRightIcon className="h-4 w-4" aria-hidden />
              </Link>
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
          <h2 className="reveal section-heading">Stablecoin Operating System</h2>
          <p className="reveal section-description">
            The Polaris StablecoinOS is a framework to steward Polaris growth and enable selected projects to deploy their own decentralized stablecoin while benefiting from shared liquidity and protocol-level integrations.
          </p>

          <div className="reveal-stagger narrative-timeline mt-10">
            {privacyMilestones.map((milestone) => (
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

      {/* Compass divider */}
      <CompassDivider />

      {/* ============================================
          BENEFITS SECTION
          ============================================ */}
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

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="footer">
        <div className="footer__content">
          <div className="footer__brand">
            <Link href="/">
              <Image
                src={`${basePath}/full-logo.svg`}
                alt="Polaris"
                width={126}
                height={44}
                className="footer__logo"
              />
            </Link>
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
                className="footer__link footer__link--icon"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/polaris_ann"
                className="footer__link footer__link--icon"
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
