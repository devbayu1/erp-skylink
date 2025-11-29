import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dummyPKS from "@/data/dummyPKS";

export default function CustomerPOForm() {
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    poNumber: "",
    poDate: "",
    pksId: "",
    poValue: 0,
    poStart: "",
    poEnd: "",
    customerName: "",
  });

  const selectedPKS = dummyPKS.find((p) => p.id === fields.pksId);

  const handleSubmit = () => {
    console.log("PO Payload:", fields);
    alert("PO Uploaded (mock)");
    navigate("/po");
  };

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-5">Upload Customer PO</h1>

      <div className="bg-white shadow rounded p-6 space-y-6">

        {/* PKS Selection */}
        <div>
          <label className="font-medium">Select PKS</label>
          <select
            className="border p-2 rounded w-full mt-1"
            value={fields.pksId}
            onChange={(e) =>
              setFields({ ...fields, pksId: e.target.value })
            }
          >
            <option value="">-- Choose PKS --</option>

            {dummyPKS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.pksNumber} — {p.customerName}
              </option>
            ))}
          </select>
        </div>

        {selectedPKS && (
          <div className="p-3 bg-gray-50 rounded text-sm">
            <p><b>Customer:</b> {selectedPKS.customerName}</p>
            <p><b>Service:</b> {selectedPKS.serviceType}</p>
          </div>
        )}

        {/* PO Inputs */}
        <div>
          <label className="font-medium">PO Number</label>
          <input
            className="border p-2 w-full rounded mt-1"
            onChange={(e) =>
              setFields({ ...fields, poNumber: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-medium">PO Date</label>
          <input
            type="date"
            className="border p-2 w-full rounded mt-1"
            onChange={(e) =>
              setFields({ ...fields, poDate: e.target.value })
            }
          />
        </div>

        <div>
          <label className="font-medium">PO Value</label>
          <input
            type="number"
            className="border p-2 w-full rounded mt-1"
            onChange={(e) =>
              setFields({ ...fields, poValue: Number(e.target.value) })
            }
          />
        </div>

        {/* Validity */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Valid From</label>
            <input
              type="date"
              className="border p-2 w-full rounded mt-1"
              onChange={(e) =>
                setFields({ ...fields, poStart: e.target.value })
              }
            />
          </div>

          <div>
            <label className="font-medium">Valid Until</label>
            <input
              type="date"
              className="border p-2 w-full rounded mt-1"
              onChange={(e) =>
                setFields({ ...fields, poEnd: e.target.value })
              }
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 border rounded"
            onClick={() => navigate("/po")}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSubmit}
          >
            Upload PO
          </button>
        </div>

      </div>
    </div>
  );
}
