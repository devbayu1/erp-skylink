// src/data/dummyInvoices.ts
import type { Invoice } from "@/types/invoice";

const dummyInvoices: Invoice[] = [
  {
    id: "INV-001",
    invoiceNumber: "INV-2025-0001",
    pksId: "PKS-001",
    fbId: "FB-001",
    customerName: "PT Buana Visualnet",
    type: "OTC",
    amount: 8400000,
    currency: "IDR",
    invoiceDate: "2025-12-01",
    dueDate: "2025-12-10",
    status: "Pending",
    pdfUrl: "/mock/invoices/PRT-JKT-INV-MRC-22-8-2025 Freyssinet Total Technology (Masa Agustus 2025).pdf",
    notes: "Installation fee"
  },
  {
    id: "INV-002",
    invoiceNumber: "INV-2025-0002",
    pksId: "PKS-001",
    fbId: "FB-001",
    customerName: "PT Buana Visualnet",
    type: "MRC",
    amount: 11000000,
    currency: "IDR",
    periodMonth: "2025-12",
    invoiceDate: "2025-12-01",
    dueDate: "2025-12-30",
    status: "Paid",
    pdfUrl: "/mock/invoices/PRT-JKT-INV-MRC-22-8-2025 Freyssinet Total Technology (Masa Agustus 2025).pdf",
    notes: "Monthly recurring charge - Dec 2025"
  }
];

export default dummyInvoices;
