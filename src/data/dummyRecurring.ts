// src/data/dummyRecurring.ts
import type { RecurringBilling, GeneratedInvoice } from "@/types/recurring";

const now = new Date();
const iso = (d: Date) => d.toISOString().slice(0,10);

const recurringDB: RecurringBilling[] = [
  {
    id: "R-001",
    name: "PKS-2025-0001 - Starlink Priority MRC",
    pksId: "PKS-001",
    pksNumber: "PKS-2025-0001",
    customerId: "CUST-001",
    customerName: "PT Buana Visualnet Sentra",
    startDate: iso(new Date(now.getFullYear(), now.getMonth()-1, 1)), // started last month
    endDate: iso(new Date(now.getFullYear()+1, now.getMonth(), 0)), // 1 year
    cycle: "monthly",
    amount: 11000000,
    nextRunDate: iso(new Date(now.getFullYear(), now.getMonth()+1, 1)), // next 1st
    status: "Active",
    notes: "Auto invoice for MRC monthly",
    createdAt: new Date().toISOString(),
  },
  {
    id: "R-002",
    name: "PKS-2025-0002 - Starlink OTC Monthly Addon",
    pksId: "PKS-002",
    pksNumber: "PKS-2025-0002",
    customerId: "CUST-002",
    customerName: "Freyssinet Total Technology",
    startDate: iso(new Date(now.getFullYear(), now.getMonth(), 1)),
    endDate: iso(new Date(now.getFullYear(), now.getMonth()+6, 0)),
    cycle: "monthly",
    amount: 5000000,
    nextRunDate: iso(new Date(now.getFullYear(), now.getMonth()+1, 1)),
    status: "Active",
    notes: "Addon monthly",
    createdAt: new Date().toISOString(),
  },
];

const generatedInvoicesDB: GeneratedInvoice[] = [
  // sample previously generated invoice
  {
    id: "INV-GEN-20251101-R001",
    invoiceNumber: "INV-2025-001",
    recurringId: "R-001",
    pksId: "PKS-001",
    customerId: "CUST-001",
    customerName: "PT Buana Visualnet Sentra",
    periodStart: iso(new Date(now.getFullYear(), now.getMonth()-1, 1)),
    periodEnd: iso(new Date(now.getFullYear(), now.getMonth()-1, 31)),
    total: 11000000,
    createdAt: new Date().toISOString(),
    status: "Draft",
  },
];

export { recurringDB, generatedInvoicesDB };
export default recurringDB;
