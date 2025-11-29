import React from "react";
import { Link, useParams } from "react-router-dom";
import { getPRF } from "@/services/procurementService";
import RequestStatusBadge from "@/components/procurement/RequestStatusBadge";

export default function PRFDetail() {
  const { id } = useParams();
  const data = id ? getPRF(id) : undefined;

  if (!data) return <div className="p-6">PRF not found</div>;

  return (
    <div className="p-6 max-w-3xl space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{data.prfNumber}</h1>
          <p className="text-sm text-gray-600">
            Vendor: {data.vendorPreferred || "-"}
          </p>
        </div>

        <Link
          to={`/procurement/prf/${data.id}/edit`}
          className="px-3 py-2 border rounded"
        >
          Edit
        </Link>
      </div>

      {/* Status */}
      <div>
        <RequestStatusBadge status={data.status} />
      </div>

      {/* Items */}
      <div className="bg-white p-4 rounded shadow space-y-2">
        <h3 className="font-semibold">Items</h3>
        <ul className="list-disc ml-6">
          {data.items.map((it) => (
            <li key={it.id}>
              {it.description} — {it.qty} {it.unit} — Rp{" "}
              {(it.estimateUnitPrice || 0).toLocaleString("id-ID")}
            </li>
          ))}
        </ul>

        <div className="mt-3 font-semibold">
          Total: Rp {(data.totalEstimate || 0).toLocaleString("id-ID")}
        </div>
      </div>

      {/* Approval Notes */}
      {data.approvalNotes && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Approval Notes</h3>
          <p>{data.approvalNotes}</p>
        </div>
      )}

      {/* Button: Generate POV */}
      {data.status === "Approved" && (
        <div>
          <button className="px-4 py-2 bg-green-600 text-white rounded">
            Generate Purchase Order Vendor (POV)
          </button>
        </div>
      )}
    </div>
  );
}
