export interface Customer {
    id: string;
    name: string;
    contactPerson: string;
    phone: string;
    email: string;
    address: string;
}

export interface ServiceType {
    id: string;
    name: string;
    type: "fixed" | "mobile";
    basePrice: number;
}

export interface ServicePlan {
    id: string;
    name: string;
    serviceTypeId: string;
    monthlyCost: number;
}

export interface AdditionalService {
    id: string;
    name: string;
    checked: boolean;
    delivery: boolean;
    activation: boolean;
    training: boolean;
    warranty: boolean;
}

export interface OTCItem {
    id: string;
    item: string;
    description: string;
    amount: number;
}

export interface MRCItem {
    id: string;
    item: string;
    description: string;
    monthly: number;
    period: number;
    total: number;
}

export interface QuotationFormData {
    // Step 1
    customer: Customer | null;

    customerId: string | null;
    customerName: string;
    contactPerson: string;
    phone: string;
    email: string;
    address: string;

    serviceType: string;
    servicePlan: string;
    quantity: number;
    servicePeriod: number;
    installationLocation: string;
    latitude: string;
    longitude: string;
    targetRFSDate: string;
    additionalServices: AdditionalService[];

    // Step 2
    otcItems: OTCItem[];
    mrcItems: MRCItem[];

    // Step 3
    paymentTerm: "postpaid" | "prepaid" | "downpayment";
    downPaymentPercent: number;
    validUntil: string;
    slaCommitments: string[];
    contractPeriod: number;
    specialNotes: string;
}

export type PaymentTerm = "postpaid" | "prepaid" | "downpayment";
