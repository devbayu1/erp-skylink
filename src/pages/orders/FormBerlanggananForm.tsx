import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Save, Calendar, Building, User, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Import Data Dummy
import dummyFormBerlangganan from "@/data/dummyFormBerlangganan";
import dummyLegalReview from "@/data/dummyLegalReview";
import dummyQuotations from "@/data/dummyQuotations";

const formatCurrency = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

export default function FormBerlanggananForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Mode Edit
  const [searchParams] = useSearchParams();
  const legalReviewId = searchParams.get("legalReviewId"); // Mode New

  // State
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Data References
  const [refQuotation, setRefQuotation] = useState<any>(null);
  const [refLegal, setRefLegal] = useState<any>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    contractPeriod: 12,
    startDate: new Date().toISOString().slice(0, 10),
    endDate: "",
    installationAddress: "",
    billingContact: "",
    technicalContact: "",
    notes: "",
  });

  // Load Data Effect
  useEffect(() => {
    setIsLoading(true);

    if (id) {
      // --- MODE EDIT ---
      const existingFB = dummyFormBerlangganan.find((f) => f.id === id);
      if (existingFB) {
        setIsEditMode(true);
        // Load existing form data
        setFormData({
          contractPeriod: existingFB.contractPeriod,
          startDate: existingFB.startDate,
          endDate: existingFB.endDate,
          installationAddress: "Jl. Contoh Alamat Existing No 1", // Mock data jika field belum ada di dummy
          billingContact: "Finance Dept",
          technicalContact: "IT Dept",
          notes: "",
        });

        // Cari referensi Quotation (Logic Mocking)
        // Di real app, FB akan punya field quotationId
        const linkedQuotation = dummyQuotations.find((q) => q.customerName === existingFB.customerName) || dummyQuotations[0];
        setRefQuotation(linkedQuotation);
      } else {
        toast.error("Form Berlangganan tidak ditemukan");
        navigate("/orders/form-berlangganan");
      }
      setIsLoading(false);
    } else if (legalReviewId) {
      // --- MODE NEW ---
      const legalReview = dummyLegalReview.find((r) => r.id === legalReviewId);

      if (legalReview) {
        setRefLegal(legalReview);

        // Cari Quotation yang terhubung dengan Legal Review ini
        // Note: Di step sebelumnya kita simpan quotationId di LegalReview (logic baru)
        // Jika field belum ada di dummyLegalReview.ts, kita cari manual via Customer Name/ID
        const quotation =
          dummyQuotations.find((q) => q.id === (legalReview as any).quotationId || q.quotationNo === (legalReview as any).quotationNumber) ||
          dummyQuotations.find((q) => q.customerName === legalReview.customerName); // Fallback

        if (quotation) {
          setRefQuotation(quotation);
          setFormData((prev) => ({
            ...prev,
            installationAddress: quotation?.installationLocation || "",
            // Default start date = 1 bulan dari sekarang
            startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
          }));
        } else {
          toast.error("Data Quotation terkait tidak ditemukan.");
        }
      } else {
        toast.error("Data Legal Review tidak ditemukan.");
      }
      setIsLoading(false);
    } else {
      // Fallback Development: Jika dibuka langsung tanpa param
      setRefQuotation(dummyQuotations[0]);
      setIsLoading(false);
    }
  }, [id, legalReviewId, navigate]);

  // Kalkulasi End Date otomatis
  useEffect(() => {
    if (formData.startDate && formData.contractPeriod) {
      const start = new Date(formData.startDate);
      const end = new Date(start);
      end.setMonth(start.getMonth() + Number(formData.contractPeriod));
      setFormData((prev) => ({ ...prev, endDate: end.toISOString().slice(0, 10) }));
    }
  }, [formData.startDate, formData.contractPeriod]);

  // Loading View
  if (isLoading) return <div className="p-10 text-center">Loading data...</div>;

  // Handler Submit
  const handleSubmit = () => {
    // Kalkulasi Total dari Quotation
    // Note: Kita asumsikan struktur dummyQuotations punya field otc/mrc atau kita hitung kasar
    // Di real app, data ini harus persis sama dengan Quotation

    // Mock calculation jika field tidak tersedia langsung
    const otc = 5000000;
    const mrc = 15000000;

    const newFB = {
      id: isEditMode ? id : `FB-${Date.now()}`,
      fbNumber: isEditMode
        ? dummyFormBerlangganan.find((f) => f.id === id)?.fbNumber
        : `FB-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
      quotationId: refQuotation?.id,
      legalReviewId: refLegal?.id,
      customerName: refQuotation?.customerName,
      serviceType: refQuotation?.serviceType,
      servicePlan: refQuotation?.servicePlan || "Standard Plan",
      quantity: refQuotation?.quantity || 1,

      otcTotal: otc,
      mrcMonthly: mrc,
      grandTotal: otc + mrc * 12, // Contoh kalkulasi setahun

      ...formData,
      status: "Draft",
    };

    console.log("Saving Form Berlangganan:", newFB);
    toast.success(isEditMode ? "Form Berlangganan updated" : "Form Berlangganan created successfully");
    navigate("/orders/form-berlangganan"); // Kembali ke list
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{isEditMode ? "Edit Form Berlangganan" : "Create Form Berlangganan"}</h1>
            <p className="text-sm text-gray-500">
              Based on Quotation: <span className="font-medium text-blue-600">{refQuotation?.quotationNo || "-"}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: SOURCE DATA (READ ONLY) */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-gray-50 border-gray-200">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider text-gray-500">Service & Customer Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs text-gray-500">Customer Name</Label>
                <div className="font-medium">{refQuotation?.customerName}</div>
              </div>
              <Separator />
              <div>
                <Label className="text-xs text-gray-500">Service Type</Label>
                <div className="font-medium">{refQuotation?.serviceType}</div>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Plan</Label>
                <div className="font-medium">{refQuotation?.servicePlan || "-"}</div>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Quantity</Label>
                <div className="font-medium">{refQuotation?.quantity || 1} Unit</div>
              </div>
              <Separator />
              {/* ESTIMASI HARGA (MOCK) */}
              <div>
                <Label className="text-xs text-gray-500">One Time Charge (OTC)</Label>
                <div className="font-medium">{formatCurrency(5000000)}</div>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Monthly Recurring (MRC)</Label>
                <div className="font-medium">{formatCurrency(15000000)}</div>
              </div>
            </CardContent>
          </Card>

          {refLegal && (
            <div className="bg-green-50 p-4 rounded border border-green-200 text-sm text-green-800 flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Verified by Legal Review ({refLegal.id})</span>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: INPUT FORM */}
        <div className="lg:col-span-2 space-y-6">
          {/* CONTRACT DETAILS */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="w-5 h-5 text-blue-600" />
                Contract Period & Duration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Contract Period (Months)</Label>
                  <Input
                    type="number"
                    value={formData.contractPeriod}
                    onChange={(e) => setFormData({ ...formData, contractPeriod: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Target Activation Date</Label>
                  <Input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded border border-blue-100 flex justify-between items-center">
                <span className="text-sm text-blue-700">Contract End Date (Auto-calculated):</span>
                <span className="font-bold text-blue-900">{formData.endDate}</span>
              </div>
            </CardContent>
          </Card>

          {/* CONTACT & LOCATION */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Building className="w-5 h-5 text-orange-600" />
                Installation & Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Installation Address</Label>
                <Input
                  value={formData.installationAddress}
                  onChange={(e) => setFormData({ ...formData, installationAddress: e.target.value })}
                  placeholder="Full address for installation..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Billing Contact Person</Label>
                  <Input
                    value={formData.billingContact}
                    onChange={(e) => setFormData({ ...formData, billingContact: e.target.value })}
                    placeholder="e.g. Finance Dept / Ibu Ani"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Technical Contact Person</Label>
                  <Input
                    value={formData.technicalContact}
                    onChange={(e) => setFormData({ ...formData, technicalContact: e.target.value })}
                    placeholder="e.g. IT Manager / Pak Budi"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PAYMENT INFO */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CreditCard className="w-5 h-5 text-gray-600" />
                Payment Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-500 text-xs">Payment Method</Label>
                  <div className="font-medium mt-1">Bank Transfer (BCA)</div>
                </div>
                <div>
                  <Label className="text-gray-500 text-xs">Term of Payment</Label>
                  <div className="font-medium mt-1">Net 30 Days</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
