import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSettings, updateSettings, getIntegrationStatus } from "@/lib/settings-store";
import { logActivity } from "@/lib/activity-log";
import { z } from "zod";

const settingsSchema = z.object({
  emailEnabled: z.boolean().optional(),
  whatsappEnabled: z.boolean().optional(),
  emailBuyerConfirmation: z.boolean().optional(),
  whatsappAdminOnRfq: z.boolean().optional(),
  whatsappAdminOnContact: z.boolean().optional(),
});

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [settings, integrations] = await Promise.all([
    getSettings(),
    getIntegrationStatus(),
  ]);

  return NextResponse.json({ settings, integrations });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = settingsSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const settings = await updateSettings(parsed.data);
  await logActivity("settings.update", "Notification settings updated");

  const integrations = await getIntegrationStatus();
  return NextResponse.json({ settings, integrations });
}
