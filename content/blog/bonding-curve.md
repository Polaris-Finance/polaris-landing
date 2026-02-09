---
title: "The Bonding Curve: Polaris' Secret Weapon"
description: "How a single mechanism enables pETH's rising floor, guaranteed liquidity, and protocol-wide value capture."
date: "2026-02-09"
author: "Polaris Team"
image: "/blog/bonding-curve-cover.png"
---

The bonding curve structures a continuous, transparent, and non-arbitrary relationship between supply, demand, and price, allowing the system to adjust without central authority or discretionary intervention.

Trust no longer stems from a promise, but **from a shared rule**: observable, verifiable, and collectively accessible. **Value then emerges from use, exposure to risk, and duration**: money ceases to be a state and becomes a process transparently enforced onchain.

You've probably used a bonding curve without knowing it, they are everywhere: Uniswap, Curve, Pump.fun. etc. Most are designed for trading but Polaris uses one for something else: creating a collateral with guaranteed liquidity and a floor price that only goes up.

Polaris is made of three synergetic products: pUSD, pETH and POLAR. Each has relevance on their own and are competitive within their own vertical, but the real magic happens with the synergy they achieve together: they are the three engines of Polaris. Today, we will put the spotlight on one in particular, pETH, and the bonding curve used to back it.

## Starting with the basics: what’s a bonding curve?

From a user perspective, a two-way bonding curve enables swaps, just like a regular AMM pool (constant product) would do. Yet, there is a key difference: **bonding curves do not require liquidity providers**. Indeed, a bonding curve enforces a mathematical relationship between a token price and its supply:

- When demand rise and more tokens are minted/bought, the price increases  
- When tokens are burned/sold, the price decreases

It allows **instant, guaranteed liquidity without needing a counterparty.** Bonding curves are a specific type of AMM, where tokens are minted or burned as they are bought and sold. Buying the token adds to the reserve and mints new tokens. Selling tokens withdraw from the reserve and burn the sold tokens.

Before we dive into Polaris’ pETH bonding curve, let’s explore some live examples of bonding curves you might be familiar with.

### Pump.fun

Whether we like it or not, Pump.fun is probably the most well known example of bonding curves used in DeFi, although the implementation and purposes differ vastly from pETH’s bonding curve. On Pump.fun, the goal is to attract sufficient early liquidity for a memecoin: users deposit SOL, and obtain a given memecoin, until a certain amount of SOL (\~86) is reached: then the memecoin “graduates”, and the SOL raised are paired with the memecoin to establish a liquidity base on a regular AMM.

Thanks to its smart usage of a bonding curve enabling automated liquidity management, Pump.fun democratized and standardized memecoin production, for better or worse. It’s a useful example to better understand what bonding curves can do, yet there are two main differences between Pump.fun and pETH bonding curves:

1. **Purpose**: On Pump.fun, the bonding curve is used to raise capital for liquidity supplying; with Polaris, the bonding curve is used to back pETH.  
2. **Temporality**: the Pump.fun bonding curve is a mechanism that is terminated once the capital is raised (graduation), pETH bonding curve is forever.

Beyond Pump.fun, bonding curves are quite the DeFi staple, harnessed by many protocols. If you’ve done a bit of DeFi yourself, it’s likely that you’ve already interacted with one, even without knowing it:

