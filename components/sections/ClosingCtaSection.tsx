export function ClosingCtaSection() {
  return (
    <section id="testnet" className="section">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="reveal section-heading">The testnet is open</h2>
        <p className="reveal section-description">
          Polaris is live on Sepolia, open to everyone. Mint pETH on the bonding
          curve, borrow pUSD against it, and watch the floor price rise in real
          time.
        </p>
        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://app.testnet.polarisfinance.io/"
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Try Testnet
          </a>
          <a
            href="https://analytics.testnet.polarisfinance.io/"
            className="btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Live Metrics
          </a>
        </div>
      </div>
    </section>
  );
}
