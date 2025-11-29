// src/pages/invoices/InvoiceHistory.tsx
import React from "react";
import { useParams } from "react-router-dom";

export default function InvoiceHistory() {
  const { id } = useParams();
  // For mock, just show static info
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Invoice History — {id}</h1>
      <div className="bg-white p-4 rounded shadow mt-4">
        <p className="text-sm text-gray-600">History tracking (mock):</p>
        <ul className="mt-2 list-disc ml-6 text-sm">
          <li>2025-12-01: Invoice created (Draft)</li>
          <li>2025-12-01: Status changed to Pending</li>
          <li>2025-12-05: Payment uploaded (partial/full)</li>
        </ul>
      </div>
    </div>
  );
}
