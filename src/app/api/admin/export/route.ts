import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSubmissions } from "@/lib/storage";
import { getAllSuppliers } from "@/lib/supplier-store";
import { submissionsToCsv, suppliersToCsv } from "@/lib/csv-export";

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") ?? "all";

  if (type === "suppliers") {
    const suppliers = await getAllSuppliers(true);
    const csv = suppliersToCsv(suppliers);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="suppliers.csv"',
      },
    });
  }

  const kind = type === "rfq" || type === "contact" ? type : undefined;
  const submissions = await getSubmissions(kind);
  const csv = submissionsToCsv(
    submissions,
    type === "rfq" || type === "contact" ? type : "all"
  );

  const filename =
    type === "rfq"
      ? "rfq-submissions.csv"
      : type === "contact"
        ? "contact-submissions.csv"
        : "all-submissions.csv";

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
