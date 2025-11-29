// src/pages/invoices/InvoiceForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createInvoiceManual } from "@/services/invoiceService";

export default function InvoiceForm() {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [type, setType] = useState("OTC");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  function handleCreate() {
    if (!customerName) return alert("Customer required");
    const inv = createInvoiceManual({
      customerName,
      type: type as any,
      amount: Number(amount),
      dueDate
    });
    alert(`Invoice ${inv.invoiceNumber} created (mock).`);
    navigate(`/invoices/${inv.id}`);
  }

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>
      <div className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block text-sm">Customer</label>
          <input value={customerName} onChange={e=>setCustomerName(e.target.value)} className="border p-2 rounded w-full" />
        </div>
        <div>
          <label className="block text-sm">Type</label>
          <select value={type} onChange={e=>setType(e.target.value)} className="border p-2 rounded w-full">
            <option>OTC</option>
            <option>MRC</option>
            <option>DP</option>
            <option>PREPAID</option>
            <option>POSTPAID</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Amount</label>
          <input value={amount} onChange={e=>setAmount(e.target.value)} className="border p-2 rounded w-full" />
        </div>
        <div>
          <label className="block text-sm">Due Date</label>
          <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} className="border p-2 rounded w-full" />
        </div>
        <div>
          <label className="block text-sm">Notes</label>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} className="border p-2 rounded w-full"></textarea>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={()=>navigate("/invoices")} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleCreate} className="px-4 py-2 bg-blue-600 text-white rounded">Create Invoice</button>
        </div>
      </div>
    </div>
  );
}
