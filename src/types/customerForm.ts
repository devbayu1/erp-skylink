export interface CustomerFormData {
  // Company Information
  companyName: string;
  businessType: string;
  npwp: string;
  nib: string;
  companyPhone: string;
  companyEmail: string;
  companyAddress: string;

  // Primary Contact
  primaryContactName: string;
  primaryContactPosition: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
  primaryContactKTP?: File | string;

  // Additional Contacts
  technicalContactName?: string;
  technicalContactPhone?: string;
  technicalContactEmail?: string;
  financialContactName?: string;
  financialContactPhone?: string;
  financialContactEmail?: string;

  // Documents
  aktaPendirian?: File | string;
  aktaPerubahan?: File | string;
  npwpDocument?: File | string;
  nibDocument?: File | string;
  ktpDirekturUtama?: File | string;

  // Business Details
  customerType: "prospect" | "active" | "inactive";
  customerStatus: "new" | "regular" | "vip";
  notes?: string;
}

export interface DocumentItem {
  id: string;
  label: string;
  required: boolean;
  fieldName: keyof CustomerFormData;
  file?: File | string;
}
