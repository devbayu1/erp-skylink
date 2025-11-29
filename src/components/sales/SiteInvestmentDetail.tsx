// src/pages/sales/SiteInvestmentDetail.tsx
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Pencil, 
  FileText, 
  Download, 
  Printer, 
  MoreVertical,
  CheckCircle2,
  Clock,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Types
interface ApprovalRecord {
  role: string;
  name: string;
  status: "Approved" | "Pending" | "Rejected";
  date?: string;
  time?: string;
  comments?: string;
}

interface SiteInvestmentDetail {
  id: string;
  siNumber: string;
  siDate: string;
  status: "Draft" | "Pending Approval" | "Approved" | "Rejected" | "Revised";
  
  // Project Info
  projectName: string;
  projectLocation: string;
  estimatedStart: string;
  estimatedCompletion: string;
  serviceType: string;
  servicePlan: string;
  quantity: number;
  
  // Customer Info
  customerName: string;
  contactPerson: string;
  contactRole: string;
  phone: string;
  email: string;
  address: string;
  customerType: string;
  
  // Cost Breakdown
  managedServiceItems: CostItem[];
  materialItems: MaterialItem[];
  didItems: CostItem[];
  
  // Totals
  managedServiceCost: number;
  materialCost: number;
  didCost: number;
  contingencyPercent: number;
  contingencyAmount: number;
  grandTotal: number;
  
  // Budget
  budgetSource: string;
  budgetCode: string;
  budgetHolder: string;
  
  // Metadata
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  revisionNumber: number;
  
  // Approvals
  approvalHistory: ApprovalRecord[];
  
  // Related
  hasQuotation: boolean;
  quotationNumber?: string;
  quotationDate?: string;
}

interface CostItem {
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
}

interface MaterialItem {
  materialName: string;
  specification: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
}

// Mock Data
const mockSIDetail: SiteInvestmentDetail = {
  id: "1",
  siNumber: "SI-2025-001",
  siDate: "2025-01-15",
  status: "Approved",
  
  projectName: "Starlink Installation - Priority 2TB",
  projectLocation: "Jl. H. Manap No. 120, Kelurahan Sungai Kerjan, Kecamatan Bungo Dani, Kabupaten Muara Bungo, Jambi",
  estimatedStart: "2025-01-20",
  estimatedCompletion: "2025-01-25",
  serviceType: "Starlink Standard V4",
  servicePlan: "Priority 2TB",
  quantity: 1,
  
  customerName: "PT Buana Visualnet Sentra",
  contactPerson: "Almen Manihuruk",
  contactRole: "Direktur Utama",
  phone: "+62 852-6620-6667",
  email: "antonius.almen@gmail.com",
  address: "Jl. H. Manap No. 120, Kelurahan Sungai Kerjan, Kecamatan Bungo Dani, Kabupaten Muara Bungo, Jambi",
  customerType: "Regular",
  
  managedServiceItems: [
    { description: "Monthly Service Fee", quantity: 12, unit: "months", unitPrice: 2200000, amount: 26400000 },
    { description: "Monitoring Service", quantity: 12, unit: "months", unitPrice: 500000, amount: 6000000 },
    { description: "Technical Support", quantity: 12, unit: "months", unitPrice: 300000, amount: 3600000 },
  ],
  
  materialItems: [
    { materialName: "Starlink Kit V4", specification: "Standard", quantity: 1, unit: "unit", unitPrice: 6000000, amount: 6000000 },
    { materialName: "Mounting Bracket", specification: "Heavy duty", quantity: 1, unit: "set", unitPrice: 500000, amount: 500000 },
    { materialName: "Cable UTP Cat6", specification: "305m", quantity: 2, unit: "roll", unitPrice: 800000, amount: 1600000 },
    { materialName: "Accessories", specification: "Various", quantity: 1, unit: "set", unitPrice: 300000, amount: 300000 },
  ],
  
  didItems: [
    { description: "Delivery to Muara Bungo", quantity: 1, unit: "trip", unitPrice: 5000000, amount: 5000000 },
    { description: "Installation & Configuration", quantity: 1, unit: "set", unitPrice: 3000000, amount: 3000000 },
    { description: "Site Survey", quantity: 1, unit: "visit", unitPrice: 1000000, amount: 1000000 },
    { description: "Dismantle (End of Contract)", quantity: 1, unit: "set", unitPrice: 2000000, amount: 2000000 },
  ],
  
  managedServiceCost: 36000000,
  materialCost: 8400000,
  didCost: 11000000,
  contingencyPercent: 10,
  contingencyAmount: 5540000,
  grandTotal: 60940000,
  
  budgetSource: "CAPEX",
  budgetCode: "BDG-2025-Q1-001",
  budgetHolder: "Finance Manager",
  
  createdBy: "Melrandy Firdauz",
  createdAt: "2025-01-15 10:30",
  updatedAt: "2025-01-18 14:20",
  revisionNumber: 0,
  
  approvalHistory: [
    { role: "Pre-Sales Manager", name: "Melrandy Firdauz", status: "Approved", date: "15 Jan 2025", time: "14:30" },
    { role: "Network Operation Manager", name: "Ahmad Yani", status: "Approved", date: "16 Jan 2025", time: "09:15" },
    { role: "Finance Manager", name: "Mega Christin", status: "Approved", date: "17 Jan 2025", time: "10:45" },
    { role: "Director", name: "Achmad Robbiana", status: "Approved", date: "18 Jan 2025", time: "14:20" },
  ],
  
  hasQuotation: true,
  quotationNumber: "PRT-JKT-QUOT-186-COM-1-2025",
  quotationDate: "2025-01-19",
};

