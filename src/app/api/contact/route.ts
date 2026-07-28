import { NextResponse } from "next/server";
import { ensurePlatformReady } from "@/lib/bootstrap";
import { notifyContact } from "@/lib/notifications";
import { saveSubmission } from "@/lib/storage";
import { logActivity } from "@/lib/activity-log";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    await ensurePlatformReady();
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const record = await saveSubmission("contact", parsed.data);

    notifyContact(parsed.data).catch(console.error);
    logActivity("contact.received", `${parsed.data.type} message from ${parsed.data.name}`, {
      id: record.id,
    }).catch(console.error);

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully. The Samudra Supply team will contact you shortly.",
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
