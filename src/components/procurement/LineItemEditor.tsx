// src/components/procurement/LineItemEditor.tsx
import React from "react";
import type { LineItem } from "@/types/procurement";

interface LineItemEditorProps {
  items: LineItem[];
  onChange: (items: LineItem[]) => void;
}

export default function LineItemEditor({ items, onChange }: LineItemEditorProps) {

  const updateItem = <K extends keyof LineItem>(
    idx: number,
    key: K,
    value: LineItem[K]
  ) => {
    const updated = items.map((item, i) =>
      i === idx ? { ...item, [key]: value } : item
    );
    onChange(updated);
  };

  const addItem = () => {
    onChange([
      ...items,
      {
        id: `li-${Date.now()}`,
        description: "",
        qty: 1,
        unit: "unit",
        estimateUnitPrice: 0,
      },
    ]);
  };

  const removeItem = (idx: number) => {
    onChange(items.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-2">
      {items.map((it, idx) => (
        <div key={it.id} className="grid grid-cols-12 gap-2 items-center">
          <input
            className="col-span-5 border p-2 rounded"
            value={it.description}
            onChange={(e) => updateItem(idx, "description", e.target.value)}
            placeholder="Description"
          />

          <input
            type="number"
            className="col-span-2 border p-2 rounded"
            value={it.qty}
            onChange={(e) =>
              updateItem(idx, "qty", Number(e.target.value) || 0)
            }
          />

          <input
            className="col-span-2 border p-2 rounded"
            value={it.unit}
            onChange={(e) => updateItem(idx, "unit", e.target.value)}
            placeholder="Unit"
          />

          <input
            type="number"
            className="col-span-2 border p-2 rounded"
            value={it.estimateUnitPrice ?? 0}
            onChange={(e) =>
              updateItem(idx, "estimateUnitPrice", Number(e.target.value) || 0)
            }
          />

          <button
            type="button"
            className="col-span-1 text-red-600"
            onClick={() => removeItem(idx)}
          >
            Del
          </button>
        </div>
      ))}

      <button
        type="button"
        className="mt-2 px-3 py-1 border rounded"
        onClick={addItem}
      >
        Add item
      </button>
    </div>
  );
}
