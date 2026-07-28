"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

interface RFQFormProps {
  supplierId: string;
  supplierName: string;
  compact?: boolean;
}

const initial = {
  name: "",
  email: "",
  company: "",
  country: "",
  phone: "",
  quantity: "",
  message: "",
};

export function RFQForm({ supplierId, supplierName, compact = false }: RFQFormProps) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, supplierId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to send RFQ");
        return;
      }

      setSuccess(true);
      setForm(initial);
    } catch {
      setError("Connection failed. Check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="card-base flex flex-col items-center px-6 py-10 text-center">
        <CheckCircle2 className="mb-4 h-12 w-12 text-growth" />
        <h3 className="heading-display text-xl">RFQ Sent!</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Your quotation request to <strong>{supplierName}</strong> has been
          received. The supplier and our team will be notified automatically.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="btn-secondary mt-6"
        >
          Send Another RFQ
        </button>
      </div>
    );
  }

  return (
    <form
      id="rfq"
      onSubmit={handleSubmit}
      className={`industrial-panel-accent ${compact ? "p-5" : "p-6 sm:p-8"}`}
    >
      {!compact && (
        <div className="mb-6">
          <p className="label-caps mb-2">Request for Quotation</p>
          <h3 className="heading-display text-xl">
            Send RFQ to {supplierName}
          </h3>
          <p className="mt-2 text-sm text-muted">
            Fill out the form below — the supplier will receive your inquiry through
            the Samudra Supply platform.
          </p>
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
          <Field label="Full Name" id="rfq-name" required>
            <input
              id="rfq-name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-base"
              placeholder="John Smith"
            />
          </Field>
          <Field label="Email" id="rfq-email" required>
            <input
              id="rfq-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input-base"
              placeholder="email@company.com"
            />
          </Field>
        </div>

        <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
          <Field label="Company" id="rfq-company" required>
            <input
              id="rfq-company"
              required
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="input-base"
              placeholder="Global Trading Co."
            />
          </Field>
          <Field label="Country" id="rfq-country" required>
            <input
              id="rfq-country"
              required
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="input-base"
              placeholder="United Kingdom"
            />
          </Field>
        </div>

        <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
          <Field label="Phone / WhatsApp" id="rfq-phone">
            <input
              id="rfq-phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="input-base"
              placeholder="+44 20 1234 5678"
            />
          </Field>
          <Field label="Estimated Quantity" id="rfq-quantity" required>
            <input
              id="rfq-quantity"
              required
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              className="input-base"
              placeholder="20 tons / month"
            />
          </Field>
        </div>

        <Field label="Request Details" id="rfq-message" required>
          <textarea
            id="rfq-message"
            required
            rows={compact ? 3 : 4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="input-base resize-none"
            placeholder="Describe product specs, incoterms, and shipping requirements..."
          />
        </Field>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {loading ? "Sending..." : "Send RFQ"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  required,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-muted">
        {label}
        {required && <span className="text-growth"> *</span>}
      </label>
      {children}
    </div>
  );
}
