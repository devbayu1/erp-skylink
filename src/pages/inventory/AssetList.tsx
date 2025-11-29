// src/pages/inventory/AssetList.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { listAssetRegistrations } from "@/services/assetService";
import AssetStatusBadge from "@/components/inventory/AssetStatusBadge";

export default function AssetList() {
  const all = listAssetRegistrations();
  const [search, setSearch] = useState("");

  const filtered = all.filter(a =>
    a.assetNumber.toLowerCase().includes(search.toLowerCase()) ||
    a.povNumber?.toLowerCase().includes(search.toLowerCase()) ||
    a.grnNumber?.toLowerCase().includes(search.toLowerCase()) ||
    a.receivedFrom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Asset Registration (Stock In)</h1>
          <p className="text-sm text-gray-600">Manage incoming assets and register to inventory</p>
        </div>

        <Link to="/inventory/assets/new" className="px-4 py-2 bg-blue-600 text-white rounded">
          New Registration
        </Link>
      </div>

      <div className="mb-4">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by asset number, pov, grn, vendor..."
          className="w-full md:w-96 border p-2 rounded"
        />
      </div>

      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Asset No</th>
              <th className="p-3 text-left">POV / GRN</th>
              <th className="p-3 text-left">Received From</th>
              <th className="p-3 text-left">Received Date</th>
              <th className="p-3 text-left">Total Qty</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(a => (
              <tr key={a.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <Link to={`/inventory/assets/${a.id}`} className="text-blue-600 underline">
                    {a.assetNumber}
                  </Link>
                </td>
                <td className="p-3">
                  {a.povNumber ? <Link to={`/procurement/pov/${a.povId}`} className="text-blue-600">{a.povNumber}</Link>
                    : a.grnNumber ? <Link to={`/procurement/grn/${a.grnId}`} className="text-blue-600">{a.grnNumber}</Link>
                    : "-"}
                </td>
                <td className="p-3">{a.receivedFrom}</td>
                <td className="p-3">{a.receivedDate}</td>
                <td className="p-3">{a.totalQty}</td>
                <td className="p-3"><AssetStatusBadge status={a.status} /></td>
                <td className="p-3 text-center">
                  <Link to={`/inventory/assets/${a.id}/edit`} className="text-blue-600">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
