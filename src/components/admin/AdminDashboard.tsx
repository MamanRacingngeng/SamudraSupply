"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  Building2,
  Download,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  RefreshCw,
  Save,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import type {
  ActivityEntry,
  ContactPayload,
  PlatformSettings,
  RFQPayload,
  SubmissionRecord,
  Supplier,
} from "@/lib/types";

type Panel = "overview" | "submissions" | "suppliers" | "settings";

interface Stats {
  totalRfq: number;
  totalContact: number;
  todayRfq: number;
  todayContact: number;
}

interface Integrations {
  email: boolean;
  whatsapp: boolean;
  adminEmail: string;
  adminWhatsapp: string;
}

const PANELS: { id: Panel; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "submissions", label: "Submissions", icon: MessageSquare },
  { id: "suppliers", label: "Suppliers", icon: Building2 },
  { id: "settings", label: "Settings", icon: Settings },
];

export function AdminDashboard() {
  const router = useRouter();
  const [panel, setPanel] = useState<Panel>("overview");
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<Stats | null>(null);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [subTab, setSubTab] = useState<"all" | "rfq" | "contact">("all");
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [activity, setActivity] = useState<ActivityEntry[]>([]);
  const [settings, setSettings] = useState<PlatformSettings | null>(null);
  const [integrations, setIntegrations] = useState<Integrations | null>(null);
  const [savingSettings, setSavingSettings] = useState(false);

  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [creatingSupplier, setCreatingSupplier] = useState(false);

  const authFetch = useCallback(
    async (url: string, init?: RequestInit) => {
      const res = await fetch(url, init);
      if (res.status === 401) {
        router.push("/admin/login");
        return null;
      }
      return res;
    },
    [router]
  );

  const fetchOverview = useCallback(async () => {
    const [subRes, actRes, supRes] = await Promise.all([
      authFetch("/api/admin/submissions"),
      authFetch("/api/admin/activity?limit=10"),
      authFetch("/api/admin/suppliers"),
    ]);
    if (!subRes || !actRes || !supRes) return;

    const subData = await subRes.json();
    const actData = await actRes.json();
    const supData = await supRes.json();

    setStats(subData.stats);
    setSubmissions(subData.submissions);
    setActivity(actData.activity);
    setSuppliers(supData.suppliers.filter((s: Supplier) => s.active !== false));
  }, [authFetch]);

  const fetchSubmissions = useCallback(async () => {
    const kind = subTab === "all" ? "" : `?kind=${subTab}`;
    const res = await authFetch(`/api/admin/submissions${kind}`);
    if (!res) return;
    const data = await res.json();
    setSubmissions(data.submissions);
    setStats(data.stats);
  }, [authFetch, subTab]);

  const fetchSuppliers = useCallback(async () => {
    const res = await authFetch("/api/admin/suppliers");
    if (!res) return;
    const data = await res.json();
    setSuppliers(data.suppliers);
  }, [authFetch]);

  const fetchSettings = useCallback(async () => {
    const res = await authFetch("/api/admin/settings");
    if (!res) return;
    const data = await res.json();
    setSettings(data.settings);
    setIntegrations(data.integrations);
  }, [authFetch]);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      if (panel === "overview") await fetchOverview();
      else if (panel === "submissions") await fetchSubmissions();
      else if (panel === "suppliers") await fetchSuppliers();
      else if (panel === "settings") await fetchSettings();
    } finally {
      setLoading(false);
    }
  }, [panel, fetchOverview, fetchSubmissions, fetchSuppliers, fetchSettings]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  const exportCsv = (type: string) => {
    window.open(`/api/admin/export?type=${type}`, "_blank");
  };

  const saveSettings = async () => {
    if (!settings) return;
    setSavingSettings(true);
    try {
      const res = await authFetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res) return;
      const data = await res.json();
      setSettings(data.settings);
      setIntegrations(data.integrations);
    } finally {
      setSavingSettings(false);
    }
  };

  const activeSuppliers = suppliers.filter((s) => s.active !== false);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="label-caps mb-1">Admin</p>
          <h1 className="heading-display text-2xl sm:text-3xl">Dashboard</h1>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={refresh} className="btn-secondary !py-2.5 !text-xs">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button type="button" onClick={logout} className="btn-secondary !py-2.5 !text-xs">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      <nav className="mb-8 flex flex-wrap gap-2">
        {PANELS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setPanel(id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              panel === id
                ? "bg-ocean text-white"
                : "bg-surface text-muted hover:text-ocean"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </nav>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-ocean" />
        </div>
      ) : (
        <>
          {panel === "overview" && stats && (
            <OverviewPanel
              stats={stats}
              activity={activity}
              supplierCount={activeSuppliers.length}
              onExport={exportCsv}
            />
          )}

          {panel === "submissions" && (
            <SubmissionsPanel
              submissions={submissions}
              tab={subTab}
              onTabChange={setSubTab}
              onExport={exportCsv}
            />
          )}

          {panel === "suppliers" && (
            <SuppliersPanel
              suppliers={suppliers}
              onEdit={setEditingSupplier}
              onCreate={() => setCreatingSupplier(true)}
              onRefresh={fetchSuppliers}
              authFetch={authFetch}
            />
          )}

          {panel === "settings" && settings && integrations && (
            <SettingsPanel
              settings={settings}
              integrations={integrations}
              saving={savingSettings}
              onChange={setSettings}
              onSave={saveSettings}
            />
          )}
        </>
      )}

      {(editingSupplier || creatingSupplier) && (
        <SupplierEditorModal
          supplier={editingSupplier}
          isNew={creatingSupplier}
          onClose={() => {
            setEditingSupplier(null);
            setCreatingSupplier(false);
          }}
          onSaved={() => {
            setEditingSupplier(null);
            setCreatingSupplier(false);
            fetchSuppliers();
          }}
          authFetch={authFetch}
        />
      )}
    </div>
  );
}

