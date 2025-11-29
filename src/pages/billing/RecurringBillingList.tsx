// src/pages/billing/RecurringBillingList.tsx
import { Link, useNavigate } from "react-router-dom";
import { listRecurring, removeRecurring } from "@/services/recurringService";
import { Plus, Trash2, Edit } from "lucide-react";

export default function RecurringBillingList() {
  const navigate = useNavigate();
  const list = listRecurring();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Recurring Billing</h1>
          <p className="text-sm text-gray-600">Manage recurring invoice templates and schedule</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="bg-green-600 text-white px-3 py-2 rounded"
            onClick={() => navigate("/billing/scheduler")}
          >
            Run Scheduler
          </button>

          <Link to="/billing/new" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
            <Plus size={16} /> New Recurring
          </Link>
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Cycle</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-left">Next Run</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {list.map(r => (
              <tr key={r.id} className="border-t">
                <td className="p-3">
                  <Link to={`/billing/${r.id}`} className="text-blue-600 underline">{r.name}</Link>
                </td>
                <td className="p-3">{r.customerName}</td>
                <td className="p-3">{r.cycle}</td>
                <td className="p-3 text-right">Rp {r.amount.toLocaleString("id-ID")}</td>
                <td className="p-3">{r.nextRunDate}</td>
                <td className="p-3">{r.status}</td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Link to={`/billing/${r.id}/edit`} title="Edit"><Edit className="w-4 h-4" /></Link>
                    <button onClick={() => { if(confirm("Delete?")) { removeRecurring(r.id); window.location.reload(); }}} title="Delete">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan={7} className="p-6 text-center text-gray-500">No recurring items</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
