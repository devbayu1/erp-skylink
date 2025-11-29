// src/types/invoice.ts
export type InvoiceType = "OTC" | "MRC" | "DP" | "PREPAID" | "POSTPAID";
export type InvoiceStatus = "Pending" | "Paid" | "Overdue" | "Cancelled" | "Draft";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  pksId?: string;
  fbId?: string;
  customerName: string;
  type: InvoiceType;
  amount: number;
  currency?: string;
  periodMonth?: string | null; // for MRC
  invoiceDate: string;
  dueDate: string;
  status: InvoiceStatus;
  pdfUrl?: string;
  notes?: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  method: string;
  date: string;
  referenceNumber?: string;
  proofUrl?: string;
}
