import { SectionHeading } from "./SectionHeading";
import { SupplierCard } from "./SupplierCard";
import { NavLink } from "./NavLink";
import { Reveal } from "./Reveal";
import { getFeaturedSuppliers } from "@/lib/supplier-store";

export async function FeaturedSuppliers() {
  const featured = await getFeaturedSuppliers();

  return (
    <section id="featured-suppliers" className="section-padding bg-page scroll-mt-28">
      <div id="supplier" className="sr-only" aria-hidden />
      <div className="container-main">
        <Reveal>
          <SectionHeading
            label="Directory"
            title="Featured suppliers"
            description="Verified Indonesian exporters — ready for global buyer inquiries."
            align="center"
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <Reveal key={s.id} delay={i * 100}>
              <SupplierCard supplier={s} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-10 text-center">
            <NavLink href="/direktori" className="btn-secondary">
              View all suppliers
            </NavLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
