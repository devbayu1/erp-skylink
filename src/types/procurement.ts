// src/types/procurement.ts
export type RequestStatus = "Draft" | "Submitted" | "Approved" | "Rejected" | "Issued" | "Completed";

export interface LineItem {
  id: string | number;
  description: string;
  qty: number;
  unit: string | number;
  estimateUnitPrice?: number;
}

export interface MGRF {
  id: string;
  mgrfNumber: string;
  iroId?: string;
  createdBy: string;
  createdAt: string;
  neededByDate?: string;
  purpose: string;
  items: LineItem[];
  totalEstimate?: number;
  status: RequestStatus;
  notes?: string;
}

export interface PRF {
  id: string;
  prfNumber: string;
  mgrfId?: string;
  createdBy: string;
  createdAt: string;
  vendorPreferred?: string;
  items: LineItem[];
  totalEstimate?: number;
  status: RequestStatus;
  approvalNotes?: string;
}

export interface ARF {
  id: string;
  arfNumber: string;
  prfId?: string;
  createdBy: string;
  createdAt: string;
  amountRequested: number;
  purpose: string;
  status: RequestStatus;
  disbursementAccount?: string;
  notes?: string;
}

export interface GIF {
  id: string;
  gifNumber: string;
  prfId?: string;
  issuedBy: string;
  issuedAt: string;
  items: LineItem[];
  receiverName?: string;
  receiverSignUrl?: string;
  status: RequestStatus;
  notes?: string;
}

export interface GRN {
  id: string;
  grnNumber: string;
  createdAt: string;

  // Relation
  povId?: string;      // optional link to POV (if procurement from vendor)
  povNumber?: string;
  gifId?: string;      // optional link to GIF (if from internal stock)
  gifNumber?: string;

  receivedBy: string;  // warehouse staff
  receivedDate: string; // yyyy-mm-dd
  receiverName?: string; // person who received goods at site (if delivered)
  receivedFrom: string; // vendor or warehouse

  items: {
    id: string | number;
    name: string;
    qty: number;
    unit?: string;
    condition?: string; // Good / Damaged
  }[];

  attachments?: string[]; // delivery note, foto
  notes?: string;
  status: "Pending" | "Received" | "Inspecting" | "Completed" | "Rejected";
}