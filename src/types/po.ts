export interface CustomerPO {
  id: string;
  poNumber: string;
  poDate: string;
  customerName: string;
  pksId: string;
  pksNumber: string;
  poValue: number;
  poStart: string;
  poEnd: string;

  poFileUrl?: string;

  matchedInvoices: {
    invoiceId: string;
    invoiceNumber: string;
    invoiceAmount: number;
  }[];

  status: "Pending" | "Partially Matched" | "Fully Matched" | "Expired";
}
