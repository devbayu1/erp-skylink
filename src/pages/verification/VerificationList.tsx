// src/pages/verification/VerificationList.tsx
import { Link } from "react-router-dom";
import { Plus, Eye } from "lucide-react";
import dummyVerification from "@/data/dummyVerification";
import type { VerificationRecord } from "@/types/verification";

const formatDate = (d?: string) => d ? new Date(d).toLocaleDateString("id-ID") : "-";

export default function VerificationList() {
  const list: VerificationRecord[] = dummyVerification;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Customer & Legal Verification</h1>
          <p className="text-gray-600 text-sm">Verify customer documents before subscription</p>
        </div>

        <Link to="/verification/new" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded">
          <Plus size={16} /> New Verification
        </Link>
      </div>

      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Verification No.</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">IRO</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">
                  <Link to={`/verification/${r.id}`} className="text-blue-600 underline">
                    {r.verificationNumber}
                  </Link>
                </td>
                <td className="p-3">{r.customerName}</td>
                <td className="p-3">{r.iroNumber || "-"}</td>
                <td className="p-3">{formatDate(r.createdAt)}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    r.status === "Verified" ? "bg-green-100 text-green-700" :
                    r.status === "In Progress" ? "bg-yellow-100 text-yellow-700" :
                    r.status === "Rejected" ? "bg-red-100 text-red-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>{r.status}</span>
                </td>
                <td className="p-3 text-center">
                  <Link to={`/verification/${r.id}`} className="text-blue-600">
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
