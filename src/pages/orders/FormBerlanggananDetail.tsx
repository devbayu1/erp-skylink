import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Edit, ChevronRight } from "lucide-react";
import dummyFB from "@/data/dummyFormBerlangganan";
import dummyIRO from "@/data/dummyIRO";

const formatCurrency = (n) => `Rp ${n.toLocaleString("id-ID")}`;

export default function FormBerlanggananDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const fb = dummyFB.find((f) => f.id === id);

  if (!fb) {
    return <div className="p-6">Form Berlangganan not found.</div>;
  }

  const iro = dummyIRO.find((i) => i.id === fb.iroId);

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
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

      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-bold">{fb.fbNumber}</h1>
        <span
          className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
            fb.status === "Signed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {fb.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT MAIN */}
        <div className="lg:col-span-2 space-y-6">

          <div className="bg-white p-6 shadow rounded-lg space-y-4">
            <h2 className="font-semibold text-lg">Customer Information</h2>
            <p className="font-medium">{fb.customerName}</p>
          </div>

          <div className="bg-white p-6 shadow rounded-lg space-y-4">
            <h2 className="font-semibold text-lg">Service Information</h2>

            <p><strong>Service Type:</strong> {fb.serviceType}</p>
            <p><strong>Service Plan:</strong> {fb.servicePlan}</p>
            <p><strong>Quantity:</strong> {fb.quantity}</p>
          </div>

          <div className="bg-white p-6 shadow rounded-lg space-y-4">
            <h2 className="font-semibold text-lg">Contract</h2>
            <p><strong>Period:</strong> {fb.contractPeriod} months</p>
            <p><strong>Start Date:</strong> {fb.startDate}</p>
            <p><strong>End Date:</strong> {fb.endDate}</p>
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="font-semibold text-lg mb-3">Next Step</h2>

            <Link
              to={`/orders/form-berlangganan/${fb.id}/pks/new`}
              className="flex items-center justify-between px-4 py-3 border rounded-lg hover:bg-gray-50"
            >
              <span>Create PKS</span>
              <ChevronRight />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
