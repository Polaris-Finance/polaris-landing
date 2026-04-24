---
title: "The Path to the North Star"
description: "Putting the De back into DeFi: a personal account of the path that led us here, and the one ahead."
date: "2026-04-24"
author: "TokenBrice"
image: "/blog/path-to-the-north-star-cover.png"
---

***Putting the De back into DeFi: a personal account of the path that led us here, and the one ahead.***

If we wanted to write a timeline of events to highlight the absolute necessity for what we are building at Polaris, we couldn't have done better. Last week we saw an insufficiently distributed trusted setup failing (LayerZero), because of unsafe implementation and risky parametrization (rsETH), leading to [Aave suffering its biggest hit to date](https://governance.aave.com/t/rseth-incident-report-april-20-2026/24580) (ETH drained with unbacked rsETH collateral). The chain of events continued as the Arbitrum Security Council took action and [posted a transaction on behalf of the attacker to freeze his funds](https://www.coindesk.com/markets/2026/04/21/arbitrum-freezes-usd71-million-in-ether-tied-to-kelp-dao-exploit), clarifying to all how much of a trusted setup L2s themselves are.

Funds are recovered, but at what cost? The full event chain is capturing pretty much all of the DeFi's main challenges, which can be summarized with "it's not DeFi to begin with". The full story is of course more nuanced, and better told elsewhere. Today instead we would like to share about our own story, why we are building Polaris, why it's needed, and how it will bring genuine DeFi back into the spotlight. Grab a coffee, we're going for the full story on this one:

## NG: Polaris Origins

About two years ago, Robert Lauko (founder of Liquity) began researching a novel approach to build a decentralized and scalable stablecoin, with a fundamental unlock compared to previous stablecoins: using a bonding-curve backed ETH derivative as collateral. This key innovation solved a problem that had long plagued CDP stablecoins, SAI (early DAI) and LUSD among them, the latter spending roughly a fifth of its existence >1% above peg: their structural inability to handle above-peg scenarios.

Along with Laurens, who was helping with the research on this novel approach, they built an extensive simulation engine allowing them to test many variants of the idea and iterate on the early parametrization. It quickly became apparent that the bonding curve based approach had many benefits beyond solving the overpeg issue, and the early model for Polaris, then simply called "NG" (for Next Gen) was further refined. Robert and Laurens realized the model had potential and were starting to consider how to productize it.

What motivates Robert Lauko is fundamental and ground-breaking research; he's less excited about the nitty gritty of taking a protocol to prod; and who can blame him? Now that we have practiced it, we have seen the ugly side of it. Most VCs are slow, unwilling to take any risk, and unable to be the one funding the next leaping innovations in DeFi; they mostly look to fund a "sure thing", at an extractive valuation, with protected upside.

The rest of the Liquity team was still very busy with the recently released v2/BOLD and considering the potential scale of the project, they realized that another team would be needed to bring this to market. So the search for the perfect candidate began: one that could take this raw research, shape it into a fully-fledged protocol, take it to mainnet, and grow it to the scale it deserved.

This is where I, Brice - your faithful narrator for today's adventure - came into the picture. Michael Svoboda (Liquity's CEO) first approached me, looking to tap into my network for potential candidates. It took me about 30min after hearing of the model to realize sticking to sourcing without getting involved myself directly would have been the biggest fumble of my whole lineage.

