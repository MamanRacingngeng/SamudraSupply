import "server-only";

import type { ActivityEntry } from "./types";
import { readJsonFile, writeJsonFile } from "./json-store";

export async function logActivity(
  action: string,
  detail: string,
  meta?: Record<string, string>
): Promise<ActivityEntry> {
  const entry: ActivityEntry = {
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    createdAt: new Date().toISOString(),
    action,
    detail,
    meta,
  };

  const list = await readJsonFile<ActivityEntry[]>("activity.json", []);
  list.unshift(entry);
  const trimmed = list.slice(0, 200);
  await writeJsonFile("activity.json", trimmed);
  return entry;
}

export async function getActivityLog(limit = 50): Promise<ActivityEntry[]> {
  const list = await readJsonFile<ActivityEntry[]>("activity.json", []);
  return list.slice(0, limit);
}
