export interface Customer {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  type: "prospect" | "active" | "inactive";
  npwp: string;
  totalOrders: number;
  status: "new" | "regular" | "vip";
}

export type CustomerType = "all" | "prospect" | "active" | "inactive";
export type CustomerStatus = "all" | "new" | "regular" | "vip";
