import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { CustomerTabs } from "../components/customer-detail/CustomerTabs";
import { CustomerInfoCard } from "../components/customer-detail/CustomerInfoCard";
import { RecentOrdersTable } from "../components/customer-detail/RecentOrdersTable";
import type { CustomerDetail as CustomerDetailType } from "../types/customerDetail";

// Mock data - in real app, fetch based on ID
const mockCustomerDetail: CustomerDetailType = {
  id: "CUS-001",
  companyName: "PT Buana Visualnet Sentra",
  businessType: "Technology Services",
  npwp: "93.189.298.8-332.000",
  nib: "1234567890123456",
  address: "Jl. H. Manap No. 120 Kelurahan Sungai Kerjan, Kecamatan Bungo Dani, Kabupaten Muara Bungo, Jambi",
  phone: "+62 852-6620-6667",
  email: "antonius.almen@gmail.com",
  status: "active",
  customerSince: "May 19, 2025",
  totalOrders: 5,
  totalRevenue: "Rp 48,500,000",
  outstandingAmount: "Rp 21,600,000",
  lastOrderDate: "Oct 15, 2025",
  paymentStatus: "1 Overdue",
  customerType: "Regular",
  contacts: {
    primary: {
      name: "Almen Manihuruk",
      position: "Direktur Utama",
      email: "antonius.almen@gmail.com",
      phone: "+62 852-6620-6667",
    },
    technical: {
      name: "Alan Dede",
      phone: "085267843664",
    },
    financial: {
      name: "Almen Manihuruk",
      phone: "+62 852-6620-6667",
    },
  },
};

export default function CustomerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const customer = mockCustomerDetail; // In real app: fetch customer by id

  const getStatusBadge = () => {
    const styles = {
      active: "bg-green-500 hover:bg-green-600",
      inactive: "bg-gray-500 hover:bg-gray-600",
      prospect: "bg-yellow-500 hover:bg-yellow-600",
    };

    const labels = {
      active: "Active",
      inactive: "Inactive",
      prospect: "Prospect",
    };

    return (
      <Badge className={styles[customer.status]}>
        {labels[customer.status]}
      </Badge>
    );
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {/* Left Section - Back Button, Name, Badges */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0"
              onClick={() => navigate("/customers")}
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Button>

            <h1 className="text-gray-900">{customer.companyName}</h1>

            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-600 border-blue-200"
            >
              {customer.id}
            </Badge>

            {getStatusBadge()}
          </div>

          {/* Right Section - Edit Button */}
          <Button
            onClick={() => navigate(`/customers/${id}/edit`)}
            className="bg-[#3b82f6] hover:bg-blue-600 gap-2"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <CustomerTabs activeTab="overview" />

      {/* Overview Tab Content */}
      <div className="mt-6">
        {/* Three Column Layout */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Company Information */}
          <CustomerInfoCard
            title="Company Information"
            data={[
              { label: "Company Name", value: customer.companyName },
              { label: "Business Type", value: customer.businessType },
              { label: "NPWP", value: customer.npwp },
              { label: "NIB", value: customer.nib },
              { label: "Company Address", value: customer.address },
              { label: "Phone", value: customer.phone },
              { label: "Email", value: customer.email },
            ]}
          />

          {/* Contact Persons */}
          <CustomerInfoCard
            title="Contact Persons"
            type="contacts"
            contacts={customer.contacts}
          />

          {/* Business Summary */}
          <CustomerInfoCard
            title="Business Summary"
            type="summary"
            data={[
              { label: "Customer Since", value: customer.customerSince },
              { label: "Total Orders", value: customer.totalOrders.toString() },
              { label: "Total Revenue", value: customer.totalRevenue, highlight: "green" },
              { label: "Outstanding", value: customer.outstandingAmount, highlight: "orange" },
              { label: "Last Order", value: customer.lastOrderDate },
              { label: "Payment Status", value: customer.paymentStatus, badge: "destructive" },
              { label: "Customer Type", value: customer.customerType, badge: "outline" },
            ]}
          />
        </div>

        {/* Recent Orders Section */}
        <RecentOrdersTable />
      </div>
    </div>
  );
}
