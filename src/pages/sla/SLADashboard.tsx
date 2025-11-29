import dummySLA from "@/data/dummySLA";
import { Link } from "react-router-dom";

export default function SLADashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">SLA Monitoring Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummySLA.map((sla) => (
          <div key={sla.id} className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold">{sla.customerName}</h2>
            <p className="text-gray-600">{sla.serviceType}</p>

            <div className="mt-4 space-y-2 text-sm">
              <p><strong>Month:</strong> {sla.month}</p>
              <p><strong>Uptime:</strong> {sla.uptimePercentage}%</p>
              <p><strong>Downtime:</strong> {sla.downtimeMinutes} minutes</p>
              <p><strong>Incidents:</strong> {sla.incidents}</p>
            </div>

            <Link
              to={`/sla/${sla.id}/logs`}
              className="mt-4 inline-block bg-blue-600 text-white px-3 py-2 rounded"
            >
              View SLA Logs
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
