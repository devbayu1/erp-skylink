import React from "react";
import { Link } from "react-router-dom";
import { listPRF } from "@/services/procurementService";
import RequestStatusBadge from "@/components/procurement/RequestStatusBadge";

export default function PRFList() {
  const rows = listPRF();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Purchase Request (PRF)</h1>
          <p className="text-sm text-gray-600">
            Procurement request derived from MGRF
          </p>
        </div>
        <Link
          to="/procurement/prf/new"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          New PRF
        </Link>
      </div>

      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">PRF No</th>
              <th className="p-3 text-left">MGRF Ref</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Vendor</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <Link
                    to={`/procurement/prf/${r.id}`}
                    className="text-blue-600 underline"
                  >
                    {r.prfNumber}
                  </Link>
                </td>
                <td className="p-3">{r.mgrfId || "-"}</td>
                <td className="p-3">{r.createdAt}</td>
                <td className="p-3">{r.vendorPreferred || "-"}</td>
                <td className="p-3">
                  Rp {(r.totalEstimate || 0).toLocaleString("id-ID")}
                </td>
                <td className="p-3">
                  <RequestStatusBadge status={r.status} />
                </td>
                <td className="p-3 text-center">
                  <Link
                    to={`/procurement/prf/${r.id}/edit`}
                    className="text-sm text-blue-600"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
