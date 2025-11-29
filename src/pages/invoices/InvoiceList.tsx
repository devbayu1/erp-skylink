// src/pages/invoices/InvoiceList.tsx
import React from "react";
import { Link } from "react-router-dom";
import InvoiceTable from "@/components/invoices/InvoiceTable";
import { listInvoices } from "@/services/invoiceService";

export default function InvoiceList() {
  const invoices = listInvoices();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Invoices</h1>
          <p className="text-gray-600 text-sm">Manage invoices and payments</p>
        </div>
        <div className="flex gap-2">
          <Link to="/invoices/new" className="px-4 py-2 bg-blue-600 text-white rounded">Create Invoice</Link>
        </div>
      </div>

      <InvoiceTable invoices={invoices} />
    </div>
  );
}
