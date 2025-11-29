// src/pages/procurement/GRNDetail.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { getGRN } from "@/services/procurementService";
import RequestStatusBadge from "@/components/procurement/RequestStatusBadge";
import { RequestStatus } from "@/types/procurement";

export default function GRNDetail() {
  const { id } = useParams();
  const data = id ? getGRN(id) : undefined;

  if (!data) return <div className="p-6">GRN not found</div>;

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{data.grnNumber}</h1>
          <p className="text-sm text-gray-600">Goods Receive Note</p>
        </div>
        <div>
          <Link to={`/procurement/grn/${data.id}/edit`} className="px-3 py-2 border rounded">Edit</Link>
        </div>
      </div>

      <div><RequestStatusBadge status={data.status as RequestStatus} /></div>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <div><b>POV / GIF:</b> {data.povNumber || data.gifNumber || "-"}</div>
        <div><b>Received Date:</b> {data.receivedDate}</div>
        <div><b>Received From:</b> {data.receivedFrom}</div>
        <div><b>Received By:</b> {data.receivedBy} {data.receiverName ? `— ${data.receiverName}` : ""}</div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Received Items</h3>
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-right">Qty</th>
              <th className="p-2 text-left">Unit</th>
              <th className="p-2 text-left">Condition</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((it:any) => (
              <tr key={it.id} className="border-t">
                <td className="p-2">{it.name || it.description}</td>
                <td className="p-2 text-right">{it.qty}</td>
                <td className="p-2">{it.unit || "-"}</td>
                <td className="p-2">{it.condition || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.attachments?.length > 0 && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Attachments</h3>
          <ul className="list-disc ml-6">
            {data.attachments.map((a: string) => <li key={a}>{a}</li>)}
          </ul>
        </div>
      )}

      {data.notes && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Notes</h3>
          <p>{data.notes}</p>
        </div>
      )}
    </div>
  );
}
