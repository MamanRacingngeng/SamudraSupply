import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NavLink } from "@/components/NavLink";

export default function SupplierNotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-page px-5 pt-28 text-center">
        <p className="label-caps mb-4">404</p>
        <h1 className="heading-display text-3xl">Supplier not found</h1>
        <p className="mt-3 max-w-md text-muted">
          The supplier profile you are looking for does not exist or is no longer
          active in the Samudra Supply directory.
        </p>
        <NavLink href="/direktori" className="btn-primary mt-8">
          Back to Directory
        </NavLink>
      </main>
      <Footer />
    </>
  );
}
