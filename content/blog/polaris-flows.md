---
title: "Sustaining the Ecosystem: pETH & pUSD Flows"
description: "How Polaris replaces emission-style incentives with an autonomous, hard-asset distribution system to sustain the pETH and pAssets ecosystems."
date: "2026-04-13"
author: "Polaris Team"
image: "/blog/polaris-flows-cover.png"
---

Ecosystem incentivization is where good tokenomics go to die.

The pattern is familiar: a DAO votes to emit a chunk of its native token, farmers capture it, dump it on long-term holders, and the resulting TVL evaporates the moment emissions expire. Backroom deals decide which protocols get subsidized. A sweet layering of business development, relationship games, reputation politics, and forum posts ghostwritten by paid service providers help to obsfucate the situation further. The users, whose deposits actually produced the fees sustaining the whole charade, get whatever trickles down after the BD table takes its cut.

When we started designing Polaris's ecosystem layer, our first instinct was to build the usual thing — better, but still the usual thing. It was called PolarEX: a DEX built natively around the pAssets, with gauges, emissions, and a POLAR budget plumbed into Pendle, Yearn, and friends. Compelling on paper, and a genuine improvement over the emissions-to-mercenaries template, since at least the fees would help grow the ecosystem. Heavy in practice as it came with sizable implementation complexity, added surface area on the POLAR token model, and ultimately inherited the same "governance picks winners" failure mode [stewardship](https://polarisfinance.io/blog/stewardship-not-governance) was built to avoid.

So we went back to the drawing board, and found something better.

**The pETH and pUSD Flows: a fair, simple, and contract-enforced model that autonomously distributes protocol revenue to the contracts building on top of Polaris — denominated in hard assets, not POLAR emissions, and requiring no gauges, no bribes, and no backroom deals.**

