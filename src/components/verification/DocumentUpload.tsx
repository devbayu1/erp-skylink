// src/components/verification/DocumentUpload.tsx
import React from "react";
import type { VerificationDocument } from "@/types/verification";

export function DocumentUpload({
  documents,
  onUpload,
  onRemove,
}: {
  documents: VerificationDocument[];
  onUpload?: (file: File) => void;
  onRemove?: (docId: string) => void;
}) {
  return (
    <div>
      <div className="mb-3">
        <input
          type="file"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f && onUpload) onUpload(f);
            // reset input
            if (e.target) (e.target as HTMLInputElement).value = "";
          }}
        />
      </div>

      <ul className="space-y-2">
        {documents.map((d) => (
          <li key={d.id} className="flex items-center justify-between p-2 border rounded">
            <div>
              <div className="font-medium">{d.name}</div>
              <div className="text-xs text-gray-500">{d.uploadedAt || "-"}</div>
            </div>

            <div className="flex items-center gap-2">
              {d.url && (
                <a href={d.url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 underline">
                  View
                </a>
              )}
              <button
                onClick={() => onRemove && onRemove(d.id)}
                className="text-sm text-red-600"
                title="Remove"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
