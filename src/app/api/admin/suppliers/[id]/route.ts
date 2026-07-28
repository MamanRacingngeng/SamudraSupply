import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  getAllSuppliers,
  updateSupplier,
  deleteSupplier,
} from "@/lib/supplier-store";
import { logActivity } from "@/lib/activity-log";
import { supplierUpdateSchema } from "@/lib/validations";
import { notifyWhatsAppSupplierUpdate } from "@/lib/whatsapp";
import { getSettings } from "@/lib/settings-store";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const list = await getAllSuppliers(true);
  const supplier = list.find((s) => s.id === id);

  if (!supplier) {
    return NextResponse.json({ error: "Supplier not found" }, { status: 404 });
  }

  return NextResponse.json({ supplier });
}

export async function PUT(request: Request, { params }: RouteParams) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const parsed = supplierUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const supplier = await updateSupplier(id, parsed.data);
    await logActivity("supplier.update", `Supplier updated: ${supplier.name}`, {
      id: supplier.id,
    });

    const settings = await getSettings();
    if (settings.whatsappEnabled) {
      notifyWhatsAppSupplierUpdate(supplier.name, "updated").catch(console.error);
    }

    return NextResponse.json({ supplier });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update supplier";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const list = await getAllSuppliers(true);
    const existing = list.find((s) => s.id === id);
    if (!existing) {
      return NextResponse.json({ error: "Supplier not found" }, { status: 404 });
    }

    await deleteSupplier(id);
    await logActivity("supplier.deactivate", `Supplier deactivated: ${existing.name}`, {
      id,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete supplier";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