- Technically, every single AMM uses a bonding curve, be it constant product (Uniswap v2), virtual bonding curves within price ranges (Uniswap v3), or a mix of constant product and constant sum (Curve’s StableSwap).  
- [Nexus Mutual (Insurance) previously used bonding curves](https://docs.nexusmutual.io/protocol/nxm-token/history-capitalisation-controls/) in an interesting fashion to ensure coverage price scales upward with demand, and matches the effective available capacity.  
- Aavegotchi used a bonding curve for the [distribution and pricing of their GHST token](https://wiki.aavegotchi.com/en/curve)

## What’s unique with pETH bonding curve?

pETH bonding curve is a **two-way curve**: it enables swaps from ETH to pETH and from pETH to ETH. One of its unique characteristics is that it **enforces an ever-rising price floor for pETH** (in ETH terms), stemming from several mechanisms:

- A fee is charged on each swap, in pETH, and burned ⇒ the floor rises with each interaction  
- A novel mechanism connects pETH and POLAR, the conversion auction. New POLAR tokens can be minted through this mechanism, which requires the burn of pETH ⇒ the floor rises with POLAR minting.

The rising floor is a very desirable property for pETH, and not only as a safety hatch for its holders: it **enables the whole protocol to capture value with each interaction, and secure a fair value to be redeemable by all participants, regardless of the market conditions**:

![Staircase chart showing pETH's rising floor price over time, with each step triggered by swap fee burns or conversion auctions that burn pETH to mint POLAR](/infographics/rising-floor-mechanism.png)

Looking for more details to understand the bonding curve shape and maths? Right below:

### Bonding Curve Parametrization

The bonding curve follows the formula **alpha\*Q^beta**.

* **alpha** is a scaling parameter of little importance  
* **beta** is the exponent of the power law and determines the bonding curve behaviour  
* **Q** is the supply of pETH.

As the supply increases the price of pETH (measured in ETH) increases. Beta determines the relationship between the pETH supply and the pETH price.

The choice of beta is vital for the dynamics of pETH. A large beta decouples pETH from ETH and it behaves like a volatile asset. Small betas on the other hand tightly couple pETH to ETH. Polaris will use a beta around 0.3 to closely couple pETH to ETH but allow it enough freedom for interesting dynamics. The exact final beta value will be disclosed closer to launch. 

## pETH, beyond the CDP

While pETH is a prime and tailor-made collateral for Polaris CDPs, it has a life on its own as well\! Several actually. We’ll consider them one by one:

### ETH Loans: pETH loops

The first other life of pETH is enabled directly by the bonding curve, and its interaction with the CDP protocol.

**ETH loans enable users to supply pETH back into the bonding curve, and borrow the floor price value in ETH from the reserve**. Such loans are non-liquidatable and borrowers can withdraw their pETH at any time simply by paying back the ETH owed to the bonding curve contract. The position is recorded onchain as an NFT.

Since the value loaned is based on the floor price, these loans are safe for the protocol: if a borrower decided to never pay back, that would be the equivalent of selling pETH to the bonding curve at floor price in ETH value: a very good deal for our dear bonding curve, considering pETH will trade at a premium against floor price. We’ll cover the mechanism more extensively in further articles, at this point, we just wanted you to know its existence.  

![pETH-ETH loop strategy: benefits include no liquidation risk, rising floor price, and ETH-aligned exposure, alongside a bonding curve chart showing entry and exit points with a shaded profit zone](/infographics/peth-eth-loops-v1.png)

#### Why loop pETH?

The rising floor price makes such positions much more safe, since that, over a long enough time horizon, the market price will necessarily overtake the entry price: the core question is when, and with a poorly timed entry, that “when” can be “in quite a while”; the absence of liquidations further secure such positions, making them attractive for users:

1) Who already own ETH / looking for ETH-based exposure  
2) Looking for greater returns than raw ETH / stETH holdings  
3) Confident that the bonding curve will keep growing

**It’s another lever to interact with Polaris and speculate on its growth, but contained to pure ETH/pETH exposure** only and focusing entirely on the bonding curve. Bullish Polaris but not willing to touch anything else than ETH? ⇒ You can own/loop pETH.

From a protocol perspective, these loans are another way to make the ETH reserves in the bonding curve productive, thus generating more activity, which in turn pushes the pETH floor price up: almost like a self-fulfilling prophecy.

### pETH DeFi Integrations

pETH’s ever rising floor, paired with its eventually massive ETH backing makes for a prime asset to be used in DeFi beyond Polaris itself: while the ETH loan terms are favorable, capacity will be limited, and we anticipate a demand for leverage greater than what the ETH loan can cover.

So… Why not a pETH/ETH eMode on Aave? Or maybe on Morpho or Euler? Why not all three? Just like stETH is used as collateral in many protocols, even CDP (other than Polaris’), we can also anticipate a similar usage for pETH once it has grown enough. Thanks to the bonding curve and the rising price floor, **pETH can offer something that stETH cannot: guaranteed liquidity**.

You can picture pETH like a stETH with a different set of tradeoffs:

