import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import dummyIRO from "@/data/dummyIRO";
import dummyFB from "@/data/dummyFormBerlangganan";

const formatCurrency = (n) => `Rp ${n.toLocaleString("id-ID")}`;

export default function FormBerlanggananForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const iro = dummyIRO.find((i) => i.id === id);

  if (!iro) {
    return <div className="p-6">IRO not found.</div>;
  }

  const [fields, setFields] = useState({
    contractPeriod: 12,
    startDate: iro.serviceStartDate || new Date().toISOString().slice(0, 10),
    installationAddress: "",
    billingContact: "",
    technicalContact: "",
  });

  const handleSubmit = () => {
    const newFB = {
      id: Date.now().toString(),
      fbNumber: `FB-${Date.now()}`,
      iroId: iro.id,
      iroNumber: iro.iroNumber,
      customerName: iro.customerName,
      serviceType: iro.serviceType,
      servicePlan: iro.servicePlan,
      quantity: iro.quantity,
      otcTotal: 0,
      mrcMonthly: 0,
      mrcYearly: 0,
      grandTotal: iro.totalBudget,
      contractPeriod: fields.contractPeriod,
      startDate: fields.startDate,
      endDate: "2026-12-01",
      status: "Draft",
    };

    console.log("Created Form Berlangganan:", newFB);
    alert("Form Berlangganan created successfully (mock).");

    navigate(`/form-berlangganan/${newFB.id}`);
  };

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">
        Create Form Berlangganan
      </h1>

      <div className="bg-white p-6 rounded shadow space-y-6 max-w-3xl">

        <div>
          <label className="font-medium">Customer</label>
          <input className="w-full border p-2 rounded mt-1 bg-gray-50" readOnly value={iro.customerName} />
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="font-medium">Service Type</label>
            <input readOnly value={iro.serviceType} className="w-full border p-2 rounded bg-gray-50 mt-1" />
          </div>

          <div>
            <label className="font-medium">Service Plan</label>
            <input readOnly value={iro.servicePlan} className="w-full border p-2 rounded bg-gray-50 mt-1" />
          </div>

        </div>

        <div>
          <label className="font-medium">Contract Period (months)</label>
          <input
            type="number"
            className="border p-2 rounded w-full mt-1"
            value={fields.contractPeriod}
            onChange={(e) =>
              setFields((prev) => ({ ...prev, contractPeriod: Number(e.target.value) }))
            }
          />
        </div>

        <div>
          <label className="font-medium">Start Date</label>
          <input
            type="date"
            className="border p-2 rounded w-full mt-1"
            value={fields.startDate}
            onChange={(e) =>
              setFields((prev) => ({ ...prev, startDate: e.target.value }))
            }
          />
        </div>

        <div>
          <label className="font-medium">Installation Address</label>
          <input
            className="border p-2 rounded w-full mt-1"
            value={fields.installationAddress}
            onChange={(e) =>
              setFields((prev) => ({ ...prev, installationAddress: e.target.value }))
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
            Create Form
          </button>
        </div>

      </div>
    </div>
  );
}
