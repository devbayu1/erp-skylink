// src/components/invoices/InvoicePDFPreview.tsx
import React from "react";

export default function InvoicePDFPreview({ fileUrl }: { fileUrl?: string }) {
  if (!fileUrl) return <div className="p-6 bg-white rounded shadow">PDF not available</div>;
  return (
    <div className="bg-white rounded shadow overflow-hidden" style={{height: 560}}>
      <iframe src={fileUrl} title="invoice-pdf" className="w-full h-full" />
    </div>
  );
}
