import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createIWO, updateIWO, getIWO, approveIWO } from "@/services/iwoService";
import { IWORecord } from "@/types/iwo";
import { PKSRecord } from "@/services/pksService";
import IWOStatusBadge from "@/components/iwo/IWOStatusBadge";

export default function IWOForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const existing = isEdit ? getIWO(id) : null;

  const navigate = useNavigate();

  const [pksNumber, setPksNumber] = useState(existing?.pksNumber || "");
  const [customerName, setCustomerName] = useState(existing?.customerName || "");
  const [serviceLocation, setServiceLocation] = useState(existing?.serviceLocation || "");
  const [technicianName, setTechnicianName] = useState(existing?.technicianName || "");
  const [scheduledDate, setScheduledDate] = useState(existing?.scheduledDate || "");
  const [remarks, setRemarks] = useState(existing?.remarks || "");

  const [items, setItems] = useState(existing?.items || [
    { id: "i1", sku: "", description: "", qty: 1 }
  ]);

  const addItem = () => {
    setItems([...items, { id: `i${Date.now()}`, sku: "", description: "", qty: 1 }]);
  };

  const save = () => {
    const payload = {
      pksNumber,
      customerName,
      serviceLocation,
      technicianName,
      scheduledDate,
      remarks,
      items,
      status: IWOStatusBadge["Pending Approval"],
    };

    if (isEdit) {
      updateIWO(id, payload);
    } else {
      createIWO(payload);
    }

    alert("Saved (mock)");
    navigate("/iwo");
  };

  const approve = () => {
    approveIWO(id);
    alert("IWO Approved + Movement OUT auto-generated.");
    navigate("/iwo");
  };

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? "Edit IWO" : "New IWO"}</h1>

      <div className="bg-white rounded shadow p-6 space-y-4">

        <div>
          <label className="block text-sm">PKS Number</label>
          <input value={pksNumber} onChange={e=>setPksNumber(e.target.value)} className="border p-2 rounded w-full" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Customer</label>
            <input value={customerName} onChange={e=>setCustomerName(e.target.value)} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block text-sm">Service Location</label>
            <input value={serviceLocation} onChange={e=>setServiceLocation(e.target.value)} className="border p-2 rounded w-full" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Technician Name</label>
            <input value={technicianName} onChange={e=>setTechnicianName(e.target.value)} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block text-sm">Scheduled Date</label>
            <input type="date" value={scheduledDate} onChange={e=>setScheduledDate(e.target.value)} className="border p-2 rounded w-full" />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Items to Install</label>
          <div className="space-y-3">
            {items.map((it, idx) => (
              <div key={it.id} className="border p-3 rounded">
                <input placeholder="SKU" className="border p-2 rounded w-full mb-2" value={it.sku} onChange={e=>{ const copy=[...items]; copy[idx].sku=e.target.value; setItems(copy); }} />
                <input placeholder="Description" className="border p-2 rounded w-full mb-2" value={it.description} onChange={e=>{ const copy=[...items]; copy[idx].description=e.target.value; setItems(copy); }} />
                <input type="number" placeholder="Quantity" className="border p-2 rounded w-full" value={it.qty} onChange={e=>{ const copy=[...items]; copy[idx].qty=Number(e.target.value); setItems(copy); }} />
              </div>
            ))}
          </div>

          <button onClick={addItem} className="mt-2 px-3 py-2 bg-gray-100 rounded">Add Item</button>
        </div>

        <div>
          <label className="block text-sm">Remarks</label>
          <textarea className="border p-2 rounded w-full" value={remarks} onChange={e=>setRemarks(e.target.value)} />
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={() => navigate("/iwo")} className="px-4 py-2 border rounded">Cancel</button>
          {isEdit && <button onClick={approve} className="px-4 py-2 bg-green-600 text-white rounded">Approve + Movement OUT</button>}
          <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
