import { Link, useParams } from "react-router-dom";
import { getARF } from "@/services/procurementService";
import RequestStatusBadge from "@/components/procurement/RequestStatusBadge";
import { RequestStatus } from "@/types/procurement";

export default function ARFDetail() {
  const { id } = useParams();
  const data = id ? getARF(id) : undefined;

  if (!data) return <div className="p-6">ARF not found</div>;

  return (
    <div className="p-6 max-w-3xl space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{data.arfNumber}</h1>
          <p className="text-sm text-gray-600">
            Requester: {data.requester} — {data.department}
          </p>
        </div>

        <Link
          to={`/procurement/arf/${data.id}/edit`}
          className="px-3 py-2 border rounded"
        >
          Edit
        </Link>
      </div>

      {/* Status */}
      <div>
        <RequestStatusBadge status={data.status as RequestStatus} />
      </div>

      {/* Details */}
      <div className="bg-white p-4 rounded shadow space-y-2">
        <div><b>PRF Ref:</b> {data.prfNumber || "-"}</div>
        <div><b>Purpose:</b> {data.purpose}</div>
        <div><b>Amount:</b> Rp {data.amountRequested.toLocaleString("id-ID")}</div>
      </div>

      {/* Notes */}
      {data.approvalNotes && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Approval Notes</h3>
          <p>{data.approvalNotes}</p>
        </div>
      )}

      {/* Button: GIF */}
      {data.status === "Approved" && (
        <div>
          <button className="px-4 py-2 bg-green-600 text-white rounded">
            Create Goods Issued Form (GIF)
          </button>
        </div>
      )}
    </div>
  );
}
