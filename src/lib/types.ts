export interface Supplier {
  id: string;
  name: string;
  commodity: string;
  category: string;
  location: string;
  province: string;
  destinations: string[];
  certifications: string[];
  initials: string;
  color: string;
  verified: boolean;
  capacity: string;
  website: string;
  description: string;
  products: string[];
  established: number;
  contactEmail?: string;
  contactPhone?: string;
  active: boolean;
}

export interface RFQPayload {
  supplierId: string;
  supplierName?: string;
  name: string;
  email: string;
  company: string;
  country: string;
  phone?: string;
  quantity: string;
  message: string;
}

export interface SupplierContactPayload {
  type: "supplier";
  name: string;
  email: string;
  company: string;
  phone: string;
  commodity: string;
  province: string;
  products: string;
  capacity: string;
  exportExperience: string;
  certifications?: string;
  website?: string;
  message?: string;
}

export interface BuyerContactPayload {
  type: "buyer";
  name: string;
  email: string;
  company: string;
  country: string;
  phone?: string;
  commodityInterest: string;
  quantity: string;
  message: string;
}

export type ContactPayload = SupplierContactPayload | BuyerContactPayload;

export interface SubmissionRecord {
  id: string;
  createdAt: string;
  kind: "rfq" | "contact";
  data: RFQPayload | ContactPayload;
}

export interface PlatformSettings {
  emailEnabled: boolean;
  whatsappEnabled: boolean;
  emailBuyerConfirmation: boolean;
  whatsappAdminOnRfq: boolean;
  whatsappAdminOnContact: boolean;
}

export interface ActivityEntry {
  id: string;
  createdAt: string;
  action: string;
  detail: string;
  meta?: Record<string, string>;
}

export const DEFAULT_SETTINGS: PlatformSettings = {
  emailEnabled: true,
  whatsappEnabled: true,
  emailBuyerConfirmation: true,
  whatsappAdminOnRfq: true,
  whatsappAdminOnContact: true,
};
