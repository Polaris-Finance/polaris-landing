---
title: "Stewardship, not Governance"
description: "Governance fails because of structure, not people. Here's how stewardship fixes the structure. Stewardship introduces a philosophy where structure safeguards continuity and ethical responsibility."
date: "2026-03-03"
author: "Polaris Team"
image: "/blog/stewardship-not-governance-cover.png"
---

Governance is broken; always has been, but it becomes more apparent as DeFi protocols grow. Undisclosed conflicts of interest, bloat, outsized founding team weight, forums/votes serving as stamping devices for deals discussed in the backroom, etc. We can keep going for days: **there is no defending governance in 2026**, and anyone telling you otherwise has a governance token to shovel down your throat, or is actively extracting from said governance.

So what then? Full immutable protocols, UniswapV1 style, with no parameters that could ever change? It’s clean, but not suited to all use cases. We have found an in-between, a **clearly scoped and limited governance structure**, a design which protects the base protocol from being compromised by its governance. It’s so different from what is usually done, calling it governance would be a disservice. Stewardship finds a balanced path: it respects immutable foundations while empowering humans to exercise discernment only where judgment truly matters

Introducing **stewardship**.

Stewardship is more than a process: it is a philosophy guiding action, responsibility, and long-term alignment with the community’s vision. This article will explain precisely what it means, but before we get to that point, let us reflect on what got us here: why is governance failing, over and over again? 

## Why not governance?

The answer is rooted in common sense and practical observations: **we simply could not witness any well-functioning governance system operating on mainnet**.

![Table mapping five governance failure patterns — conflicts of interest, undefined scope, capture, privatized revenue, excessive compensation — against Maker, Aave, and Uniswap.](/infographics/stewardship-governance-graveyard.png)

