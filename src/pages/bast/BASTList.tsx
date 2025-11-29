import { Link } from "react-router-dom";
import dummyBAST from "@/data/dummyBAST";
import { Plus, Eye } from "lucide-react";

export default function BASTList() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">BAST — Berita Acara Serah Terima</h1>

        <Link
          to="/bast/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={16} /> Create BAST
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left">BAST Number</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {dummyBAST.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="p-3">{row.bastNumber}</td>
                <td className="p-3">{row.customerName}</td>
                <td className="p-3">{row.serviceType}</td>
                <td className="p-3">{row.bastDate}</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                    {row.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <Link to={`/bast/${row.id}`}>
                    <Eye className="w-4 h-4 text-blue-600" />
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
