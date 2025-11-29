import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import dummyFB from "@/data/dummyFormBerlangganan";

const formatCurrency = (n) => `Rp ${n.toLocaleString("id-ID")}`;

export default function FormBerlanggananList() {
  return (
    <div className="p-6 space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Form Berlangganan</h1>
          <p className="text-gray-600 text-sm">Manage all subscription forms</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left">Form No.</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">IRO Number</th>
              <th className="p-3 text-left">Contract Period</th>
              <th className="p-3 text-right">Total Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {dummyFB.map((fb) => (
              <tr key={fb.id} className="border-t">
                <td className="p-3 font-medium">{fb.fbNumber}</td>
                <td className="p-3">{fb.customerName}</td>
                <td className="p-3">{fb.iroNumber}</td>
                <td className="p-3">{fb.contractPeriod} months</td>
                <td className="p-3 text-right">{formatCurrency(fb.grandTotal)}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    fb.status === "Signed"
                      ? "bg-green-100 text-green-700"
                      : fb.status === "Pending Signature"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {fb.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <Link to={`/orders/form-berlangganan/${fb.id}`} className="text-blue-600">
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
