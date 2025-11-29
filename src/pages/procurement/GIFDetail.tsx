import { useParams, Link } from "react-router-dom";
import { getGIF } from "@/services/procurementService";
import RequestStatusBadge from "@/components/procurement/RequestStatusBadge";
import { RequestStatus } from "@/types/procurement";

export default function GIFDetail() {
  const { id } = useParams();
  const data = id ? getGIF(id) : undefined;

  if (!data) return <div className="p-6">GIF not found</div>;

  return (
    <div className="p-6 max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{data.gifNumber}</h1>
          <p className="text-gray-600 text-sm">Goods Issued Form</p>
        </div>

        <Link to={`/procurement/gif/${data.id}/edit`} className="px-3 py-2 border rounded">
          Edit
        </Link>
      </div>

      {/* Status */}
      <RequestStatusBadge status={data.status as RequestStatus} />

      {/* Summary */}
      <div className="bg-white rounded shadow p-4 space-y-2">
        <div><b>ARF Ref:</b> {data.arfNumber}</div>
        <div><b>Requester:</b> {data.requester} ({data.department})</div>
        <div><b>Issued By:</b> {data.issuedBy}</div>
        <div><b>Issued Date:</b> {data.issuedDate}</div>
      </div>

      {/* Items */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold text-lg mb-2">Issued Items</h3>

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-right">Qty</th>
              <th className="p-2 text-left">Unit</th>
            </tr>
          </thead>

          <tbody>
            {data.items?.map((i) => (
              <tr key={i.id} className="border-t">
                <td className="p-2">{i.name}</td>
                <td className="p-2 text-right">{i.qty}</td>
                <td className="p-2">{i.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes */}
      {data.notes && (
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold">Notes</h3>
          <p>{data.notes}</p>
        </div>
      )}
    </div>
  );
}
