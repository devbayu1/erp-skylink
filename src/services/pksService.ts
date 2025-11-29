import dummyPKS from "@/data/dummyPKS";

export type PKSStatus =
  | "Draft"
  | "Pending Verification"
  | "Active"
  | "Live"
  | "Suspended"
  | "Terminated";

export interface PKSRecord {
  id: string;
  pksNumber: string;
  createdDate: string;

  fbId: string;
  fbNumber: string;
  iroId: string;
  iroNumber: string;

  customerName: string;
  serviceType: string;

  contractStart: string;
  contractEnd: string;
  contractPeriod: number;

  otcTotal: number;
  mrcMonthly: number;
  grandTotal: number;

  status: PKSStatus;

  companySignature?: string;
  customerSignature?: string;
  signedDate?: string;
}

const PKS_DB: PKSRecord[] = dummyPKS as PKSRecord[];

/* =============================
   BASIC CRUD SERVICE
============================= */

export function listPKS() {
  return PKS_DB;
}

export function getPKS(id: string) {
  return PKS_DB.find((p) => p.id === id);
}

export function createPKS(payload: Partial<PKSRecord>) {
  const id = `PKS-${Date.now()}`;

  const record: PKSRecord = {
    id,
    pksNumber: payload.pksNumber!,
    createdDate: new Date().toISOString(),

    fbId: payload.fbId!,
    fbNumber: payload.fbNumber!,
    iroId: payload.iroId!,
    iroNumber: payload.iroNumber!,

    customerName: payload.customerName!,
    serviceType: payload.serviceType!,

    contractStart: payload.contractStart!,
    contractEnd: payload.contractEnd!,
    contractPeriod: payload.contractPeriod!,

    otcTotal: payload.otcTotal || 0,
    mrcMonthly: payload.mrcMonthly || 0,
    grandTotal: payload.grandTotal || 0,

    status: "Draft",

    companySignature: payload.companySignature,
    customerSignature: payload.customerSignature,
    signedDate: payload.signedDate,
  };

  PKS_DB.push(record);
  return record;
}

export function updatePKS(id: string, payload: Partial<PKSRecord>) {
  const p = getPKS(id);
  if (!p) return null;

  Object.assign(p, payload);
  return p;
}

/* =============================
   SPECIAL FUNCTION:
   UPDATE STATUS
============================= */

export function updatePKSStatus(id: string, status: PKSStatus) {
  const p = getPKS(id);
  if (!p) return null;

  p.status = status;
  return p;
}
