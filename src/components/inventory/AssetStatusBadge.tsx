// src/components/inventory/AssetStatusBadge.tsx
import React from "react";

export default function AssetStatusBadge({ status }: { status: string }) {
  const styles: Record<string,string> = {
    Pending: "bg-yellow-100 text-yellow-800",
    Received: "bg-blue-100 text-blue-800",
    InStock: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}
