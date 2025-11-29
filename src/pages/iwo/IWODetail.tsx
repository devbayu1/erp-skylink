import { useParams, Link } from "react-router-dom";
import { getIWO } from "@/services/iwoService";
import IWOStatusBadge from "@/components/iwo/IWOStatusBadge";

export default function IWODetail() {
  const { id } = useParams();
  const iwo = getIWO(id);

  if (!iwo) return <div className="p-6">IWO not found</div>;

  return (
    <div className="p-6 max-w-4xl space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">{iwo.iwoNumber}</h1>
        <Link to={`/iwo/${iwo.id}/edit`} className="px-4 py-2 border rounded">Edit</Link>
      </div>

      <IWOStatusBadge status={iwo.status} />

      <div className="bg-white p-4 rounded shadow">
        <p><b>Customer:</b> {iwo.customerName}</p>
        <p><b>Location:</b> {iwo.serviceLocation}</p>
        <p><b>Technician:</b> {iwo.technicianName}</p>
        <p><b>Schedule:</b> {iwo.scheduledDate}</p>
        <p><b>Remarks:</b> {iwo.remarks}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Items</h3>
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">SKU</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-right">Qty</th>
            </tr>
          </thead>
          <tbody>
            {iwo.items.map((it) => (
              <tr key={it.id} className="border-t">
                <td className="p-2">{it.sku}</td>
                <td className="p-2">{it.description}</td>
                <td className="p-2 text-right">{it.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
