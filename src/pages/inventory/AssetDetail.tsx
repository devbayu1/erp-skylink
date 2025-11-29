// src/pages/inventory/AssetDetail.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { getAssetRegistration } from "@/services/assetService";
import AssetStatusBadge from "@/components/inventory/AssetStatusBadge";

export default function AssetDetail() {
  const { id } = useParams();
  const data = id ? getAssetRegistration(id) : undefined;

  if (!data) return <div className="p-6">Asset registration not found</div>;

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{data.assetNumber}</h1>
          <p className="text-sm text-gray-600">Stock In record</p>
        </div>

        <div>
          <Link to={`/inventory/assets/${data.id}/edit`} className="px-3 py-2 border rounded">Edit</Link>
        </div>
      </div>

      <div><AssetStatusBadge status={data.status} /></div>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <div><b>POV / GRN:</b> {data.povNumber || data.grnNumber || "-"}</div>
        <div><b>Received Date:</b> {data.receivedDate}</div>
        <div><b>Received From:</b> {data.receivedFrom}</div>
        <div><b>Receiver:</b> {data.receiverName || "-"}</div>
        <div><b>Created By:</b> {data.createdBy}</div>
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
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">Condition</th>
              <th className="p-2 text-left">Serials / Asset Tag</th>
            </tr>
          </thead>

          <tbody>
            {data.items.map(it => (
              <tr key={it.id} className="border-t">
                <td className="p-2">{it.sku || "-"}</td>
                <td className="p-2">{it.description}</td>
                <td className="p-2 text-right">{it.qty}</td>
                <td className="p-2">{it.unit || "-"}</td>
                <td className="p-2">{it.location || "-"}</td>
                <td className="p-2">{it.condition || "-"}</td>
                <td className="p-2">
                  {it.serialNumbers?.length ? it.serialNumbers.join(", ") : "-"}{it.assetTag ? ` • ${it.assetTag}` : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.notes && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Notes</h3>
          <p>{data.notes}</p>
        </div>
      )}
    </div>
  );
}
