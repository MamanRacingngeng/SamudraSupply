import "server-only";

import { readFile, writeFile, mkdir, copyFile } from "fs/promises";
import path from "path";
import { ensurePlatformReady } from "./bootstrap";
import type { Supplier } from "./types";
const DATA_DIR = path.join(process.cwd(), "data");
const SUPPLIERS_FILE = path.join(DATA_DIR, "suppliers.json");
const SEED_FILE = path.join(DATA_DIR, "suppliers.seed.json");

async function ensureDataDir() {
  await mkdir(DATA_DIR, { recursive: true });
}

async function seedIfMissing() {
  await ensureDataDir();
  try {
    await readFile(SUPPLIERS_FILE, "utf-8");
  } catch {
    try {
      await copyFile(SEED_FILE, SUPPLIERS_FILE);
    } catch {
      await writeFile(SUPPLIERS_FILE, "[]", "utf-8");
    }
  }
}

async function readSupplierList(): Promise<Supplier[]> {
  await ensurePlatformReady();
  await seedIfMissing();
  try {
    const raw = await readFile(SUPPLIERS_FILE, "utf-8");
    const list = JSON.parse(raw) as Supplier[];
    if (Array.isArray(list) && list.length > 0) return list;
  } catch {
    /* fall through to seed */
  }

  try {
    const seed = await readFile(SEED_FILE, "utf-8");
    const list = JSON.parse(seed) as Supplier[];
    if (Array.isArray(list) && list.length > 0) {
      await writeFile(SUPPLIERS_FILE, JSON.stringify(list, null, 2), "utf-8");
      return list;
    }
  } catch {
    /* ignore */
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
  const list = JSON.parse(await readFile(SUPPLIERS_FILE, "utf-8")) as Supplier[];

  if (list.some((s) => s.id === data.id)) {
    throw new Error("Supplier ID is already in use");
  }

  list.push(data);
  await writeFile(SUPPLIERS_FILE, JSON.stringify(list, null, 2), "utf-8");
  return data;
}

export async function updateSupplier(
  id: string,
  data: Partial<Supplier>
): Promise<Supplier> {
  await seedIfMissing();
  const list = JSON.parse(await readFile(SUPPLIERS_FILE, "utf-8")) as Supplier[];
  const idx = list.findIndex((s) => s.id === id);
  if (idx === -1) throw new Error("Supplier not found");

  list[idx] = { ...list[idx], ...data, id };
  await writeFile(SUPPLIERS_FILE, JSON.stringify(list, null, 2), "utf-8");
  return list[idx];
}

export async function deleteSupplier(id: string): Promise<void> {
  await seedIfMissing();
  const list = JSON.parse(await readFile(SUPPLIERS_FILE, "utf-8")) as Supplier[];
  const idx = list.findIndex((s) => s.id === id);
  if (idx === -1) throw new Error("Supplier not found");

  list[idx].active = false;
  await writeFile(SUPPLIERS_FILE, JSON.stringify(list, null, 2), "utf-8");
}
