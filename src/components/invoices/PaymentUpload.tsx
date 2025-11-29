// src/components/invoices/PaymentUpload.tsx
import React, { useState } from "react";

export default function PaymentUpload({ onUpload }: { onUpload: (data: {amount:number, method:string, reference?:string, proof?: File}) => void }) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Bank Transfer");
  const [reference, setReference] = useState("");
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="bg-white p-4 rounded shadow space-y-3">
      <div>
        <label className="block text-sm">Amount</label>
        <input value={amount} onChange={e=>setAmount(e.target.value)} className="border p-2 rounded w-full" />
      </div>
      <div>
        <label className="block text-sm">Method</label>
        <select value={method} onChange={e=>setMethod(e.target.value)} className="border p-2 rounded w-full">
          <option>Bank Transfer</option>
          <option>Cash</option>
          <option>Credit Card</option>
        </select>
      </div>
      <div>
        <label className="block text-sm">Reference</label>
        <input value={reference} onChange={e=>setReference(e.target.value)} className="border p-2 rounded w-full" />
      </div>
      <div>
        <label className="block text-sm">Proof (optional)</label>
        <input type="file" onChange={e=>setFile(e.target.files?.[0]||null)} className="mt-1" />
      </div>

      <div className="flex justify-end gap-2">
        <button onClick={()=> {
          const amt = Number(amount || 0);
          if (!amt) return alert("Enter amount");
          onUpload({amount: amt, method, reference, proof: file || undefined});
        }} className="px-4 py-2 bg-blue-600 text-white rounded">Upload Payment</button>
      </div>
    </div>
  );
}
