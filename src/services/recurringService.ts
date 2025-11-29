// src/services/recurringService.ts
import { recurringDB, generatedInvoicesDB } from "@/data/dummyRecurring";
import type { RecurringBilling, GeneratedInvoice } from "@/types/recurring";

/**
 * In-memory "service" for recurring billing.
 * In real app, swap with API calls.
 */

export function listRecurring(): RecurringBilling[] {
  return recurringDB;
}

export function getRecurring(id: string) {
  return recurringDB.find(r => r.id === id) || null;
}

export function createRecurring(payload: Partial<RecurringBilling>) {
  const id = `R-${Date.now()}`;
  const record: RecurringBilling = {
    id,
    name: payload.name || `Recurring ${id}`,
    pksId: payload.pksId,
    pksNumber: payload.pksNumber,
    customerId: payload.customerId,
    customerName: payload.customerName || "Unknown",
    startDate: payload.startDate || new Date().toISOString().slice(0,10),
    endDate: payload.endDate,
    cycle: payload.cycle || "monthly",
    amount: payload.amount || 0,
    nextRunDate: payload.nextRunDate || payload.startDate || new Date().toISOString().slice(0,10),
    status: payload.status || "Active",
    notes: payload.notes,
    createdAt: new Date().toISOString(),
  };
  recurringDB.push(record);
  return record;
}

export function updateRecurring(id: string, payload: Partial<RecurringBilling>) {
  const rec = getRecurring(id);
  if (!rec) return null;
  Object.assign(rec, payload);
  return rec;
}

export function removeRecurring(id: string) {
  const idx = recurringDB.findIndex(r => r.id === id);
  if (idx === -1) return false;
  recurringDB.splice(idx,1);
  return true;
}

/** Generate invoices for all recurring items with nextRunDate <= dateToRun (inclusive)
 * returns list of generated invoices
 */
export function generateInvoicesForDate(dateToRunISO: string): GeneratedInvoice[] {
  const runDate = new Date(dateToRunISO);
  const created: GeneratedInvoice[] = [];

  recurringDB.forEach(rec => {
    if (rec.status !== "Active") return;

    if (!rec.nextRunDate) return;
    const next = new Date(rec.nextRunDate);

    // if nextRunDate is same or before runDate, generate
    if (next.getFullYear() < runDate.getFullYear()
      || (next.getFullYear() === runDate.getFullYear() && next.getMonth() <= runDate.getMonth())
    ) {
      // compute period start & end based on cycle - for monthly, previous month
      let periodStart: Date;
      let periodEnd: Date;

      if (rec.cycle === "monthly") {
        periodStart = new Date(next.getFullYear(), next.getMonth()-1, 1);
        periodEnd = new Date(next.getFullYear(), next.getMonth(), 0); // last day prev month
      } else if (rec.cycle === "quarterly") {
        const q = Math.floor(next.getMonth()/3);
        periodStart = new Date(next.getFullYear(), q*3-3, 1);
        periodEnd = new Date(next.getFullYear(), q*3, 0);
      } else { // yearly
        periodStart = new Date(next.getFullYear()-1, next.getMonth(), next.getDate());
        periodEnd = new Date(next.getFullYear(), next.getMonth(), next.getDate()-1);
      }

      const invoiceId = `INV-GEN-${next.getFullYear()}${String(next.getMonth()+1).padStart(2,"0")}-${rec.id}`;
      const invoiceNumber = `INV-${(Math.random()*900000|0)+100000}`; // quick mock

      const inv: GeneratedInvoice = {
        id: invoiceId,
        invoiceNumber,
        recurringId: rec.id,
        pksId: rec.pksId,
        customerId: rec.customerId,
        customerName: rec.customerName,
        periodStart: periodStart.toISOString().slice(0,10),
        periodEnd: periodEnd.toISOString().slice(0,10),
        total: rec.amount,
        createdAt: new Date().toISOString(),
        status: "Draft",
      };

      generatedInvoicesDB.push(inv);
      created.push(inv);

      // update nextRunDate forward
      if (rec.cycle === "monthly") {
        const nextNext = new Date(next.getFullYear(), next.getMonth()+1, 1);
        rec.nextRunDate = nextNext.toISOString().slice(0,10);
      } else if (rec.cycle === "quarterly") {
        const nextNext = new Date(next.getFullYear(), next.getMonth()+3, 1);
        rec.nextRunDate = nextNext.toISOString().slice(0,10);
      } else {
        const nextNext = new Date(next.getFullYear()+1, next.getMonth(), 1);
        rec.nextRunDate = nextNext.toISOString().slice(0,10);
      }
    }
  });

  return created;
}

export function listGeneratedInvoices(): GeneratedInvoice[] {
  return generatedInvoicesDB;
}

export function getGeneratedInvoice(id: string) {
  return generatedInvoicesDB.find(i => i.id === id) || null;
}
