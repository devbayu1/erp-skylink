// src/data/dummyIROApproval.ts
import type { IROApprovalRecord } from "@/types/iroApproval";

const dummyIROApproval: IROApprovalRecord[] = [
  {
    id: "APP-001",
    iroId: "1",
    iroNumber: "PRT.HO-JKT-257-OPS-10-2025",
    customerName: "PT Buana Visualnet Sentra",
    serviceType: "Starlink Standard V4 - Priority 2TB",
    requestDate: "2025-11-12",

    currentStep: 1, // Step index
    steps: [
      {
        id: "s1",
        role: "Sales Manager",
        approverName: "Ardiansyah",
        status: "Approved",
        date: "2025-11-12",
        notes: "Sales check OK",
      },
      {
        id: "s2",
        role: "Finance Manager",
        approverName: "Febrina Putri",
        status: "Pending",
      },
      {
        id: "s3",
        role: "Operations Director",
        status: "Pending",
      },
      {
        id: "s4",
        role: "CEO",
        status: "Pending",
      },
    ],

    overallStatus: "In Review",
  },

  {
    id: "APP-002",
    iroId: "2",
    iroNumber: "PRT.BDG-JKT-138-OPS-07-2025",
    customerName: "Freyssinet Total Technology",
    serviceType: "Starlink Maritime V5",
    requestDate: "2025-11-15",

    currentStep: 3,
    steps: [
      {
        id: "s1",
        role: "Sales Manager",
        approverName: "Ardiansyah",
        status: "Approved",
        date: "2025-11-15",
      },
      {
        id: "s2",
        role: "Finance Manager",
        approverName: "Febrina Putri",
        status: "Approved",
        date: "2025-11-15",
      },
      {
        id: "s3",
        role: "Operations Director",
        approverName: "Hilman",
        status: "Rejected",
        date: "2025-11-16",
        notes: "Need clarification on SIM card ownership.",
      },
      {
        id: "s4",
        role: "CEO",
        status: "Skipped",
      },
    ],

    overallStatus: "Rejected",
  },
];

export default dummyIROApproval;
