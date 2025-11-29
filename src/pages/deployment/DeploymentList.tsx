import { Link } from "react-router-dom";
import { listDeployments } from "@/services/deploymentService";
import DeploymentStatusBadge from "@/components/deployment/DeploymentStatusBadge";

export default function DeploymentList() {
  const list = listDeployments();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Installation Reports</h1>

      <div className="bg-white shadow rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Report</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Technician</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {list.map((d) => (
              <tr key={d.id} className="border-t">
                <td className="p-3">
                  <Link className="text-blue-600 underline" to={`/deployment/${d.id}`}>
                    {d.id}
                  </Link>
                </td>
                <td className="p-3">{d.customerName}</td>
                <td className="p-3">{d.technicianName}</td>
                <td className="p-3"><DeploymentStatusBadge status={d.status} /></td>
                <td className="p-3 text-center">
                  <Link to={`/deployment/${d.id}`}>View</Link>
                  {" | "}
                  <Link to={`/deployment/${d.id}/verify`} className="text-green-600">
                    Verify
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
