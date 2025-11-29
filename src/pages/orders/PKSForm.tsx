import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import dummyFB from "@/data/dummyFormBerlangganan";

const formatCurrency = (n) => `Rp ${n.toLocaleString("id-ID")}`;

export default function PKSForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const fb = dummyFB.find((f) => f.id === id);

  if (!fb) {
    return <div className="p-6">Form Berlangganan not found.</div>;
  }

  const [fields, setFields] = useState({
    contractStart: fb.startDate,
    contractEnd: fb.endDate,
    signLocation: "",
    signDate: new Date().toISOString().slice(0, 10),
    customerPIC: "",
    telkomPIC: "",
  });

  const handleSubmit = () => {
    const newPKS = {
      id: Date.now().toString(),
      pksNumber: `PKS-${Date.now()}`,
      fbId: fb.id,
      fbNumber: fb.fbNumber,
      customerName: fb.customerName,
      serviceType: fb.serviceType,
      servicePlan: fb.servicePlan,
      contractPeriod: fb.contractPeriod,
      totalValue: fb.grandTotal,
      status: "Draft",
      ...fields,
    };

    console.log("Created PKS:", newPKS);
    alert("PKS created successfully (mock).");

    navigate(`/pks/${newPKS.id}`);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Create PKS</h1>

      <div className="bg-white p-6 rounded shadow space-y-6 max-w-3xl">

        <div>
          <label className="font-medium">Customer</label>
          <input className="w-full border p-2 rounded mt-1 bg-gray-50" readOnly value={fb.customerName} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Contract Start</label>
            <input
              type="date"
              className="border p-2 rounded w-full mt-1"
              value={fields.contractStart}
              onChange={(e) =>
                setFields((prev) => ({ ...prev, contractStart: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="font-medium">Contract End</label>
            <input
              type="date"
              className="border p-2 rounded w-full mt-1"
              value={fields.contractEnd}
              onChange={(e) =>
                setFields((prev) => ({ ...prev, contractEnd: e.target.value }))
              }
            />
          </div>
        </div>

        <div>
          <label className="font-medium">Signing Location</label>
          <input
            className="border p-2 rounded w-full mt-1"
            value={fields.signLocation}
            onChange={(e) =>
              setFields((prev) => ({ ...prev, signLocation: e.target.value }))
            }
          />
        </div>

        <div>
          <label className="font-medium">Signing Date</label>
          <input
            type="date"
            className="border p-2 rounded w-full mt-1"
            value={fields.signDate}
            onChange={(e) =>
              setFields((prev) => ({ ...prev, signDate: e.target.value }))
            }
          />
        </div>

        <div>
          <label className="font-medium">Customer PIC</label>
          <input
            className="border p-2 rounded w-full mt-1"
            value={fields.customerPIC}
            onChange={(e) =>
              setFields((prev) => ({ ...prev, customerPIC: e.target.value }))
            }
          />
        </div>

        <div>
          <label className="font-medium">Telkom PIC</label>
          <input
            className="border p-2 rounded w-full mt-1"
            value={fields.telkomPIC}
            onChange={(e) =>
              setFields((prev) => ({ ...prev, telkomPIC: e.target.value }))
            }
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Create PKS
          </button>
        </div>

      </div>
    </div>
  );
}
