"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { commodities } from "@/lib/data";

type FormType = "supplier" | "buyer";

const supplierInitial = {
  type: "supplier" as const,
  name: "",
  email: "",
  company: "",
  phone: "",
  commodity: "",
  province: "",
  products: "",
  capacity: "",
  exportExperience: "",
  certifications: "",
  website: "",
  message: "",
};

const buyerInitial = {
  type: "buyer" as const,
  name: "",
  email: "",
  company: "",
  country: "",
  phone: "",
  commodityInterest: "",
  quantity: "",
  message: "",
};

const capacityOptions = [
  "Under 10 tons/month",
  "10–50 tons/month",
  "50–200 tons/month",
  "200+ tons/month",
];

const exportExperienceOptions = [
  { value: "new", label: "New to export" },
  { value: "1-3", label: "1–3 years experience" },
  { value: "3plus", label: "3+ years experience" },
];

function formatApiErrors(details: Record<string, string[] | undefined>): string {
  const messages = Object.values(details)
    .flat()
    .filter(Boolean) as string[];
  return messages.length > 0 ? messages.join(" · ") : "Validation failed";
}

const labelClass = "mb-1.5 block text-sm font-semibold text-ink/85";
const fieldClass = "input-base";

export function ContactForm() {
  const [formType, setFormType] = useState<FormType>("supplier");
  const [supplierForm, setSupplierForm] = useState(supplierInitial);
  const [buyerForm, setBuyerForm] = useState(buyerInitial);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const switchType = (type: FormType) => {
    setFormType(type);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const payload = formType === "supplier" ? supplierForm : buyerForm;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.details
            ? formatApiErrors(data.details)
            : (data.error ?? "Failed to send message")
        );
        return;
      }

      setSuccess(true);
      setSupplierForm(supplierInitial);
      setBuyerForm(buyerInitial);
    } catch {
      setError("Connection failed. Check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-border bg-surface px-6 py-10 text-center dark:bg-elevated">
        <CheckCircle2 className="mb-4 h-12 w-12 text-growth" />
        <h3 className="heading-display text-xl text-ink">Message Sent!</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          The Samudra Supply team will contact you shortly.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="btn-secondary mt-6"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="industrial-panel-accent p-6 sm:p-8">
      <div className="mb-6 flex rounded-full bg-elevated p-1 ring-1 ring-border">
        {(
          [
            { v: "supplier" as const, l: "I'm a Supplier" },
            { v: "buyer" as const, l: "I'm a Buyer" },
          ] as const
        ).map((o) => (
          <button
            key={o.v}
            type="button"
            onClick={() => switchType(o.v)}
            className={`flex-1 rounded-full py-2.5 text-xs font-semibold transition-colors sm:text-sm ${
              formType === o.v
                ? "bg-ocean text-white"
                : "text-ink/70 hover:text-ocean"
            }`}
          >
            {o.l}
          </button>
        ))}
      </div>

      <p className="mb-5 text-sm text-muted">
        {formType === "supplier"
          ? "Register your export business — tell us about your products and capacity."
          : "Looking for Indonesian suppliers? Tell us what you need to import."}
      </p>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      {formType === "supplier" ? (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name *" id="sup-name">
              <input
                id="sup-name"
                required
                value={supplierForm.name}
                onChange={(e) =>
                  setSupplierForm({ ...supplierForm, name: e.target.value })
                }
                className={fieldClass}
              />
            </Field>
            <Field label="Email *" id="sup-email">
              <input
                id="sup-email"
                type="email"
                required
                value={supplierForm.email}
                onChange={(e) =>
                  setSupplierForm({ ...supplierForm, email: e.target.value })
                }
                className={fieldClass}
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Company Name *" id="sup-company">
              <input
                id="sup-company"
                required
                value={supplierForm.company}
                onChange={(e) =>
                  setSupplierForm({ ...supplierForm, company: e.target.value })
                }
                className={fieldClass}
              />
            </Field>
            <Field label="Phone / WhatsApp *" id="sup-phone">
              <input
                id="sup-phone"
                type="tel"
                required
                placeholder="+62 812-xxxx-xxxx"
                value={supplierForm.phone}
                onChange={(e) =>
                  setSupplierForm({ ...supplierForm, phone: e.target.value })
                }
                className={fieldClass}
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Commodity Category *" id="sup-commodity">
              <select
                id="sup-commodity"
                required
                value={supplierForm.commodity}
                onChange={(e) =>
                  setSupplierForm({ ...supplierForm, commodity: e.target.value })
                }
                className={fieldClass}
              >
                <option value="">Select category</option>
                {commodities.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Province / City *" id="sup-province">
              <input
                id="sup-province"
                required
                placeholder="e.g. Lampung, Bali"
                value={supplierForm.province}
                onChange={(e) =>
                  setSupplierForm({ ...supplierForm, province: e.target.value })
                }
                className={fieldClass}
              />
            </Field>
          </div>

          <Field label="Main Products *" id="sup-products">
            <input
              id="sup-products"
              required
              placeholder="e.g. Robusta coffee beans, ground coffee"
              value={supplierForm.products}
              onChange={(e) =>
                setSupplierForm({ ...supplierForm, products: e.target.value })
              }
              className={fieldClass}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Production Capacity *" id="sup-capacity">
              <select
                id="sup-capacity"
                required
                value={supplierForm.capacity}
                onChange={(e) =>
                  setSupplierForm({ ...supplierForm, capacity: e.target.value })
                }
                className={fieldClass}
              >
                <option value="">Select capacity</option>
                {capacityOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Export Experience *" id="sup-experience">
              <select
                id="sup-experience"
                required
                value={supplierForm.exportExperience}
                onChange={(e) =>
                  setSupplierForm({
                    ...supplierForm,
                    exportExperience: e.target.value,
                  })
                }
                className={fieldClass}
              >
                <option value="">Select experience</option>
                {exportExperienceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Certifications" id="sup-certs">
              <input
                id="sup-certs"
                placeholder="e.g. HACCP, ISO, Halal"
                value={supplierForm.certifications}
                onChange={(e) =>
                  setSupplierForm({
                    ...supplierForm,
                    certifications: e.target.value,
                  })
                }
                className={fieldClass}
              />
            </Field>
            <Field label="Website" id="sup-website">
              <input
                id="sup-website"
                type="url"
                placeholder="https://"
                value={supplierForm.website}
                onChange={(e) =>
                  setSupplierForm({ ...supplierForm, website: e.target.value })
                }
                className={fieldClass}
              />
            </Field>
          </div>

          <Field label="Additional Notes" id="sup-message">
            <textarea
              id="sup-message"
              rows={3}
              placeholder="Anything else we should know about your business..."
              value={supplierForm.message}
              onChange={(e) =>
                setSupplierForm({ ...supplierForm, message: e.target.value })
              }
              className={`${fieldClass} resize-none`}
            />
          </Field>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name *" id="buy-name">
              <input
                id="buy-name"
                required
                value={buyerForm.name}
                onChange={(e) =>
                  setBuyerForm({ ...buyerForm, name: e.target.value })
                }
                className={fieldClass}
              />
            </Field>
            <Field label="Email *" id="buy-email">
              <input
                id="buy-email"
                type="email"
                required
                value={buyerForm.email}
                onChange={(e) =>
                  setBuyerForm({ ...buyerForm, email: e.target.value })
                }
                className={fieldClass}
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Company Name *" id="buy-company">
              <input
                id="buy-company"
                required
                value={buyerForm.company}
                onChange={(e) =>
                  setBuyerForm({ ...buyerForm, company: e.target.value })
                }
                className={fieldClass}
              />
            </Field>
            <Field label="Country *" id="buy-country">
              <input
                id="buy-country"
                required
                placeholder="e.g. Germany, UAE"
                value={buyerForm.country}
                onChange={(e) =>
                  setBuyerForm({ ...buyerForm, country: e.target.value })
                }
                className={fieldClass}
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Commodity Interest *" id="buy-commodity">
              <select
                id="buy-commodity"
                required
                value={buyerForm.commodityInterest}
                onChange={(e) =>
                  setBuyerForm({
                    ...buyerForm,
                    commodityInterest: e.target.value,
                  })
                }
                className={fieldClass}
              >
                <option value="">Select commodity</option>
                {commodities.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Estimated Quantity *" id="buy-quantity">
              <input
                id="buy-quantity"
                required
                placeholder="e.g. 20 tons/month"
                value={buyerForm.quantity}
                onChange={(e) =>
                  setBuyerForm({ ...buyerForm, quantity: e.target.value })
                }
                className={fieldClass}
              />
            </Field>
          </div>

          <Field label="Phone (optional)" id="buy-phone">
            <input
              id="buy-phone"
              type="tel"
              value={buyerForm.phone}
              onChange={(e) =>
                setBuyerForm({ ...buyerForm, phone: e.target.value })
              }
              className={fieldClass}
            />
          </Field>

          <Field label="Requirements / Message *" id="buy-message">
            <textarea
              id="buy-message"
              required
              rows={4}
              minLength={10}
              placeholder="Describe what you need — specs, packaging, delivery terms..."
              value={buyerForm.message}
              onChange={(e) =>
                setBuyerForm({ ...buyerForm, message: e.target.value })
              }
              className={`${fieldClass} resize-none`}
            />
          </Field>
        </div>
      )}

      <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {loading
          ? "Sending..."
          : formType === "supplier"
            ? "Submit Supplier Registration"
            : "Send Buyer Inquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
    </div>
  );
}
