import { Footer } from "@/components/Footer";
import { JsonLd, organizationSchema, softwareApplicationSchema, websiteSchema } from "@/components/JsonLd";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  BenefitsSection,
  CompassDivider,
  HeroSection,
  HowItWorksSection,
  StablecoinOSSection,
  StatsSection,
  TokensSection,
} from "@/components/sections";
import { TopNav } from "@/components/TopNav";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Skip to content link for keyboard accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={softwareApplicationSchema} />
      <ScrollReveal />

      <TopNav />

      <HeroSection />

      <StatsSection />

      <CompassDivider />

      <HowItWorksSection />

      <CompassDivider />

      <TokensSection />

      <CompassDivider />

      <StablecoinOSSection />

      <CompassDivider />

      <BenefitsSection />

      <Footer />
    </main>
  );
}
