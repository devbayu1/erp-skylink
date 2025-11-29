import { Link } from "react-router-dom";
import dummyKOM from "@/data/dummyKOM";
import dummyPKS from "@/data/dummyPKS";
import { Calendar, Eye, Plus } from "lucide-react";

export default function KOMList() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Kick-Off Meeting (KOM)</h1>
          <p className="text-gray-600 text-sm">Manage scheduled customer meetings</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">PKS</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {dummyKOM.map((row) => {
              const pks = dummyPKS.find((p) => p.id === row.pksId);

              return (
                <tr key={row.id} className="border-t">
                  <td className="p-3">{row.komDate} {row.komTime}</td>
                  <td className="p-3">{pks?.customerName}</td>
                  <td className="p-3">
                    <Link
                      to={`/orders/pks/${pks?.id}`}
                      className="text-blue-600 underline"
                    >
                      {row.pksNumber}
                    </Link>
                  </td>
                  <td className="p-3">{row.location}</td>
                  <td className="p-3 text-left">
                    <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <Link to={`/orders/kom/${row.id}`}>
                      <Eye className="w-4 h-4 text-blue-600" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
