import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Send } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { QuotationFormData } from "../../types/quotationForm";

interface QuotationStep3Props {
  formData: QuotationFormData;
  setFormData: (data: QuotationFormData) => void;
  onBack: () => void;
  onCancel: () => void;
}

export function QuotationStep3({
  formData,
  setFormData,
  onBack,
  onCancel,
}: QuotationStep3Props) {
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);

  const handleSLAToggle = (commitment: string) => {
    const updatedCommitments = formData.slaCommitments.includes(commitment)
      ? formData.slaCommitments.filter((c) => c !== commitment)
      : [...formData.slaCommitments, commitment];
    setFormData({ ...formData, slaCommitments: updatedCommitments });
  };

  const handleSaveDraft = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Quotation saved as draft!");
      setTimeout(() => navigate("/quotations"), 1500);
    } catch (error) {
      toast.error("Failed to save draft");
    }
  };

  const handleSendToCustomer = async () => {
    try {
      setIsSending(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Quotation sent to customer successfully!");
      setTimeout(() => navigate("/quotations"), 2000);
    } catch (error) {
      toast.error("Failed to send quotation");
    } finally {
      setIsSending(false);
    }
  };

  const subtotalOTC = formData.otcItems.reduce((sum, item) => sum + item.amount, 0);
  const subtotalMRC = formData.mrcItems.reduce((sum, item) => sum + item.total, 0);
  const grandSubtotal = subtotalOTC + subtotalMRC;
  const ppn = grandSubtotal * 0.11;
  const grandTotal = grandSubtotal + ppn;

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString("id-ID")}`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const quotationNumber = `PRT-JKT-QUOT-${Math.floor(Math.random() * 1000)}-COM-${new Date().getMonth() + 1}-${new Date().getFullYear()}`;

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      {/* Section 1: Terms & Conditions */}
      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader>
          <CardTitle className="text-gray-900">Terms & Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Payment Terms */}
          <div>
            <Label>Payment Terms</Label>
            <RadioGroup
              value={formData.paymentTerm}
              onValueChange={(value: any) =>
                setFormData({ ...formData, paymentTerm: value })
              }
              className="mt-2 space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="postpaid" id="postpaid" />
                <Label htmlFor="postpaid" className="cursor-pointer">
                  Postpaid (invoice after service)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="prepaid" id="prepaid" />
                <Label htmlFor="prepaid" className="cursor-pointer">
                  Prepaid (full payment upfront)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="downpayment" id="downpayment" />
                <Label htmlFor="downpayment" className="cursor-pointer">
                  Down Payment
                </Label>
              </div>
            </RadioGroup>

            {formData.paymentTerm === "downpayment" && (
              <div className="mt-2 flex items-center gap-2">
                <Label htmlFor="dpPercent">DP Percentage:</Label>
                <Input
                  id="dpPercent"
                  type="number"
                  value={formData.downPaymentPercent}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      downPaymentPercent: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-24"
                />
                <span>% upfront, rest after installation</span>
              </div>
            )}
          </div>

          {/* Quotation Valid Until */}
          <div>
            <Label htmlFor="validUntil">Quotation Valid Until</Label>
            <Input
              id="validUntil"
              type="date"
              value={formData.validUntil}
              onChange={(e) =>
                setFormData({ ...formData, validUntil: e.target.value })
              }
              className="mt-1"
            />
          </div>

          {/* SLA Commitments */}
          <div>
            <Label>SLA Commitment</Label>
            <div className="mt-2 space-y-2">
              {["99% Uptime Guarantee", "24/7 Support", "Performance Penalty"].map(
                (commitment) => (
                  <div key={commitment} className="flex items-center space-x-2">
                    <Checkbox
                      id={commitment}
                      checked={formData.slaCommitments.includes(commitment)}
                      onCheckedChange={() => handleSLAToggle(commitment)}
                    />
                    <label
                      htmlFor={commitment}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {commitment}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Minimum Contract Period */}
          <div>
            <Label htmlFor="contractPeriod">Minimum Contract Period</Label>
            <Select
              value={formData.contractPeriod.toString()}
              onValueChange={(value) =>
                setFormData({ ...formData, contractPeriod: parseInt(value) })
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12 months</SelectItem>
                <SelectItem value="24">24 months</SelectItem>
                <SelectItem value="36">36 months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Special Notes */}
          <div>
            <Label htmlFor="specialNotes">Special Notes (Optional)</Label>
            <Textarea
              id="specialNotes"
              value={formData.specialNotes}
              onChange={(e) =>
                setFormData({ ...formData, specialNotes: e.target.value })
              }
              placeholder="Add any special conditions or notes"
              rows={3}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Preview Quotation */}
      <Card className="bg-white shadow-sm rounded-lg border-2 border-gray-300">
        <CardHeader>
          <CardTitle className="text-gray-900">Preview Quotation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Header */}
          <div className="border-b pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-gray-900">QUOTATION</h2>
                <p className="text-sm text-gray-600 mt-1">
                  No: {quotationNumber}
                </p>
                <p className="text-sm text-gray-600">
                  Date: {formatDate(new Date().toISOString())}
                </p>
                <p className="text-sm text-gray-600">
                  Valid Until: {formatDate(formData.validUntil)}
                </p>
              </div>
              <div className="text-right">
                <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-500">LOGO</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div>
            <h3 className="text-sm text-gray-900 mb-2">Bill To:</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p>{formData.customer?.name}</p>
              <p>{formData.customer?.contactPerson}</p>
              <p>{formData.customer?.phone}</p>
              <p>{formData.customer?.email}</p>
              <p className="text-xs">{formData.customer?.address}</p>
            </div>
          </div>

          {/* Service Details */}
          <div>
            <h3 className="text-sm text-gray-900 mb-2">Service Details:</h3>
            <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
              <p>Quantity: {formData.quantity} unit(s)</p>
              <p>Service Period: {formData.servicePeriod} months</p>
              <p>Installation: {formData.installationLocation}</p>
              <p>Target RFS: {formatDate(formData.targetRFSDate)}</p>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div>
            <h3 className="text-sm text-gray-900 mb-2">Cost Breakdown:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">Subtotal (OTC + MRC)</span>
                <span className="text-gray-900">{formatCurrency(grandSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">PPN 11%</span>
                <span className="text-gray-900">{formatCurrency(ppn)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-900">Grand Total</span>
                <span className="text-gray-900">{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div>
            <h3 className="text-sm text-gray-900 mb-2">Terms & Conditions:</h3>
            <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
              <li>Payment: {formData.paymentTerm}</li>
              <li>Contract Period: {formData.contractPeriod} months</li>
              {formData.slaCommitments.map((sla) => (
                <li key={sla}>{sla}</li>
              ))}
              {formData.specialNotes && <li>{formData.specialNotes}</li>}
            </ul>
          </div>

          {/* Signature */}
          <div className="border-t pt-4">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-gray-600 mb-8">Customer Signature</p>
                <div className="border-t border-gray-300 pt-1">
                  <p className="text-xs text-gray-500">Name & Date</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-8">Company Representative</p>
                <div className="border-t border-gray-300 pt-1">
                  <p className="text-xs text-gray-500">Name & Date</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={onBack} className="bg-gray-100">
          Back
        </Button>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            className="bg-blue-50 text-[#3b82f6] border-blue-200 hover:bg-blue-100 gap-2"
          >
            <FileText className="w-4 h-4" />
            Save as Draft
          </Button>
          <Button
            onClick={handleSendToCustomer}
            disabled={isSending}
            className="bg-[#1e3a5f] hover:bg-[#152d47] gap-2"
          >
            <Send className="w-4 h-4" />
            {isSending ? "Sending..." : "Send to Customer"}
          </Button>
        </div>
      </div>
    </div>
  );
}
