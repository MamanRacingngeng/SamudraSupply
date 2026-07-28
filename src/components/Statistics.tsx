import { AnimatedCounter } from "./AnimatedCounter";
import { Reveal } from "./Reveal";
import { getStatisticsDisplay } from "@/lib/platform-stats";

export async function Statistics() {
  const statistics = await getStatisticsDisplay();

  return (
    <section className="samudra-stats relative overflow-hidden py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-brand-soft/25 blur-3xl" />
      </div>

      <div className="container-main relative z-10">
        <Reveal>
          <div className="mb-12 max-w-md">
            <p className="samudra-label mb-3 !text-white/75">Statistics</p>
            <h2 className="heading-display text-3xl text-white sm:text-4xl">
              A growing export ecosystem
            </h2>
            <div className="samudra-heading-line mt-4 !from-white/60 !to-cyan-200/80" />
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {statistics.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className="samudra-stat-card group">
                <p className="font-display text-4xl font-bold tabular-nums text-white transition-transform duration-300 group-hover:scale-105 sm:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-white/75">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
