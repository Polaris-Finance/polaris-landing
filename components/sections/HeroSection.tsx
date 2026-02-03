import { basePath } from "@/lib/basePath";
import Image from "next/image";

// Generate random stars for the starfield
function generateStars(count: number, type: "tiny" | "small" | "medium" | "bright") {
  return Array.from({ length: count }, (_, i) => {
    const isNearPolaris = type !== "bright" && Math.random() < 0.3;
    const baseLeft = isNearPolaris ? 40 + Math.random() * 20 : Math.random() * 100;
    const baseTop = isNearPolaris ? 20 + Math.random() * 30 : Math.random() * 55;

    return {
      id: `${type}-${i}`,
      index: i,
      left: `${baseLeft}%`,
      top: `${baseTop}%`,
      delay: `${Math.random() * 5}s`,
      nearPolaris: isNearPolaris,
      hideOnMobile: type === "tiny" ? i >= 10 : type === "small" ? i >= 5 : type === "medium" ? i >= 2 : i >= 2,
    };
  });
}

const tinyStars = generateStars(30, "tiny");
const smallStars = generateStars(15, "small");
const mediumStars = generateStars(5, "medium");
const brightStars = generateStars(3, "bright");

function Mountains() {
  return (
    <div className="mountains" aria-hidden="true">
      <svg className="mountain mountain--left" viewBox="0 0 400 200" preserveAspectRatio="none">
        <path
          d="M0,200 L0,120 L50,80 L100,100 L150,60 L200,90 L250,40 L300,70 L350,50 L400,80 L400,200 Z"
          fill="#0d1f3c"
          opacity="0.7"
        />
        <path
          d="M0,200 L0,140 L80,100 L120,120 L180,80 L220,110 L280,70 L340,100 L400,90 L400,200 Z"
          fill="#122a4d"
          opacity="0.5"
        />
      </svg>
      <svg className="mountain mountain--right" viewBox="0 0 400 200" preserveAspectRatio="none">
        <path
          d="M0,200 L0,100 L60,70 L100,90 L160,50 L220,80 L280,30 L340,60 L400,40 L400,200 Z"
          fill="#0d1f3c"
          opacity="0.5"
        />
        <path
          d="M0,200 L0,130 L50,100 L110,120 L170,80 L230,100 L290,60 L350,90 L400,70 L400,200 Z"
          fill="#122a4d"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}

function WaveSurface() {
  return (
    <svg viewBox="0 0 1200 30" preserveAspectRatio="none">
      <path
        d="M0,15 Q75,12 150,15 T300,15 T450,15 T600,15 T750,15 T900,15 T1050,15 T1200,15"
        fill="none"
        stroke="rgba(232, 220, 196, 0.12)"
        strokeWidth="1"
      />
      <path
        d="M0,20 Q75,17 150,20 T300,20 T450,20 T600,20 T750,20 T900,20 T1050,20 T1200,20"
        fill="none"
        stroke="rgba(232, 220, 196, 0.08)"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function Ocean() {
  return (
    <div className="ocean" aria-hidden="true">
      <div className="wave-surface">
        <WaveSurface />
      </div>
      <div className="water-ripple water-ripple--1" />
      <div className="water-ripple water-ripple--2" />
      <div className="water-ripple water-ripple--3" />
      <div className="water-glow water-glow--1" />
      <div className="water-glow water-glow--2" />
      <div className="water-glow water-glow--3" />
      <div className="star-reflection" />
      <div className="star-reflection-band star-reflection-band--1" />
      <div className="star-reflection-band star-reflection-band--2" />
      <div className="star-reflection-band star-reflection-band--3" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section id="main-content" className="hero-scene">
      {/* Starfield with drift animation */}
      <div className="starfield starfield--drift" aria-hidden="true">
        {tinyStars.map((star) => (
          <div
            key={star.id}
            className={`star star--tiny ${star.nearPolaris ? "star--near-polaris" : ""} ${star.hideOnMobile ? "star--hide-mobile" : ""}`}
            style={{ left: star.left, top: star.top }}
          />
        ))}
        {smallStars.map((star) => (
          <div
            key={star.id}
            className={`star star--small ${star.nearPolaris ? "star--near-polaris" : ""} ${star.hideOnMobile ? "star--hide-mobile" : ""}`}
            style={{ left: star.left, top: star.top, animationDelay: star.delay }}
          />
        ))}
        {mediumStars.map((star) => (
          <div
            key={star.id}
            className={`star star--medium ${star.nearPolaris ? "star--near-polaris" : ""} ${star.hideOnMobile ? "star--hide-mobile" : ""}`}
            style={{ left: star.left, top: star.top, animationDelay: star.delay }}
          />
        ))}
        {brightStars.map((star) => (
          <div
            key={star.id}
            className={`star star--bright ${star.hideOnMobile ? "star--hide-mobile" : ""}`}
            style={{ left: star.left, top: star.top, animationDelay: star.delay }}
          />
        ))}
      </div>

      <Mountains />
      <Ocean />

      {/* Polaris Star - Main focal point */}
      <div className="polaris-star-container">
        <div className="polaris-depth-ring polaris-depth-ring--3" />
        <div className="polaris-depth-ring polaris-depth-ring--2" />
        <div className="polaris-depth-ring polaris-depth-ring--1" />
        <div className="polaris-glow-ring" />
        <div className="polaris-star-glow" />
        <Image
          src={`${basePath}/emblem.svg`}
          alt="Polaris star"
          width={320}
          height={320}
          className="polaris-star w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80"
          priority
        />
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-star-zone" aria-hidden="true" />
        <div className="hero-text-content">
          <div className="hero-logo">
            <h1 className="hero-title">Self-Scaling Stablecoin Operating System</h1>
          </div>
          <p className="hero-tagline">
            We&apos;re building uncorrelated, scalable returns without T-Bills, without CEXs, without compromises.
          </p>
          <div className="hero-cta">
            <a href="https://x.com/polarisfinance_" className="btn-primary" target="_blank" rel="noreferrer">
              Get updates on X
            </a>
            <a href="https://t.me/polaris_ann" className="btn-primary" target="_blank" rel="noreferrer">
              Get updates on Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
