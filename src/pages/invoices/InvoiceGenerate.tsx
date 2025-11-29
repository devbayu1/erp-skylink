// src/pages/invoices/InvoiceGenerate.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import InvoiceGeneratorOptions from "@/components/invoices/InvoiceGeneratorOptions";
import { createInvoiceFromPKS } from "@/services/invoiceService";
import dummyPKSContracts from "@/data/dummyPKS"; // adapt to your dummy PKS file

export default function InvoiceGenerate() {
  const { pksId } = useParams();
  const navigate = useNavigate();
  const pks = (dummyPKSContracts as any[]).find(x => x.id === pksId);

  if (!pks) return <div className="p-6">PKS not found</div>;

  function handleSelect(type: string) {
    const inv = createInvoiceFromPKS(pks, type as any);
    alert(`Invoice ${inv.invoiceNumber} generated (mock).`);
    navigate(`/invoices/${inv.id}`);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Generate Invoice — PKS {pks.pksNumber || pks.id}</h1>
      <p className="text-sm text-gray-500 mb-4">Pick invoice type to generate</p>

      <InvoiceGeneratorOptions onSelect={handleSelect} />
    </div>
  );
}
