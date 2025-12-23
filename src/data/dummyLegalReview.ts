const dummyLegalReview = [
  {
    id: "LR-001",
    iroId: "1",
    iroNumber: "PRT.HO-JKT-257-OPS-10-2025",
    quotationId: "Q-001", 
    quotationNumber: "PRT-JKT-QUOT-186-COM-4-2025",

    customerName: "PT Buana Visualnet Sentra",
    serviceType: "Starlink Standard V4 - Priority 2TB",

    reviewer: "Legal Team A",
    technicalReviewer: "Technical Team B",

    checklists: {
      legalDocumentMatch: true,
      addressVerified: true,
      serviceEligibility: true,
      deviceAvailability: false,
      slaReviewed: true,
      contractTermReviewed: true,
    },

    notes: "Device not available until next month.",
    attachments: ["sla-doc.pdf", "site-photo.png"],

    status: "Pending", // Pending | Approved | Rejected

    createdAt: "2025-11-25 14:20",
    updatedAt: "2025-11-25 15:00",
  },
];

export default dummyLegalReview;
