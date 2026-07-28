import { Anchor, Globe2, Ship } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden bg-page">
      <div className="pointer-events-none absolute inset-0 samudra-section-glow" aria-hidden />

      <div className="container-main relative">
        <Reveal>
          <SectionHeading
            label="About Samudra Supply"
            title="Connecting Indonesia's Finest Products with the World"
            align="center"
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="samudra-content-card mx-auto max-w-3xl">
            <div className="mb-8 flex flex-wrap justify-center gap-4">
              {[
                { icon: Anchor, label: "Verified Suppliers" },
                { icon: Ship, label: "Export Ready" },
                { icon: Globe2, label: "Global Reach" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full bg-brand/8 px-4 py-2 text-sm font-medium text-brand-dark ring-1 ring-brand/15 dark:text-cream"
                >
                  <Icon className="h-4 w-4 text-brand" />
                  {label}
                </span>
              ))}
            </div>

            <div className="space-y-5 text-[15px] leading-[1.85] text-muted sm:text-base">
              <p>
                Indonesia holds extraordinary richness — from highland coffee and premium
                spices to quality coconut and standout commodities valued in global markets.
              </p>
              <p>
                Yet many Indonesian suppliers still face the same challenge: their products
                are high quality, but they lack an identity that can compete on the world
                stage.
              </p>
              <p>
                <strong className="font-semibold text-brand-dark dark:text-cream">
                  Samudra Supply
                </strong>{" "}
                exists to answer that challenge — a digital bridge from archipelago to global
                markets.
              </p>
              <p>
                We connect Indonesian suppliers with international buyers through professional
                profiles, trusted product information, and trade networks that are easier to
                access.
              </p>
              <p>
                More than a directory, Samudra Supply helps Indonesian businesses appear
                prepared, credible, and trusted by buyers worldwide.
              </p>
            </div>

            <blockquote className="samudra-quote mt-8">
              Samudra Supply — Bringing Indonesia&apos;s quality to the world market.
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
