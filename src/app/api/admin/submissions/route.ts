import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSubmissionStats, getSubmissions } from "@/lib/storage";

export async function GET(request: Request) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const kind = searchParams.get("kind") as "rfq" | "contact" | null;

  const [submissions, stats] = await Promise.all([
    getSubmissions(kind ?? undefined),
    getSubmissionStats(),
  ]);

  return NextResponse.json({ submissions, stats });
}
