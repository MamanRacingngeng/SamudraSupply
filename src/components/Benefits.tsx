import { Check } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { supplierBenefits, buyerBenefits } from "@/lib/data";

export function Benefits() {
  return (
    <section className="section-padding bg-page">
      <div className="container-main">
        <Reveal>
          <SectionHeading
            label="Benefits"
            title="Value for both sides"
            align="center"
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal delay={100}>
            <div className="industrial-panel-accent h-full border-ocean/20 bg-gradient-to-br from-ocean/[0.06] to-transparent p-7 sm:p-8">
              <p className="label-caps mb-1">For suppliers</p>
              <h3 className="heading-display mb-6 text-2xl">Global visibility</h3>
              <ul className="space-y-3">
                {supplierBenefits.map((b, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted sm:text-[15px]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-growth" strokeWidth={2.5} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="industrial-panel-accent h-full border-cyan/20 bg-gradient-to-br from-cyan/[0.06] to-transparent p-7 sm:p-8">
              <p className="label-caps mb-1 !text-cyan-dim">For buyers</p>
              <h3 className="heading-display mb-6 text-2xl">Trusted suppliers</h3>
              <ul className="space-y-3">
                {buyerBenefits.map((b, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted sm:text-[15px]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-dim" strokeWidth={2.5} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
