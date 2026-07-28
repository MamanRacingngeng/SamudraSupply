import twilio from "twilio";

function getClient() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) return null;
  return twilio(sid, token);
}

function formatWhatsAppNumber(num: string): string {
  const cleaned = num.replace(/\s/g, "");
  if (cleaned.startsWith("whatsapp:")) return cleaned;
  if (cleaned.startsWith("+")) return `whatsapp:${cleaned}`;
  if (cleaned.startsWith("0")) return `whatsapp:+62${cleaned.slice(1)}`;
  return `whatsapp:${cleaned}`;
}

export async function sendWhatsApp(message: string): Promise<boolean> {
  const client = getClient();
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const to = process.env.ADMIN_WHATSAPP;

  if (!client || !from || !to) {
    console.warn("[whatsapp] Twilio not configured — skipping");
    return false;
  }

  try {
    await client.messages.create({
      from: formatWhatsAppNumber(from),
      to: formatWhatsAppNumber(to),
      body: message,
    });
    return true;
  } catch (err) {
    console.error("[whatsapp] send failed:", err);
    return false;
  }
}

export async function notifyWhatsAppRFQ(
  supplierName: string,
  buyerName: string,
  company: string,
  quantity: string
) {
  const msg = `🌊 *Samudra Supply — New RFQ*

Supplier: ${supplierName}
Buyer: ${buyerName}
Company: ${company}
Quantity: ${quantity}

Check your email for full details.`;
  return sendWhatsApp(msg);
}

export async function notifyWhatsAppContact(
  type: string,
  name: string,
  email: string
) {
  const msg = `🌊 *Samudra Supply — ${type} Message*

Name: ${name}
Email: ${email}

Check your email for full details.`;
  return sendWhatsApp(msg);
}

export async function notifyWhatsAppSupplierUpdate(name: string, action: string) {
  const msg = `🌊 *Samudra Supply — Supplier ${action}*

${name} has been updated in the directory.`;
  return sendWhatsApp(msg);
}
