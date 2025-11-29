import { useNavigate, useParams } from "react-router-dom";
import dummySLALogs from "@/data/dummySLALogs";
import { useState } from "react";

export default function SLALogForm() {
  const navigate = useNavigate();
  const { id, logId } = useParams();

  const existing = dummySLALogs.find((l) => l.id === logId);

  const isEdit = Boolean(existing);

  const [form, setForm] = useState({
    date: existing?.date || new Date().toISOString().slice(0, 10),
    durationMinutes: existing?.durationMinutes || 0,
    description: existing?.description || "",
    severity: existing?.severity || "Low",
    resolvedBy: existing?.resolvedBy || "",
    status: existing?.status || "Resolved",
  });

  const handleSubmit = () => {
    console.log("SLA Log saved:", form);
    alert("SLA Log saved (mock).");
    navigate(`/sla/${id}/logs`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit SLA Log" : "Add SLA Log"}
      </h1>

      <div className="bg-white shadow p-6 rounded space-y-4">
        <div>
          <label className="font-medium">Date</label>
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <div>
          <label className="font-medium">Downtime (minutes)</label>
          <input
            type="number"
            className="border p-2 rounded w-full"
            value={form.durationMinutes}
            onChange={(e) =>
              setForm({ ...form, durationMinutes: Number(e.target.value) })
            }
          />
        </div>

        <div>
          <label className="font-medium">Severity</label>
          <select
            className="border p-2 rounded w-full"
            value={form.severity}
            onChange={(e) => setForm({ ...form, severity: e.target.value })}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>

        <div>
          <label className="font-medium">Description</label>
          <textarea
            className="border p-2 rounded w-full"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div>
          <label className="font-medium">Resolved By</label>
          <input
            className="border p-2 rounded w-full"
            value={form.resolvedBy}
            onChange={(e) =>
              setForm({ ...form, resolvedBy: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-medium">Status</label>
          <select
            className="border p-2 rounded w-full"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>Resolved</option>
            <option>Investigating</option>
            <option>Pending</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            className="border px-4 py-2 rounded"
            onClick={() => navigate(`/sla/${id}/logs`)}
          >
            Cancel
          </button>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            {isEdit ? "Save Changes" : "Add Log"}
          </button>
        </div>
      </div>
    </div>
  );
}
