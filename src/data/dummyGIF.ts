const dummyGIF = [
  {
    id: "GIF-001",
    gifNumber: "GIF-2025-0001",
    createdAt: "2025-11-05",

    // Relation
    arfId: "ARF-001",
    arfNumber: "ARF-2025-0001",

    requester: "Dedi Setiawan",
    department: "Operations",

    issuedBy: "Gudang JKT",
    issuedDate: "2025-11-06",

    items: [
      { id: 1, name: "Starlink Router", description: "Starlink Router", qty: 1, unit: "pcs" },
      { id: 2, name: "50m UTP Cable", description: "50m UTP Cable", qty: 1, unit: "roll" },
    ],

    attachments: ["serah-terima-001.jpg"],

    notes: "Barang diambil langsung oleh requester",
    status: "Issued", // Draft | Issued | Cancelled
  },
];

export default dummyGIF;
