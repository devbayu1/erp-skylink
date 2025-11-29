import { useParams, useNavigate } from "react-router-dom";
import dummyIRO from "@/data/dummyIRO";
import dummyLegalReview from "@/data/dummyLegalReview";
import ReviewChecklist from "@/components/legalReview/ReviewChecklist";
import DocumentUpload from "@/components/legalReview/DocumentUpload";
import { useState } from "react";

export default function LegalReviewForm() {
  const { iroId } = useParams();
  const navigate = useNavigate();

  const iro = dummyIRO.find((i) => i.id === iroId);
  if (!iro) return <div className="p-6">IRO not found</div>;

  const existing = dummyLegalReview.find((r) => r.iroId === iroId);

  const [checklists, setChecklists] = useState(
    existing?.checklists || {
      legalDocumentMatch: false,
      addressVerified: false,
      serviceEligibility: false,
      deviceAvailability: false,
      slaReviewed: false,
      contractTermReviewed: false,
    }
  );

  const [files, setFiles] = useState(existing?.attachments || []);
  const [notes, setNotes] = useState(existing?.notes || "");

  const handleSubmit = () => {
    console.log("Saved Legal Review:", {
      iroId: iro.id,
      checklists,
      files,
      notes,
      status: "Pending",
    });
    alert("Review saved (mock). Check console.");
    navigate("/legal-review");
  };

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Legal–Technical Review for IRO: {iro.iroNumber}</h1>

      <div className="bg-white p-6 shadow rounded space-y-6">

        <div>
          <h2 className="font-semibold mb-2">Checklist</h2>
          <ReviewChecklist value={checklists} onChange={setChecklists} />
        </div>

        <div>
          <h2 className="font-semibold mb-2">Attachments</h2>
          <DocumentUpload files={files} onUpload={setFiles} />
        </div>

        <div>
          <h2 className="font-semibold mb-2">Notes</h2>
          <textarea
            className="w-full border p-2 rounded"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={() => navigate("/legal-review")} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
            Save Review
          </button>
        </div>
      </div>
    </div>
  );
}
