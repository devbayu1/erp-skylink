import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import type { QuotationFormData, Customer, ServiceType, ServicePlan } from "../types/quotationForm";
import { QuotationStep1 } from "../components/quotation-form/QuotationStep1";
import { QuotationStep2 } from "../components/quotation-form/QuotationStep2";
import { QuotationStep3 } from "../components/quotation-form/QuotationStep3";

// Mock data
const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "PT Buana Visualnet Sentra",
    contactPerson: "Almen Manihuruk",
    phone: "+62 852-6620-6667",
    email: "antonius.almen@gmail.com",
    address: "Jl. H. Manap No. 120 Kelurahan Sungai Kerjan, Kecamatan Bungo Dani, Kabupaten Muara Bungo, Jambi",
  },
  {
    id: "2",
    name: "Freyssinet Total Technology",
    contactPerson: "Tax Admin",
    phone: "021-5551234",
    email: "admin@freyssinet.co.id",
    address: "Jakarta Pusat, DKI Jakarta",
  },
  {
    id: "3",
    name: "Diskominfo Muaro Jambi",
    contactPerson: "Alan Dede",
    phone: "085267843664",
    email: "alan@diskominfo.go.id",
    address: "Muaro Jambi, Jambi",
  },
];

const serviceTypes: ServiceType[] = [
  { id: "1", name: "Starlink Standard V4", type: "fixed", basePrice: 7200000 },
  { id: "2", name: "Starlink Flat Standard V4", type: "fixed", basePrice: 8500000 },
  { id: "3", name: "Starlink Flat High Performance", type: "fixed", basePrice: 13000000 },
  { id: "4", name: "Starlink Mini", type: "mobile", basePrice: 9000000 },
  { id: "5", name: "Custom Package", type: "fixed", basePrice: 0 },
];

const servicePlans: ServicePlan[] = [
  // Fixed plans
  { id: "f1", name: "Priority 40GB", serviceTypeId: "1", monthlyCost: 540000 },
  { id: "f2", name: "Priority 1TB", serviceTypeId: "1", monthlyCost: 1080000 },
  { id: "f3", name: "Priority 2TB", serviceTypeId: "1", monthlyCost: 2160000 },
  { id: "f4", name: "Priority 6TB", serviceTypeId: "1", monthlyCost: 5400000 },
  // Mobile plans
  { id: "m1", name: "Mobile Priority 50GB", serviceTypeId: "4", monthlyCost: 648000 },
  { id: "m2", name: "Mobile Priority 1TB", serviceTypeId: "4", monthlyCost: 1296000 },
  { id: "m3", name: "Mobile Priority 5TB", serviceTypeId: "4", monthlyCost: 6480000 },
];

export default function CreateQuotation() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<QuotationFormData>({
    customer: null,
    customerId: "",
    customerName: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    serviceType: "",
    servicePlan: "",
    quantity: 1,
    servicePeriod: 12,
    installationLocation: "",
    latitude: "",
    longitude: "",
    targetRFSDate: "",
    additionalServices: [
      { id: "1", name: "Delivery & Installation", checked: false, delivery: true, activation: true, training: true, warranty: true },
      { id: "2", name: "Activation Service", checked: false, delivery: true, activation: true, training: true, warranty: true },
      { id: "3", name: "Training & Support", checked: false, delivery: true, activation: true, training: true, warranty: true },
      { id: "4", name: "Extended Warranty", checked: false, delivery: true, activation: true, training: true, warranty: true },
    ],
    otcItems: [
      { id: "1", item: "Equipment", description: "", amount: 0 },
      { id: "2", item: "Delivery", description: "Shipping to location", amount: 0 },
      { id: "3", item: "Installation & Dismantle", description: "Professional installation", amount: 0 },
      { id: "4", item: "Activation", description: "Service activation", amount: 0 },
    ],
    mrcItems: [{ id: "1", item: "Service Plan", description: "", monthly: 0, period: 12, total: 0 }],
    paymentTerm: "postpaid",
    downPaymentPercent: 30,
    // eslint-disable-next-line react-hooks/purity
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    slaCommitments: ["99% Uptime Guarantee", "24/7 Support"],
    contractPeriod: 12,
    specialNotes: "",
  });

  const steps = [
    { number: 1, title: "Customer & Service Info" },
    { number: 2, title: "Cost Breakdown" },
    { number: 3, title: "Terms & Preview" },
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCancel = () => {
    navigate("/quotations");
  };

  return (
    <div className="p-8 pb-24">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0" onClick={handleCancel}>
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Button>

          <h1 className="text-gray-900">Create New Quotation</h1>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex items-center gap-3 flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    currentStep > step.number ? "bg-green-500" : currentStep === step.number ? "bg-[#3b82f6]" : "bg-gray-300"
                  }`}
                >
                  {currentStep > step.number ? <Check className="w-5 h-5 text-white" /> : <span className="text-white">{step.number}</span>}
                </div>
                <div className="flex-1">
                  <div className={`text-sm ${currentStep >= step.number ? "text-gray-900" : "text-gray-500"}`}>Step {step.number}</div>
                  <div className={`text-xs ${currentStep >= step.number ? "text-gray-600" : "text-gray-400"}`}>{step.title}</div>
                </div>
              </div>
              {index < steps.length - 1 && <div className={`h-0.5 flex-1 mx-2 ${currentStep > step.number ? "bg-green-500" : "bg-gray-300"}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <div className="max-w-5xl mx-auto">
        {currentStep === 1 && (
          <QuotationStep1
            formData={formData}
            setFormData={setFormData}
            customers={mockCustomers}
            serviceTypes={serviceTypes}
            servicePlans={servicePlans}
            onNext={handleNext}
            onCancel={handleCancel}
          />
        )}

        {currentStep === 2 && (
          <QuotationStep2
            formData={formData}
            setFormData={setFormData}
            serviceTypes={serviceTypes}
            servicePlans={servicePlans}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && <QuotationStep3 formData={formData} setFormData={setFormData} onBack={handleBack} onCancel={handleCancel} />}
      </div>
    </div>
  );
}
