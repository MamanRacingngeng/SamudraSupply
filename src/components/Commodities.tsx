import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { CommodityIcon } from "./icons/CommodityIcons";
import { commodities } from "@/lib/data";

export function Commodities() {
  return (
    <section id="commodities" className="section-padding bg-page">
      <div className="container-main">
        <Reveal>
          <SectionHeading
            label="Commodities"
            title="Indonesia's export specialties"
            description="12 commodity categories available in the Samudra Supply directory."
            align="center"
          />
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-4">
          {commodities.map((item, i) => (
            <Reveal key={item.name} delay={i * 40}>
              <button
                type="button"
                className="card-lift group flex w-full flex-col items-center rounded-2xl border border-border bg-white p-4 text-center shadow-sm sm:p-5"
              >
                <div
                  className={`mb-3 flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} transition-all duration-300 group-hover:scale-110 group-hover:shadow-md sm:h-16 sm:w-16`}
                >
                  <CommodityIcon name={item.name} className="h-11 w-11 sm:h-12 sm:w-12" />
                </div>
                <span className="font-display text-xs font-medium text-brand-dark sm:text-sm">
                  {item.name}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
