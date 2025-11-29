import { Link, useParams } from "react-router-dom";
import dummySLALogs from "@/data/dummySLALogs";
import dummySLA from "@/data/dummySLA";
import { Plus, Eye } from "lucide-react";

export default function SLALogList() {
  const { id } = useParams();
  const sla = dummySLA.find((s) => s.id === id);

  const logs = dummySLALogs.filter((log) => log.slaId === id);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">
        SLA Logs — {sla?.customerName} ({sla?.month})
      </h1>

      <div className="flex justify-end my-4">
        <Link
          to={`/sla/${id}/logs/new`}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={16} /> Add Log
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Severity</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Detail</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t">
                <td className="p-3">{log.date}</td>
                <td className="p-3">{log.durationMinutes} min</td>
                <td className="p-3">{log.severity}</td>
                <td className="p-3">{log.status}</td>
                <td className="p-3 text-center">
                  <Link to={`/sla/log/${log.id}`}>
                    <Eye className="w-5 h-5 text-blue-600" />
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
