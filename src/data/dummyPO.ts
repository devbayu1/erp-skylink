const dummyPO = [
  {
    id: "PO-001",
    poNumber: "PO-2025-0001",
    poDate: "2025-11-10",

    customerName: "PT Buana Visualnet Sentra",
    poValue: 150000000,

    pksId: "PKS-001",
    pksNumber: "PKS-2025-0001",

    poStart: "2025-12-01",
    poEnd: "2026-12-01",

    poFileUrl: "/files/po001.pdf",

    matchedInvoices: [
      {
        invoiceId: "INV-001",
        invoiceNumber: "INV-2025-001",
        invoiceAmount: 12000000,
      },
    ],

    status: "Partially Matched",
  },
];

export default dummyPO;
