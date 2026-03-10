---
title: "Burn pETH, Mint POLAR: The Conversion Mechanism"
description: "How a single primitive connects Polaris' three engines, and why every conversion strengthens the protocol.."
date: "2026-03-10"
author: "Polaris Team"
image: "/blog/burn-peth-mint-polar-cover.png"
---

"Why does POLAR exist?"

It's a fair question, if not the most important one to ask about any protocol token. The DeFi graveyard is littered with governance tokens that exist primarily to be sold by foundations and farmers: minted out of thin air, distributed as mercenary incentives, and governed by structures that serve insiders more than users. We covered the governance problem [in our last article](https://polarisfinance.io/blog/stewardship-not-governance), and we meant every word of it: we don’t intend to add yet another tombstone to the cemetery of dead DeFi dreams.

So you could meet our claim that POLAR is different with skepticism, and that’s understandable. Let’s earn that claim instead of asserting it. This article details POLAR’s role, focusing on its cornerstone mechanism that connects it with the whole StablecoinOS: conversions.

## Why a third token?

Polaris runs on three engines: pETH, the pAssets, and POLAR. The first two [handle everything the protocol needs to function](https://polarisfinance.io/blog/bonding-curve): pETH backs the CDPs, the [Stability Pool generates yield](https://polarisfinance.io/blog/pusd-no-counterparty#pusd-self-scaling-yield), interest rates self-adjust, liquidations process autonomously. **Polaris works without POLAR**. It would mint pAssets, maintain peg stability, and generate yield just fine.

So why add a third token? Because there's a difference between functioning and scaling.

We used an inward- vs. outward-facing logic while designing Polaris' economic flows. The **inward-facing elements** \- interest rates, pETH floor growth, Stability Pool incentivization \- are all handled with pETH and the pAssets. They sustain the core. But a protocol that only looks inward doesn't grow an ecosystem around itself: it doesn't bootstrap liquidity on external DEXes, incentivize Pendle markets, or attract new teams to deploy pAssets on the [StablecoinOS](https://polarisfinance.io/blog/polaris-mints-anything#stablecoinos-many-stables-one-collateral).

**POLAR handles the outward-facing elements**: ecosystem liquidity, gauge-directed incentives, StablecoinOS onboarding. It's the growth lever, deliberately separated from the core so that the core's sustainability never depends on it. If POLAR incentives dried up tomorrow, pUSD would still mint, the bonding curve would still function, and the Stability Pool would still pay yield. The base protocol doesn't need POLAR to survive, but it scales much better with it.

This separation is the whole point. And the conversion mechanism is what enforces it.

## The conversion mechanism

Here is the core idea: after the initial distribution, new POLAR can only enter circulation one way: burning pETH.

This choice is deliberate. Like most of you, we’re not inflation fans to begin with, but this unique design enables us to align inflation with the most synergetic action someone can take in the StablecoinOS, benefitting all its participants, so it makes this special type of inflation tolerable, if not even desirable. Let's unpack how it works.

### The auction: spike-and-decay pricing

Think of a Dutch auction, as used for [Balancer LBPs](https://docs.balancer.fi/concepts/explore-available-balancer-pools/liquidity-bootstrapping-pool/liquidity-bootstrapping-pool.html) or [in Maker/Sky for liquidations](https://developers.skyeco.com/protocol/vaults/collateral-liquidation/): the price starts high and drops until a buyer bites. Polaris’ conversion mechanism works similarly.

The conversion operates as a **continuous, permissionless auction**. Anyone can convert pETH to POLAR at any time, but whether it's profitable to do so depends on the current conversion price relative to POLAR's market price.

The mechanism uses a **spike-and-decay pricing model**:

1. The conversion price starts at some level and **continuously decays** over time. Think of it as a slow drip: the longer nobody converts, the cheaper the offered price becomes, making conversion progressively more attractive.  
2. When a conversion happens, the price **spikes upward**, proportionally to the fraction of the POLAR supply that was just inflated. A conversion that mints 1% of the existing POLAR supply causes a much larger spike than one minting 0.01%.  
3. After the spike, the decay resumes, and the price drifts back down until the next conversion.

This creates a natural rhythm. The price decays until an arbitrageur spots an opportunity: the conversion price has drifted below the market price of POLAR. They execute a conversion to capture the spread. The conversion spikes the price back up, eliminating the opportunity until the decay reopens it.

![Spike-and-decay pricing chart: conversion price continuously decays over time, spikes upward on each conversion proportionally to the fraction of POLAR supply minted, then decays again](/infographics/spike-and-decay.png)

**The spike is calculated against the POLAR supply, not the pETH supply**. This is a deliberate design choice: it directs conversions toward smaller, more frequent operations rather than large, supply-shocking events. A whale trying to convert a massive amount of pETH in one go faces rapidly diminishing returns as each conversion spikes the price against them. The mechanism naturally self-regulates toward steady, incremental minting.

*Note: in practice, conversions, similarly to pUSD mintings and redemptions, will primarily be executed by arbitrage bots and MEV searchers, not by regular users. The spike-and-decay dynamics are tuned for this audience: fast, competitive, and self-correcting.*

### What happens to the burned pETH

Burning pETH through the conversion mechanism has three consequences:

1. **The market price is pushed upward** (since pETH must be acquired to be burned, this is an arbitrage operation)  
2. **The floor price is pushed upward** (detailed explainer right below).  
3. **ETH is released from the bonding curve reserve.** The ETH that was backing those burned pETH tokens is freed up. This released ETH is the conversion gain. 

The released ETH corresponds to the area under the bonding curve for the burned portion of supply. It's not a fixed amount: it's a function of the bonding curve's shape and the current supply. The more pETH that has been minted (higher supply, higher prices on the curve), the more ETH each unit of burned pETH releases.

Here's what matters: **the bonding curve's structural guarantees get better after every conversion**. The collateralization improves slightly, with the pETH market price rising from the pETH purchase by the arbitrageur performing the conversion, as well as the second ETH ⇒ pETH purchase from the released ETH. The floor price mechanism is preserved.

### The floor price only goes up

![Floor price ratchet diagram: each pETH conversion burns supply and improves reserve structure, permanently raising the bonding curve floor price — the floor can only increase or stay constant, never decrease](/infographics/floor-price-ratchet.png)

This is where conversion gets genuinely elegant. Every conversion burns pETH, reducing supply while slightly improving the reserve structure. The mathematical consequence: **the floor and market prices increase with every conversion**.

If all outstanding pETH were sold back to the bonding curve after a conversion event, the final exit price would be higher than before the conversion occurred. It's a direct consequence of reducing supply on a power-law curve.

Conversions are strictly one-way: pETH can be burned for POLAR, but POLAR cannot be converted back to pETH. The floor price can therefore only increase or stay constant. It never decreases from conversion activity.

This creates a feedback loop that benefits the entire protocol:

* **pETH holders** see a higher floor, reducing their max drawdown  
* **CDP borrowers** see their collateral's value improve: self-recollateralizing loans become even safer  
* **Stability Pool depositors** benefit from a healthier system-wide collateralization ratio  
* **The protocol as a whole** becomes more resilient with every conversion

The [bonding curve article](https://polarisfinance.io/blog/bonding-curve) covered the two mechanisms that raise pETH's floor: swap fee burns and conversions. Both are equally important. Swap fees are more frequent and enable the floor to always go up, no matter the price action on POLAR, while the conversions have a bigger floor-goes-up potential, but can be more sporadic, depending on POLAR’s and the broader market price action.

### Where does the released ETH go?

The ETH freed from the bonding curve during conversion doesn't vanish: it becomes pETH yield. But for whom and how?

![Conversion flow diagram: ETH released from the bonding curve is split between the converter rebate and the Fee Router, which buffers and distributes pETH yield to pETH Troves and vePOLAR lockers](/infographics/conversion-flow.png)

**The first step is the payment of the ETH rebate to the converter.** Once that is done, the remaining ETH are swapped into pETH and forwarded to the Fee Router.

#### Converter Rebate

**The rebate is a stewardship-controlled dial between conversion volume and system yield**. Let’s consider the two possible extremes to better illustrate it:

1. At 0%: Maximum yield to the system. Conversions are expensive because the converter gets no ETH back. This is the ideal setting when POLAR is in a bull market: people are happy to burn pETH for POLAR, and the system keeps all the yield.   
2. At 100%: Zero yield. Conversions become very attractive, with their effective cost depending on the pETH floor ratio since all burned reserve tokens are returned to the converter. This is an emergency lever: if the floor price is stalling and POLAR's market value is too low to make conversions attractive, stewardship can crank the rebate up to drive conversion volume and raise the floor. 

**The sweet spot lies somewhere in between**, and it will shift with market conditions. When the protocol needs to encourage more conversion activity (early growth phases, for instance), the rebate can be dialed up. When the protocol is mature and conversions happen organically, the rebate can be lowered to maximize protocol yield. **The core metric stewards must watch is the market cap ratio between POLAR and pETH**. When POLAR’s is bigger, running at 0 rebate is sensible; when the market cap flips, higher rebates are defensible.

The total amount of ETH released from the bonding curve is unaffected by this split. The floor price impact is identical regardless of how the pETH is distributed afterward. **The rebate reshapes the distribution of value, not the underlying collateral dynamics.**

#### Fee Router

The Fee Router is a key component of Polaris, **receiving pETH from the Conversion mechanism, as well as from the bonding curve swapping fees**. The Fee Router does a bit more than what its name suggests, as it not only routes but **also buffers the pETH** it gets to release it over time, avoiding yield spikes.

Stewardship ultimately decides where the Fee Router allocates the pETH it obtains: pETH Troves of various instances (pUSD, pGOLD, etc.), vePOLAR lockers, etc. The initial parameters are set as 100% to pETH Troves to stimulate the protocol’s early growth.

## vePOLAR: locking and earning

POLAR on its own is a token. vePOLAR is that token put to work.

By locking POLAR as vePOLAR, holders gain two things: **yield and stewardship power**. The yield comes from protocol fees, specifically, a share of the interest rate paid by borrowing any pAsset.

The stewardship powers were [covered extensively in our previous article](https://polarisfinance.io/blog/stewardship-not-governance#so-what-is-stewardship), but to recap: vePOLAR holders steward the bounded parameters of the StablecoinOS: CDP licensing, fee splits, gauge emissions, conversion parameters, and onboarding. The core protocol remains immutable and untouchable. Stewardship is about directing growth, not altering foundations.

What makes this design coherent is the alignment between conversion activity and vePOLAR value. More conversions mean:

* More pETH burned ⇒ higher floor price ⇒ healthier protocol  
* More ETH released ⇒ more yield for pETH Trove holders ⇒ more interest rates collected ⇒ more yield for vePOLAR holders  
* More POLAR minted ⇒ more potential vePOLAR supply ⇒ more stewardship participation

The conversion mechanism creates a sustainable economic loop where minting the ecosystem token directly strengthens the core protocol. Compare that to the typical DeFi model where token emissions dilute holders while providing no structural benefit to the protocol itself.

## The dilution question

Every token emission is dilutive. We won't pretend otherwise. When new POLAR is minted through conversion, existing POLAR holders see their share of the total supply decrease. This is a real cost, and it deserves honest treatment.

But consider the full picture. Each conversion that dilutes POLAR holders simultaneously:

* Burns pETH, raising the floor price  
* Releases ETH yield to vePOLAR holders  
* Strengthens the protocol's collateralization

**The dilution is productive**. Every unit of dilution corresponds to a concrete improvement in the protocol's fundamentals. This is structurally different from emission token models like CRV, where token inflation is disconnected from any direct corresponding protocol benefit. 

There's also a natural ceiling: **conversion parameters are bounded by immutable ranges**. vePOLAR stewards can adjust the conversion rate within predefined limits and **they can even set it to zero, disabling conversion entirely**; but they cannot exceed the hard cap. The protocol cannot hyperinflate POLAR because the mechanism won't allow it. 

Still, thanks to the stewardship control on the Dutch auction parameters and rebate, the mechanism can be finetuned to best fit the current market conditions. For the founding team specifically, this means progressive dilution as a structural guarantee, not a promise. The faster Polaris grows, the more attractive conversions become, the more POLAR is minted, and the more the team's initial share is diluted. We addressed this directly in [the stewardship article](https://polarisfinance.io/blog/stewardship-not-governance/): we will be more than happy with a smaller share of a bigger pie.

## What conversion doesn't do

Intellectual honesty requires naming what conversion can't solve:

* **Conversion doesn't create demand for POLAR out of thin air.** If nobody wants to hold vePOLAR (for yield or stewardship), the conversion arbitrage becomes less attractive. If the market price of POLAR is below the conversion price, then no conversions take place until the decay catches up with the market price. The mechanism assumes that vePOLAR will have genuine utility: a bet on the StablecoinOS ecosystem being valuable enough to steward, and the POLAR’s revenue streams being attractive.  
* **The spike-and-decay parameters matter.** Set them wrong and you get either too-frequent dilution (decay too fast) or stagnant conversion activity (decay too slow). These parameters are stewarded by vePOLAR within bounded ranges, which introduces a reflexivity: POLAR holders steward their own dilution rate. The bounds exist to prevent excessive inflation, and the lower bound is voluntarily 0 to enable vePOLAR holders to disable the mechanism altogether if they so choose.

## The bridge between pETH and POLAR

The conversion mechanism is a single primitive, but it carries the weight of Polaris' entire token design.

It answers "why does POLAR exist?" with a mechanism, not a promise: **POLAR exists because burning pETH to mint it is the most protocol-synergetic action possible**. It simultaneously raises the floor price, generates yield, and creates the token that powers ecosystem growth. No other protocol we're aware of **ties its token's creation so directly to the strengthening of its core collateral**.

It also answers "what stops this from being extractive?" with structure: bounded parameters, immutable core contracts, and progressive dilution that accelerates with protocol success.

We still have ground to cover. The gauge system, PolarEX integration, and the full StablecoinOS economic model all deserve their own deep dives. But the conversion mechanism is the keystone: understand it, and the rest of Polaris' token design falls into place.

**The bonding curve makes pETH work. The CDP makes pAssets work. The conversion mechanism and POLAR make them work together.**

Follow [Polaris on Twitter](https://x.com/polarisfinance_) and join the [Telegram announcement channel](https://t.me/polaris_ann) to not miss any news. You can also subscribe to [this blog's RSS feed](https://polarisfinance.io/blog/feed.xml) if that is your thing.