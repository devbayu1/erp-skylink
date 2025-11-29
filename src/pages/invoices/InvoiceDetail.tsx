// src/pages/invoices/InvoiceDetail.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import InvoicePDFPreview from "@/components/invoices/InvoicePDFPreview";
import InvoiceStatusBadge from "@/components/invoices/InvoiceStatusBadge";
import { getInvoice } from "@/services/invoiceService";

export default function InvoiceDetail() {
  const { id } = useParams();
  const invoice = getInvoice(id || "");

  if (!invoice) return <div className="p-6">Invoice not found</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{invoice.invoiceNumber}</h1>
          <p className="text-gray-600">{invoice.customerName} • {invoice.type}</p>
        </div>

        <div className="flex gap-2">
          <Link to={`/invoices/${id}/payments`} className="px-3 py-2 border rounded">Payments</Link>
          <Link to={`/invoices/${id}/history`} className="px-3 py-2 border rounded">History</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <InvoicePDFPreview fileUrl={invoice.pdfUrl} />
        </div>

        <aside className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Details</h3>
            <p className="text-sm">Amount: Rp {Number(invoice.amount).toLocaleString("id-ID")}</p>
            <p className="text-sm">Invoice Date: {invoice.invoiceDate}</p>
            <p className="text-sm">Due Date: {invoice.dueDate}</p>
            <p className="text-sm">Type: {invoice.type}</p>
            <p className="mt-2"><InvoiceStatusBadge status={invoice.status} /></p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Actions</h3>
            <div className="flex flex-col gap-2 mt-2">
              <a href={invoice.pdfUrl} target="_blank" rel="noreferrer" className="text-blue-600">Download PDF</a>
              <Link to={`/invoices/${id}/payments`} className="text-blue-600">Add Payment</Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
