// src/components/invoices/PaymentTimeline.tsx
import React from "react";
import type { Payment } from "@/types/invoice";

export default function PaymentTimeline({ payments }: { payments: Payment[] }) {
  return (
    <div className="bg-white rounded shadow p-4">
      {payments.length === 0 ? <div className="text-sm text-gray-500">No payments yet.</div> :
        payments.map(p => (
          <div key={p.id} className="border-b last:border-b-0 py-3">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">Rp {Number(p.amount).toLocaleString("id-ID")}</div>
                <div className="text-xs text-gray-500">{p.method} — {p.date}</div>
              </div>
              <div className="text-xs text-gray-500">Ref: {p.referenceNumber || "-"}</div>
            </div>
          </div>
        ))
      }
    </div>
  );
}
