import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getActivityLog } from "@/lib/activity-log";

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.min(Number(searchParams.get("limit") ?? 50), 100);
  const activity = await getActivityLog(limit);

  return NextResponse.json({ activity });
}
