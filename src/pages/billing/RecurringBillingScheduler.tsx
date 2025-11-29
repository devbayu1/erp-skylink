// src/pages/billing/RecurringBillingScheduler.tsx
import { useState } from "react";
import { generateInvoicesForDate, listGeneratedInvoices, listRecurring } from "@/services/recurringService";

export default function RecurringBillingScheduler() {
  const [runDate, setRunDate] = useState<string>(() => {
    const d = new Date();
    // default to next 1st of next month
    const next = new Date(d.getFullYear(), d.getMonth()+1, 1);
    return next.toISOString().slice(0,10);
  });

  const [created, setCreated] = useState<any[]>([]);
  const [history, setHistory] = useState(() => listGeneratedInvoices().slice().reverse());

  const run = () => {
    const createdInv = generateInvoicesForDate(runDate);
    setCreated(createdInv);
    setHistory(listGeneratedInvoices().slice().reverse());
    alert(`${createdInv.length} invoice(s) generated (mock).`);
  };

  const recurring = listRecurring();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recurring Billing Scheduler</h1>

      <div className="bg-white p-4 rounded shadow space-y-4 mb-6">
        <div>
          <label className="font-medium">Run date (generate for items with nextRunDate ≤ this date)</label>
          <input type="date" className="border p-2 rounded ml-2" value={runDate} onChange={e=>setRunDate(e.target.value)} />
        </div>

        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={run}>Run Scheduler</button>
          <button className="px-4 py-2 border rounded" onClick={() => {
            setCreated([]);
            setHistory(listGeneratedInvoices().slice().reverse());
          }}>Refresh</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Recurring Items</h3>
          {recurring.map(r => (
            <div key={r.id} className="border-b py-2">
              <div className="font-medium">{r.name}</div>
              <div className="text-sm text-gray-600">Next: {r.nextRunDate} • Rp {r.amount.toLocaleString("id-ID")}</div>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Recently Generated Invoices</h3>
          {history.length === 0 && <p className="text-gray-500">No invoices generated yet</p>}
          {history.slice(0,10).map(inv => (
            <div key={inv.id} className="border-b py-2">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">{inv.invoiceNumber}</div>
                  <div className="text-xs text-gray-600">{inv.customerName}</div>
                </div>
                <div className="text-right">
                  <div>Rp {inv.total.toLocaleString("id-ID")}</div>
                  <div className="text-xs text-gray-500">{inv.createdAt.slice(0,10)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {created.length > 0 && (
        <div className="bg-white p-4 rounded shadow mt-6">
          <h3 className="font-semibold mb-2">Invoices Created in this run</h3>
          {created.map(i => (
            <div key={i.id} className="flex justify-between border-b py-2">
              <div>
                <div className="font-medium">{i.invoiceNumber}</div>
                <div className="text-sm text-gray-600">{i.customerName}</div>
              </div>
              <div className="text-right">
                <div>Rp {i.total.toLocaleString("id-ID")}</div>
                <div className="text-xs text-gray-500">{i.id}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
