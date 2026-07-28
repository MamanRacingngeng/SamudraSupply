import "server-only";

import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import type { ActivityEntry } from "./types";

const LOG_FILE = path.join(process.cwd(), "data", "activity.json");

async function readLog(): Promise<ActivityEntry[]> {
  try {
    const raw = await readFile(LOG_FILE, "utf-8");
    return JSON.parse(raw) as ActivityEntry[];
  } catch {
    return [];
  }
}

export async function logActivity(
  action: string,
  detail: string,
  meta?: Record<string, string>
): Promise<ActivityEntry> {
  await mkdir(path.dirname(LOG_FILE), { recursive: true });
  const entry: ActivityEntry = {
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    createdAt: new Date().toISOString(),
    action,
    detail,
    meta,
  };

  const list = await readLog();
  list.unshift(entry);
  const trimmed = list.slice(0, 200);
  await writeFile(LOG_FILE, JSON.stringify(trimmed, null, 2), "utf-8");
  return entry;
}

export async function getActivityLog(limit = 50): Promise<ActivityEntry[]> {
  const list = await readLog();
  return list.slice(0, limit);
}
