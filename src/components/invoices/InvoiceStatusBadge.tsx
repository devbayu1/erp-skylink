// src/components/invoices/InvoiceStatusBadge.tsx
import React from "react";
import type { InvoiceStatus } from "@/types/invoice";

export default function InvoiceStatusBadge({ status }: { status?: InvoiceStatus }) {
  if (!status) return null;
  const cls =
    status === "Paid" ? "bg-green-100 text-green-700" :
    status === "Pending" ? "bg-yellow-100 text-yellow-700" :
    status === "Overdue" ? "bg-red-100 text-red-700" :
    "bg-gray-100 text-gray-700";
  return <span className={`px-2 py-1 rounded text-xs ${cls}`}>{status}</span>;
}
