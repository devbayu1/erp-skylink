// src/types/verification.ts
export type VerificationStatus = "Pending" | "In Progress" | "Verified" | "Rejected";

export interface VerificationDocument {
  id: string;
  name: string;
  url?: string;
  uploadedAt?: string;
}

export interface VerificationChecklistItem {
  id: string;
  label: string;
  required: boolean;
  checked?: boolean;
  note?: string;
}

export interface VerificationRecord {
  id: string; // primary id
  verificationNumber: string; // e.g. VER-2025-0001
  createdAt: string;
  iroId?: string; // optional relation
  iroNumber?: string;
  customerId?: string;
  customerName: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;

  // checklist + documents
  checklist: VerificationChecklistItem[];
  documents: VerificationDocument[];

  // metadata
  status: VerificationStatus;
  verifiedBy?: string;
  verifiedAt?: string;
  notes?: string;
}