And since this affects POLAR directly, the headline up front: Flows let us redirect the 25% POLAR emissions budget we had [earmarked for gauges](https://polarisfinance.io/blog/stewardship-not-governance#so-what-is-stewardship) to growth initiatives, under POLAR's stewardship. We'll get back to this later on, but first, let's discuss the Flows.

## Let There Be Flows

The core idea is to enable any contract holding pUSD or pETH to become the recipient of incentive Flows stemming from protocol activity. Concretely:

1. **For pETH** — any pETH-holding contract: a Polaris pUSD CDP, a Polaris pGOLD CDP, another pAsset instance, or an integrator building on top of pETH (such as a Yearn vault, or a Pendle market).
2. **For pUSD and other pAssets** — any contract holding the pAsset such as a liquidity pool, a yield vault, a Pendle market, or a structured product.

The model is elegant, simple, implementable in fully immutable code, and able to function without any user input. Stewards still have a role — an important one — but only at the edges. **It distributes value efficiently within the ecosystem without requiring active and constant participation from stewardship: perfectly Polaris-aligned.** The same logic applies to both pETH and pUSD/pAsset Flows, with minimal specificities. Let's dive in.

### Autonomous, Predictable, and Contract-Enforced

Flows must be transparent, tamper-proof, and fair. So they work on a simple but powerful idea: **the Flow any contract receives is defined by the share of the underlying asset that contract holds.**

The pUSD CDP is growing fast and holding 50% of the whitelisted pETH supply? It receives 50% of the pETH Flow. DeFiSaver did a killing with their integration and hosts 20% of the whitelisted pETH supply ⇒ 20% of the Flow. That's the entire base rule. Now let's explore the nuances of it.

### Stewards Protect the Flows

Implementing the concept literally — flowing to any pETH or pUSD holder anywhere onchain — would be impractical: the system would waste gas on contracts holding 0.001% of supply, and would invite trivial gaming. It needs a gatekeeper. This is precisely the job stewardship was designed for: a bounded role with real power and a short list of responsibilities. For the regular distribution to function, stewards do nothing at all. They just control **the Flow Whitelist.**

Beyond gatekeeping, stewards hold genuine leverage: they can negotiate terms with integrators receiving Flows, and can cancel a whitelisting, ending reception entirely. But before we get to the game theory, let's specify how whitelisting works.

### Flow Whitelisting Votes

To be eligible for receiving a Flow, a contract must first be whitelisted. A Flow whitelist vote has four parameters, all required:

1. **Observed Address** — the contract whose pETH/pAsset balance is used in the computation (can differ from the recipient).
2. **Recipient Address** — the address that actually receives the Flow.
3. **Weight** — a multiplier applied to the observed balance. Bounded to [0.1, 1]. Default: 1 for Polaris CDPs, 0.5 for standard integrators.
4. **Fixed Minimum** — a synthetic minimum balance counted in the computation even when the observed balance is lower. Decays linearly over 4 weeks. Intended to kickstart a newly-onboarded pAsset deployment that has not yet accumulated pETH collateral, without locking the subsidy in permanently.

On Polaris Stewardship, the vote is a simple yes/no. A concrete whitelisting proposal might look like this:

***Whitelisting of the Yearn pUSD vault for pUSD Flows: YAY/NAY***

- **Observed address**: Yearn pUSD vault address
- **Recipient address**: same if the vault can handle delivery, else an intermediary distributor contract
- **Weight**: 0.5 (standard for non fee-sharing integrator)
- **Fixed Minimum**: 0

Stewardship votes on the proposal and, if accepted, the Yearn pUSD vault is enrolled in the pUSD Flow system. From that point on, it receives its due share of the pUSD Flow based on its percentage of pUSD ownership (relative to all other whitelisted contracts) and its weight.

The same system applies to both pETH and pUSD Flows, with independent whitelists for each.

## Where the Flow Comes From

Both the pETH and the pUSD/pAsset Flows are sustainably funded from protocol revenue — not from emissions, not from treasury. Let's zoom into each source, starting with the more straightforward one.

### pETH Flow Source

There are two primary sources for the pETH Flow:

1. **Bonding curve swap fees.** Every time pETH is swapped against [the bonding curve](https://polarisfinance.io/blog/bonding-curve) — its primary liquidity source — a fee is charged in pETH and burned.
2. **POLAR conversions.** [The conversion mechanism](https://polarisfinance.io/blog/burn-pETH-mint-POLAR) requires burning pETH to mint new POLAR.

In both cases, the burned pETH pushes the floor price upward and releases ETH from the bonding curve reserve. That ETH is then swapped back into pETH against the curve (which in turn pushes the market price upward), and *that* pETH is what the Flow system distributes.

Here is the full event chain: pETH burn (= floor price rises) ⇒ ETH are released from reserve ⇒ they swapped to pETH (= market price rises) ⇒ the obtained pETH are distributed in the Flow.

Each burn quietly strengthens the protocol's collateral position *and* feeds the ecosystem layer. The same primitive doing two jobs at once.

Before a pETH even enter the Flows, it already served the ecosystem twice, and its job is not done.

![Diagram: pETH Flow funding. Bonding curve swap fees and POLAR conversions burn pETH, which releases ETH from the reserve; that ETH is swapped back into pETH and routed into the pETH Flow for distribution to whitelisted contracts.](/infographics/peth-flows-source.png)

pETH Flows have no internal constraints: 100% of the Flow is up for grabs.

### pUSD/pAsset Flow Source

For pUSD and the other pAssets, **the primary source is the interest rate paid by borrowers of the asset**. Before the Flow pays out, though, the system must honor constraints: [the Stability Pool](https://polarisfinance.io/blog/pusd-no-counterparty#pusd-self-scaling-yield) must remain appropriately funded to ensure sufficient liquidity for liquidations, vePOLAR holder must be paid out.

Given its critical role, the Stability Pool is paid out first, then vePOLAR (~10-15%) and then Flow game plays out on the remainder. **The Flow Share to Stability Pool is a stewarded parameter with a hardcoded minimum currently envisioned around 30%** to ensure the pool always has enough to process liquidations.

## Flows vs Gauges

Before we get to the game theory, a side-by-side. The structural differences between the emission-gauge model and Flows are the point of the whole redesign:

| | Emission gauges (status quo) | Polaris Flows |
|---|---|---|
| **Currency** | Governance token, emitted and dilutive | Hard assets — pETH and pAssets |
| **Funding source** | Constant emissions | Perpetual protocol revenue |
| **Allocation** | Gauge votes, bribes, backroom deals | % of actual asset held, auto-computed |
| **Reward recipient** | Whoever farms the gauge fastest | Contracts whose users produced the fees |
| **Alignment** | Rewards lobbying, visibility and vested interests | Rewards capture and usage |
| **Governance load** | Epoch votes, weight wars, constant bribe markets | One onboarding vote per participant |
| **Sustainability** | Dries up when emissions or token price lower | Scales with protocol activity forever |

The gauge model isn't entirely broken — it's what built Curve, Balancer, and Aerodrome, and those are legitimate achievements. But it requires a constant emission of the token which wasn't a fit for Polaris. POLAR emisssions exists, but only through the Conversion mechanism which strengthen the whole ecoystem.

## Flow Game Theory

Now that the stage is set, we can focus on the more subtle benefits of the Flow system.

### Doubling Down on The Winners

The best way for an integrator to maximize the Flow it receives is to attract more pETH or pUSD. Flows are a self-reinforcing feedback loop. And they are **completely fair game** — in our examples we keep reaching for household names like Yearn because they're familiar, but nothing stops an up-and-coming vault provider from breaking into the Polaris game and capturing a large share of the pETH supply. If they do, they receive their due share of the Flows automatically. Flows replace a system that is usually informal, relationship-based, and optimized for the few integrators with the most political capital.

**Flows are ultimately destined for users, who are their final recipients**. Let's illustrate it: imagine Yearn pUSD vault captures 20% of the whitelisted pUSD supply. That vault then receives 20% of the pUSD Flow — **in pUSD, not in POLAR**. Those pUSD land in the vault, get distributed to depositors, and show up directly as extra yield on top of whatever the vault was earning before. No token to sell, no farming-and-dumping, no waiting; just extra rewards, paid in-kind. It continues as long as the vault keeps holding pUSD and remain whitelisted.

**Another neat property of Flows: they scale with size**, unlike most incentivization schemes. No artificial ceilings. If Yearn doubles its pUSD share while every other whitelisted contract stays flat, they double their Flow share. As simple as that.

Ultimately, **the base input of the system remains the pETH and pUSD holders, voting with their wallets**. Where they allocate their assets determines who receives how much of the Flow. Instead of gating incentive allocation behind forum posts, governance calls, and business development relationships, Polaris Flows bring it into the open, with a predictable system anyone can audit and participate in.

### Stewards as Negotiators

![flow-negotiations](/infographics/flows-negotiation.png)

The **weight** parameter is where stewards earn their keep. It's a multiplier applied on top of the base ownership share, and it determines the effective Flow a given contract receives. Its purpose: to ensure that Polaris CDPs — which revenue-share back into the Polaris ecosystem — sit on equal footing with integrators that might not.

Let's illustrate with a 10,000 pETH system state across whitelisted contracts:

| Integrator | Weight | pETH Held | Computed Hold | Flow % |
|---|---|---|---|---|
| Polaris pUSD CDP | 1 | 5,000 | 5,000 | 57.14% |
| Polaris pGOLD CDP | 1 | 2,500 | 2,500 | 28.57% |
| Yearn pETH | 0.5 | 1,250 | 625 | 7.14% |
| DeFi Saver pETH | 0.5 | 1,250 | 625 | 7.14% |

Now imagine Yearn wants to revenue-share back with the Polaris ecosystem — for instance, by burning a share of the pETH vault fees they collect. They petition stewardship, present the fee-sharing proposal, and trigger a new whitelisting vote with the same parameters except for an updated weight:

| Integrator | Weight | pETH Held | Computed Hold | Flow % |
|---|---|---|---|---|
| Polaris pUSD CDP | 1 | 5,000 | 5,000 | 53.33% |
| Polaris pGOLD CDP | 1 | 2,500 | 2,500 | 26.67% |
| Yearn pETH | 1 | 1,250 | 1,250 | 13.33% |
| DeFi Saver pETH | 0.5 | 1,250 | 625 | 6.67% |

Here we showed a weight of 1, but if the revenue share isn't as generous as what the Polaris CDPs contribute back, stewardship could land on an intermediate figure like 0.75. Negotiation happens in the open, the math is auditable, and the result is a dial stewards can turn without ever touching the core protocol.

### Stewards as Enforcers

Beyond negotiation, **stewards also play the role of enforcers**. Let's consider, for the sake of the example, that a vault provider — we'll call them Deceiver — plays nice at first. They get onboarded at weight 0.5, grow, negotiate with stewardship over a revenue-sharing agreement, and get bumped to weight 1.0. All goes well for a while. Until one fateful morning, stewards notice that the revenue share they were promised isn't being burned as announced, but is being quietly pocketed by Deceiver's team. **Time for stewardship to bring out the hammer.**

⇒ Deceiver's pETH vault whitelist is terminated. So is any other Deceiver whitelist across the system. And the Deceiver team is now persona non grata in Polaris stewardship, meaning they've effectively renounced all future Flows, just to pocket a few days of revenue. **The downside is maximal and permanent, for a transient and minimal benefit.** We believe no team will ever try. But if they do, Polaris stewards will be more than happy to swing the hammer.

### A pAsset Quickstart Engine

Another key objective of the pETH Flow, specifically, is to **enable the quickstart of a new pAsset deployment** — this is what the **Fixed Minimum** is for. It allows a new CDP instance to receive an outsized share of the pETH Flow relative to its current pETH ownership, creating an incentive rush during the deployment's early days and **solving the cold-start problem.**

For example: a pCHF deployment could be onboarded with a Fixed Minimum of 5,000 pETH, meaning it is computed as holding 5,000 pETH in the Flow formula even if the actual balance is near zero. The Fixed Minimum decays linearly over 4 weeks, so the subsidy fades as the deployment's organic pETH collateral grows in.

Yes, this means other pETH Flow recipients see their effective Flow slightly lowered during that period. But it **enables stewardship to invest in the growth of a new Polaris CDP instance**, which in turn revenue-shares pAsset interest back to vePOLAR and helps diversify the debt composition of the system. A net win for the whole Polaris ecosystem. The Fixed Minimum was designed for new Polaris CDP onboarding, but could also be used to quickstart other ventures maximally synergic with Polaris.

## Flows Are as Good as Their Stewards

Flows solve a lot of limitations observed in DeFi protocols, but they can only do so with aligned stewards:

- **Flows measure holdings, not intent.** A whitelisted contract that parks pETH without contributing anything useful to the ecosystem still receives its share of the Flow while the whitelist stands. The defense is stewardship: parasitic holders should never get whitelisted in the first place, and if they slip through, they get kicked out. Cheap to fix, but it *does* require stewards to stay awake.
- **Whitelists can be lobbied without vigilance.** Any system with a human-controlled whitelist is subject to influence. Stewards still need to judge each application on its merits. Like all stewardship powers, this one is bounded, auditable, and reversible, but not automatic.
- **Deceiver detection isn't instantaneous.** Stewards will need vigilance, but the full onchain enforcement makes it easy: the community will need to step up with dashboard and tracker to ensure a smooth stewarding.
- **The Stability Pool gets paid first, for good reason.** The floor on the SP share is hardcoded, not a suggestion. In stressed conditions, the SP can absorb more than the minimum if stewards decide the situation demands it. This means the pUSD Flow can get compressed when the protocol is under the most pressure — which is exactly the moment it should be, because the SP is what keeps the protocol solvent. We consider this a feature, not a bug.

## A Recentered POLAR Tokenomics

With Flows handling ecosystem incentivization at both the local level (pUSD and pAsset Flows) and the global level (pETH Flow), the gauge system becomes unnecessary. The POLAR budget we earmarked for it — **25% of total POLAR supply, over the first four years**, [detailed in the stewardship article](https://polarisfinance.io/blog/stewardship-not-governance#so-what-is-stewardship) — is no longer needed for that purpose.

These tokens will instead be using sparingly to stenghten the whole Polaris ecosystem, including the treasury vePOLAR position and be subject to stewardship allocation sign-off and budgeting. With Flows, the picture becomes much cleaner: **apart from the team/investor allocations and this ecosystem growth budget, every single new POLAR will require a pETH burn to be brought into existence.**

Every new POLAR ⇒ a pETH burn ⇒ a higher floor price ⇒ more ETH released from the bonding curve ⇒ more yield into the Fee Router ⇒ more yield for vePOLAR holders and pETH Troves. [The conversion mechanism](https://polarisfinance.io/blog/burn-pETH-mint-POLAR) was already the most Polaris-synergetic action in the system. Flows let us make it the *only* way POLAR is minted post inception.

The alignment tightens. The spotlight comes fully back to conversions, which is where it should have been all along. And the flywheel closes: deposits bring pETH, pETH backs CDPs, CDPs pay interest, interest feeds Flows, Flows make integrators want to capture more pETH and pUSD, that capture brings more deposits. Growth in any part of the system now directly feeds yield to every other part — without a single POLAR being emitted along the way.

## The Eternal Immutable Engine, Carefully Stewarded

Flows are elegant, yet intricate. They solve ecosystem incentivization — one of the hardest problems in DeFi — while placing minimal weight on stewards' shoulders. In normal circumstances, stewards have nothing to do. The Flows just flow. Stewards step in only to onboard a new participant, adjust a weight following a successful negotiation, or swing the hammer on a rogue one.

The whole team fell in love with this design because it embodies Polaris's philosophy to perfection: **by default, it just works, no input needed.** Stewards are there for the added layer requiring human appreciation, helping to fine-tune the humming of an immutable and unstoppable machine.

Structure over trust, once again. Incentive allocation, something DeFi has historically handled through relationships, governance votes, and reputation, is reduced to an auditable formula running on immutable contracts. The distribution is denominated in the assets users actually care about. The stewardship load is bounded to the few moments where human judgment is load-bearing. And the only way to mint POLAR is still to strengthen the core collateral.

The Flows are Polaris's Eternal Engine: they will provide, and the stewards are its keepers.

Follow [Polaris on Twitter](https://x.com/polarisfinance_) and join the [Telegram announcement channel](https://t.me/polaris_ann) to not miss any news. You can also subscribe to [this blog's RSS feed](https://polarisfinance.io/blog/feed.xml) if that is your thing.
