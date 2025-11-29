import { Link } from "react-router-dom";
import { listPOV } from "@/services/procurementService";
import RequestStatusBadge from "@/components/procurement/RequestStatusBadge";
import { RequestStatus } from "@/types/procurement";

export default function POVList() {
  const rows = listPOV();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold">Purchase Order Vendor (POV)</h1>
          <p className="text-gray-600 text-sm">Procurement to external vendors</p>
        </div>

        <Link to="/procurement/pov/new" className="px-4 py-2 bg-blue-600 text-white rounded">
          New POV
        </Link>
      </div>

      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">POV No</th>
              <th className="p-3 text-left">Vendor</th>
              <th className="p-3 text-left">ARF Ref</th>
              <th className="p-3 text-right">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <Link to={`/procurement/pov/${p.id}`} className="text-blue-600 underline">
                    {p.povNumber}
                  </Link>
                </td>

                <td className="p-3">{p.vendorName}</td>
                <td className="p-3">{p.arfNumber}</td>
                <td className="p-3 text-right">Rp {p.grandTotal.toLocaleString("id-ID")}</td>

                <td className="p-3"><RequestStatusBadge status={p.status as RequestStatus} /></td>

                <td className="p-3 text-center">
                  <Link to={`/procurement/pov/${p.id}/edit`} className="text-blue-600">
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
