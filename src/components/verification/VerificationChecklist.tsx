// src/components/verification/VerificationChecklist.tsx
import React from "react";
import type { VerificationChecklistItem } from "@/types/verification";

export function VerificationChecklist({
  items,
  onToggle,
}: {
  items: VerificationChecklistItem[];
  onToggle?: (id: string, checked: boolean) => void;
}) {
  return (
    <div className="space-y-2">
      {items.map((it) => (
        <label key={it.id} className="flex items-start gap-3 p-2 border rounded">
          <input
            type="checkbox"
            checked={Boolean(it.checked)}
            onChange={(e) => onToggle && onToggle(it.id, e.target.checked)}
            className="mt-1"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{it.label}</span>
              {it.required && <span className="text-xs text-red-600 px-1">required</span>}
            </div>
            {it.note && <div className="text-xs text-gray-500 mt-1">{it.note}</div>}
          </div>
        </label>
      ))}
    </div>
  );
}
