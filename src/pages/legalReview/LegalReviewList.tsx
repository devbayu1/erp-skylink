import { Link } from "react-router-dom";
import dummyLegalReview from "@/data/dummyLegalReview";
import { Button } from "@/components/ui/button";

export default function LegalReviewList() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Legal–Technical Review</h1>

      <div className="bg-white shadow rounded-lg overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="p-3">LR Number</th>
              <th className="p-3">IRO Number</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Service</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {dummyLegalReview.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="p-3">{row.id}</td>
                <td className="p-3">{row.iroNumber}</td>
                <td className="p-3">{row.customerName}</td>
                <td className="p-3">{row.serviceType}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      row.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : row.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <Link to={`/legal-review/${row.id}`} className="text-blue-600 underline me-2">
                    View
                  </Link>
                  <Link to={`/legal-review/${row.id}/edit`} className="text-blue-600 underline me-2">
                    Edit
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
