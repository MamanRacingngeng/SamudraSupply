import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Commodities } from "@/components/Commodities";
import { HowItWorks } from "@/components/HowItWorks";
import { Benefits } from "@/components/Benefits";
import { FeaturedSuppliers } from "@/components/FeaturedSuppliers";
import { Statistics } from "@/components/Statistics";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { FutureFeatures } from "@/components/FutureFeatures";
import { Footer } from "@/components/Footer";
import { ensurePlatformReady } from "@/lib/bootstrap";
import { getPlatformStats } from "@/lib/platform-stats";

export default async function Home() {
  await ensurePlatformReady();
  const stats = await getPlatformStats();

  return (
    <>
      <Navbar />
      <main>
        <Hero stats={stats} />
        <About />
        <WhyChooseUs />
        <Commodities />
        <HowItWorks />
        <Benefits />
        <FeaturedSuppliers />
        <Statistics />
        <Testimonials />
        <FAQ />
        <Contact />
        <FutureFeatures />
      </main>
      <Footer />
    </>
  );
}
