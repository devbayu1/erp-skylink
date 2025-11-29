export default function DeploymentStatusBadge({ status }) {
  const map = {
    Pending: "bg-gray-200 text-gray-700",
    Submitted: "bg-blue-100 text-blue-700",
    Verified: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Live: "bg-purple-100 text-purple-700"
  };

  return <span className={`px-2 py-1 text-xs rounded ${map[status]}`}>{status}</span>;
}
