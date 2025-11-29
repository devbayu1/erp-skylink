// src/data/dummyMovements.ts
const dummyMovements = [
  {
    id: "MOV-001",
    movementNo: "MOV-2025-0001",
    type: "IN",
    status: "Completed",
    date: "2025-11-12",
    referenceType: "GRN",
    referenceId: "GRN-001",
    referenceNumber: "GRN-2025-0001",
    fromLocation: "PT Nusantara Tech",
    toLocation: "WH-JKT-R1",
    createdBy: "warehouse.jkt",
    notes: "Received from vendor",
    items: [
      { id: "it-1", sku: "STR-001", description: "Starlink Router V4", qty: 1, unit: "pcs", serialNumbers: ["SN-STR-20251111-001"] },
      { id: "it-2", sku: "UTP-001", description: "UTP Cat6 305m", qty: 2, unit: "roll" }
    ],
  },
  {
    id: "MOV-002",
    movementNo: "MOV-2025-0002",
    type: "OUT",
    status: "Completed",
    date: "2025-11-13",
    referenceType: "GIF",
    referenceId: "GIF-001",
    referenceNumber: "GIF-2025-0001",
    fromLocation: "WH-JKT-R1",
    toLocation: "SITE-STAR-001",
    createdBy: "ops.jkt",
    notes: "Issued for installation",
    items: [
      { id: "it-1", sku: "STR-001", description: "Starlink Router V4", qty: 1, unit: "pcs", serialNumbers: ["SN-STR-20251111-001"] }
    ],
  }
];

export default dummyMovements;
