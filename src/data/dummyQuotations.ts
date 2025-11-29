// dummyQuotations.ts
const dummyQuotations = [
  {
    id: "Q-001",
    quotationNo: "PRT-JKT-QUOT-186-COM-4-2025",
    siId: "SI-2025-001",       // relation to SI
    customerName: "PT Buana Visualnet Sentra",
    date: "2025-04-08",
    validUntil: "2025-04-15",
    totalAmount: 48174000,
    status: "approved",       // only 'approved' can be used to create IRO
    serviceType: "Starlink Standard V4 - Priority 2TB",
    servicePlan: "Priority 2TB",
    quantity: 1,
  },
  {
    id: "Q-002",
    quotationNo: "PRT-JKT-QUOT-183-COM-3-2025",
    siId: "SI-2025-002",
    customerName: "Freyssinet Total Technology",
    date: "2025-03-25",
    validUntil: "2025-04-01",
    totalAmount: 21600000,
    status: "sent",
    serviceType: "Starlink Standard V4 - Priority 500GB",
    servicePlan: "Standard 500GB",
    quantity: 1,
  },
];

export default dummyQuotations;
