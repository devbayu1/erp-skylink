// src/pages/billing/RecurringBillingDetail.tsx
import { useParams, Link } from "react-router-dom";
import { getRecurring, listGeneratedInvoices } from "@/services/recurringService";

export default function RecurringBillingDetail() {
  const { id } = useParams();
  const rec = id ? getRecurring(id) : null;
  const allInv = listGeneratedInvoices().filter(i => i.recurringId === id);

  if (!rec) return <div className="p-6">Recurring item not found</div>;

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{rec.name}</h1>
          <p className="text-gray-600">{rec.customerName}</p>
        </div>

        <div>
          <Link to={`/billing/${rec.id}/edit`} className="px-3 py-2 border rounded">Edit</Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mt-4 space-y-2">
        <p><strong>PKS:</strong> {rec.pksNumber}</p>
        <p><strong>Amount:</strong> Rp {rec.amount.toLocaleString("id-ID")}</p>
        <p><strong>Cycle:</strong> {rec.cycle}</p>
        <p><strong>Start:</strong> {rec.startDate}</p>
        <p><strong>Next Run:</strong> {rec.nextRunDate}</p>
        <p><strong>Status:</strong> {rec.status}</p>
        <p><strong>Notes:</strong> {rec.notes}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Generated Invoices</h3>
        <div className="bg-white rounded shadow p-4">
          {allInv.length === 0 && <p className="text-gray-500">No generated invoices yet</p>}
          {allInv.map(i => (
            <div key={i.id} className="flex justify-between border-b py-2">
              <div>
                <div className="font-medium">{i.invoiceNumber}</div>
                <div className="text-sm text-gray-600">Period: {i.periodStart} → {i.periodEnd}</div>
              </div>
              <div className="text-right">
                <div>Rp {i.total.toLocaleString("id-ID")}</div>
                <div className="text-sm">{i.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
