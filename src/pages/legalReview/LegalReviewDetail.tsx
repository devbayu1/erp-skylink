import { useParams, Link } from "react-router-dom";
import dummyLegalReview from "@/data/dummyLegalReview";
import { Button } from "@/components/ui/button";

export default function LegalReviewDetail() {
  const { id } = useParams();
  const review = dummyLegalReview.find((r) => r.id === id);

  if (!review) return <div className="p-6">Review Not Found</div>;

  const entries = Object.entries(review.checklists);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Legal–Technical Review Detail</h1>

      <div className="bg-white p-6 shadow rounded space-y-4">
        <h2 className="font-medium">Reference</h2>
        <p>IRO Number: {review.iroNumber}</p>
        <p>Customer: {review.customerName}</p>
        <p>Service: {review.serviceType}</p>

        <h2 className="font-medium mt-4">Checklist</h2>
        <ul className="list-disc ml-5 text-sm">
          {entries.map(([key, val]) => (
            <li key={key}>
              {key}: <span className={val ? "text-green-600" : "text-red-600"}>{val ? "Checked" : "Not Checked"}</span>
            </li>
          ))}
        </ul>

        <h2 className="font-medium mt-4">Attachments</h2>
        <ul className="list-disc ml-5 text-sm">
          {review.attachments.map((f) => (
            <li key={f}>📄 {f}</li>
          ))}
        </ul>

        <h2 className="font-medium mt-4">Notes</h2>
        <p className="text-sm text-gray-700">{review.notes || "-"}</p>

        <h2 className="font-medium mt-4">Status</h2>
        <p>{review.status}</p>

        <Link to={`/legal-review/${review.iroId}/edit`} className="text-blue-600 underline mt-4 inline-block me-2">
          Edit Review
        </Link>
        <Link to={`/orders/form-berlangganan/new?legalReviewId=${review.id}`} className="text-blue-600 underline mt-4 inline-block">
          Proceed to FB
        </Link>
      </div>
    </div>
  );
}
