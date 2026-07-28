import { z } from "zod";

export const rfqSchema = z.object({
  supplierId: z.string().min(1, "Please select a supplier"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name is required"),
  country: z.string().min(2, "Country is required"),
  phone: z.string().optional(),
  quantity: z.string().min(1, "Estimated quantity is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const contactBase = {
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name is required"),
};

export const supplierContactSchema = z.object({
  type: z.literal("supplier"),
  ...contactBase,
  phone: z.string().min(8, "Phone / WhatsApp is required"),
  commodity: z.string().min(1, "Please select a commodity category"),
  province: z.string().min(2, "Province / city is required"),
  products: z.string().min(3, "Describe your main products"),
  capacity: z.string().min(1, "Please select production capacity"),
  exportExperience: z.string().min(1, "Please select export experience"),
  certifications: z.string().optional(),
  website: z
    .string()
    .url("Invalid website URL")
    .optional()
    .or(z.literal("")),
  message: z.string().optional(),
});

export const buyerContactSchema = z.object({
  type: z.literal("buyer"),
  ...contactBase,
  country: z.string().min(2, "Country is required"),
  phone: z.string().optional(),
  commodityInterest: z.string().min(1, "Please select a commodity"),
  quantity: z.string().min(1, "Estimated quantity is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const contactSchema = z.discriminatedUnion("type", [
  supplierContactSchema,
  buyerContactSchema,
]);

export const supplierSchema = z.object({
  id: z
    .string()
    .min(2, "ID must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "ID may only contain lowercase letters, numbers, and hyphens"),
  name: z.string().min(2, "Name is required"),
  commodity: z.string().min(2, "Commodity is required"),
  category: z.string().min(2, "Category is required"),
  location: z.string().min(2, "Location is required"),
  province: z.string().min(2, "Province is required"),
  destinations: z.array(z.string()).min(1, "At least 1 destination is required"),
  certifications: z.array(z.string()),
  initials: z.string().min(1).max(3),
  color: z.string().min(1),
  verified: z.boolean(),
  capacity: z.string().min(1),
  website: z.string().optional().default(""),
  description: z.string().min(10, "Description must be at least 10 characters"),
  products: z.array(z.string()).min(1, "At least 1 product is required"),
  established: z.number().int().min(1900).max(new Date().getFullYear()),
  contactEmail: z.string().email().optional().or(z.literal("")),
  contactPhone: z.string().optional(),
  active: z.boolean().default(true),
});

export const supplierUpdateSchema = supplierSchema.partial().omit({ id: true });

export type RFQInput = z.infer<typeof rfqSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type SupplierInput = z.infer<typeof supplierSchema>;
