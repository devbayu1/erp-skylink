import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dummyIRO from "@/data/dummyIRO";
import dummyQuotations from "@/data/dummyQuotations";
import dummySI from "@/data/dummySI";

const formatCurrency = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

export default function IROForm() {
  const { id } = useParams(); // if editing existing
  const navigate = useNavigate();

  const isEdit = Boolean(id);
  const existing = isEdit ? dummyIRO.find((r) => r.id === id) : null;

  // form state
  const [quotationId, setQuotationId] = useState(existing?.quotationId || "");
  const [quotation, setQuotation] = useState(() => existing ? dummyQuotations.find(q => q.id === existing.quotationId) : null);
  const [si, setSi] = useState(() => existing ? dummySI.find(s => s.id === existing.siId) : null);

  const [fields, setFields] = useState({
    iroNumber: existing?.iroNumber || "",
    iroDate: existing?.iroDate || new Date().toISOString().slice(0,10),
    customerName: existing?.customerName || "",
    siNumber: existing?.siNumber || "",
    serviceType: existing?.serviceType || "",
    servicePlan: existing?.servicePlan || "",
    quantity: existing?.quantity || 1,
    budgetProcurement: existing?.budgetProcurement || 0,
    budgetDID: existing?.budgetDID || 0,
    totalBudget: existing?.totalBudget || 0,
    paymentType: existing?.paymentType || "Postpaid",
    status: existing?.status || "Draft",
  });

  // available quotations (only approved)
  const availableQuotations = dummyQuotations.filter(q => q.status === "approved");

  useEffect(() => {
    // when quotationId changes, auto-fill related fields
    if (!quotationId) return;
    const q = dummyQuotations.find(x => x.id === quotationId);
    setQuotation(q || null);

    if (q) {
      const s = dummySI.find(x => x.id === q.siId) || null;
      setSi(s);

      setFields(prev => ({
        ...prev,
        quotationNumber: q.quotationNo,
        customerName: q.customerName,
        siNumber: s?.siNumber || "",
        serviceType: q.serviceType,
        servicePlan: q.servicePlan,
        quantity: q.quantity || 1,
        budgetProcurement: s?.materialCost || prev.budgetProcurement,
        budgetDID: s?.didCost || prev.budgetDID,
        totalBudget: (s?.materialCost || prev.budgetProcurement) + (s?.didCost || prev.budgetDID),
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotationId]);

  // recalc total when budgets changed
  useEffect(() => {
    setFields(prev => ({ ...prev, totalBudget: Number(prev.budgetProcurement || 0) + Number(prev.budgetDID || 0) }));
  }, [fields.budgetProcurement, fields.budgetDID]);

  const handleSubmit = () => {
    // validation: must have an approved quotation selected
    if (!quotation) {
      alert("Please select an approved quotation before creating IRO.");
      return;
    }
    if (quotation.status !== "approved") {
      alert("Selected quotation is not approved.");
      return;
    }

    // for demo: log the new object
    const payload = {
      id: isEdit ? existing.id : Date.now().toString(),
      iroNumber: fields.iroNumber || `IRO-${Date.now()}`,
      iroDate: fields.iroDate,
      quotationId: quotation.id,
      quotationNumber: quotation.quotationNo,
      siId: si?.id,
      siNumber: si?.siNumber,
      customerName: fields.customerName,
      serviceType: fields.serviceType,
      servicePlan: fields.servicePlan,
      quantity: fields.quantity,
      budgetProcurement: Number(fields.budgetProcurement),
      budgetDID: Number(fields.budgetDID),
      totalBudget: Number(fields.totalBudget),
      paymentType: fields.paymentType,
      status: fields.status,
      createdBy: "current.user",
      createdAt: new Date().toISOString(),
    };

    console.log("IRO payload:", payload);
    alert("IRO saved (mock). Check console for payload.");
    navigate("/orders");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? "Edit IRO" : "Create IRO"}</h1>

      <div className="bg-white p-6 shadow rounded-lg space-y-6 max-w-3xl">
        {/* Quotation selector */}
        <div>
          <label className="block font-medium mb-1">Select Approved Quotation</label>
          <select
            value={quotationId}
            onChange={(e) => setQuotationId(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- choose quotation --</option>
            {availableQuotations.map((q) => (
              <option key={q.id} value={q.id}>
                {q.quotationNo} — {q.customerName} — {q.serviceType}
              </option>
            ))}
          </select>
          {!quotationId && <p className="text-xs text-gray-500 mt-1">You must pick an approved quotation to populate the form.</p>}
        </div>

        {/* Auto-filled Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Customer</label>
            <input value={fields.customerName} readOnly className="border p-2 w-full rounded mt-1 bg-gray-50" />
          </div>

          <div>
            <label className="font-medium">SI Number</label>
            <input value={fields.siNumber} readOnly className="border p-2 w-full rounded mt-1 bg-gray-50" />
          </div>

          <div>
            <label className="font-medium">Service Type</label>
            <input value={fields.serviceType} readOnly className="border p-2 w-full rounded mt-1 bg-gray-50" />
          </div>

          <div>
            <label className="font-medium">Service Plan</label>
            <input value={fields.servicePlan} readOnly className="border p-2 w-full rounded mt-1 bg-gray-50" />
          </div>
        </div>

        {/* Budget Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="font-medium">Budget Procurement</label>
            <input
              type="number"
              value={fields.budgetProcurement}
              onChange={(e) => setFields(prev => ({ ...prev, budgetProcurement: Number(e.target.value) }))}
              className="border p-2 w-full rounded mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Budget DID</label>
            <input
              type="number"
              value={fields.budgetDID}
              onChange={(e) => setFields(prev => ({ ...prev, budgetDID: Number(e.target.value) }))}
              className="border p-2 w-full rounded mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Total Budget</label>
            <input readOnly value={formatCurrency(fields.totalBudget)} className="border p-2 w-full rounded mt-1 bg-gray-50" />
          </div>
        </div>

        {/* Payment Type */}
        <div>
          <label className="font-medium">Payment Type</label>
          <select value={fields.paymentType} onChange={(e) => setFields(prev => ({ ...prev, paymentType: e.target.value }))} className="w-full border p-2 rounded mt-1">
            <option value="Postpaid">Postpaid</option>
            <option value="Prepaid">Prepaid</option>
            <option value="DP">Down Payment</option>
          </select>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <button onClick={() => navigate("/orders")} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
            {isEdit ? "Save Changes" : "Create IRO"}
          </button>
        </div>
      </div>
    </div>
  );
}
