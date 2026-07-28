import { BadgeCheck, MapPin } from "lucide-react";
import { NavLink } from "./NavLink";
import { CommodityIcon } from "./icons/CommodityIcons";
import { commodityStyleByName } from "@/lib/data";
import type { Supplier } from "@/lib/types";

interface SupplierCardProps {
  supplier: Supplier;
  compact?: boolean;
}

export function SupplierCard({ supplier, compact = false }: SupplierCardProps) {
  const categoryStyle =
    commodityStyleByName[supplier.category] ?? "bg-sky-50 ring-1 ring-sky-100";

  return (
    <article className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-white shadow-[0_4px_24px_-8px_rgba(43,111,160,0.12)] dark:bg-elevated">
      <div className="p-5 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${categoryStyle}`}
          >
            <CommodityIcon name={supplier.category} className="h-9 w-9" />
          </div>
          {supplier.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-growth/10 px-2.5 py-1 text-[11px] font-medium text-growth dark:text-growth-light">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
              Verified
            </span>
          )}
        </div>

        <p className="mb-1 text-xs font-medium text-brand">{supplier.category}</p>
        <h3 className="font-display text-lg font-semibold leading-snug text-brand-dark">
          {supplier.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">
          {supplier.commodity}
        </p>

        <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />
          {supplier.location}
        </p>
      </div>

      <div className="mx-5 border-t border-border/50 sm:mx-6" />

      <div
        className={`flex flex-1 flex-col gap-4 ${compact ? "p-5 pt-4" : "p-5 pt-4 sm:p-6 sm:pt-5"}`}
      >
        {!compact && (
          <div className="flex items-center justify-between gap-3 rounded-xl bg-page px-4 py-3 dark:bg-ocean-dark/20">
            <span className="text-xs text-muted">Production capacity</span>
            <span className="font-display text-sm font-semibold text-brand-dark">
              {supplier.capacity}
            </span>
          </div>
        )}

        <div>
          <p className="mb-2 text-xs font-medium text-muted">Exports to</p>
          <div className="flex flex-wrap gap-1.5">
            {supplier.destinations.slice(0, compact ? 2 : 4).map((d) => (
              <span
                key={d}
                className="rounded-full border border-border/80 bg-page px-3 py-0.5 text-xs font-medium text-ink dark:bg-ocean-dark/20"
              >
                {d}
              </span>
            ))}
            {compact && supplier.destinations.length > 2 && (
              <span className="rounded-full px-2 py-0.5 text-xs text-muted">
                +{supplier.destinations.length - 2}
              </span>
            )}
          </div>
        </div>

        {!compact && supplier.certifications.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium text-muted">Certifications</p>
            <div className="flex flex-wrap gap-1.5">
              {supplier.certifications.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-brand/10 px-3 py-0.5 text-xs font-medium text-brand-deep dark:text-brand-soft"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto flex items-center gap-2 pt-1">
          <NavLink
            href={`/direktori/${supplier.id}`}
            className="btn-primary flex-1 !rounded-xl !py-2.5 !text-sm"
          >
            View profile
          </NavLink>
          <NavLink
            href={`/direktori/${supplier.id}#rfq`}
            className="inline-flex shrink-0 items-center justify-center rounded-xl border-2 border-border px-4 py-2.5 text-sm font-semibold text-brand-dark transition-colors hover:border-brand/30 hover:bg-brand/5 dark:text-cream"
          >
            RFQ
          </NavLink>
        </div>
      </div>
    </article>
  );
}
