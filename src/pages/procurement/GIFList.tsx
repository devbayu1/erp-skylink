import { Link } from "react-router-dom";
import { listGIF } from "@/services/procurementService";
import RequestStatusBadge from "@/components/procurement/RequestStatusBadge";
import { RequestStatus } from "@/types/procurement";

export default function GIFList() {
  const rows = listGIF();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold">Goods Issued Form (GIF)</h1>
          <p className="text-gray-600 text-sm">Material release for installation/deployment</p>
        </div>

        <Link
          to="/procurement/gif/new"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          New GIF
        </Link>
      </div>

      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">GIF No</th>
              <th className="p-3 text-left">ARF Ref</th>
              <th className="p-3 text-left">Requester</th>
              <th className="p-3 text-left">Issued Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <Link
                    to={`/procurement/gif/${r.id}`}
                    className="text-blue-600 underline"
                  >
                    {r.gifNumber}
                  </Link>
                </td>

                <td className="p-3">{r.arfNumber}</td>
                <td className="p-3">{r.requester}</td>
                <td className="p-3">{r.issuedDate}</td>

                <td className="p-3">
                  <RequestStatusBadge status={r.status as RequestStatus} />
                </td>

                <td className="p-3 text-center">
                  <Link
                    to={`/procurement/gif/${r.id}/edit`}
                    className="text-blue-600 text-sm"
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
