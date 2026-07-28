import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { howItWorks } from "@/lib/data";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-surface dark:bg-ocean-dark/30">
      <div className="container-main">
        <Reveal>
          <SectionHeading
            label="How It Works"
            title="From registration to deal"
            align="center"
          />
        </Reveal>

        <ol className="relative mx-auto max-w-2xl">
          <div
            className="absolute left-[19px] top-3 hidden h-[calc(100%-24px)] w-px bg-gradient-to-b from-cyan via-ocean-light to-brass sm:block"
            aria-hidden
          />

          {howItWorks.map((step, i) => (
            <Reveal key={step.step} delay={i * 100}>
              <li className="relative flex gap-5 pb-10 last:pb-0 sm:gap-6">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-ocean to-ocean-light text-sm font-bold text-white shadow-lg shadow-ocean/30 ring-4 ring-surface dark:ring-ocean-dark/40">
                  {String(step.step).padStart(2, "0")}
                </span>
                <div className="pt-1.5">
                  <h3 className="font-display text-base font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-[15px]">
                    {step.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
