import { useParams, useNavigate } from "react-router-dom";
import { verifyDeployment, rejectDeployment, getDeployment } from "@/services/deploymentService";

export default function DeploymentVerify() {
  const { id } = useParams();
  const nav = useNavigate();
  const d = getDeployment(id);

  const reject = () => {
    const reason = prompt("Enter rejection reason:");
    rejectDeployment(id, reason || "Rejected");
    nav("/deployment");
  };

  const approve = () => {
    verifyDeployment(id);
    alert("Deployment verified! PKS set to LIVE.");
    nav("/deployment");
  };

  if (!d) return <>Not found</>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Verify Installation</h1>

      <button onClick={approve} className="px-4 py-2 bg-green-600 text-white rounded">
        Approve & Set PKS LIVE
      </button>

      <button onClick={reject} className="px-4 py-2 bg-red-600 text-white rounded">
        Reject Report
      </button>
    </div>
  );
}
