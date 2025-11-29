// src/data/dummyPayments.ts
import type { Payment } from "@/types/invoice";

const dummyPayments: Payment[] = [
  {
    id: "PAY-001",
    invoiceId: "INV-002",
    amount: 11000000,
    method: "Bank Transfer",
    date: "2025-12-05",
    referenceNumber: "TRX728192",
    proofUrl: "/mock/payments/pay-001.jpg"
  }
];

export default dummyPayments;
