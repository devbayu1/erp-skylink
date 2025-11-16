import { Plus, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { QuotationFormData, Customer, ServiceType, ServicePlan } from "../../types/quotationForm";

interface QuotationStep1Props {
  formData: QuotationFormData;
  setFormData: (data: QuotationFormData) => void;
  customers: Customer[];
  serviceTypes: ServiceType[];
  servicePlans: ServicePlan[];
  onNext: () => void;
  onCancel: () => void;
}

export function QuotationStep1({
  formData,
  setFormData,
  customers,
  serviceTypes,
  servicePlans,
  onNext,
  onCancel,
}: QuotationStep1Props) {
  const handleCustomerSelect = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId);
    setFormData({ ...formData, customer: customer || null });
  };

  const handleAdditionalServiceToggle = (serviceId: string) => {
    const updatedServices = formData.additionalServices.map((service) =>
      service.id === serviceId
        ? { ...service, checked: !service.checked }
        : service
    );
    setFormData({ ...formData, additionalServices: updatedServices });
  };

  const filteredPlans = servicePlans.filter(
    (plan) => plan.serviceTypeId === formData.serviceType
  );

  return (
    <div className="space-y-6">
      {/* Section 1: Customer Selection */}
      <Card className="bg-white shadow-sm rounded-lg">
        <CardHeader>
          <CardTitle className="text-gray-900">Customer Selection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="customer">Search & Select Customer</Label>
            <Select
              value={formData.customer?.id || ""}
              onValueChange={handleCustomerSelect}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Customer
          </Button>

          {formData.customer && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-2">
              <div>
                <span className="text-sm text-gray-600">Customer Name:</span>{" "}
                <span className="text-gray-900">{formData.customer.name}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Contact Person:</span>{" "}
                <span className="text-gray-900">{formData.customer.contactPerson}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Phone:</span>{" "}
                <span className="text-gray-900">{formData.customer.phone}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Email:</span>{" "}
                <span className="text-gray-900">{formData.customer.email}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Address:</span>{" "}
                <div className="mt-1 p-2 bg-gray-100 rounded text-gray-700 text-sm">
                  {formData.customer.address}
                </div>
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
          <div className="grid grid-cols-2 gap-4">
            {/* Service Type */}
            <div>
              <Label htmlFor="serviceType">Service Type</Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) =>
                  setFormData({ ...formData, serviceType: value, servicePlan: "" })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Service Plan */}
            <div>
              <Label htmlFor="servicePlan">Service Plan</Label>
              <Select
                value={formData.servicePlan}
                onValueChange={(value) =>
                  setFormData({ ...formData, servicePlan: value })
                }
                disabled={!formData.serviceType}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select service plan" />
                </SelectTrigger>
                <SelectContent>
                  {filteredPlans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Quantity */}
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })
                }
                className="mt-1"
              />
            </div>

            {/* Service Period */}
            <div>
              <Label htmlFor="servicePeriod">Service Period</Label>
              <Select
                value={formData.servicePeriod.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, servicePeriod: parseInt(value) })
                }
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
          </div>

          {/* Installation Location */}
          <div>
            <Label htmlFor="installationLocation">Installation Location</Label>
            <Textarea
              id="installationLocation"
              value={formData.installationLocation}
              onChange={(e) =>
                setFormData({ ...formData, installationLocation: e.target.value })
              }
              placeholder="Enter installation address"
              rows={2}
              className="mt-1"
            />
          </div>

          {/* Coordinates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="latitude">
                <MapPin className="w-4 h-4 inline mr-1" />
                Latitude
              </Label>
              <Input
                id="latitude"
                value={formData.latitude}
                onChange={(e) =>
                  setFormData({ ...formData, latitude: e.target.value })
                }
                placeholder="-6.200000"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="longitude">
                <MapPin className="w-4 h-4 inline mr-1" />
                Longitude
              </Label>
              <Input
                id="longitude"
                value={formData.longitude}
                onChange={(e) =>
                  setFormData({ ...formData, longitude: e.target.value })
                }
                placeholder="106.816666"
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
              onChange={(e) =>
                setFormData({ ...formData, targetRFSDate: e.target.value })
              }
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
          {formData.additionalServices.map((service) => (
            <div key={service.id} className="flex items-center space-x-2">
              <Checkbox
                id={service.id}
                checked={service.checked}
                onCheckedChange={() => handleAdditionalServiceToggle(service.id)}
              />
              <label
                htmlFor={service.id}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {service.name}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={onCancel} className="bg-gray-100">
          Cancel
        </Button>
        <Button
          onClick={onNext}
          className="bg-[#3b82f6] hover:bg-blue-600"
          disabled={!formData.customer || !formData.serviceType || !formData.servicePlan}
        >
          Next: Cost Breakdown
        </Button>
      </div>
    </div>
  );
}
