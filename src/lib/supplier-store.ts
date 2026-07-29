import "server-only";

import { ensurePlatformReady } from "./bootstrap";
import type { Supplier } from "./types";
import { copyBundledIfMissing, readJsonFile, writeJsonFile } from "./json-store";

async function seedIfMissing() {
  await copyBundledIfMissing("suppliers.json");
}

async function readSupplierList(): Promise<Supplier[]> {
  await ensurePlatformReady();
  await seedIfMissing();

  const list = await readJsonFile<Supplier[]>("suppliers.json", []);
  if (Array.isArray(list) && list.length > 0) return list;

  const seed = await readJsonFile<Supplier[]>("suppliers.seed.json", []);
  if (Array.isArray(seed) && seed.length > 0) {
    await writeJsonFile("suppliers.json", seed);
    return seed;
  }

  return [];
}

export async function getAllSuppliers(includeInactive = false): Promise<Supplier[]> {
  const list = await readSupplierList();
  return includeInactive ? list : list.filter((s) => s.active !== false);
}

export async function getSupplierBySlug(slug: string): Promise<Supplier | undefined> {
  const list = await getAllSuppliers(true);
  const s = list.find((x) => x.id === slug);
  return s?.active !== false ? s : undefined;
}

export async function getAllSupplierSlugs(): Promise<string[]> {
  const list = await getAllSuppliers();
  return list.map((s) => s.id);
}

export async function getRelatedSuppliers(
  slug: string,
  limit = 3
): Promise<Supplier[]> {
  const list = await getAllSuppliers();
  const current = list.find((s) => s.id === slug);
  if (!current) return [];
  return list.filter((s) => s.id !== slug && s.category === current.category).slice(0, limit);
}

export async function getFeaturedSuppliers(limit = 3): Promise<Supplier[]> {
  const list = await getAllSuppliers();
  const verified = list.filter((s) => s.verified);
  return (verified.length >= limit ? verified : list).slice(0, limit);
}

export async function createSupplier(data: Supplier): Promise<Supplier> {
  await seedIfMissing();
  const list = await readJsonFile<Supplier[]>("suppliers.json", []);

  if (list.some((s) => s.id === data.id)) {
    throw new Error("Supplier ID is already in use");
  }

  list.push(data);
  await writeJsonFile("suppliers.json", list);
  return data;
}

export async function updateSupplier(
  id: string,
  data: Partial<Supplier>
): Promise<Supplier> {
  await seedIfMissing();
  const list = await readJsonFile<Supplier[]>("suppliers.json", []);
  const idx = list.findIndex((s) => s.id === id);
  if (idx === -1) throw new Error("Supplier not found");

  list[idx] = { ...list[idx], ...data, id };
  await writeJsonFile("suppliers.json", list);
  return list[idx];
}

export async function deleteSupplier(id: string): Promise<void> {
  await seedIfMissing();
  const list = await readJsonFile<Supplier[]>("suppliers.json", []);
  const idx = list.findIndex((s) => s.id === id);
  if (idx === -1) throw new Error("Supplier not found");

  list[idx].active = false;
  await writeJsonFile("suppliers.json", list);
}
