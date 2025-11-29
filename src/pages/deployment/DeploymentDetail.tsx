import { useParams, Link } from "react-router-dom";
import { getDeployment } from "@/services/deploymentService";
import DeploymentStatusBadge from "@/components/deployment/DeploymentStatusBadge";

export default function DeploymentDetail() {
  const { id } = useParams();
  const d = getDeployment(id);

  if (!d) return <div className="p-6">Not found</div>;

  return (
    <div className="p-6 space-y-6 max-w-4xl">

      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">{d.id}</h1>
        <Link to={`/deployment/${id}/verify`} className="px-4 py-2 rounded border">
          Verify
        </Link>
      </div>

      <DeploymentStatusBadge status={d.status} />

      <div className="bg-white p-4 rounded shadow space-y-2">
        <p><b>Customer:</b> {d.customerName}</p>
        <p><b>Location:</b> {d.serviceLocation}</p>
        <p><b>Technician:</b> {d.technicianName}</p>
        <p><b>Date:</b> {d.installationDate}</p>
        <p><b>Device SN:</b> {d.deviceSerial}</p>
        <p><b>MAC:</b> {d.macAddress}</p>
        <p><b>Notes:</b> {d.notes}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Photos</h3>
        <div className="grid grid-cols-2 gap-4">
          {d.photos.map((p) => (
            <div key={p.id}>
              <img src={p.url} className="rounded" />
              <p className="text-xs mt-1">{p.caption}</p>
            </div>
          ))}
        </div>
      </div>

      {d.speedtest && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Speedtest Result</h3>
          <img src={d.speedtest.imageUrl} className="w-64 rounded" />
          <p className="text-sm mt-2">
            Download: {d.speedtest.download} Mbps | Upload: {d.speedtest.upload} Mbps
          </p>
        </div>
      )}

    </div>
  );
}
