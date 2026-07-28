import "server-only";

import { ensurePlatformReady } from "./bootstrap";
import { readFile, writeFile, mkdir } from "fs/promises";import path from "path";
import type { PlatformSettings } from "./types";
import { DEFAULT_SETTINGS } from "./types";

const SETTINGS_FILE = path.join(process.cwd(), "data", "settings.json");

export async function getSettings(): Promise<PlatformSettings> {
  await ensurePlatformReady();
  try {
    const raw = await readFile(SETTINGS_FILE, "utf-8");
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function updateSettings(
  partial: Partial<PlatformSettings>
): Promise<PlatformSettings> {
  await mkdir(path.dirname(SETTINGS_FILE), { recursive: true });
  const current = await getSettings();
  const next = { ...current, ...partial };
  await writeFile(SETTINGS_FILE, JSON.stringify(next, null, 2), "utf-8");
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
  };
}
