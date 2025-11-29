const dummyGRN = [
  {
    id: "GRN-001",
    grnNumber: "GRN-2025-0001",
    createdAt: "2025-11-10",

    povId: "POV-001",
    povNumber: "POV-2025-0001",

    receivedBy: "Warehouse JKT",
    receivedDate: "2025-11-11",
    receiverName: "Technician A",
    receivedFrom: "PT Nusantara Tech",

    items: [
      { id: "li-1", name: "Starlink Router", qty: 1, unit: "pcs", condition: "Good" },
      { id: "li-2", name: "UTP Cat6", qty: 2, unit: "roll", condition: "Good" }
    ],

    attachments: ["delivery-note-001.pdf", "foto-penerimaan-001.jpg"],
    notes: "All items OK",
    status: "Received",
  },
];

export default dummyGRN;