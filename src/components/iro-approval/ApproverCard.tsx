import React from "react";
import { User } from "lucide-react";
import type { ApprovalStep } from "@/types/iroApproval";

export default function ApproverCard({ step }: { step: ApprovalStep }) {
  return (
    <div className="border p-4 rounded-lg hover:bg-gray-50 transition">
      <div className="flex items-center gap-3">
        <User className="text-gray-600" />
        <div>
          <div className="font-semibold">{step.role}</div>
          <div className="text-sm text-gray-600">{step.approverName || "Unassigned"}</div>
        </div>
      </div>
    </div>
  );
}
