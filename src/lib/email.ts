import { Resend } from "resend";
import type { ContactPayload, RFQPayload } from "./types";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = process.env.EMAIL_FROM ?? "Samudra Supply <onboarding@resend.dev>";
const ADMIN_TO = process.env.ADMIN_EMAIL ?? "info@samudrasupply.com";

async function send(to: string, subject: string, html: string) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — skipping:", subject);
    return false;
  }

  const { error } = await resend.emails.send({ from: FROM, to, subject, html });
  if (error) {
    console.error("[email] send failed:", error);
    return false;
  }
  return true;
}

function layout(title: string, body: string) {
  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
      <div style="background:#0b3d91;padding:20px 24px;border-radius:12px 12px 0 0">
        <p style="margin:0;color:#fff;font-size:18px;font-weight:600">Samudra Supply</p>
        <p style="margin:4px 0 0;color:#94a3b8;font-size:12px">${title}</p>
      </div>
      <div style="border:1px solid #e2e8f0;border-top:none;padding:24px;border-radius:0 0 12px 12px">
        ${body}
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0" />
        <p style="margin:0;font-size:12px;color:#64748b">
          Automated email from the Samudra Supply platform.
        </p>
      </div>
    </div>
  `;
}

function row(label: string, value: string) {
  return `<p style="margin:0 0 12px"><strong>${label}:</strong> ${value}</p>`;
}

export async function notifyRFQ(
  data: RFQPayload,
  supplierName: string,
  opts?: { buyerConfirmation?: boolean; supplierEmail?: string }
) {
  const adminHtml = layout(
    "New RFQ Received",
    `
      ${row("Supplier", supplierName)}
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${row("Company", data.company)}
      ${row("Country", data.country)}
      ${data.phone ? row("Phone", data.phone) : ""}
      ${row("Quantity", data.quantity)}
      ${row("Message", data.message.replace(/\n/g, "<br>"))}
    `
  );

  const buyerHtml = layout(
    "RFQ Confirmation",
    `
      <p style="margin:0 0 16px">Hello <strong>${data.name}</strong>,</p>
      <p style="margin:0 0 16px">
        Your request for quotation (RFQ) to <strong>${supplierName}</strong> has
        been received. The Samudra Supply team will contact you within 1–2 business days.
      </p>
      ${row("Estimated quantity", data.quantity)}
    `
  );

  const tasks = [send(ADMIN_TO, `[RFQ] ${data.company} → ${supplierName}`, adminHtml)];

  if (opts?.supplierEmail) {
    const supplierHtml = layout(
      "New RFQ for You",
      `
        <p style="margin:0 0 16px">Hello <strong>${supplierName}</strong>,</p>
        <p style="margin:0 0 16px">
          You have a new request for quotation (RFQ) through Samudra Supply:
        </p>
        ${row("Buyer name", data.name)}
        ${row("Email", data.email)}
        ${row("Company", data.company)}
        ${row("Country", data.country)}
        ${data.phone ? row("Phone", data.phone) : ""}
        ${row("Quantity", data.quantity)}
        ${row("Message", data.message.replace(/\n/g, "<br>"))}
      `
    );
    tasks.push(
      send(
        opts.supplierEmail,
        `[New RFQ] ${data.company} — Samudra Supply`,
        supplierHtml
      )
    );
  }

  if (opts?.buyerConfirmation !== false) {
    tasks.push(
      send(data.email, `RFQ Received — ${supplierName} | Samudra Supply`, buyerHtml)
    );
  }
  await Promise.all(tasks);
}

export async function notifyContact(
  data: ContactPayload,
  opts?: { buyerConfirmation?: boolean }
) {
  const typeLabel = data.type === "supplier" ? "Supplier" : "Buyer";

  const adminHtml = layout(
    `New ${typeLabel} Message`,
    `
      ${row("Type", typeLabel)}
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${data.company ? row("Company", data.company) : ""}
      ${row("Message", data.message.replace(/\n/g, "<br>"))}
    `
  );

  const userHtml = layout(
    "Message Confirmation",
    `
      <p style="margin:0 0 16px">Hello <strong>${data.name}</strong>,</p>
      <p style="margin:0">
        Thank you for contacting Samudra Supply. Our team will respond to your
        message shortly.
      </p>
    `
  );

  const tasks = [send(ADMIN_TO, `[Contact] ${typeLabel}: ${data.name}`, adminHtml)];
  if (opts?.buyerConfirmation !== false) {
    tasks.push(send(data.email, "Message Received | Samudra Supply", userHtml));
  }
  await Promise.all(tasks);
}
