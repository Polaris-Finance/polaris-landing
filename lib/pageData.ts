import {
  AwardIcon,
  Link2OffIcon,
  LockKeyholeIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  ZapIcon,
} from "@/components/icons";
import { ComponentType, SVGProps } from "react";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type HeroStat = {
  value: string;
  label: string;
  Icon: IconComponent;
};

export type TokenInfo = {
  name: string;
  tagline: string;
  description: string;
  iconSrc: string;
  color: "pusd" | "peth" | "polar";
};

export type NarrativeMilestone = {
  title: string;
  bullets: string[];
};

export type BenefitHighlight = {
  title: string;
  bullets: string[];
  Icon: IconComponent;
};

export const heroStats: HeroStat[] = [
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

export const tokens: TokenInfo[] = [
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

export const narrativeMilestones: NarrativeMilestone[] = [
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

export const stablecoinOSMilestones: NarrativeMilestone[] = [
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

export const benefitHighlights: BenefitHighlight[] = [
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
