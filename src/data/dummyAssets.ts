// src/data/dummyAssets.ts
import type { AssetRegistration } from "@/types/asset";

const dummyAssets: AssetRegistration[] = [
  {
    id: "ASIN-001",
    assetNumber: "ASIN-2025-0001",
    createdAt: "2025-11-12",
    createdBy: "warehouse.jkt",
    povId: "POV-001",
    povNumber: "POV-2025-0001",
    grnId: "GRN-001",
    grnNumber: "GRN-2025-0001",
    receivedDate: "2025-11-11",
    receivedFrom: "PT Nusantara Tech",
    receiverName: "Technician A",
    items: [
      {
        id: "it-1",
        sku: "STR-001",
        description: "Starlink Router V4",
        qty: 1,
        unit: "pcs",
        serialNumbers: ["SN-STR-20251111-001"],
        condition: "New",
        location: "WH-JKT-R1",
        assetTag: "ASSET-0001",
        notes: "Box sealed",
      },
      {
        id: "it-2",
        sku: "UTP-001",
        description: "UTP Cat6 305m",
        qty: 2,
        unit: "roll",
        condition: "New",
        location: "WH-JKT-R2",
        notes: "",
      },
    ],
    totalQty: 3,
    status: "InStock",
    notes: "Received and stored in JKT warehouse",
  },
];

export default dummyAssets;
