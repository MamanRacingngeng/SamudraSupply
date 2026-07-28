import { supplierCategories } from "./data";
import {
  getSuppliersSync,
  getSupplierBySlugSync,
  getAllSupplierSlugsSync,
  getRelatedSuppliersSync,
  getFeaturedSuppliersSync,
} from "./supplier-sync";

export { supplierCategories };

export const getEnrichedSuppliers = getSuppliersSync;

export {
  getSupplierBySlugSync as getSupplierBySlug,
  getAllSupplierSlugsSync as getAllSupplierSlugs,
  getRelatedSuppliersSync as getRelatedSuppliers,
  getFeaturedSuppliersSync as getFeaturedSuppliers,
};

export type { Supplier } from "./types";
