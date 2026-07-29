import "server-only";

import type { SubmissionRecord } from "./types";
import { ensurePlatformReady } from "./bootstrap";
import { readJsonFile, writeJsonFile } from "./json-store";

async function readSubmissions(kind: "rfq" | "contact"): Promise<SubmissionRecord[]> {
  return readJsonFile<SubmissionRecord[]>(`submissions/${kind}.json`, []);
}

export async function getSubmissions(
  kind?: "rfq" | "contact"
): Promise<SubmissionRecord[]> {
  if (kind) {
    const items = await readSubmissions(kind);
    return items.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  const [rfq, contact] = await Promise.all([
    readSubmissions("rfq"),
    readSubmissions("contact"),
  ]);

  return [...rfq, ...contact].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getSubmissionStats() {
  const [rfq, contact] = await Promise.all([
    readSubmissions("rfq"),
    readSubmissions("contact"),
  ]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isToday = (d: string) => new Date(d) >= today;

  return {
    totalRfq: rfq.length,
    totalContact: contact.length,
    todayRfq: rfq.filter((r) => isToday(r.createdAt)).length,
    todayContact: contact.filter((r) => isToday(r.createdAt)).length,
  };
}

export async function saveSubmission(
  kind: "rfq" | "contact",
  data: SubmissionRecord["data"]
): Promise<SubmissionRecord> {
  await ensurePlatformReady();
  const record: SubmissionRecord = {
    id: `${kind}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    kind,
    data,
  };

  const existing = await readSubmissions(kind);
  existing.push(record);
  await writeJsonFile(`submissions/${kind}.json`, existing);

  return record;
}
