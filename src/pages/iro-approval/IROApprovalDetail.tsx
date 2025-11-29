import { useParams, Link } from "react-router-dom";
import dummyIROApproval from "@/data/dummyIROApproval";
import ApprovalTimeline from "@/components/iro-approval/ApprovalTimeline";

export default function IROApprovalDetail() {
  const { id } = useParams();
  const data = dummyIROApproval.find((d) => d.id === id);

  if (!data) return <div className="p-6">Approval flow not found</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{data.iroNumber}</h1>
          <p className="text-gray-600">{data.customerName}</p>
          <p className="text-gray-500 text-sm">{data.serviceType}</p>
        </div>

        <Link
          to={`/iro-approval/${data.id}/approve`}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Take Action
        </Link>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-semibold mb-4">Approval Timeline</h2>
        <ApprovalTimeline steps={data.steps} />
      </div>
    </div>
  );
}
