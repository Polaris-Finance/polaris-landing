# Polaris Content Fix Plan

This document captures content-related improvements identified during the comprehensive website audit. These are non-technical changes that require copywriting and brand decisions.

---

## 1. Brand Consistency

### Issue
Inconsistent naming across the site and assets:
- Domain: `polarisfinance.io`
- Metadata/title: "Polaris Protocol"
- Twitter handle: `@polarisfinance_`

### Recommendation
Choose one canonical name and use it consistently:
- **Option A:** "Polaris Protocol" (more technical, serious)
- **Option B:** "Polaris Finance" (more approachable)

Update all instances in:
- `app/layout.tsx` metadata
- `app/blog/page.tsx` metadata
- `components/JsonLd.tsx` organization schema
- Social media profiles
- Footer and navigation text

---

## 2. Simplify Hero Tagline

### Current
> "We're building uncorrelated, scalable returns without T-Bills, without CEXs, without compromises."

### Issues
- "Uncorrelated" is financial jargon
- Assumes users understand why T-Bills and CEXs are problematic

### Recommendations
**Option A (Benefit-led):**
> "Pure onchain yield that grows with adoption—no middlemen, no compromises."

**Option B (Problem-solution):**
> "Stablecoin yield that scales without banks, without centralized exchanges, without trust assumptions."

**Option C (Simpler):**
> "The stablecoin that generates its own yield—fully onchain, fully trustless."

---

## 3. Token Taglines

### POLAR Token
**Current:** "Stable beta, real yield"

**Issue:** "Beta" is finance jargon (market correlation term) that most users won't understand.

**Recommendations:**
- "Governance with growing rewards"
- "Stewardship token, real yield"
- "Guide the protocol, earn the yield"

### pUSD Token
**Current:** "Stability that pays you back" ✅ Good - keep as is

### pETH Token
**Current:** "Supercharged ETH with a safety net" ✅ Good - keep as is

---

## 4. Missing Social Proof Section

### Issue
No trust indicators for new visitors:
- No investor/backer logos
- No TVL or user metrics
- No "as seen in" press mentions
- No community size numbers

### Recommendations
When available, add a section with:
- Investor/partner logos
- Key metrics (TVL, users, transactions)
- Press mentions or quotes
- Community size (Twitter followers, Telegram members)

**Suggested location:** After the Stats section or before the Footer

---

## 5. Missing FAQ Section

### Issue
Common questions go unanswered, increasing friction for potential users.

### Recommended FAQs

1. **How is pUSD different from USDC or DAI?**
   - Fully onchain, no off-chain assets
   - Yield that scales with adoption
   - No centralized counterparty risk

2. **What are the risks?**
   - Smart contract risk (mitigated by audits)
   - Collateral volatility (mitigated by liquidation mechanisms)
   - Regulatory uncertainty

3. **When is mainnet launch?**
   - [Add timeline when available]

4. **How do I get started?**
   - [Add getting started steps when app is live]

5. **Is the code audited?**
   - [Add audit details when available]

**Suggested implementation:** Add FAQ section using JSON-LD FAQPage schema for SEO benefits.

---

## 6. CTA Improvements

### Current CTAs
- "Get updates on X"
- "Get updates on Telegram"
- "Whitepaper coming soon" (passive, non-clickable)

### Issues
- No urgency or motivation
- Both CTAs do the same thing (social follows)
- Whitepaper badge is announcement, not action

### Recommendations

**Hero CTAs:**
- Add urgency: "Join 2,000+ waiting for launch" (if applicable)
- Differentiate: "Follow for updates" + "Read the whitepaper"

**Whitepaper Badge:**
- Replace with actionable: "Join waitlist" or "Get notified"
- Link to email capture or notification system

**Mid-page CTA:**
- Add CTA after "How It Works" section
- Example: "Ready to dive deeper? Read our technical overview →"

---

## 7. Blog Content Improvements

### "Why Polaris?" Article
- Add source citation for "~98% centralized stablecoins" claim
- Fix: "Liquidations is the..." → "Liquidation is the..."
- Fix: "pick-two trilemma" (redundant - trilemma already implies pick-two)

### "CDPs Mint Dollars" Article
- Define acronyms on first use: SAI, TVL, RWAs
- Tone consistency: "we would need a solid team of burgers" is too informal
- Fix: "backwards" → "backward" (adjective form)
- Fix semicolon misuse: "the whole protocol lives onchain; transparent" → "the whole protocol lives onchain—transparent"

---

## 8. Meta Description Improvements

### Homepage
**Current:**
> "Self-scaling stablecoin operating system. Uncorrelated, scalable returns without T-Bills, without CEXs, without compromises."

**Recommended:**
> "Polaris: the self-scaling stablecoin that grows yield with adoption. No T-Bills, no CEXs, no compromises. Join the future of DeFi."

### Blog Index
**Current:**
> "Updates, insights, and deep dives into the Self-Scaling Stablecoin Operating System."

**Recommended:**
> "Polaris blog: DeFi stablecoin insights, CDP innovations, and protocol updates. Learn how pUSD delivers scalable, trustless yield."

---

## 9. Missing Legal/Compliance Links

### Issue
Footer lacks standard legal links that may be required.

### Recommendations
Add to footer:
- Privacy Policy
- Terms of Service
- Risk Disclosure (common for DeFi)

---

## Priority Order

1. **High:** Brand consistency (affects all pages)
2. **High:** Simplify hero tagline (first impression)
3. **Medium:** POLAR token tagline
4. **Medium:** CTA improvements
5. **Medium:** Meta descriptions
6. **Low:** FAQ section (requires more content)
7. **Low:** Social proof (requires data)
8. **Low:** Blog grammar fixes
9. **Low:** Legal links (requires legal review)

---

*Generated from comprehensive website audit on 2026-02-03*
