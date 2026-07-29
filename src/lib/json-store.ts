import "server-only";

import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { head, put } from "@vercel/blob";

const BLOB_PREFIX = "samudra";
const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
const isVercel = process.env.VERCEL === "1";

function resolveLocalPath(relative: string): string {
  if (isVercel && !useBlob) {
    return path.join("/tmp", "samudra-data", relative);
  }
  return path.join(process.cwd(), "data", relative);
}

function blobKey(relative: string): string {
  return `${BLOB_PREFIX}/${relative.replace(/\\/g, "/")}`;
}

async function readFromBlob<T>(relative: string): Promise<T | null> {
  try {
    const meta = await head(blobKey(relative));
    const res = await fetch(meta.url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function readFromBundled<T>(relative: string): Promise<T | null> {
  try {
    const raw = await readFile(path.join(process.cwd(), "data", relative), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function getStorageMode(): "blob" | "local" | "tmp" {
  if (useBlob) return "blob";
  if (isVercel) return "tmp";
  return "local";
}

export async function readJsonFile<T>(relative: string, fallback: T): Promise<T> {
  if (useBlob) {
    const blobData = await readFromBlob<T>(relative);
    if (blobData !== null) return blobData;

    const bundled = await readFromBundled<T>(relative);
    return bundled ?? fallback;
  }

  try {
    const raw = await readFile(resolveLocalPath(relative), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    const bundled = await readFromBundled<T>(relative);
    return bundled ?? fallback;
  }
}

export async function writeJsonFile<T>(relative: string, data: T): Promise<void> {
  const content = JSON.stringify(data, null, 2);

  if (useBlob) {
    await put(blobKey(relative), content, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return;
  }

  const fullPath = resolveLocalPath(relative);
  await mkdir(path.dirname(fullPath), { recursive: true });
  await writeFile(fullPath, content, "utf-8");

  if (isVercel && !useBlob) {
    console.warn(
      `[storage] Saved ${relative} to ephemeral /tmp. Connect Vercel Blob for persistent storage.`
    );
  }
}

export async function ensureJsonFile<T>(relative: string, fallback: T): Promise<void> {
  if (useBlob) {
    const existing = await readFromBlob<T>(relative);
    if (existing !== null) return;
  } else {
    try {
      await readFile(resolveLocalPath(relative), "utf-8");
      return;
    } catch {
      /* create below */
    }
  }

  const bundled = await readFromBundled<T>(relative);
  await writeJsonFile(relative, bundled ?? fallback);
}

export async function copyBundledIfMissing(relative: string): Promise<void> {
  const bundled = await readFromBundled(relative);
  if (!bundled) return;

  if (useBlob) {
    const existing = await readFromBlob(relative);
    if (existing !== null) return;
    await writeJsonFile(relative, bundled);
    return;
  }

  try {
    await readFile(resolveLocalPath(relative), "utf-8");
  } catch {
    await writeJsonFile(relative, bundled);
  }
}
