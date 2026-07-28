import type { ContactPayload, RFQPayload, SubmissionRecord } from "./types";

function escapeCsv(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function row(values: string[]): string {
  return values.map(escapeCsv).join(",");
}

export function submissionsToCsv(
  submissions: SubmissionRecord[],
  kind: "all" | "rfq" | "contact"
): string {
  if (kind === "rfq") {
    const headers = [
      "ID",
      "Date",
      "Supplier",
      "Name",
      "Email",
      "Company",
      "Country",
      "Phone",
      "Quantity",
      "Message",
    ];
    const lines = [row(headers)];
    for (const s of submissions.filter((x) => x.kind === "rfq")) {
      const d = s.data as RFQPayload;
      lines.push(
        row([
          s.id,
          s.createdAt,
          d.supplierName ?? d.supplierId,
          d.name,
          d.email,
          d.company,
          d.country,
          d.phone ?? "",
          d.quantity,
          d.message,
        ])
      );
    }
    return lines.join("\n");
  }

  if (kind === "contact") {
    const headers = ["ID", "Date", "Type", "Name", "Email", "Company", "Message"];
    const lines = [row(headers)];
    for (const s of submissions.filter((x) => x.kind === "contact")) {
      const d = s.data as ContactPayload;
      lines.push(
        row([
          s.id,
          s.createdAt,
          d.type,
          d.name,
          d.email,
          d.company ?? "",
          d.message,
        ])
      );
    }
    return lines.join("\n");
  }

  const allHeaders = [
    "Kind",
    "ID",
    "Date",
    "Supplier/Type",
    "Name",
    "Email",
    "Company",
    "Country/Type",
    "Phone",
    "Quantity",
    "Message",
  ];
  const lines = [row(allHeaders)];

  for (const s of submissions) {
    if (s.kind === "rfq") {
      const d = s.data as RFQPayload;
      lines.push(
        row([
          "RFQ",
          s.id,
          s.createdAt,
          d.supplierName ?? d.supplierId,
          d.name,
          d.email,
          d.company,
          d.country,
          d.phone ?? "",
          d.quantity,
          d.message,
        ])
      );
    } else {
      const d = s.data as ContactPayload;
      lines.push(
        row([
          "Contact",
          s.id,
          s.createdAt,
          d.type,
          d.name,
          d.email,
          d.company ?? "",
          "",
          "",
          "",
          d.message,
        ])
      );
    }
  }

  return lines.join("\n");
}

export function suppliersToCsv(
  suppliers: Array<{
    id: string;
    name: string;
    commodity: string;
    category: string;
    location: string;
    province: string;
    verified: boolean;
    capacity: string;
    established: number;
    contactEmail?: string;
    contactPhone?: string;
    destinations: string[];
    certifications: string[];
    active: boolean;
  }>
): string {
  const headers = [
    "ID",
    "Name",
    "Commodity",
    "Category",
    "Location",
    "Province",
    "Verified",
    "Capacity",
    "Established",
    "Email",
    "Phone",
    "Destinations",
    "Certifications",
    "Active",
  ];
  const lines = [row(headers)];
  for (const s of suppliers) {
    lines.push(
      row([
        s.id,
        s.name,
        s.commodity,
        s.category,
        s.location,
        s.province,
        s.verified ? "Yes" : "No",
        s.capacity,
        String(s.established),
        s.contactEmail ?? "",
        s.contactPhone ?? "",
        s.destinations.join("; "),
        s.certifications.join("; "),
        s.active ? "Yes" : "No",
      ])
    );
  }
  return lines.join("\n");
}
