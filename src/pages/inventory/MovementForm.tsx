// src/pages/inventory/MovementForm.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createMovement, getMovement, updateMovement, completeMovement } from "@/services/movementService";
import type { MovementItem, MovementRecord, MovementStatus, MovementType } from "@/types/movement";

function emptyItem() {
  return { id: `mi-${Date.now()}-${Math.floor(Math.random() * 1000)}`, description: "", qty: 1, unit: "pcs" } as MovementItem;
}

export default function MovementForm() {
  const { id, action } = useParams() as any; // action optionally 'complete'
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const existing = isEdit ? getMovement(id as string) : undefined;

  const [type, setType] = useState(existing?.type || "IN");
  const [date, setDate] = useState(existing?.date || new Date().toISOString().slice(0, 10));
  const [fromLocation, setFromLocation] = useState(existing?.fromLocation || "");
  const [toLocation, setToLocation] = useState(existing?.toLocation || "");
  const [referenceType, setReferenceType] = useState<MovementRecord["referenceType"]>(existing?.referenceType);
  const [referenceId] = useState(existing?.referenceId || "");
  const [referenceNumber, setReferenceNumber] = useState(existing?.referenceNumber || "");
  const [items, setItems] = useState<MovementItem[]>(existing?.items || [emptyItem()]);
  const [notes, setNotes] = useState(existing?.notes || "");
  const [status, setStatus] = useState(existing?.status || "Draft");

  // const assetRegs = listAssetRegistrations();

  useEffect(() => {
    // if user visits /complete route, auto-complete
    if (action === "complete" && id) {
      const updated = completeMovement(id);
      if (updated) {
        alert("Movement marked as Completed (mock).");
        navigate("/inventory/movements");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, id]);

  const addItem = () => setItems((prev) => [...prev, emptyItem()]);
  const removeItem = (i: number) => setItems((prev) => prev.filter((_, idx) => idx !== i));
  const updateItem = (i: number, patch: Partial<MovementItem>) => setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));

  const handleSave = () => {
    if (!toLocation && type !== "DISPOSAL") {
      alert("Please set destination location");
      return;
    }
    if (items.length === 0) {
      alert("Add at least one item");
      return;
    }

    const payload = {
      type,
      status,
      date,
      fromLocation,
      toLocation,
      referenceType,
      referenceId,
      referenceNumber,
      items,
      notes,
    };

    if (isEdit && id) {
      updateMovement(id, payload);
      alert("Movement updated (mock)");
    } else {
      createMovement(payload);
      alert("Movement created (mock)");
    }

    navigate("/inventory/movements");
  };

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? `Edit Movement ${existing?.movementNo}` : "New Asset Movement"}</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value as MovementType)} className="border p-2 rounded w-full">
              <option value="IN">IN</option>
              <option value="OUT">OUT</option>
              <option value="TRANSFER">TRANSFER</option>
              <option value="RETURN">RETURN</option>
              <option value="DISPOSAL">DISPOSAL</option>
            </select>
          </div>
          <div>
            <label className="block text-sm">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block text-sm">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as MovementStatus)} className="border p-2 rounded w-full">
              <option>Draft</option>
              <option>Pending</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">From (location / source)</label>
            <input value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block text-sm">To (location / destination)</label>
            <input value={toLocation} onChange={(e) => setToLocation(e.target.value)} className="border p-2 rounded w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">Reference Type</label>
            <select
              value={referenceType || ""}
              onChange={(e) => setReferenceType(e.target.value as MovementRecord["referenceType"])}
              className="border p-2 rounded w-full"
            >
              <option value="">-- none --</option>
              <option value="GRN">GRN</option>
              <option value="POV">POV</option>
              <option value="GIF">GIF</option>
              <option value="IWO">IWO</option>
            </select>
          </div>
          <div>
            <label className="block text-sm">Reference Number / ID</label>
            <input
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="e.g. GRN-2025-0001"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2">Items</label>
          <div className="space-y-3">
            {items.map((it, idx) => (
              <div key={it.id} className="border rounded p-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    placeholder="SKU"
                    className="border p-2 rounded"
                    value={it.sku || ""}
                    onChange={(e) => updateItem(idx, { sku: e.target.value })}
                  />
                  <input
                    placeholder="Description"
                    className="border p-2 rounded col-span-2"
                    value={it.description}
                    onChange={(e) => updateItem(idx, { description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
                  <input
                    type="number"
                    className="border p-2 rounded"
                    value={it.qty}
                    onChange={(e) => updateItem(idx, { qty: Number(e.target.value) })}
                  />
                  <input
                    placeholder="Unit"
                    className="border p-2 rounded"
                    value={it.unit || ""}
                    onChange={(e) => updateItem(idx, { unit: e.target.value })}
                  />
                  <input
                    placeholder="Serials (comma)"
                    className="border p-2 rounded"
                    value={(it.serialNumbers || []).join(",")}
                    onChange={(e) => updateItem(idx, { serialNumbers: e.target.value ? e.target.value.split(",").map((s) => s.trim()) : [] })}
                  />
                  <button className="text-red-600" onClick={() => removeItem(idx)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3">
            <button onClick={addItem} className="px-3 py-2 bg-gray-100 rounded">
              Add Item
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm">Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="border p-2 rounded w-full" />
        </div>

        <div className="flex justify-end gap-3 items-center">
          <button onClick={() => navigate("/inventory/movements")} className="px-4 py-2 border rounded">
            Cancel
          </button>
          {isEdit && (
            <button
              onClick={() => {
                if (id) {
                  completeMovement(id);
                  alert("Marked Completed (mock)");
                  navigate("/inventory/movements");
                }
              }}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Complete
            </button>
          )}
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
