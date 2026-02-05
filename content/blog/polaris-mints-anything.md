---
title: "CDPs Mint Dollars. Polaris Mints Anything"
description: "From Maker to Liquity, CDP models shaped DeFi lending. Polaris takes the blueprint further with pETH, self-adjusting rates, and a factory for stablecoins pegged to anything."
date: "2026-02-02"
author: "Polaris Team"
image: "/blog/polaris-mints-anything-cover.png"
---


The Collateralized Debt Position (CDP) model has become quite the DeFi staple. It was initially introduced by Maker with the very first version of DAI (now called SAI), which reached mainnet as early as late 2017 back when DeFi was not even called as such. Since the overall model and the very concept of DeFi was so new then, it took a couple of years for Maker to attract deposits in size: it crossed the $200 millions TVL mark about two years post launch.

But then, as things usually go in DeFi, the innovation picked up, and many twists and variants on the base MakerCDP model were experimented with. With the CDP model now less foreign to the average DeFi user, deposits started to show up much more quickly: Liquity v1 was released in April 2021 and reached $1B TVL in 10 days. The rest is history, and CDP protocols became quasi as familiar as money markets are to the average DeFi user.

With this article, we want to take a step back to reflect on the main evolution of CDP protocols, the strengths and weaknesses of the model, and how Polaris innovates to build a next generation CDP due to some unique additions: the bonding curve and the StablecoinOS.

## What is a CDP?

From the end-user perspective, a CDP-based protocol enables borrowing using a collateral, just like a money market such as Aave; however, what is happening under the hood is completely different. Aave is like a borrower/lender matchmaking service, using pools as intermediaries to ensure constant availability. With a CDP system, **each borrower mints the stables he is borrowing**, he’s not borrowing stablecoins supplied by another user, he’s borrowing from the protocol directly. It’s like an infrastructure for everyone willing to become a **mini central-bank**: post collateral, for instance ETH ⇒ borrow+mint a stablecoin, such as DAI or LUSD.

This design has widely different tradeoffs compared to a money market: **each vault/trove (borrowing position) is individualized**, and there is no notion of utilization which impacts the borrowing interest. What connects the various users of a given CDP system is:

1. The stablecoin it issues and the state of its peg
2. System-wide parameters and their impact (e.g.Total Collateralization Ratio in Liquity v1, and the Recovery Mode which depends on it)

### CDP-based protocols: strengths and weaknesses

