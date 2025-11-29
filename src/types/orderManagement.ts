// src/types/orderManagement.ts

export interface ApprovalRecord {
  id: string;
  approver: string;
  role: string;
  action: "Approved" | "Rejected";
  comments?: string;
  timestamp: string;
}

export interface IRO {
  id: string;
  iroNumber: string;
  iroDate: string;
  
  // References
  siId: string;
  siNumber: string;
  quotationId: string;
  quotationNumber: string;
  
  // Customer
  customerId: string;
  customerName: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  
  // Service
  serviceType: string;
  servicePlan: string;
  quantity: number;
  servicePeriod: number;
  installationLocation: string;
  
  // Budget
  budgetProcurement: number;
  budgetDID: number;
  totalBudget: number;
  budgetSource: string;
  budgetCode: string;
  
  // Payment
  paymentType: "Postpaid" | "Prepaid" | "DP";
  downPaymentPercentage?: number;
  
  // Status
  status: "Draft" | "Submitted" | "Approved" | "Rejected";
  createdBy: string;
  createdAt: string;
  approvalHistory: ApprovalRecord[];
  
  // Relations
  hasFormBerlangganan: boolean;
  formBerlanggananId?: string;
}

export interface FormBerlangganan {
  id: string;
  fbNumber: string;
  fbDate: string;
  
  // Reference
  iroId: string;
  iroNumber: string;
  
  // Customer (from IRO)
  customerId: string;
  customerName: string;
  // ... other customer fields
  
  // Service (from IRO)
  serviceType: string;
  servicePlan: string;
  quantity: number;
  
  // Pricing
  otcTotal: number;
  mrcMonthly: number;
  mrcYearly: number;
  grandTotal: number;
  
  // Contract
  contractPeriod: number;
  startDate: string;
  endDate: string;
  
  // Signatures
  companySignature?: string;
  customerSignature?: string;
  signedDate?: string;
  
  // Status
  status: "Draft" | "Pending Signature" | "Signed" | "Active";
  
  // Relations
  hasPKS: boolean;
  pksId?: string;
}

export interface PKS {
  id: string;
  pksNumber: string;
  pksDate: string;
  
  // Reference
  formBerlanggananId: string;
  fbNumber: string;
  
  // Customer
  customerId: string;
  customerName: string;
  
  // Contract Period
  startDate: string;
  endDate: string;
  autoRenewal: boolean;
  
  // SLA
  uptimeGuarantee: number;
  supportLevel: string;
  responseTime: string;
  
  // Documents
  documentUrl?: string;
  
  // Status
  status: "Draft" | "Active" | "Expired" | "Terminated";
  
  // Relations
  hasKOM: boolean;
  komId?: string;
}

export interface KOM {
  id: string;
  komDate: string;
  komTime: string;
  
  // Reference
  pksId: string;
  pksNumber: string;
  
  // Meeting Details
  location: string;
  locationType: "Office" | "Customer Site" | "Online";
  meetingLink?: string;
  
  // Agenda
  agenda: string;
  
  // Attendees
  companyAttendees: Attendee[];
  customerAttendees: Attendee[];
  
  // Meeting Minutes
  discussionPoints?: string;
  decisions?: string;
  actionItems?: ActionItem[];
  
  // Status
  status: "Scheduled" | "Completed" | "Cancelled";
  
  // Documents
  minutesDocument?: string;
  attachments?: string[];
}

export interface Attendee {
  name: string;
  role: string;
  email: string;
  rsvpStatus: "Confirmed" | "Pending" | "Declined";
}

export interface ActionItem {
  description: string;
  assignee: string;
  dueDate: string;
  status: "Pending" | "In Progress" | "Completed";
}