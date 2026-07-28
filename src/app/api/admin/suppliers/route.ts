import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getAllSuppliers, createSupplier } from "@/lib/supplier-store";
import { logActivity } from "@/lib/activity-log";
import { supplierSchema } from "@/lib/validations";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const suppliers = await getAllSuppliers(true);
  return NextResponse.json({ suppliers });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = supplierSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const supplier = await createSupplier(parsed.data);
    await logActivity("supplier.create", `New supplier: ${supplier.name}`, {
      id: supplier.id,
    });

    return NextResponse.json({ supplier }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create supplier";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
