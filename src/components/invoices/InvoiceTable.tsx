// src/components/invoices/InvoiceTable.tsx
import React from "react";
import type { Invoice } from "@/types/invoice";
import { Link } from "react-router-dom";
import InvoiceStatusBadge from "./InvoiceStatusBadge";

export default function InvoiceTable({ invoices }: { invoices: Invoice[] }) {
  const formatCurrency = (n?: number) => {
    const num = Number(n) || 0;
    return `Rp ${num.toLocaleString("id-ID")}`;
  };

  return (
    <div className="bg-white shadow rounded overflow-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 text-left">Invoice No</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-right">Amount</th>
            <th className="p-3">Type</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id} className="border-t hover:bg-gray-50">
              <td className="p-3 font-medium"><Link to={`/invoices/${inv.id}`} className="text-blue-600 underline">{inv.invoiceNumber}</Link></td>
              <td className="p-3">{inv.customerName}</td>
              <td className="p-3 text-right">{formatCurrency(inv.amount)}</td>
              <td className="p-3 text-center">{inv.type}</td>
              <td className="p-3 text-center"><InvoiceStatusBadge status={inv.status} /></td>
              <td className="p-3 text-center">
                <Link to={`/invoices/${inv.id}`} className="text-blue-600">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
