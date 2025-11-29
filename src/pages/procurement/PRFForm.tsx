import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPRF, updatePRF, createPRF, listMGRF } from "@/services/procurementService";
import LineItemEditor from "@/components/procurement/LineItemEditor";

export default function PRFForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const existing = id ? getPRF(id) : undefined;

  const [mgrfId, setMgrfId] = useState(existing?.mgrfId || "");
  const [vendor, setVendor] = useState(existing?.vendorPreferred || "");
  const [items, setItems] = useState(existing?.items || []);
  const [notes, setNotes] = useState(existing?.approvalNotes || "");
  const [status, setStatus] = useState(existing?.status || "Draft");

  const mgrfRows = listMGRF();

  function save() {
    const payload = {
      mgrfId,
      vendorPreferred: vendor,
      items,
      approvalNotes: notes,
      status,
    };

    if (existing) {
      updatePRF(existing.id, payload);
      alert("PRF updated (mock)");
    } else {
      createPRF(payload as any);
      alert("PRF created (mock)");
    }

    navigate("/procurement/prf");
  }

  const total = items.reduce(
    (s, it) => s + (it.estimateUnitPrice || 0) * it.qty,
    0
  );

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">
        {existing ? "Edit PRF" : "New PRF"}
      </h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        {/* MGRF reference */}
        <div>
          <label className="block text-sm">MGRF Reference</label>
          <select
            value={mgrfId}
            onChange={(e) => setMgrfId(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">-- Select MGRF --</option>
            {mgrfRows.map((m) => (
              <option key={m.id} value={m.id}>
                {m.mgrfNumber} — {m.purpose}
              </option>
            ))}
          </select>
        </div>

        {/* Vendor */}
        <div>
          <label className="block text-sm">Preferred Vendor</label>
          <input
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Items */}
        <div>
          <label className="block text-sm mb-1">Line Items</label>
          <LineItemEditor items={items} onChange={setItems} />
        </div>

        <div className="text-sm">
          Total Estimate: Rp {total.toLocaleString("id-ID")}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm">Approval Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate("/procurement/prf")}
            className="px-3 py-2 border rounded"
          >
            Cancel
          </button>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            className="border p-2 rounded"
          >
            <option>Draft</option>
            <option>Submitted</option>
            <option>Approved</option>
          </select>

          <button
            onClick={save}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
