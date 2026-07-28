import "server-only";

import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { DEFAULT_SETTINGS } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");
const SUBMISSIONS_DIR = path.join(DATA_DIR, "submissions");

let bootstrapped = false;

export async function ensurePlatformReady() {
  if (bootstrapped) return;
  bootstrapped = true;

  await mkdir(DATA_DIR, { recursive: true });
  await mkdir(SUBMISSIONS_DIR, { recursive: true });

  try {
    await readFile(SETTINGS_FILE, "utf-8");
  } catch {
    await writeFile(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2), "utf-8");
  }

  for (const kind of ["rfq", "contact"] as const) {
    const file = path.join(SUBMISSIONS_DIR, `${kind}.json`);
    try {
      await readFile(file, "utf-8");
    } catch {
      await writeFile(file, "[]", "utf-8");
    }
  }
}
