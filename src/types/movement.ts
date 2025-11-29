// src/types/movement.ts
export type MovementType = "IN" | "OUT" | "TRANSFER" | "RETURN" | "DISPOSAL";
export type MovementStatus = "Draft" | "Completed" | "Cancelled" | "Pending";

export interface MovementItem {
  id: string | number;
  sku?: string;
  description: string;
  qty: number;
  unit?: string;
  serialNumbers?: string[]; // optional
}

export interface MovementRecord {
  id: string;
  movementNo: string;        // e.g., MOV-2025-0001
  type: MovementType;
  status: MovementStatus;
  date: string;              // ISO date
  referenceType?: "GRN" | "POV" | "GIF" | "IWO" | "ARF" | "ASSET";
  referenceId?: string;
  referenceNumber?: string;
  fromLocation?: string;     // e.g., "WH-JKT-R1"
  toLocation?: string;       // e.g., "WH-JKT-R2" or "SITE-001"
  createdBy?: string;
  notes?: string;
  items: MovementItem[];
}
