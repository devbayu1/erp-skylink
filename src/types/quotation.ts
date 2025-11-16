export interface Quotation {
  id: string;
  quotationNo: string;
  customerName: string;
  date: string;
  validUntil: string;
  totalAmount: number;
  status: QuotationStatus;
}

export type QuotationStatus = "draft" | "sent" | "approved" | "rejected" | "expired";

export type QuotationFilterStatus = "all" | QuotationStatus;

export type CustomerTypeFilter = "all" | "prospect" | "existing";

export interface QuotationMetrics {
  totalQuotations: number;
  sentThisMonth: number;
  conversionRate: number;
  totalValue: string;
}
