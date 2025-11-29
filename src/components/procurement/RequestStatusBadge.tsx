// src/components/procurement/RequestStatusBadge.tsx
import React from "react";
import type { RequestStatus } from "@/types/procurement";

export default function RequestStatusBadge({ status }: { status?: RequestStatus }) {
  if (!status) return null;
  const cls =
    status === "Approved" ? "bg-green-100 text-green-700" :
    status === "Rejected" ? "bg-red-100 text-red-700" :
    status === "Issued" ? "bg-blue-100 text-blue-700" :
    status === "Completed" ? "bg-indigo-100 text-indigo-700" :
    "bg-yellow-100 text-yellow-700";
  return <span className={`px-2 py-1 rounded text-xs ${cls}`}>{status}</span>;
}