Maker? Denatured the base protocol, chased every trend and changed its grand masterplan every 6 months, ended up creating customized markets to enable the founder to max borrow on his SKY stash, etc. We told [the story of the wannabe-phoenix, forever pigeon](https://tokenbrice.xyz/why-polaris/) already. The Maker example shows how unanchored governance can betray long-term vision; stewardship prioritizes stability and alignment over opportunistic shifts.

Aave? We have direct experience here. TokenBrice served and for a short time, led the GHO liquidity committee and [flagged the absurd levels of conflicts of interest](https://tokenbrice.xyz/farewell-glc/), two years before the issue became so undeniable that the community demanded reform. When a proposal to enforce basic disclosure norms finally surfaced, it got rejected with no votes [coming from entities failing to disclose conflict of interest](https://x.com/i/status/2022061928600986101). **The system failed to self-correct and actively resisted the cleanup**.

Uniswap? Here the situation is interesting, as the base protocol is protected from governance overreach, since it can only control the FeeSwitch within predetermined bounds. Still, governance controls the UNI token, and the usual extraction, gaslighting, and manipulations took place. **Even when the base protocol is protected, operating an unscoped governance is like asking for extraction to happen**. Even protected cores are vulnerable to influence; stewardship highlights that ethical boundaries and clear scope are essential to safeguard the protocol’s essence.

We’re not going to detail the situation for every DAO, these three major protocols are enough to paint the picture, and highlight the recurring issues:

- Conflict of interests, sizable, undisclosed, everywhere  
- Unclear, undefined governance scope, paving the way for repeated base product denaturation and extractive behaviors  
- Capture of governance by the actors with the most visible public platforms, and professional entities designed for that very purpose  
- Privatization of revenue streams that rightfully belong to the DAO and token holders  
- Excessive compensation of service providers, which often provide minimal context on their fund usage, but still successfully renew their contract with the DAO because of their aura

The stewardship design has been established precisely to face the many shortcomings we’ve observed in governance.

## So what is stewardship?

Overall, we align with [Hayden’s (Uniswap founder) tier list](https://x.com/haydenzadams/status/1710510768469237827?s=20) on the three main ways to solve problems for a DeFi protocol:

![Inverted funnel showing Polaris's three decision tiers from bottom to top: Automate (core mechanics), Incentivize (economic levers), Steward (CDP licensing, gauge emissions, StablecoinOS) — with vePOLAR at the apex.](/infographics/stewardship-scope-funnel.png)

Polaris overall is built using this philosophy: interest management is fully automated, incentives are in place where needed, such as to ensure that the stability pool is supplied, and only what cannot be solved by automation or incentives is placed on the shoulders of stewardship. We preserve the time and attention of our vePOLAR holders for topics where it is truly needed.

We've been deliberate about not pushing to stewardship what can be handled other ways. **The core protocol logic is set, and cannot be altered**. What stewards handle is a set of quantitative parameters that are constrained within immutable ranges, along with the POLAR token, the IP, and the StablecoinOS.

Our implementation strictly follows Hayden’s perspective: what can be automated, is. What can't be, is incentivized in a durable, sustainable and predictable way. And only what remains, what requires qualitative appreciation, is handed to vePOLAR holders.

### The Core is Immutable 

We’ve seen too many stablecoins being denatured by their governance to risk it. The core of the model is immutable, ensuring that users never wake up one day to critical functions being altered. Some foundations must remain untouched to guarantee continuity, trust, and user confidence.

![Diagram of a locked hexagonal core (bonding curve, CDP logic, liquidations, redemptions, stability pool) surrounded by six bounded stewardship levers that governance can adjust but not bypass.](/infographics/stewardship-immutable-core.png)

The bonding curve contract is fully immutable: no shenanigans allowed with the collateral. The CDP logic, stability pool, liquidations, etc. are all enforced by immutable contracts as well, with some bounded variable parameters governed by vePOLAR. This ensures that the Polaris you know and understand at day 1 will remain the same as the protocol grows. No need to reverse-engineer the protocol logic after each governance vote.

### Stewardship is mostly about the StablecoinOS

Where stewardship input is needed is at the edges: the StablecoinOS, the POLAR token parameters, and the intellectual property built by Polaris. Here is the full scope of what stewards control, and critically, each lever is bounded:

| Domain | Power | Constraint |
| :---- | :---- | :---- |
| **CDP Licensing** | Grant teams the right to deploy a new pAsset using Polaris infrastructure | License terms are standardized |
| **CDP Parametrization** | Fee and yield splits, like the interest rate split & other yield distribution related parameters | All parameters are bounded within min and/or max value |
| **POLAR Conversion / Inflation Rate** | Control parameters of the pETH → POLAR conversion mechanism  | Bounded within a predefined range; can be set to 0 (=conversion disabled) but has a hard cap |
| **StablecoinOS Onboarding** | Whitelist new participants into the fee-sharing and gauge system  | Participant must opt-in to fee sharing with vePOLAR and build on top of pETH/pAssets |
| **Gauge Emissions** | Direct POLAR incentives to any component of the StablecoinOS  | \~25% of supply earmarked over 4 years, participants must be onboarded to StablecoinOS |
| **Treasury Positions** | 16.4% of total POLAR supply for Treasury, 8.2% committed to the Polar Council program (similar to veAERO’s Flight School) | Initially managed by team until a management framework is set and providers step up |

This is not a toy: stewards have real power, but also real responsibility. A stewardship vote can bring a new pAsset into existence, or redirect incentives across the ecosystem. What it cannot do is alter the redemption mechanism, change the bonding curve logic, or the liquidation logic. The core is out of reach; by design.

**The sovereign control over the intellectual property developed by Polaris** is a key dimension that sets stewardship apart. The CDP infrastructure is not just open code anyone can fork: teams are granted a license to deploy it within the StablecoinOS. This makes stewardship the true gatekeeper of ecosystem growth, not just a parameter-tweaking committee.

Consider a team building pCHF. They reach out to the Polaris team to enquire and refine their proposal. Once they are ready, they burn a set amount of pETH (anti-spam / seriousness filter) to submit their application. The Polaris team (and stewardship service provider once appointed) will assess the applicant, and produce an informative report. Stewards evaluate the proposal and vote. If approved, the team deploys using Polaris infrastructure, joins the StablecoinOS, and becomes eligible for gauge emissions. That's it: stewardship enabled ecosystem growth without touching a single core contract. This design is still to be implemented and will be refined as mainnet approaches.

What if the stewards fail, such as granting a license to a team delivering a low-effort protocol that does not succeed? Well, the base design is resilient to this: since such a protocol will capture a marginal portion of the pETH supply as collateral, it will receive marginal incentivization. Stewards are entrusted with real power, but the base protocol's immutable core limits the blast radius of any bad decision. The design reflects resilience: the system absorbs errors, trusting stewards to act responsibly while safeguarding the base protocol.

So how does stewardship answer our governance critiques? Let’s look at it item by item. 

* Conflict of interests? Stewardship scope is bounded, so there's less to capture. Stewardship channels human power where it matters, reinforcing ethical engagement and minimizing opportunities for extraction.  
* Undefined scope? The table above is the full list.   
* Capture of governance? This one is mostly up to you, but with real power granted to the stewards, the community will mobilize.   
* Privatization of the revenue streams belonging to the DAO/holders? All flows to vePOLAR, the DAO has a solid share of the initial vePOLAR to ensure its sustainability.   
* Excessive compensation of service providers? Again, mostly up to you, but the bounded scope means there's less to overpay for in the first place.

Now, before we explain how this is enforced with POLAR, let’s address the hot question: what about the founders’ influence over the protocol? Will the founders raid the DAO coffers every 6 months \- 1 year as seen with Maker and Aave?

### What about the founders?

Yes, we (the team) will have a team allocation of vePOLAR: we believe in what we do, and want exposure to it. Unlike regular teams raising money from others to fuel their dreams, our first step was to source $500k from the team itself, with a Founders Round: **every single team member and advisor of Polaris invested into the project**.

Does this mean that POLAR Stewardship will be our domain? Not necessarily. To be perfectly honest, our influence will be outsized at first: this is by design. We need to be able to steer Polaris on a growth trajectory. As we do so, and Polaris grows into a DeFi powerhouse, it will attract new participants, and we will be progressively diluted thanks to the conversion mechanism bringing new POLAR into existence. The faster Polaris grows, the more attractive POLAR becomes, the more conversions, the more we are diluted: as Polaris succeeds, it will quickly dilute us. The mechanism is self-adjusting: if Polaris is an overnight success, we will be promptly diluted, if not, more slowly. We will be more than happy with a smaller share of a bigger pie: that’s our goal. 

## Synergetic Token Design

**POLAR is designed to enhance Polaris and help it scale**, not to take from it. It’s not involved at all in the backing of pAssets, and not required for the system to function. Polaris scaled much better with POLAR, but would still function without it. POLAR acts as a lever for **collective growth**, not personal gain: philosophy guides design, ensuring incentives benefit the system, not individuals.

![Split diagram: inward panel shows pETH and pUSD sustaining the protocol; outward panel shows vePOLAR directing POLAR incentives to the ecosystem. A bridge arrow marks the burn-pETH/mint-POLAR conversion.](/infographics/stewardship-inward-outward.png)

What follows is an overview of POLAR and how it connects to stewardship. We'll dive deeper into POLAR's specifics in a dedicated article.

We used an inward- vs. outward-facing logic while designing the fee flows:

1. **Inward-facing elements**, such as the interest rates, pETH floor growth, or stability pool incentivization, are all handled with the pAssets and pETH.  
2. **POLAR is here for the outward-facing elements**, the ecosystem around the pAssets, such as the incentivization of liquidity pools, markets on Pendle, etc.

This logic is the core of what enables the stewardship model: with the core of the protocol being immutable, and incentives purely stemming from protocol usage \- in hard assets like pETH or pAssets \- the bases are covered, ensuring that the protocol is sustainable on its own. It allows for POLAR and the StablecoinOS designs to come as **supplementary layers** on top of that sturdy foundation, to grow and strengthen it.

The conversion mechanism is the key connecting POLAR to Polaris, as it **enables new POLAR to be minted, but only by performing the most Polaris-synergetic action possible: burning pETH**. This means more yield for protocol participants and a higher floor for pETH, benefiting not only pETH holders, but the entire pAsset ecosystem.

## Structure Over Trust

![Two-column comparison: "Promise" lists governance assumptions crossed out in red; "Guarantee" lists structural enforcements — immutable contracts, bounded parameters, on-chain verifiability, no trust required.](/infographics/stewardship-promise-vs-guarantee.png)

Governance doesn't fail because of bad people; it fails because of bad structure. Unlimited scope, unclear boundaries, and misaligned incentives turn every DAO into an extraction arena eventually. Stewardship is our answer: bounded scope, an immutable core, and a token design that rewards alignment through yield and influence.

We don't claim this is battle-tested at scale, since it isn't, yet. But every design choice here was forged from watching governance fail firsthand. As the StablecoinOS grows, stewardship will be stress-tested by real stakes and real participants. The founding team's progressive dilution through conversions ensures that the system trends toward broader participation. This is not a promise that will quickly turn into a compromise once the vesting cliff is reached; it’s a guarantee, enforced by immutable code. No trust required here.