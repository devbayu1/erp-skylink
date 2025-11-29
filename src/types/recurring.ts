// src/types/recurring.ts
export type BillingCycle = "monthly" | "quarterly" | "yearly";

export interface RecurringBilling {
  id: string;
  name: string; // e.g. "PKS-2025-0001 - MRC"
  pksId?: string;
  pksNumber?: string;
  customerId?: string;
  customerName: string;
  startDate: string; // ISO date
  endDate?: string; // optional
  cycle: BillingCycle;
  amount: number; // per cycle amount (MRC)
  nextRunDate?: string; // next scheduled date for invoice generation
  status: "Active" | "Paused" | "Stopped";
  notes?: string;
  createdAt: string;
}

export interface GeneratedInvoice {
  id: string;
  invoiceNumber: string;
  recurringId?: string;
  pksId?: string;
  customerId?: string;
  customerName: string;
  periodStart: string;
  periodEnd: string;
  total: number;
  createdAt: string;
  status: "Draft" | "Sent" | "Paid";
}
