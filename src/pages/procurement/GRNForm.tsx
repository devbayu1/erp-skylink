// src/pages/procurement/GRNForm.tsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGRN, createGRN, updateGRN, listPOV, listGIF } from "@/services/procurementService";
import LineItemEditor from "@/components/procurement/LineItemEditor";

export default function GRNForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const existing = id ? getGRN(id) : undefined;

  const [povId, setPovId] = useState(existing?.povId || "");
  const [gifId, setGifId] = useState(existing?.gifId || "");
  const [receivedBy, setReceivedBy] = useState(existing?.receivedBy || "warehouse.user");
  const [receivedDate, setReceivedDate] = useState(existing?.receivedDate || new Date().toISOString().slice(0,10));
  const [receivedFrom, setReceivedFrom] = useState(existing?.receivedFrom || "");
  const [receiverName, setReceiverName] = useState(existing?.receiverName || "");
  const [items, setItems] = useState(existing?.items || []);
  const [notes, setNotes] = useState(existing?.notes || "");
  const [status, setStatus] = useState(existing?.status || "Pending");

  const povRows = listPOV();
  const gifRows = listGIF();

  function save() {
    const payload = {
      povId: povId || undefined,
      povNumber: povRows.find(p => p.id === povId)?.povNumber,
      gifId: gifId || undefined,
      gifNumber: gifRows.find(g => g.id === gifId)?.gifNumber,
      receivedBy,
      receivedDate,
      receivedFrom,
      receiverName,
      items,
      notes,
      status,
    };

    if (existing) {
      updateGRN(existing.id, payload);
      alert("GRN updated (mock)");
    } else {
      createGRN(payload);
      alert("GRN created (mock)");
    }

    navigate("/procurement/grn");
  }

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">{existing ? "Edit GRN" : "New GRN"}</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block text-sm">POV Reference (if goods from vendor)</label>
          <select value={povId} onChange={(e) => setPovId(e.target.value)} className="border p-2 rounded w-full">
            <option value="">-- choose POV --</option>
            {povRows.map(p => <option key={p.id} value={p.id}>{p.povNumber} — {p.vendorName}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm">GIF Reference (if internal stock)</label>
          <select value={gifId} onChange={(e) => setGifId(e.target.value)} className="border p-2 rounded w-full">
            <option value="">-- choose GIF --</option>
            {gifRows.map(g => <option key={g.id} value={g.id}>{g.gifNumber} — {g.requester}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">Received By</label>
            <input value={receivedBy} onChange={(e)=>setReceivedBy(e.target.value)} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block text-sm">Received Date</label>
            <input type="date" value={receivedDate} onChange={(e)=>setReceivedDate(e.target.value)} className="border p-2 rounded w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">Received From</label>
            <input value={receivedFrom} onChange={(e)=>setReceivedFrom(e.target.value)} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block text-sm">Receiver Name (site)</label>
            <input value={receiverName} onChange={(e)=>setReceiverName(e.target.value)} className="border p-2 rounded w-full" />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Items</label>
          {/* reuse LineItemEditor but adapt field names (we'll use it generically) */}
          <LineItemEditor items={items as any} onChange={(it:any)=>setItems(it)} />
        </div>

        <div>
          <label className="block text-sm">Notes</label>
          <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} className="border p-2 rounded w-full" />
        </div>

        <div className="flex justify-end gap-3 items-center">
          <button className="px-4 py-2 border rounded" onClick={()=>navigate("/procurement/grn")}>Cancel</button>
          <select value={status} onChange={(e)=>setStatus(e.target.value as typeof status)} className="border p-2 rounded">
            <option>Pending</option>
            <option>Received</option>
            <option>Inspecting</option>
            <option>Completed</option>
            <option>Rejected</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
}