[CDP-based protocols](https://defillama.com/protocols/cdp) remain widely popular up to this day, represented by protocols such as Maker (Sky), Liquity, crvUSD, and more. At a high level, all share a similar set of strengths and weaknesses, though the specifics of each design mitigate or amplify them differently.

| Main Strengths | Main Weaknesses |
| ----- | ----- |
| **Trustlessness**: CDP logic can be fully enforced onchain by smart contracts, without requiring any intermediaries | **Liquidation Risk**: If the collateral value drops below a required threshold (e.g., 150%), the CDP may be liquidated, meaning the system sells the collateral to cover the debt, often at a loss for the user. |
| **Transparency**: collateral ratio, liquidation logic, and system collateralization status are all visible onchain and available for anyone to audit | **Market Volatility**: Sudden, sharp drops in the price of the underlying collateral asset (e.g. ETH) can trigger mass liquidations, potentially leading to instability in the stablecoin's peg. |
| **Demonstrated stability**: CDPs-based models have demonstrated their capacity to keep their stablecoins at peg in all types of market conditions over \~ 8 years of history. | **Smart Contract Risk**: Despite auditing, bugs or vulnerabilities in the underlying smart contract code can lead to a total loss of funds. |
| **Optionality**: borrowers unlock instant liquidity from their assets without needing to sell them | **Oracle Risk**: Oracles are critical components of most CDP-based protocols, and their failure can have severe consequences |
| **Debt-asset agnostic**: while the borrowed asset is usually the dollar, it can be anything, and it’s uncorrelated with the collateral choice | **Capital Inefficiency**: To prevent liquidation, users must often maintain high collateralization ratios (over-collateralization), which means a share of the deposited collateral is unproductive. |

## Polaris’ unique implementation of a CDP system

Polaris' unique additions reinforce the core strengths of the CDP system while dampening its weaknesses. We will consider the main ones below:

### pETH: The Key to Unlock Greater Capital Efficiency

**Polaris is free of any external dependencies which would limit its scaling capabilities**, and that is why it will not accept staked ETH tokens like wstETH as collateral. Instead, it uses pETH, obtained by depositing ETH into a bonding curve. This key difference enables greater capital efficiency, as pETH has an ever-rising rising price floor against ETH.

pETH deployed as collateral in a borrowing position is also eligible for yield generated by other components of the system, such as the ETH released from the bonding curve when POLAR conversions occur. Overall, that means that:

1. pETH is an ETH-proxy, with a rising price floor against ETH  
2. pETH is yield bearing

![Diagram showing the Polaris bonding curve mechanism, where ETH deposits mint pETH with a rising price floor](/infographics/polaris-bonding-curve.png)    

Altogether, that makes **pETH an attractive token on its own**, even if not mobilized as collateral within Polaris: pETH is a standalone product that will deliver **risk-adjusted returns superior to staked ETH**. And pETH is also a key component of the Polaris CDP, its growth will stimulate the growth of the whole protocol and ecosystem.

### Increased Peg Stability thanks to Minting

**The addition of the bonding curve also enables greater peg stability**. While depegging downwards is the most problematic situation in term of user sentiment, it has been credibly solved already with mechanisms such as the redemption used in Liquity v1 & v2. The LUSD/BOLD stablecoin can be redeemed for $1 worth of collateral (- fees), creating a price floor for the stablecoin through arbitrages: 

If the stablecoin was to be temporarily priced at say $0.98 by the markets, arbitrageurs flock in as the redemption becomes a profitable operation. They buy LUSD at $0.98 on the market ⇒ redeem for $1-fee of collateral ⇒ sell collateral ⇒ close arb loop. 

This arbitrage creates a **positive price pressure quickly restoring the stablecoin's peg**. Polaris harnesses a similar redemption mechanism, with a few twists to make it fairer and less traumatic for the borrowers: we will cover them in due time.

**The depeg upward situation is potentially more problematic**, as this is what forced Maker to adopt the USDC-PSM, erasing any pretense of trustlessness or censorship-resistance. It also affected Liquity v1 adversely, with LUSD sustaining a premium for more than a year (May 2022 \- June 2023). An upward depeg creates uncertainty with the borrowers who are not keeping exposure in the borrowed stablecoin: they might sell the stablecoin at $1.02 today, only to find it at $1.04 on the markets later, on the day they want to repay. It effectively creates an additional and unpredictable borrowing cost.

To solve this, Polaris uses a new mechanism we call “minting” which can be pictured as the inverse of a redemption:

- With redemptions, arbitrageurs burn pUSD (=repay debt) to obtain pETH (from users CDPs).  
- With mintings, arbitrageurs exchange pETH (added to troves collateral) to obtain pUSD (minted on users CDPs).

This new mechanism creates an arbitrage flow in upward-depeg scenario as strong as the redemptions are in downward-depeg situations, ensuring pUSD remain perfectly balanced at all times. **Minting is made possible by the existence of the bonding curve**: yet another one of its many benefits\!

### Autonomous Market-Aware Interest Rates

The interest rate calculation is a key point of tension and risks for CDP models. Some simply never tried to solve the problem: Maker, 8 years in operations, is still using governance-defined interest rates leading to wild rates spikes, unpredictability for the borrowers, mismatch with market conditions, and governance bloat. Others, like Liquity v1 had no interest rate to begin with (only an initiation fee), but it led to sustained downward pressure on the LUSD supply as the reference earning rate (T-bill rate) increased. Liquity v2 uses user-defined interest rates, which solves some key issues, but generates another: the added complexity is pushed onto the user, many of which rely on interest rate managers charging additional fees.

**Polaris is internalizing the learnings from all these systems and elegantly solving the problem once and for all with a fully autonomous market-aware interest rate**. How? The simple way would be with a pUSD price oracle. The interest rate can then be adjusted upward if pUSD\<$1 (⇒ increased pressure to repay debt) or downward if pUSD\>$1 (⇒ increased incentive to borrow). But that would add an avoidable external dependency, so it’s a no-go.

But remember the bonding curve, which enables the minting mechanism? And that we also have redemptions? Now the equation is simple:

1. Redemption is profitable when pUSD\<$1 ⇒ a spike in redemption volume is a proxy signal for a downward depeg  
2. Minting is profitable when pUSD\>$1 ⇒ a spike in minting volume is a proxy signal for an upward depeg

![Diagram showing pUSD peg stability via redemption and minting arbitrage flows](/infographics/peg-stability.png)

Using these signals, the system can be aware of the peg situation of pUSD, without needing access to its price feed. And there you have it, the “pUSD price oracle”, except it doesn’t need ChainLink or any other provider; it elegantly uses the information already available in the system. 

*Please note that we are talking about how the system is aware of pUSD price/peg status here, not how the price of ETH is fetched.*

The above works in tandem with the usual, slower, native repegging mechanisms stemming from the CDP model:

- If pUSD is under peg, existing borrowers who sold their pUSD might consider repaying their debt with a discount: buy pUSD off market ⇒ burn it to repay debt.  
- If pUSD is over peg, existing borrowers with available capacity / new borrowers might consider borrowing more pUSD and selling it to secure the profits. 

Enough with the bonding curve for today, we will deep dive into it soon. Let’s switch the focus to the bigger picture with the StablecoinOS:

## One Collateral, All Kinds of Debt Assets

So far, we’ve been working with examples that are one step away from reality: we considered only pUSD. Yet **Polaris is not just a CDP-protocol, but more of a CDP protocols factory**, all neatly integrated within the broader ecosystem - all instances sharing the same pETH collateral minted against the same bonding curve: 

![Architecture diagram of the Polaris StablecoinOS showing multiple stablecoins sharing one pETH collateral pool](/infographics/stablecoin-OS.png)    

In that sense, **Polaris will be the first protocol to truly harness one of the key benefits of CDP models: they can produce assets pegged to virtually anything**, assuming that, just like Polaris, their fee flow is flexible enough to support assets with negative borrowing costs such as Gold. We’re working on pUSD and pGold ourselves, and any relevant team can join the StablecoinOS and deliver the stable of their choosing: pCHF, pEUR, pAUD, etc.

![pBigMac token icon — a hypothetical stablecoin pegged to the Big Mac Index](/components/pbigmac-icon.png)

**We aren't limited to fiat currencies** either, as pGold shows: pSilver, pCopper, pUranium are all potentially on the table, granted credible teams manifest to bring them to market. We can get even wilder\! Remember: CDP-models are debt-asset agnostic and Polaris can handle all types of interest flows ⇒ **even a pBigMac**, tracking the price of a Big Mac ([Big Mac Index](https://en.wikipedia.org/wiki/Big_Mac_Index)) **is within the realm of possibilities:** we would need a solid team of burgers to carry this one\!

The diversification of the debt assets, all against the same pETH collateral also has benefits beyond increasing the scope that Polaris can cover. Indeed, consider for instance a minimal StablecoinOS with pUSD, pCHF and pGold. On a sigma-6 day on Gold, like January 29, we might observe a spike in liquidations on the pGold instance. But meanwhile, pCHF and pUSD barely moved, so the liquidations on these branches should be marginal. The mutualization of the pETH collateral coupled with each instance having its own debt asset further strengthens the whole StablecoinOS. 

This is the **first layer of what we call the StablecoinOS: many stables sharing the same collateral, each running their dedicated instance**. There is a second layer to the StablecoinOS, which is the incentivization and coordination flows between all these instances, under the stewardship of vePOLAR holders, but we will have to keep this one for a further publication. This layer will allow for further mutualization of the liquidity, with each new stablecoins only needing to sustain liquidity against pUSD to get 1-hop-access to its dense routes against USDC, USDT, and ETH. 

We have so many more things to reveal, but let’s go step by step. Until the next one, remember to [follow Polaris on Twitter](https://x.com/polarisfinance_) and [join the Telegram announcement channel](https://t.me/polaris_ann) to not miss any news.