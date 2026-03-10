import { heroStats } from "@/lib/pageData";

export function StatsSection() {
  return (
    <section className="section section--declarations">
      <div className="mx-auto max-w-7xl">
        <div className="reveal-stagger declarations-grid">
          {heroStats.map((stat) => (
            <div key={stat.value} className="declaration">
              <p className="declaration__value">{stat.value}</p>
              <p className="declaration__label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
