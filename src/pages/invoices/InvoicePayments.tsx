// src/pages/invoices/InvoicePayments.tsx
import React from "react";
import { useParams } from "react-router-dom";
import PaymentUpload from "@/components/invoices/PaymentUpload";
import PaymentTimeline from "@/components/invoices/PaymentTimeline";
import { listPayments, addPayment } from "@/services/invoiceService";

export default function InvoicePayments() {
  const { id } = useParams();
  const payments = listPayments(id || "");

  function handleUpload(data: {amount:number, method:string, reference?:string, proof?: File}) {
    // mock: create payment and attach proof as url
    const proofUrl = data.proof ? URL.createObjectURL(data.proof) : undefined;
    const p = addPayment(id || "", { amount: data.amount, method: data.method, referenceNumber: data.reference, proofUrl });
    alert("Payment uploaded (mock)");
    console.log(p);
    window.location.reload();
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Invoice Payments</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Upload Payment</h3>
          <PaymentUpload onUpload={handleUpload} />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Payment History</h3>
          <PaymentTimeline payments={payments} />
        </div>
      </div>
    </div>
  );
}
