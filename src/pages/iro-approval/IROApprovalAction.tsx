import { useParams, useNavigate } from "react-router-dom";
import dummyIROApproval from "@/data/dummyIROApproval";
import { useState } from "react";

export default function IROApprovalAction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = dummyIROApproval.find((d) => d.id === id);

  if (!data) return <div className="p-6">Approval record not found</div>;

  const step = data.steps[data.currentStep];
  const [notes, setNotes] = useState("");

  function submit(status: "Approved" | "Rejected") {
    console.log("Mock approval:", {
      approverStep: step,
      action: status,
      notes,
    });

    alert(`Mock: ${status} submitted. Check console.`);
    navigate(`/iro-approval/${data.id}`);
  }

  return (
    <div className="p-6 max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Approval Action</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <p className="font-semibold">Current Step:</p>
          <p>{step.role}</p>
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border p-3 rounded w-full"
          placeholder="Add approval notes (optional)"
        />

        <div className="flex gap-3 justify-end">
          <button
            onClick={() => submit("Rejected")}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Reject
          </button>
          <button
            onClick={() => submit("Approved")}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
