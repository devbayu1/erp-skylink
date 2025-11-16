import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { QuotationFormData, Customer } from "../../types/quotationForm";

interface Step1Props {
  formData: QuotationFormData;
  updateFormData: (data: Partial<QuotationFormData>) => void;
}

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
    name: "Ibu Wulan (Lampung)",
    contactPerson: "Wulan",
    phone: "+62 812-xxx-xxxx",
    email: "wulan@email.com",
    address: "Lampung, Indonesia",
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

const serviceTypes = [
  "Starlink Standard V4",
  "Starlink Flat Standard V4",
  "Starlink Flat High Performance",
  "Starlink Mini",
  "Custom Package",
];

const servicePlansFixed = [
  "Priority 40GB",
  "Priority 1TB",
  "Priority 2TB",
  "Priority 6TB",
];

const servicePlansMobile = [
  "Mobile Priority 50GB",
  "Mobile Priority 1TB",
  "Mobile Priority 5TB",
];

export function Step1CustomerService({ formData, updateFormData }: Step1Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCustomerList, setShowCustomerList] = useState(false);

  const filteredCustomers = mockCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCustomer = (customer: Customer) => {
    updateFormData({
      customerId: customer.id,
      customerName: customer.name,
      contactPerson: customer.contactPerson,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
    });
    setShowCustomerList(false);
    setSearchQuery(customer.name);
  };

  const servicePlans = formData.serviceType?.includes("Flat")
    ? servicePlansMobile
    : servicePlansFixed;

  return (
    <div className="space-y-6">
      {/* Section 1: Customer Selection */}
      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader>
          <CardTitle className="text-gray-900">Customer Selection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search & Select Customer */}
          <div>
            <Label htmlFor="customer-search">
              Search & Select Customer <span className="text-red-500">*</span>
            </Label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="customer-search"
                placeholder="Search by customer name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowCustomerList(true);
                }}
                onFocus={() => setShowCustomerList(true)}
                className="pl-10"
              />
              {showCustomerList && searchQuery && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredCustomers.map((customer) => (
                    <button
                      key={customer.id}
                      type="button"
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0"
                      onClick={() => handleSelectCustomer(customer)}
                    >
                      <div className="text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-600">{customer.contactPerson}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Button variant="outline" className="w-full gap-2">
            <Plus className="w-4 h-4" />
            Add New Customer
          </Button>

          {/* Selected Customer Info */}
          {formData.customerId && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <Label className="text-sm text-gray-600">Customer Name</Label>
                <p className="text-gray-900">{formData.customerName}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Contact Person</Label>
                <p className="text-gray-900">{formData.contactPerson}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Phone</Label>
                <p className="text-gray-900">{formData.phone}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Email</Label>
                <p className="text-gray-900">{formData.email}</p>
              </div>
              <div className="col-span-2">
                <Label className="text-sm text-gray-600">Address</Label>
                <p className="text-gray-700 bg-gray-100 p-2 rounded">{formData.address}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section 2: Service Details */}
      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader>
          <CardTitle className="text-gray-900">Service Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Service Type */}
          <div>
            <Label htmlFor="serviceType">
              Service Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.serviceType}
              onValueChange={(value) => updateFormData({ serviceType: value, servicePlan: "" })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Service Plan */}
          <div>
            <Label htmlFor="servicePlan">
              Service Plan <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.servicePlan}
              onValueChange={(value) => updateFormData({ servicePlan: value })}
              disabled={!formData.serviceType}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select service plan" />
              </SelectTrigger>
              <SelectContent>
                {servicePlans.map((plan) => (
                  <SelectItem key={plan} value={plan}>
                    {plan}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => updateFormData({ quantity: parseInt(e.target.value) || 1 })}
              className="mt-1"
            />
          </div>

          {/* Service Period */}
          <div>
            <Label htmlFor="servicePeriod">Service Period</Label>
            <Select
              value={formData.servicePeriod.toString()}
              onValueChange={(value) => updateFormData({ servicePeriod: parseInt(value) })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">1 Year</SelectItem>
                <SelectItem value="24">2 Years</SelectItem>
                <SelectItem value="36">3 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Installation Location */}
          <div>
            <Label htmlFor="installationLocation">Installation Location</Label>
            <Textarea
              id="installationLocation"
              value={formData.installationLocation}
              onChange={(e) => updateFormData({ installationLocation: e.target.value })}
              placeholder="Enter installation location"
              rows={3}
              className="mt-1"
            />
          </div>

          {/* Coordinates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                value={formData.latitude}
                onChange={(e) => updateFormData({ latitude: e.target.value })}
                placeholder="-1.234567"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                value={formData.longitude}
                onChange={(e) => updateFormData({ longitude: e.target.value })}
                placeholder="102.345678"
                className="mt-1"
              />
            </div>
          </div>

          {/* Target RFS Date */}
          <div>
            <Label htmlFor="targetRFSDate">Target RFS Date</Label>
            <Input
              id="targetRFSDate"
              type="date"
              value={formData.targetRFSDate}
              onChange={(e) => updateFormData({ targetRFSDate: e.target.value })}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Additional Services */}
      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader>
          <CardTitle className="text-gray-900">Additional Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="delivery"
              checked={formData.additionalServices.delivery}
              onCheckedChange={(checked) =>
                updateFormData({
                  additionalServices: { ...formData.additionalServices, delivery: !!checked },
                })
              }
            />
            <label htmlFor="delivery" className="text-sm cursor-pointer">
              Delivery & Installation
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="activation"
              checked={formData.additionalServices.activation}
              onCheckedChange={(checked) =>
                updateFormData({
                  additionalServices: { ...formData.additionalServices, activation: !!checked },
                })
              }
            />
            <label htmlFor="activation" className="text-sm cursor-pointer">
              Activation Service
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="training"
              checked={formData.additionalServices.training}
              onCheckedChange={(checked) =>
                updateFormData({
                  additionalServices: { ...formData.additionalServices, training: !!checked },
                })
              }
            />
            <label htmlFor="training" className="text-sm cursor-pointer">
              Training & Support
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="warranty"
              checked={formData.additionalServices.warranty}
              onCheckedChange={(checked) =>
                updateFormData({
                  additionalServices: { ...formData.additionalServices, warranty: !!checked },
                })
              }
            />
            <label htmlFor="warranty" className="text-sm cursor-pointer">
              Extended Warranty
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
