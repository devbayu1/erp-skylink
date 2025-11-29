import React from "react";
import type { ApprovalStep } from "@/types/iroApproval";
import { CheckCircle, XCircle, Circle, ArrowRight } from "lucide-react";

export default function ApprovalTimeline({ steps }: { steps: ApprovalStep[] }) {
  return (
    <div className="space-y-4">
      {steps.map((s, i) => (
        <div key={s.id} className="flex items-start gap-3">
          <div>
            {s.status === "Approved" ? (
              <CheckCircle className="text-green-600" />
            ) : s.status === "Rejected" ? (
              <XCircle className="text-red-600" />
            ) : s.status === "Pending" ? (
              <Circle className="text-gray-500" />
            ) : (
              <ArrowRight className="text-gray-400" />
            )}
          </div>

          <div>
            <div className="font-semibold">{s.role}</div>
            <div className="text-gray-600 text-sm">
              {s.approverName || "-"} — {s.status}
            </div>
            {s.notes && <div className="text-sm text-gray-500 mt-1 italic">"{s.notes}"</div>}
            {s.date && <div className="text-xs text-gray-400 mt-1">{s.date}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
