export type IWOStatus = "Draft" | "Pending Approval" | "Approved" | "In Progress" | "Completed" | "Cancelled";

export interface IWOItem {
  id: string | number;
  sku: string;
  description: string;
  qty: number;
  unit?: string;
}

export interface IWORecord {
  id: string;
  iwoNumber: string;
  date: string;

  pksId?: string;
  pksNumber?: string | number;
  customerName?: string;
  serviceLocation?: string;

  technicianName?: string;
  scheduledDate?: string;
  remarks?: string;
  status: IWOStatus;

  items: IWOItem[];

  createdBy?: string;
}
