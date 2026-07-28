import { readFileSync } from "fs";
import path from "path";
import type { Supplier } from "./types";

const SUPPLIERS_FILE = path.join(process.cwd(), "data", "suppliers.json");

export function getSuppliersSync(): Supplier[] {
  try {
    const raw = readFileSync(SUPPLIERS_FILE, "utf-8");
    return (JSON.parse(raw) as Supplier[]).filter((s) => s.active !== false);
  } catch {
    return [];
  }
}

export function getSupplierBySlugSync(slug: string): Supplier | undefined {
  return getSuppliersSync().find((s) => s.id === slug);
}

export function getAllSupplierSlugsSync(): string[] {
  return getSuppliersSync().map((s) => s.id);
}

export function getRelatedSuppliersSync(slug: string, limit = 3): Supplier[] {
  const list = getSuppliersSync();
  const current = list.find((s) => s.id === slug);
  if (!current) return [];
  return list.filter((s) => s.id !== slug && s.category === current.category).slice(0, limit);
}

export function getFeaturedSuppliersSync(limit = 3): Supplier[] {
  const list = getSuppliersSync();
  const verified = list.filter((s) => s.verified);
  return (verified.length >= limit ? verified : list).slice(0, limit);
}
