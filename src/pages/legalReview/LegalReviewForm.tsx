import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Save, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Import Dummy Data
import dummyQuotations from "@/data/dummyQuotations";
import dummyLegalReview from "@/data/dummyLegalReview";

// Import Components
import ReviewChecklist from "@/components/legalReview/ReviewChecklist";
import DocumentUpload from "@/components/legalReview/DocumentUpload";

export default function LegalReviewForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Mode Edit
  const [searchParams] = useSearchParams();
  const quotationId = searchParams.get("quotationId"); // Mode New

  // State Data
  const [isEditMode, setIsEditMode] = useState(false);
  const [quotationData, setQuotationData] = useState<any>(null);
  const [reviewData, setReviewData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true); // State loading eksplisit
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form States
  const [checklists, setChecklists] = useState({
    legalDocumentMatch: false,
    addressVerified: false,
    serviceEligibility: false,
    deviceAvailability: false,
    slaReviewed: false,
    contractTermReviewed: false,
  });
  const [files, setFiles] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  // === LOAD DATA LOGIC ===
  useEffect(() => {
    setIsLoading(true);
    setErrorMsg(null);

    // DEBUGGING: Cek ID yang masuk
    console.log("URL Params -> ID:", id, "| QuotationID:", quotationId);

    if (id) {
      // --- MODE EDIT ---
      const existing = dummyLegalReview.find((r) => String(r.id) === String(id));
      if (existing) {
        setIsEditMode(true);
        setReviewData(existing);
        setChecklists(existing.checklists);
        setFiles(existing.attachments);
        setNotes(existing.notes || "");

        // Cari linked quotation
        const linkedQuotation = dummyQuotations.find((q) => q.quotationNo === existing.quotationNumber);
        setQuotationData(linkedQuotation || dummyQuotations[0]); // Fallback ke data pertama jika tidak ketemu
        setIsLoading(false);
      } else {
        setErrorMsg(`Review dengan ID ${id} tidak ditemukan.`);
        setIsLoading(false);
      }
    } else if (quotationId) {
      // --- MODE NEW ---
      // Pastikan konversi ke String agar aman
      const refQuotation = dummyQuotations.find((q) => String(q.id) === String(quotationId));

      console.log("Found Quotation:", refQuotation); // Cek di Console Browser

      if (refQuotation) {
        setQuotationData(refQuotation);
        setIsLoading(false);
      } else {
        // FALLBACK FOR DEVELOPMENT: Jika ID tidak ketemu, pakai data pertama agar tidak stuck loading
        console.warn("Quotation ID not found, using mock data for dev.");
        if (dummyQuotations.length > 0) {
          setQuotationData(dummyQuotations[0]);
          setIsLoading(false);
        } else {
          setErrorMsg(`Quotation dengan ID ${quotationId} tidak ditemukan dan Dummy Data kosong.`);
          setIsLoading(false);
        }
      }
    } else {
      // Tidak ada ID sama sekali
      setErrorMsg("Parameter URL hilang. Gunakan tombol dari halaman Quotation.");
      setIsLoading(false);
    }
  }, [id, quotationId]);

  // === RENDER LOADING / ERROR ===
  if (isLoading) {
    return <div className="p-10 text-center text-gray-500">Loading reference data...</div>;
  }

  if (errorMsg) {
    return (
      <div className="p-10 text-center space-y-4">
        <div className="text-red-500 font-semibold">{errorMsg}</div>
        <Button onClick={() => navigate(-1)}>Kembali</Button>
      </div>
    );
  }

  // === SAVE HANDLER ===
  const handleSubmit = () => {
    // Validasi sederhana
    const allChecked = Object.values(checklists).every((val) => val === true);

    const payload = {
      id: isEditMode ? id : `LR-${Date.now()}`,
      quotationId: quotationData?.id,
      customerName: quotationData?.customerName,
      status: allChecked ? "Approved" : "Pending",
      checklists,
      attachments: files,
      notes,
      updatedAt: new Date().toISOString(),
    };

    console.log("Saving Legal Review Payload:", payload);
    toast.success(isEditMode ? "Review Updated Successfully" : "Legal Review Created Successfully");
    navigate("/legal-review");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* HEADER & NAVIGASI */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{isEditMode ? "Edit Legal Review" : "New Legal–Technical Review"}</h1>
            <p className="text-gray-500 text-sm">{isEditMode ? `ID: ${id}` : "Verifikasi kelayakan pelanggan sebelum kontrak"}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            {isEditMode ? "Update Review" : "Submit Review"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KOLOM KIRI: REFERENCE INFO (QUOTATION) */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-blue-50/50 border-blue-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Reference Quotation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <span className="text-gray-500 block mb-1">Quotation No</span>
                <span className="font-medium text-gray-900">{quotationData?.quotationNo || "-"}</span>
              </div>
              <Separator className="bg-blue-200" />
              <div>
                <span className="text-gray-500 block mb-1">Customer Name</span>
                <span className="font-medium text-gray-900">{quotationData?.customerName || "-"}</span>
                <Badge variant="outline" className="mt-1 bg-white text-blue-700 border-blue-200">
                  {quotationData?.customerType || "Prospect"}
                </Badge>
              </div>
              <Separator className="bg-blue-200" />
              <div>
                <span className="text-gray-500 block mb-1">Service Type</span>
                <span className="font-medium text-gray-900">{quotationData?.serviceType || "-"}</span>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">Installation Location</span>
                <span className="font-medium text-gray-900">{quotationData?.installationLocation || "-"}</span>
              </div>
            </CardContent>
          </Card>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-yellow-800 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>Pastikan data pelanggan (KTP/NPWP) valid dan lokasi instalasi terjangkau (Technical Feasibility) sebelum menyetujui.</p>
          </div>
        </div>

        {/* KOLOM KANAN: FORM INPUT */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. CHECKLIST SECTION */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Compliance Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReviewChecklist value={checklists} onChange={setChecklists} />
            </CardContent>
          </Card>

          {/* 2. DOCUMENT UPLOAD SECTION */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Supporting Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <DocumentUpload files={files} onUpload={setFiles} />
            </CardContent>
          </Card>

          {/* 3. NOTES SECTION */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Review Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full min-h-[120px] p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                placeholder="Tambahkan catatan khusus, temuan risiko, atau instruksi untuk tim deployment..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
