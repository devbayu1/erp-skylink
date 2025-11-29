// src/pages/inventory/AssetForm.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createAssetRegistration, getAssetRegistration, updateAssetRegistration } from "@/services/assetService";
import { listPOV } from "@/services/procurementService"; // optional link to POV
import type { AssetItem } from "@/types/asset";

function emptyItem(): AssetItem {
  return {
    id: `item-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    sku: "",
    description: "",
    qty: 1,
    unit: "pcs",
    serialNumbers: [],
    condition: "New",
    location: "",
    assetTag: "",
    notes: "",
  };
}

export default function AssetForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const existing = isEdit ? getAssetRegistration(id as string) : undefined;

  const [povId, setPovId] = useState(existing?.povId || "");
  const [povNumber, setPovNumber] = useState(existing?.povNumber || "");
  const [grnId, setGrnId] = useState(existing?.grnId || "");
  const [grnNumber, setGrnNumber] = useState(existing?.grnNumber || "");
  const [receivedDate, setReceivedDate] = useState(existing?.receivedDate || new Date().toISOString().slice(0,10));
  const [receivedFrom, setReceivedFrom] = useState(existing?.receivedFrom || "");
  const [receiverName, setReceiverName] = useState(existing?.receiverName || "");
  const [items, setItems] = useState<AssetItem[]>(existing?.items || [emptyItem()]);
  const [status, setStatus] = useState(existing?.status || "Pending");
  const [notes, setNotes] = useState(existing?.notes || "");
  const [createdBy] = useState(existing?.createdBy || "warehouse.user");

  const povRows = listPOV();

  useEffect(() => {
    if (povId) {
      const p = povRows.find(p => p.id === povId);
      setPovNumber(p?.povNumber || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [povId]);

  const addItem = () => setItems(prev => [...prev, emptyItem()]);
  const removeItem = (idx:number) => setItems(prev => prev.filter((_,i)=>i!==idx));
  const updateItem = (idx:number, patch: Partial<AssetItem>) => setItems(prev => prev.map((it,i)=> i===idx ? {...it, ...patch} : it));

  const totalQty = items.reduce((s, it) => s + (it.qty || 0), 0);

  const handleSave = () => {
    // basic validation
    if (!receivedFrom) { alert("Please provide Received From"); return; }
    if (items.length === 0) { alert("Please add at least one item"); return; }

    const payload = {
      povId: povId || undefined,
      povNumber: povNumber || undefined,
      grnId: grnId || undefined,
      grnNumber: grnNumber || undefined,
      receivedDate,
      receivedFrom,
      receiverName,
      items,
      totalQty,
      status,
      notes,
      createdBy,
    };

    if (isEdit && id) {
      updateAssetRegistration(id, payload);
      alert("Asset registration updated (mock)");
    } else {
      createAssetRegistration(payload);
      alert("Asset registration created (mock)");
    }

    navigate("/inventory/assets");
  };

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? "Edit Asset Registration" : "New Asset Registration"}</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block text-sm">POV Reference (optional)</label>
          <select value={povId} onChange={(e)=>setPovId(e.target.value)} className="border p-2 rounded w-full">
            <option value="">-- choose POV --</option>
            {povRows.map(p => <option key={p.id} value={p.id}>{p.povNumber} — {p.vendorName}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">Received Date</label>
            <input type="date" value={receivedDate} onChange={(e)=>setReceivedDate(e.target.value)} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block text-sm">Received From</label>
            <input value={receivedFrom} onChange={(e)=>setReceivedFrom(e.target.value)} className="border p-2 rounded w-full" />
          </div>
        </div>

        <div>
          <label className="block text-sm">Receiver Name (optional)</label>
          <input value={receiverName} onChange={(e)=>setReceiverName(e.target.value)} className="border p-2 rounded w-full" />
        </div>

        <div>
          <label className="block text-sm mb-2">Items</label>
          <div className="space-y-3">
            {items.map((it, idx) => (
              <div key={it.id} className="border rounded p-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input className="border p-2 rounded" placeholder="SKU" value={it.sku || ""} onChange={(e)=>updateItem(idx,{sku:e.target.value})} />
                  <input className="border p-2 rounded col-span-2" placeholder="Description" value={it.description} onChange={(e)=>updateItem(idx,{description:e.target.value})} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
                  <input type="number" className="border p-2 rounded" value={it.qty} onChange={(e)=>updateItem(idx,{qty: Number(e.target.value)})} />
                  <input className="border p-2 rounded" placeholder="Unit" value={it.unit || ""} onChange={(e)=>updateItem(idx,{unit:e.target.value})} />
                  <input className="border p-2 rounded" placeholder="Location (e.g. WH-JKT-R1)" value={it.location || ""} onChange={(e)=>updateItem(idx,{location:e.target.value})} />
                  <select className="border p-2 rounded" value={it.condition || "New"} onChange={(e)=>updateItem(idx,{condition: e.target.value as any})}>
                    <option>New</option>
                    <option>Used</option>
                    <option>Damaged</option>
                  </select>
                </div>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input className="border p-2 rounded" placeholder="Asset Tag (optional)" value={it.assetTag || ""} onChange={(e)=>updateItem(idx,{assetTag:e.target.value})} />
                  <input className="border p-2 rounded" placeholder="Serial numbers (comma separated)" value={(it.serialNumbers || []).join(",")} onChange={(e)=>updateItem(idx,{serialNumbers: e.target.value ? e.target.value.split(",").map(s=>s.trim()) : []})} />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <input className="border p-2 rounded w-full" placeholder="Notes" value={it.notes || ""} onChange={(e)=>updateItem(idx,{notes:e.target.value})} />
                  <button className="ml-3 px-3 py-1 text-sm text-red-600" onClick={()=>removeItem(idx)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3">
            <button onClick={addItem} className="px-3 py-2 bg-gray-100 rounded">Add Item</button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm">Total Items: <b>{items.length}</b> — Total Qty: <b>{totalQty}</b></div>

          <div className="flex items-center gap-3">
            <select value={status} onChange={(e)=>setStatus(e.target.value as typeof status)} className="border p-2 rounded">
              <option>Pending</option>
              <option>Received</option>
              <option>InStock</option>
              <option>Rejected</option>
            </select>

            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
            <button onClick={() => navigate("/inventory/assets")} className="px-4 py-2 border rounded">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
