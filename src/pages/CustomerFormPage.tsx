import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, Upload, X, Plus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Checkbox } from "../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import type { CustomerFormData, DocumentItem } from "../types/customerForm";

export default function CustomerFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CustomerFormData>({
    defaultValues: {
      customerType: "active",
      customerStatus: "new",
    },
  });

  const [documents, setDocuments] = useState<DocumentItem[]>([
    { id: "akta-pendirian", label: "Akta Pendirian & SK", required: true, fieldName: "aktaPendirian" },
    { id: "akta-perubahan", label: "Akta Perubahan Direksi", required: true, fieldName: "aktaPerubahan" },
    { id: "npwp-doc", label: "NPWP Perusahaan", required: true, fieldName: "npwpDocument" },
    { id: "nib-doc", label: "NIB Perusahaan", required: true, fieldName: "nibDocument" },
    { id: "ktp-direktur", label: "KTP Direktur Utama", required: true, fieldName: "ktpDirekturUtama" },
  ]);

  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [showAdditionalContacts, setShowAdditionalContacts] = useState(false);

  // Load existing customer data in edit mode
  useEffect(() => {
    if (isEditMode) {
      // Mock data loading - replace with actual API call
      const mockData: Partial<CustomerFormData> = {
        companyName: "PT Buana Visualnet Sentra",
        businessType: "technology",
        npwp: "93.189.298.8-332.000",
        nib: "1234567890123456",
        companyPhone: "852-6620-6667",
        companyEmail: "antonius.almen@gmail.com",
        companyAddress: "Jl. H. Manap No. 120 Kelurahan Sungai Kerjan, Kecamatan Bungo Dani, Kabupaten Muara Bungo, Jambi",
        primaryContactName: "Almen Manihuruk",
        primaryContactPosition: "Direktur Utama",
        primaryContactEmail: "antonius.almen@gmail.com",
        primaryContactPhone: "+62 852-6620-6667",
        customerType: "active",
        customerStatus: "regular",
      };

      Object.entries(mockData).forEach(([key, value]) => {
        setValue(key as keyof CustomerFormData, value as any);
      });
    }
  }, [isEditMode, id, setValue]);

  const handleFileUpload = (documentId: string, file: File | null) => {
    if (file) {
      setDocuments(
        documents.map((doc) =>
          doc.id === documentId ? { ...doc, file } : doc
        )
      );
    }
  };

  const handleRemoveFile = (documentId: string) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === documentId ? { ...doc, file: undefined } : doc
      )
    );
  };

  const onSubmit = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success(
        isEditMode
          ? "Customer updated successfully!"
          : "Customer created successfully!"
      );
      
      setTimeout(() => {
        navigate("/customers");
      }, 1500);
    } catch (error) {
      toast.error("Failed to save customer. Please try again.");
    }
  };

  const onSaveDraft = () => {
    toast.success("Draft saved successfully!");
  };

  const formatNPWP = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    let formatted = "";
    
    if (numbers.length > 0) {
      formatted = numbers.substring(0, 2);
      if (numbers.length > 2) formatted += "." + numbers.substring(2, 5);
      if (numbers.length > 5) formatted += "." + numbers.substring(5, 8);
      if (numbers.length > 8) formatted += "." + numbers.substring(8, 9);
      if (numbers.length > 9) formatted += "-" + numbers.substring(9, 12);
      if (numbers.length > 12) formatted += "." + numbers.substring(12, 15);
    }
    
    return formatted;
  };

  return (
    <div className="pb-24">
      <Toaster position="top-right" />
      
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0"
              onClick={() => navigate("/customers")}
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Button>

            <h1 className="text-gray-900">
              {isEditMode ? "Edit Customer" : "Add New Customer"}
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl space-y-6">
          {/* Section 1: Company Information */}
          <Card className="bg-white shadow-sm rounded-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Company Name */}
              <div>
                <Label htmlFor="companyName">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  {...register("companyName", { required: "Company name is required" })}
                  placeholder="Enter company name"
                  className="mt-1"
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
                )}
              </div>

              {/* Business Type */}
              <div>
                <Label htmlFor="businessType">Business Type</Label>
                <Select
                  onValueChange={(value) => setValue("businessType", value)}
                  defaultValue={watch("businessType")}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology Services</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* NPWP */}
              <div>
                <Label htmlFor="npwp">
                  NPWP <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="npwp"
                  {...register("npwp", {
                    required: "NPWP is required",
                    onChange: (e) => {
                      const formatted = formatNPWP(e.target.value);
                      setValue("npwp", formatted);
                    },
                  })}
                  placeholder="00.000.000.0-000.000"
                  className="mt-1"
                  maxLength={20}
                />
                {errors.npwp && (
                  <p className="text-red-500 text-sm mt-1">{errors.npwp.message}</p>
                )}
              </div>

              {/* NIB */}
              <div>
                <Label htmlFor="nib">NIB</Label>
                <Input
                  id="nib"
                  {...register("nib")}
                  placeholder="Enter NIB number"
                  className="mt-1"
                />
              </div>

              {/* Company Phone */}
              <div>
                <Label htmlFor="companyPhone">
                  Company Phone <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-2 mt-1">
                  <div className="w-20">
                    <Input value="+62" disabled className="bg-gray-100" />
                  </div>
                  <Input
                    id="companyPhone"
                    {...register("companyPhone", { required: "Phone is required" })}
                    placeholder="812-3456-7890"
                    className="flex-1"
                  />
                </div>
                {errors.companyPhone && (
                  <p className="text-red-500 text-sm mt-1">{errors.companyPhone.message}</p>
                )}
              </div>

              {/* Company Email */}
              <div>
                <Label htmlFor="companyEmail">
                  Company Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyEmail"
                  type="email"
                  {...register("companyEmail", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="company@example.com"
                  className="mt-1"
                />
                {errors.companyEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.companyEmail.message}</p>
                )}
              </div>

              {/* Company Address */}
              <div>
                <Label htmlFor="companyAddress">
                  Company Address <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="companyAddress"
                  {...register("companyAddress", { required: "Address is required" })}
                  placeholder="Enter complete company address"
                  rows={3}
                  className="mt-1"
                />
                {errors.companyAddress && (
                  <p className="text-red-500 text-sm mt-1">{errors.companyAddress.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Primary Contact Person */}
          <Card className="bg-white shadow-sm rounded-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">Primary Contact Person</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Full Name */}
              <div>
                <Label htmlFor="primaryContactName">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="primaryContactName"
                  {...register("primaryContactName", { required: "Name is required" })}
                  placeholder="Enter full name"
                  className="mt-1"
                />
                {errors.primaryContactName && (
                  <p className="text-red-500 text-sm mt-1">{errors.primaryContactName.message}</p>
                )}
              </div>

              {/* Position */}
              <div>
                <Label htmlFor="primaryContactPosition">
                  Position/Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="primaryContactPosition"
                  {...register("primaryContactPosition", { required: "Position is required" })}
                  placeholder="e.g., Direktur Utama, CEO"
                  className="mt-1"
                />
                {errors.primaryContactPosition && (
                  <p className="text-red-500 text-sm mt-1">{errors.primaryContactPosition.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="primaryContactEmail">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="primaryContactEmail"
                  type="email"
                  {...register("primaryContactEmail", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="contact@example.com"
                  className="mt-1"
                />
                {errors.primaryContactEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.primaryContactEmail.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="primaryContactPhone">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="primaryContactPhone"
                  {...register("primaryContactPhone", { required: "Phone is required" })}
                  placeholder="+62 812-3456-7890"
                  className="mt-1"
                />
                {errors.primaryContactPhone && (
                  <p className="text-red-500 text-sm mt-1">{errors.primaryContactPhone.message}</p>
                )}
              </div>

              {/* KTP Upload */}
              <div>
                <Label htmlFor="ktp-upload">KTP/ID Card Upload</Label>
                <div className="mt-1">
                  {!ktpFile ? (
                    <label
                      htmlFor="ktp-upload"
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer block"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">
                        Drag & drop or <span className="text-[#3b82f6]">browse</span> to upload
                      </p>
                      <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
                      <input
                        id="ktp-upload"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setKtpFile(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{ktpFile.name}</span>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => setKtpFile(null)}
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Additional Contacts */}
          <Card className="bg-white shadow-sm rounded-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">Additional Contacts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Technical Contact */}
              <div className="pb-6 border-b border-gray-200">
                <h3 className="text-gray-900 mb-4">Technical Contact</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="technicalContactName">Name</Label>
                    <Input
                      id="technicalContactName"
                      {...register("technicalContactName")}
                      placeholder="Enter name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="technicalContactPhone">Phone</Label>
                    <Input
                      id="technicalContactPhone"
                      {...register("technicalContactPhone")}
                      placeholder="+62 812-3456-7890"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="technicalContactEmail">Email</Label>
                    <Input
                      id="technicalContactEmail"
                      type="email"
                      {...register("technicalContactEmail")}
                      placeholder="technical@example.com"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Financial Contact */}
              <div className="pb-6 border-b border-gray-200">
                <h3 className="text-gray-900 mb-4">Financial Contact</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="financialContactName">Name</Label>
                    <Input
                      id="financialContactName"
                      {...register("financialContactName")}
                      placeholder="Enter name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="financialContactPhone">Phone</Label>
                    <Input
                      id="financialContactPhone"
                      {...register("financialContactPhone")}
                      placeholder="+62 812-3456-7890"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="financialContactEmail">Email</Label>
                    <Input
                      id="financialContactEmail"
                      type="email"
                      {...register("financialContactEmail")}
                      placeholder="finance@example.com"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Add Another Contact */}
              <Button
                type="button"
                variant="ghost"
                className="text-[#3b82f6] hover:text-blue-600 p-0 h-auto"
                onClick={() => setShowAdditionalContacts(!showAdditionalContacts)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Contact
              </Button>
            </CardContent>
          </Card>

          {/* Section 4: Documents */}
          <Card className="bg-white shadow-sm rounded-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">Documents</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Upload required documents (PDF only)</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    <Checkbox id={doc.id} checked={!!doc.file} />
                    <label htmlFor={doc.id} className="text-sm text-gray-700 flex-1">
                      {doc.label}
                      {doc.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {doc.file && (
                      <span className="text-xs text-gray-600">
                        {typeof doc.file === "string" ? doc.file : doc.file.name}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {doc.file && (
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveFile(doc.id)}
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </Button>
                    )}
                    <label htmlFor={`upload-${doc.id}`}>
                      <Button type="button" variant="outline" size="sm" className="gap-2" asChild>
                        <span>
                          <Upload className="w-4 h-4" />
                          Upload
                        </span>
                      </Button>
                      <input
                        id={`upload-${doc.id}`}
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(doc.id, e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Section 5: Business Details */}
          <Card className="bg-white shadow-sm rounded-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">Business Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Customer Type */}
              <div>
                <Label>
                  Customer Type <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  defaultValue={watch("customerType")}
                  onValueChange={(value) => setValue("customerType", value as any)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="prospect" id="prospect" />
                    <Label htmlFor="prospect" className="cursor-pointer">
                      Prospect
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="active" />
                    <Label htmlFor="active" className="cursor-pointer">
                      Active
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inactive" id="inactive" />
                    <Label htmlFor="inactive" className="cursor-pointer">
                      Inactive
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Customer Status */}
              <div>
                <Label htmlFor="customerStatus">Customer Status</Label>
                <Select
                  onValueChange={(value) => setValue("customerStatus", value as any)}
                  defaultValue={watch("customerStatus")}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  {...register("notes")}
                  placeholder="Add any additional notes or comments about the customer"
                  rows={4}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </form>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-8 py-4 shadow-lg z-10">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {/* Cancel Button */}
          <Button
            type="button"
            variant="outline"
            className="bg-gray-100 hover:bg-gray-200"
            onClick={() => navigate("/customers")}
          >
            Cancel
          </Button>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              className="bg-blue-50 text-[#3b82f6] border-blue-200 hover:bg-blue-100"
              onClick={onSaveDraft}
            >
              Save as Draft
            </Button>
            <Button
              type="submit"
              className="bg-[#1e3a5f] hover:bg-[#152d47]"
              onClick={handleSubmit(onSubmit)}
            >
              {isEditMode ? "Update Customer" : "Save Customer"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
