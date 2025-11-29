import { useNavigate, useParams } from "react-router-dom";
import { getPOV, createPOV, updatePOV, listARF } from "@/services/procurementService";
import { useState } from "react";
import VendorSelector from "@/components/procurement/VendorSelector";
import LineItemEditor from "@/components/procurement/LineItemEditor";
import { listVendors } from "@/services/procurementService";
import { LineItem } from "@/types/procurement";

export default function POVForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const existing = id ? getPOV(id) : undefined;

  const [arfId, setArfId] = useState(existing?.arfId || "");
  const [vendorId, setVendorId] = useState(existing?.vendorId || "");
  const [vendorName, setVendorName] = useState(existing?.vendorName || "");
  const [items, setItems] = useState<LineItem[]>([]);
  const [notes, setNotes] = useState(existing?.notes || "");
  const [status, setStatus] = useState(existing?.status || "Draft");

  const arfRows = listARF();

  const subTotal = items.reduce((acc, i) => acc + (i.estimateUnitPrice || 0), 0);
  const tax = Math.round(subTotal * 0.1);
  const grandTotal = subTotal + tax;

  function save() {
    const payload = {
      arfId,
      arfNumber: arfRows.find((a) => a.id === arfId)?.arfNumber,
      vendorId,
      vendorName,
      items,
      subTotal,
      tax,
      grandTotal,
      notes,
      status,
    };

    if (existing) {
      updatePOV(existing.id, payload);
      alert("POV updated (mock)");
    } else {
      createPOV(payload);
      alert("POV created (mock)");
    }

    navigate("/procurement/pov");
  }

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">{existing ? "Edit POV" : "New POV"}</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        {/* ARF */}
        <div>
          <label className="text-sm">ARF Reference</label>
          <select
            className="border p-2 rounded w-full"
            value={arfId}
            onChange={(e) => setArfId(e.target.value)}
          >
            <option value="">-- choose ARF --</option>
            {arfRows.map((a) => (
              <option key={a.id} value={a.id}>
                {a.arfNumber}
              </option>
            ))}
          </select>
        </div>

        {/* Vendor */}
        <div>
          <label className="text-sm">Vendor</label>
          <VendorSelector
            value={vendorId}
            onChange={(val) => {
              setVendorId(val);
              const vendor = listVendors().find((v) => v.id === val);
              setVendorName(vendor?.name || "");
            }}
          />
        </div>

        {/* Items */}
        <LineItemEditor items={items} onChange={setItems} />

        <div className="bg-gray-50 p-3 rounded text-sm">
          <div className="flex justify-between">
            <span>Sub Total</span>
            <b>Rp {subTotal.toLocaleString("id-ID")}</b>
          </div>

          <div className="flex justify-between">
            <span>PPN 10%</span>
            <b>Rp {tax.toLocaleString("id-ID")}</b>
          </div>

          <div className="flex justify-between text-lg mt-2 border-t pt-2">
            <span>Grand Total</span>
            <b>Rp {grandTotal.toLocaleString("id-ID")}</b>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm">Notes</label>
          <textarea
            className="border p-2 rounded w-full"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <button onClick={() => navigate("/procurement/pov")} className="px-4 py-2 border rounded">
            Cancel
          </button>

          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 rounded">
            <option>Draft</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>

          <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