![Side-by-side comparison of pETH and stETH across liquidity, withdrawal, price floor, yield, and risks, highlighting pETH's guaranteed liquidity, instant withdrawal, and ever-rising price floor](/infographics/peth-vs-steth-comparison.png)

The main difference in terms of exposure is the price risk with pETH which will explain below.

**stETH is a prime asset, don’t get us wrong; but it simply cannot guarantee liquidity**. By default, withdrawing stETH takes 6 days. To hedge this, Lido has developed strong liquidity pools for stETH on various DEXes and chains; yet as massive as they can be, they are not guaranteed: for whatever reason, be it a panic or something else, **liquidity can evaporate if liquidity providers decide to not supply anymore**.

On the other hand, **pETH needs no** **external parties to act as liquidity providers: it is backed by ETH, and redeemable eventually in massive size for it**, as the ETH supply deposited in the bonding curve grows. The floor price provides another layer of guarantee: “in the worst possible outcome, I know that at least, I’d get X ETH per pETH”. We have a term for the coverage offered by the floor price, the “Floor ratio”, expressed in %, and expliciting the share of the current market price that is covered by the floor price (Floor ratio \<100%).

![Chart illustrating the floor ratio: a volatile blue market price line above a steadily rising cream floor price line, with an annotated example showing a 55% floor ratio and 45% max drawdown](/infographics/floor-ratio-explainer.png)

While pETH will be volatile against ETH, **the floor price sets a lower bound of the fluctuation**. The floor ratio itself will be volatile, depending on the market sentiment, user activity and more. In phases of wild growth, the floor ratio can get quite low, maybe even below 50%. As the market price normalizes, the floor ratio will increase, to a point where the potential max drawdown of pETH becomes too attractive to ignore: imagine for instance a floor ratio of 90%, potentially possible after a very wild day on ETH and widespread market panic. Is pETH such a gamble, if you know from the get go that 90% of your investment (in ETH terms) is secured no matter what?

#### pETH risk overview

While pETH is a compelling product, we are not in the business of selling snake oil here. Let’s have a comprehensive overview of its risk profiles, there are two main risks to watch for:

1. **Technical risk**: pETH lives onchain, the bonding curve is a smart contract, the technical risk is thus unavoidable but will be extensively mitigated with audits and advanced modelization.  
2. **Price risk**: when it comes to the price risk, each user is different, based on his entry price and more specifically the spread between his entry price and the floor price (floor ratio). Buying pETH at a price 1 ETH when the floor price is 0.9 ETH (90% floor ratio ⇒ 10% max drawdown) is obviously much safer than say at 1.5 ETH with a floor price at 1 ETH (66% floor ratio ⇒ 33% max drawdown.)

Liquidity related risks are erased:

1. The bonding curve guarantees liquidity at the market price, independent of liquidity providers.  
2. And mathematically enforces a minimal guaranteed price: the floor price.

We're eager to see how users interact with pETH once it's live: our quest to craft the best collateral possible for the pAssets has been fruitful and we’re equally bullish pETH as we are for pAssets.

## The Foundation of Polaris

The bonding curve is not just a mechanism: it's the foundation that makes Polaris possible.

From a single primitive, we get:

1. **pETH**: collateral with an ever-rising floor price and guaranteed liquidity  
2. **ETH Loans**: non-liquidatable leverage for ETH-native users  
3. **Protocol value capture**: every interaction pushes the floor higher  
4. **DeFi composability**: a collateral asset that money markets can trust

stETH proved that liquid staking could become a DeFi primitive (well, wstETH). pETH takes the next step: a collateral that doesn't depend on external liquidity providers, doesn't require 6-day withdrawal windows, and offers a mathematically enforced price floor.

The floor ratio will fluctuate. pETH will trade at varying premiums above it. But the floor itself only moves in one direction: up.

We still have a lot of ground to cover, but we hope this article helped you understand the specificities of pETH bonding curve better, and what it enables. For now, the key takeaway is simple. **The bonding curve is how Polaris turns ETH into a tightly correlated yield-bearing variant with a safety net: a prime collateral for the pAssets, as well as a desirable token all across DeFi**. 

Polaris replaces the sovereignty of decision with the sovereignty of rules, making money not an act of authority, but a collective form that stabilizes through use, responsibility, and time.

Follow [Polaris on Twitter](https://x.com/polarisfinance_) and join the [Telegram announcement channel](https://t.me/polaris_ann) to be notified of our upcoming publications and further your understanding of Polaris.  