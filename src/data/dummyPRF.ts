// src/data/dummyPRF.ts
import type { PRF } from "@/types/procurement";

const dummyPRF: PRF[] = [
  {
    id: "PRF-001",
    prfNumber: "PRF-2025-0001",
    mgrfId: "MGRF-001",
    createdBy: "procurement.user",
    createdAt: "2025-11-21",
    vendorPreferred: "PT VendorTek",
    items: [
      { id: "li-1", description: "Starlink V4 Unit", qty: 2, unit: "unit", estimateUnitPrice: 11800000 },
      { id: "li-2", description: "Mounting Kit", qty: 2, unit: "set", estimateUnitPrice: 430000 },
    ],
    totalEstimate: 24460000,
    status: "Submitted",
    approvalNotes: ""
  }
];

export default dummyPRF;
