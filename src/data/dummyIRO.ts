// dummyIRO.ts
const dummyIRO = [
  {
    id: "1",
    iroNumber: "PRT.HO-JKT-257-OPS-10-2025",
    iroDate: "2025-10-15",
    quotationId: "Q-001",               // relation to Quotation
    quotationNumber: "PRT-JKT-QUOT-186-COM-4-2025",
    siId: "SI-2025-001",                // convenience: also store siId (via quotation)
    siNumber: "SI-2025-001",
    customerId: "C-001",
    customerName: "PT Buana Visualnet Sentra",
    serviceType: "Starlink Standard V4 - Priority 2TB",
    servicePlan: "Priority 2TB",
    quantity: 1,
    budgetProcurement: 8400000,
    budgetDID: 11000000,
    totalBudget: 19400000,
    paymentType: "Prepaid",
    status: "Approved",
    createdBy: "Amirullah Kumaini",
    createdAt: "2025-10-15 14:53",
    serviceStartDate: "2025-10-15 14:53",
  },
  {
    id: "2",
    iroNumber: "PRT.HO-JKT-300-OPS-10-2025",
    iroDate: "2025-10-20",
    quotationId: "Q-002",
    quotationNumber: "PRT-JKT-QUOT-183-COM-3-2025",
    siId: "SI-2025-002",
    siNumber: "SI-2025-002",
    customerId: "C-002",
    customerName: "Freyssinet Total Technology",
    serviceType: "Starlink Standard V4 - Priority 500GB",
    servicePlan: "Standard 500GB",
    quantity: 1,
    budgetProcurement: 12000000,
    budgetDID: 3700000,
    totalBudget: 15700000,
    paymentType: "Postpaid",
    status: "Draft",
    createdBy: "Junaedi",
    createdAt: "2025-10-20 09:12",
    serviceStartDate: "2025-10-20 09:12",
  },
];

export default dummyIRO;
