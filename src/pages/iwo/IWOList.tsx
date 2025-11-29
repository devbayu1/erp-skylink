import { Link } from "react-router-dom";
import { listIWO } from "@/services/iwoService";
import IWOStatusBadge from "@/components/iwo/IWOStatusBadge";
import { Plus } from "lucide-react";

export default function IWOList() {
  const list = listIWO();

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Installation Work Orders (IWO)</h1>
        <Link to="/iwo/new" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus size={16} /> New IWO
        </Link>
      </div>

      <div className="bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">IWO</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Technician</th>
              <th className="p-3 text-left">Schedule</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {list.map((i) => (
              <tr key={i.id} className="border-t">
                <td className="p-3">
                  <Link className="text-blue-600 underline" to={`/iwo/${i.id}`}>{i.iwoNumber}</Link>
                </td>
                <td className="p-3">{i.customerName}</td>
                <td className="p-3">{i.technicianName}</td>
                <td className="p-3">{i.scheduledDate}</td>
                <td className="p-3"><IWOStatusBadge status={i.status} /></td>
                <td className="p-3 text-center">
                  <Link to={`/iwo/${i.id}`} className="text-blue-600">View</Link> |{" "}
                  <Link to={`/iwo/${i.id}/edit`} className="text-green-600">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
