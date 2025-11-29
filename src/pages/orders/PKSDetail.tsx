import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, FileText, Edit, ChevronRight } from "lucide-react";
import dummyPKS from "@/data/dummyPKS";
import dummyFB from "@/data/dummyFormBerlangganan";

const formatCurrency = (n) => `Rp ${n.toLocaleString("id-ID")}`;

export default function PKSDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const pks = dummyPKS.find((p) => p.id === id);
  const fb = pks ? dummyFB.find((f) => f.id === pks.fbId) : null;

  if (!pks) {
    return <div className="p-6">PKS not found.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-gray-200 rounded-lg flex items-center gap-2">
            <Edit size={16} /> Edit
          </button>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
            <FileText size={16} /> Download PDF
          </button>
        </div>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold">{pks.pksNumber}</h1>
        <span
          className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
            pks.status === "Signed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {pks.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left main */}
        <div className="lg:col-span-2 space-y-6">

          <div className="bg-white p-6 shadow rounded-lg space-y-4">
            <h2 className="font-semibold text-lg">Customer Information</h2>
            <p className="font-medium">{pks.customerName}</p>
          </div>

          <div className="bg-white p-6 shadow rounded-lg space-y-4">
            <h2 className="font-semibold text-lg">Contract Information</h2>

            <p><strong>Period:</strong> {pks.contractPeriod} months</p>
            <p><strong>Start:</strong> {pks.contractStart}</p>
            <p><strong>End:</strong> {pks.contractEnd}</p>
            <p><strong>Signing:</strong> Jakarta, 2025-11-20 08:00</p>
          </div>

          <div className="bg-white p-6 shadow rounded-lg space-y-4">
            <h2 className="font-semibold text-lg">PIC</h2>
            <p><strong>Customer PIC:</strong> -</p>
            <p><strong>Telkom PIC:</strong> -</p>
          </div>

        </div>

        {/* Right */}
        <div className="space-y-6">

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="font-semibold text-lg mb-3">Next Step</h2>

            <Link
              to={`/orders/pks/${pks.id}/kom/new`}
              className="flex items-center justify-between px-4 py-3 border rounded-lg hover:bg-gray-50"
            >
              <span>Create KOM Schedule</span>
              <ChevronRight />
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}
