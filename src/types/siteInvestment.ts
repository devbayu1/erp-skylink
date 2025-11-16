export interface SiteInvestmentForm {
  // Project Information
  siNumber: string;
  siDate: string;
  projectName: string;
  projectLocation: string;
  estimatedStartDate: string;
  estimatedCompletionDate: string;

  // Cost Breakdown
  managedServiceItems: ManagedServiceItem[];
  materialItems: MaterialItem[];
  didItems: DIDItem[];

  // Budget Allocation
  budgetSource: string;
  budgetCode: string;
  budgetHolder: string;
  approvalRequired: string[];

  // Notes
  internalNotes: string;
  customerNotes: string;
  attachments: File[];

  // Contingency
  contingencyPercent: number;

  // Metadata
  revisionNumber: number;
  status: "draft" | "pending_approval" | "approved" | "rejected";
}

export interface ManagedServiceItem {
  id: string;
  description: string;
  qty: number;
  unit: string;
  unitPrice: number;
  amount: number;
}

export interface MaterialItem {
  id: string;
  materialName: string;
  specification: string;
  qty: number;
  unit: string;
  unitPrice: number;
  amount: number;
}

export interface DIDItem {
  id: string;
  description: string;
  qty: number;
  unit: string;
  unitPrice: number;
  amount: number;
}

export interface ApprovalStatus {
  role: string;
  status: "approved" | "pending" | "waiting" | "rejected";
  approvedBy?: string;
  approvedDate?: string;
}

export interface ReferenceQuotation {
  quotationNo: string;
  customerName: string;
  service: string;
  quantity: number;
  location: string;
}
