import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Calendar,
  Globe2,
  MapPin,
  Package,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RFQForm } from "@/components/RFQForm";
import { SupplierCard } from "@/components/SupplierCard";
import { NavLink } from "@/components/NavLink";
import {
  getSupplierBySlug,
  getRelatedSuppliers,
} from "@/lib/supplier-store";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const supplier = await getSupplierBySlug(slug);
  if (!supplier) return { title: "Supplier not found" };

  return {
    title: `${supplier.name} | Samudra Supply Supplier Directory`,
    description: supplier.description,
  };
}

export default async function SupplierDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supplier = await getSupplierBySlug(slug);
  if (!supplier) notFound();

  const related = await getRelatedSuppliers(slug);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-page pt-28 pb-20 sm:pt-32">
        <div className="container-main">
          <NavLink
            href="/direktori"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ocean"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Directory
          </NavLink>

          <div
            className={`mb-10 overflow-hidden rounded-3xl bg-gradient-to-br ${supplier.color}`}
          >
            <div className="px-6 py-10 sm:px-10 sm:py-12">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold text-white backdrop-blur-sm">
                    {supplier.initials}
                  </div>
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                        {supplier.category}
                      </span>
                      {supplier.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                          <BadgeCheck className="h-3.5 w-3.5" />
                          Verified
                        </span>
                      )}
                    </div>
                    <h1 className="heading-display !text-white text-3xl sm:text-4xl">
                      {supplier.name}
                    </h1>
                    <p className="mt-2 text-lg text-white/80">{supplier.commodity}</p>
                  </div>
                </div>
                <NavLink
                  href={`/direktori/${supplier.id}#rfq`}
                  className="btn-secondary shrink-0 !border-white/30 !bg-white/10 !text-white hover:!bg-white/20"
                >
                  Send RFQ
                </NavLink>
              </div>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-12">
            <div className="space-y-8">
              <section>
                <h2 className="heading-display mb-4 text-2xl">About the Company</h2>
                <p className="leading-relaxed text-muted">{supplier.description}</p>
              </section>

              <section className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: MapPin, label: "Location", value: supplier.location },
                  { icon: Package, label: "Capacity", value: supplier.capacity },
                  {
                    icon: Calendar,
                    label: "Established",
                    value: String(supplier.established),
                  },
                  { icon: Globe2, label: "Province", value: supplier.province },
                ].map((item) => (
                  <div key={item.label} className="card-base p-5">
                    <item.icon className="mb-2 h-5 w-5 text-ocean dark:text-ocean-soft" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {item.label}
                    </p>
                    <p className="mt-1 font-medium">{item.value}</p>
                  </div>
                ))}
              </section>

              <section>
                <h2 className="heading-display mb-4 text-2xl">Export Products</h2>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {supplier.products.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm dark:bg-elevated"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-growth" />
                      {p}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="heading-display mb-4 text-2xl">Export Destinations</h2>
                <div className="flex flex-wrap gap-2">
                  {supplier.destinations.map((d) => (
                    <span
                      key={d}
                      className="rounded-full bg-ocean/10 px-4 py-1.5 text-sm font-medium text-ocean dark:bg-ocean/20 dark:text-ocean-soft"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="heading-display mb-4 text-2xl">Certifications</h2>
                <div className="flex flex-wrap gap-2">
                  {supplier.certifications.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-growth/10 px-4 py-1.5 text-sm font-medium text-growth dark:bg-growth/20 dark:text-growth-light"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <RFQForm supplierId={supplier.id} supplierName={supplier.name} />
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-16 border-t border-border pt-16">
              <h2 className="heading-display mb-8 text-2xl">
                Similar suppliers — {supplier.category}
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((s) => (
                  <SupplierCard key={s.id} supplier={s} compact />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
