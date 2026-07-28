import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { testimonials, testimonialsSection } from "@/lib/data";

export function Testimonials() {
  return (
    <section className="section-padding bg-page">
      <div className="container-main">
        <Reveal>
          <SectionHeading
            label={testimonialsSection.label}
            title={testimonialsSection.title}
            align="center"
          />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 100}>
              <figure className="industrial-panel-accent flex h-full flex-col p-6 sm:p-7">
                <blockquote className="flex-1 text-sm leading-relaxed text-muted sm:text-[15px]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-ocean to-ocean-light text-xs font-bold text-white">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.author}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
