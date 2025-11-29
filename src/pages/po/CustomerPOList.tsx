import { Link } from "react-router-dom";
import dummyPO from "@/data/dummyPO";
import { Plus } from "lucide-react";

export default function CustomerPOList() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold">Customer Purchase Orders</h1>
          <p className="text-gray-600 text-sm">Manage customer PO and match invoices</p>
        </div>

        <Link
          to="/po/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={16} /> Upload Customer PO
        </Link>
      </div>

      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">PO Number</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">PKS</th>
              <th className="p-3 text-right">PO Value</th>
              <th className="p-3 text-left">Validity</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {dummyPO.map((po) => (
              <tr key={po.id} className="border-t">
                <td className="p-3">{po.poNumber}</td>
                <td className="p-3">{po.customerName}</td>
                <td className="p-3">
                  <Link
                    className="text-blue-600 underline"
                    to={`/orders/pks/${po.pksId}`}
                  >
                    {po.pksNumber}
                  </Link>
                </td>

                <td className="p-3 text-right">
                  Rp {po.poValue.toLocaleString("id-ID")}
                </td>

                <td className="p-3">{po.poStart} → {po.poEnd}</td>

                <td className="p-3">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                    {po.status}
                  </span>
                </td>

                <td className="p-3 text-center">
                  <Link
                    to={`/po/${po.id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View
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
