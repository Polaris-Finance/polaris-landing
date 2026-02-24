---
title: "pGOLD: Finishing What DigixDAO Started   "
description: "How pGOLD breaks the XAUT/PAXG duopoly without touching a single gold bar."
date: "2026-02-24"
author: "Polaris Team"
image: "/blog/pgold-finishing-what-digixdao-started-cover.png"
---

Gold onchain, and as decentralized as it can be\! This quest is nothing new, it’s even one of the original ones with DigixDAO, a fundamental part of Ethereum’s story: it was **the first major project to use an ICO to launch a DAO**, and fueled the dreams of many back in 2016\. The goal was ambitious: to run an asset tokenization business, and gold was of course a prime target with DGX \- Digix Gold Token. The original plan failed to materialize, and unlike some other DAOs facing similar predicaments, the DigixDAO acknowledged it and took action with the [”Ragnarok”](https://medium.com/digix/digixdaos-dissolution-655be3110196) dissolution.

Just like anywhere else, crypto and DeFi history often comes full circle: with ten years of development of both the chain and application layer since DGX, **Ethereum is now getting ready to welcome a decentralized Go(l)d again**: today, we’re telling you the history in the making with pGOLD.

## Why pGOLD?

Gold has been attracting a lot of attention lately, with the price of an ounce (\~31.1g) rising from \~$3000 a year ago to around $5000 now. As with all desirable assets, onchain representations of it have shown strong growth as well. Yet, similarly to USD stablecoins, the current options are far from ideal, worse even than with USD as **there are currently no decentralized gold stablecoins available**. 

### A centralized duopoly

The gold stablecoin market is mostly a duopoly. Indeed, the market is currently serviced by two centralized gold-tracking stablecoins: [XAUT (Tether)](https://gold.tether.to/) and [PAXG (Paxos)](https://www.paxos.com/pax-gold). They are very similar to their $-counterparts (USDT and USDP), and use an almost identical infrastructure, only adapted to the specificities of gold (physical redemption). Together, they amount to \~$5B of market capitalization, nearly equal in market cap, with PAXG behind but catching up rapidly.

Both companies stress the huge benefits of having onchain gold: it provides direct exposure to a neutral monetary asset, and allows holders to avoid the shortcomings of physical gold, such as custody fees. Both assets are redeemable for the underlying physical gold, only after a demanding KYC procedure, and with size requirements and fees (XAUT \= 0.25%). The required size is one full gold bar for XAUT, which is 430 XAUT, approximately $2.1M, while PAXG’s documentation is less precise. The redemptions of such assets are usually performed by middlemen or high-net-worth individuals.

### Ripe for a decentralized challenger

Centralized gold stablecoins come with heavy constraints, mostly stemming from the physical management of gold reserves: a synthetic asset tracking gold would deliver the core functionality users are looking for, without having to bear the cumbersome consequences of management and physical redemptions – enter pGOLD.

pGOLD, just like pUSD, needs no trust placed in a counterparty, and makes no compromises. Backed by pETH, it is redeemable for its collateral without KYC or size requirements: it offers exposure to the price of 1 ounce of gold, onchain, with no intermediaries other than the Polaris protocol itself.

![Comparison table: pGOLD vs XAUT/PAXG across five properties — Collateral (pETH onchain vs physical gold with custody risk), Redemption (permissionless, no KYC vs KYC-gated with minimums), Fees (protocol rate only vs 0.25%+ redemption fees), Decentralization (fully onchain vs Tether/Paxos issuers), and Trust (no counterparty risk vs issuer can freeze or blacklist)](/infographics/pgold-vs-centralized-gold.png)

While both centralized gold stablecoins and pGOLD enable gold-price exposure, they are fundamentally and structurally different products, and pGOLD features unique trustless properties making it more desirable for retail long-term holding, but also for other protocols to build on top. pGOLD harnesses the same CDP infrastructure as pUSD (covered in previous articles); this piece focuses on what makes it unique.

## Does borrowing pGOLD mean shorting gold?

A common misconception about using a CDP model to output a gold-tracking debt asset like pGOLD is expressed in the question above: it is often believed that borrowing an asset is the equivalent of shorting it. And the belief is not too far from the truth, which is probably what makes it so sticky: let’s settle it with a practical situation.

You supply ETH on Polaris, which is swapped to pETH, post pETH as collateral in a trove, and borrow 1 pGOLD. At this stage, you have a debt of 1 pGOLD, and you own 1 pGOLD in your wallet: your exposure is exactly neutral. The position turns into a short gold position if and only if you sell the pGOLD for a non gold-tracking asset: for instance, if you swap pGOLD for pETH to loop the position.

**What can turn the position into a short is what you do with the borrowed asset**: if you keep it as pGOLD, or another gold-tracking asset, your position will not be short. So the question, for those not looking to short, turns into what to do with pGOLD while keeping the price exposure?

There will be several options, starting of course with the Stability Pool we already covered. But there is more, if you consider the LP positions. While pGOLD will have strong liquidity against pUSD, other pairings will also be supported, such as pGOLD/XAUT or pGOLD/PAXG.

![Flowchart titled 'Borrowing ≠ Shorting': depositing pETH into a Trove mints pGOLD. Two paths diverge from there — holding or LPing pGOLD preserves gold-neutral exposure, while selling pGOLD for pETH creates a short gold position. The short only happens when you sell the borrowed asset.](/infographics/pgold-borrowing-not-shorting.png)

Thus, all market sentiments on gold’s future price can be expressed with pGOLD:

1. Long Gold: buy pGOLD and LP (preferably in a gold-correlated pair)  
2. Short Gold \+ long ETH: post pETH collateral, borrow pGOLD, and sell it or loop the position  
3. Short ETH \+ long gold ⇒ buy pGOLD and supply to the Stability Pool  
4. Neutral gold price, long volume: borrow pGOLD ⇒ supply gold-correlated LPs 

## Why borrow pGOLD?

With the borrowing ≠ shorting misconception cleared up, we can move on to the next one: why borrow gold, even if you’re not necessarily shorting it?

The answer here is found in the very design of the Polaris CDP model, which incentivizes borrowing, and can even support effective negative interest rates in market conditions that demand it. Considering the strong innate demand for holding gold, and the comparatively lower appetite to borrow it, we anticipate that pGOLD will be the perfect asset to harness Polaris’ flexibility.

Indeed, on Polaris, borrowers pay an interest rate, as is usually the case with lending protocols. What sets Polaris apart is that borrowers also receive pETH incentives, based on their borrowing positions, coming from the bonding curve swap fees and conversion gains: in situations where these incentives are greater than the interest rate, the effective interest rate turns negative. If, as we expect it, demand off the markets for pGOLD proves strong, it will drive the peg (temporarily) higher, which translates into lower interest rate for borrowers.

Cheap, or even subsidized, borrowing is only half the story. The million pUSD question is: once you've minted pGOLD, where does it go to work?

## pGOLD in DeFi

The pGOLD Stability Pool delivers a value proposition never witnessed before onchain: **a yield-bearing gold-denominated position, which also acts as a buyer of last resort of ETH at a discount.** It’s a perfect place for gold and ETH bulls to park stablecoins over the long run, and we anticipate it to be met with sizable demand. As previously mentioned, the pGOLD liquidity pools will offer another yield layer for pGOLD holders with different risk profiles or price hypotheses. 

Beyond the Polaris ecosystem, pGOLD will be composable, and you can expect similar products to the ones already discussed for pUSD:

- Yearn/Fusion/Other vaults to maintain pGOLD exposure while supplying the Stability Pool  
- Pendle integration on such vaults  
- Advanced tooling/automation to manage pGOLD borrowing positions with DeFiSaver or others

As it grows, more use cases can be envisioned, even its use as collateral in a CDP model to back a stablecoin, which would be the **first trustless fully redeemable gold-backed dollar-pegged stablecoin ever seen onchain**, quite the compelling headline.

## The Gold Standard, Rebuilt

Ten years after DigixDAO dared to imagine tokenized gold on Ethereum, the infrastructure has finally caught up with the ambition. pGOLD doesn't need vaults in Singapore or redemption queues. It just needs a price feed, pETH collateral, and the same battle-tested CDP mechanics that back pUSD.

For holders, it's the simplest path to decentralized gold exposure. For borrowers, Polaris' incentive structure makes it one of the most capital-efficient ways to gain exposure. For builders, it's a composable primitive that unlocks entirely new product categories.

Gold has been money for five thousand years: pGOLD makes it programmable money, with no permission required.