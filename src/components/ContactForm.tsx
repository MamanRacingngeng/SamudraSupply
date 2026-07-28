"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

const initial = {
  name: "",
  email: "",
  company: "",
  message: "",
  type: "supplier" as "supplier" | "buyer",
};

export function ContactForm() {
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to send message");
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
      <div className="flex flex-col items-center rounded-3xl border border-border bg-surface px-6 py-10 text-center dark:bg-elevated">
        <CheckCircle2 className="mb-4 h-12 w-12 text-growth" />
        <h3 className="heading-display text-xl">Message Sent!</h3>
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
    <form
      onSubmit={handleSubmit}
      className="industrial-panel-accent p-6 sm:p-8"
    >
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
            onClick={() => setForm({ ...form, type: o.v })}
            className={`flex-1 rounded-full py-2.5 text-xs font-semibold transition-colors sm:text-sm ${
              form.type === o.v
                ? "bg-ocean text-white"
                : "text-muted hover:text-ocean"
            }`}
          >
            {o.l}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {[
          { id: "name", label: "Full Name", type: "text", req: true },
          { id: "email", label: "Email", type: "email", req: true },
          { id: "company", label: "Company", type: "text", req: false },
        ].map((f) => (
          <div key={f.id}>
            <label
              htmlFor={f.id}
              className="mb-1.5 block text-xs font-medium text-muted"
            >
              {f.label}
            </label>
            <input
              id={f.id}
              type={f.type}
              required={f.req}
              value={form[f.id as keyof typeof form]}
              onChange={(e) =>
                setForm({ ...form, [f.id]: e.target.value })
              }
              className="input-base"
            />
          </div>
        ))}

        <div>
          <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-muted">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="input-base resize-none"
            placeholder="Tell us about your needs..."
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
