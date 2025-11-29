// src/pages/procurement/GRNList.tsx
import React from "react";
import { Link } from "react-router-dom";
import { listGRN } from "@/services/procurementService";
import RequestStatusBadge from "@/components/procurement/RequestStatusBadge";
import { RequestStatus } from "@/types/procurement";

export default function GRNList() {
  const rows = listGRN();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold">Goods Receive Note (GRN)</h1>
          <p className="text-gray-600 text-sm">Record incoming goods from vendor / warehouse</p>
        </div>

        <Link to="/procurement/grn/new" className="px-4 py-2 bg-blue-600 text-white rounded">
          New GRN
        </Link>
      </div>

      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">GRN No</th>
              <th className="p-3 text-left">POV / GIF</th>
              <th className="p-3 text-left">Received Date</th>
              <th className="p-3 text-left">Received From</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <Link to={`/procurement/grn/${r.id}`} className="text-blue-600 underline">
                    {r.grnNumber}
                  </Link>
                </td>
                <td className="p-3">
                  {r.povNumber ? <Link to={`/procurement/pov/${r.povId}`} className="text-blue-600">{r.povNumber}</Link> : r.gifNumber ? <Link to={`/procurement/gif/${r.gifId}`} className="text-blue-600">{r.gifNumber}</Link> : "-"}
                </td>
                <td className="p-3">{r.receivedDate}</td>
                <td className="p-3">{r.receivedFrom}</td>
                <td className="p-3"><RequestStatusBadge status={r.status as RequestStatus} /></td>
                <td className="p-3 text-center">
                  <Link to={`/procurement/grn/${r.id}/edit`} className="text-blue-600">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
