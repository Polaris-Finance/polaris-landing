"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

const faqs = [
  {
    question: "How is Polaris different from LUSD or BOLD?",
    content: (
      <>
        <p>
          While Polaris shares the trustless, immutable ethos of Liquity (LUSD, BOLD), we introduce a fundamentally different yield generation mechanism.
        </p>
        <p className="mt-4">
          <strong className="text-[var(--polaris-cream)]">Liquity/BOLD</strong> generate yield primarily from:
        </p>
        <ul className="mt-2 ml-5 list-disc space-y-1">
          <li>Borrowing interest rates</li>
          <li>Liquidation penalties</li>
          <li>Redistribution mechanisms</li>
        </ul>
        <p className="mt-4">
          <strong className="text-[var(--polaris-cream)]">Polaris</strong> adds a <strong className="text-[var(--polaris-cream)]">bonding curve</strong> that captures value from:
        </p>
        <ul className="mt-2 ml-5 list-disc space-y-1">
          <li>ETH volatility and trading activity</li>
          <li>Rising pETH floor price from fee burns</li>
          <li>Conversion auctions that burn pETH to mint POLAR</li>
        </ul>
        <p className="mt-4">
          This creates a <strong className="text-[var(--polaris-cream)]">self-scaling yield source</strong> that grows with protocol adoption, not just borrowing demand.
        </p>
        <p className="mt-4">
          Polaris is built with an <strong className="text-[var(--polaris-cream)]">immutable core</strong>, but also has flexibility thanks to its <strong className="text-[var(--polaris-cream)]">stewardship</strong> which can modify some parameters within hard-coded bounds.
        </p>
        <p className="mt-4">
          Additionally, Polaris is designed as a <strong className="text-[var(--polaris-cream)]">Stablecoin Operating System</strong>: the same infrastructure can fork to create pGOLD, pCHF, and other assets, all sharing the same pETH collateral base.
        </p>
      </>
    )
  },
  {
    question: "Is Polaris live on mainnet?",
    content: (
      <>
        <p>
          Polaris is currently in <strong className="text-[var(--polaris-cream)]">gated testnet phase</strong> on Sepolia. Access is limited to select participants while we refine the protocol and gather feedback.
        </p>
        <p className="mt-4">
          You can explore live protocol metrics, including:
        </p>
        <ul className="mt-2 ml-5 list-disc space-y-1">
          <li>Total ETH deposited in the bonding curve</li>
          <li>pETH supply and floor price</li>
          <li>pUSD borrowing activity</li>
          <li>Stability Pool deposits</li>
        </ul>
        <p className="mt-4">
          Visit our <a href="https://analytics.testnet.polarisfinance.io/" target="_blank" rel="noopener noreferrer" className="text-[var(--polaris-star)] hover:underline">Testnet Analytics</a> dashboard to see real-time data.
        </p>
        <p className="mt-4">
          Mainnet launch is planned following comprehensive security reviews, including agent-based modeling, economic simulations, and professional audits. No date is set yet—we prioritize security over speed.
        </p>
        <p className="mt-4 text-sm opacity-80">
          Testnet tokens have no real value and are for experimentation only.
        </p>
      </>
    )
  },
  {
    question: "What are the risks of using Polaris?",
    content: (
      <>
        <p>
          Like all DeFi protocols, Polaris carries risks that users should understand:
        </p>
        
        <h4 className="mt-4 font-serif text-[var(--polaris-star)]">Smart Contract Risk</h4>
        <p>
          All protocol contracts will undergo extensive auditing and formal verification before mainnet. However, no code is ever fully risk-free.
        </p>
        
        <h4 className="mt-4 font-serif text-[var(--polaris-star)]">pETH Price Volatility</h4>
        <p>
          pETH trades at a premium to its floor price, and this premium fluctuates with market sentiment. While the floor only rises, the market price can experience volatility against ETH. Your entry price and the current floor ratio determine your maximum potential drawdown.
        </p>
        
        <h4 className="mt-4 font-serif text-[var(--polaris-star)]">Oracle Risk</h4>
        <p>
          The protocol relies on price oracles for CDP operations. While we use robust, decentralized oracle solutions, oracle failures remain a systemic risk in DeFi.
        </p>
        
        <h4 className="mt-4 font-serif text-[var(--polaris-star)]">Stewardship Risk</h4>
        <p>
          While core protocol logic is immutable, certain parameters can be adjusted by vePOLAR holders through stewardship. This introduces stewardship risk, though bounded by hard-coded safety limits and time delays.
        </p>
        
        <h4 className="mt-4 font-serif text-[var(--polaris-star)]">Liquidity Risk</h4>
        <p>
          While the bonding curve guarantees liquidity at the market price, extreme market conditions could affect the redemption experience.
        </p>
      </>
    )
  },
  {
    question: "How does the bonding curve work?",
    content: (
      <>
        <p>
          The Polaris bonding curve is a mathematical mechanism that creates pETH from ETH deposits with three key properties:
        </p>
        
        <h4 className="mt-4 font-serif text-[var(--polaris-star)]">1. Guaranteed Liquidity</h4>
        <p>
          Unlike AMMs that require liquidity providers, the bonding curve itself is the counterparty. You can always swap ETH for pETH (minting) or pETH for ETH (burning) at the current curve price.
        </p>
        
        <h4 className="mt-4 font-serif text-[var(--polaris-star)]">2. Rising Floor Price</h4>
        <p>
          Every swap pays a fee in pETH, which is burned. Each burn reduces supply, which increases the floor price—the minimum redemption value of pETH in ETH terms. <strong className="text-[var(--polaris-cream)]">This floor never decreases.</strong>
        </p>
        
        <h4 className="mt-4 font-serif text-[var(--polaris-star)]">3. POLAR Conversion</h4>
        <p>
          New POLAR tokens can only be minted by burning pETH through a conversion auction. This mechanism spikes the floor price upward, creates demand for pETH, and connects the three Polaris tokens (pETH, pUSD, POLAR).
        </p>
        
        <h4 className="mt-4 font-serif text-[var(--polaris-star)]">The Formula</h4>
        <p>
          The curve follows <code className="bg-[rgba(var(--polaris-star-rgb),0.1)] px-1.5 py-0.5 rounded text-[var(--polaris-cream)]">price = alpha × supply^beta</code>, where beta (~0.3) keeps pETH closely coupled to ETH while allowing enough volatility for interesting dynamics.
        </p>
        <p className="mt-4">
          Over time, the floor price only moves in one direction: <strong className="text-[var(--polaris-cream)]">up</strong>.
        </p>
      </>
    )
  },
  {
    question: "What can I do on testnet?",
    content: (
      <>
        <p>
          The Polaris testnet allows you to experiment with core protocol mechanics using valueless test tokens.
        </p>
        
        <h4 className="mt-4 font-serif text-[var(--polaris-star)]">Available Actions</h4>
        <ul className="mt-2 ml-5 list-disc space-y-1">
          <li>Deposit ETH into the bonding curve to mint pETH</li>
          <li>Swap between ETH and pETH to observe curve pricing</li>
          <li>Open CDPs using pETH as collateral to borrow pUSD</li>
          <li>Deposit pUSD into the Stability Pool to earn yield</li>
          <li>Trigger liquidations and observe the Stability Pool mechanism</li>
          <li>Monitor all activity via the Testnet Analytics dashboard</li>
        </ul>
        
        <h4 className="mt-4 font-serif text-[var(--polaris-star)]">What to Observe</h4>
        <ul className="mt-2 ml-5 list-disc space-y-1">
          <li>How the pETH floor price rises with each swap</li>
          <li>The relationship between pETH market price and floor price</li>
          <li>How borrowing interest rates adjust based on utilization</li>
          <li>Liquidation dynamics and Stability Pool gains</li>
        </ul>
        
        <h4 className="mt-4 font-serif text-[var(--polaris-star)]">Getting Started</h4>
        <p>
          The testnet requires a special version of wETH that we distribute. Users interested in trying out should <strong className="text-[var(--polaris-cream)]">DM Polaris on <a href="https://x.com/polarisfinance_" target="_blank" rel="noopener noreferrer" className="text-[var(--polaris-star)] hover:underline">Twitter/X</a></strong> to request access.
        </p>
      </>
    )
  },
  {
    question: "What is the Stablecoin Operating System?",
    content: (
      <>
        <p>
          The <strong className="text-[var(--polaris-cream)]">Stablecoin Operating System (StablecoinOS)</strong> is Polaris&apos;s framework for ecosystem growth and protocol expansion.
        </p>
        
        <h4 className="mt-4 font-serif text-[var(--polaris-star)]">Core Concept</h4>
        <p>
          While the core Polaris protocol (pETH bonding curve, pUSD CDP) is immutable, the StablecoinOS enables controlled evolution through:
        </p>
        
        <h4 className="mt-4 font-serif text-[var(--polaris-star)]">Parameter Stewardship</h4>
        <p className="mb-2">vePOLAR holders can adjust quantitative parameters within hard-coded safety bounds:</p>
        <ul className="ml-5 list-disc space-y-1">
          <li>Interest rate curves</li>
          <li>Liquidation ratios</li>
          <li>Stability Pool reward splits</li>
        </ul>
        
        <h4 className="mt-4 font-serif text-[var(--polaris-star)]">Fork Licensing</h4>
        <p>
          Teams can deploy their own stablecoins (pGOLD, pCHF, etc.) using Polaris infrastructure. Licensing requires vePOLAR holder approval and includes revenue sharing.
        </p>
        
        <h4 className="mt-4 font-serif text-[var(--polaris-star)]">Ecosystem Integration</h4>
        <p>
          Frontends, integrators, and yield aggregators can join the StablecoinOS, gaining access to protocol incentives based on gauge voting.
        </p>
        
        <h4 className="mt-4 font-serif text-[var(--polaris-star)]">One pETH, Many Stablecoins</h4>
        <p>
          All forks share the same pETH collateral. Whether you&apos;re borrowing pUSD, pGOLD, or pCHF, your collateral is the same rising-floor asset. This creates network effects: more stablecoins = more pETH demand = higher floor price = better collateral for everyone.
        </p>
        
        <h4 className="mt-4 font-serif text-[var(--polaris-star)]">Separation of Concerns</h4>
        <ul className="mt-2 ml-5 list-disc space-y-1">
          <li><strong className="text-[var(--polaris-cream)]">Core Protocol:</strong> Immutable, handles pETH and pUSD</li>
          <li><strong className="text-[var(--polaris-cream)]">StablecoinOS:</strong> Evolvable, handles growth and ecosystem</li>
        </ul>
        <p className="mt-4">
          This structure gives Polaris both <strong className="text-[var(--polaris-cream)]">nuclear-grade security</strong> (immutable core) and <strong className="text-[var(--polaris-cream)]">infinite scalability</strong> (forkable infrastructure).
        </p>
      </>
    )
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section section--gradient">
      <div className="mx-auto max-w-3xl">
        <h2 className="reveal section-heading">Frequently Asked Questions</h2>
        <p className="reveal section-description">
          Everything you need to know about Polaris before mainnet.
        </p>
        
        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-[rgba(var(--polaris-star-rgb),0.1)] rounded-2xl overflow-hidden bg-[rgba(var(--polaris-navy-rgb),0.3)]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[rgba(var(--polaris-navy-rgb),0.5)] transition-colors"
              >
                <span className="font-serif text-lg text-[var(--polaris-star)] pr-4">
                  {faq.question}
                </span>
                <ChevronDownIcon 
                  className={`h-5 w-5 text-[var(--polaris-star)] flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 text-[var(--polaris-cream-muted)] leading-relaxed">
                  {faq.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
