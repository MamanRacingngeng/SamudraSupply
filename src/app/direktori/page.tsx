import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DirectoryClient } from "@/components/DirectoryClient";
import { OceanPhotoBackdrop } from "@/components/OceanPhotoBackdrop";
import { getAllSuppliers } from "@/lib/supplier-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Supplier Directory | Samudra Supply",
  description:
    "Find trusted Indonesian commodity suppliers. Filter by category, location, and certification. Send RFQs directly to exporters.",
};

export default async function DirektoriPage() {
  const suppliers = await getAllSuppliers();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-page">
        <section className="relative overflow-hidden pt-28 pb-12 sm:pt-32">
          <OceanPhotoBackdrop variant="page" />
          <div className="container-main relative z-10">
            <p className="label-caps mb-4 !text-white/90">Supplier Directory</p>
            <h1 className="heading-display !text-white max-w-2xl text-[clamp(2rem,4.5vw,3rem)] leading-[1.1] drop-shadow-sm">
              Find trusted Indonesian suppliers
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              Browse {suppliers.length}+ export commodity suppliers across Indonesia.
              Filter, compare, and send RFQs directly.
            </p>
          </div>
        </section>

        <div className="container-main pb-20 pt-8">
          <DirectoryClient suppliers={suppliers} />
        </div>
      </main>
      <Footer />
    </>
  );
}
