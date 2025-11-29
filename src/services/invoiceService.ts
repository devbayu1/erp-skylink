// src/services/invoiceService.ts
import { Invoice, InvoiceType, Payment } from "@/types/invoice";
import dummyInvoices from "@/data/dummyInvoices";
import dummyPayments from "@/data/dummyPayments";
import { v4 as uuidv4 } from "uuid";

export function listInvoices(): Invoice[] {
  return dummyInvoices;
}

export function getInvoice(id: string): Invoice | undefined {
  return dummyInvoices.find(i => i.id === id);
}

export function createInvoiceFromPKS(pks: any, type: InvoiceType): Invoice {
  const now = new Date();
  const id = "INV-" + now.getTime();
  const invoiceNumber = `INV-${now.getFullYear()}-${now.getTime()}`;
  const amount = type === "MRC" ? (pks.mrcMonthly || 0) : (pks.otcTotal || pks.grandTotal || 0);

  const inv: Invoice = {
    id,
    invoiceNumber,
    pksId: pks.id,
    fbId: pks.fbId,
    customerName: pks.customerName,
    type,
    amount,
    currency: "IDR",
    invoiceDate: now.toISOString().slice(0,10),
    dueDate: new Date(now.getTime() + 1000*60*60*24*30).toISOString().slice(0,10),
    status: "Pending",
    pdfUrl: undefined,
    notes: `Auto-generated ${type} from PKS ${pks.id}`
  };

  // Mock push to dummyInvoices (in-memory)
  // In real app: call API
  (dummyInvoices as Invoice[]).unshift(inv);
  return inv;
}

export function createInvoiceManual(payload: Partial<Invoice>): Invoice {
  const now = new Date();
  const id = "INV-" + now.getTime();
  const invoiceNumber = `INV-${now.getFullYear()}-${now.getTime()}`;
  const inv: Invoice = {
    id,
    invoiceNumber,
    pksId: payload.pksId,
    fbId: payload.fbId,
    customerName: payload.customerName || "Unknown",
    type: payload.type || "OTC",
    amount: Number(payload.amount || 0),
    currency: payload.currency || "IDR",
    invoiceDate: payload.invoiceDate || now.toISOString().slice(0,10),
    dueDate: payload.dueDate || new Date(now.getTime() + 7*24*60*60*1000).toISOString().slice(0,10),
    status: payload.status || "Draft",
    pdfUrl: payload.pdfUrl,
    notes: payload.notes
  };

  (dummyInvoices as Invoice[]).unshift(inv);
  return inv;
}

export function listPayments(invoiceId: string): Payment[] {
  return (dummyPayments as Payment[]).filter(p => p.invoiceId === invoiceId);
}

export function addPayment(invoiceId: string, payment: Partial<Payment>): Payment {
  const now = new Date();
  const p: Payment = {
    id: "PAY-" + now.getTime(),
    invoiceId,
    amount: Number(payment.amount || 0),
    method: payment.method || "Unknown",
    date: payment.date || now.toISOString().slice(0,10),
    referenceNumber: payment.referenceNumber,
    proofUrl: payment.proofUrl
  };
  (dummyPayments as Payment[]).unshift(p);

  // Update invoice status if fully paid (mock: if amount >= invoice.amount)
  const inv = (dummyInvoices as Invoice[]).find(i => i.id === invoiceId);
  if (inv) {
    const payments = listPayments(invoiceId);
    const paidTotal = payments.reduce((s, x) => s + x.amount, 0);
    if (paidTotal >= inv.amount) inv.status = "Paid";
  }

  return p;
}
