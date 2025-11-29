// src/components/invoices/InvoiceGeneratorOptions.tsx
import React from "react";

export default function InvoiceGeneratorOptions({ onSelect }: { onSelect?: (type: string) => void }) {
  const options = ["OTC", "DP", "PREPAID", "MRC", "POSTPAID"];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {options.map(opt => (
        <button key={opt} onClick={() => onSelect && onSelect(opt)} className="border p-4 rounded hover:bg-gray-50 text-left">
          <div className="font-medium">{opt}</div>
          <div className="text-xs text-gray-500 mt-1">Generate {opt} invoice</div>
        </button>
      ))}
    </div>
  );
}
