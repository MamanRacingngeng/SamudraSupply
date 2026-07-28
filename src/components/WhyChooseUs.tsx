import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { whyChooseUs } from "@/lib/data";

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-surface dark:bg-ocean-dark/30">
      <div className="container-main">
        <Reveal>
          <SectionHeading
            label="Why Us"
            title="Why choose Samudra Supply"
            description="Built for Indonesian suppliers ready to compete in global markets."
            align="center"
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <article className="card-lift industrial-panel-accent group h-full p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan/10 text-cyan transition-all duration-300 group-hover:bg-cyan group-hover:text-ocean-deep">
                  <item.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mb-2 text-[15px] font-display font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
