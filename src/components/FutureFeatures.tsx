import { SectionHeading } from "./SectionHeading";
import { futureFeatures } from "@/lib/data";
import { Reveal } from "./Reveal";

export function FutureFeatures() {
  return (
    <section className="section-padding bg-sky-deep">
      <div className="container-main">
        <Reveal>
          <SectionHeading
            label="Roadmap"
            title="Upcoming features"
            description="The platform is evolving into a full-scale international B2B export ecosystem."
            align="center"
            light
          />
        </Reveal>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {futureFeatures.map((f, i) => (
            <Reveal key={f.title} delay={i * 50}>
              <li className="flex flex-col items-center rounded-2xl border border-cream/15 bg-cream/10 p-5 text-center transition-all duration-300 hover:bg-cream/15">
                <f.icon className="mb-3 h-5 w-5 text-cream" strokeWidth={1.75} />
                <span className="font-display text-xs font-medium text-cream/90 sm:text-sm">
                  {f.title}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
