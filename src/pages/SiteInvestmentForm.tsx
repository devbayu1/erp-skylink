import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Upload, Check, Clock, Minus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  SiteInvestmentForm as SIFormData,
  ManagedServiceItem,
  MaterialItem,
  DIDItem,
  ApprovalStatus,
  ReferenceQuotation,
} from "../types/siteInvestment";

const referenceQuotation: ReferenceQuotation = {
  quotationNo: "PRT-JKT-QUOT-186-COM-4-2025",
  customerName: "Ibu Wulan",
  service: "Starlink Standard V4 - Priority 2TB",
  quantity: 1,
  location: "Lampung",
};

const budgetHolders = [
  "Melrandy Firdauz (VP Commercial)",
  "John Doe (Operations Manager)",
  "Jane Smith (Finance Manager)",
];

const approvalRoles = [
  "Pre-Sales Manager",
  "Network Operation Manager",
  "Finance Manager",
  "Director",
];

export default function SiteInvestmentForm() {
  const navigate = useNavigate();
  const { quotationId } = useParams();

  const [formData, setFormData] = useState<SIFormData>({
    siNumber: "SI-2025-001",
    siDate: new Date().toISOString().split("T")[0],
    projectName: "",
    projectLocation: "",
    estimatedStartDate: "",
    estimatedCompletionDate: "",
    managedServiceItems: [
      {
        id: "1",
        description: "Monthly Service Fee",
        qty: 12,
        unit: "months",
        unitPrice: 0,
        amount: 0,
      },
      {
        id: "2",
        description: "Monitoring Service",
        qty: 12,
        unit: "months",
        unitPrice: 0,
        amount: 0,
      },
      {
        id: "3",
        description: "Technical Support",
        qty: 12,
        unit: "months",
        unitPrice: 0,
        amount: 0,
      },
    ],
    materialItems: [
      {
        id: "1",
        materialName: "Starlink Kit V4",
        specification: "Standard",
        qty: 1,
        unit: "unit",
        unitPrice: 0,
        amount: 0,
      },
      {
        id: "2",
        materialName: "Mounting Bracket",
        specification: "Heavy duty",
        qty: 1,
        unit: "unit",
        unitPrice: 0,
        amount: 0,
      },
      {
        id: "3",
        materialName: "Cable UTP Cat6",
        specification: "305m",
        qty: 1,
        unit: "roll",
        unitPrice: 0,
        amount: 0,
      },
      {
        id: "4",
        materialName: "Accessories",
        specification: "Various",
        qty: 1,
        unit: "set",
        unitPrice: 0,
        amount: 0,
      },
    ],
    didItems: [
      {
        id: "1",
        description: "Delivery to Lampung",
        qty: 1,
        unit: "trip",
        unitPrice: 0,
        amount: 0,
      },
      {
        id: "2",
        description: "Installation & Configuration",
        qty: 1,
        unit: "set",
        unitPrice: 0,
        amount: 0,
      },
      {
        id: "3",
        description: "Site Survey",
        qty: 1,
        unit: "visit",
        unitPrice: 0,
        amount: 0,
      },
      {
        id: "4",
        description: "Dismantle (End of Contract)",
        qty: 1,
        unit: "set",
        unitPrice: 0,
        amount: 0,
      },
    ],
    budgetSource: "",
    budgetCode: "",
    budgetHolder: "",
    approvalRequired: approvalRoles,
    internalNotes: "",
    customerNotes: "",
    attachments: [],
    contingencyPercent: 0,
    revisionNumber: 0,
    status: "draft",
  });

  const [approvalStatuses, setApprovalStatuses] = useState<ApprovalStatus[]>([
    { role: "Pre-Sales Manager", status: "approved", approvedBy: "John Smith", approvedDate: "2025-04-09" },
    { role: "Network Operation Manager", status: "pending" },
    { role: "Finance Manager", status: "waiting" },
    { role: "Director", status: "waiting" },
  ]);

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString("id-ID")}`;
  };

  // Managed Service handlers
  const handleManagedServiceChange = (id: string, field: keyof ManagedServiceItem, value: any) => {
    const updatedItems = formData.managedServiceItems.map((item) => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === "qty" || field === "unitPrice") {
          updated.amount = updated.qty * updated.unitPrice;
        }
        return updated;
      }
      return item;
    });
    setFormData({ ...formData, managedServiceItems: updatedItems });
  };

  const addManagedServiceItem = () => {
    const newItem: ManagedServiceItem = {
      id: Date.now().toString(),
      description: "",
      qty: 1,
      unit: "months",
      unitPrice: 0,
      amount: 0,
    };
    setFormData({
      ...formData,
      managedServiceItems: [...formData.managedServiceItems, newItem],
    });
  };

  const removeManagedServiceItem = (id: string) => {
    setFormData({
      ...formData,
      managedServiceItems: formData.managedServiceItems.filter((item) => item.id !== id),
    });
  };

  // Material handlers
  const handleMaterialChange = (id: string, field: keyof MaterialItem, value: any) => {
    const updatedItems = formData.materialItems.map((item) => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === "qty" || field === "unitPrice") {
          updated.amount = updated.qty * updated.unitPrice;
        }
        return updated;
      }
      return item;
    });
    setFormData({ ...formData, materialItems: updatedItems });
  };

  const addMaterialItem = () => {
    const newItem: MaterialItem = {
      id: Date.now().toString(),
      materialName: "",
      specification: "",
      qty: 1,
      unit: "unit",
      unitPrice: 0,
      amount: 0,
    };
    setFormData({
      ...formData,
      materialItems: [...formData.materialItems, newItem],
    });
  };

  const removeMaterialItem = (id: string) => {
    setFormData({
      ...formData,
      materialItems: formData.materialItems.filter((item) => item.id !== id),
    });
  };

  // DID handlers
  const handleDIDChange = (id: string, field: keyof DIDItem, value: any) => {
    const updatedItems = formData.didItems.map((item) => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === "qty" || field === "unitPrice") {
          updated.amount = updated.qty * updated.unitPrice;
        }
        return updated;
      }
      return item;
    });
    setFormData({ ...formData, didItems: updatedItems });
  };

  const addDIDItem = () => {
    const newItem: DIDItem = {
      id: Date.now().toString(),
      description: "",
      qty: 1,
      unit: "set",
      unitPrice: 0,
      amount: 0,
    };
    setFormData({
      ...formData,
      didItems: [...formData.didItems, newItem],
    });
  };

  const removeDIDItem = (id: string) => {
    setFormData({
      ...formData,
      didItems: formData.didItems.filter((item) => item.id !== id),
    });
  };

  // Calculate totals
  const subtotalManagedService = formData.managedServiceItems.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const subtotalMaterial = formData.materialItems.reduce((sum, item) => sum + item.amount, 0);
  const subtotalDID = formData.didItems.reduce((sum, item) => sum + item.amount, 0);
  const totalInvestment = subtotalManagedService + subtotalMaterial + subtotalDID;
  const contingencyAmount = (totalInvestment * formData.contingencyPercent) / 100;
  const grandTotal = totalInvestment + contingencyAmount;

  const handleApprovalToggle = (role: string) => {
    const updatedRoles = formData.approvalRequired.includes(role)
      ? formData.approvalRequired.filter((r) => r !== role)
      : [...formData.approvalRequired, role];
    setFormData({ ...formData, approvalRequired: updatedRoles });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData({ ...formData, attachments: [...formData.attachments, ...files] });
    }
  };

  const handleSaveDraft = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("SI saved as draft!");
      setTimeout(() => navigate("/quotations"), 1500);
    } catch (error) {
      toast.error("Failed to save draft");
    }
  };

  const handleSubmitForApproval = async () => {
    if (!formData.projectName || !formData.budgetSource) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("SI submitted for approval successfully!");
      setTimeout(() => navigate("/quotations"), 2000);
    } catch (error) {
      toast.error("Failed to submit for approval");
    }
  };

  return (
    <div className="p-8 pb-32">
      <Toaster position="top-right" />

      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Button>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-gray-900">Site Investment (SI)</h1>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                Revision: {formData.revisionNumber}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Reference Quotation: {referenceQuotation.quotationNo}
            </p>
          </div>
        </div>

        {/* Header Info Card */}
        <Card className="bg-gray-100 border-gray-200">
          <CardContent className="pt-6">
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Customer:</span>{" "}
                <span className="text-gray-900">{referenceQuotation.customerName}</span>
              </div>
              <div>
                <span className="text-gray-600">Service:</span>{" "}
                <span className="text-gray-900">{referenceQuotation.service}</span>
              </div>
              <div>
                <span className="text-gray-600">Quantity:</span>{" "}
                <span className="text-gray-900">{referenceQuotation.quantity} unit</span>
              </div>
              <div>
                <span className="text-gray-600">Location:</span>{" "}
                <span className="text-gray-900">{referenceQuotation.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Form */}
      <div className="space-y-6">
        {/* Section 1: Project Information */}
        <Card className="bg-white shadow-sm rounded-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="siNumber">SI Number</Label>
                <Input
                  id="siNumber"
                  value={formData.siNumber}
                  readOnly
                  className="mt-1 bg-gray-100"
                />
              </div>
              <div>
                <Label htmlFor="siDate">SI Date</Label>
                <Input
                  id="siDate"
                  type="date"
                  value={formData.siDate}
                  onChange={(e) => setFormData({ ...formData, siDate: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="projectName">
                Project Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="projectName"
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                placeholder="Enter project name"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="projectLocation">Project Location</Label>
              <Textarea
                id="projectLocation"
                value={formData.projectLocation}
                onChange={(e) =>
                  setFormData({ ...formData, projectLocation: e.target.value })
                }
                placeholder="Enter project location"
                rows={2}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="estimatedStartDate">Estimated Start Date</Label>
                <Input
                  id="estimatedStartDate"
                  type="date"
                  value={formData.estimatedStartDate}
                  onChange={(e) =>
                    setFormData({ ...formData, estimatedStartDate: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="estimatedCompletionDate">Estimated Completion Date</Label>
                <Input
                  id="estimatedCompletionDate"
                  type="date"
                  value={formData.estimatedCompletionDate}
                  onChange={(e) =>
                    setFormData({ ...formData, estimatedCompletionDate: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Cost Breakdown */}
        <Card className="bg-white shadow-sm rounded-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* A. Managed Service Cost */}
            <div>
              <h3 className="text-sm text-gray-900 mb-3">A. Managed Service Cost</h3>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[100px]">Qty</TableHead>
                    <TableHead className="w-[100px]">Unit</TableHead>
                    <TableHead className="w-[150px]">Unit Price</TableHead>
                    <TableHead className="w-[150px] text-right">Amount</TableHead>
                    <TableHead className="w-[60px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.managedServiceItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Input
                          value={item.description}
                          onChange={(e) =>
                            handleManagedServiceChange(item.id, "description", e.target.value)
                          }
                          placeholder="Description"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.qty}
                          onChange={(e) =>
                            handleManagedServiceChange(
                              item.id,
                              "qty",
                              parseFloat(e.target.value) || 0
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={item.unit}
                          onChange={(e) =>
                            handleManagedServiceChange(item.id, "unit", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) =>
                            handleManagedServiceChange(
                              item.id,
                              "unitPrice",
                              parseFloat(e.target.value) || 0
                            )
                          }
                        />
                      </TableCell>
                      <TableCell className="text-right text-gray-900">
                        {formatCurrency(item.amount)}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeManagedServiceItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addManagedServiceItem}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </Button>
                <div className="text-right">
                  <span className="text-sm text-gray-600">Subtotal Managed Service: </span>
                  <span className="text-gray-900">
                    {formatCurrency(subtotalManagedService)}
                  </span>
                </div>
              </div>
            </div>

            {/* B. Material Cost */}
            <div>
              <h3 className="text-sm text-gray-900 mb-3">B. Material Cost</h3>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Material Name</TableHead>
                    <TableHead>Specification</TableHead>
                    <TableHead className="w-[80px]">Qty</TableHead>
                    <TableHead className="w-[80px]">Unit</TableHead>
                    <TableHead className="w-[130px]">Unit Price</TableHead>
                    <TableHead className="w-[130px] text-right">Amount</TableHead>
                    <TableHead className="w-[60px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.materialItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Input
                          value={item.materialName}
                          onChange={(e) =>
                            handleMaterialChange(item.id, "materialName", e.target.value)
                          }
                          placeholder="Material name"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={item.specification}
                          onChange={(e) =>
                            handleMaterialChange(item.id, "specification", e.target.value)
                          }
                          placeholder="Spec"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.qty}
                          onChange={(e) =>
                            handleMaterialChange(
                              item.id,
                              "qty",
                              parseFloat(e.target.value) || 0
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={item.unit}
                          onChange={(e) =>
                            handleMaterialChange(item.id, "unit", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) =>
                            handleMaterialChange(
                              item.id,
                              "unitPrice",
                              parseFloat(e.target.value) || 0
                            )
                          }
                        />
                      </TableCell>
                      <TableCell className="text-right text-gray-900">
                        {formatCurrency(item.amount)}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeMaterialItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addMaterialItem}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Material
                </Button>
                <div className="text-right">
                  <span className="text-sm text-gray-600">Subtotal Material: </span>
                  <span className="text-gray-900">{formatCurrency(subtotalMaterial)}</span>
                </div>
              </div>
            </div>

            {/* C. DID Cost */}
            <div>
              <h3 className="text-sm text-gray-900 mb-3">
                C. DID (Delivery, Installation, Dismantle) Cost
              </h3>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[100px]">Qty</TableHead>
                    <TableHead className="w-[100px]">Unit</TableHead>
                    <TableHead className="w-[150px]">Unit Price</TableHead>
                    <TableHead className="w-[150px] text-right">Amount</TableHead>
                    <TableHead className="w-[60px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.didItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Input
                          value={item.description}
                          onChange={(e) =>
                            handleDIDChange(item.id, "description", e.target.value)
                          }
                          placeholder="Description"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.qty}
                          onChange={(e) =>
                            handleDIDChange(item.id, "qty", parseFloat(e.target.value) || 0)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={item.unit}
                          onChange={(e) => handleDIDChange(item.id, "unit", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) =>
                            handleDIDChange(
                              item.id,
                              "unitPrice",
                              parseFloat(e.target.value) || 0
                            )
                          }
                        />
                      </TableCell>
                      <TableCell className="text-right text-gray-900">
                        {formatCurrency(item.amount)}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeDIDItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between mt-3">
                <Button variant="outline" size="sm" onClick={addDIDItem} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Item
                </Button>
                <div className="text-right">
                  <span className="text-sm text-gray-600">Subtotal DID: </span>
                  <span className="text-gray-900">{formatCurrency(subtotalDID)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Total Investment Summary */}
        <Card className="bg-blue-50 border-2 border-blue-200 shadow-sm rounded-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">Total Investment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Managed Service Cost:</span>
              <span className="text-gray-900">
                {formatCurrency(subtotalManagedService)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Material Cost:</span>
              <span className="text-gray-900">{formatCurrency(subtotalMaterial)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">DID Cost:</span>
              <span className="text-gray-900">{formatCurrency(subtotalDID)}</span>
            </div>
            <div className="border-t-2 border-blue-300 pt-3 flex justify-between items-center">
              <span className="text-gray-900">Total Investment:</span>
              <span className="text-gray-900">{formatCurrency(totalInvestment)}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-gray-700">Contingency:</span>
                <Input
                  type="number"
                  value={formData.contingencyPercent}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contingencyPercent: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-20"
                  placeholder="0"
                />
                <span className="text-gray-700">%</span>
              </div>
              <span className="text-gray-900">{formatCurrency(contingencyAmount)}</span>
            </div>
            <div className="border-t-2 border-blue-400 pt-3 flex justify-between items-center">
              <span className="text-gray-900">Grand Total:</span>
              <span className="text-gray-900">{formatCurrency(grandTotal)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Budget Allocation */}
        <Card className="bg-white shadow-sm rounded-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">Budget Allocation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budgetSource">
                  Budget Source <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.budgetSource}
                  onValueChange={(value) =>
                    setFormData({ ...formData, budgetSource: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select budget source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CAPEX">CAPEX</SelectItem>
                    <SelectItem value="OPEX">OPEX</SelectItem>
                    <SelectItem value="Project Budget">Project Budget</SelectItem>
                    <SelectItem value="Customer Funded">Customer Funded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="budgetCode">Budget Code</Label>
                <Input
                  id="budgetCode"
                  value={formData.budgetCode}
                  onChange={(e) => setFormData({ ...formData, budgetCode: e.target.value })}
                  placeholder="Enter budget code"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="budgetHolder">Budget Holder</Label>
              <Select
                value={formData.budgetHolder}
                onValueChange={(value) =>
                  setFormData({ ...formData, budgetHolder: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select budget holder" />
                </SelectTrigger>
                <SelectContent>
                  {budgetHolders.map((holder) => (
                    <SelectItem key={holder} value={holder}>
                      {holder}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Approval Required</Label>
              <div className="mt-2 space-y-2">
                {approvalRoles.map((role) => (
                  <div key={role} className="flex items-center space-x-2">
                    <Checkbox
                      id={role}
                      checked={formData.approvalRequired.includes(role)}
                      onCheckedChange={() => handleApprovalToggle(role)}
                    />
                    <label htmlFor={role} className="text-sm text-gray-700 cursor-pointer">
                      {role}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 5: Notes & Attachments */}
        <Card className="bg-white shadow-sm rounded-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">Notes & Attachments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="internalNotes">Internal Notes</Label>
              <Textarea
                id="internalNotes"
                value={formData.internalNotes}
                onChange={(e) =>
                  setFormData({ ...formData, internalNotes: e.target.value })
                }
                placeholder="Notes for internal use only"
                rows={3}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="customerNotes">Customer Notes</Label>
              <Textarea
                id="customerNotes"
                value={formData.customerNotes}
                onChange={(e) =>
                  setFormData({ ...formData, customerNotes: e.target.value })
                }
                placeholder="Notes visible to customer"
                rows={3}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="attachments">Attach Supporting Documents</Label>
              <div className="mt-1">
                <input
                  type="file"
                  id="attachments"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("attachments")?.click()}
                  className="gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload Documents
                </Button>
                {formData.attachments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Approval Status Section (if status is pending approval) */}
        {formData.status === "pending_approval" && (
          <Card className="bg-white shadow-sm rounded-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">Approval Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {approvalStatuses.map((approval, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          approval.status === "approved"
                            ? "bg-green-100"
                            : approval.status === "pending"
                            ? "bg-blue-100"
                            : "bg-gray-100"
                        }`}
                      >
                        {approval.status === "approved" && (
                          <Check className="w-5 h-5 text-green-600" />
                        )}
                        {approval.status === "pending" && (
                          <Clock className="w-5 h-5 text-blue-600" />
                        )}
                        {approval.status === "waiting" && (
                          <Minus className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-gray-900">{approval.role}</p>
                        {approval.status === "approved" && approval.approvedBy && (
                          <p className="text-xs text-gray-500">
                            {approval.approvedBy} - {approval.approvedDate}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      {approval.status === "approved" && (
                        <span className="text-sm text-green-600">Approved</span>
                      )}
                      {approval.status === "pending" && (
                        <span className="text-sm text-blue-600">Pending</span>
                      )}
                      {approval.status === "waiting" && (
                        <span className="text-sm text-gray-400">Waiting</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom Action Bar (Sticky) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-8 py-4 shadow-lg z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Button
            variant="outline"
            className="bg-gray-100 hover:bg-gray-200"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="bg-blue-50 text-[#3b82f6] border-blue-200 hover:bg-blue-100"
              onClick={handleSaveDraft}
            >
              Save as Draft
            </Button>
            <Button
              className="bg-[#1e3a5f] hover:bg-[#152d47]"
              onClick={handleSubmitForApproval}
            >
              Submit for Approval
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
