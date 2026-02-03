import { heroStats } from "@/lib/pageData";

export function StatsSection() {
  return (
    <section className="section section--gradient">
      <div className="mx-auto max-w-7xl">
        <div className="reveal-stagger grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {heroStats.map((stat) => (
            <div key={stat.value} className="stat-card">
              <span className="stat-card__icon">
                <stat.Icon className="h-4 w-4" aria-hidden />
              </span>
              <p className="stat-card__value">{stat.value}</p>
              <p className="stat-card__label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
