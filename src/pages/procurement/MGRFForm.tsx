import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMGRF, createMGRF, updateMGRF } from "@/services/procurementService";
import LineItemEditor from "@/components/procurement/LineItemEditor";

export default function MGRFForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? getMGRF(id) : undefined;

  const [purpose, setPurpose] = useState(existing?.purpose || "");
  const [neededByDate, setNeededByDate] = useState(existing?.neededByDate || "");
  const [items, setItems] = useState(existing?.items || []);
  const [notes, setNotes] = useState(existing?.notes || "");
  const [status, setStatus] = useState(existing?.status || "Draft");

  function save() {
    const payload = {
      purpose, neededByDate, items, notes, status
    };
    if (existing) {
      updateMGRF(existing.id, payload);
      alert("MGRF updated (mock)");
    } else {
      const created = createMGRF(payload as any);
      alert("MGRF created (mock)");
    }
    navigate("/procurement/mgrf");
  }

  const total = items.reduce((s, it) => s + (it.estimateUnitPrice||0) * it.qty, 0);

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">{existing ? "Edit MGRF" : "New MGRF"}</h1>
      <div className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block text-sm">Purpose</label>
          <input value={purpose} onChange={e=>setPurpose(e.target.value)} className="border p-2 rounded w-full" />
        </div>
        <div>
          <label className="block text-sm">Needed By</label>
          <input type="date" value={neededByDate} onChange={e=>setNeededByDate(e.target.value)} className="border p-2 rounded w-full" />
        </div>

        <div>
          <label className="block text-sm mb-2">Line Items</label>
          <LineItemEditor items={items} onChange={setItems} />
        </div>

        <div className="text-sm">Total Estimate: Rp {total.toLocaleString("id-ID")}</div>

        <div>
          <label className="block text-sm">Notes</label>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} className="border p-2 rounded w-full" />
        </div>

        <div className="flex gap-2 justify-end">
          <button onClick={()=>navigate("/procurement/mgrf")} className="px-3 py-2 border rounded">Cancel</button>
          <select value={status} onChange={e=>setStatus(e.target.value as typeof status)} className="border p-2 rounded">
            <option>Draft</option>
            <option>Submitted</option>
            <option>Approved</option>
          </select>
          <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
