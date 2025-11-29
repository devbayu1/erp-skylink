// src/components/inventory/MovementTypeBadge.tsx
import React from "react";

export default function MovementTypeBadge({ type }: { type: string }) {
  const styles: Record<string,string> = {
    IN: "bg-green-100 text-green-800",
    OUT: "bg-red-100 text-red-800",
    TRANSFER: "bg-blue-100 text-blue-800",
    RETURN: "bg-yellow-100 text-yellow-800",
    DISPOSAL: "bg-gray-100 text-gray-700",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[type] || "bg-gray-100 text-gray-700"}`}>
      {type}
    </span>
  );
}