// Status Badge Component
function StatusBadge({ status }: { status: SiteInvestmentDetail["status"] }) {
  const styles = {
    Draft: "bg-gray-100 text-gray-700",
    "Pending Approval": "bg-yellow-100 text-yellow-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Revised: "bg-blue-100 text-blue-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}

// Process Flow Component
function ProcessFlow({ currentStep }: { currentStep: number }) {
  const steps = [
    { name: "Site Investment", completed: true, date: "15 Jan 2025" },
    { name: "Quotation", completed: currentStep > 1, date: currentStep > 1 ? "19 Jan 2025" : undefined },
    { name: "Customer Approval", completed: currentStep > 2, date: undefined },
    { name: "IRO", completed: currentStep > 3, date: undefined },
    { name: "Implementation", completed: currentStep > 4, date: undefined },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Process Flow</h3>
        <div className="flex items-center gap-2 overflow-x-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap ${
                step.completed ? "bg-green-50 text-green-700" :
                index === currentStep ? "bg-blue-50 text-blue-700" :
                "bg-gray-50 text-gray-500"
              }`}>
                {step.completed && <CheckCircle2 className="w-4 h-4" />}
                {!step.completed && index === currentStep && <Clock className="w-4 h-4" />}
                <div>
                  <span className="text-sm font-medium">{step.name}</span>
                  {step.date && (
                    <span className="text-xs opacity-70 ml-1">({step.date})</span>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Main Component
export default function SiteInvestmentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // In real app, fetch data based on id
  const siData = mockSIDetail;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const currentStep = siData.hasQuotation ? 1 : 0;

  return (
    <div className="space-y-6 mt-4 pt-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/sales/si")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{siData.siNumber}</h1>
              <StatusBadge status={siData.status} />
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Created on {formatDate(siData.siDate)} at {siData.createdAt.split(' ')[1]}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/sales/si/${id}/edit`)}
            disabled={siData.status === "Approved"}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>

          {siData.status === "Approved" && (
            <Button onClick={() => navigate(`/sales/si/${id}/quotation`)}>
              <FileText className="w-4 h-4 mr-2" />
              Create Quotation
            </Button>
          )}

          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>

          <Button variant="outline">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Revise SI</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Process Flow */}
      <ProcessFlow currentStep={currentStep} />

      {/* Main Content - 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Information */}
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Project Name</p>
                  <p className="font-medium">{siData.projectName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Service Type</p>
                  <p className="font-medium">{siData.serviceType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Service Plan</p>
                  <p className="font-medium">{siData.servicePlan}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Quantity</p>
                  <p className="font-medium">{siData.quantity} unit</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Start</p>
                  <p className="font-medium">{formatDate(siData.estimatedStart)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Completion</p>
                  <p className="font-medium">{formatDate(siData.estimatedCompletion)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Project Location</p>
                  <p className="text-sm">{siData.projectLocation}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Managed Service Cost */}
              <div>
                <h4 className="font-semibold mb-3">A. Managed Service Cost</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-2">Description</th>
                        <th className="text-center p-2">Qty</th>
                        <th className="text-center p-2">Unit</th>
                        <th className="text-right p-2">Unit Price</th>
                        <th className="text-right p-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {siData.managedServiceItems.map((item, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="p-2">{item.description}</td>
                          <td className="text-center p-2">{item.quantity}</td>
                          <td className="text-center p-2">{item.unit}</td>
                          <td className="text-right p-2">{formatCurrency(item.unitPrice)}</td>
                          <td className="text-right p-2 font-medium">{formatCurrency(item.amount)}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50 font-semibold">
                        <td colSpan={4} className="text-right p-2">Subtotal:</td>
                        <td className="text-right p-2">{formatCurrency(siData.managedServiceCost)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Material Cost */}
              <div>
                <h4 className="font-semibold mb-3">B. Material Cost</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-2">Material Name</th>
                        <th className="text-left p-2">Specification</th>
                        <th className="text-center p-2">Qty</th>
                        <th className="text-center p-2">Unit</th>
                        <th className="text-right p-2">Unit Price</th>
                        <th className="text-right p-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {siData.materialItems.map((item, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="p-2">{item.materialName}</td>
                          <td className="p-2 text-gray-600">{item.specification}</td>
                          <td className="text-center p-2">{item.quantity}</td>
                          <td className="text-center p-2">{item.unit}</td>
                          <td className="text-right p-2">{formatCurrency(item.unitPrice)}</td>
                          <td className="text-right p-2 font-medium">{formatCurrency(item.amount)}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50 font-semibold">
                        <td colSpan={5} className="text-right p-2">Subtotal:</td>
                        <td className="text-right p-2">{formatCurrency(siData.materialCost)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* DID Cost */}
              <div>
                <h4 className="font-semibold mb-3">C. DID Cost (Delivery, Installation, Dismantle)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-2">Description</th>
                        <th className="text-center p-2">Qty</th>
                        <th className="text-center p-2">Unit</th>
                        <th className="text-right p-2">Unit Price</th>
                        <th className="text-right p-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {siData.didItems.map((item, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="p-2">{item.description}</td>
                          <td className="text-center p-2">{item.quantity}</td>
                          <td className="text-center p-2">{item.unit}</td>
                          <td className="text-right p-2">{formatCurrency(item.unitPrice)}</td>
                          <td className="text-right p-2 font-medium">{formatCurrency(item.amount)}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50 font-semibold">
                        <td colSpan={4} className="text-right p-2">Subtotal:</td>
                        <td className="text-right p-2">{formatCurrency(siData.didCost)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Investment Summary */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle>Total Investment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Managed Service Cost:</span>
                <span className="font-semibold">{formatCurrency(siData.managedServiceCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Material Cost:</span>
                <span className="font-semibold">{formatCurrency(siData.materialCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">DID Cost:</span>
                <span className="font-semibold">{formatCurrency(siData.didCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Contingency ({siData.contingencyPercent}%):</span>
                <span className="font-semibold">{formatCurrency(siData.contingencyAmount)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2 border-blue-300">
                <span className="text-lg font-bold">Grand Total:</span>
                <span className="text-2xl font-bold text-blue-700">{formatCurrency(siData.grandTotal)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Budget Allocation */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Budget Source</p>
                  <p className="font-medium">{siData.budgetSource}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Budget Code</p>
                  <p className="font-medium">{siData.budgetCode}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Budget Holder</p>
                  <p className="font-medium">{siData.budgetHolder}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Customer Name</p>
                <p className="font-medium">{siData.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact Person</p>
                <p className="font-medium">{siData.contactPerson}</p>
                <p className="text-xs text-gray-500">{siData.contactRole}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{siData.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{siData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="text-sm">{siData.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Customer Type</p>
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {siData.customerType}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* SI Status */}
          <Card>
            <CardHeader>
              <CardTitle>SI Status & Approval</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <StatusBadge status={siData.status} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Created By</p>
                <p className="font-medium">{siData.createdBy}</p>
                <p className="text-xs text-gray-500">{siData.createdAt}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="text-xs text-gray-500">{siData.updatedAt}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Revision</p>
                <p className="font-medium">{siData.revisionNumber}</p>
              </div>

              {/* Approval History */}
              <div className="pt-4 border-t">
                <p className="text-sm font-semibold mb-3">Approval Workflow</p>
                <div className="space-y-3">
                  {siData.approvalHistory.map((approval, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        approval.status === "Approved" ? "bg-green-100" :
                        approval.status === "Pending" ? "bg-yellow-100" :
                        "bg-red-100"
                      }`}>
                        {approval.status === "Approved" && (
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                        )}
                        {approval.status === "Pending" && (
                          <Clock className="w-3 h-3 text-yellow-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{approval.role}</p>
                        <p className="text-xs text-gray-600">{approval.name}</p>
                        {approval.date && (
                          <p className="text-xs text-gray-500">
                            {approval.status} - {approval.date}, {approval.time}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Documents */}
          {siData.hasQuotation && (
            <Card>
              <CardHeader>
                <CardTitle>Related Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <button
                    onClick={() => navigate(`/quotations/${siData.quotationNumber}`)}
                    className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-blue-600">
                          Quotation {siData.quotationNumber}
                        </p>
                        <p className="text-xs text-gray-500">
                          Created on {siData.quotationDate ? formatDate(siData.quotationDate) : ''}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}