import "server-only";

import { getSettings } from "./settings-store";
import {
  notifyRFQ as emailRFQ,
  notifyContact as emailContact,
} from "./email";
import {
  notifyWhatsAppContact,
  notifyWhatsAppRFQ,
} from "./whatsapp";
import type { ContactPayload, RFQPayload, Supplier } from "./types";

export async function notifyRFQ(data: RFQPayload, supplier: Supplier) {
  const settings = await getSettings();

  const tasks: Promise<unknown>[] = [];

  if (settings.emailEnabled) {
    tasks.push(
      emailRFQ(data, supplier.name, {
        buyerConfirmation: settings.emailBuyerConfirmation,
        supplierEmail: supplier.contactEmail,
      })
    );
  }

  if (settings.whatsappEnabled && settings.whatsappAdminOnRfq) {
    tasks.push(
      notifyWhatsAppRFQ(supplier.name, data.name, data.company, data.quantity)
    );
  }

  await Promise.allSettled(tasks);
}

export async function notifyContact(data: ContactPayload) {
  const settings = await getSettings();
  const typeLabel = data.type === "supplier" ? "Supplier" : "Buyer";

  const tasks: Promise<unknown>[] = [];

  if (settings.emailEnabled) {
    tasks.push(
      emailContact(data, {
        buyerConfirmation: settings.emailBuyerConfirmation,
      })
    );
  }

  if (settings.whatsappEnabled && settings.whatsappAdminOnContact) {
    tasks.push(notifyWhatsAppContact(typeLabel, data.name, data.email));
  }

  await Promise.allSettled(tasks);
}
