// src/pages/verification/VerificationForm.tsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dummyVerification from "@/data/dummyVerification";
import type { VerificationRecord, VerificationChecklistItem, VerificationDocument } from "@/types/verification";
import { VerificationChecklist } from "@/components/verification/VerificationChecklist";
import { DocumentUpload } from "@/components/verification/DocumentUpload";
import { v4 as uuidv4 } from "uuid";

const today = () => new Date().toISOString().slice(0, 10);

export default function VerificationForm() {
  const { id } = useParams(); // optional - edit existing
  const navigate = useNavigate();

  const existing: VerificationRecord | undefined = id ? dummyVerification.find((d) => d.id === id) : undefined;

  const [record, setRecord] = useState<VerificationRecord>(() => {
    if (existing) return existing;
    const base: VerificationRecord = {
      id: Date.now().toString(),
      verificationNumber: `VER-${Date.now()}`,
      createdAt: today(),
      iroId: undefined,
      iroNumber: undefined,
      customerId: undefined,
      customerName: "",
      contactPerson: "",
      phone: "",
      email: "",
      address: "",
      checklist: [
        { id: "c1", label: "Akta Pendirian", required: true, checked: false },
        { id: "c2", label: "NPWP Perusahaan", required: true, checked: false },
        { id: "c3", label: "NIB / OSS", required: true, checked: false },
        { id: "c4", label: "KTP Direktur", required: true, checked: false },
        { id: "c5", label: "Surat Kuasa (jika diperlukan)", required: false, checked: false },
      ],
      documents: [],
      status: "Pending",
      notes: "",
    };
    return base;
  });

  function handleToggleChecklist(itemId: string, checked: boolean) {
    setRecord((prev) => ({
      ...prev,
      checklist: prev.checklist.map((c) => (c.id === itemId ? { ...c, checked } : c)),
    }));
  }

  function handleUpload(file: File) {
    const doc: VerificationDocument = {
      id: uuidv4(),
      name: file.name,
      url: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString().slice(0, 10),
    };
    setRecord((prev) => ({ ...prev, documents: [...prev.documents, doc] }));
  }

  function handleRemove(docId: string) {
    setRecord((prev) => ({ ...prev, documents: prev.documents.filter((d) => d.id !== docId) }));
  }

  function handleSave(asStatus?: typeof record.status) {
    // validate required checklist
    const missing = record.checklist.filter((c) => c.required && !c.checked);
    if (asStatus === "Verified" && missing.length > 0) {
      alert("Cannot mark as Verified. Some required documents are missing.");
      return;
    }

    // mock save: just log
    console.log("Saved verification (mock):", { ...record, status: asStatus || record.status });
    alert("Saved (mock). Check console.");

    // navigate to detail
    navigate(`/verification/${record.id}`);
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{existing ? "Edit Verification" : "New Verification"}</h1>
          <p className="text-gray-600 text-sm">Customer document verification</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow space-y-6">
        {/* Customer Basic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Customer Name</label>
            <input value={record.customerName} onChange={(e)=>setRecord(prev=>({...prev, customerName: e.target.value}))} className="border p-2 rounded w-full mt-1" />
          </div>

          <div>
            <label className="font-medium">Contact Person</label>
            <input value={record.contactPerson} onChange={(e)=>setRecord(prev=>({...prev, contactPerson: e.target.value}))} className="border p-2 rounded w-full mt-1" />
          </div>

          <div>
            <label className="font-medium">Phone</label>
            <input value={record.phone} onChange={(e)=>setRecord(prev=>({...prev, phone: e.target.value}))} className="border p-2 rounded w-full mt-1" />
          </div>

          <div>
            <label className="font-medium">Email</label>
            <input value={record.email} onChange={(e)=>setRecord(prev=>({...prev, email: e.target.value}))} className="border p-2 rounded w-full mt-1" />
          </div>

          <div className="md:col-span-2">
            <label className="font-medium">Address</label>
            <input value={record.address} onChange={(e)=>setRecord(prev=>({...prev, address: e.target.value}))} className="border p-2 rounded w-full mt-1" />
          </div>
        </div>

        {/* Checklist + Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Checklist</h3>
            <VerificationChecklist items={record.checklist} onToggle={handleToggleChecklist} />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Documents</h3>
            <DocumentUpload documents={record.documents} onUpload={handleUpload} onRemove={handleRemove} />
          </div>
        </div>

        <div>
          <label className="font-medium">Notes</label>
          <textarea value={record.notes} onChange={(e)=>setRecord(prev=>({...prev, notes: e.target.value}))} className="border p-2 rounded w-full mt-1" rows={4} />
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={()=>handleSave()} className="px-4 py-2 border rounded">Save Draft</button>
          <button onClick={()=>handleSave("In Progress")} className="px-4 py-2 bg-yellow-500 rounded text-white">Submit</button>
          <button onClick={()=>handleSave("Verified")} className="px-4 py-2 bg-green-600 rounded text-white">Mark as Verified</button>
        </div>
      </div>
    </div>
  );
}
