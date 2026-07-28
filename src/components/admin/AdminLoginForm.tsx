"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Login failed");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-base w-full max-w-sm p-8">
      <div className="mb-6">
        <Logo size="md" href="/" />
      </div>
      <h1 className="heading-display text-2xl">Admin Login</h1>
      <p className="mt-2 text-sm text-muted">
        Samudra Supply Dashboard — RFQ &amp; Contact
      </p>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="mt-6">
        <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-muted">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-base"
          placeholder="Enter admin password"
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
      </button>
    </form>
  );
}
