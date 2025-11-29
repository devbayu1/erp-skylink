// src/types/asset.ts
export type AssetCondition = "New" | "Used" | "Damaged";

export interface AssetItem {
  id: string;
  sku?: string;
  description: string;
  qty: number;
  unit?: string;
  serialNumbers?: string[]; // optional list of serials if applicable
  condition?: AssetCondition;
  location?: string; // e.g., "WH-JKT-R1"
  assetTag?: string; // e.g., "ASSET-2025-0001"
  notes?: string;
}

export interface AssetRegistration {
  id: string;
  assetNumber: string;      // e.g., "ASIN-2025-0001"
  createdAt: string;        // ISO date
  createdBy: string;        // username
  povId?: string;           // optional POV link
  povNumber?: string;
  grnId?: string;           // optional GRN link
  grnNumber?: string;
  receivedDate: string;     // ISO date
  receivedFrom: string;     // vendor or internal
  receiverName?: string;    // person receiving
  items: AssetItem[];
  totalQty: number;
  status: "Pending" | "Received" | "InStock" | "Rejected";
  notes?: string;
}
