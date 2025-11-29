import { useParams } from "react-router-dom";
import dummySLALogs from "@/data/dummySLALogs";

export default function SLALogDetail() {
  const { id } = useParams();
  const log = dummySLALogs.find((l) => l.id === id);

  if (!log) return <div className="p-6 text-red-500">Log not found.</div>;

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">SLA Log Detail</h1>

      <div className="bg-white shadow rounded p-6 space-y-2">
        <p><strong>Date:</strong> {log.date}</p>
        <p><strong>Duration:</strong> {log.durationMinutes} minutes</p>
        <p><strong>Severity:</strong> {log.severity}</p>
        <p><strong>Status:</strong> {log.status}</p>
        <p><strong>Resolved By:</strong> {log.resolvedBy}</p>
        <p><strong>Description:</strong> {log.description}</p>
      </div>
    </div>
  );
}
