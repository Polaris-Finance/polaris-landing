"use client";

const phases = [
  {
    name: "Protocol Design",
    status: "complete" as const,
    description: "Core mechanisms defined, bonding curve mathematics finalized"
  },
  {
    name: "Testnet Launch",
    status: "complete" as const,
    description: "Live on Sepolia. Explore metrics at Testnet Analytics"
  },
  {
    name: "Security Review",
    status: "progress" as const,
    description: "Agent-based modeling, simulations, audit preparation"
  },
  {
    name: "Audits",
    status: "upcoming" as const,
    description: "Professional security audits & extensive pre-launch modelization"
  },
  {
    name: "Mainnet Launch",
    status: "upcoming" as const,
    description: "Following comprehensive security review and audits"
  },
  {
    name: "StablecoinOS",
    status: "future" as const,
    description: "Stewardship begins to handle protocol parametrization and fork licensing, ecosystem incentives start."
  }
];

const statusConfig = {
  complete: {
    bg: "bg-[var(--polaris-success)]",
    bgRgb: "rgba(var(--polaris-success-rgb), 0.15)",
    border: "rgba(var(--polaris-success-rgb), 0.3)",
    label: "Complete",
    dot: "",
    textColor: "var(--polaris-navy-darkest)"
  },
  live: {
    bg: "bg-[var(--polaris-warning)]",
    bgRgb: "rgba(var(--polaris-warning-rgb), 0.15)",
    border: "rgba(var(--polaris-warning-rgb), 0.3)",
    label: "Live",
    dot: "animate-pulse",
    textColor: "var(--polaris-navy-darkest)"
  },
  progress: {
    bg: "bg-[var(--polaris-info)]",
    bgRgb: "rgba(var(--polaris-info-rgb), 0.15)",
    border: "rgba(var(--polaris-info-rgb), 0.3)",
    label: "In Progress",
    dot: "",
    textColor: "var(--polaris-navy-darkest)"
  },
  upcoming: {
    bg: "bg-[var(--polaris-star)]",
    bgRgb: "rgba(var(--polaris-star-rgb), 0.1)",
    border: "rgba(var(--polaris-star-rgb), 0.2)",
    label: "Upcoming",
    dot: "",
    textColor: "var(--polaris-navy-darkest)"
  },
  future: {
    bg: "bg-[rgba(var(--polaris-star-rgb),0.15)]",
    bgRgb: "rgba(var(--polaris-star-rgb), 0.05)",
    border: "rgba(var(--polaris-star-rgb), 0.15)",
    label: "Future",
    dot: "",
    textColor: "var(--polaris-cream)"
  }
};

export function RoadmapSection() {
  return (
    <section id="roadmap" className="section section--gradient">
      <div className="mx-auto max-w-4xl">
        <h2 className="reveal section-heading">Protocol Roadmap</h2>
        <p className="reveal section-description">
          From conception to mainnet and beyond. Our path to scalable, trustless stablecoins.
        </p>
        
        <div className="reveal-stagger mt-10 relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-[var(--polaris-success)] via-[var(--polaris-warning)] to-[rgba(var(--polaris-star-rgb),0.1)]" />
          
          <div className="space-y-6">
            {phases.map((phase, index) => {
              const config = statusConfig[phase.status];
              return (
                <div 
                  key={phase.name}
                  className="relative flex gap-6 items-start"
                >
                  {/* Status dot */}
                  <div 
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${config.bg} ${config.dot}`}
                    style={{ 
                      boxShadow: `0 0 20px ${config.bgRgb}` 
                    }}
                  >
                    <span 
                      className={`text-xs font-bold ${
                        phase.status === "future" 
                          ? "text-[var(--polaris-cream)]" 
                          : "text-[var(--polaris-navy-darkest)]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  
                  {/* Content card */}
                  <div 
                    className="flex-1 rounded-2xl border p-5 transition-all hover:translate-x-1"
                    style={{ 
                      backgroundColor: config.bgRgb,
                      borderColor: config.border
                    }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-serif text-xl text-[var(--polaris-star)]">
                        {phase.name}
                      </h3>
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
                        style={{ 
                          backgroundColor: phase.status === "future" ? "rgba(var(--polaris-star-rgb), 0.2)" : config.bg.startsWith("bg-[var") ? `var(${config.bg.match(/var\(([^)]+)\)/)?.[1] || "--polaris-star"})` : "rgba(var(--polaris-star-rgb), 0.3)",
                          color: config.textColor
                        }}
                      >
                        {config.label}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-[var(--polaris-cream-muted)]">
                      {phase.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
