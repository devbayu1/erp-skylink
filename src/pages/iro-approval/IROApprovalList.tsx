import { Link } from "react-router-dom";
import dummyIROApproval from "@/data/dummyIROApproval";
import type { IROApprovalRecord } from "@/types/iroApproval";
import { Eye } from "lucide-react";

export default function IROApprovalList() {
  const list: IROApprovalRecord[] = dummyIROApproval;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">IRO Approval Workflow</h1>
      <p className="text-gray-600 text-sm">Track approval progress for each IRO</p>

      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">IRO Number</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {list.map((a) => (
              <tr key={a.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{a.iroNumber}</td>
                <td className="p-3">{a.customerName}</td>
                <td className="p-3">{a.serviceType}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      a.overallStatus === "In Review"
                        ? "bg-yellow-100 text-yellow-700"
                        : a.overallStatus === "Fully Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    } `}
                  >
                    {a.overallStatus}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <Link
                    to={`/iro-approval/${a.id}`}
                    className="text-blue-600 hover:underline"
                  >
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
