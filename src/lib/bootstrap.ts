import "server-only";

import { DEFAULT_SETTINGS } from "./types";
import {
  copyBundledIfMissing,
  ensureJsonFile,
  getStorageMode,
} from "./json-store";

let bootstrapped = false;

export async function ensurePlatformReady() {
  if (bootstrapped) return;
  bootstrapped = true;

  await ensureJsonFile("settings.json", DEFAULT_SETTINGS);
  await ensureJsonFile("submissions/rfq.json", []);
  await ensureJsonFile("submissions/contact.json", []);
  await copyBundledIfMissing("suppliers.json");

  const mode = getStorageMode();
  if (mode === "tmp") {
    console.warn(
      "[bootstrap] Running on Vercel without Blob — data is ephemeral. Add Vercel Blob storage for persistence."
    );
  }
}

export { getStorageMode };
