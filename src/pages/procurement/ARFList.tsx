import { Link } from "react-router-dom";
import { listARF } from "@/services/procurementService";
import RequestStatusBadge from "@/components/procurement/RequestStatusBadge";
import { RequestStatus } from "@/types/procurement";

export default function ARFList() {
  const rows = listARF();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Advance Request Form (ARF)</h1>
          <p className="text-sm text-gray-600">Cash advance for procurement or project operations</p>
        </div>

        <Link to="/procurement/arf/new" className="px-4 py-2 bg-blue-600 text-white rounded">
          New ARF
        </Link>
      </div>

      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ARF No</th>
              <th className="p-3 text-left">PRF Ref</th>
              <th className="p-3 text-left">Requester</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <Link to={`/procurement/arf/${r.id}`} className="text-blue-600 underline">
                    {r.arfNumber}
                  </Link>
                </td>

                <td className="p-3">{r.prfNumber || "-"}</td>
                <td className="p-3">{r.requester}</td>
                <td className="p-3">
                  Rp {r.amountRequested.toLocaleString("id-ID")}
                </td>

                <td className="p-3">
                  <RequestStatusBadge status={r.status as RequestStatus} />
                </td>

                <td className="p-3 text-center">
                  <Link to={`/procurement/arf/${r.id}/edit`} className="text-blue-600 text-sm">
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
