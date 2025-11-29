// src/pages/inventory/MovementDetail.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { getMovement } from "@/services/movementService";
import MovementTypeBadge from "@/components/inventory/MovementTypeBadge";

export default function MovementDetail() {
  const { id } = useParams();
  const m = id ? getMovement(id) : undefined;

  if (!m) return <div className="p-6">Movement not found</div>;

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">{m.movementNo}</h1>
          <p className="text-sm text-gray-600">Movement Detail</p>
        </div>
        <div>
          <Link to={`/inventory/movements/${m.id}/edit`} className="px-3 py-2 border rounded">Edit</Link>
        </div>
      </div>

      <div><MovementTypeBadge type={m.type} /></div>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <div><b>Type:</b> {m.type}</div>
        <div><b>Status:</b> {m.status}</div>
        <div><b>Date:</b> {m.date}</div>
        <div><b>From:</b> {m.fromLocation || "-"}</div>
        <div><b>To:</b> {m.toLocation || "-"}</div>
        <div><b>Reference:</b> {m.referenceNumber || "-"}</div>
        <div><b>Notes:</b> {m.notes || "-"}</div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Items</h3>
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">SKU</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-right">Qty</th>
              <th className="p-2 text-left">Unit</th>
              <th className="p-2 text-left">Serials</th>
            </tr>
          </thead>
          <tbody>
            {m.items.map(it => (
              <tr key={it.id} className="border-t">
                <td className="p-2">{it.sku || "-"}</td>
                <td className="p-2">{it.description}</td>
                <td className="p-2 text-right">{it.qty}</td>
                <td className="p-2">{it.unit || "-"}</td>
                <td className="p-2">{it.serialNumbers?.length ? it.serialNumbers.join(", ") : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
