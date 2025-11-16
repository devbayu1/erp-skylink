import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { QuotationFormData, ServiceType, ServicePlan, OTCItem } from "../../types/quotationForm";

interface QuotationStep2Props {
  formData: QuotationFormData;
  setFormData: (data: QuotationFormData) => void;
  serviceTypes: ServiceType[];
  servicePlans: ServicePlan[];
  onNext: () => void;
  onBack: () => void;
}

export function QuotationStep2({
  formData,
  setFormData,
  serviceTypes,
  servicePlans,
  onNext,
  onBack,
}: QuotationStep2Props) {
  const selectedServiceType = serviceTypes.find((t) => t.id === formData.serviceType);
  const selectedServicePlan = servicePlans.find((p) => p.id === formData.servicePlan);

  // Update equipment description and amount when service type changes
  useState(() => {
    if (selectedServiceType) {
      const updatedOTCItems = formData.otcItems.map((item) =>
        item.id === "1"
          ? {
              ...item,
              description: `${selectedServiceType.name} Unit`,
              amount: selectedServiceType.basePrice * formData.quantity,
            }
          : item
      );
      setFormData({ ...formData, otcItems: updatedOTCItems });
    }
  });

  // Update MRC items
  useState(() => {
    if (selectedServicePlan) {
      const updatedMRCItems = formData.mrcItems.map((item) =>
        item.id === "1"
          ? {
              ...item,
              description: selectedServicePlan.name,
              monthly: selectedServicePlan.monthlyCost * formData.quantity,
              period: formData.servicePeriod,
              total: selectedServicePlan.monthlyCost * formData.quantity * formData.servicePeriod,
            }
          : item
      );
      setFormData({ ...formData, mrcItems: updatedMRCItems });
    }
  });

  const handleOTCAmountChange = (id: string, amount: number) => {
    const updatedItems = formData.otcItems.map((item) =>
      item.id === id ? { ...item, amount } : item
    );
    setFormData({ ...formData, otcItems: updatedItems });
  };

  const handleAddCustomOTC = () => {
    const newItem: OTCItem = {
      id: Date.now().toString(),
      item: "Custom Item",
      description: "Custom description",
      amount: 0,
    };
    setFormData({
      ...formData,
      otcItems: [...formData.otcItems, newItem],
    });
  };

  const handleRemoveOTC = (id: string) => {
    setFormData({
      ...formData,
      otcItems: formData.otcItems.filter((item) => item.id !== id),
    });
  };

  const handleMRCChange = (id: string, monthly: number) => {
    const updatedItems = formData.mrcItems.map((item) =>
      item.id === id
        ? { ...item, monthly, total: monthly * item.period }
        : item
    );
    setFormData({ ...formData, mrcItems: updatedItems });
  };

  const subtotalOTC = formData.otcItems.reduce((sum, item) => sum + item.amount, 0);
  const subtotalMRC = formData.mrcItems.reduce((sum, item) => sum + item.total, 0);
  const grandSubtotal = subtotalOTC + subtotalMRC;
  const ppn = grandSubtotal * 0.11;
  const grandTotal = grandSubtotal + ppn;

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString("id-ID")}`;
  };

  return (
    <div className="space-y-6">
      {/* Summary from Step 1 */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Customer:</span>{" "}
              <span className="text-gray-900">{formData.customer?.name}</span>
            </div>
            <div>
              <span className="text-gray-600">Service:</span>{" "}
              <span className="text-gray-900">
                {selectedServiceType?.name} - {selectedServicePlan?.name}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Quantity:</span>{" "}
              <span className="text-gray-900">{formData.quantity} unit(s)</span>
            </div>
            <div>
              <span className="text-gray-600">Period:</span>{" "}
              <span className="text-gray-900">{formData.servicePeriod} months</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 1: OTC */}
      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader>
          <CardTitle className="text-gray-900">One Time Charge (OTC)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-[200px]">Item</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[200px] text-right">Amount</TableHead>
                <TableHead className="w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formData.otcItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-gray-900">{item.item}</TableCell>
                  <TableCell className="text-gray-700">{item.description}</TableCell>
                  <TableCell className="text-right">
                    <Input
                      type="number"
                      value={item.amount}
                      onChange={(e) =>
                        handleOTCAmountChange(item.id, parseFloat(e.target.value) || 0)
                      }
                      className="text-right"
                    />
                  </TableCell>
                  <TableCell>
                    {parseInt(item.id) > 4 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveOTC(item.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 flex justify-between items-center">
            <Button variant="outline" onClick={handleAddCustomOTC} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Custom Item
            </Button>
            <div className="text-right">
              <div className="text-sm text-gray-600">Subtotal OTC</div>
              <div className="text-gray-900">{formatCurrency(subtotalOTC)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: MRC */}
      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader>
          <CardTitle className="text-gray-900">Monthly Recurring Charge (MRC)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-[180px]">Item</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[150px] text-right">Monthly</TableHead>
                <TableHead className="w-[100px] text-center">Period</TableHead>
                <TableHead className="w-[150px] text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formData.mrcItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-gray-900">{item.item}</TableCell>
                  <TableCell className="text-gray-700">{item.description}</TableCell>
                  <TableCell className="text-right">
                    <Input
                      type="number"
                      value={item.monthly}
                      onChange={(e) =>
                        handleMRCChange(item.id, parseFloat(e.target.value) || 0)
                      }
                      className="text-right"
                    />
                  </TableCell>
                  <TableCell className="text-center text-gray-700">
                    {item.period} months
                  </TableCell>
                  <TableCell className="text-right text-gray-900">
                    {formatCurrency(item.total)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 text-right">
            <div className="text-sm text-gray-600">Subtotal MRC</div>
            <div className="text-gray-900">{formatCurrency(subtotalMRC)}</div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Calculation Summary */}
      <Card className="bg-white shadow-sm rounded-lg border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="text-gray-900">Calculation Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Subtotal (OTC + MRC)</span>
            <span className="text-gray-900">{formatCurrency(grandSubtotal)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">PPN 11%</span>
            <span className="text-gray-900">{formatCurrency(ppn)}</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
            <span className="text-gray-900">Grand Total</span>
            <span className="text-gray-900">{formatCurrency(grandTotal)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={onBack} className="bg-gray-100">
          Back
        </Button>
        <Button onClick={onNext} className="bg-[#3b82f6] hover:bg-blue-600">
          Next: Terms & Preview
        </Button>
      </div>
    </div>
  );
}