My whole involvement in DeFi revolved around surfacing risks stemming from excessive centralization, documenting them ([Pharos Watch](https://pharos.watch/), [DeFiScan](https://www.defiscan.info/)), supporting protocols that did not take such shortcuts ([DeFi Collective](https://deficollective.org/)), preaching for maximal stablecoin decentralization, etc.: I was (unknowingly then) making myself ready for this moment. A key ally in this quest was Robert (0xLuude) working alongside me at the Collective for 18 months at this point.

![Timeline: from Liquity to Polaris. DAI (2017) as the first CDP stablecoin, single-collateral upgraded to DAI then sunset; LUSD (2021) immutable and decentralized, spending ~20% of its life >1% above peg; BOLD (2024) Liquity v2's refined CDP mechanism; and pUSD (2026), the next chapter with a bonding-curve collateral design solving the overpeg issue.](/infographics/polaris-lineage.png)

So I naturally told Robert at our following catchup after I first heard of NG and we shared the excitement for this promising model looking for its team to shape it and take it to market. Both of us saw in it the opportunity to crystallize into a protocol our years of engagement in the space. For Robert, who had made the jump from the VC side to the DeFi side with the Collective, it was a unique opportunity to finally get to the builder side, and put his experience and expertise to a cause that truly mattered to him.

Along with Robert, we already had solid bases: an extensive network in DeFi, deep understanding of the space, suited and complementary skills, practical experience of liquidity management for stablecoins: enough to cover the broad skillset needed for a protocol inception, apart from the actual development. This is where Laurens formally came into play, even though he was involved in the research since the model's earliest days. Though we previously didn't know each other, the shared Liquity connection helped to jumpstart the bond and Laurens promptly joined the early team as our CTO.

We quickly learned to work together and the project advanced rapidly. With a solid base model, a fitting early team complemented with developers already working together for years, we were able to leapfrog quite a bit. Still, it wasn't without hurdles. A fourth cofounder was envisioned for a while, before we realized it wasn't working. At the start, I was the CEO, somehow stumbling into the role, willing to do whatever it took to get the project moving.

But being a CEO simply wasn't my forte. Investor relations, people management, and many more tasks requiring strong people skills and a soft touch. I am known in DeFi for my "brutally honest" takes and simply wasn't fitting. Robert, on the other hand, demonstrated over time that he was the best person for the role and the transition eventually happened.

We eventually found the ideal team structure and kept chugging. It was back in October of last year, around the same time when we decided on the Polaris name. Along with the starry night sky and navigation imagery, came this perfect metaphor to describe the synergy: "If Polaris was a ship, Robert would be operating at the helm, Laurens smoothening the humming of the machine, and Brice devising strategies from the crow's nest to anticipate long-term challenges."

Polaris stemmed from research starting within Liquity, but forged its own path. Polaris' roots will of course never be forgotten nor overlooked: it will be the final chapter of a story beginning more than half a decade ago. The frog army should have been minting LUSD, not aping into ponzis. Three of the original Liquity developers joined the adventure: the people who wrote the code Polaris builds on are now writing its next chapter.

As we advanced, the model kept getting more intricate, and the go-to-market more refined. Everything flew naturally, and over time, pETH, initially envisioned as a tool to output the stablecoin which was initially the sole end product, became a product on its own. What started as a stablecoin design kept sprouting new primitives. Fresh ideas emerged every time we refined Polaris and worked through the key problems each DeFi protocol must face. Every time, we looked at what is the standard way of handling the situation, what were our gripes with it, and designed a credible solution to address them. Polaris is a protocol built by DeFi bulls and users: it's non-extractive of its users, but instead intends to give them the tools they need to flourish so that together we can reclaim and re-decentralize DeFi.

## 0.0545%

"Trust" in DeFi is crumbling. It's an absurd concept to begin with, as real DeFi is engineered so that no trust is needed. As the term "DeFi" was abused by all flavors of multisig-wrappers, this notion became a real issue though. Users are burned out, there is no sympathy for builders anymore, no enthusiasm, what remains is mostly pain. Some call for circuit breakers, others for rollbacks, and many more remediation ideas absolutely antithetical to DeFi. Yet most of the protocols they are using are better described as "CeFi cosplaying DeFi": who can blame them for demanding CeFi-esque solutions?

Apart from a handful of protocols actually sporting immutable contracts, trustless infrastructure which still honor the initial DeFi promises, most have capitulated, if they ever tried. Years-in, all-potent multisigs are still prevalent. DAOs and governance structures are too much of a joke to even be worthy of discussion. Our whole industry turned into a facade, a "bouffonnerie" as the French would say. Where has the optimism gone?

The early-days optimism for DeFi has been exhausted with the endless circle of max extract. **Early founders mock the DeFi users they left in the dirt from the height of their manor's balcony**.

Trust in DeFi is crumbling because it is excessively required, as only a handful of trustless protocols operate. Truly autonomous and self-contained protocols are needed now more than ever: they are a credible and durable answer to the current identity crisis of space. It's no minor issue, nor will it be easy to solve.

**DeFi, in its current shape, is quite literally cursed: its biggest product market fit - stablecoins - is also the worst possible scenario trust wise**: relying on RWAs, freezable, blacklistable, and absolutely centralized. Out of the $338.9 B stablecoins in circulation, only $184.79M are in non-freezable stablecoins: **0.0545% of the stablecoin mass in circulation meet a bare minimum to be qualified "DeFi": that no trust in an actor behaving as expected is required** ([source: Pharos/blacklist](https://pharos.watch/blacklist/), where else?)

![The cursed reality: of the $338.9B total stablecoin mass in circulation, only $184.79M ($0.0545%) is non-freezable and trustlessly issued — meaning no actor can freeze or censor it.](/infographics/non-freezable-stablecoins.png)

99.95% of the stablecoin mass would not be able to resist serious pressure from governments or large corporations: is that really the DeFi you signed for? The current DeFi ecosystem is built on this verbatim house of cards, and just like it recently woke up to the risk of centralized bridging solutions with the rsETH event and how centralized L2s truly are, the ecosystem will eventually realize this one as well, hopefully through awareness and education, but most likely with yet another sizable and traumatic event.

## The End Game

DeFi is facing its biggest crisis ever; it's a dreadful creature with three monstrous and well anchored heads. But not all hope is lost, defiant brothers and sisters, for Polaris will slay all three of the chimera's heads with one single slash:

1) The joke of DeFi built on top of USDC/T has to stop
2) We need alternative yield sources on ETH beyond staking
3) Faith in DeFi must be restored

The first one is likely the most obvious, but let's be more explicit. The **current DeFi ecosystem is borderline pointless because of its critical dependency on centralized and centralized-dependent stablecoins**. A handful of protocols would survive a mass censorship of centralized stablecoins: mainly DEXes such as Curve, Uniswap or Aerodrome.

**Our true adversaries are not rival DeFi teams: they are governments**, which will eventually abuse their power, as they always do. We are here to build the DeFi that will survive this overreach. Polaris will bring censorship-resistance properties, which are currently featured only on niche stablecoins like LUSD and BOLD - to the mainstream of DeFi. Flipping USDe and USDS is a pit stop, the endgame of Polaris' pAssets is to flip our overlord USDC itself; it is designed for it.

Second, the question of staking. Staking is core to Ethereum, it provides the key security guarantees enabling the network to function. **But in DeFi, staking became a bit of a cheat code**, especially with the advent of restaking. It's not risk-free, even though we love to think of it as such. There are slashing risks, and real concerns liquidity-wise in a rush-to-the-exit scenario.

ETH staking is security, but do we really need 1/3 of all ETH in existence locked up to secure the network? [Vitalik himself has flagged this as one of Ethereum's biggest risks](https://vitalik.eth.limo/general/2024/10/20/futures3.html), and [proposals to reshape the issuance curve](https://ethresear.ch/t/practical-endgame-on-issuance-policy/20747) and push back against over-staking are already on the table. When do we stop? 50%? 66%? If the issuance curve bends down as it should, the yield on staking drops. DeFi needs an alternative that doesn't depend on inflating the validator set.

The whole restaking industry built on top is mostly an economics game. Restaking has yet to find real consumers for the economic guarantees it provides as most of the subset remains entirely speculative, despite being built on the true primitive that is staking.

pETH provides a genuinely novel, uncorrelated yield and represents a novel primitive any protocol can build on top. pETH's yields are not contained to Polaris. Thanks to the [Flows](https://polarisfinance.io/blog/polaris-flows/), any protocol building on top can access them. pETH, along with its derivatives fpETH and vpETH, offer a full ETH-correlated yielding suite to DeFi participants. **fpETH will be a direct alternative to staked ETH, a fully redeemable yield-bearing ETH**.

The third and last item is less technical, but equally important. Beyond the current limitations, **DeFi is in the middle of a crisis of faith**. Early believers who pushed the space are washed out at an alarming rate. Without a sizable course-correction, there will soon be only suits and extractors left.

DeFi is what it is today because anyone can partake, no KYC-required. Kids, as in underage, as in not even able to open a bank account, were key contributors to this incredible collective achievement. **Together, as insane as we all might seem from the outside, we are attempting to achieve what every single government in existence failed to deliver**: a fair, transparent, resilient and interoperable financial system anyone can harness.

I was there, from day one. Not a kid anymore, but still young and hopeful; I dove headfirst. I just kept providing value to the space, for free, not looking for returns because I deeply believed in what it was offering. I worked, earned my early bags, offramped as little as possible and compounded my earnings into DeFi: I used it as a tool to escape the wage-slavery that I knew I couldn't stomach. DeFi transformed my life, it freed me. I [kept writing about it](https://tokenbrice.xyz/archives/) and explaining it to help others do the same. I started as a community organizer with DeFi France, and somehow will always remain one. Now if I can facilitate the same discovery happening for thousands of others, that would be purpose enough.

In a world where finance is at the core, **this is everything**. If the initial DeFi vision can be delivered upon, it will transform the world for the better. Not in a bullshitty startuppy "let's change the world" way, but in the literal meaning. Even if the success chances are 1%, those odds are worth taking. Many decisions in Polaris were solved on a similar evaluation, when we realized that the worst that could happen with an envisioned feature would be… nothing. "Worst case scenario: nothing happens" became a bit of a motto for the team. Such decisions are the best ones, especially when **the best case scenario swaps the veneration of Moloch for that of Maat**.

Heads up trenchers: not all is lost, not everyone capitulated: the fight is merely beginning and we're ready for it until our last breath.

[Follow the North Star.](https://x.com/intent/user?screen_name=polarisfinance_)