function OverviewPanel({
  stats,
  activity,
  supplierCount,
  onExport,
}: {
  stats: Stats;
  activity: ActivityEntry[];
  supplierCount: number;
  onExport: (type: string) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {[
          { label: "Total RFQ", value: stats.totalRfq, sub: `+${stats.todayRfq} today` },
          { label: "Total Contact", value: stats.totalContact, sub: `+${stats.todayContact} today` },
          { label: "RFQ Today", value: stats.todayRfq, sub: "new requests" },
          { label: "Contact Today", value: stats.todayContact, sub: "new messages" },
          { label: "Active Suppliers", value: supplierCount, sub: "in directory" },
        ].map((s) => (
          <div key={s.label} className="card-base p-5">
            <p className="text-xs font-medium text-muted">{s.label}</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums text-ocean dark:text-ocean-soft">
              {s.value}
            </p>
            <p className="mt-1 text-xs text-muted">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card-base p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Export Data</h2>
            <Download className="h-4 w-4 text-muted" />
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { type: "all", label: "All Submissions" },
              { type: "rfq", label: "RFQ" },
              { type: "contact", label: "Contact" },
              { type: "suppliers", label: "Suppliers" },
            ].map((e) => (
              <button
                key={e.type}
                type="button"
                onClick={() => onExport(e.type)}
                className="btn-secondary !py-2 !text-xs"
              >
                <Download className="h-3.5 w-3.5" />
                {e.label}
              </button>
            ))}
          </div>
        </section>

        <section className="card-base p-6">
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 text-ocean" />
            <h2 className="font-semibold">Recent Activity</h2>
          </div>
          {activity.length === 0 ? (
            <p className="text-sm text-muted">No activity yet.</p>
          ) : (
            <ul className="space-y-3">
              {activity.map((a) => (
                <li key={a.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                  <p className="text-sm">{a.detail}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {new Date(a.createdAt).toLocaleString("en-US")} · {a.action}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function SubmissionsPanel({
  submissions,
  tab,
  onTabChange,
  onExport,
}: {
  submissions: SubmissionRecord[];
  tab: "all" | "rfq" | "contact";
  onTabChange: (t: "all" | "rfq" | "contact") => void;
  onExport: (type: string) => void;
}) {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {(
            [
              { id: "all" as const, label: "All" },
              { id: "rfq" as const, label: "RFQ" },
              { id: "contact" as const, label: "Contact" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onTabChange(t.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.id
                  ? "bg-ocean text-white"
                  : "bg-surface text-muted hover:text-ocean"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onExport(tab === "all" ? "all" : tab)}
          className="btn-secondary !py-2 !text-xs"
        >
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </button>
      </div>

      {submissions.length === 0 ? (
        <div className="card-base py-16 text-center text-muted">No submissions yet.</div>
      ) : (
        <div className="space-y-4">
          {submissions.map((s) => (
            <SubmissionItem key={s.id} record={s} />
          ))}
        </div>
      )}
    </div>
  );
}

function SuppliersPanel({
  suppliers,
  onEdit,
  onCreate,
  onRefresh,
  authFetch,
}: {
  suppliers: Supplier[];
  onEdit: (s: Supplier) => void;
  onCreate: () => void;
  onRefresh: () => void;
  authFetch: (url: string, init?: RequestInit) => Promise<Response | null>;
}) {
  const deactivate = async (id: string, name: string) => {
    if (!confirm(`Deactivate supplier "${name}"?`)) return;
    const res = await authFetch(`/api/admin/suppliers/${id}`, { method: "DELETE" });
    if (res?.ok) onRefresh();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted">
          {suppliers.filter((s) => s.active !== false).length} active suppliers
        </p>
        <button type="button" onClick={onCreate} className="btn-primary !py-2.5 !text-xs">
          <Plus className="h-4 w-4" />
          Add Supplier
        </button>
      </div>

      <div className="space-y-3">
        {suppliers.map((s) => (
          <article
            key={s.id}
            className={`card-base flex flex-wrap items-center justify-between gap-4 p-5 ${
              s.active === false ? "opacity-50" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-sm font-bold text-white`}
              >
                {s.initials}
              </div>
              <div>
                <p className="font-semibold">{s.name}</p>
                <p className="text-sm text-muted">
                  {s.commodity} · {s.province}
                  {s.active === false && " · Inactive"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onEdit(s)}
                className="btn-secondary !py-2 !text-xs"
              >
                Edit
              </button>
              {s.active !== false && (
                <button
                  type="button"
                  onClick={() => deactivate(s.id, s.name)}
                  className="btn-secondary !py-2 !text-xs !text-red-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Deactivate
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function SettingsPanel({
  settings,
  integrations,
  saving,
  onChange,
  onSave,
}: {
  settings: PlatformSettings;
  integrations: Integrations;
  saving: boolean;
  onChange: (s: PlatformSettings) => void;
  onSave: () => void;
}) {
  const toggle = (key: keyof PlatformSettings) => {
    onChange({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="space-y-6">
      <section className="card-base p-6">
        <h2 className="mb-4 font-semibold">Integration Status</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <StatusBadge label="Email (Resend)" active={integrations.email} detail={integrations.adminEmail} />
          <StatusBadge
            label="WhatsApp (Twilio)"
            active={integrations.whatsapp}
            detail={integrations.adminWhatsapp || "Not configured"}
          />
        </div>
      </section>

      <section className="card-base p-6">
        <h2 className="mb-4 font-semibold">Notification Settings</h2>
        <div className="space-y-4">
          {[
            { key: "emailEnabled" as const, label: "Email to admin", desc: "Send email notifications when RFQ/contact forms are submitted" },
            { key: "emailBuyerConfirmation" as const, label: "Buyer confirmation", desc: "Automatic confirmation email to form submitters" },
            { key: "whatsappEnabled" as const, label: "WhatsApp to admin", desc: "Master switch for WhatsApp notifications" },
            { key: "whatsappAdminOnRfq" as const, label: "WhatsApp on RFQ", desc: "WhatsApp alert for new quotation requests" },
            { key: "whatsappAdminOnContact" as const, label: "WhatsApp on Contact", desc: "WhatsApp alert for new contact messages" },
          ].map((item) => (
            <label
              key={item.key}
              className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-border p-4"
            >
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
              <input
                type="checkbox"
                checked={settings[item.key]}
                onChange={() => toggle(item.key)}
                className="mt-1 h-4 w-4 rounded border-border text-ocean"
              />
            </label>
          ))}
        </div>

        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="btn-primary mt-6"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Settings
        </button>
      </section>
    </div>
  );
}

function StatusBadge({
  label,
  active,
  detail,
}: {
  label: string;
  active: boolean;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-border p-4">
      <div className="flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${active ? "bg-growth" : "bg-red-400"}`}
        />
        <p className="font-medium">{label}</p>
        <span className="text-xs text-muted">{active ? "Connected" : "Inactive"}</span>
      </div>
      <p className="mt-1 truncate text-xs text-muted">{detail}</p>
    </div>
  );
}

function SupplierEditorModal({
  supplier,
  isNew,
  onClose,
  onSaved,
  authFetch,
}: {
  supplier: Supplier | null;
  isNew: boolean;
  onClose: () => void;
  onSaved: () => void;
  authFetch: (url: string, init?: RequestInit) => Promise<Response | null>;
}) {
  const empty: Supplier = {
    id: "",
    name: "",
    commodity: "",
    category: "",
    location: "",
    province: "",
    destinations: [],
    certifications: [],
    initials: "",
    color: "from-blue-500 to-cyan-600",
    verified: false,
    capacity: "",
    website: "",
    description: "",
    products: [],
    established: new Date().getFullYear(),
    contactEmail: "",
    contactPhone: "",
    active: true,
  };

  const [form, setForm] = useState<Supplier>(supplier ?? empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof Supplier, value: unknown) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const parseList = (raw: string) =>
    raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = isNew ? "/api/admin/suppliers" : `/api/admin/suppliers/${supplier!.id}`;
    const method = isNew ? "POST" : "PUT";
    const body = isNew ? form : { ...form, id: undefined };

    const res = await authFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setSaving(false);
    if (!res) return;

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to save");
      return;
    }

    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-16">
      <div className="card-base w-full max-w-2xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="heading-display text-xl">
            {isNew ? "Add Supplier" : `Edit — ${supplier?.name}`}
          </h2>
          <button type="button" onClick={onClose} aria-label="Close">
            <X className="h-5 w-5 text-muted" />
          </button>
        </div>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
            {error}
          </p>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {isNew && (
              <Field label="ID (slug)" value={form.id} onChange={(v) => set("id", v)} required />
            )}
            <Field label="Name" value={form.name} onChange={(v) => set("name", v)} required />
            <Field label="Commodity" value={form.commodity} onChange={(v) => set("commodity", v)} required />
            <Field label="Category" value={form.category} onChange={(v) => set("category", v)} required />
            <Field label="Location" value={form.location} onChange={(v) => set("location", v)} required />
            <Field label="Province" value={form.province} onChange={(v) => set("province", v)} required />
            <Field label="Initials" value={form.initials} onChange={(v) => set("initials", v)} required />
            <Field label="Tailwind Gradient" value={form.color} onChange={(v) => set("color", v)} required />
            <Field label="Capacity" value={form.capacity} onChange={(v) => set("capacity", v)} required />
            <Field
              label="Year Established"
              value={String(form.established)}
              onChange={(v) => set("established", Number(v))}
              type="number"
              required
            />
            <Field label="Contact Email" value={form.contactEmail ?? ""} onChange={(v) => set("contactEmail", v)} />
            <Field label="Contact Phone" value={form.contactPhone ?? ""} onChange={(v) => set("contactPhone", v)} />
          </div>

          <Field
            label="Destinations (comma-separated)"
            value={form.destinations.join(", ")}
            onChange={(v) => set("destinations", parseList(v))}
            required
          />
          <Field
            label="Certifications (comma-separated)"
            value={form.certifications.join(", ")}
            onChange={(v) => set("certifications", parseList(v))}
          />
          <Field
            label="Products (comma-separated)"
            value={form.products.join(", ")}
            onChange={(v) => set("products", parseList(v))}
            required
          />
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
              required
              className="input-base min-h-[100px] resize-y"
            />
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.verified}
              onChange={(e) => set("verified", e.target.checked)}
              className="h-4 w-4 rounded"
            />
            <span className="text-sm">Verified</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save
            </button>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="input-base"
      />
    </div>
  );
}

function SubmissionItem({ record }: { record: SubmissionRecord }) {
  const isRfq = record.kind === "rfq";
  const data = record.data;

  return (
    <article className="card-base p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              isRfq
                ? "bg-ocean/10 text-ocean dark:bg-ocean/20 dark:text-ocean-soft"
                : "bg-growth/10 text-growth"
            }`}
          >
            {isRfq ? (
              <MessageSquare className="h-3.5 w-3.5" />
            ) : (
              <Mail className="h-3.5 w-3.5" />
            )}
            {isRfq ? "RFQ" : "Contact"}
          </span>
          <span className="text-xs text-muted">
            {new Date(record.createdAt).toLocaleString("id-ID")}
          </span>
        </div>
        <span className="font-mono text-xs text-muted">{record.id}</span>
      </div>

      {isRfq ? (
        <RfqDetails data={data as RFQPayload} />
      ) : (
        <ContactDetails data={data as ContactPayload} />
      )}
    </article>
  );
}

function RfqDetails({ data }: { data: RFQPayload }) {
  return (
    <dl className="grid gap-3 text-sm sm:grid-cols-2">
      <DetailField label="Supplier" value={data.supplierName ?? data.supplierId} />
      <DetailField label="Name" value={data.name} />
      <DetailField label="Email" value={data.email} />
      <DetailField label="Company" value={data.company} />
      <DetailField label="Country" value={data.country} />
      <DetailField label="Phone" value={data.phone ?? "—"} />
      <DetailField label="Quantity" value={data.quantity} />
      <div className="sm:col-span-2">
        <DetailField label="Message" value={data.message} />
      </div>
    </dl>
  );
}

function ContactDetails({ data }: { data: ContactPayload }) {
  if (data.type === "supplier") {
    return (
      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <DetailField label="Type" value="Supplier" />
        <DetailField label="Name" value={data.name} />
        <DetailField label="Email" value={data.email} />
        <DetailField label="Company" value={data.company} />
        <DetailField label="Phone" value={data.phone} />
        <DetailField label="Commodity" value={data.commodity} />
        <DetailField label="Province" value={data.province} />
        <DetailField label="Products" value={data.products} />
        <DetailField label="Capacity" value={data.capacity} />
        <DetailField label="Export Experience" value={data.exportExperience} />
        <DetailField label="Certifications" value={data.certifications ?? "—"} />
        <DetailField label="Website" value={data.website ?? "—"} />
        {data.message && (
          <div className="sm:col-span-2">
            <DetailField label="Notes" value={data.message} />
          </div>
        )}
      </dl>
    );
  }

  return (
    <dl className="grid gap-3 text-sm sm:grid-cols-2">
      <DetailField label="Type" value="Buyer" />
      <DetailField label="Name" value={data.name} />
      <DetailField label="Email" value={data.email} />
      <DetailField label="Company" value={data.company} />
      <DetailField label="Country" value={data.country} />
      <DetailField label="Phone" value={data.phone ?? "—"} />
      <DetailField label="Commodity Interest" value={data.commodityInterest} />
      <DetailField label="Quantity" value={data.quantity} />
      <div className="sm:col-span-2">
        <DetailField label="Message" value={data.message} />
      </div>
    </dl>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</dt>
      <dd className="mt-0.5 whitespace-pre-wrap">{value}</dd>
    </div>
  );
}
