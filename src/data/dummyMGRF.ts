// src/data/dummyMGRF.ts
import type { MGRF } from "@/types/procurement";

const dummyMGRF: MGRF[] = [
  {
    id: "MGRF-001",
    mgrfNumber: "MGRF-2025-0001",
    iroId: "1",
    createdBy: "sales.user",
    createdAt: "2025-11-20",
    neededByDate: "2025-11-28",
    purpose: "Installation Starlink - PT Buana",
    items: [
      { id: "li-1", description: "Starlink V4 Unit", qty: 2, unit: "unit", estimateUnitPrice: 12000000 },
      { id: "li-2", description: "Mounting Kit", qty: 2, unit: "set", estimateUnitPrice: 450000 },
    ],
    totalEstimate: 24850000,
    status: "Submitted",
    notes: "Urgent"
  }
];

export default dummyMGRF;
