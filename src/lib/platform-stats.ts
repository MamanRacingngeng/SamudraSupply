import "server-only";

import { getAllSuppliers } from "./supplier-store";import { commodities } from "./data";
import { getSubmissionStats } from "./storage";

export interface PlatformStats {
  suppliers: number;
  commodities: number;
  countries: number;
  inquiries: number;
}

export async function getPlatformStats(): Promise<PlatformStats> {
  const [suppliers, submissionStats] = await Promise.all([
    getAllSuppliers(),
    getSubmissionStats().catch(() => ({
      totalRfq: 0,
      totalContact: 0,
      todayRfq: 0,
      todayContact: 0,
    })),
  ]);

  const categories = new Set(suppliers.map((s) => s.category));
  const destinations = new Set(suppliers.flatMap((s) => s.destinations));

  return {
    suppliers: suppliers.length,
    commodities: Math.max(categories.size, commodities.length),
    countries: destinations.size,
    inquiries: submissionStats.totalRfq + submissionStats.totalContact,
  };
}

export async function getStatisticsDisplay() {
  const stats = await getPlatformStats();

  return [
    { value: stats.suppliers, suffix: "+", label: "Registered Suppliers" },
    { value: stats.commodities, suffix: "+", label: "Commodity Types" },
    { value: stats.countries, suffix: "+", label: "Destination Countries" },
    {
      value: Math.max(stats.inquiries, 1),
      suffix: stats.inquiries > 0 ? "+" : "",
      label: "Inquiries Received",
    },
  ];
}
