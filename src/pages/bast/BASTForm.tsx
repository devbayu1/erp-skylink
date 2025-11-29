import { useParams, useNavigate } from "react-router-dom";
import dummyBAST from "@/data/dummyBAST";
import { useState } from "react";

export default function BASTForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const existing = dummyBAST.find((b) => b.id === id);

  const isEdit = Boolean(existing);

  const [form, setForm] = useState({
    bastNumber: existing?.bastNumber || "",
    bastDate: existing?.bastDate || new Date().toISOString().slice(0, 10),
    customerName: existing?.customerName || "",
    serviceType: existing?.serviceType || "",
    serviceLocation: existing?.serviceLocation || "",
    installationNotes: existing?.installationNotes || "",
    testResult: existing?.testResult || "Pass",
    engineerName: existing?.engineerName || "",
    customerPIC: existing?.customerPIC || "",
  });

  const handleSubmit = () => {
    console.log("BAST Saved:", form);
    alert("BAST saved (mock)");
    navigate("/bast");
  };

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit BAST" : "Create BAST"}
      </h1>

      <div className="bg-white shadow p-6 rounded-lg space-y-4">
        <div>
          <label className="font-medium">BAST Number</label>
          <input
            className="border p-2 rounded w-full"
            value={form.bastNumber}
            onChange={(e) => setForm({ ...form, bastNumber: e.target.value })}
          />
        </div>

        <div>
          <label className="font-medium">Date</label>
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={form.bastDate}
            onChange={(e) => setForm({ ...form, bastDate: e.target.value })}
          />
        </div>

        <hr />

        <div>
          <label className="font-medium">Customer Name</label>
          <input
            className="border p-2 rounded w-full"
            value={form.customerName}
            onChange={(e) =>
              setForm({ ...form, customerName: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-medium">Service Type</label>
          <input
            className="border p-2 rounded w-full"
            value={form.serviceType}
            onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
          />
        </div>

        <div>
          <label className="font-medium">Service Location</label>
          <input
            className="border p-2 rounded w-full"
            value={form.serviceLocation}
            onChange={(e) =>
              setForm({ ...form, serviceLocation: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-medium">Installation Notes</label>
          <textarea
            className="border p-2 rounded w-full"
            value={form.installationNotes}
            onChange={(e) =>
              setForm({ ...form, installationNotes: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-medium">Test Result</label>
          <select
            className="border p-2 rounded w-full"
            value={form.testResult}
            onChange={(e) => setForm({ ...form, testResult: e.target.value })}
          >
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
          </select>
        </div>

        <div>
          <label className="font-medium">Engineer Name</label>
          <input
            className="border p-2 rounded w-full"
            value={form.engineerName}
            onChange={(e) =>
              setForm({ ...form, engineerName: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-medium">Customer PIC</label>
          <input
            className="border p-2 rounded w-full"
            value={form.customerPIC}
            onChange={(e) =>
              setForm({ ...form, customerPIC: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            className="border px-4 py-2 rounded"
            onClick={() => navigate("/bast")}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            {isEdit ? "Save Changes" : "Create BAST"}
          </button>
        </div>
      </div>
    </div>
  );
}
