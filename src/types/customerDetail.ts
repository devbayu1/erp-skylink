export interface CustomerDetail {
  id: string;
  companyName: string;
  businessType: string;
  npwp: string;
  nib: string;
  address: string;
  phone: string;
  email: string;
  status: "active" | "inactive" | "prospect";
  customerSince: string;
  totalOrders: number;
  totalRevenue: string;
  outstandingAmount: string;
  lastOrderDate: string;
  paymentStatus: string;
  customerType: string;
  contacts: {
    primary: ContactPerson;
    technical: ContactPerson;
    financial: ContactPerson;
  };
}

export interface ContactPerson {
  name: string;
  position?: string;
  email?: string;
  phone: string;
}

export interface RecentOrder {
  id: string;
  date: string;
  service: string;
  amount: string;
  status: "active" | "completed" | "pending" | "cancelled";
}

export type TabType = "overview" | "documents" | "order-history" | "communications" | "activity-log";
