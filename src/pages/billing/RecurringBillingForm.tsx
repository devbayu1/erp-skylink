// src/pages/billing/RecurringBillingForm.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createRecurring, getRecurring, updateRecurring } from "@/services/recurringService";

export default function RecurringBillingForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const nav = useNavigate();

  const existing = id ? getRecurring(id) : null;

  const [form, setForm] = useState({
    name: existing?.name || "",
    pksId: existing?.pksId || "",
    pksNumber: existing?.pksNumber || "",
    customerId: existing?.customerId || "",
    customerName: existing?.customerName || "",
    startDate: existing?.startDate || new Date().toISOString().slice(0,10),
    endDate: existing?.endDate || "",
    cycle: existing?.cycle || "monthly",
    amount: existing?.amount || 0,
    nextRunDate: existing?.nextRunDate || "",
    status: existing?.status || "Active",
    notes: existing?.notes || "",
  });

  useEffect(() => {
    if (existing && !form.nextRunDate) {
      setForm(f => ({ ...f, nextRunDate: existing.nextRunDate || f.startDate }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = () => {
    if (isEdit && id) {
      updateRecurring(id, form);
      alert("Recurring updated (mock).");
    } else {
      createRecurring(form);
      alert("Recurring created (mock).");
    }
    nav("/billing");
  };

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? "Edit Recurring" : "New Recurring Billing"}</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="font-medium">Name</label>
          <input className="border p-2 w-full rounded mt-1" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Customer Name</label>
            <input className="border p-2 w-full rounded mt-1" value={form.customerName} onChange={e=>setForm({...form, customerName: e.target.value})} />
          </div>
          <div>
            <label className="font-medium">Amount</label>
            <input type="number" className="border p-2 w-full rounded mt-1" value={form.amount} onChange={e=>setForm({...form, amount: Number(e.target.value)})} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="font-medium">Cycle</label>
            <select className="border p-2 w-full rounded mt-1" value={form.cycle} onChange={e=>setForm({...form, cycle: e.target.value as any})}>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div>
            <label className="font-medium">Start Date</label>
            <input type="date" className="border p-2 w-full rounded mt-1" value={form.startDate} onChange={e=>setForm({...form, startDate: e.target.value})} />
          </div>
          <div>
            <label className="font-medium">Next Run Date</label>
            <input type="date" className="border p-2 w-full rounded mt-1" value={form.nextRunDate} onChange={e=>setForm({...form, nextRunDate: e.target.value})} />
          </div>
        </div>

        <div>
          <label className="font-medium">Notes</label>
          <textarea className="border p-2 w-full rounded mt-1" value={form.notes} onChange={e=>setForm({...form, notes: e.target.value})} />
        </div>

        <div className="flex justify-end gap-3">
          <button className="border px-4 py-2 rounded" onClick={()=>nav("/billing")}>Cancel</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={onSubmit}>{isEdit ? "Save" : "Create"}</button>
        </div>
      </div>
    </div>
  );
}
