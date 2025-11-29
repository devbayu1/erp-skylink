// src/types/iroApproval.ts

export type ApprovalStatus = "Pending" | "Approved" | "Rejected" | "Skipped";

export interface ApprovalStep {
  id: string;
  role: string;
  approverName?: string;
  status: ApprovalStatus;
  notes?: string;
  date?: string;
}

export interface IROApprovalRecord {
  id: string;
  iroId: string;
  iroNumber: string;
  customerName: string;
  serviceType: string;
  requestDate: string;

  // Approval flow
  currentStep: number;
  steps: ApprovalStep[];

  // Summary
  overallStatus: "In Review" | "Fully Approved" | "Rejected";
}
