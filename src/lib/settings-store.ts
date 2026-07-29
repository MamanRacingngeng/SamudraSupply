import "server-only";

import { ensurePlatformReady, getStorageMode } from "./bootstrap";
import type { PlatformSettings } from "./types";
import { DEFAULT_SETTINGS } from "./types";
import { readJsonFile, writeJsonFile } from "./json-store";

export async function getSettings(): Promise<PlatformSettings> {
  await ensurePlatformReady();
  const raw = await readJsonFile<Partial<PlatformSettings>>("settings.json", {});
  return { ...DEFAULT_SETTINGS, ...raw };
}

export async function updateSettings(
  partial: Partial<PlatformSettings>
): Promise<PlatformSettings> {
  await ensurePlatformReady();
  const current = await getSettings();
  const next = { ...current, ...partial };
  await writeJsonFile("settings.json", next);
  return next;
}

export async function getIntegrationStatus() {
  return {
    email: Boolean(process.env.RESEND_API_KEY),
    whatsapp: Boolean(
      process.env.TWILIO_ACCOUNT_SID &&
        process.env.TWILIO_AUTH_TOKEN &&
        process.env.TWILIO_WHATSAPP_FROM &&
        process.env.ADMIN_WHATSAPP
    ),
    adminEmail: process.env.ADMIN_EMAIL ?? "info@samudrasupply.com",
    adminWhatsapp: process.env.ADMIN_WHATSAPP ?? "",
    storage: getStorageMode(),
  };
}
