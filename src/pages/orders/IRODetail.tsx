import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Edit, ChevronRight } from "lucide-react";
import dummyIRO from "@/data/dummyIRO";
import dummyQuotations from "@/data/dummyQuotations";
import dummySI from "@/data/dummySI";

const formatCurrency = (n) => `Rp ${n.toLocaleString("id-ID")}`;

export default function IRODetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const iro = dummyIRO.find((r) => r.id === id);

  if (!iro) {
    return <div className="p-6">IRO not found.</div>;
  }

  const quotation = dummyQuotations.find((q) => q.id === iro.quotationId);
  const si = dummySI.find((s) => s.id === iro.siId);

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
          <Link
            to={`/orders/iro/${iro.id}/edit`}
            className="px-4 py-2 bg-gray-200 rounded-lg flex items-center gap-2"
          >
            <Edit size={16} /> Edit
          </Link>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
            <FileText size={16} /> Download PDF
          </button>
        </div>
      </div>

      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-bold">{iro.iroNumber}</h1>
        <span
          className={`
            inline-block mt-2 px-3 py-1 text-xs rounded-full
            ${
              iro.status === "Approved"
                ? "bg-green-100 text-green-700"
                : iro.status === "Draft"
                ? "bg-gray-100 text-gray-700"
                : "bg-blue-100 text-blue-700"
            }
          `}
        >
          {iro.status}
        </span>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE (MAIN DETAIL) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Reference Information */}
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <h2 className="font-semibold text-lg mb-2">Reference Information</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Quotation Number</p>
                {quotation ? (
                  <Link
                    to={`/quotations/${quotation.id}`}
                    className="text-blue-600 underline"
                  >
                    {quotation.quotationNo}
                  </Link>
                ) : (
                  <p>-</p>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-500">SI Number</p>
                {si ? (
                  <Link
                    to={`/sales/si/${si.id}`}
                    className="text-blue-600 underline"
                  >
                    {si.siNumber}
                  </Link>
                ) : (
                  <p>-</p>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{iro.iroDate}</p>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <h2 className="font-semibold text-lg">Service Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Service Type</p>
                <p className="font-medium">{iro.serviceType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Service Plan</p>
                <p className="font-medium">{iro.servicePlan}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Quantity</p>
                <p className="font-medium">{iro.quantity}</p>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <h2 className="font-semibold text-lg">Budget Allocation</h2>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Budget Procurement</p>
                <p className="font-medium">{formatCurrency(iro.budgetProcurement)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Budget DID</p>
                <p className="font-medium">{formatCurrency(iro.budgetDID)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Budget</p>
                <p className="font-bold text-blue-700">{formatCurrency(iro.totalBudget)}</p>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="font-semibold text-lg mb-2">Payment Terms</h2>
            <p className="font-medium">{iro.paymentType}</p>
          </div>
        </div>

        {/* RIGHT SIDE (CUSTOMER & NEXT STEP) */}
        <div className="space-y-6">

          {/* Customer Info */}
          <div className="bg-white shadow rounded-lg p-6 space-y-2">
            <h2 className="font-semibold text-lg mb-2">Customer</h2>
            <p className="font-medium">{iro.customerName}</p>

            {quotation && (
              <>
                <p className="text-sm text-gray-500 mt-3">Contact Person</p>
                <p className="font-medium">{"-"}</p>

                <p className="text-sm text-gray-500 mt-3">Email</p>
                <p className="font-medium">{"-"}</p>
              </>
            )}
          </div>

          {/* NEXT STEP */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="font-semibold text-lg mb-3">Next Step</h2>

            <Link
              to={`/orders/iro/${iro.id}/form-berlangganan/new`}
              className="flex items-center justify-between px-4 py-3 border rounded-lg hover:bg-gray-50"
            >
              <span>Create Form Berlangganan</span>
              <ChevronRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
