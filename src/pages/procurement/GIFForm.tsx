import { useNavigate, useParams } from "react-router-dom";
import { getGIF, createGIF, updateGIF, listARF } from "@/services/procurementService";
import { useState } from "react";
import LineItemEditor from "@/components/procurement/LineItemEditor";
import { LineItem } from "@/types/procurement";

export default function GIFForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const existing = id ? getGIF(id) : undefined;

  const [arfId, setArfId] = useState(existing?.arfId || "");
  const [requester, setRequester] = useState(existing?.requester || "");
  const [department, setDepartment] = useState(existing?.department || "");
  const [issuedBy, setIssuedBy] = useState(existing?.issuedBy || "");
  const [issuedDate, setIssuedDate] = useState(
    existing?.issuedDate || new Date().toISOString().slice(0, 10)
  );
  // const [items, setItems] = useState(existing?.items || []);
  const [items, setItems] = useState<LineItem[]>([]);
  const [notes, setNotes] = useState(existing?.notes || "");
  const [status, setStatus] = useState(existing?.status || "Draft");

  const arfRows = listARF();

  function save() {
    const payload = {
      arfId,
      arfNumber: arfRows.find((a) => a.id === arfId)?.arfNumber,
      requester,
      department,
      issuedBy,
      issuedDate,
      items,
      notes,
      status,
    };

    if (existing) {
      updateGIF(existing.id, payload);
      alert("GIF updated (mock)");
    } else {
      createGIF(payload);
      alert("GIF created (mock)");
    }

    navigate("/procurement/gif");
  }

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">{existing ? "Edit GIF" : "New GIF"}</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        {/* ARF Reference */}
        <div>
          <label className="text-sm">ARF Reference</label>
          <select
            value={arfId}
            onChange={(e) => setArfId(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">-- select ARF --</option>
            {arfRows.map((a) => (
              <option value={a.id} key={a.id}>
                {a.arfNumber} — {a.requester}
              </option>
            ))}
          </select>
        </div>

        {/* Requester info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm">Requester</label>
            <input
              value={requester}
              onChange={(e) => setRequester(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="text-sm">Department</label>
            <input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        {/* Issued By */}
        <div>
          <label className="text-sm">Issued By</label>
          <input
            value={issuedBy}
            onChange={(e) => setIssuedBy(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Date */}
        <div>
          <label className="text-sm">Issued Date</label>
          <input
            type="date"
            value={issuedDate}
            onChange={(e) => setIssuedDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Items */}
        <LineItemEditor items={items} onChange={setItems} />

        {/* Notes */}
        <div>
          <label className="text-sm">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <button onClick={() => navigate("/procurement/gif")} className="px-4 py-2 border rounded">
            Cancel
          </button>

          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 rounded">
            <option>Draft</option>
            <option>Issued</option>
            <option>Cancelled</option>
          </select>

          <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
