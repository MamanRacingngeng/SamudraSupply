import { NextResponse } from "next/server";
import { ensurePlatformReady } from "@/lib/bootstrap";
import { getSupplierBySlug } from "@/lib/supplier-store";
import { notifyRFQ } from "@/lib/notifications";
import { saveSubmission } from "@/lib/storage";
import { logActivity } from "@/lib/activity-log";
import { rfqSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    await ensurePlatformReady();
    const body = await request.json();
    const parsed = rfqSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const supplier = await getSupplierBySlug(parsed.data.supplierId);
    if (!supplier) {
      return NextResponse.json(
        { error: "Supplier not found" },
        { status: 404 }
      );
    }

    const record = await saveSubmission("rfq", {
      ...parsed.data,
      supplierName: supplier.name,
    });

    notifyRFQ(parsed.data, supplier).catch(console.error);
    logActivity("rfq.received", `RFQ from ${parsed.data.name} → ${supplier.name}`, {
      id: record.id,
    }).catch(console.error);

    return NextResponse.json(
      {
        success: true,
        message: `RFQ sent successfully to ${supplier.name}. Our team will contact you shortly.`,
        id: record.id,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "A server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
