// src/pages/verification/VerificationDetail.tsx
import { useParams, Link, useNavigate } from "react-router-dom";
import dummyVerification from "@/data/dummyVerification";
import { VerificationChecklist } from "@/components/verification/VerificationChecklist";
import { DocumentUpload } from "@/components/verification/DocumentUpload";

export default function VerificationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const record = dummyVerification.find((r) => r.id === id);

  if (!record) return <div className="p-6">Verification not found</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{record.verificationNumber}</h1>
          <p className="text-gray-600">{record.customerName}</p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="px-3 py-2 border rounded">Back</button>
          <Link to={`/verification/${record.id}/edit`} className="px-3 py-2 bg-yellow-500 text-white rounded">Edit</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Customer Details</h3>
            <p><strong>Name:</strong> {record.customerName}</p>
            <p><strong>Contact:</strong> {record.contactPerson} — {record.phone}</p>
            <p><strong>Email:</strong> {record.email}</p>
            <p><strong>Address:</strong> {record.address}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Checklist</h3>
            <VerificationChecklist items={record.checklist} />
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Notes</h3>
            <p>{record.notes}</p>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Status</h3>
            <p className="font-medium">{record.status}</p>
            <p className="text-sm text-gray-500">Created: {record.createdAt}</p>
            {record.verifiedAt && <p className="text-sm text-gray-500">Verified: {record.verifiedAt}</p>}
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Documents</h3>
            <DocumentUpload documents={record.documents} />
          </div>
        </aside>
      </div>
    </div>
  );
}
