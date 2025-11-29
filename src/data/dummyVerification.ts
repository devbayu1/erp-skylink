// src/data/dummyVerification.ts
import type { VerificationRecord } from "@/types/verification";

const dummyVerification: VerificationRecord[] = [
  {
    id: "1",
    verificationNumber: "VER-2025-0001",
    createdAt: "2025-11-10",
    iroId: "1",
    iroNumber: "PRT.HO-JKT-257-OPS-10-2025",
    customerId: "CUST-001",
    customerName: "PT Buana Visualnet Sentra",
    contactPerson: "Amirullah Kumaini",
    phone: "081234567890",
    email: "amir@buana.co.id",
    address: "Jl. Merpati No. 12 Jakarta",
    checklist: [
      { id: "c1", label: "Akta Pendirian", required: true, checked: true },
      { id: "c2", label: "NPWP Perusahaan", required: true, checked: true },
      { id: "c3", label: "NIB / OSS", required: true, checked: false },
      { id: "c4", label: "KTP Direktur", required: true, checked: true },
      { id: "c5", label: "Surat Kuasa (jika diperlukan)", required: false, checked: false },
    ],
    documents: [
      { id: "d1", name: "akta-pendirian.pdf", url: "/mock/akta-pendirian.pdf", uploadedAt: "2025-11-10" },
      { id: "d2", name: "npwp.pdf", url: "/mock/npwp.pdf", uploadedAt: "2025-11-10" },
    ],
    status: "In Progress",
    verifiedBy: undefined,
    verifiedAt: undefined,
    notes: "NIB masih belum lengkap, follow up ke customer.",
  },

  {
    id: "2",
    verificationNumber: "VER-2025-0002",
    createdAt: "2025-11-12",
    iroId: undefined,
    iroNumber: undefined,
    customerId: "CUST-002",
    customerName: "Freyssinet Total Technology",
    contactPerson: "Paul Hutajulu",
    phone: "082233445566",
    email: "paul@freyssinet.co.id",
    address: "Jl. Teknik No. 8",
    checklist: [
      { id: "c1", label: "Akta Pendirian", required: true, checked: true },
      { id: "c2", label: "NPWP Perusahaan", required: true, checked: true },
      { id: "c3", label: "NIB / OSS", required: true, checked: true },
      { id: "c4", label: "KTP Direktur", required: true, checked: true },
    ],
    documents: [
      { id: "d1", name: "akta.pdf", url: "/mock/akta2.pdf", uploadedAt: "2025-11-12" },
      { id: "d2", name: "nib.pdf", url: "/mock/nib2.pdf", uploadedAt: "2025-11-12" },
    ],
    status: "Verified",
    verifiedBy: "Legal Dept",
    verifiedAt: "2025-11-13",
    notes: "Verified, ready to proceed to Form Berlangganan",
  },
];

export default dummyVerification;
