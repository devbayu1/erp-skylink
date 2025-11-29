// src/pages/inventory/MovementList.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { listMovements } from "@/services/movementService";
import MovementTypeBadge from "@/components/inventory/MovementTypeBadge";

export default function MovementList() {
  const all = listMovements();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const filtered = all.filter(m => {
    if (filterType !== "all" && m.type !== filterType) return false;
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      m.movementNo.toLowerCase().includes(s) ||
      (m.referenceNumber || "").toLowerCase().includes(s) ||
      (m.fromLocation || "").toLowerCase().includes(s) ||
      (m.toLocation || "").toLowerCase().includes(s)
    );
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Asset Movements</h1>
          <p className="text-sm text-gray-600">Track inventory movements (in / out / transfer / return / disposal)</p>
        </div>

        <Link to="/inventory/movements/new" className="px-4 py-2 bg-blue-600 text-white rounded">New Movement</Link>
      </div>

      <div className="mb-4 flex gap-3">
        <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search movement, ref, location..." className="border p-2 rounded w-96" />
        <select value={filterType} onChange={(e)=>setFilterType(e.target.value)} className="border p-2 rounded">
          <option value="all">All Types</option>
          <option value="IN">IN</option>
          <option value="OUT">OUT</option>
          <option value="TRANSFER">TRANSFER</option>
          <option value="RETURN">RETURN</option>
          <option value="DISPOSAL">DISPOSAL</option>
        </select>
      </div>

      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Movement No</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">From → To</th>
              <th className="p-3 text-left">Ref</th>
              <th className="p-3 text-left">Items</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(m => (
              <tr key={m.id} className="border-t hover:bg-gray-50">
                <td className="p-3"><Link to={`/inventory/movements/${m.id}`} className="text-blue-600 underline">{m.movementNo}</Link></td>
                <td className="p-3"><MovementTypeBadge type={m.type} /></td>
                <td className="p-3">{m.date}</td>
                <td className="p-3">{(m.fromLocation || "-")} → {(m.toLocation || "-")}</td>
                <td className="p-3">{m.referenceNumber || "-"}</td>
                <td className="p-3">{m.items?.length || 0}</td>
                <td className="p-3 text-center">
                  <Link to={`/inventory/movements/${m.id}/edit`} className="text-blue-600 mr-3">Edit</Link>
                  {m.status !== "Completed" && <Link to={`/inventory/movements/${m.id}/complete`} className="text-green-600">Complete</Link>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
