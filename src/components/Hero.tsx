import { Globe2, Ship, Anchor } from "lucide-react";
import { NavLink } from "./NavLink";
import { OceanPhotoBackdrop } from "./OceanPhotoBackdrop";
import { SamudraWave } from "./SamudraWave";
import { CommodityMarquee } from "./CommodityMarquee";
import type { PlatformStats } from "@/lib/platform-stats";

interface HeroProps {
  stats: PlatformStats;
}

export function Hero({ stats }: HeroProps) {
  return (
    <>
      <section className="samudra-hero relative isolate flex min-h-[92vh] flex-col overflow-hidden pt-28 pb-0 sm:pt-32 lg:pt-36">
        <OceanPhotoBackdrop variant="hero" />

        {/* Gradient mesh */}
        <div className="samudra-mesh pointer-events-none absolute inset-0" aria-hidden />

        <div className="container-main relative z-10 flex-1 pb-16 sm:pb-20 lg:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            {/* Copy */}
            <div>
              <h1 className="samudra-shimmer-text font-display text-[clamp(2.35rem,5.5vw,4rem)] font-bold leading-[1.08] tracking-tight">
                From Indonesia
                <br />
                to the World
              </h1>

              <p className="mt-5 text-lg font-medium leading-snug text-white/95 sm:text-xl">
                Discover trusted suppliers behind Indonesia&apos;s finest commodities.
              </p>

              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/75">
                Samudra Supply connects global buyers with export-ready Indonesian suppliers
                through a curated marketplace built for trust, transparency, and long-term trade.
              </p>

              <p className="mt-4 border-l-2 border-cyan-300/60 pl-4 text-sm font-semibold text-cream sm:text-base">
                Quality from Indonesia. Connections beyond borders.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <NavLink href="/#contact" className="btn-samudra-primary">
                  Join as Supplier
                </NavLink>
                <NavLink href="/direktori" className="btn-samudra-glass">
                  Find Suppliers
                </NavLink>
              </div>

              <div className="relative z-30 mt-10 mb-2 grid grid-cols-3 gap-3 sm:max-w-md sm:mb-4">
                {[
                  { n: `${stats.suppliers}+`, l: "Suppliers" },
                  { n: `${stats.countries}+`, l: "Countries" },
                  { n: `${stats.commodities}+`, l: "Commodities" },
                ].map((s) => (
                  <div key={s.l} className="samudra-stat">
                    <p className="font-display text-xl font-bold tabular-nums text-white sm:text-2xl">
                      {s.n}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-white/65">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Export visual card — desktop */}
            <div className="hidden lg:block">
              <div className="samudra-glass relative overflow-hidden rounded-3xl p-8">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-brand-soft/20 blur-2xl" />

                <p className="label-caps mb-6 !text-white/70">Export Route</p>

                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                      <Anchor className="h-6 w-6 text-cream" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-white">Indonesia</p>
                      <p className="text-sm text-white/60">Verified export suppliers</p>
                    </div>
                  </div>

                  <div className="ml-6 border-l-2 border-dashed border-cyan-300/40 pl-6 py-1">
                    <div className="flex items-center gap-3 text-white/80">
                      <Ship className="h-5 w-5 text-cyan-200" />
                      <span className="text-sm">Samudra Supply platform</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300/30 to-brand/40 ring-1 ring-white/25">
                      <Globe2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-white">Global Buyers</p>
                      <p className="text-sm text-white/60">RFQ · Directory · Trust</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
                  <p className="text-center text-sm font-medium text-white/90">
                    Bridging Nusantara commodities to world markets
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-transition relative z-0 mt-auto w-full shrink-0">
          <SamudraWave />
          <CommodityMarquee />
        </div>
      </section>
    </>
  );
}
