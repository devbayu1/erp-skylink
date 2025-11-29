import React from "react";
import { useParams, Link } from "react-router-dom";
import { getMGRF } from "@/services/procurementService";

export default function MGRFDetail() {
  const { id } = useParams();
  const data = id ? getMGRF(id) : undefined;
  if (!data) return <div className="p-6">MGRF not found</div>;

  return (
    <div className="p-6 max-w-3xl space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{data.mgrfNumber}</h1>
          <p className="text-sm text-gray-600">Purpose: {data.purpose}</p>
        </div>
        <div>
          <Link to={`/procurement/mgrf/${data.id}/edit`} className="px-3 py-2 border rounded">Edit</Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Items</h3>
        <ul className="list-disc ml-6">
          {data.items.map(it => (
            <li key={it.id}>{it.description} — {it.qty} {it.unit} — Rp {(it.estimateUnitPrice||0).toLocaleString("id-ID")}</li>
          ))}
        </ul>
        <div className="mt-3">Total Estimate: Rp {(data.totalEstimate||0).toLocaleString("id-ID")}</div>
      </div>
    </div>
  );
}
