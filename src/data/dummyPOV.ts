const dummyPOV = [
  {
    id: "POV-001",
    povNumber: "POV-2025-0001",
    createdAt: "2025-11-08",

    // Relations
    arfId: "ARF-001",
    arfNumber: "ARF-2025-0001",

    vendorId: "V001",
    vendorName: "PT Nusantara Tech",

    items: [
      { id: 1, name: "Starlink Router", description: "Starlink Router", qty: 1, unit: "pcs", price: 3500000, total: 3500000 },
      { id: 2, name: "UTP Cat6", description: "UTP Cat6", qty: 2, unit: "roll", price: 500000, total: 1000000 },
    ],

    subTotal: 4500000,
    tax: 450000,
    grandTotal: 4950000,

    status: "Pending", // Draft | Pending | Approved | Rejected

    notes: "Urgent procurement for deployment",
  },
];

export default dummyPOV;
