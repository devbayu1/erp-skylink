import { useNavigate, useParams } from "react-router-dom";
import { getARF, listPRF, updateARF, createARF } from "@/services/procurementService";
import { useState } from "react";

export default function ARFForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const existing = id ? getARF(id) : undefined;

  const [prfId, setPrfId] = useState(existing?.prfId || "");
  const [purpose, setPurpose] = useState(existing?.purpose || "");
  const [requester, setRequester] = useState(existing?.requester || "");
  const [department, setDepartment] = useState(existing?.department || "");
  const [amount, setAmount] = useState(existing?.amountRequested || 0);
  const [notes, setNotes] = useState(existing?.approvalNotes || "");
  const [status, setStatus] = useState(existing?.status || "Draft");

  const prfRows = listPRF();

  function save() {
    const payload = {
      prfId,
      prfNumber: prfRows.find((p) => p.id === prfId)?.prfNumber,
      purpose,
      requester,
      department,
      amountRequested: Number(amount),
      approvalNotes: notes,
      status,
    };

    if (existing) {
      updateARF(existing.id, payload);
      alert("ARF updated (mock)");
    } else {
      createARF(payload);
      alert("ARF created (mock)");
    }

    navigate("/procurement/arf");
  }

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">{existing ? "Edit ARF" : "New ARF"}</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        {/* PRF Reference */}
        <div>
          <label className="block text-sm">PRF Reference</label>
          <select
            value={prfId}
            onChange={(e) => setPrfId(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">-- select PRF --</option>
            {prfRows.map((p) => (
              <option value={p.id} key={p.id}>
                {p.prfNumber} — {p.vendorPreferred}
              </option>
            ))}
          </select>
        </div>

        {/* Requester */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">Requester</label>
            <input
              value={requester}
              onChange={(e) => setRequester(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm">Department</label>
            <input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        {/* Purpose */}
        <div>
          <label className="block text-sm">Purpose</label>
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm">Amount Requested</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="border p-2 rounded w-full"
          />
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
        <div className="flex justify-end items-center gap-3">
          <button
            onClick={() => navigate("/procurement/arf")}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option>Draft</option>
            <option>Submitted</option>
            <option>Approved</option>
            <option>Rejected</option>
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
