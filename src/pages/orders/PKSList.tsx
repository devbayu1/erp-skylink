import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import dummyPKS from "@/data/dummyPKS";

export const formatCurrency = (value) => {
  const num = Number(value);
  if (isNaN(num)) return "Rp 0";
  return `Rp ${num.toLocaleString("id-ID")}`;
};

export default function PKSList() {
  return (
    <div className="p-6 space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">PKS (Contract)</h1>
          <p className="text-gray-600 text-sm">Manage all contract agreements</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left">PKS Number</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Form Berlangganan</th>
              <th className="p-3 text-left">Contract Period</th>
              <th className="p-3 text-right">Total Value</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {dummyPKS.map((pks) => (
              <tr key={pks.id} className="border-t">
                <td className="p-3 font-medium">{pks.pksNumber}</td>
                <td className="p-3">{pks.customerName}</td>
                <td className="p-3">{pks.fbNumber}</td>
                <td className="p-3">{pks.contractPeriod} months</td>
                <td className="p-3 text-right">{formatCurrency(pks.grandTotal)}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    pks.status === "Signed"
                      ? "bg-green-100 text-green-700"
                      : pks.status === "Pending Signature"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {pks.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <Link to={`/orders/pks/${pks.id}`} className="text-blue-600">
                    <Eye size={18} />
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
